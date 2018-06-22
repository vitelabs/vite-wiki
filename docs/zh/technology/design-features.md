# Design Feature

::: tip 提示
本文用于放置前期基础技术选型的结论
:::

## Signing algorithm -  [Ed25519](https://ed25519.cr.yp.to/)
### 背景
在签名算法的选择上，我们必须兼顾 **安全**和 **性能**，其中安全是首要的，中本聪当时选择的是ECDSA over secp256k1，secp256k1是SECG定义的一个Koblitz曲线，在中本聪使用前几乎无人问津，它设计透明，而不像NIST选中的secp256r1（也就是P256）曲线中有一些诡异的参数，这些参数被广泛地认为是NSA植入的[后门](https://www.ams.org/notices/201402/rnoti-p190.pdf)，后来的一系列事件也确实证明了中本聪的选择是非常具有前瞻性的，于是以太坊、EOS等也都跟进了中本聪的想法，但是随着Ed25519专利期限制解除，包括 [比特币的核心开发者们](https://bitcointalk.org/index.php?topic=103172.msg1134832#msg1134832 )和[V神](https://blog.ethereum.org/2015/07/05/on-abstraction/)都讨论过是否迁移到Ed25519，链接中可见他们的态度都比较暧昧地倾向于使用Ed25519，但可能由于迁移成本太大所以未能成行，而ripple则是在14年就果断迁移了过去。

### 安全性考量


Ed25519在安全性上经过大量独立的知名安全专家评测后被认为是"safe"，而secp256k1是"unsafe"，[参考链接](https://safecurves.cr.yp.to/)。


### 性能考量
vite为了满足了工业级应用对高吞吐、低延迟和扩展性的要求，设计了许多优化的方案，比如提出了"交易分解"这个概念，其含义是会把一个交易拆成类似于"请求"和"相应"这样的一对交易，所以可以预见的是在vite的公链系统中对交易的验证和确认是非常频繁发生的，那么整体系统的性能表现对签名和验签算法的速度高低会相当敏感。根据现在的数据Ed25519的性能数倍快于ECDSA over secp256k1 [参考ripple的benchmark](https://ripple.com/dev-blog/curves-with-a-twist/))。

还有一个小的提升是Ed25519的签名长度是64Bytes而seck256k1的是71Bytes，这给网络和存储减少了些许压力。

具体更详细的Benchmark可以参考[链接](https://bench.cr.yp.to/primitives-sign.html)

### Go的支持
Go的扩展SDK支持了使用sha512的Ed25519，我们只要做一些修改就可以使其支持Blak2b的Ed25519。

### 不足
1. 无法从签名消息恢复公钥；
2. 由于密钥空间是非线性的，无法兼容BIP的Hierarchical Deterministic Key Derivation，我们可能需要另外的套件去支持KDF。

## Hash algorithm - [Blake2b](https://blake2.net/)

### 安全性考量
Blake2的前身是Blake，Blake和keccak当时一起竞争SHA3标准的时候失利了，当时失利的原因而Blake和sha2有点相似，而NIST的目标是一个完全不同于SHA2标准的Hash算法。
>desire for SHA-3 to complement the existing SHA-2 algorithms … BLAKE is rather similar to SHA-2.

事实上在安全性评估上NIST给了Blake相当高的评价，其 [report](https://nvlpubs.nist.gov/nistpubs/ir/2012/NIST.IR.7896.pdf)形容Blake，

>"BLAKE and Keccak have very large security margins."。

所以一般而言我们可以认为blake2的安全性和keccak不会有大的区别。

### 性能考量
根据大量的数据Blake2的性能表现在现代的通用CPU(X86 ARM等)上的表现远远领先于其它任何Hash算法，具体性能表现可以参考这个[链接](http://bench.cr.yp.to/results-sha3.html)。

Blake2的另一个特点是用ASIC设计的Blake2算法能达到的峰值并不会很高，这就意味着挖矿的峰值速率相对较低，这也是我们希望的。

## KDF - [scrypt](https://github.com/Tarsnap/scrypt)
从技术角度来看scrypt相比于获得15年的Password Hashing Competition的argon2来说安全性上并没有大的区别，但是由于其诞生更早使用更广泛所以在实践角度看显得更成熟一点，argon2如果再有两到三年年仍然没有被发现大的问题，我们也有可能会使用它。



## 名词解释

ECDSA(Elliptic Curve Digital Signature Algorithm)是使用椭圆曲线的数字签名算法

secp256k1是ECDSA算法的一个参数
* sec是SECG（Standards for Efficient Cryptography Group） 推出的 Standards for Efficient Cryptogrpahy 
* p的意思是这个椭圆曲线使用 prime field，相对应的
* 256的意思是 prime的长度是256bits
* k 是Koblitz曲线 
* 1 意味着它是第一个(事实上也是唯一)标准曲线的类型

Ed25519 是一个使用SHA512/256的和[Curve25519](https://en.wikipedia.org/wiki/Curve25519)的 [EdDSA签名算法](https://en.wikipedia.org/wiki/EdDSA)

NIST(National Institute of Standards and Technology) 美国国家标准与技术研究院，他们制定了一些安全标准，比如SHA3,P256等

NSA(National Security Agency) 美国国家安全局

KDF(key derivation function) 密钥派生函数，简单而言就是使用一个主密钥派生其它子密钥的函数，比如把用户输入的密钥作为MasterKey，然后通过KDF的运算得到另一个用于AES的密钥




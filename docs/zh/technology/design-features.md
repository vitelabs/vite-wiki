# Design Feature
## Signing algorithm -  Ed25519
### 安全性考量

在签名算法的选择上,我们必须兼顾 **安全**和 **性能**,其中安全是首要的,中本聪当时选择的是ECDSA over secp256k1,secp256k1是SECG定义的一个Koblitz曲线,它的参数选择十分简单,设计透明,而不像NIST选中的secp256r1（也就是P256）的曲线,中有一些诡异的参数,使得可能生成有缺陷的曲线,事实证明中本聪的选择在安全性上是十分靠谱的，后来的以太坊,EOS等也都跟进了中本聪的想法,但是后来包括 [比特币的核心开发者们](https://bitcointalk.org/index.php?topic=103172.msg1134832#msg1134832 )和[V神](https://blog.ethereum.org/2015/07/05/on-abstraction/)都讨论过是否迁移到Ed25519,他们的态度都比较暧昧的倾向于使用Ed25519,因为安全性上经过大量独立的安全专家评测[并不弱于secp256k1](https://safecurves.cr.yp.to/).

### 性能考量
vite为了满足了工业级应用对高吞吐、低延迟和扩展性的要求，设计了许多优化的方案，比如提出了"交易分解"这个概念，其含义是会把一个交易拆成类似于"请求"和"相应"这样的一对交易，所以可以预见的是在vite的公链系统中交易的验证和确认是非常频繁发生的，其中签名和验证签名是CPU密集的运算，其算法速率的提升会显著改善整个系统的性能。根据现在的数据Ed25519的性能数倍快ECDSA over secp256(参考 [ripple的benchmark](https://ripple.com/dev-blog/curves-with-a-twist/))。并且Ed25519的签名长度是64Bytes而seck256k1的是71Bytes，这给网络和存储减少了些许压力。

### Go的支持
Go的扩展SDK支持了使用sha512的Ed25519,我们只要做一些修改就可以使其支持Blak2b的Ed25519

### 不足
1. 无法从签名消息恢复公钥
2. 由于密钥空间是非线性的，无法兼容BIP的Hierarchical Deterministic Key Derivation,我们可能需要另外的套件去支持KDF

## Hash algorithm - Blake2b

### 安全性考量
Blake2的前身是Blake，Blake和keccak当时一起竞争SHA3标准的时候失利了，当时失利的原因而Blake和sha2有点相似，而NIST的目标是一个完全不同于SHA2标准的Hash算法。
>desire for SHA-3 to complement the existing SHA-2 algorithms … BLAKE is rather similar to SHA-2.

事实上在安全性评估上NIST给了Blake相当高的评价，其 [report](https://nvlpubs.nist.gov/nistpubs/ir/2012/NIST.IR.7896.pdf)形容Blake，

>"BLAKE and Keccak have very large security margins."。
所以一般而言我们可以认为blake2的安全性和keccak不会有大的区别。

### 性能考量
根据大量的数据Blake2的性能表现在现代的通用CPU(X86 ARM等)上的表现远远领先于其它任何Hash算法，具体性能表现可以参考这个[链接](http://bench.cr.yp.to/results-sha3.html)

Blake2的另一个特点是用ASIC设计的Blake2算法能达到的峰值并不会很高，这就意味着挖矿的峰值速率相对较低，这也是我们希望的。其它关于Blake2的特点可以参考此 [链接](https://blake2.net/)


名词解释:
1. ECDSA是使用椭圆曲线的数字签名算法
2. secp256k1是ECDSA算法的一个参数
3. sec是SECG 推出的 Standards for Efficient Cryptogrpahy 
4. p的意思是这个椭圆曲线使用 prime field，相对应的
5. 256的意思是 prime的长度是256bits
6. k 是Koblitz曲线 
7. 1 意味着它是第一个(事实上也是唯一)标准曲线的类型
8. Ed25519 是一个使用SHA512/256的和[Curve25519](https://en.wikipedia.org/wiki/Curve25519)的 [EdDSA签名算法](https://en.wikipedia.org/wiki/EdDSA)
9. NIST National Institute of Standards and Technology 
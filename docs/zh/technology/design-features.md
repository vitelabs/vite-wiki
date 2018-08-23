# 设计特点

::: tip 提示
本文用于放置前期基础技术选型的结论
:::
# 一、数字签名算法 - [Ed25519](https://ed25519.cr.yp.to/)
## 背景
数字签名的目的是创造和我们合同上签字一样的**不可抵赖性**，其核心属性是：通过签名的消息可以明确知道其发起人，因为只有唯一的签名者的私钥才能计算出有效的签名，这也就意味着该消息确实是签名方生成的，这种证明在一些国家具有法律上的意义，比如美国的电子签名法案，德国的签名法等。

私钥签名，然后公布公钥、消息和签名数据让大家去验证，在这些步骤中公私钥对扮演着最重要的角色，它们总是成对出现，而且就像量子纠缠一样互不分离。公私钥一般是通过一个特殊的单向函数和一个随机数生成，这种单向函数往往正向求解（ f(x) = y） 是多项式难度，而逆向求解（ f<sup>-1</sup>(y) = x）是指数级难度。假设x是私钥，y是公钥，那么从私钥推导出公钥在现代计算机体系上需要大到没有任何单位能承受的消耗，所以在目前来看是非常安全的，但是如果量子计算机在未来真的能研究出来的话，那么现在这些广泛基于RSA，DLP（离散对数问题），和从DL上扩展来的ECC（椭圆曲线密码学）的非对称加密机制都是不安全的，如何做到quantum safe，这大约是个和研究量子计算机一样漫长的岁月。



签名算法在区块链系统中处于**最基础**的位置，账户地址、交易的产生都与之紧密相关，所以在签名算法的选择上，我们必须兼顾**安全**和**性能**，其中安全是首要的，中本聪当时选择的是ECDSA over secp256k1，secp256k1是SECG定义的一个Koblitz曲线，在他使用前几乎无人问津，它设计透明，而不像NIST选中的secp256r1（也就是现在主流常用的P256）曲线中有一些诡异的参数，这些参数被广泛地认为是NSA植入的[后门](https://www.ams.org/notices/201402/rnoti-p190.pdf)，后来的一系列事件也确实证明了中本聪的选择是非常具有前瞻性的，于是以太坊、EOS等也都跟进了中本聪的想法，但是随着Ed25519专利期限制解除，包括[比特币的核心开发者们](https://bitcointalk.org/index.php?topic=103172.msg1134832#msg1134832)和[Vitalik Buterin](https://blog.ethereum.org/2015/07/05/on-abstraction/)都讨论过是否迁移到Ed25519，链接中可见他们的态度都比较暧昧地倾向于使用Ed25519，但可能由于迁移成本太大所以未能成行，而ripple则是在14年就果断迁移了过去。

## 安全性考量
Ed25519在安全性上经过大量独立的知名安全专家评测后被认为是"safe"，而secp256k1是"unsafe"，[参考链接](https://safecurves.cr.yp.to/)。

## 性能考量
vite为了满足了工业级应用对高吞吐、低延迟和扩展性的要求，设计了许多优化的方案，比如提出了"交易分解"这个概念，其含义是会把一个交易拆成类似于"请求"和"响应"这样的一对交易，那么再结合我们如此高的TPS，可以预见在vite的公链系统中对交易的验证和确认是非常频繁发生的，也就是说整体系统的性能表现对签名和验签算法的速度高低会相当敏感。根据现在的数据Ed25519的性能数倍快于ECDSA over secp256k1 ([ripple的benchmark](https://ripple.com/dev-blog/curves-with-a-twist/))，我相信这对我们系统的性能提升会带来很大的帮助。不仅如此，Ed25519的签名长度也略小于ECDSA，这给就网络传输和存储系统减轻了不小的压力。

（更详细的Benchmark可以参考[链接](https://bench.cr.yp.to/primitives-sign.html)）

## 改造
我们把标准Ed25519的SHA2替换成了Blake2b。

## 不足
由于密钥空间是非线性的，无法兼容BIP的Hierarchical Deterministic Key Derivation。
***
# 二、Hash算法 - [Blake2b](https://blake2.net/)
## 背景
哈希算法的作用是对一串任意长的消息生成一个短的固定长的摘要，Hash函数也是一个单向函数，但是和非对称加密系统中的单向函数的差别在于，后者的单向函数往往是追求反向求解在实际操作上不可能，但理论上是可能的，或者换句话说公钥含有推导出私钥的完整信息。但是哈希函数则不一样它理论上不能逆向，而实际上却往往可以，理论上来说，一个哈希值可以有无穷多个原像对应它，给一个简单的证明，假设一个哈希函数的输出是n个bit，那么这个Hash函数的所有输出值只有2<sup>n</sup>个，而输入是无限制的，那么根据鸽巢原理，如果输入的原像是m * 2<sup>n</sup>个bit长且Hash函数的输出是均匀分布的，那么即使得到某个X，使得Hash(X) = target，这样X只是有1/m的概率是真实的原像（如果Hash函数输出不是均以分布那么其概率更小）。但实际上受限于存储和计算能力，输入的原文的长度不会很长，这意味着m的值不会很大，所以X是真实原像的概率还是比较大的。

Hash函数在我们的系统中，担负着挖矿，数据的防篡改等功能，它和签名算法一样是**最基础**的组件，所以同样我们在技术选型的时候要着重考量其**安全**和**性能**。

# 安全性考量
Blake2的前身是Blake，Blake和keccak当时一起竞争SHA3标准的时候失利了，当时失利的原因是Blake和sha2的实现有点相似，而NIST的目标是一个完全不同于SHA2标准的Hash算法。

>desire for SHA-3 to complement the existing SHA-2 algorithms … BLAKE is rather similar to SHA-2.

事实上在安全性评估上NIST给了Blake相当高的评价，其 [report](https://nvlpubs.nist.gov/nistpubs/ir/2012/NIST.IR.7896.pdf)形容Blake，

>“BLAKE and Keccak have very large security margins.”。

所以一般而言我们可以认为blake2的安全性和keccak不会有大的区别。

## 性能考量
根据大量的数据Blake2的性能表现在现代的通用CPU(X86 ARM等)上的表现远远领先于其它任何Hash算法。（具体性能表现可以参考[链接](http://bench.cr.yp.to/results-sha3.html)）

Blake2的另一个特点是用ASIC设计的Blake2算法能达到的峰值并不会很高，这就意味着挖矿的峰值速率相对较低，这也是我们希望的。

***
# 三、 密钥派生函数 - [scrypt](https://github.com/Tarsnap/scrypt)
## 背景
密钥派生函数(Key Derivation Function) ，简单而言就是使用一个主密钥派生子密钥的函数，比如把一个短的字符串通过KDF的运算扩展成需要的形式，它和Hash函数很类似，最大不同在于它会引入随机量从而防止黑客进行一些查表攻击等（比如彩虹表 rainbow tables）。我们采用的scrypt是一种内存依赖性的KDF，它每一次计算都要占用大量内存资源，消耗很长时间，所以暴力攻击也几乎是不可能的。

KDF在我们的系统中处于非基础性的地位，我们把用户输入的随机短密码经过KDF之后，转换成256bits的密钥，然后使用这个密钥配合AES-256-GCM算法，加密Ed25519私钥，从而安全地在PC上保存我们的私钥。

## 选择原因
从技术角度来看scrypt相比于获得15年的Password Hashing Competition的argon2来说安全性上并没有大的区别，但是由于其诞生更早使用更广泛所以在实践角度看显得更成熟一点，argon2如果再有两到三年年仍然没有被发现大的问题，我们也有可能会使用它。
***
# 四、相关名词解释
ECDSA(Elliptic Curve Digital Signature Algorithm)是使用椭圆曲线的数字签名算法

* secp256k1是ECDSA算法的一个参数
    * sec是SECG（Standards for Efficient Cryptography Group） 推出的 Standards for Efficient Cryptogrpahy
    * p的意思是这个椭圆曲线使用 prime field，相对应的
    * 256的意思是 prime的长度是256bits
    * k 是Koblitz曲线
    * 1 意味着它是第一个(事实上也是唯一)标准曲线的类型

* Ed25519 是一个使用SHA512/256的和[Curve25519](https://en.wikipedia.org/wiki/Curve25519)的 [EdDSA签名算法](https://en.wikipedia.org/wiki/EdDSA)

* NIST(National Institute of Standards and Technology) 美国国家标准与技术研究院，他们制定了一些安全标准，比如SHA3,P256等

* NSA(National Security Agency) 美国国家安全局

* AES-256-GCM 256位密钥的拥有对消息的加密和完整性校验对称加密算法
# HD 钱包

:::tip Vite 官方所有钱包均为HD钱包，具体派生规则请浏览：[VEP-3](../../vep/vep-3.md)

有关HD协议，请浏览：[HD Protocol, HD Wallet, BIP3](https://bitcoin.org/en/glossary/hd-protocol) :::

### 共同的过程

1. Vite钱包使用BIP39生成24个助记词和对应的熵;
2. 使用这个助记词生成Seed,在这步中我们暂时不支持[Two-Factor Seed Phrases](https://en.bitcoin.it/wiki/Seed_phrase);
3. 使用参数为SHA512和key为`ed25519 blake2b seed`的HMAC算法，对Seed进行Hash之后派生出我们的MasterKey
4. 根据BIP44规则，我们可以利用Master Key派生出我们Vite需要的私钥和地址，我们在[SLIP-0044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md))上注册的`coin_type`是 **666666**

### 密码的作用

在创建账户的账户的时候用户需要输入一个 **密码**，该密码并不是`Two-Factor Seed Phrases`,而是我们用来加密存储BIP39对应的熵的参数之一，具体加密过程，在IOS，Web钱包和go-vite自带钱包上各有不同，具体为

* **go-vite钱包**：使用标准参数的 `scrypt` 算法将该密码扩展成 `256bit` 对 `aes-gcm` 算法的私钥来加密熵，将其存储成EntropyStory的文件形式。保存在用户的文件系统中，用户可以自由的备份这个文件，即使忘记助记词，只要有密码和该文件一样可以恢复用户的助记词.
* **Web钱包**：

* **iOS钱包**：

### 助记词恢复账户的过程

单个助记词，在`vep-3: m/44'/666666'/x'`的规则下，理论上可以派生`2^32-1`个地址,如果用户忘记了某个Vite地址对应的私钥，甚至是Vite地址也忘记了，我们是如何通过助记词恢复用户的账户呢？

在Web、IOS和将来的Android端上，我们默认一个助记词最多生成10个地址，在恢复账号的时候，我们会遍历该助记词的0-9号地址，去查询这些地址是否有过交易，如果发现8号地址有过交易，我们会立即恢复用户序号0-8的所有地址，所以在Vite端上钱包，只要保护好助记词，不必担心因为忘记地址或者私钥带来财产损失.

### 大规模派生地址的方案

开发人员可以直接集成 go-vite的 wallet模块，在创建助记词并且解锁后，可以获得一个`entropystore.Manager`，其中有`DeriveForFullPath`和`DeriveForIndexPath`两个方法

1. `DeriveForIndexPath`： 传入某个`uint32`值之后，我们会扩展成`m/44'/666666'/x'`的形式调用`DeriveForFullPath`派生对应的地址，并且将对应的序号的私钥和账户地址返回给开发者，开发者可以自由的维护序号，地址和私钥的关系，最多可以产生`2^32-1`个地址

2. `DeriveForFullPath`: 顾名思义，传入的是完整的`m/44'/666666'/x'`的序号，我们会派生对应的地址和私钥，这个方法还可以被超大规模系统使用，如果某个系统对地址的需求数量超过2^32级别，那么有两种方案，第一是再创建一个新的助记词，第二是，传入形如`m/44'/666666'/x'/y'/z'/...`，每个子级别，都有`2^32-1`个子地址
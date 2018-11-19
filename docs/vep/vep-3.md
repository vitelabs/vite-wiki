# VEP 3: Vite 钱包私钥派生方法

## 摘要

VEP 3 定义Vite钱包派生私钥的方法，支持多种curve算法。

## 动机

分层钱包（Hierarchical Deterministic Wallet）可以允许用户从一个简单的seed派生出多个私钥，利于备份、转移到其他相容钱包（例如：硬件钱包）、支持多币种。

## 内容

把seed用方便记忆和书写的单字表示。一般由12或者24个单词组成，称为助记词（mnemonic code），这个遵循[BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)协议。

基于[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)，让同一个seed可以支持多币种、多账户。这个遵循[BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)。

由于Vite采用ED25519来签名，而并非BIP32采用的secp256k1，为此我们需要寻找一个和BIP32相兼容的私钥派生方案。实现方案和[ed25519-bip32](https://cardanolaunch.com/assets/Ed25519_BIP.pdf)类似。


### BIP44 兼容

[BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)定义了支持多币种的BIP32路径
```
m / purpose' / coin_type' / account' / change / address_index
```
开头我们和BIP44保持一致都是:
```
m/44'
```
我们在 [SLIP-0044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md))上注册的`coin_type`是 **666666**，所以我们的固定开头都是形如:
```
m/44'/666666'/
```
对于某个特定的地址路径，我们还需要一个或者两个域，所以在Vite中我们定义如下形式
```
m/44'/666666'/x'
```
* x: 序号，特殊地我们把`m/44'/666666'/0'`产生的地址为该助记词在Vite上的 **Primary Address**

## 测试用例
### 熵
```
87ad0e066111ed827dc1f7be4d1bf53b9a7be84021a0950418d3f45ed4d54f1c
```
### 助记词
```
marble half light season burst scorpion warfare discover salad hand wool jaguar police vintage above cross never camp crunch trim unhappy height detect opinion
```
### BIP39 Seed
```
2ba1d8e696d17ac4d75b9f479c527450d439c9acd2b4d542d27e3a7f3418cd241717d2db41f47d8bbae9fc90fe551c4db87f7491104f030f6eceaf1b24f15f4d
```
### 派生的Ed25519 seed和对应地址

```
m/44'/666666'/0' bb369222613ad7b1a646d84d8c749c30cfa5879f5152b7bd7c1f9f6553ce0eb5  vite_da3ca9bac9f05fce8f4eead36610756b6eb48282ff10a81d6d
m/44'/666666'/1' 529892283122a9a09059a73147cb9feea480bb3feed91e7968243f4b67ccb3ea  vite_e5deb80a64f51593398ba1049af435291e3cb5c69a66755f13
m/44'/666666'/2' 9ef6f33aaf05fa1cf6e8c396b01a5ea08295a829b595f636759343d363a6a967  vite_fbdd0c038f808560f9637754cbbbfa95ed2e7cdb96113ea7eb
m/44'/666666'/3' 6da0edd6d81033b4b2d41f376574448876e7b4f841aedd7deaf8bb6d7934b800  vite_2aa258c33a2d16d01da651a9423abc384f6367112c0f73fa5d
m/44'/666666'/4' 98d2311c78e6407bf0c443ab51593c4b663ce3af3165a48a278ed0a6a2f701f3  vite_b8d401c1c7b3f32bf7d9c7a44c8d594fcdad103bb6775bd016
m/44'/666666'/5' bd18f1dfc81bc742cda2c3739a42fb622415d62b8fd6035ff8bad2a9b13f26b6  vite_7aba6649b09a43130445dd70857e77bef347e2da2a7b81f608
m/44'/666666'/6' b1cf0511a4bb7a154cf0f6c416a3186c4d6fe8cd53413c6503e80445918837e8  vite_5ef7da6c7fb79051921d0c6cf7440fb9f1b46d7aaf5607a069
m/44'/666666'/7' 2b31aa5f86e1207baa4ec93dd397c878ef53255a3ca64cafa970bb6513fb7099  vite_6ebaad8ee67e5368884ae2de652024093453ec13d8f17e0afa
m/44'/666666'/8' 87210e4ec4776ab5e6bc146255b1e649f6a4f99e754ff31e421e2f43784f2aff  vite_ec84678c2d6f1f12596552a0d676ab233d17249463973f7238
m/44'/666666'/9' e02109c47903e2f8858660f30642e3698a263f0277ad2f364527bc75275a82ec  vite_1720f21b3a66c30da966ef51dc59c091543da012bcb69ae8a4

```
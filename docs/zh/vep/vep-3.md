# VEP 3: Vite 钱包私钥派生方法

## 摘要

VEP 3 定义Vite钱包派生私钥的方法，支持多种curve算法。

## 动机

分层钱包（Hierarchical Deterministic Wallet）可以允许用户从一个简单的seed派生出多个私钥，利于备份、转移到其他相容钱包（例如：硬件钱包）、支持多币种。

## 内容

把seed用方便记忆和书写的单字表示。一般由12或者24个单词组成，称为助记词（mnemonic code），这个遵循[BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)协议。

基于[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)，让同一个seed可以支持多币种、多账户。这个遵循[BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)。

由于Vite采用ED25519来签名，而并非BIP32采用的secp256k1，为此我们需要寻找一个和BIP32相兼容的私钥派生方案。实现方案和[ed25519-bip32](https://cardanolaunch.com/assets/Ed25519_BIP.pdf)类似。


TODO

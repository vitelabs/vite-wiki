---
sidebarDepth: 4
---

# 常用类型及说明

## 类型

### Address
账户地址
```java
// 创建地址对象
Address address = new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd");
Address address = Address.stringToAddress("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd");
// 判断是否用户地址
boolean isUser = address.isUser();
// 判断是否合约地址
boolean isContact = address.isContract();
```
### TokenId
代币id
```java
// 创建代币id对象
TokenId tokenId = new TokenId("tti_5649544520544f4b454e6e40");
TokenId tokenId = TokenId.stringToTokenId("tti_5649544520544f4b454e6e40");
```

### Hash
32字节长度的blake2b哈希
```java
// 创建hash对象
Hash hash = new Hash("7683bbc8be1391172ed21cc1fe0843ac3b1311109aa329601b73f717e6a93b53");
Hash hash = Hash.stringToHash("7683bbc8be1391172ed21cc1fe0843ac3b1311109aa329601b73f717e6a93b53");
// 计算一个字节数组的hash
byte[] data = BytesUtils.hexStringToBytes("7683bbc8be1391172ed21cc1fe0843ac3b1311109aa329601b73f717e6a93b53");
Hash dataHash = Hash.dataToHash(data);
```

## 常量

```java
// VITE 代币id
TokenId VITE_TOKEN_ID = new TokenId("tti_5649544520544f4b454e6e40");
// 配额合约地址
Address ADDRESS_QUOTA_CONTRACT = new Address("vite_0000000000000000000000000000000000000003f6af7459b9");
// 共识合约地址
Address ADDRESS_GOVERNANCE_CONTRACT = new Address("vite_0000000000000000000000000000000000000004d28108e76b");
// 资产合约地址
Address ADDRESS_ASSET_CONTRACT = new Address("vite_000000000000000000000000000000000000000595292d996d");
// 配额合约ABI定义
Abi ABI_QUOTA_CONTRACT = Abi.fromJson(ABI_JSON_QUOTA_CONTRACT);
// 共识合约ABI定义
Abi ABI_GOVERNANCE_CONTRACT = Abi.fromJson(ABI_JSON_GOVERNANCE_CONTRACT);
// 资产合约ABI定义
Abi ABI_ASSET_CONTRACT = Abi.fromJson(ABI_JSON_ASSET_CONTRACT);
```




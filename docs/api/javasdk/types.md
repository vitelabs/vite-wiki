---
sidebarDepth: 4
---

# Common Types

## Class

### Address
Address of account
```java
// create address object
Address address = new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd");
Address address = Address.stringToAddress("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd");
// is a user address?
boolean isUser = address.isUser();
// is a contract? 
boolean isContact = address.isContract();
```
### TokenId
Token ID
```java
// create token ID
TokenId tokenId = new TokenId("tti_5649544520544f4b454e6e40");
TokenId tokenId = TokenId.stringToTokenId("tti_5649544520544f4b454e6e40");
```

### Hash
32-byte Blake2b hash
```java
// create hash object
Hash hash = new Hash("7683bbc8be1391172ed21cc1fe0843ac3b1311109aa329601b73f717e6a93b53");
Hash hash = Hash.stringToHash("7683bbc8be1391172ed21cc1fe0843ac3b1311109aa329601b73f717e6a93b53");
// generate hash of a byte string
byte[] data = BytesUtils.hexStringToBytes("7683bbc8be1391172ed21cc1fe0843ac3b1311109aa329601b73f717e6a93b53");
Hash dataHash = Hash.dataToHash(data);
```

## Constant

```java
// VITE token ID
TokenId VITE_TOKEN_ID = new TokenId("tti_5649544520544f4b454e6e40");
// Address of built-in smart contract (quota) 
Address ADDRESS_QUOTA_CONTRACT = new Address("vite_0000000000000000000000000000000000000003f6af7459b9");
// Address of built-in smart contract (governance) 
Address ADDRESS_GOVERNANCE_CONTRACT = new Address("vite_0000000000000000000000000000000000000004d28108e76b");
// Address of built-in smart contract (asset) 
Address ADDRESS_ASSET_CONTRACT = new Address("vite_000000000000000000000000000000000000000595292d996d");
// ABI of built-in smart contract (quota) 
Abi ABI_QUOTA_CONTRACT = Abi.fromJson(ABI_JSON_QUOTA_CONTRACT);
// ABI of built-in smart contract (governance) 
Abi ABI_GOVERNANCE_CONTRACT = Abi.fromJson(ABI_JSON_GOVERNANCE_CONTRACT);
// ABI of built-in smart contract (asset) 
Abi ABI_ASSET_CONTRACT = Abi.fromJson(ABI_JSON_ASSET_CONTRACT);
```




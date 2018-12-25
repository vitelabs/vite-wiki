---
sidebarDepth: 1
---
# 工具集合

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip abstract
utils 包含常用的工具方法，例如：address生成，keystore加密等。
:::

## Encoder   

### bytesToHex 
-  **params**
  - ``:`buffer` hex encoded address
- **return**
  - `addr`:`string` blake2b address   
  
### hexToBytes
-  **params**
  - `hexaddr`:`string` hex encoded address
- **return**
  - `addr`:`string` blake2b address

### getBytesSize Get length of bytes underlying different length   
-  **params**
  - `value`:`buffer`
  - `code`:`utf8|utf16` Encoded format
- **return**
  - `length`:`number` Length of bytes
  
### utf8ToBytes  Transfer utf8 to bytes
-  **params**
  - `value`:`string` uft8 encoded string
- **return**
  - `target`:`Uint8Array` 
  
- blake2b Quick reference of blake2b Reference [...]

## Tools
### signTX
-  **params**
  - `block`:`accountBlock` hex encoded address
  - `privateKey`:`string` private key
  - `type`:`byte|hex` Encoded style of return values: hex/byte
- **return**
 `object`
    - `hash`:`string` Signature hash
    - `pubKey:`buffer|hexstring` Public key
    - `signature`:`buffer|hexstring` Signature result

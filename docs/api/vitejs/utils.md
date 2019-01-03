---
sidebarDepth: 1
---
# Utils

:::tip Created by
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip Abstract
utils contains general functions and tools such as generating address and encrypting keystore.
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
  
- blake2b Concise reference of blake2b Reference [...]

## Tools
### signTX
-  **params**
  - `block`:`accountBlock` hex encoded address
  - `privateKey`:`string` docs/api/vitejs/utils/keystore.mdprivate key
  - `type`:`byte|hex` Encoded style of return values: hex/byte
- **return**
 `object`
    - `hash`:`string` Signature hash
    - `pubKey:`buffer|hexstring` Public key
    - `signature`:`buffer|hexstring` Signature result

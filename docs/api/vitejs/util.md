---
sidebarDepth: 1
---
# Utilization

:::tip Created by
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip Abstract
Constants: method，type，address
:::

## Address
### newHexAddr Generating hex address according to private key
- **params**
  - `privateKey`:`string` Private key
- **return**
  - `hexaddr`:`string` hex encoded address



### getAddrFromHexAddr  Get real address
- **params**
  - `hexaddr`:`string` hex encoded address
- **return**
  - `addr`:`string` blake2b address


### isValidHexAddr Verify if it is a legal hex address
- **params**
  - `hexaddr`:`string` hex encoded address
- **return**
  - `validate`:`boolean` Legally or not
  

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

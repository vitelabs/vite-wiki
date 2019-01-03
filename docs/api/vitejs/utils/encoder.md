---
sidebarDepth: 1
---

# Encoder

:::tip Created by
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip Abstract
Utils include common tool sets such as generating address and encrypting keystore, etc.
:::  

## bytesToHex 
- **params**
  - `arr : buffer`
- **return**
  - `addr : string` hex string  
  
## hexToBytes
- **params**
  - `hex : string` hex
- **return**
  - `arr : array` bytes

## getBytesSize 
Get different byte length of encoded string

- **params**
  - `str : string` 
  - `charset : utf8 | utf16` 
- **return**
  - `length : number`
  
## utf8ToBytes
Convert utf8 string to bytes

- **params**
  - `str : string` utf8 string
- **return**
  - `target : Uint8Array` Bytes
  
## blake2b 
Quick reference to blake2b. See more about [blakejs/blake2b](https://www.npmjs.com/package/blakejs)

## _Buffer 
Quick reference to buffer.

---
sidebarDepth: 1
---

# encoder

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip abstract
utils 包含常用的工具方法，例如：address生成，keystore加密等。
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
获取不同编码字符串的字节长度

- **params**
  - `str : string`  字符串
  - `charset : utf8 | utf16` 编码格式
- **return**
  - `length : number` 字节长度
  
## utf8ToBytes
utf8字符串转换为字节

- **params**
  - `str : string` uft8编码字符串
- **return**
  - `target : Uint8Array` 字节
  
## blake2b 
对blake2b的快捷引用 参考 [blakejs/blake2b](https://www.npmjs.com/package/blakejs)

## _Buffer 
对buffer的快捷引用

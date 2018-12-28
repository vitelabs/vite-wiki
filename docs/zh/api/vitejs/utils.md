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

## encoder   

### bytesToHex 
-  **params**
  - ``:`buffer` hex编码地址
- **return**
  - `addr`:`string` blake2b地址   
  
### hexToBytes
-  **params**
  - `hexaddr`:`string` hex编码地址
- **return**
  - `addr`:`string` blake2b地址

### getBytesSize 获取bytes在不同编码下的长度   
-  **params**
  - `value`:`buffer`
  - `code`:`utf8|utf16` 编码格式
- **return**
  - `length`:`number` 长度
  
### utf8ToBytes  转换utf8微bytes
-  **params**
  - `value`:`string` uft8编码字符串
- **return**
  - `target`:`Uint8Array` 
  
- blake2b 对blake2b的快捷引用 参考[...]

## tools
### signTX
-  **params**
  - `block`:`accountBlock` hex编码地址
  - `privateKey`:`string` 私钥
  - `type`:`byte|hex` 返回值编码格式，hex/byte
- **return**
 `object`
    - `hash`:`string` 签名hash
    - `pubKey:`buffer|hexstring` 公钥
    - `signature`:`buffer|hexstring` 签名结果

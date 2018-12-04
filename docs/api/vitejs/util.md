# 工具方法

:::作者
[hurrytospring](https://github.com/hurrytospring)
:::

:::abstract
const 包括一些常量：method，type，address。
:::

## address
### newHexAddr 根据私钥生成hex地址
- **params**
  - `privateKey`:`string` 私钥
- **return**
  - `hexaddr`:`string` hex编码地址



- getAddrFromHexAddr  获取真实地址
- **params**
  - `hexaddr`:`string` hex编码地址
- **return**
  - `addr`:`string` blake2b地址


- isValidHexAddr 校验是否为合法的hex地址
- **params**
  - `hexaddr`:`string` hex编码地址
- **return**
  - `validate`:`boolean` 是否合法
  

## encoder   

- bytesToHex 
- - **params**
  - ``:`buffer` hex编码地址
- **return**
  - `addr`:`string` blake2b地址   
  
- hexToBytes
- - **params**
  - `hexaddr`:`string` hex编码地址
- **return**
  - `addr`:`string` blake2b地址

- getBytesSize 获取bytes在不同编码下的长度   
- - **params**
  - `value`:`buffer`
  - `code`:`utf8|utf16` 编码格式
- **return**
  - `length`:`number` 长度
  
- utf8ToBytes  转换utf8微bytes
- - **params**
  - `value`:`string` uft8编码字符串
- **return**
  - `target`:`Uint8Array` 
  
- blake2b 对blake2b的快捷引用 参考[...]

## tools
- signTX
- - **params**
  - `block`:`accountBlock` hex编码地址
  - `privateKey`:`string` 私钥
  - `type`:`byte|hex` 返回值编码格式，hex/byte
- **return**
 `object`
    - `hash`:`string` 签名hash
    - `pubKey:`buffer|hexstring` 公钥
    - `signature`:`buffer|hexstring` 签名结果

---
sidebarDepth: 1
---

# keystore

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip abstract
utils 包含常用的工具方法，例如：address生成，keystore加密等。
::: 

## keystore 结构

## isValid 
keystore是否合法

- **params**
  - `keystore : string` keystore string
- **return**
  - `validate : boolean` 是否合法

## decrypt
解密keystore

- **params**
  - `keystore : string` keystore string
  - `pwd : string` 密码
- **return**
  - Promise<`key : string`> 加密前的字符串

## encrypt
加密keystore

- **params**
  - `keystore : string` keystore string
  - `pwd : string` 密码
  - `scryptParams : Object` 加密参数(非必填)
    - n
    - r
    - p
    - keylen
    - salt
- **return**
  - Promise<`keystore: string`> 加密后的keystore字符串

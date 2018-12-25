# keystore

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

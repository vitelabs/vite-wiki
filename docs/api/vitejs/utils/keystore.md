# Keystore

## Keystore Structure
---
sidebarDepth: 1
---

# keystore

:::tip 作者
[cs](https://github.com/lovelycs)
:::

## isValid 
keystore is valid or not

- **params**
  - `keystore : string` keystore string
- **return**
  - `validate : boolean` valid or not

## Decrypt
Decrypt keystore

- **params**
  - `keystore : string` Keystore String
  - `pwd : string` Password
- **return**
  - Promise<`key : string`> String before encrypts

## Encrypt
Encrypt Keystore

- **params**
  - `keystore : string` Keystore String
  - `pwd : string` Password
  - `scryptParams : Object` Encrypt Parameters (Optional)
    - n
    - r
    - p
    - keylen
    - salt
- **return**
  - Promise<`keystore: string`> Keystore String

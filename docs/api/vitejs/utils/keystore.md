# Keystore

## Keystore Structure
---
sidebarDepth: 1
---

# Keystore

:::tip Created by
[cs](https://github.com/lovelycs)
:::

## isValid 
keystore is valid or not

- **params**
  - `keystore : string` keystore string
- **return**
  - `validate : boolean` valid or not

## decrypt
Decrypt keystore

- **params**
  - `keystore : string` Keystore String
  - `pwd : string` Password
- **return**
  - Promise<`key : string`> String before encrypts

## encrypt
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

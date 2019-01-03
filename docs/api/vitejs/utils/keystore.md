# keystore

:::tip Created by
[cs](https://github.com/lovelycs)
:::

## Keystore Structure

```javascript
// example
let keystore = {
    "uuid":"fe4a9460-0b3a-11e9-8975-e744cf968fe6",
    "crypto":{
        "ciphername":"aes-256-gcm","ciphertext":"0f2eabd62c2b479e18a8445f2a6449cc77895c5ce24e8e93bf24356b0080de67373956a69499145a262a6bed36873e35","nonce":"c1e22b37a56fc4280d1947a0",
        "kdf":"scrypt",
        "scryptparams":{
            "n":4096,
            "r":8,
            "p":6,
            "keylen":32,
            "salt":"11a75fdee6bc20084628e55ec3c26ea4120dd8053e39757e164f7642b3d0af73"
        }
    },
    "version":3,
    "timestamp":1546068361382
};
```

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

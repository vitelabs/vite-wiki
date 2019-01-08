# Pow

:::tip Maintainer
[TiantaoZhu](https://github.com/TiantaoZhu)
:::

## pow_getPowNonce
Return the calculated PoW nonce. Usually this method is used to calculate a PoW to obtain an one-time quota.

- **Parameters**: 
1. `difficulty`: `string` - PoW difficulty in decimal `bigInt` string
2. `data` :`Hash` -  `Hash(address + prehash)`. The hash of (20-byte binary account address + hash of previous transaction(0 if no previous transaction))

- **return**:
1. `nonce`:`[]byte` - PoW nonce in base64 byte array

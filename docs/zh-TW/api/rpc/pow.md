# Pow

:::tip 维护者 [TiantaoZhu](https://github.com/TiantaoZhu) :::

## pow_getPowNonce

计算一个pow的nonce

- **Parameters**: 

1. `difficulty`: `string` - 十进制bigint的string表示， 本期忽略这个参数
2. `data` :`Hash` - Hash(address + prehash) 该账户二进制地址（20字节） + 上一个交易的hash（如果是第一个那么就是全0），然后再对它们取一次hash

- **return**:

1. `nonce`:`[]byte` - base64的byte数组 pow的nonce
# Pow
## tiantao

## pow_getPowNonce
Return the resolved PoW nonce

- **Parameters**: 
1. `difficulty`: `string` - PoW difficulty in decimal bigInt string
2. `data` :`Hash` -  The hash of 20-byte account binary address + the hash of previous transaction(zero if there is no previous transaction)

- **return**:
1. `nonce`:`[]byte` - Resolved PoW nonce in base64 byte array

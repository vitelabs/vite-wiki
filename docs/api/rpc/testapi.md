# TestApi

:::tip Maintainer
[TiantaoZhu](https://github.com/TiantaoZhu)
:::

## testapi_getTestToken
Obtain Vite test tokens. This method will send a random of 1-1001 test tokens to the specified address.

- **Parameters**: 
`toAddress`: `address` - The account address to receive test tokens

- **return**:

1. `string`:`bigint` - The actual amount of test tokens that have been sent
2. `error`: Error message

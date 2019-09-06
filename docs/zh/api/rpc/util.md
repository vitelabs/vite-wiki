# util

:::tip 维护者
[vite-crzn](https://github.com/vite-crzn)
:::

## util_getPoWNonce
计算一个PoW的nonce

- **Parameters**: 
  * `string bigint`: PoW难度
  * `string hash`: Blake2b(address + previousHash)，例如，当address为`vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a`，previousHash为`0000000000000000000000000000000000000000000000000000000000000000`时，结果为`8689fc3e7d0bcad0a1213fd90ab53437ce745408750f7303a16c75bad28da8c3`

- **Returns**: 
  - `string base64`: nonce
    
- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "util_getPoWNonce",
	"params": ["67108863","35c82fe515c2982c5ef75226eab35f3fb14952f8ef59005f02893cd3dca4db09"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "e5WeaVy7tSs="
}
```
:::


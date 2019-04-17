---
sidebarDepth: 4
---

# DexFund
:::tip Maintainer
[vite-crzn](https://github.com/vite-crzn)
:::

The built-in dex contract. Contract address is `vite_000000000000000000000000000000000000000617d47459a8`

**Supported protocol:**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; | future version| &#x2713; |

## dexfund_getAccountFundInfo
Return token account for specified address

- **Parameters**: 

  * `Address`: The address to query
  * `TokenId`: The token to query for this address
  
- **Returns**: 
	- `Map[TokenTypeId]AccountFundInfo`

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"dexfund_getAccountFundInfo",
   "params": [
   	  "vite_7318d099aa0cd15b2c372f05209e5a61c61732dbcb22f1e119",
   		"tti_322862b3f8edae3b02b110b1"
   	]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "tti_322862b3f8edae3b02b110b1": {
            "tokenInfo": {
                "tokenName": "BTC TOKEN",
                "tokenSymbol": "BTC",
                "totalSupply": "2100000000000000",
                "decimals": 8,
                "owner": "vite_ab9c2cdeec94bc188a58efbd0dabd1ed9bd1e87563da4c9174",
                "pledgeAmount": "0",
                "withdrawHeight": "0",
                "pledgeAddr": "vite_ab9c2cdeec94bc188a58efbd0dabd1ed9bd1e87563da4c9174",
                "tokenId": "tti_322862b3f8edae3b02b110b1",
                "maxSupply": "0",
                "ownerBurnOnly": true,
                "isReIssuable": false
            },
            "available": "6907908",
            "locked": "380610787"
        }
    }
}
```
:::

## dexfund_getAccountFundInfoByStatus
Return amount of specified address and token, the return value is related to `type`

- **Parameters**: 

  * `Address`: The address to query
  * `TokenId`: The token to query for this address
  * `byte`: Type for return amount(0 total, 1 available, 2 locked)

- **Returns**: 
	- `Map[TokenTypeId]string` 

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"dexfund_getAccountFundInfoByStatus",
   "params":[
   	  "vite_7318d099aa0cd15b2c372f05209e5a61c61732dbcb22f1e119",
   		"tti_322862b3f8edae3b02b110b1",
      0
   ]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "tti_322862b3f8edae3b02b110b1": "1000425048501"
    }
}
```
:::

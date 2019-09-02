---
sidebarDepth: 4
---

# DexFund
:::tip 维护者
[weichaolee](https://github.com/weichaolee)
[vite-crzn](https://github.com/vite-crzn)
:::

## RPC接口

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

### dexfund_getAccountFundInfo
查询指定用户特定币种余额

- **Parameters**: 

  * `Address`: 查询地址
  * `TokenId`: 查询币种，不设置查询全部
  
- **Returns**: 

	- `Map[TokenTypeId]AccountFundInfo` 账户列表

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

### dexfund_getAccountFundInfoByStatus
查询指定地址特定类型的账户余额

- **Parameters**: 

  * `Address`: 查询地址
  * `TokenId`: 查询币种，不设置查询全部
  * `byte`: 余额类型(0 合计, 1 可用, 2 冻结)

- **Returns**: 

	- `Map[TokenTypeId]string` 账户列表

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

### dexfund_getOrderByUserBlockHash
通过用户链下单交易hash查询新下订单详情

- **Parameters**: 

  * `blockHash`: 用户下单交易hash

- **Returns**: 

	- `Order`:订单详情

- **Example**:

::: demo

```json tab:Request
{
   "jsonrpc":"2.0",
   "id":1,
   "method":"dexfund_getOrderByUserBlockHash",
   "params": [
         "0d11226f8d65be07ee9c93b852b692d38163077c16869b96cbc7ebf5447af9e9"
         ]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "Id": "AAABAP/////h//////8AXTxlcgAAAQ==",
        "Address": "vite_7318d099aa0cd15b2c372f05209e5a61c61732dbcb22f1e119",
        "MarketId": 1,
        "Side": false,
        "Type": 0,
        "Price": "30",
        "TakerFeeRate": 200,
        "MakerFeeRate": 200,
        "TakerBrokerFeeRate": 0,
        "MakerBrokerFeeRate": 0,
        "Quantity": "200000000000000000000",
        "Amount": "6000000000000000000000",
        "LockedBuyFee": "12000000000000000000",
        "Status": 0,
        "Timestamp": 1564239218
    }
}
```
:::

### dexfund_getTokenInfo
查询指定币种详情

- **Parameters**: 

  * `token`

- **Returns**: 

	- `TokenInfo`: 币种详情

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"dexfund_getTokenInfo",
   "params": ["tti_5649544520544f4b454e6e40"]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "tokenSymbol": "VITE",
        "decimals": 18,
        "tokenId": "tti_5649544520544f4b454e6e40",
        "index": 0,
        "owner": "vite_050697d3810c30816b005a03511c734c1159f50907662b046f",
        "quoteTokenType": 1
    }
}
```
:::

### dexfund_getMarketInfo
查询指定交易对详情

- **Parameters**: 

  * `tradeToken`:交易对交易币种
  * `quoteToken`:交易对计价币种

- **Returns**: 

	- `MarketInfo`:交易对详情

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"dexfund_getMarketInfo",
   "params": [
   	"tti_2736f320d7ed1c2871af1d9d",
   "tti_5649544520544f4b454e6e40"]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "marketId": 1,
        "marketSymbol": "VTT-000_VITE",
        "tradeToken": "tti_2736f320d7ed1c2871af1d9d",
        "quoteToken": "tti_5649544520544f4b454e6e40",
        "quoteTokenType": 1,
        "tradeTokenDecimals": 18,
        "quoteTokenDecimals": 18,
        "takerBrokerFeeRate": 150,
        "makerBrokerFeeRate": 100,
        "allowMine": true,
        "valid": true,
        "owner": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
        "creator": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
        "stopped": false,
        "timestamp": 1564239218
    }
}
```
:::

### dexfund_getCurrentDividendPools
查询当前周期分红池详情

- **Parameters**: 

  * 无
 
- **Returns**: 

	- `map[types.TokenTypeId]DividendPoolInfo`:按币种计分红池详情

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"dexfund_getCurrentDividendPools",
   "params": []
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "tti_06822f8d096ecdf9356b666c": {
            "amount": "21377516291813696000",
            "quoteTokenType": 2,
            "tokenInfo": {
                "tokenSymbol": "ETH",
                "decimals": 18,
                "tokenId": "tti_06822f8d096ecdf9356b666c",
                "index": 0,
                "owner": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
                "quoteTokenType": 2
            }
        },
        "tti_322862b3f8edae3b02b110b1": {
            "amount": "3937648761",
            "quoteTokenType": 3,
            "tokenInfo": {
                "tokenSymbol": "BTC",
                "decimals": 8,
                "tokenId": "tti_322862b3f8edae3b02b110b1",
                "index": 0,
                "owner": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
                "quoteTokenType": 3
            }
        }
    }
}
```
:::

### dexfund_isPledgeVip
是否已抵押获取vip

- **Parameters**: 

  * `address`:查询地址
 
- **Returns**: 

	- `bool`:是否已抵押获取vip

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"dexfund_isPledgeVip",
   "params": ["vite_7318d099aa0cd15b2c372f05209e5a61c61732dbcb22f1e119"]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": false
}
```
:::


### dexfund_getInviterCode
查询邀请人已生成邀请码

- **Parameters**: 

  * `address`:邀请人地址
 
- **Returns**: 

	- `uint32`:邀请码

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"dexfund_getInviterCode",
   "params": ["vite_7318d099aa0cd15b2c372f05209e5a61c61732dbcb22f1e119"]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": 1418366712
}
```
:::

### dexfund_getInviteeCode
查询被邀请人已绑定邀请码

- **Parameters**: 

  * `address`:被邀请人地址
 
- **Returns**: 

	- `uint32`:已绑定邀请码

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"dexfund_getInviteeCode",
   "params": ["vite_7318d099aa0cd15b2c372f05209e5a61c61732dbcb22f1e119"]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": 3060374530
}
```
:::

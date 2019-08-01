---
sidebarDepth: 4
---

# DexFund
:::tip Maintainer
[weichaolee](https://github.com/weichaolee)
[vite-crzn](https://github.com/vite-crzn)
:::

## DexFund ABI definitions
Built-in dex contract, address: `vite_0000000000000000000000000000000000000006e82b8ba657`

### Deposit
ABI definition
```
{
  "type": "function",
  "name": "DexFundUserDeposit",
  "inputs": []
}
```
Inputs

| Input item | Name | Data type | source | comment |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| deposit address |  Address |sendBlock| |
| TokenId| deposit token |  TokenId |sendBlock| |
| Amount| deposit amount |  uint256 |sendBlock| |

### Withdraw
ABI definition
```
{
  "type": "function",
  "name": "DexFundUserWithdraw",
  "inputs": [
    {
      "name": "token",
      "type": "tokenId"
    },
    {
      "name": "amount",
      "type": "uint256"
    }
  ]
}
```
Inputs

| Input item | Name | Data type | source | comment |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| withdraw address |  Address |sendBlock| |
| token| withdraw token |  TokenId |ABI| |
| amount| amount |  uint256 |ABI| |

### NewMarket
Create trade pair

ABI definition
```
{
  "type": "function",
  "name": "DexFundNewMarket",
  "inputs": [
    {
      "name": "tradeToken",
      "type": "tokenId"
    },
    {
      "name": "quoteToken",
      "type": "tokenId"
    }
  ]
}
```
Inputs

| Input item | Name | Data type | source | comment |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| creator address |  Address |sendBlock| |
| tradeToken| trade token for new trade pair |  TokenId |ABI| |
| quoteToken| quote token for new trade pair |  TokenId |ABI| |

*** will sub 10,000 vite from dex account available for create fee ***

### NewOrder
ABI definition
```
{
  "type": "function",
  "name": "DexFundNewOrder",
  "inputs": [
    {
      "name": "tradeToken",
      "type": "tokenId"
    },
    {
      "name": "quoteToken",
      "type": "tokenId"
    },
    {
      "name": "side",
      "type": "bool"
    },
    {
      "name": "orderType",
      "type": "uint8"
    },
    {
      "name": "price",
      "type": "string"
    },
    {
      "name": "quantity",
      "type": "uint256"
    }
  ]
}
```
Inputs

| Input item | Name | Data type | source | comment |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| new order owner |  Address |sendBlock| |
| tradeToken| trade token of trade pair | TokenId |ABI| |
| quoteToken| quote token of trade pair | TokenId |ABI| |
| side| buy or sell for trade token |  bool |ABI| false buy,true sell |
| orderType| -  |  uint8 |ABI| 0 limit order|
| price| - |  string |ABI|string format of price, integer an decimals parts both max support 12 |
| quantity| quantity of trade token |  uint256 |ABI||

### PledgeForVx
Pledge Vite in order mine Vx

ABI definition
```
{
  "type": "function",
  "name": "DexFundPledgeForVx",
  "inputs": [
    {
      "name": "actionType",
      "type": "uint8"
    },
    {
      "name": "amount",
      "type": "uint256"
    }
  ]
}
```
Inputs

| Input item | Name | Data type | source | comment |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| peldge souce |  Address |sendBlock| |
| actionType| operation type |  uint8 |ABI| 1 pledge, 2 cancel pledge|
| amount| pledge amount or cancel pledge amount |  uint256 |ABI| at least 134 vite for pledge, leave at least 134 vite or cacel all for cancel pledge|

***pledge amount will sub from dex fund available of VITE***

### PledgeForVip
ABI definition
```
{
  "type": "function",
  "name": "DexFundPledgeForVip",
  "inputs": [
    {
      "name": "actionType",
      "type": "uint8"
    }
  ]
}
```
Inputs

| Input item | Name | Data type | source | comment |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| peldge souce |  Address |sendBlock| |
| actionType| operation type |  uint8 |ABI| 1 pledge, 2 cancel pledge|

***sub 10,000 VITE from dex fund available***

### MarketOwnerConfig
ABI definition
```
{
  "type": "function",
  "name": "DexFundMarketOwnerConfig",
  "inputs": [
    {
      "name": "operationCode",
      "type": "uint8"
    },
    {
      "name": "tradeToken",
      "type": "tokenId"
    },
    {
      "name": "quoteToken",
      "type": "tokenId"
    },
    {
      "name": "owner",
      "type": "address"
    },
    {
      "name": "takerFeeRate",
      "type": "int32"
    },
    {
      "name": "makerFeeRate",
      "type": "int32"
    },
    {
      "name": "stopMarket",
      "type": "bool"
    }
  ]
}
```
Inputs

| Input item | Name | Data type | source | comment |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| trade pair owner |  Address |sendBlock| |
| operationCode| - |  uint8 |ABI| 1 转让Owner,2 设置takerFeeRate,4 设置makerFeeRate,8 停止交易,对应code进行加和来支持以上操作的同时执行|
| tradeToken| trade token of trade pair | TokenId |ABI| |
| quoteToken| quote token of trade pair | TokenId |ABI| |
| owner| new owner |  Address |ABI| effect on operationCode & 1 == 1 |
| takerFeeRate| - | int32 |ABI| effect on operationCode & 2 == 2 |
| makerFeeRate| - | int32 |ABI| effect on operationCode & 4 == 4 |
| stopMarket| - | bool |ABI| stop new order for this trade pair, effect on operationCode & 8 == 8 ,true stop, false enable|

***actual rate will be rate/100,000***

### TransferTokenOwner
ABI definition
```
{
  "type": "function",
  "name": "DexFundTransferTokenOwner",
  "inputs": [
    {
      "name": "token",
      "type": "tokenId"
    },
    {
      "name": "owner",
      "type": "address"
    }
  ]
}
```
Inputs

| Input item | Name | Data type | source | comment |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| current owner |  Address |sendBlock| |
| token| token to transfer |  TokenId |ABI| |
| owner| new owner |  Address |ABI| |

## RPC interface

**Supported protocol:**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; | future version| &#x2713; |

### dexfund_getAccountFundInfo
Return exchange's account info for specified address and token id

- **Parameters**: 

  * `Address`: The address to query
  * `TokenId`: The token to query for this address, query all accounts if ignored
  
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

### dexfund_getAccountFundInfoByStatus
Return exchange's account info for specified address, token id, and balance type

- **Parameters**: 

  * `Address`: The address to query
  * `TokenId`: The token to query for this address, query all accounts if ignored
  * `byte`: Balance type. Value accepted: `0` - all, `1` - available, or `2` - locked

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

### dexfund_getOrderByUserBlockHash
query order by tx hash which user singed for new order

- **Parameters**: 

  * `blockHash`: block hash user signed for new order

- **Returns**: 

  - `Order`:order detail

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

- **Parameters**: 

  * `token`

- **Returns**: 

  - `TokenInfo`: token info detail

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

- **Parameters**: 

  * `tradeToken`:trade token of trade pair
  * `quoteToken`:quote token of trade pair

- **Returns**: 

  - `MarketInfo`:trade pair detail

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
query dividend pool of current period

- **Parameters**: 

 
- **Returns**: 

  - `map[types.TokenTypeId]DividendPoolInfo`:all dividend pool by tokenId

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
check if pledged for vip already

- **Parameters**: 

  * `address`:
 
- **Returns**: 

  - `bool`:whether vip already

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
query invite code created by specified address

- **Parameters**: 

  * `address`:inviter address
 
- **Returns**: 

  - `uint32`:invite code

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
query invite code bind by specified invitee

- **Parameters**: 

  * `address`:invitee address
 
- **Returns**: 

  - `uint32`:invite code

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

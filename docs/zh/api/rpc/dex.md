---
sidebarDepth: 4
---

# DexFund
:::tip 维护者
[vite-crzn](https://github.com/vite-crzn)
[weichaolee](https://github.com/weichaolee)
:::
## 合约信息说明
交易所账户内置合约，合约地址： `vite_0000000000000000000000000000000000000006e82b8ba657`

### 充值
ABI接口定义
```
{
  "type": "function",
  "name": "DexFundUserDeposit",
  "inputs": []
}
```
输入项

|  字段  | 名称 | 数据类型 |字段来源 |备注 |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| 充值地址 |  Address |sendBlock| |
| TokenId| 充值币种 |  TokenId |sendBlock| |
| Amount| 金额 |  uint256 |sendBlock| |

### 提现
ABI接口定义
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
输入项

|  字段  | 名称 | 数据类型 |字段来源 |备注 |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| 提现地址 |  Address |sendBlock| |
| token| 提现币种 |  TokenId |ABI| |
| amount| 金额 |  uint256 |ABI| |

### 上币/开通新交易对
ABI接口定义
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
输入项

|  字段  | 名称 | 数据类型 |字段来源 |备注 |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| 上币地址 |  Address |sendBlock| |
| tradeToken| 交易对交易币种 |  TokenId |ABI| |
| quoteToken| 交易对计价币种 |  TokenId |ABI| |

***上币费用从上币地址交易所账户可用余额扣除10,000个VITE***

### 提交新订单
ABI接口定义
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
输入项

|  字段  | 名称 | 数据类型 |字段来源 |备注 |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| 提单地址 |  Address |sendBlock| |
| tradeToken| 交易对交易币种 |  TokenId |ABI| |
| quoteToken| 交易对计价币种 |  TokenId |ABI| |
| side| 交易币种买卖方向 |  bool |ABI| false 买入,true 卖出|
| orderType| 订单类型	 |  uint8 |ABI| 0 限价单|
| price| 价格 |  string |ABI|小数的字符串表示，整数和小数部分最大都为12位有效数值|
| quantity| 交易数量 |  uint256 |ABI|交易币种数量|

### 抵押挖矿
ABI接口定义
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
输入项

|  字段  | 名称 | 数据类型 |字段来源 |备注 |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| 抵押地址 |  Address |sendBlock| |
| actionType| 操作类型 |  uint8 |ABI| 1 抵押 2 解抵押|
| amount| 抵押/解抵押金额 |  uint256 |ABI| 至少抵押134 VITE,解抵押后金额为0或者至少保留134VITE|

### 抵押获取vip资格
ABI接口定义
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
输入项

|  字段  | 名称 | 数据类型 |字段来源 |备注 |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| 抵押地址 |  Address |sendBlock| |
| actionType| 操作类型 |  uint8 |ABI| 1 抵押,2 解抵押|

### 运营商配置交易对
ABI接口定义
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
输入项

|  字段  | 名称 | 数据类型 |字段来源 |备注 |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| 交易对owner地址 |  Address |sendBlock| |
| operationCode| 操作类型 |  uint8 |ABI| 1 转让Owner,2 设置takerFeeRate,4 设置makerFeeRate,8 停止交易,对应code进行加和来支持以上操作的同时执行|
| tradeToken| 交易对交易币种 | TokenId |ABI| |
| quoteToken| 交易对计价币种 | TokenId |ABI| |
| owner| 新owner |  Address |ABI| operationCode & 1 == 1 生效|
| takerFeeRate| 运营商taker费率 | int32 |ABI| operationCode & 2 == 2 生效|
| makerFeeRate| 运营商maker费率 | int32 |ABI| operationCode & 4 == 4 生效|
| stopMarket| 开通/停止交易开关	 | bool |ABI| operationCode & 8 == 8 生效,true 停止交易,false 开通交易|

***实际费率计算方式为rate/100,000***

### 转让token owner
ABI接口定义
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
输入项

|  字段  | 名称 | 数据类型 |字段来源 |备注 |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| 当前owner地址 |  Address |sendBlock| |
| token| 转让token |  TokenId |ABI| |
| owner| 新owner地址 |  Address |ABI| |

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
  * `tradeToken`:交易对计价币种

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

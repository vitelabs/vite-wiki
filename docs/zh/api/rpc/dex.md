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

### 提现[ABI]
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
| AccountAddress| 上币人地址 |  Address |sendBlock| |
| tradeToken| 交易对交易币种 |  TokenId |ABI| |
| quoteToken| 交易对计价币种 |  TokenId |ABI| |

*** 上币费用从交易所账户余额扣除，上币成功的前题是交易所账户余额有大于10,000个VITE

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
| side| 买卖方向 |  bool |ABI| false 买入,true 卖出|
| orderType| 订单类型	 |  uint32 |ABI| 0 限价单|
| price| 价格 |  string |ABI|小数的字符串表示，整数和小数部分最大都是12位有效数值|
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
| amount| 抵押金额 |  uint256 |ABI| 最少抵押134 VITE|

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
| actionType| 操作类型 |  uint8 |ABI| 1 抵押 2 解抵押|

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
| operationCode| 操作类型 |  uint8 |ABI| 1 转让Owner,2 设置takerFeeRate,4 设置makerFeeRate,8 停止交易,对应code进行加和来支持以上多项的同时配置|
| tradeToken| 交易对交易币种 |  TokenId |ABI| |
| quoteToken| 交易对计价币种 |  TokenId |ABI| |
| owner| 新owner |  Address |ABI| operationCode & 1 == 1 生效|
| takerFeeRate| 	运营商taker费率 |  int32 |ABI| operationCode & 2 == 2 生效|
| makerFeeRate| 运营商maker费率	 |  int32 |ABI| operationCode & 4 == 4 生效|
| stopMarket| 打开/关闭交易开关	 |  TokenId |ABI| operationCode & 8 == 8 生效,true 停止交易,false 开通交易|

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
| AccountAddress| 币种现owner地址 |  Address |sendBlock| |
| token| 要转让的token |  TokenId |ABI| |
| owner| 新owner地址 |  Address |ABI| |

## RPC接口

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

## dexfund_getAccountFundInfo
查询指定用户指定币种余额

- **Parameters**: 

  * `Address`: 查询地址
  * `TokenId`: 查询币种
  
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

## dexfund_getAccountFundInfoByStatus
查询指定账户指定地址特定类型的账户余额

- **Parameters**: 

  * `Address`: 查询地址
  * `TokenId`: 查询币种
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

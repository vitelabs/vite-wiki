---
sidebarDepth: 4
---

# DexTrade
:::tip 维护者
[weichaolee](https://github.com/weichaolee)
:::

## 合约ABI接口
交易所订单撮合内置合约，合约地址： `vite_00000000000000000000000000000000000000079710f19dc7`

### CancelOrder
ABI接口定义
```
{
  "type": "function",
  "name": "DexTradeCancelOrder",
  "inputs": [
    {
      "name": "orderId",
      "type": "bytes"
    }
  ]
}
```
输入项

|  字段  | 名称 | 数据类型 |字段来源 |备注 |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| AccountAddress| 提单地址 |  Address |sendBlock| |
| orderId| 订单id |  bytes] |ABI| |

## RPC接口

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

### dextrade_getOrderById
查询指定订单详情，仅支持查询状态为未撤销和未完成的订单

- **Parameters**: 

  * `orderId`: base64编码订单id
  
- **Returns**: 
	- `Order`:订单详情

- **Example**:

::: demo

```json tab:Request
{
   "jsonrpc":"2.0",
   "id":1,
   "method":"dextrade_getOrderById",
   "params": [
         "AAADAP/////h//////8AXSiujAAAAQ=="
         ]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "Id": "AAAIAQAAAAAeAAAAAAAAXT6fSQAJVQ==",
        "Address": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
        "MarketId": 8,
        "Side": true,
        "Type": 0,
        "Price": "30",
        "TakerFeeRate": 90,
        "MakerFeeRate": 90,
        "TakerBrokerFeeRate": 0,
        "MakerBrokerFeeRate": 0,
        "Quantity": "400000000000000000000",
        "Amount": "12000000000000000000000",
        "Status": 0,
        "Timestamp": 1564385097
    }
}
```
:::

### dextrade_getOrdersFromMarket
查询指定交易对按最优价格排序的挂单列表

- **Parameters**: 

  * `tradeToken`: 交易对交易币种
  * `quoteToken`: 交易对计价币种
  * `side`: 交易币种买卖方向，false 买入，true 卖出
  * `begin`: 起始索引，起始值为0
  * `end`: 结束索引
  
- **Returns**: 
  - `[]Order`:挂单列表详情

- **Example**:

::: demo

```json tab:Request
{
   "jsonrpc":"2.0",
   "id":1,
   "method":"dextrade_getOrdersFromMarket",
   "params": [
        "tti_2736f320d7ed1c2871af1d9d",
        "tti_5649544520544f4b454e6e40",
        true,
        0,
        10
        ]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "orders": [
            {
                "Id": "AAAIAQAAAAAeAAAAAAAAXT6fSQAJVQ==",
                "Address": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
                "MarketId": 8,
                "Side": true,
                "Type": 0,
                "Price": "30",
                "TakerFeeRate": 90,
                "MakerFeeRate": 90,
                "TakerBrokerFeeRate": 0,
                "MakerBrokerFeeRate": 0,
                "Quantity": "400000000000000000000",
                "Amount": "12000000000000000000000",
                "Status": 0,
                "Timestamp": 1564385097
            },
            {
                "Id": "AAAIAejUpQ//6NSk6PAAXT6fSQAIrw==",
                "Address": "vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2",
                "MarketId": 8,
                "Side": true,
                "Type": 0,
                "Price": "40.5",
                "TakerFeeRate": 100,
                "MakerFeeRate": 100,
                "TakerBrokerFeeRate": 0,
                "MakerBrokerFeeRate": 0,
                "Quantity": "100000000000",
                "Amount": "99999999999999999999000",
                "Status": 0,
                "Timestamp": 1564385097
            }
        ],
        "size": 2
    }
}
```
:::
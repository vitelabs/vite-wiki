---
sidebarDepth: 4
---

# Pledge
:::tip 维护者
[viteLiz](https://github.com/viteLiz)
:::

抵押内置合约，合约账户地址： `vite_000000000000000000000000000000000000000309508ba646`

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

## pledge_getPledgeData
获取抵押交易请求数据

- **Parameters**: 

  * `Address`: 抵押受益账户

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"pledge_getPledgeData",
   "params":["vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"]
}
```

:::

## pledge_getCancelPledgeData
获取撤销抵押交易请求数据

- **Parameters**: 

  * `Address`: 抵押受益账户
  * `big.int`: 撤销金额

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"pledge_getCancelPledgeData",
   "params":[
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
      10
    ]
}
```

:::

## pledge_getPledgeQuota
获取账户当前额度和最大能发起的交易数

- **Parameters**: 

  * `Address`: 账户地址

- **Returns**: 

`Object`
  1. `current`: `uint64`  当前额度
  2. `txNum`: `uint64`  当前能发起的交易（不包含备注的请求交易）数
  3. `total`: `uint64` 总额度，总额度 = 当前额度 + 最近75个快照块内已使用的额度

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"pledge_getPledgeQuota",
   "params": ["vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": {
      "current": "21000",
      "total": "42000",
      "txNum": "1"
   }
}
```
:::

## pledge_getPledgeList
获取本账户的抵押金额列表

- **Parameters**: 

  * `Address`: 抵押账户地址
  * `int`: 页码，从0开始
  * `int`: 每页条数

- **Returns**: 

`Object`
  1. `totalPledgeAmount`: `big.Int`  本账户抵押的总金额
  2. `totalCount`: `int`  抵押信息总数
  3. `pledgeInfoList`: `Array&lt;PledgeInfo&gt;` 抵押信息列表
     * `amount`: `big.int`  抵押金额
     * `withdrawHeight`: `uint64`  到期快照块高度
     * `beneficialAddr`: `Address`  受益地址
     * `withdrawTime`: `int64`  预计到期时间
    

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"pledge_getPledgeList",
   "params":["vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6", 0, 50]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result":  {
      "totalPledgeAmount": "5000000000000000000000",
      "totalCount": 1,
      "pledgeInfoList": [
        {
          "amount":10000000000000000000,
          "withdrawHeight":259200,
          "beneficialAddr":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
          "withdrawTime":1540213336
        }
      ]
   }
}
```
:::


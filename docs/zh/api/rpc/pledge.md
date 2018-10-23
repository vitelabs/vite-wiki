---
sidebarDepth: 4
---

# Pledge
## viteLiz
抵押内置合约，合约账户地址：vite_000000000000000000000000000000000000000309508ba646

## 说明

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

## API

### pledge_getPledgeData
返回抵押交易请求数据

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

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "8de7dcfd000000000000000000000000a5a7f08011c2f0e40ccd41b5b79afbfb818d565f"
}
```
:::

### pledge_getCancelPledgeData
返回撤销抵押交易请求数据

- **Parameters**: 

  * `Address`: 抵押受益账户
  * `uint256`: 撤销金额

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

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "9ff9c7b6000000000000000000000000a5a7f08011c2f0e40ccd41b5b79afbfb818d565f000000000000000000000000000000000000000000000000000000000000000a"
}
```
:::

### pledge_getPledgeQuota
获取账户当前额度和最大能发起的交易数

- **Parameters**: 

  * `Address`: 账户地址

- **Returns**: 

`Object`
  1. `quota`: `uint64`  当前额度
  2. `txNum`: `uint64`  最大能发起的交易数

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
      "quota": 21000,
      "txNum":1
   }
}
```
:::

### pledge_getPledgeList
返回本账户的抵押金额列表

- **Parameters**: 

  * `Address`: 抵押账户地址
  * `int`: 页码，从0开始
  * `int`: 每页条数

- **Returns**: 

`Array&lt;PledgeInfo&gt;`
  1. `amount`: `uint256`  抵押金额
  2. `withdrawHeight`: `uint64`  到期快照块高度
  3. `beneficialAddr`: `Address`  受益地址
  4. `withdrawTime`: `int64`  预计到期时间

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
   "result":  [{
      "amount":10000000000000000000,
      "withdrawHeight":259200,
      "beneficialAddr":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
      "withdrawTime":1540213336
   }]
}
```
:::


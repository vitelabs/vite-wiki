---
sidebarDepth: 4
---

# Pledge
## viteLiz
抵押内置合约

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
    1. `Quota`: `uint64`  交易的发起方
    2. `TxNum`: `uint64`  当前块高度

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
      "Quota": 21000,
      "TxNum":1
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
	`Object`
      1. `Amount`: `uint256`  抵押金额
      2. `WithdrawHeight`: `uint64`  到期快照块高度
      3. `BeneficialAddr`: `Address`  受益地址
      4. `WithdrawTime`: `int64`  预计到期时间

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
      "Amount":10000000000000000000,
      "WithdrawHeight":259200,
      "BeneficialAddr":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
      "WithdrawTime":1540213336
   }]
}
```
:::


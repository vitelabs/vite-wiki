---
sidebarDepth: 4
---

# Contracts
内置合约

## 说明

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

## API

### contracts_getPledgeData
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
   "method":"contracts_getPledgeData",
   "params":["vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "jefc/QAAAAAAAAAAAAAAAKWn8IARwvDkDM1Btbea+/uBjVZf"
}
```
:::

### contracts_getCancelPledgeData
返回撤销抵押交易请求数据

- **Parameters**: 

  * `Address`: 抵押受益账户
  * `big.Int`: 撤销金额

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"contracts_getCancelPledgeData",
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
   "result": "n/nHtgAAAAAAAAAAAAAAAKWn8IARwvDkDM1Btbea+/uBjVZfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAo="
}
```
:::

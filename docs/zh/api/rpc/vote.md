---
sidebarDepth: 4
---

# Vote
## viteLiz
超级节点投票内置合约，合约账户地址：vite_000000000000000000000000000000000000000270a48cc491

## 说明

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

## API

### vote_getVoteData
返回为超级节点投票交易请求数据

- **Parameters**: 

  * `Gid`: 共识组id
  * `string`: 超级节点名称

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"vote_getVoteData",
   "params": [
      "00000000000000000001", 
      "super"
    ]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "fdc17f250000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000057375706572000000000000000000000000000000000000000000000000000000"
}
```
:::

### vote_getCancelVoteData
返回为超级节点投票交易请求数据

- **Parameters**: 

  * `Gid`: 共识组id

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"vote_getCancelVoteData",
   "params":["00000000000000000001"]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "a629c5310000000000000000000000000000000000000000000000000000000000000001"
}
```
:::

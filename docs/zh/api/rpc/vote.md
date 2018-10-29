---
sidebarDepth: 4
---

# Vote
## viteLiz
出块节点投票内置合约，合约账户地址：vite_000000000000000000000000000000000000000270a48cc491

## 说明

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

## API

### vote_getVoteData
获取为出块节点投票交易请求数据

- **Parameters**: 

  * `Gid`: 共识组id
  * `string`: 出块节点名称

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

:::

### vote_getCancelVoteData
获取为出块节点投票交易请求数据

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

:::

### vote_getVoteInfo
查询用户当前投票信息，包含未确认的投票

- **Parameters**: 

  * `Gid`: 共识组id
  * `Address`: 用户账户地址

- **Returns**: 

`Object`
  1. `name`: `string`  出块节点名称
  2. `balance`: `big.Int`  用户账户余额
  3. `voteStatus`: `uint8` 投票状态：1 投票中 2 投票成功 
  
- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"vote_getVoteInfo",
   "params": [
      "00000000000000000001", 
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"
    ]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": {
      "registerName": "super",
      "balance": 10,
      "voteStatus": 1
   }
```
:::

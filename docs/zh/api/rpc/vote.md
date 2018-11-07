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
查询用户当前投票信息

- **Parameters**: 

  * `Gid`: 共识组id
  * `Address`: 用户账户地址

- **Returns**: 

`Object`
  1. `nodeName`: `string`  出块节点名称
  2. `nodeStatus`: `uint8`  出块节点注册状态：1 有效 2 无效
  3. `balance`: `big.Int`  用户账户余额
  
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
      "nodeName": "super",
      "nodeStatus": 1
      "balance": 10,
   }
```
:::

### vote_getVoteDetails
查询超级节点投票详情

- **Parameters**: 

无

- **Returns**: 

`Object`
  1. `nodeName`: `string`  出块节点名称
  2. `nodeStatus`: `uint8`  出块节点注册状态：1 有效 2 无效
  3. `balance`: `string`  用户账户余额
  4. `nodeAddr`: `string` 节点当前注册出块地址
  
- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"vote_getVoteDetails",
   "params": null
     
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 17,
    "result": [
        {
            "nodeName": "s1",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s10",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s11",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s12",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s13",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s14",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s15",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s16",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s17",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s18",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s19",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s2",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s20",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s21",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s22",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s23",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s24",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s25",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s3",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s4",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s5",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s6",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s7",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s8",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        },
        {
            "nodeName": "s9",
            "nodeStatus": 1,
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "balance": "0"
        }
    ]
}
```
:::

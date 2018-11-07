---
sidebarDepth: 4
---

# Register
## viteLiz
注册出块节点内置合约，合约账户地址：vite_0000000000000000000000000000000000000001c9e9f25417

## 说明

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

## API

### register_getRegisterData
获取出块节点注册交易请求数据

- **Parameters**: 

  * `Gid`: 共识组id
  * `string`: 出块节点名称
  * `Address`: 出块账户地址

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getRegisterData",
   "params": [
      "00000000000000000001",
      "super", 
      "vite_080b2d68a06f52c0fbb454f675ee5435fb7872526771840d22"
    ]
}
```

:::

### register_getCancelRegisterData
获取取消出块节点注册交易请求数据

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
   "method":"register_getCancelRegisterData",
   "params": [
      "00000000000000000001",
      "super"
    ]
}
```

:::

### register_getRewardData
获取提取出块奖励交易请求数据，从上一次提取到的高度开始，提取90天的出块奖励（如果不足90天，提取所有出块奖励），不能提取最近30分钟的出块奖励

- **Parameters**: 

  * `Gid`: 共识组id
  * `string`: 出块节点名称
  * `Address`: 提取奖励账户地址

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getRewardData",
   "params": [
      "00000000000000000001", 
      "super",
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"
   ]
}
```

:::

### register_getUpdateRegistrationData
获取更新出块节点注册信息交易请求数据

- **Parameters**: 

  * `Gid`: 共识组id，不可修改
  * `string`: 出块节点名称，不可修改
  * `Address`: 新的出块账户地址，可修改

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getUpdateRegistrationData",
   "params": [
      "00000000000000000001", 
      "super",
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"
    ]
}
```

:::

### register_getRegistrationList
查询注册信息列表

- **Parameters**: 

  * `Gid`: 共识组id
  * `Address`: 抵押账户地址

- **Returns**: 

`Array&lt;RegistartionInfo&gt;`
  1. `name`: `string`  出块节点名称
  2. `nodeAddr`: `Address`  出块账户地址
  3. `pledgeAddr`: `Address`  抵押账户地址
  4. `pledgeAmount`: `big.Int`  抵押金额
  5. `withdrawHeight`: `uint64`  抵押到期高度
  6. `withdrawTime`: `uint64`  预计抵押到期时间
  7. `cancelHeight`: `uint64`  抵押取消时间，值大于0时表示已注销
  8. `availableReward`: `big.Int`  可提取的出块奖励（不包含最近30分钟的出块奖励）
  9. `availableRewardOneTx`: `big.Int`  一次交易可提取的出块奖励（不包含最近30分钟的出块奖励），从上一次提取到的高度开始，90天的出块奖励，如果不满90天，则availableRewardOneTx=availableReward
  10. `rewardStartHeight`: `uint64` 上一次提取出块奖励时提取到的高度
  11. `rewardEndHeight`: `uint64`  本次提取出块奖励时可提取到的高度

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getRegistrationList",
   "params": [
      "00000000000000000001",
      "vite_080b2d68a06f52c0fbb454f675ee5435fb7872526771840d22"
    ]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": [
    {
      "name": "super",
      "nodeAddr": "",
      "pledgeAddr": "",
      "pledgeAmount": 100000000000,
      "withdrawHeight": 100,
      "availableReward": 1051200000,
      "availableRewardOneTx": 1051200000,
      "rewardStartHeight": 1,
      "rewardEndHeight": 100
    }
   ]
}
```
:::

### register_getCandidateList
查询候选节点列表

- **Parameters**: 

  * `Gid`: 共识组id

- **Returns**: 

`Array&lt;CandidateInfo&gt;`
  1. `name`: `string`  出块节点名称
  2. `nodeAddr`: `Address`  出块账户地址
  3. `voteNum`: `string`  投票数

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id": 1,
   "method":"register_getCandidateList",
   "params": [
      "00000000000000000001"
    ]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 17,
    "result": [
        {
            "name": "s1",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s10",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s11",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s12",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s13",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s14",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s15",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s16",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s17",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s18",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s19",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s2",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s20",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s21",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s22",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s23",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s24",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s25",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s3",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s4",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s5",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s6",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s7",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s8",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        },
        {
            "name": "s9",
            "nodeAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
            "voteNum": "0"
        }
    ]
}
```
:::

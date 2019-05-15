---
sidebarDepth: 4
---

# ConsensusGroup
:::tip 维护者
[viteLiz](https://github.com/viteLiz)
:::

## 合约信息说明
共识信息合约，合约账户地址： `vite_0000000000000000000000000000000000000004d28108e76b`

ABI：

```json
[
  // 注册出块节点
  {"type":"function","name":"Register", "inputs":[{"name":"gid","type":"gid"},{"name":"name","type":"string"},{"name":"nodeAddr","type":"address"}]},
  // 更新注册信息
  {"type":"function","name":"UpdateRegistration", "inputs":[{"name":"gid","type":"gid"},{"Name":"name","type":"string"},{"name":"nodeAddr","type":"address"}]},
  // 取消注册
  {"type":"function","name":"CancelRegister","inputs":[{"name":"gid","type":"gid"}, {"name":"name","type":"string"}]},
  // 提取出块奖励
  {"type":"function","name":"Reward","inputs":[{"name":"gid","type":"gid"},{"name":"name","type":"string"},{"name":"beneficialAddr","type":"address"}]},
  // 给出块节点投票
  {"type":"function","name":"Vote", "inputs":[{"name":"gid","type":"gid"},{"name":"nodeName","type":"string"}]},
  // 取消投票
  {"type":"function","name":"CancelVote","inputs":[{"name":"gid","type":"gid"}]}
]
```

## register_getRegisterData
获取出块节点注册交易请求数据，也可以通过对ABI中的`Register`方法编码获取交易请求数据。

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

## register_getCancelRegisterData
获取取消出块节点注册交易请求数据，也可以通过对ABI中的`CancelRegister`方法编码获取交易请求数据。

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

## register_getRewardData
获取提取出块奖励交易请求数据，从上一次提取到的高度开始，提取90天的出块奖励（如果不足90天，提取所有出块奖励），不能提取最近30分钟的出块奖励，也可以通过对ABI中的`Reward`方法编码获取交易请求数据。

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

## register_getUpdateRegistrationData
获取更新出块节点注册信息交易请求数据，也可以通过对ABI中的`UpdateRegistration`方法编码获取交易请求数据。

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

## register_getRegistrationList
查询注册信息列表，按抵押到期高度倒序排列

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
  6. `withdrawTime`: `int64`  预计抵押到期时间
  7. `cancelTime`: `int64`  抵押取消时间，值大于0时表示已注销

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
      "withdrawTime":1541573925,
      "cancelTime":0,
    }
   ]
}
```
:::

## register_getAvailableReward
查询单个节点的待提取奖励

- **Parameters**: 

  * `Gid`: 共识组id
  * `string`: 出块节点名称

- **Returns**: 

`RewardInfo`
  1. `totalReward`: `string`  待提取奖励
  2. `blockReward`: `Address`  待提取按块奖励
  3. `voteReward`: `Address`  待提取按票奖励

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getAvailableReward",
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
   "result": 
    {
      "totalReward": "10",
      "blockReward": "6",
      "voteReward": "4"
    }
}
```
:::

## register_getRewardByDay
按天查询所有超级节点的奖励

- **Parameters**: 

  * `Gid`: 共识组id
  * `timestamp`: 时间戳

- **Returns**: 

`map<string>RewardInfo` 出块节点名称和当天的奖励明细

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getRewardByDay",
   "params": [
      "00000000000000000001",
      1555567989
    ]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": 
    {
      "super":{
        "totalReward": "10",
        "blockReward": "6",
        "voteReward": "4"
      }
    }
}
```
:::

## register_getCandidateList
查询候选节点列表

- **Parameters**: 

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
   "params": []
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

## vote_getVoteData
获取为出块节点投票交易请求数据，也可以通过对ABI中的`Vote`方法编码获取交易请求数据。

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

## vote_getCancelVoteData
获取为出块节点投票交易请求数据，也可以通过对ABI中的`CancelVote`方法编码获取交易请求数据。

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

## vote_getVoteInfo
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

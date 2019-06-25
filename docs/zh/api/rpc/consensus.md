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
  4. `drained`: `bool`  是否已提取完所有的奖励。已提取完奖励的条件是节点已取消注册，并且当前所有的奖励已提取完。

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
      "voteReward": "4",
      "drained":true
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

`map<string>Object` 
  1. `totalReward`: `string`  本周期总奖励
  2. `blockReward`: `Address`  本周期按块奖励
  3. `voteReward`: `Address`  本周期按票奖励
  4. `expectedBlockNum`: `uint64` 本周期的应出块数，如果某一轮所有节点都没出块，那么那一轮的应出块数不计入本周期的应出块数  
  5. `blockNum`: `uint64`  本周期的实际出块数


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
        "voteReward": "4",
        "expectedBlockNum":3,
        "blockNum":1,
      }
    }
}
```
:::

## register_getRewardByIndex
按天查询所有超级节点的奖励

- **Parameters**: 

  * `Gid`: 共识组id
  * `uint64`: 周期数，从创世时间开始，每24小时为一周期，周期数从0开始。例如第0周期表示2019/05/21 12:00:00 - 2019/05/22 12:00:00。

- **Returns**: 

`Object`
  1. `rewardMap`:`map<string>RewardInfo` 奖励详情，和`register_getRewardByDay`返回值相同
  2. `startTime`:`int64` 本周期开始时间
  3. `endTime`:`int64` 本周期结束时间


- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getRewardByIndex",
   "params": [
      "00000000000000000001",
      "0"
    ]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": 
    {
      "rewardMap":{
        "super":{
          "totalReward": "10",
          "blockReward": "6",
          "voteReward": "4",
          "expectedBlockNum":3,
          "blockNum":1,
        }
      },
      "startTime": 1558411200,
      "endTime": 1558497600
    }
}
```
:::

## register_getCandidateList
查询快照共识组候选节点列表

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
获取取消为出块节点投票交易请求数据，也可以通过对ABI中的`CancelVote`方法编码获取交易请求数据。

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
}
```
:::


## vote_getVoteDetails
查询SBP每天投票信息

- **Parameters**: 

  * `Index`: 第几天：0代表最开始的一天
 

- **Returns**: 

`Array&lt;VoteDetails&gt;`
  1. `Name`: `string`  出块节点名称
  2. `Balance`: `big.Int`  总投票数
  3. `Addr`: `map`  key:投票地址， value: 投票权重
  
- **Example**:

::: demo

```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 17,
    "method":"vote_getVoteDetails",
    "params":[0]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 17,
    "result": [
        {
            "Name": "Vite_SBP01",
            "Balance": 1.4292529985394005795698375e+25,
            "Type": null,
            "CurrentAddr": "vite_9065ff0e14ebf983e090cde47d59fe77d7164b576a6d2d0eda",
            "RegisterList": [
                "vite_9065ff0e14ebf983e090cde47d59fe77d7164b576a6d2d0eda"
            ],
            "Addr": {
                "vite_002c698c0f89662679d03eb65344cea6ed18ab64cd3562e399": 153173820149812829427,
                "vite_002f9cc5863815d27679b3a5e4f47675e680926a7ae5365d5e": 2.2637888780120236595891e+22,
                "vite_0032cc9274aa2b3de392cf8f0840ebae0367419d11219bcd7e": 0,
                "vite_003853b6b237b311a87029a669d589b19c97674d8b5473004f": 211999319045896173105,
                "vite_0047b193c7d7791a94de7e45b7febf6eac8139fd81695cfdb5": 27349565445264753118,
                "vite_dd8364662b3725ab89fff765091b8bc6a6e140adbfbfc3baca": 19926226954228583374
            }
        },
        {
            "Name": "Vite_SBP02",
            "Balance": 6.905516255516640791260504e+24,
            "Type": null,
            "CurrentAddr": "vite_995769283a01ba8d00258dbb5371c915df59c8657335bfb1b2",
            "RegisterList": [
                "vite_995769283a01ba8d00258dbb5371c915df59c8657335bfb1b2"
            ],
            "Addr": {
                "vite_013661a2b0ac7a7344b94308184105dfae64bb746aadfeb3eb": 1341892617448983441,
                "vite_0139fa07eccdd3945941d6bd376ffb67db771cfb5999439639": 83666851810677644147
            }
        }
   ]
}
```
:::

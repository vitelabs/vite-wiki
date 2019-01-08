---
sidebarDepth: 4
---

# ConsensusGroup

:::tip 维护者
[viteLiz](https://github.com/viteLiz)
:::

委托共识组内置合约，合约账户地址：vite_00000000000000000000000000000000000000042d7ef71894

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

## consensusGroup_getConditionRegisterOfPledge
创建委托共识组时registerConditionId为1时通过本接口生成registerConditionParam，指定注册成为共识组出块节点的条件，要求抵押一定数量的代币

- **Parameters**: 

  * `big.int`: 注册时抵押的金额
  * `TokenId`: 注册时抵押金额的代币id
  * `uint64`: 注册时抵押代币的时间（即快照块高度）

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"consensusGroup_getConditionRegisterOfPledge",
   "params":[
      1000000,
      "tti_5649544520544f4b454e6e40",
      86400
    ]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "00000000000000000000000000000000000000000000000000000000000f4240000000000000000000000000000000000000000000005649544520544f4b454e0000000000000000000000000000000000000000000000000000000000015180"
}
```
:::

## consensusGroup_getConditionVoteOfKeepToken
创建委托共识组时voteConditionId为2时通过本接口生成voteConditionParam，指定为共识组出块节点投票时的条件，要求投票账户持有一定数量的代币

- **Parameters**: 
  * `big.Int`: 投票时持有的代币数量
  * `TokenId`: 投票时持有的代币id

- **Returns**: 
	- `[]byte` Data

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"consensusGroup_getConditionVoteOfKeepToken",
   "params":[
      100,
      "tti_5649544520544f4b454e6e40"
    ]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000005649544520544f4b454e"
}
```
:::

## consensusGroup_getCreateConsensusGroupData
获取创建共识组交易请求数据

- **Parameters**: 

`Object`
  1. `selfAddr`: `Address`  交易的发起方
  2. `height`: `uint64`  当前块高度
  3. `prevHash`: `Hash`  前一个账户块的哈希
  4. `snapshotHash`: `Hash`  当前块引用的快照块哈希
  5. `nodeCount`:`uint8`  出块节点总数
  6. `interval`: `int64` 出块间隔
  7. `perCount`: `int64` 连续出款间隔数
  8. `randCount`: `uint8` 随机出块节点数
  9. `randRank`: `uint8` 随机出块节点选取范围
  10. `countingTokenId`: `TokenId` 计票代币id
  11. `registerConditionId`: `uint8` 出块节点注册条件id，取1，值为1时表示注册时需要抵押代币
  12. `registerConditionParam`: `[]byte` 出块节点注册条件参数
  13. `voteConditionId`: `uint8` 出块节点投票条件id，取1或2，值为1时表示无条件，voteConditionParam为空字符串；值为2时表示投票时需要持有代币
  14. `voteConditionParam`: `[]byte` 出块节点投票条件参数


- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"consensusGroup_getCreateConsensusGroupData",
   "params":[{
      "selfAddr":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
      "height":2,
      "prevHash":"3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7",
      "snapshotHash":"3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7",
      "nodeCount":25,
      "interval":3,
      "perCount":1,
      "randCount":2,
      "randRank":50,
      "countingTokenId":"tti_5649544520544f4b454e6e40",
      "registerConditionId":1,
      "registerConditionParam":"00000000000000000000000000000000000000000000000000000000000f4240000000000000000000000000000000000000000000005649544520544f4b454e0000000000000000000000000000000000000000000000000000000000015180",
      "voteConditionId":1,
      "voteConditionParam":""
    }]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "51891ff2000000000000000000000000000000000000000000003fd16552e1551a267f3200000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000032000000000000000000000000000000000000000000005649544520544f4b454e00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000090d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d1fe36e34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34e7ae3de78e39db4e78e1fe1be39e1ed34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d34d35e75f34000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
}
```
:::

## consensusGroup_getCancelConsensusGroupData
获取撤回共识组抵押交易请求数据

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
   "method":"consensusGroup_getCancelConsensusGroupData",
   "params":["00000000000000000001"]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "f2f2cf2b0000000000000000000000000000000000000000000000000000000000000001"
}
```
:::

## consensusGroup_getReCreateConsensusGroupData
获取重新为共识组抵押交易请求数据

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
   "method":"consensusGroup_getReCreateConsensusGroupData",
   "params":["00000000000000000001"]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "7a9810340000000000000000000000000000000000000000000000000000000000000001"
}
```
:::

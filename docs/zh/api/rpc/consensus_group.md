---
sidebarDepth: 4
---

# ConsensusGroup
## viteLiz
委托共识组内置合约，合约账户地址：vite_00000000000000000000000000000000000000042d7ef71894

## 说明

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

## API

### consensusGroup_getConditionRegisterOfPledge
返回共识组超级节点注册条件

- **Parameters**: 

  * `uint256`: 超级节点注册时抵押的金额
  * `TokenId`: 超级节点注册时抵押金额的代币类型
  * `uint64`: 超级节点注册时的抵押时间

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

### consensusGroup_getConditionVoteOfDefault
返回共识组超级节点默认投票条件，默认无条件

- **Parameters**: `none`

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"consensusGroup_getConditionVoteOfDefault",
   "params":[]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": ""
}
```
:::

### consensusGroup_getConditionVoteOfKeepToken
返回共识组超级节点投票条件，要求投票账户持有某种代币

- **Parameters**: 
  * `uint256`: 超级节点注册时抵押的金额

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

### consensusGroup_getCreateConsensusGroupData
返回创建委托共识组交易请求数据

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
  11. `registerConditionId`: `uint8` 超级节点注册条件id，取1，值为1时registerConditionParam通过consensusGroup_getConditionRegisterOfPledge获取
  12. `registerConditionParam`: `[]byte` 超级节点注册条件参数
  13. `voteConditionId`: `uint8` 超级节点投票条件id，取1或2，值为1时VoteConditionParam通过consensusGroup_getConditionVoteOfDefault获取；值为2时VoteConditionParam通过consensusGroup_getConditionVoteOfKeepToken获取
  14. `voteConditionParam`: `[]byte` 超级节点投票条件参数


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

### consensusGroup_getCancelConsensusGroupData
返回撤回超级节点抵押交易请求数据

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

### consensusGroup_getReCreateConsensusGroupData
返回重新为超级节点抵押交易请求数据

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

---
sidebarDepth: 4
---

# ConsensusGroup

:::tip Maintainer
[viteLiz](https://github.com/viteLiz)
:::

The built-in delegated consensus group contract. Contract address: vite_00000000000000000000000000000000000000042d7ef71894

:::warning Attention
The term `super node` in this page stands for block producer in the corresponding delegated consensus group. Please do NOT mix up with SBP(snapshot block producer) or super node in snapshot consensus group. 
:::

**Supported calling methods：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |future version| &#x2713; |


## consensusGroup_getConditionRegisterOfPledge
Return the composed `registerConditionParam` data in which the condition of registering super node in the delegated consensus group is specified. The returned data is used in `consensusGroup_getCreateConsensusGroupData` when `registerConditionId`=1

- **Parameters**: 

  * `uint256`: The amount of tokens required for staking
  * `TokenId`: The token ID required for staking
  * `uint64`: The required staking period(in snapshot block height)

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
Return the composed `voteConditionParam` data in which the condition of voting(for super node in the delegated consensus group) is specified. The returned data is used in `consensusGroup_getCreateConsensusGroupData` when `voteConditionId`=2


- **Parameters**: 
  * `big.Int`: The amount of tokens required to hold in account for voting
  * `TokenId`: The token ID required for voting

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
Return the composed request data for creating new delegated consensus group

- **Parameters**: 

`Object`
  1. `selfAddr`: `Address`  The address of account who registers the delegated consensus group
  2. `height`: `uint64`  The height of current block
  3. `prevHash`: `Hash`  The hash of previous account block
  4. `snapshotHash`: `Hash`  The hash of snapshot block that current account block refers to
  5. `nodeCount`:`uint8`  The total number of super nodes in the delegated consensus group
  6. `interval`: `int64` The time interval between two consecutive blocks
  7. `perCount`: `int64` The number of blocks that can be produced by the same super node consecutively at a time
  8. `randCount`: `uint8` The number of super nodes that are selected in random
  9. `randRank`: `uint8` The range of rankings in which the random super nodes are selected
  10. `countingTokenId`: `TokenId` Voting token ID 
  11. `registerConditionId`: `uint8` Registration condition ID, where 1 stands for staking is required.
  12. `registerConditionParam`: `[]byte` The condition parameter for super node registration
  13. `voteConditionId`: `uint8` Voting condition ID, where 1 means no condition and 2 stands for holding a amount of tokens is required.
  14. `voteConditionParam`: `[]byte` The condition parameters for voting


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
Return the composed request data for cancelling the super node staking in the specified delegated consensus group 

- **Parameters**: 

  * `Gid`: The delegated consensus group ID

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
Return the composed request data for re-staking as super node in the specified delegated consensus group

- **Parameters**: 

  * `Gid`: The delegated consensus group ID

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

---
sidebarDepth: 4
---

# Contracts
## viteLiz
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
   "result": "8de7dcfd000000000000000000000000a5a7f08011c2f0e40ccd41b5b79afbfb818d565f"
}
```
:::

### contracts_getCancelPledgeData
返回撤销抵押交易请求数据

- **Parameters**: 

  * `Address`: 抵押受益账户
  * `uint256`: 撤销金额

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
   "result": "9ff9c7b6000000000000000000000000a5a7f08011c2f0e40ccd41b5b79afbfb818d565f000000000000000000000000000000000000000000000000000000000000000a"
}
```
:::

### contracts_getMintageData
返回铸币交易请求数据

- **Parameters**: 

`Object`
  1. `selfAddr`: `Address`  交易的发起方
  2. `height`: `uint64`  当前块高度
  3. `prevHash`: `Hash`  前一个账户块的哈希
  4. `snapshotHash`: `Hash`  当前块引用的快照块哈希
  5. `tokenName`:`string`  代币名称
  6. `tokenSymbol`: `string` 代币简称
  7. `totalSupply`: `uint256` 总发行量
  8. `decimals`: `uint8` 小数位数


- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"contracts_getMintageData",
   "params": [{
   	  "selfAddr":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
   		"height":2,
   		"prevHash":"3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7",
   		"snapshotHash":"3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7",
   		"tokenName":"Test Token",
   		"tokenSymbol":"test",
   		"totalSupply":100000000000,
   		"decimals":6
   	}]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "46d0ce8b000000000000000000000000000000000000000000003fd16552e1551a267f3200000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000174876e8000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a5465737420546f6b656e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000"
}
```
:::

### contracts_getMintageCancelPledgeData
返回取回铸币抵押交易请求数据

- **Parameters**: 

  * `TokenId`: 取回哪个代币的铸币抵押

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"contracts_getMintageCancelPledgeData",
   "params":["tti_5649544520544f4b454e6e40"]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result":  "9b9125f5000000000000000000000000000000000000000000005649544520544f4b454e"
}
```
:::


### contracts_getCreateContractToAddress
创建合约时生成新的合约地址

- **Parameters**: 

  * `Address`: 交易的发起方
  * `uint64`: 当前块高度
  * `Hash`: 前一个账户块的哈希
  * `Hash`: 当前块引用的快照块哈希

- **Returns**: 
	- `Address` 新的合约地址

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"contracts_getCreateContractToAddress",
   "params":[
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6", 
      2, 
      "3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7", 
      "3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7"]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "vite_22f4f195b6b0f899ea263241a377dbcb86befb8075f93eeac8"
}
```
:::

### contracts_getSignDataForRegister
获取注册超级节点时的签名数据

- **Parameters**: 

  * `Address`: 注册超级节点时的抵押地址
  * `Gid`: 注册的共识组id

- **Returns**: 
	- `[]byte` SignData，用出块地址私钥签名后得到注册超级节点的最后一个字段

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"contracts_getSignDataForRegister",
   "params": [
   	  "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
   		"00000000000000000001"
   	]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "a5a7f08011c2f0e40ccd41b5b79afbfb818d565f00000000000000000001"
}
```
:::

### contracts_getRegisterData
返回超级节点注册交易请求数据

- **Parameters**: 

  * `Gid`: 共识组id
  * `string`: 超级节点名称
  * `Address`: 出块账户地址
  * `[]byte`: 出块账户公钥
  * `[]byte`: 用出块账户私钥对（抵押地址+共识组id）签名的结果

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"contracts_getRegisterData",
   "params": [
      "00000000000000000001",
      "super", 
      "vite_080b2d68a06f52c0fbb454f675ee5435fb7872526771840d22", 
      "d7095a0a7b514d0d61050fec809e20d72fd83cea66d96673cd3b713017791503",
      "78540655e264f3d40116f96c3d688fa18ffdbdac34538098e6b4353c880cb66ebc93d557c88bcb90c47180acceb9e93a4718def30189e1a951b489cddc75560c"
    ]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "dc88a6af000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000080b2d68a06f52c0fbb454f675ee5435fb78725200000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000573757065720000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020d7095a0a7b514d0d61050fec809e20d72fd83cea66d96673cd3b713017791503000000000000000000000000000000000000000000000000000000000000004078540655e264f3d40116f96c3d688fa18ffdbdac34538098e6b4353c880cb66ebc93d557c88bcb90c47180acceb9e93a4718def30189e1a951b489cddc75560c"
}
```
:::

### contracts_getCancelRegisterData
返回超级节点取消注册交易请求数据

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
   "method":"contracts_getCancelRegisterData",
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
   "result": "60862fe20000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000057375706572000000000000000000000000000000000000000000000000000000"
}
```
:::

### contracts_getRewardData
返回超级节点提取出块奖励交易请求数据

- **Parameters**: 

  * `Gid`: 共识组id
  * `string`: 超级节点名称
  * `Address`: 奖励提取账户地址
  * `uint64`: 出块结束高度
  * `uint64`: 出块开始高度
  * `uint256`: 出块奖励金额

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"contracts_getRewardData",
   "params": [
      "00000000000000000001", 
      "super",
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
      10000,
      10,
      1000000000
    ]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "de701e37000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000080b2d68a06f52c0fbb454f675ee5435fb78725200000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000573757065720000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020d7095a0a7b514d0d61050fec809e20d72fd83cea66d96673cd3b713017791503000000000000000000000000000000000000000000000000000000000000004078540655e264f3d40116f96c3d688fa18ffdbdac34538098e6b4353c880cb66ebc93d557c88bcb90c47180acceb9e93a4718def30189e1a951b489cddc75560c"
}
```
:::

### contracts_getUpdateRegistrationData
返回更新超级节点注册信息交易请求数据

- **Parameters**: 

  * `Gid`: 共识组id，不可修改
  * `string`: 超级节点名称，不可修改
  * `Address`: 出块账户地址
  * `[]byte`: 出块账户公钥
  * `[]byte`: 用出块账户私钥对（抵押地址+共识组id）签名的结果

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"contracts_getUpdateRegistrationData",
   "params": [
      "00000000000000000001", 
      "super",
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
      "d7095a0a7b514d0d61050fec809e20d72fd83cea66d96673cd3b713017791503",
      "78540655e264f3d40116f96c3d688fa18ffdbdac34538098e6b4353c880cb66ebc93d557c88bcb90c47180acceb9e93a4718def30189e1a951b489cddc75560c"
    ]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "00eae0b1000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000080b2d68a06f52c0fbb454f675ee5435fb7872520000000000000000000000000000000000000000000000000000000000002710000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000003b9aca0000000000000000000000000000000000000000000000000000000000000000057375706572000000000000000000000000000000000000000000000000000000"
}
```
:::

### contracts_getVoteData
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
   "method":"contracts_getVoteData",
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

### contracts_getCancelVoteData
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
   "method":"contracts_getCancelVoteData",
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

### contracts_getConditionRegisterOfPledge
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
   "method":"contracts_getConditionRegisterOfPledge",
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

### contracts_getConditionVoteOfDefault
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
   "method":"contracts_getConditionVoteOfDefault",
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

### contracts_getConditionVoteOfKeepToken
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
   "method":"contracts_getConditionVoteOfKeepToken",
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

### contracts_getCreateConsensusGroupData
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
  11. `registerConditionId`: `uint8` 超级节点注册条件id，取1
  12. `registerConditionParam`: `[]byte` 超级节点注册条件参数
  13. `voteConditionId`: `uint8` 超级节点投票条件id，取1或2，值为1时VoteConditionParam通过contracts_getConditionVoteOfDefault获取；值为2时VoteConditionParam通过contracts_getConditionVoteOfKeepToken获取
  14. `voteConditionParam`: `[]byte` 超级节点投票条件参数


- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"contracts_getCreateConsensusGroupData",
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

### contracts_getCancelConsensusGroupData
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
   "method":"contracts_getCancelConsensusGroupData",
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

### contracts_getReCreateConsensusGroupData
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
   "method":"contracts_getReCreateConsensusGroupData",
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

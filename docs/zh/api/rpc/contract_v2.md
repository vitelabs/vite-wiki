---
sidebarDepth: 4
---

# Contract

:::tip 维护者
[viteLiz](https://github.com/viteLiz)
:::

## 创建合约步骤

创建合约本质上是发起一笔类型为创建合约的交易，并指定创建合约的代码和参数。具体步骤如下：

1. 调用`contract_createContractAddress`接口生成新合约地址。
2. 根据ABI定义对构造函数的入参进行编码，如果构造函数没有入参，可以跳过这一步。可以使用`vitejs`的`abi.encodeParameters`方法。
3. 生成交易data，data内容为14字节固定长度前缀（10字节委托共识组id+1字节合约类型+1字节确认数+1字节随机数种子数+1字节配额翻倍数）+初始化代码（编译器编译出的合约代码）+第2步编码后的参数。
4. 构造账户块，调用`ledger_sendRawTransaction`接口发起创建合约交易，其中`toAddress`为第1步生成的合约地址；`data`为第3步生成的交易数据；`blockType`为1，表示该交易为创建合约交易；`amount`和`tokenId`为调用合约构造函数时的转账金额和代币id；`fee`字段值为创建合约的10 VITE费用。

`vitejs`的`builtinTxBlock.createContract`接口实现了以上逻辑。

创建合约参数说明：

* 委托共识组id: 合约链上的响应交易由委托共识组的出块节点出块，目前只有公共委托共识组，id为`00000000000000000002`。
* 合约类型: 填1，表示为Solidity++合约。
* 确认数: 发给合约账户的请求交易被多少个快照块确认之后出响应交易，取值范围0-75，取0表示不需要等待请求交易被快照块确认。如果合约代码中使用了时间戳、快照块高度、随机数指令，要求这个字段值大于0。取值越大，合约响应交易出块越慢。合约的每个响应交易会根据确认数收取额外的配额。
* 随机数确认数: 发给合约账户的请求交易被多少个包含随机数的快照块确认之后出响应交易，取值范围0-75，取0表示不需要等待请求交易被包含随机数的快照块确认。如果合约代码中使用了随机数指令，要求这个字段值大于0，取值越大，随机数越安全。随机数确认数必须大于或等于确认数。
* 配额翻倍数: 调用合约方法时请求交易收取多少倍配额，合约响应交易收取的配额不受影响。取值范围为10-100，分别表示收取1-10倍配额，例如，取值为15时表示调用合约时对请求交易收取1.5倍的配额。

## 调用合约步骤

调用合约本质上是向合约账户发起一笔转账交易，并指定调用的接口和参数。具体步骤如下：

1. 根据ABI定义对调用合约的方法名和参数进行编码，生成交易data。可以使用`vitejs`的`abi.encodeFunctionCall`方法。
2. 构造账户块，调用`ledger_sendRawTransaction`接口发起调用合约交易，其中`toAddress`为被调用的合约地址；`data`为第1步生成的交易数据；`blockType`为2，表示该交易为转账交易或者调用合约交易；`amount`和`tokenId`为调用合约时的转账金额和代币id；`fee`字段值填0。

`vitejs`的`builtinTxBlock.callContract`接口实现了以上逻辑。

## 离线读取合约状态

Vite链上部署的智能合约可以通过`getter`方法来离线读取合约状态。在编译合约时会生成`getter`方法的ABI定义和离线读取的代码。

1. 根据ABI定义对合约离线读取接口的方法名和参数进行编码。这一步可以使用`vitejs`的`abi.encodeFunctionCall`方法。
2. 调用`contract_callOffChainMethod `方法，查询合约状态。

## 调用内置合约

调用内置合约和调用普通合约类似，也是向内置合约发起一笔转账交易，并指定调用的接口和参数。Vite提供了配额、共识、铸币3个内置合约。

调用内置合约时，先根据内置合约的ABI定义对方法名和参数进行编码，然后通过`ledger_sendRawTransaction`给对应的合约发送交易。

`vitejs`的`builtinTxBlock`模块封装了大部分内置合约的调用接口。

### 配额合约
#### 合约账户地址
`vite_0000000000000000000000000000000000000003f6af7459b9`

#### ABI
```json
[
  // 抵押获取配额
  {"type":"function","name":"Stake", "inputs":[{"name":"beneficiary","type":"address"}]},
  // 取消抵押
  {"type":"function","name":"CancelStake","inputs":[{"name":"beneficiary","type":"address"},{"name":"amount","type":"uint256"}]},
  // 代理抵押
  {"type":"function","name":"DelegateStake", "inputs":[{"name":"stakeAddress","type":"address"},{"name":"beneficiary","type":"address"},{"name":"bid","type":"uint8"},{"name":"stakeHeight","type":"uint64"}]},
  // 取消代理抵押
  {"type":"function","name":"CancelDelegateStake","inputs":[{"name":"stakeAddress","type":"address"},{"name":"beneficiary","type":"address"},{"name":"amount","type":"uint256"},{"name":"bid","type":"uint8"}]},
]
```
其中，代理抵押和取消代理抵押的回调方法定义如下：
```json
[
  // 代理抵押回调
  {"type":"function","name":"DelegateStakeCallback","inputs":[{"name":"stakeAddress","type":"address"},{"name":"beneficiary","type":"address"},{"name":"amount","type":"uint256"},{"name":"bid","type":"uint8"},{"name":"success","type":"bool"}]},
  // 取消代理抵押回调
  {"type":"function","name":"CancelDelegateStakeCallback","inputs":[{"name":"stakeAddress","type":"address"},{"name":"beneficiary","type":"address"},{"name":"amount","type":"uint256"},{"name":"bid","type":"uint8"},{"name":"success","type":"bool"}]}       
]
```

#### Stake 抵押获取配额

抵押时需要转账，最少抵押134 `VITE`。抵押后259200个快照块（大约3天）后可以取回，多次给同一个配额受益地址抵押时，到期高度按最后一次抵押时的快照块高度计算。

- **Parameters**: 
  * `beneficiary`: `string address` 配额受益地址

#### CancelStake 取消抵押

抵押到期后可以取消抵押，取消抵押时可以部分取消，取消抵押不影响抵押到期高度。

- **Parameters**: 
  * `beneficiary`: `string address` 配额受益地址
  * `amount`: `string bigint` 取消金额，单次取消抵押的金额不低于134 `VITE`，剩余抵押金额不低于134 `VITE`

#### DelegateStake 代理抵押

代理抵押时需要转账，最少抵押134 `VITE`，发起代理抵押请求交易的地址为代理地址。

- **Parameters**: 
  * `stakeAddress`: `string address` 抵押地址
  * `beneficiary`: `string address` 配额受益地址
  * `bid`: `uint8` 业务id，同一个抵押地址通过同一个代理给同一个受益地址的抵押，会按bid聚合成不同的抵押记录，抵押到期高度按该bid最后一次抵押时的快照块高度计算。
  * `stakeHeight`: `string uint64` 抵押高度，即多少个快照块后可以取消抵押，不低于259200

#### DelegateStakeCallback 代理抵押回调

- **Parameters**: 
  * `stakeAddress`: `string address` 抵押地址
  * `beneficiary`: `string address` 配额受益地址
  * `bid`: `uint8` 业务id
  * `stakeHeight`: `string uint64` 抵押高度
  * `success`: `bool` 是否抵押成功，如果抵押失败，通过回调请求交易退回抵押金额

#### CancelDelegateStake 取消代理抵押

代理抵押到期后可以由代理地址发起请求交易取消抵押，取消抵押时可以部分取消，取消抵押不影响抵押到期高度。

- **Parameters**: 
  * `stakeAddress`: `string address` 抵押地址
  * `beneficiary`: `string address` 配额受益地址
  * `amount`: `string bigint` 取消金额，单次取消抵押的金额不低于134 `VITE`，剩余抵押金额不低于134 `VITE`
  * `bid`: `uint8` 业务id

#### CancelDelegateStakeCallback 取消代理抵押回调

- **Parameters**: 
  * `stakeAddress`: `string address` 抵押地址
  * `beneficiary`: `string address` 配额受益地址
  * `amount`: `string bigint` 取消金额，单次取消抵押的金额不低于134 `VITE`，剩余抵押金额不低于134 `VITE`
  * `bid`: `uint8` 业务id
  * `success`: `bool` 是否取消抵押成功，如果取消成功，通过回调请求交易退回抵押金额

### 共识合约
#### 合约账户地址
`vite_0000000000000000000000000000000000000004d28108e76b`

#### ABI
```json
[
  // 注册超级节点
  {"type":"function","name":"Register", "inputs":[{"name":"gid","type":"gid"},{"name":"sbpName","type":"string"},{"name":"blockProducingAddress","type":"address"}]},
  // 更新超级节点出块地址
  {"type":"function","name":"UpdateBlockProducingAddress", "inputs":[{"name":"gid","type":"gid"},{"name":"sbpName","type":"string"},{"name":"newBlockProducingAddress","type":"address"}]},
  // 注销超级节点
  {"type":"function","name":"Revoke","inputs":[{"name":"gid","type":"gid"}, {"name":"sbpName","type":"string"}]},
  // 提取出块奖励
  {"type":"function","name":"WithdrawReward","inputs":[{"name":"gid","type":"gid"},{"name":"sbpName","type":"string"},{"name":"receiveAddress","type":"address"}]},
  // 给超级节点投票
  {"type":"function","name":"Vote", "inputs":[{"name":"gid","type":"gid"},{"name":"sbpName","type":"string"}]},
  // 取消投票
  {"type":"function","name":"CancelVote","inputs":[{"name":"gid","type":"gid"}]}
]
```

#### Register 注册超级节点

注册超级节点时需要转账100w `VITE`作为抵押，超级节点注册成功后7776000个快照块（大约3个月）后可以注销超级节点。建议在注册超级节点前先准备好一台gvite节点，并同步到最新高度。

- **Parameters**: 
  * `gid`: `string gid` 快照共识组id，当前为`00000000000000000001`
  * `sbpName`: `string` 超级节点名称，不允许重复
  * `blockProducingAddress`: `string address` 出块地址，建议将注册地址和出块地址分开

#### UpdateBlockProducingAddress 更新超级节点出块地址

超级节点未注销时，可以修改出块地址。例如当平滑迁移超级节点机器时，可以在新机器上配置一个新的出块地址，启动gvite节点，并同步到最新高度，然后发交易更新出块地址，再下掉旧节点。

- **Parameters**: 
  * `gid`: `string gid` 快照共识组id，当前为`00000000000000000001`
  * `sbpName`: `string` 超级节点名称
  * `newBlockProducingAddress`: `string address` 新的出块地址

#### Revoke 注销超级节点

超级节点抵押到期后，可以注销超级节点。注销后超级节点不能再继续出块，也无法再获得超级节点奖励。

- **Parameters**: 
  * `gid`: `string gid` 快照共识组id，当前为`00000000000000000001`
  * `sbpName`: `string` 超级节点名称

#### WithdrawReward 提取出块奖励

每个周期最后一轮排名在前100名的超级节点，可以在该周期结束1小时后提取超级节点奖励。

- **Parameters**: 
  * `gid`: `string gid` 快照共识组id，当前为`00000000000000000001`
  * `sbpName`: `string` 超级节点名称
  * `receiveAddress`: `string address` 奖励接收地址

#### Vote 给超级节点投票

投票时不需要转账，计票时用当时的账户余额作为投票数。同一个账户多次发起投票请求交易，后一次投票的结果会覆盖前一次投票的结果。

- **Parameters**: 
  * `gid`: `string gid` 快照共识组id，当前为`00000000000000000001`
  * `sbpName`: `string` 超级节点名称

#### CancelVote 取消投票

投票可以随时取消。

- **Parameters**: 
  * `gid`: `string gid` 快照共识组id，当前为`00000000000000000001`

### 铸币合约
#### 合约账户地址
`vite_000000000000000000000000000000000000000595292d996d`

#### ABI
```json
[
  // 铸币
  {"type":"function","name":"IssueToken","inputs":[{"name":"isReIssuable","type":"bool"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"},{"name":"totalSupply","type":"uint256"},{"name":"decimals","type":"uint8"},{"name":"maxSupply","type":"uint256"},{"name":"isOwnerBurnOnly","type":"bool"}]},
  // 增发代币
  {"type":"function","name":"ReIssue","inputs":[{"name":"tokenId","type":"tokenId"},{"name":"amount","type":"uint256"},{"name":"receiveAddress","type":"address"}]},
  // 销毁代币
  {"type":"function","name":"Burn","inputs":[]},
  // 转移可增发代币的所有权
  {"type":"function","name":"TransferOwnership","inputs":[{"name":"tokenId","type":"tokenId"},{"name":"newOwner","type":"address"}]},
  // 将可增发代币修改为不可增发代币
  {"type":"function","name":"DisableReIssue","inputs":[{"name":"tokenId","type":"tokenId"}]},
  // 查询代币信息
  {"type":"function","name":"GetTokenInfo","inputs":[{"name":"tokenId","type":"tokenId"},{"name":"bid","type":"uint8"}]},
  // 铸币成功事件
  {"type":"event","name":"issue","inputs":[{"name":"tokenId","type":"tokenId","indexed":true}]},
  // 增发成功事件
  {"type":"event","name":"reIssue","inputs":[{"name":"tokenId","type":"tokenId","indexed":true}]},
  // 销毁成功事件
  {"type":"event","name":"burn","inputs":[{"name":"tokenId","type":"tokenId","indexed":true},{"name":"burnAddress","type":"address"},{"name":"amount","type":"uint256"}]},
  // 转移所有权成功事件
  {"type":"event","name":"transferOwnership","inputs":[{"name":"tokenId","type":"tokenId","indexed":true},{"name":"owner","type":"address"}]},
  // 修改代币类型成功事件
  {"type":"event","name":"disableReIssue","inputs":[{"name":"tokenId","type":"tokenId","indexed":true}]}
]
```
其中，链上查询代币信息的回调方法定义如下：
```json
[
  // 查询代币信息回调
  {"type":"function","name":"GetTokenInfoCallback","inputs":[{"name":"tokenId","type":"tokenId"},{"name":"bid","type":"uint8"},{"name":"exist","type":"bool"},{"name":"decimals","type":"uint8"},{"name":"tokenSymbol","type":"string"},{"name":"index","type":"uint16"},{"name":"owner","type":"address"}]}
]
```

#### IssueToken 铸币

铸币请求交易需要支付1000 `VITE`手续费。铸币成功后，铸币账户即为代币所有者，会收到一笔金额等于发行总量的在途交易。

- **Parameters**: 
  * `isReIssuable`: `bool` 是否可增发，true 可增发 false  不可增发
  * `tokenName`: `string` 代币名称，1到40个字符，包含大小写字母、下划线、空格，不能以空格开头或结尾，不能包含连续空格
  * `tokenSymbol`: `string` 代币简称，1到10个字符，包含大写字母、数字，不能使用`VITE`、`VCP`、`VX`
  * `totalSupply`: `string bigint` 发行总量，$totalSupply \leq 2^{256}-1$
  * `decimals`: `uint8` 小数位数，$10^{decimals} \leq totalSupply$
  * `maxSupply`: `string bigint` 最大发行量，不可增发代币此字段值填0，可增发代币$totalSupply \leq maxSupply \leq 2^{256}-1$
  * `isOwnerBurnOnly`: `bool` 是否仅所有者可销毁，true 仅所有者可销毁 false 所有持币账户可销毁，不可增发代币此字段填false
  
#### ReIssue 增发代币

可增发代币的所有者可以发起交易来增发代币。

- **Parameters**: 
  * `tokenId`: `string tokenId` 代币id
  * `amount`: `string bigint` 增发金额，增发交易会增加代币的发行总量，增发后的发行总量不能高于最大发行量
  * `receiveAddress`: `string address` 增发代币的接收地址

#### Burn 销毁代币

可增发代币可以通过销毁代币交易来销毁，销毁时将需要销毁的金额转账给铸币合约。不可增发代币不能销毁。

#### TransferOwnership 转移可增发代币的所有权

可增发代币的所有者可以将代币所有权转移给其他账户。不可增发代币不能转移所有权。

- **Parameters**: 
  * `tokenId`: `string tokenId` 代币id
  * `newOwner`: `string address` 新的所有者账户

#### DisableReIssue 将可增发代币修改为不可增发代币

可增发代币的所有者可以将可增发代币修改为不可增发代币。

- **Parameters**: 
  * `tokenId`: `string tokenId` 代币id

#### GetTokenInfo 查询代币信息

- **Parameters**: 
  * `tokenId`: `string tokenId` 代币id
  * `bid`: `uint8` 业务id，业务id字段会在回调中返回

#### GetTokenInfoCallback 查询代币信息回调
- **Parameters**: 
  * `tokenId`: `string tokenId` 代币id
  * `bid`: `uint8` 业务id
  * `exist`: `bool` 代币是否存在，true 存在 false 不存在
  * `tokenSymbol`: `string` 代币简称
  * `index`: `uint16` 序号，从0开始，同名tokenSymbol的序号按铸币顺序递增
  * `owner`: `string address` 所有者

## contract_createContractAddress
创建合约时生成新的合约地址

- **Parameters**: 
  * `string address`: 交易发起方账户地址
  * `string uint64`: 当前块高度
  * `string hash`: 交易发起方账户链上上一个块的哈希

- **Returns**: 
  - `string address` 新的合约地址

- **Example**:
::: demo
```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"contract_createContractAddress",
   "params":[
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6", 
      "2", 
      "3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7"]
}
```
```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "vite_96a7911037179451bada2ab05ee070ba83dcfa2fac2ad6d770"
}
```
:::

## contract_getContractInfo
查询合约信息

- **Parameters**: 
  * `string address`: 合约账户地址
  
- **Returns**: 
  - `ContractInfo`
    - `code`: `string base64`  合约代码
    - `gid`: `string gid`  合约所属委托共识组id
    - `responseLatency`: `uint8` 确认数
    - `randomDegree`: `uint8` 随机数确认数
    - `quotaMultiplier`: `uint8` 配额翻倍数

- **Example**:
::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "contract_getContractInfo",
    "params": ["vite_22f4f195b6b0f899ea263241a377dbcb86befb8075f93eeac8"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "code": "AWCAYEBSYAQ2EGEAQVdgADV8AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQBGP/////FoBjkabLSxRhAEZXW2AAgP1bYQCJYASANgNgIIEQFWEAXFdgAID9W4EBkICANXT///////////////////////////8WkGAgAZCSkZBQUFBhAItWWwBbgHT///////////////////////////8WRmn/////////////FjRgQFFgQFGAggOQg4WH8VBQUFCAdP///////////////////////////xZ/qmUoH130tL08cfK6JZBbkHIF/OCAmoFu+OBLTUlqhbs0YEBRgIKBUmAgAZFQUGBAUYCRA5CiUFb+oWVienpyMFgg5BEYZploBADsJutGp1y0+UwegyI5VjOkuA+v2lg7JFoAKQ==",
        "gid": "00000000000000000002",
        "responseLatency": 2,
        "randomDegree": 1,
        "quotaMultiplier": 10
    }
}
```
:::

## contract_callOffChainMethod
离线调用合约的getter方法。

- **Parameters**: 
  * `Params`:
    * `address`:`string address` 合约账户地址
    * `code`:`string base64` 用于离线查询的合约代码。即编译代码时指定`--bin`参数后得到的`OffChain Binary`代码。
    * `data`:`string base64` 按ABI定义编码后的调用参数，类似调用合约时的交易data。
    
- **Returns**: 
  - `string base64` 按ABI定义编码后的getter方法返回值。可以使用vitejs的abi decode方法解码。

- **Example**:
::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "contract_callOffChainMethod",
    "params": [{
      "address":"vite_22f4f195b6b0f899ea263241a377dbcb86befb8075f93eeac8",
      "code":"YIBgQFJgBDYQYEJXYAA1fAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkARj/////xaAY8GjSGUUYERXYEJWWwBbYEpgYFZbYEBRgIKBUmAgAZFQUGBAUYCRA5DzW2AAYABgAFBUkFBgblZbkFb+oWVienpyMFggSaCBXUGf/Mh5lfHDLvGQt9g3K+aLjE2PrRxcLb6RSWQAKQ==",
      "data":"waNIZQ=="
    }]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
}
```
:::

## contract_getContractStorage
离线查询合约存储。

- **Parameters**: 
  * `string address` 合约账户地址
  * `string` 合约存储的十六进制key或者key的前缀
    
- **Returns**: 
  - `map<string,string>` 合约状态的十六进制key和value

- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 17,
	"method": "contract_getContractStorage",
	"params": ["vite_22f4f195b6b0f899ea263241a377dbcb86befb8075f93eeac8","0000000000000000000000000000000000000000000000000000000000000001"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 17,
    "result": {
        "0000000000000000000000000000000000000000000000000000000000000001": "01"
    }
}
```
:::

## contract_getQuotaByAccount
查询账户配额

- **Parameters**: 
  * `string address`: 账户地址

- **Returns**: 
  - `QuotaInfo`
    - `currentQuota`: `string uint64` 当前可用配额
    - `maxQuota`: `string uint64` 最大可用配额，即utpe对应的配额
    - `stakeAmount`: `string bigint` 抵押金额
  
- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "contract_getQuotaByAccount",
	"params": ["vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "currentQuota": "1554000",
        "maxQuota": "1575000",
        "stakeAmount": "10000000000000000000000"
    }
}
```
:::

## contract_getStakeList
查询账户的抵押信息列表，按到期快照块高度倒序排序

- **Parameters**: 
  * `string address`: 抵押账户地址
  * `int`: 页码，从0开始
  * `int`: 每页条数

- **Returns**: 
  - `StakeListInfo`
    - `totalStakeAmount`: `string bigint`  本账户抵押的总金额
    - `totalStakeCount`: `int`  抵押信息总数
    - `stakeList`: `Array<StakeInfo>` 抵押信息列表
      - `stakeAddress`: `string address`  抵押地址
      - `stakeAmount`: `string bigint`  抵押金额
      - `expirationHeight`: `string uint64`  到期快照块高度，到期后可以取回抵押
      - `beneficiary`: `string address`  配额受益地址
      - `expirationTime`: `int64`  预估到期时间
      - `isDelegated`: `bool`  是否代理抵押，true-代理抵押 false-普通抵押
      - `delegateAddress`: `string address`  代理地址，普通抵押代理地址为0
      - `bid`: `uint8`  代理业务id，非代理抵押业务id为0
    
- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "1.0",
	"id": 1,
	"method": "contract_getStakeList",
	"params": ["vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",0,10]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "totalStakeAmount": "1000000000000000000000",
        "totalStakeCount": 1,
        "stakeList": [
            {
                "stakeAmount": "1000000000000000000000",
                "beneficiary": "vite_bd756f144d6aba40262c0d3f282b521779378f329198b591c3",
                "expirationHeight": "1360",
                "expirationTime": 1567490923,
                "isDelegated": false,
                "delegateAddress": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
                "stakeAddress": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
                "bid": 0
            }
        ]
    }
}
```
:::

## contract_getRequiredStakeAmount
根据配额计算最小抵押金额

- **Parameters**: 
  * `string uint64`: 每秒使用的配额，例如：以1/75 TPS的交易频率发不带备注的转账交易，单笔交易消耗的配额为21000，每秒消耗的配额为21000/75=280，此时最少需要抵押134 VITE

- **Returns**: 
  - `string bigint`: 最小抵押金额
    
- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "contract_getRequiredStakeAmount",
	"params": ["280"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "134000000000000000000"
}
```
:::

## contract_getDelegatedStakeInfo
查询代理抵押信息

- **Parameters**: 
  * `Params`
    * `stakeAddress`:`string address`  实际抵押地址
    * `delegateAddress`:`string address`  代理抵押地址
    * `beneficiary`:`string address`  配额受益地址
    * `bid`:`uint8`  业务id，来自同一个代理地址相同业务id的多笔抵押金额会合并，抵押到期高度按最后一笔抵押时的快照块高度计算

- **Returns**: 
  - `StakeInfo` 同`contract_getStakeList`
    
- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "contract_getDelegatedStakeInfo",
	"params": [
		{
			"stakeAddress":"vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906", 
			"delegateAddress":"vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
			"beneficiary":"vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
			"bid":2
		}
	]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "stakeAmount": "1000000000000000000000",
        "beneficiary": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "expirationHeight": "543",
        "expirationTime": 1567490406,
        "isDelegated": true,
        "delegateAddress": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
        "stakeAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
        "bid": 2
    }
}
```
:::

## contract_getSBPList
查询注册的超级节点列表，包括已取消注册的超级节点，返回结果中未取消在前，已取消在后，按抵押到期高度倒序排列

- **Parameters**: 
  * `string address`: 注册账户地址

- **Returns**: 
  - `Array<SBPInfo>`
    - `name`: `string`  超级节点名称
    - `blockProducingAddress`: `string address`  签名快照块的账户地址
    - `stakeAddress`: `string address`  抵押账户，即注册账户地址
    - `stakeAmount`: `string bigint`  抵押金额
    - `expirationHeight`: `string uint64`  抵押到期高度，到期后可以取消注册并取回抵押
    - `expirationTime`: `int64`  预估抵押到期时间
    - `revokeTime`: `int64`  取消注册时间，值为0时表示当前未取消

- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "contract_getSBPList",
	"params": ["vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "name": "s1",
            "blockProducingAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
            "stakeAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
            "stakeAmount": "1000000000000000000000000",
            "expirationHeight": "7776000",
            "expirationTime": 1575266076,
            "revokeTime": 0
        }
    ]
}
```
:::

## contract_getSBPRewardPendingWithdrawal
查询超级节点待提取奖励

- **Parameters**: 
  * `string`: 超级节点名称

- **Returns**: 
  - `RewardInfo`
    - `totalReward`: `string bigint`  待提取奖励
    - `blockProducingReward`: `string bigint`  待提取按块奖励
    - `votingReward`: `string bigint`  待提取按票奖励
    - `producedBlocks`: `string bigint`  一个周期内的实际出块数，查询待提取奖励时此字段值为0
    - `targetBlocks`: `string bigint`  一个周期内的应出块数，查询待提取奖励时此字段值为0
    - `allRewardWithdrawed`: `bool` 值为true时表示节点已取消，并且所有的奖励已提取完

- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "contract_getSBPRewardPendingWithdrawal",
	"params": ["s1"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "blockProducingReward": "1499714611872146118517",
        "votingReward": "746306845207209076970",
        "totalReward": "2246021457079355195487",
        "producedBlocks": "0",
        "targetBlocks": "0",
        "allRewardWithdrawed": false
    }
}
```
:::

## contract_getSBPRewardByTimestamp
按时间查询某一天所有超级节点的奖励

- **Parameters**: 
  * `int64`: 时间戳，单位为秒，查询该时间戳所在周期的所有超级节点的奖励

- **Returns**: 
  - `RewardByDayInfo` 
    - `rewardMap`: `map<string,RewardInfo>` 同`contract_getSBPRewardPendingWithdrawal`，其中`allRewardWithdrawed`字段值为false
    - `startTime`: `int64` 周期开始时间
    - `endTime`: `int64` 周期结束时间
    - `cycle`: `string uint64` 周期

- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "contract_getSBPRewardByTimestamp",
	"params": [1567440000]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "rewardMap": {
            "s1": {
                "blockProducingReward": "1499714611872146118517",
                "votingReward": "746306845207209076970",
                "totalReward": "2246021457079355195487",
                "producedBlocks": "3153",
                "targetBlocks": "3168",
                "allRewardWithdrawed": false
            },
            "s2": {
                "blockProducingReward": "0",
                "votingReward": "0",
                "totalReward": "0",
                "producedBlocks": "0",
                "targetBlocks": "3168",
                "allRewardWithdrawed": false
            }
        },
        "startTime": 1567396800,
        "endTime": 1567483200,
        "cycle": "104"
    }
}
```
:::

## contract_getSBPRewardByCycle
按周期查询某一天所有超级节点的奖励

- **Parameters**: 
  * `string uint64`: 周期

- **Returns**: 
  - `RewardByDayInfo` 同`contract_getSBPRewardByTimestamp`

- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "contract_getSBPRewardByCycle",
	"params": ["104"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "rewardMap": {
            "s1": {
                "blockProducingReward": "1499714611872146118517",
                "votingReward": "746306845207209076970",
                "totalReward": "2246021457079355195487",
                "producedBlocks": "3153",
                "targetBlocks": "3168",
                "allRewardWithdrawed": false
            },
            "s2": {
                "blockProducingReward": "0",
                "votingReward": "0",
                "totalReward": "0",
                "producedBlocks": "0",
                "targetBlocks": "3168",
                "allRewardWithdrawed": false
            }
        },
        "startTime": 1567396800,
        "endTime": 1567483200,
        "cycle": "104"
    }
}
```
:::

## contract_getSBP
根据名称查询超级节点信息

- **Parameters**: 
  * `string`: 超级节点名称

- **Returns**: 
  - `SBPInfo` 同`contract_getSBPList`

- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "contract_getSBP",
	"params": ["s1"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "name": "s1",
        "blockProducingAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
        "stakeAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
        "stakeAmount": "500000000000000000000000",
        "expirationHeight": "7776000",
        "expirationTime": 1575268146,
        "revokeTime": 0
    }
}
```
:::

## contract_getSBPVoteList
查询所有超级节点当前获得的投票数

- **Parameters**: 

- **Returns**: 
  - `Array<SBPVoteInfo>`
    - `sbpName`: `string` 超级节点名称
    - `blockProducingAddress`: `string address` 出块地址
    - `votes`: `string bigint` 投票数

- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "contract_getSBPVoteList",
	"params": []
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "sbpName": "s1",
            "blockProducingAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
            "votes": "100000000000000000000"
        },
        {
            "sbpName": "s2",
            "blockProducingAddress": "vite_0acbb1335822c8df4488f3eea6e9000eabb0f19d8802f57c87",
            "votes": "50000000000000000000"
        }
    ]
}
```
:::

## contract_getVotedSBP
查询投票信息

- **Parameters**: 
  * `string address`: 账户地址

- **Returns**: 
  - `VoteInfo`
    - `blockProducerName`: `string` 超级节点名称
    - `status`: `uint8` 超级节点注册状态：1 正常 2 已取消注册
    - `votes`: `string bigint` 账户投票数，即账户VITE余额
  
- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "1.0",
	"id": 1,
	"method": "contract_getVotedSBP",
	"params": [
		"vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a"
	]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "blockProducerName": "s1",
        "status": 1,
        "votes": "599960989999999999999999997"
    }
}
```
:::

## vote_getVoteDetails
按周期查询当天最后一轮共识的超级节点的投票明细

- **Parameters**: 
  * `string uint64`: 周期 

- **Returns**: 
  - `Array<SBPVoteDetail>`
    - `blockProducerName`: `string` 超级节点名称
    - `totalVotes`: `string bigint` 该超级节点在当天最后一轮共识结果中获得的总投票数
    - `blockProducingAddress`: `string address` 超级节点当前出块地址
    - `historyProducingAddresses`: `Array<string address>` 超级节点历史使用过的所有的出块地址
    - `addressVoteMap`: `map<string address, string bigint>` 投票明细

- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "1.0",
	"id": 1,
	"method": "contract_getSBPVoteDetailsByCycle",
	"params": ["104"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "blockProducerName": "s1",
            "totalVotes": "100000000000000000000",
            "blockProducingAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
            "historyProducingAddresses": [
                "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906"
            ],
            "addressVoteMap": {
                "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a": "100000000000000000000"
            }
        },
        {
            "blockProducerName": "s2",
            "totalVotes": "50000000000000000000",
            "blockProducingAddress": "vite_0acbb1335822c8df4488f3eea6e9000eabb0f19d8802f57c87",
            "historyProducingAddresses": [
                "vite_0acbb1335822c8df4488f3eea6e9000eabb0f19d8802f57c87"
            ],
            "addressVoteMap": {
                "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23": "50000000000000000000"
            }
        }
    ]
}
```
:::

## contract_getTokenInfoList
分页查询代币信息列表

- **Parameters**: 
  * `int`: 页码，从0开始
  * `int`: 每页条数

- **Returns**: 
  - `TokenListInfo`
    - `totalCount`: `int` 代币信息总数
    - `tokenInfoList`: `Array<TokenInfo>` 见[TokenInfo](./common_models_v2.html#tokeninfo)
  
- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "contract_getTokenInfoList",
	"params": [0, 10]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "totalCount": 1,
        "tokenInfoList": [
            {
                "tokenName": "Vite Token",
                "tokenSymbol": "VITE",
                "totalSupply": "1000000000000000000000000000",
                "decimals": 18,
                "owner": "vite_0000000000000000000000000000000000000004d28108e76b",
                "tokenId": "tti_5649544520544f4b454e6e40",
                "maxSupply": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
                "isReIssuable": true,
                "index": 0,
                "isOwnerBurnOnly": false
            }
        ]
    }
}
```
:::

## contract_getTokenInfoById
根据代币id查询代币信息

- **Parameters**: 
  * `string tokenId`: 代币id

- **Returns**: 
  - `TokenInfo` 见[TokenInfo](./common_models_v2.html#tokeninfo)
  
- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "contract_getTokenInfoById",
	"params": ["tti_5649544520544f4b454e6e40"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "tokenName": "VITE",
        "tokenSymbol": "VITE",
        "totalSupply": "999369292029736282857580488",
        "decimals": 18,
        "owner": "vite_0000000000000000000000000000000000000004d28108e76b",
        "tokenId": "tti_5649544520544f4b454e6e40",
        "maxSupply": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "isReIssuable": true,
        "index": 0,
        "isOwnerBurnOnly": false
    }
}
```
:::

## contract_getTokenInfoListByOwner
根据代币所有者账户地址查询代币信息列表

- **Parameters**: 
  * `string address`: 代币所有者账户地址

- **Returns**: 
  - `Array<TokenInfo>` 见[TokenInfo](./common_models_v2.html#tokeninfo)
  
- **Example**:
::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "contract_getTokenInfoListByOwner",
	"params": ["vite_0000000000000000000000000000000000000004d28108e76b"]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "tokenName": "VITE",
            "tokenSymbol": "VITE",
            "totalSupply": "999411106171319027184734227",
            "decimals": 18,
            "owner": "vite_0000000000000000000000000000000000000004d28108e76b",
            "tokenId": "tti_5649544520544f4b454e6e40",
            "maxSupply": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
            "isReIssuable": true,
            "index": 0,
            "isOwnerBurnOnly": false
        }
    ]
}
```
:::

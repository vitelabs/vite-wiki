# 连接客户端

:::作者
[hurrytospring](https://github.com/hurrytospring)
:::

:::abstract
包括一些内置的快捷聚合
:::

##builtin
- cancelPledgeBlock(__namedParameters: object): 获取取消抵押交易block
- **Parameters**:
 __namedParameters：
* `accountAddress`: `string`  抵押账户
* `amount`: `string` 抵押金额
* `toAddress`: `string` 抵押合约地址
* `tokenId`: `string` 代币id

- **Return**:
* Promise<accountBlock>



- cancelRegisterBlock(__namedParameters: object) 构造取消注册超级节点交易块
- **Parameters**:
__namedParameters: object
* `Gid`: `string`
* `accountAddress`: `string`
* `nodeName`: `string`
* `tokenId`: `string`
* `Returns` `any`

- **Return**:
* Promise<accountBlock>

- cancelVoteBlock(__namedParameters: object): 构造取消投票交易块
- **Parameters**:
__namedParameters: object
`Gid`: `string`
`accountAddress`: `string`
`tokenId`: `string`
- **Return**:
* Promise<accountBlock>


- getAccountBlock(__namedParameters: object): 通用构造块

- **Parameters**:
__namedParameters: object

`accountAddress`: any
`amount`: any
`blockType`: any
`data`: any
`fromBlockHash`: any
`message`: any
`toAddress`: any
`tokenId`: any
- **Return**:
* Promise<accountBlock>



getBalance(addr: `string`): 获取余额块
Parameters
`addr`: `string`
- **Return**:
* Promise<accountBlock>



getBlocks(__namedParameters: object): any
Parameters
__namedParameters: object
`addr`: `string`
`index`: number
`pageCount`: number
- **Return**:
* Promise<accountBlock>



pledgeBlock(__namedParameters: object) 构造抵押配额交易块
Parameters
__namedParameters: object
`accountAddress`: `string`
`amount`: `string`
`toAddress`: `string`
`tokenId`: `string`
- **Return**:
* Promise<accountBlock>



receiveBlock(__namedParameters: object): 构造普通接收交易块
Parameters
__namedParameters: object
`accountAddress`: `string`
`blockHash`: `string`
- **Return**:
* Promise<accountBlock>



registerBlock(__namedParameters: object) 构造注册超级节点交易块
Parameters
__namedParameters: object
`Gid`: `string`
`accountAddress`: `string`
`amount`: `string`
`nodeName`: `string`
`producerAddr`: `string`
`tokenId`: `string`
- **Return**:
* Promise<accountBlock>



rewardBlock(__namedParameters: object)  ？？
Parameters
__namedParameters: object
`Gid`: `string`
`accountAddress`: `string`
`nodeName`: `string`
`rewardAddress`: `string`
`tokenId`: `string`
- **Return**:
* Promise<accountBlock>



sendBlock(__namedParameters: object): 构造普通发送交易块
Parameters
__namedParameters: object
`accountAddress`: `string`
`amount`: `string`
`message`: `string`
`toAddress`: `string`
`tokenId`: `string`
- **Return**:
* Promise<accountBlock>



updateRegisterBlock(__namedParameters: object) 构造取消超级节点交易块
Parameters
__namedParameters: object
`Gid`: `string`
`accountAddress`: `string`
`nodeName`: `string`
`producerAddr`: `string`
`tokenId`: `string`
- **Return**:
* Promise<accountBlock>



voteBlock(__namedParameters: object) 构造投票交易块
Parameters
__namedParameters: object
`Gid`: `string`
`accountAddress`: `string`
`nodeName`: `string`
`tokenId`: `string`
- **Return**:
* Promise<accountBlock>

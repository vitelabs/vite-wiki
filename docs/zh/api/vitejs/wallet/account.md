# account

## Constructor

- **constructor params**: 
    __namedParameters: object
    * `privateKey : string` 私钥
    * `client : Client` client实例

## Account 实例

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| address | string | hex地址 |
| realAddress | string | 真实地址 |
| privateKey | string | 私钥 |
| publicKey | string | 公钥 |
| balance | object | 余额 |

### Instance Methods
Account 实例方法

#### getPublicKey
获取公钥

- **Return**:
    * `publicKey : Uint8Array with 32-byte public key` 公钥

#### sign
签名

- **Parameters** 
    * `hexStr : string` 需要签名的string
- **Return**:
    * `signature : string` 签名后的信息


#### activate
激活账户 (自动接收交易，轮询账户余额)

- **Parameters** 
    * `intervals : number` 轮询间隔
    * `receiveFailAction : function` 接收失败后的操作

#### freeze
冻结账户 (停止激活状态 - 停止自动接收交易以及查询余额)

#### autoReceiveTx
自动接收交易

- **Parameters** 
    * `intervals : number` 轮询间隔
    * `receiveFailAction : function` 接收失败后的操作

#### stopAutoReceiveTx
停止自动接收交易

#### getBalance
获取余额

- **Return**:
    * Promise<`balance`>

#### sendRawTx
发送原始交易

- **Parameters** 
    * `accountBlock` 规范后的accountBlock
- **Return**:
    * Promise

#### sendTx
发送交易

- **Parameters** 
    __namedParameters: object
    * `toAddress : Address` 接收方账户地址
    * `tokenId : tokenId` tokenId
    * `amount` 金额
    * `message : string` 留言
- **Return**:
    * Promise 

#### receiveTx
接收交易

- **Parameters** 
    __namedParameters: object
    * `fromBlockHash : string`
- **Return**:
    * Promise 

#### SBPreg
注册SBP

- **Parameters** 
    __namedParameters: object
    * `nodeName : string` 节点名称
    * `toAddress : Address` 账户地址
    * `tokenId : tokenId` tokenId
    * `amount` 金额
- **Return**:
    * Promise 

#### updateReg
更新注册SBP

- **Parameters** 
    __namedParameters: object
    * `nodeName : string` 节点名称
    * `toAddress : Address` 账户地址
    * `tokenId : tokenId` tokenId
- **Return**:
    * Promise 

#### revokeReg
撤销注册SBP

- **Parameters** 
    __namedParameters: object
    * `nodeName : string` 节点名称
    * `tokenId : tokenId` tokenId
- **Return**:
    * Promise 

#### retrieveReward
接收奖励

- **Parameters** 
    __namedParameters: object
    * `nodeName : string` 节点名称
    * `toAddress : Address` 账户地址
    * `tokenId : tokenId` tokenId
- **Return**:
    * Promise 

#### voting
投票

- **Parameters** 
    __namedParameters: object
    * `nodeName : string` 节点名称
    * `tokenId : tokenId` tokenId
- **Return**:
    * Promise 

#### revokeVoting
撤销投票

- **Parameters** 
    __namedParameters: object
    * `tokenId : tokenId` tokenId
- **Return**:
    * Promise 

#### getQuota
获取配额

- **Parameters** 
    __namedParameters: object
    * `toAddress : Address` 账户地址
    * `tokenId : tokenId` tokenId
    * `amount` 金额
- **Return**:
    * Promise 

#### withdrawalOfQuota
撤销配额

- **Parameters** 
    __namedParameters: object
    * `toAddress : Address` 账户地址
    * `tokenId : tokenId` tokenId
    * `amount` 金额
- **Return**:
    * Promise 
    

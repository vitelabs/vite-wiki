# account

```javascript

import provider from '@vite/vitejs/dist/es5/provider/WS';
import { client, wallet, utils } from '@vite/vitejs';

const { account } = wallet;

let WS_RPC = new provider("https://example.com");
let myClient = new client(WS_RPC);

let Account = new account({
    privateKey: utils.ed25519.keyPair().secretKey,
    client: myClient
});
Account.getBlance().then((result) => {
    console.log(result);
}).catch((err) => {
    console.warn(err);
});

```

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

#### createContract
创建合约

- **Parameters** 
    __namedParameters: object
    * `toAddress : Address` 账户地址
    * `hexCode: Hex` 十六进制合约代码
    * `abi: string` abi
    * `params: stirng` 创建合约参数。简单类型直接转换为string，复合类型为json格式的string
    * `tokenId : tokenId` tokenId
    * `amount` 金额
    * `fee` default '10000000000000000000'
- **Return**:
    * Promise 

#### callContract
调用合约

- **Parameters** 
    __namedParameters: object
    * `toAddress : Address` 账户地址
    * `tokenId : tokenId` tokenId
    * `methodName: string` 方法名称
    * `params: string` 方法参数。简单类型直接转换为string，复合类型为json格式的string
    * `abi: string` abi
    * `amount` 金额
- **Return**:
    * Promise 

#### mintage
铸币

- **Parameters** 
    __namedParameters: object
    * `tokenName: string`
    * `decimals: uint8`
    * `totalSupply: big.int`
    * `tokenSymbol: string`

- **Return**:
    * Promise

#### mintageIssue
增发代币

- **Parameters** 
    __namedParameters: object
    * `tokenId: TokenId` 代币id
    * `amount: uint64` 增发数量
    * `beneficial: Address` 增发代币接收地址

- **Return**:
    * Promise

#### mintageBurn
销毁代币

- **Return**:
    * Promise

#### changeTransferOwner
修改代币所有者

- **Parameters** 
    __namedParameters: object
    * `ownerAddress: Address`
    * `tokenId: TokenId`

- **Return**:
    * Promise

#### changeTokenType
修改代币类型, 将可增发代币修改为不可增发

- **Parameters** 
    __namedParameters: object
    * `tokenId: TokenId`

- **Return**:
    * Promise
    
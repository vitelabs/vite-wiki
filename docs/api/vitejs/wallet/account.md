# Account

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
    * `privateKey : string` Private Key
    * `client : Client` client Instance

## Account Instance

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| address | string | Hex Address |
| realAddress | string | Actual Address |
| privateKey | string | Private Key |
| publicKey | string | Public Key |
| balance | object | Account Balance |

### Instance Methods

#### getPublicKey

- **Return**:
    * `publicKey : Uint8Array with 32-byte public key` 

#### sign

- **Parameters** 
    * `hexStr : string` String needs to be signed
- **Return**:
    * `signature : string` Results after signing


#### activate
Activate Account (Auto Receiving Transaction, polling account balance)

- **Parameters** 
    * `intervals : number` Polling Intervals
    * `receiveFailAction : function` Actions after receiving failed

#### freeze
Freeze account (Stop activating status - Stop auto receiving transaction and checking balance )

#### autoReceiveTx

- **Parameters** 
    * `intervals : number` Polling Intervals
    * `receiveFailAction : function` Actions after receiving failed

#### stopAutoReceiveTx
Stop auto receiving transaction

#### getBalance
Get Balance

- **Return**:
    * Promise<`balance`>

#### sendRawTx
Send Original Transactions

- **Parameters** 
    * `accountBlock` Formatted accountBlock
- **Return**:
    * Promise

#### sendTx
Send Transaction

- **Parameters** 
    __namedParameters: object
    * `toAddress : Address` Receiver's address
    * `tokenId : tokenId` tokenId
    * `amount` Amount
    * `message : string` Comment
- **Return**:
    * Promise 

#### receiveTx
Receive Transaction

- **Parameters** 
    __namedParameters: object
    * `fromBlockHash : string`
- **Return**:
    * Promise 

#### SBPreg
SBP Registration

- **Parameters** 
    __namedParameters: object
    * `nodeName : string` Node Name
    * `toAddress : Address` Receiver's address
    * `tokenId : tokenId` tokenId
    * `amount` Amount
- **Return**:
    * Promise 

#### updateReg
Update SBP Registration

- **Parameters** 
    __namedParameters: object
    * `nodeName : string` Node Name
    * `toAddress : Address` Receiver's address
    * `tokenId : tokenId` tokenId
- **Return**:
    * Promise 

#### revokeReg
Revoke SBP Registration

- **Parameters** 
    __namedParameters: object
    * `nodeName : string` Node Name
    * `tokenId : tokenId` tokenId
- **Return**:
    * Promise 

#### retrieveReward
Retrieve Rewards

- **Parameters** 
    __namedParameters: object
    * `nodeName : string` Node Name
    * `toAddress : Address` 
    * `tokenId : tokenId` tokenId
- **Return**:
    * Promise 

#### voting


- **Parameters** 
    __namedParameters: object
    * `nodeName : string` Node Name
    * `tokenId : tokenId` tokenId
- **Return**:
    * Promise 

#### revokeVoting


- **Parameters** 
    __namedParameters: object
    * `tokenId : tokenId` tokenId
- **Return**:
    * Promise 

#### getQuota
Get Quota

- **Parameters** 
    __namedParameters: object
    * `toAddress : Address` 
    * `tokenId : tokenId` tokenId
    * `amount` Amount
- **Return**:
    * Promise 

#### withdrawalOfQuota
Withdrawal of Quota

- **Parameters** 
    __namedParameters: object
    * `toAddress : Address` 
    * `tokenId : tokenId` tokenId
    * `amount` Amount
- **Return**:
    * Promise 
    
#### createContract
Create contract

- **Parameters** 
    __namedParameters: object
    * `toAddress : Address`
    * `hexCode: Hex` Hex code of smart contract
    * `abi: string` ABI data of smart contract
    * `params: stirng` Passed-in parameters, in string for simple or JSON string for complex type
    * `tokenId : tokenId` tokenId
    * `amount` Amount
    * `fee` default '10000000000000000000'
- **Return**:
    * Promise 

#### callContract
Call contract

- **Parameters** 
    __namedParameters: object
    * `toAddress : Address`
    * `tokenId : tokenId` tokenId
    * `methodName: string` Method name
    * `params: string` Passed-in parameters, in string for simple or JSON string for complex type
    * `abi: string` ABI data of smart contract
    * `amount` Amount
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
  
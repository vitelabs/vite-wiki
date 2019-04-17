# addrAccount

:::tip abstract
@vite/vitejs-addraccount
:::

```javascript

import WS_RPC from '@vite/vitejs-ws';
import { client, addrAccount, privToAddr } from '@vite/vitejs';

let provider = new WS_RPC("ws://example.com");
let myClient = new client(provider);

let Account = new addrAccount({
    client: myClient,
    adrress: privToAddr.newHexAddr().hexAddr
});

Account.getBalance().then((result) => {
    console.log(result);
}).catch((err) => {
    console.warn(err);
});

```

## Constructor

- **constructor params**: 
    __namedParameters: object
    * `address : HexAddr` vite账户地址
    * `client : Client` client实例

## AddrAccount 实例

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| address | string | hex地址 |
| realAddress | string | 真实地址 |

### Instance Methods
AddrAccount 实例方法

#### getBalance
获取余额（包含在途）

- **Return**:
    * Promise<`balance`>

#### getOnroad
获取在途

- **Return**:
    * Promise

#### getOnroadBlocks
获取在途账户块列表

- **Parameters** 
    __namedParameters: object
    * `index : number` 页码
    * `pageCount : number` 个数
- **Return**:
    * Promise

#### getBlocks
获取账户块列表

- **Parameters** 
    __namedParameters: object
    * `index : number` 页码
    * `pageCount : number` 个数
- **Return**:
    * Promise

#### getAccountBalance
获取账户余额

- **Return**:
    * Promise

#### getLatestBlock
获取最新账户块

- **Return**:
    * Promise

#### getBlockByHeight

- **Return**:
    * Promise

#### getBlocksByHash

- **Parameters** 
    __namedParameters: object
    * `hash`
    * `num`
- **Return**:
    * Promise

#### getBlocksByHashInToken

- **Parameters** 
    __namedParameters: object
    * `hash`
    * `tokenId`
    * `num`
- **Return**:
    * Promise

#### getFittestSnapshotHash

- **Parameters** 
    * `sendblockHash`
- **Return**:
    * Promise

#### getPledgeQuota

- **Return**:
    * Promise

#### getPledgeList

- **Parameters** 
    __namedParameters: object
    * `index : number` 页码
    * `pageCount : number` 个数
- **Return**:
    * Promise

#### getRegistrationList

- **Return**:
    * Promise

#### getVoteInfo

- **Return**:
    * Promise

#### getTxList

- **Parameters** 
    __namedParameters: object
    * `index : number` 页码
    * `pageCount : number` 个数
    * `totalNum? : number`  总数
- **Return**:
    * Promise
    
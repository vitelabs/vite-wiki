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
    * `address : HexAddr` vite account address
    * `client : Client` client instance
    
## AddrAccount Instance

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| address | string | hex address |
| realAddress | string | real address |

### Instance Methods
AddrAccount instance method

#### getBalance
Get balance (including unreceived tokens)

- **Return**:
    * Promise<`balance`>

#### getOnroad
Get unreceived tokens

- **Return**:
    * Promise

#### getOnroadBlocks
Get unreceived account block list

- **Parameters** 
    __namedParameters: object
    * `index : number` page index
    * `pageCount : number` count
- **Return**:
    * Promise

#### getBlocks
Get account block list

- **Parameters** 
    __namedParameters: object
    * `index : number` page index
    * `pageCount : number` count
- **Return**:
    * Promise

#### getAccountBalance
Get account balance

- **Return**:
    * Promise

#### getLatestBlock
Get last block

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
    * `index : number` page index
    * `pageCount : number` count
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
    * `index : number` page index
    * `pageCount : number` count
    * `totalNum? : number`  total
- **Return**:
    * Promise
    

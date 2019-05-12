# AddrAccount

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-addraccount --save
```

```bash tab:yarn
yarn add @vite/vitejs-addraccount
```
:::

## Import

:::demo
```javascript tab:ES6
import { addrAccount } from '@vite/vitejs';
// Or
import addrAccount from '@vite/vitejs-addraccount';
```

```javascript tab:require
const { addrAccount } = require('@vite/vitejs-addraccount');
```
:::

## Constructor

- **Constructor Parameters**: 
    * `__namedParameters: object`
        - `address : HexAddr` vite account address
        - `client : Client` client instance

- **Example**:    
```javascript
import WS_RPC from '@vite/vitejs-ws';
import { client, addrAccount, privToAddr } from '@vite/vitejs';

let provider = new WS_RPC("ws://example.com");
let myClient = new client(provider);

let myAddrAccount = new addrAccount({
    client: myClient,
    adrress: privToAddr.newHexAddr().hexAddr
});

myAddrAccount.getBalance().then((result) => {
    console.log(result);
}).catch((err) => {
    console.warn(err);
});
```

## Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| address | string | hex address |
| realAddress | string | real address |

## Methods

### getBalance
Get balance, including unreceived tokens. *[client.getBalance](../client/client.md)*

- **Return**
    * Promise<`{ balance, onroad }`>

### sendAccountBlock
*[client.sendRawTx](../client/client.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountBlock : AccountBlock` Signed accountblock

- **Return**:
    * Promise<`AccountBlock`>

### getTxList
*[client.getTxList](../client/client.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `index: number` 
        - `pageCount?: number` Default 50
        - `totalNum?: number` Total transaction amount. If `totalNum === 0`, return Object`{ totalNum: 0, list: []  }`; If `!totalNum`, auto get totalNum with Gvite-RPC api `ledger_getAccountByAccAddr`.

- **Return**:
    * Promise<`{ list, totalNum }`>

### callOffChainContract
Query contract status. *[client.callOffChainContract](../client/client.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `abi`
        - `offChainCode : Hex` 合约代码

- **Return**:
    * Promise<`result`>

### getOnroad
Get unreceived tokens. *Gvite-RPC [onroad_getOnroadInfoByAddress](../../rpc/onroad.md)*

- **Return**:
    * Promise

### getOnroadBlocks
Get unreceived account block list. *Gvite-RPC [onroad_getOnroadBlocksByAddress](../../rpc/onroad.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `index : number` page index
        - `pageCount : number` count

- **Return**:
    * Promise

### getBlocks
Get account block list. *Gvite-RPC [ledger_getBlocksByAccAddr](../../rpc/ledger.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `index : number` page index
        - `pageCount : number` count

- **Return**:
    * Promise

### getAccountBalance
Get account balance. *Gvite-RPC [ledger_getAccountByAccAddr](../../rpc/ledger.md)*

- **Return**:
    * Promise

### getLatestBlock
Get last block. *Gvite-RPC [ledger_getLatestBlock](../../rpc/ledger.md)*

- **Return**:
    * Promise

### getBlockByHeight
*Gvite-RPC [ledger_getBlockByHeight](../../rpc/ledger.md)*

- **Parameters** 
    * `height`

- **Return**:
    * Promise

### getBlocksByHash
*Gvite-RPC [ledger_getBlocksByHash](../../rpc/ledger.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `hash`
        - `num`

- **Return**:
    * Promise

### getBlocksByHashInToken
*Gvite-RPC [ledger_getBlocksByHashInToken](../../rpc/ledger.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `hash`
        - `tokenId`
        - `num`

- **Return**:
    * Promise

### getPledgeQuota
*Gvite-RPC [pledge_getPledgeQuota](../../rpc/pledge.md)*

- **Return**:
    * Promise

### getPledgeList
*Gvite-RPC [pledge_getPledgeList](../../rpc/pledge.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `index : number` page index
        - `pageCount : number` count

- **Return**:
    * Promise

### getRegistrationList
*Gvite-RPC [register_getPledgeList](../../rpc/consensus.md)*

- **Return**:
    * Promise

### getVoteInfo
*Gvite-RPC [vote_getVoteInfo](../../rpc/consensus.md)*

- **Return**:
    * Promise

### getTokenInfoListByOwner
*Gvite-RPC [mintage_getTokenInfoListByOwner](../../rpc/mintage.md)*

- **Return**:
    * Promise

## getBlock

This part will automatically wrap the method in [client.builtinTxBlock](../client/builtinTxBlock.md) (For quickly calling the methods of [client.builtinTxBlock](../client/builtinTxBlock.md) )

### How to achieve

1. `accountBlock.accountAddress = this.address`
2. Get the legal accountBlock by `client.builtinTxBlock[methodName]`

**Code**
```javascript
for (const key in this._client.builtinTxBlock) {
    if (key === '_client') {
        continue;
    }

    this.getBlock[key] = (block, requestType?) => {
        block.accountAddress = this.address;
        return this._client.builtinTxBlock[key](block, requestType);
    };
}
```

### How to invoke

- **Parameters** 
    * `accountBlock` accountBlock（Can have no accountAddress field）    
    * `requestType?: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**
    * Promise<`AccountBlock`>

- **Example**
```javascript
// ....

myAddrAccount.getBlock.SBPreg({ 
    accountBlock, requestType 
}).then((result) => {
    console.log(result);
}).catch(err => {
    console.warn(err);
});
```

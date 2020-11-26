# AddrAccount

Mainly used to quickly query the account status. eg: account balance / transactions / voting info ...

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
    address: 'your address'    // Eg: vite_69f3bdb5cdcfa145ae6cc42593a89088ff3dac587eb692d689
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

- **Example**
```javascript
// ...

myAddrAccount.getBalance().then((result) => {
    console.log(result);
}).catch((err) => {
    console.warn(err);
});
```

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

- **Example**
```javascript
// ...

myAddrAccount.getTxList({
    index: 0,
    pageCount: 50
}).then((data) => {
    let txList = data.list || [];
    console.log(txList);
});
```

### callOffChainContract
Query contract status. *[client.callOffChainContract](../client/client.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `abi`
        - `offChainCode : Hex` 合约代码
        - `params: Array`

- **Return**:
    * Promise<`result`>

### getOnroad
Get unreceived tokens. *Gvite-RPC [onroad_getOnroadInfoByAddress](../../rpcv1/onroad.md)*

- **Return**:
    * Promise

### getOnroadBlocks
Get unreceived account block list. *Gvite-RPC [onroad_getOnroadBlocksByAddress](../../rpcv1/onroad.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `index : number` page index
        - `pageCount : number` count

- **Return**:
    * Promise

- **Example**
```javascript
// ...

myAddrAccount.getOnroadBlocks({
    index: 0,
    pageCount: 10
}).then((onroad) => {
    console.log(onroad);
});
``` 

### getBlocks
Get account block list. *Gvite-RPC [ledger_getBlocksByAccAddr](../../rpcv1/ledger.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `index : number` page index
        - `pageCount : number` count

- **Return**:
    * Promise

### getAccountBalance
Get account balance. *Gvite-RPC [ledger_getAccountByAccAddr](../../rpcv1/ledger.md)*

- **Return**:
    * Promise

### getLatestBlock
Get last block. *Gvite-RPC [ledger_getLatestBlock](../../rpcv1/ledger.md)*

- **Return**:
    * Promise

### getBlockByHeight
*Gvite-RPC [ledger_getBlockByHeight](../../rpcv1/ledger.md)*

- **Parameters** 
    * `height`

- **Return**:
    * Promise

### getBlocksByHash
*Gvite-RPC [ledger_getBlocksByHash](../../rpcv1/ledger.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `hash`
        - `num`

- **Return**:
    * Promise

### getBlocksByHashInToken
*Gvite-RPC [ledger_getBlocksByHashInToken](../../rpcv1/ledger.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `hash`
        - `tokenId`
        - `num`

- **Return**:
    * Promise

### getPledgeQuota
*Gvite-RPC [pledge_getPledgeQuota](../../rpcv1/pledge.md)*

- **Return**:
    * Promise

- **Example**
```javascript
// ...

myAddrAccount.getPledgeQuota().then((pledgeQuota) => {
    console.log(pledgeQuota);
});
```

### getPledgeList
*Gvite-RPC [pledge_getPledgeList](../../rpcv1/pledge.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `index : number` page index
        - `pageCount : number` count

- **Return**:
    * Promise

### getRegistrationList
*Gvite-RPC [register_getPledgeList](../../rpcv1/consensus.md)*

- **Return**:
    * Promise

- **Example**
```javascript
// ...

myAddrAccount.getRegistrationList().then((list) => {
    console.log(list);
});
```

### getVoteInfo
*Gvite-RPC [vote_getVoteInfo](../../rpcv1/consensus.md)*

- **Return**:
    * Promise

- **Example**
```javascript
// ...

myAddrAccount.getVoteInfo().then((voteInfo) => {
    console.log(voteInfo);
});
```

### getTokenInfoListByOwner
*Gvite-RPC [mintage_getTokenInfoListByOwner](../../rpcv1/mintage.md)*

- **Return**:
    * Promise

## getBlock

This part will automatically wrap the method in [client.builtinTxBlock](../client/builtinTxBlock.md) (For quickly calling the methods of [client.builtinTxBlock](../client/builtinTxBlock.md) )

### How to achieve

1. `accountBlock.accountAddress = this.address`
2. Get the legal accountBlock by `client.builtinTxBlock[methodName]`

**Code**
```typescript
for (const key in this._client.builtinTxBlock) {
    if (key === '_client') {
        continue;
    }

    this.getBlock[key] = (block, requestType?) => {
        block = block || {};
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
    nodeName: 'TEST_NODE',
    toAddress: 'your address',
    amount: '100000000000000000000000',
    tokenId: Vite_TokenId,
    height, 
    prevHash
}).then((block) => {
    console.log(block);
}).catch(err => {
    console.warn(err);
});
```

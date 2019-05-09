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
Get balance (including unreceived tokens)

- **Return**
    * Promise<`{ balance, onroad }`>

### sendAccountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountBlock : AccountBlock` Signed accountblock

- **Return**:
    * Promise<`AccountBlock`>

### getTxList

- **Parameters** 
    * `__namedParameters: object`
        - `index: number` 
        - `pageCount?: number` Default 50
        - `totalNum?: number` Total transaction amount. If `totalNum === 0`, return Object`{ totalNum: 0, list: []  }`; If `!totalNum`, auto get totalNum with Gvite-RPC api `ledger_getAccountByAccAddr`.

- **Return**:
    * Promise<`{ list, totalNum }`>

### callOffChainContract
查询合约状态

- **Parameters** 
    * `__namedParameters: object`
        - `abi`
        - `offChainCode : Hex` 合约代码

- **Return**:
    * Promise<`result`>

### getOnroad
Get unreceived tokens

- **Return**:
    * Promise

### getOnroadBlocks
Get unreceived account block list

- **Parameters** 
    * `__namedParameters: object`
        - `index : number` page index
        - `pageCount : number` count

- **Return**:
    * Promise

### getBlocks
Get account block list

- **Parameters** 
    * `__namedParameters: object`
        - `index : number` page index
        - `pageCount : number` count

- **Return**:
    * Promise

### getAccountBalance
Get account balance

- **Return**:
    * Promise

### getLatestBlock
Get last block

- **Return**:
    * Promise

### getBlockByHeight

- **Return**:
    * Promise

### getBlocksByHash

- **Parameters** 
    * `__namedParameters: object`
        - `hash`
        - `num`

- **Return**:
    * Promise

### getBlocksByHashInToken

- **Parameters** 
    * `__namedParameters: object`
        - `hash`
        - `tokenId`
        - `num`

- **Return**:
    * Promise

### getPledgeQuota

- **Return**:
    * Promise

### getPledgeList

- **Parameters** 
    * `__namedParameters: object`
        - `index : number` page index
        - `pageCount : number` count

- **Return**:
    * Promise

### getRegistrationList

- **Return**:
    * Promise

### getVoteInfo

- **Return**:
    * Promise

### getTokenInfoListByOwner

- **Return**:
    * Promise

## getBlock

getBlock封装了`client.builtinTxBlock`模块下的方法（用于快速调用`client.builtinTxBlock`模块的方法）

### How to achieve

1. `accountBlock.accountAddress = this.address`
2. 通过 `client.builtinTxBlock[methodName]` 获取到合法块

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
    * `accountBlock` accountBlock（可以不包含accountAddress）    
    * `requestType?: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

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

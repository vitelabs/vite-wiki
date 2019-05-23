# AddrAccount
主要用于快速查询账户状态，如：账户余额、交易列表、投票信息等。

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-addraccount --save
```

```bash tab:yarn
yarn add @vite/vitejs-addraccount
```
:::

## 引入

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
        - `address : HexAddr` vite账户地址
        - `client : Client` client实例

- **Example**: 
```javascript
import WS_RPC from '@vite/vitejs-ws';
import { client, addrAccount, privToAddr } from '@vite/vitejs';

let provider = new WS_RPC("ws://example.com");
let myClient = new client(provider);

let myAddrAccount = new addrAccount({
    client: myClient,
    adrress: privToAddr.newHexAddr().hexAddr    // vite_69f3bdb5cdcfa145ae6cc42593a89088ff3dac587eb692d689
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
| address | string | hex地址 |
| realAddress | string | 真实地址 |

## Methods

### getBalance
获取余额, 包含在途。 *[client.getBalance](../client/client.md)*

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
[client.sendRawTx](../client/client.md)

- **Parameters** 
    * `__namedParameters: object`
        - `accountBlock : AccountBlock` 签名后的accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### getTxList
*[client.getTxList](../client/client.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `index: number` 
        - `pageCount?: number` Default 50
        - `totalNum?: number` 总交易量. 如果 `totalNum === 0`, 返回 Object`{ totalNum: 0, list: []  }`; 如果 `!totalNum`, 自动请求 Gvite-RPC 接口 `ledger_getAccountByAccAddr` 获取totalNum.
        
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
查询合约状态。 *[client.callOffChainContract](../client/client.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `abi`
        - `offChainCode : Hex` 合约代码

- **Return**:
    * Promise<`result`>

### getOnroad
获取在途。 *Gvite-RPC [onroad_getOnroadInfoByAddress](../../rpc/onroad.md)*

- **Return**:
    * Promise

### getOnroadBlocks
获取在途账户块列表。 *Gvite-RPC [onroad_getOnroadBlocksByAddress](../../rpc/onroad.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `index : number` 页码
        - `pageCount : number` 个数

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
获取账户块列表。 *Gvite-RPC [ledger_getBlocksByAccAddr](../../rpc/ledger.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `index : number` 页码
        - `pageCount : number` 个数

- **Return**:
    * Promise

### getAccountBalance
获取账户余额。 *Gvite-RPC [ledger_getAccountByAccAddr](../../rpc/ledger.md)*

- **Return**:
    * Promise

### getLatestBlock
获取最新账户块。 *Gvite-RPC [ledger_getLatestBlock](../../rpc/ledger.md)*

- **Parameters** 
    * `height`

- **Return**:
    * Promise

### getBlockByHeight
*Gvite-RPC [ledger_getBlockByHeight](../../rpc/ledger.md)*

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

- **Example**
```javascript
// ...

myAddrAccount.getPledgeQuota().then((pledgeQuota) => {
    console.log(pledgeQuota);
});
```

### getPledgeList
*Gvite-RPC [pledge_getPledgeList](../../rpc/pledge.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `index : number` 页码
        - `pageCount : number` 个数

- **Return**:
    * Promise

### getRegistrationList
*Gvite-RPC [register_getPledgeList](../../rpc/consensus.md)*

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
*Gvite-RPC [vote_getVoteInfo](../../rpc/consensus.md)*

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
*Gvite-RPC [mintage_getTokenInfoListByOwner](../../rpc/mintage.md)*

- **Return**:
    * Promise

## getBlock

getBlock封装了[client.builtinTxBlock](../client/builtinTxBlock.md)模块下的方法（用于快速调用[client.builtinTxBlock](../client/builtinTxBlock.md)模块的方法）

### 实现方式

1. `accountBlock.accountAddress = this.address`
2. 通过 `client.builtinTxBlock[methodName]` 获取到合法块

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

### 调用方式

- **Parameters** 
    * `accountBlock` accountBlock（可以不包含accountAddress）    
    * `requestType?: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

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

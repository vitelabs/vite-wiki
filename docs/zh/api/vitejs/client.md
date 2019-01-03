---
sidebarDepth: 1
---
# 客户端

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip abstract
包括一些内置的快捷调用方式
:::

## 注意 
1. 以下buildinTxBlock中的方法，当requestType为async时，非必填参数皆可不填
2. methods中的方法都可以直接使用client.namespace.funcName的方式调用，见constructor/example

## contructor

- **constructor params**
    - `provider : Provider 实例`
    - `firstConnectCb : function` : 首次连接后的回调函数

- **example**

```javascript

import provider from '@vite/vitejs/dist/es5/provider/WS';
import { client } from '@vite/vitejs';

const WS_RPC = new provider("https://example.com");
const myClient = new Client(WS_RPC, function(_myclient) {
    const block = _myclient.buildinTxBlock.getAccountBlock.sync(
        //...
    );
    _myclient.onroad.getOnroadBlocksByAddress.then((data) => {
        console.log(data);
    });
});

```

## setProvider provider, abort)
设置provider

- **Parameters**
    * `provider : Provider实例`
    * `abort : boolean` 是否打断原有provider的残余请求

## request (Methods, ...args)
为this.provider.request的快捷引用

## notification (Methods, ...args)
为this.provider.notification的快捷引用

## batch (RPCrequest[])
为this.provider.batch的快捷引用

## buildinTxBlock

### getAccountBlock.sync
同 utils.accountBlock.getAccountBlock

### asyncAccountBlock | getAccountBlock.async (__namedParameters: object)
异步获取accountBlock

- **Parameters** __namedParameters
    * `blockType: BlockType`
    * `accountAddress: Address`
    * `fromBlockHash?: Hex`
    * `data?: Base64`
    * `message?: string`
    * `toAddress?: Address`
    * `tokenId?: TokenId`
    * `amount?: BigInt`
    * `prevHash?: Hex`
    * `height?: Uint64`
    * `snapshotHash?: Hex`
    * `nonce?: Base64`

- **Return**:
    * Promise<`AccountBlock`>

### SBPreg
获取注册SBP的accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `nodeName: string`
        * `toAddress: Address`
        * `tokenId: TokenId`
        * `amount: BigInt`
        * `Gid?: string`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` 规范化accountBlock时，使用同步还是异步方式
- **Return**:
    * Promise<`AccountBlock`>

### updateReg
获取更新注册SBP的accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `nodeName: string`
        * `toAddress: Address`
        * `tokenId: TokenId`
        * `Gid?: string`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` 规范化accountBlock时，使用同步还是异步方式
- **Return**:
    * Promise<`AccountBlock`>

### revokeReg
获取取消注册SBP的accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `nodeName: string`
        * `tokenId: TokenId`
        * `Gid?: string`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` 规范化accountBlock时，使用同步还是异步方式
- **Return**:
    * Promise<`AccountBlock`>

### retrieveReward
获取奖励的accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `nodeName: string`
        * `toAddress: Address`
        * `tokenId: TokenId`
        * `Gid?: string`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` 规范化accountBlock时，使用同步还是异步方式
- **Return**:
    * Promise<`AccountBlock`>

### voting
获取投票的accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `nodeName: string`
        * `tokenId: TokenId`
        * `Gid?: string`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` 规范化accountBlock时，使用同步还是异步方式
- **Return**:
    * Promise<`AccountBlock`>

### revokeVoting
获取撤销投票的accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `tokenId: TokenId`
        * `Gid?: string`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` 规范化accountBlock时，使用同步还是异步方式
- **Return**:
    * Promise<`AccountBlock`>

### getQuota
获取配额的accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `toAddress: Address`
        * `tokenId: TokenId`
        * `amount: BigInt`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` 规范化accountBlock时，使用同步还是异步方式
- **Return**:
    * Promise<`AccountBlock`>

### withdrawalOfQuota
获取取消配额的accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `toAddress: Address`
        * `tokenId: TokenId`
        * `amount: BigInt`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` 规范化accountBlock时，使用同步还是异步方式
- **Return**:
    * Promise<`AccountBlock`>

### sendTx.sync
同 utils.accountBlock.getSendTxBlock

### asyncSendTx | sendTx.async (__namedParameters: object)
获取发送交易的accountBlock

- **Parameters** 
    __namedParameters
    * `accountAddress: Address`
    * `toAddress: Address`
    * `tokenId: TokenId`
    * `amount: BigInt`
    * `message?: string`
    * `prevHash?: Hex`
    * `height?: Uint64`
    * `snapshotHash?: Hex`
- **Return**:
    * Promise<`AccountBlock`>

### receiveTx.sync
同 utils.accountBlock.getReceiveTxBlock

### asyncReceiveTx | receiveTx.async (__namedParameters: object)
获取接收交易的accountBlock

- **Parameters** 
    __namedParameters
    * `accountAddress: Address`
    * `fromBlockHash: Hex`
    * `prevHash?: Hex`
    * `height?: Uint64`
    * `snapshotHash?: Hex`
- **Return**:
    * Promise<`AccountBlock`>

## buildinLedger

### getBalance
获取余额

- **Parameters** 
    * `addr: Address`
- **Return**:
    * Promise<`{ balance, onroad }`>

### getTxList (__namedParameters: object)
获取交易列表

- **Parameters** 
    __namedParameters
    * `addr: Address`
    * `index: number` 
    * `pageCount?: number` default 50
- **Return**:
    * Promise<`{ list, totalNum }`>

### sendRawTx
发送交易

- **Parameters** 
    * `accountBlock: AccountBlock` 规范化后的accountBlock (无需签名)
    * `privateKey` 私钥
- **Return**:
    * Promise<`AccountBlock`>

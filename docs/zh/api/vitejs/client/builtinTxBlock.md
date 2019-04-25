# BuiltinTxBlock

## 调用方式

:::warning Notice
`client.builtinTxBlock`中的方法，当`requestType`为`async`时，非必填参数皆可不填，默认`requestType = async`. 
:::

```javascript
// ...

const block = myclient.builtinTxBlock.getAccountBlock(/** ... */);
```

## 类型说明

```typescript
export declare type AccountBlock = {
    accountAddress: Address;
    blockType: BlockType;
    prevHash: Hex;
    height: Uint64;
    hash: Hex;
    signature: Base64;
    publicKey: Base64;
    fee?: BigInt;
    fromBlockHash?: Hex;
    toAddress?: Address;
    tokenId?: TokenId;
    amount?: BigInt;
    data?: Base64;
    nonce?: Base64;
    logHash?: Hex;
}
```

## 通用

### getAccountBlock
同 accountBlock.getAccountBlock

### asyncAccountBlock
异步获取accountBlock

- **Parameters** 
    * `__namedParameters: Object`
        - `blockType: BlockType`
        - `accountAddress: Address`
        - `fromBlockHash?: Hex`
        - `data?: Base64`
        - `message?: string`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `amount?: BigInt`
        - `fee?: BigInt`
        - `prevHash?: Hex`
        - `height?: Uint64`
        - `nonce?: Base64`

- **Return**:
    * Promise<`AccountBlock`>

### pow
获取运行PoW成功后的AccountBlock

- **Parameters** 
    * `__namedParameters: Object`
        - `blockType: BlockType`
        - `accountAddress: Address`
        - `fromBlockHash?: Hex`
        - `data?: Base64`
        - `message?: string`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `amount?: BigInt`
        - `fee?: BigInt`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `difficulty` PoW-Difficulty

- **Return**:
    * Promise<`AccountBlock`>

### autoPow
当没有配额时，自动运行PoW获取accountBlock。

- **Parameters** 
    * `__namedParameters: Object`
        - `blockType: BlockType`
        - `accountAddress: Address`
        - `fromBlockHash?: Hex`
        - `data?: Base64`
        - `message?: string`
        - `toAddress?: Address`
        - `tokenId?: TokenId`
        - `amount?: BigInt`
        - `fee?: BigInt`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `usePledgeQuota : Boolean` 是否优先使用配额

- **Return**:
    * Promise<`{ accountBlock, difficulty, quota }`>

### getSendTxBlock
同 accountBlock.getSendTxBlock

### asyncSendTx
获取发送交易的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `toAddress: Address`
        - `tokenId: TokenId`
        - `amount: BigInt`
        - `message?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
- **Return**:
    * Promise<`AccountBlock`>

### getReceiveTxBlock
同 accountBlock.getReceiveTxBlock

### asyncReceiveTx
获取接收交易的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `fromBlockHash: Hex`
        - `prevHash?: Hex`
        - `height?: Uint64`
- **Return**:
    * Promise<`AccountBlock`>

## Contract

### createContract
获取创建合约的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId`
        - `amount: BigInt`
        - `fee: BigInt,`
        - `hexCode: Hex`
        - `abi: string`
        - `confirmTimes: number`
        - `params?: stirng`
        - `height?: Uint64`
        - `prevHash?: Hex`
    * `requestType?: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### callContract
获取调用合约的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `toAddress: Address`
        - `abi: string`
        - `tokenId: TokenId` Default Vite_TokenId
        - `amount: BigInt`
        - `methodName: stirng`
        - `fee?: BigInt`
        - `params?: stirng`
        - `height?: Uint64`
        - `prevHash?: Hex`
    * `requestType?: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

## SBP

### SBPreg
获取注册SBP的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `nodeName: string`
        - `toAddress: Address`
        - `tokenId: TokenId`
        - `amount: BigInt`
        - `Gid?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### updateReg
获取更新注册SBP的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `nodeName: string`
        - `toAddress: Address`
        - `tokenId: TokenId`
        - `Gid?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### revokeReg
获取取消注册SBP的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `nodeName: string`
        - `tokenId: TokenId`
        - `Gid?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### retrieveReward
获取奖励的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `nodeName: string`
        - `toAddress: Address`
        - `tokenId: TokenId`
        - `Gid?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>


## Vote

### voting
获取投票的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `nodeName: string`
        - `tokenId: TokenId`
        - `Gid?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### revokeVoting
获取撤销投票的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` Default Vite_TokenId
        - `Gid?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

## Pledge

### getQuota
获取配额的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `toAddress: Address`
        - `tokenId: TokenId`
        - `amount: BigInt`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### withdrawalOfQuota
获取取消配额的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `toAddress: Address`
        - `tokenId: TokenId`
        - `amount: BigInt`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式
    
- **Return**:
    * Promise<`AccountBlock`>

## Mintage

### mintage
获取铸币accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenName: string`
        - `decimals: uint8`
        - `totalSupply: BigInt`
        - `tokenSymbol: string`
        - `isReIssuable: boolean`
        - `maxSupply: Uint256`
        - `ownerBurnOnly: boolean`
        - `height?: Uint64`
        - `prevHash?: Hex`
        - `feeType: string<'burn' | 'stake'>` Default burn.
    * `requestType: string<'async' | 'sync'>` Default async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### mintageIssue
获取增发代币的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` 代币id
        - `amount: uint64` 增发数量
        - `beneficial: Address` 增发代币接收地址
        - `height?: Uint64`
        - `prevHash?: Hex`
    * `requestType: string<'async' | 'sync'>` Default async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### mintageCancelPledge
取消代币抵押的accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `tokenId: TokenId` 代币id
        * `height?: Uint64`
        * `prevHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Default async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### mintageBurn
获取销毁代币的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` 销毁的代币id
        - `amount: uint64` 销毁的代币数量
        - `height?: Uint64`
        - `prevHash?: Hex`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### changeTransferOwner
获取修改所有者的accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `ownerAddress: Address`
        - `tokenId: TokenId`
        - `height?: Uint64`
        - `prevHash?: Hex`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### changeTokenType
获取修改代币类型的accountBlock, 将可增发代币修改为不可增发

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId`
        - `height?: Uint64`
        - `prevHash?: Hex`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

## DEX

### dexFundUserDeposit
ViteX充值

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId`
        - `amount: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### dexFundUserWithdraw
ViteX提现

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId`
        - `amount: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### dexTradeCancelOrder
ViteX撤单

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `orderId: string`
        - `tradeToken: TokenId`
        - `side: <0 | 1>` buy: 0; sell: 1
        - `quoteToken: TokenId`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### dexFundNewOrder
ViteX挂单

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tradeToken: TokenId`
        - `side: <0 | 1>` buy: 0; sell: 1
        - `quoteToken: TokenId`
        - `price: string`
        - `quantity: string`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### dexFundNewMarket
ViteX上币

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` Default Vite_TokenId
        - `amount: Uint64`
        - `quoteToken: TokenId`
        - `tradeToken: TokenId`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

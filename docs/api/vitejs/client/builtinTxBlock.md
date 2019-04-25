# BuiltinTxBlock

## How to invoke

:::warning Notice
You can leave out those optional parameters in Methods of `client.builtinTxBlock` as below when `requestType` equals to `async`. Default`requestType = async`
:::

```javascript
// ...

const block = myclient.builtinTxBlock.getAccountBlock(/** ... */);
```

## Type Description

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

## Common

### getAccountBlock
Same as `accountBlock.getAccountBlock`

### asyncAccountBlock
Get accountBlock asynchronously

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
Same as `accountBlock.getSendTxBlock`

### asyncSendTx
Get accountBlock of sending transaction

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
Same as `accountBlock.getReceiveTxBlock`

### asyncReceiveTx
Get accountBlock of receiving transaction

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
Get accountBlock of creating contract

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
    * `requestType?: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### callContract
Get accountBlock of calling contract

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
    - `requestType?: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

## SBP

### SBPreg
Get accountBlock of SBP registration

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
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock.

- **Return**:
    * Promise<`AccountBlock`>

### updateReg
Get accountBlock of updating SBP registration

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `nodeName: string`
        - `toAddress: Address`
        - `tokenId: TokenId`
        - `Gid?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock.

- **Return**:
    * Promise<`AccountBlock`>

### revokeReg
Get accountBlock of revoking SBP registration

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `nodeName: string`
        - `tokenId: TokenId`
        - `Gid?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
    - `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock.

- **Return**:
    * Promise<`AccountBlock`>

### retrieveReward
Get accountBlock of rewards

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `nodeName: string`
        - `toAddress: Address`
        - `tokenId: TokenId`
        - `Gid?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock.

- **Return**:
    * Promise<`AccountBlock`>

## Vote

### voting
Get accountBlock of voting

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `nodeName: string`
        - `tokenId: TokenId`
        - `Gid?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
    - `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock.

- **Return**:
    * Promise<`AccountBlock`>

### revokeVoting
Get accountBlock when revoking vote

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` Default Vite_TokenId
        - `Gid?: string`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock.

- **Return**:
    * Promise<`AccountBlock`>

## Pledge

### getQuota
Get accountBlock of quota

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `toAddress: Address`
        - `tokenId: TokenId`
        - `amount: BigInt`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock.

- **Return**:
    * Promise<`AccountBlock`>

### withdrawalOfQuota
Get accountBlock of withdraw quota

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `toAddress: Address`
        - `tokenId: TokenId`
        - `amount: BigInt`
        - `prevHash?: Hex`
        - `height?: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock.

- **Return**:
    * Promise<`AccountBlock`>


## Mintage

### mintage
Get accountBlock of token issuance

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
    * `requestType: string<'async' | 'sync'>` Default async. Options (sync or async) when reformatting accountBlock.

- **Return**:
    * Promise<`AccountBlock`>

### mintageCancelPledge
Cancel token staked accountBlock

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` Token id
        - `height?: Uint64`
        - `prevHash?: Hex`
    * `requestType: string<'async' | 'sync'>` Default async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### mintageIssue
Get accountBlock of additional token issuance

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` Token id
        - `amount: uint64` Additional amount
        - `beneficial: Address` Additional token receiving address
        - `height?: Uint64`
        - `prevHash?: Hex`
    * `requestType: string<'async' | 'sync'>` Default async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### mintageBurn
Get accountBlock of token destruction

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` Destroyed token id
        - `amount: uint64` Destroyed token amount
        - `height?: Uint64`
        - `prevHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock.

- **Return**:
    * Promise<`AccountBlock`>

### changeTransferOwner
Get account block of changed transfer owner

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `ownerAddress: Address`
        - `tokenId: TokenId`
        - `height?: Uint64`
        - `prevHash?: Hex`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### changeTokenType
Get accountBlock of changing token type, change token type from enable additional token issuance to disable

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId`
        - `height?: Uint64`
        - `prevHash?: Hex`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

## DEX

### dexFundUserDeposit
ViteX Deposit

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId`
        - `amount: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundUserWithdraw
ViteX Withdrawal

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId`
        - `amount: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexTradeCancelOrder
ViteX Revoking Orders

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `orderId: string`
        - `tradeToken: TokenId`
        - `side: <0 | 1>` buy: 0; sell: 1
        - `quoteToken: TokenId`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundNewOrder
ViteX Creating Orders

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tradeToken: TokenId`
        - `side: <0 | 1>` buy: 0; sell: 1
        - `quoteToken: TokenId`
        - `price: string`
        - `quantity: string`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundNewMarket
ViteX Token Listing

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` Default Vite_TokenId
        - `amount: Uint64`
        - `quoteToken: TokenId`
        - `tradeToken: TokenId`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

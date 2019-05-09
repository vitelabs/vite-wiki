# BuiltinTxBlock

Gvite-RPC [`ledger_getLatestBlock`](../../rpc/ledger.md)

```javascript
// For example
// ...
accountBlock.prevHash = latestBlock ? latestBlock.hash : Default_Hash;
accountBlock.height = latestBlock ? latestBlock.height + 1 : 1;
```

## How to invoke

:::warning Notice
You can leave out those optional parameters in Methods of `client.builtinTxBlock` as below when `requestType` equals to `async`. Default`requestType = async`
:::

```javascript
// ...

const block = myclient.builtinTxBlock.getAccountBlock(/** ... */);
```

## Common

### getAccountBlock
[Same as accountBlock.getAccountBlock](../tool/accountBlock.md)

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
Get the AccountBlock after running PoW successfully (Gvite-RPC [`pow_getPowNonce`](../../rpc/pow.md))

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
Automatically run PoW to get the accountBlock, when there is no quota (Gvite-RPC [`tx_calcPoWDifficulty`](../../rpc/tx.md) + [`pow_getPowNonce`](../../rpc/pow.md))

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
    * `usePledgeQuota : Boolean` Whether to use quotas preferentially

- **Return**:
    * Promise<`{ accountBlock, difficulty, quota }`>

### getSendTxBlock
[Same as accountBlock.getSendTxBlock](../tool/accountBlock.md)

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
[Same as accountBlock.getReceiveTxBlock](../tool/accountBlock.md)

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
Get accountBlock of creating contract (Gvite-RPC [`contract_getCreateContractToAddress`](../../rpc/contract.md))

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId`
        - `amount: BigInt`
        - `fee: BigInt,`
        - `hexCode: Hex`
        - `abi: string`
        - `confirmTimes: number`
        - `times: number`
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
Get accountBlock of SBP registration (callContract [constant.Register_Abi](../constant/constant.md))

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
Get accountBlock of updating SBP registration (callContract [constant.UpdateRegistration_Abi](../constant/constant.md))

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
Get accountBlock of revoking SBP registration (callContract [constant.CancelRegister_Abi](../constant/constant.md))

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
Get accountBlock of rewards (callContract [constant.Reward_Abi](../constant/constant.md))

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
Get accountBlock of voting (callContract [constant.Vote_Abi](../constant/constant.md))

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
Get accountBlock when revoking vote (callContract [constant.CancelVote_Abi](../constant/constant.md))

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
Get accountBlock of quota (callContract [constant.Pledge_Abi](../constant/constant.md))

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
Get accountBlock of withdraw quota (callContract [constant.CancelPledge_Abi](../constant/constant.md))

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
Get accountBlock of token issuance (callContract [constant.Mint_Abi](../constant/constant.md))

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
Cancel token staked accountBlock (callContract [constant.CancelMintPledge_Abi](../constant/constant.md))

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
Get accountBlock of additional token issuance (callContract [constant.Issue_Abi](../constant/constant.md))

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
Get accountBlock of token destruction (callContract [constant.Burn_Abi](../constant/constant.md))

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
Get account block of changed transfer owner (callContract [constant.TransferOwner_Abi](../constant/constant.md))

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
Get accountBlock of changing token type, change token type from enable additional token issuance to disable (callContract [constant.ChangeTokenType_Abi](../constant/constant.md))

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
ViteX Deposit (callContract [constant.DexFundUserDeposit_Abi](../constant/constant.md))

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId`
        - `amount: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundUserWithdraw
ViteX Withdrawal (callContract [constant.DexFundUserWithdraw_Abi](../constant/constant.md))

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId`
        - `amount: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexTradeCancelOrder
ViteX Revoking Orders (callContract [constant.DexTradeCancelOrder_Abi](../constant/constant.md))

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
ViteX Creating Orders (callContract [constant.DexFundNewOrder_Abi](../constant/constant.md))

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
ViteX Token Listing (callContract [constant.DexFundNewMarket_Abi](../constant/constant.md))

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

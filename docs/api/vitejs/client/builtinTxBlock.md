# BuiltinTxBlock

Gvite-RPC [ledger_getLatestBlock](../../rpc/ledger.md)

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
Get the AccountBlock after running PoW successfully. *Gvite-RPC [pow_getPowNonce](../../rpc/pow.md)*

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
Automatically run PoW to get the accountBlock, when there is no quota. *Gvite-RPC [tx_calcPoWDifficulty](../../rpc/tx.md) + [pow_getPowNonce](../../rpc/pow.md)*

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
Get accountBlock of creating contract. *Gvite-RPC [contract_getCreateContractToAddress](../../rpc/contract.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` Default: Vite_TokenId
        - `amount: BigInt` Default: '0'
        - `fee: BigInt,` Default: '10000000000000000000'
        - `hexCode: Hex`
        - `abi: string`
        - `confirmTime: Uint8` Default: '0'
        - `quotaRatio: Uint8` Default: '10'
        - `seedCount: Uint8` Default: '0'
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
Get accountBlock of SBP registration. *this.callContract [constant.Register_Abi](../constant/constant.md)*

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
Get accountBlock of updating SBP registration. *this.callContract [constant.UpdateRegistration_Abi](../constant/constant.md)*

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
Get accountBlock of revoking SBP registration. *this.callContract [constant.CancelRegister_Abi](../constant/constant.md)*

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
Get accountBlock of rewards. *this.callContract [constant.Reward_Abi](../constant/constant.md)*

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
Get accountBlock of voting. *this.callContract [constant.Vote_Abi](../constant/constant.md)*

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
Get accountBlock when revoking vote. *this.callContract [constant.CancelVote_Abi](../constant/constant.md)*

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
Get accountBlock of quota. *this.callContract [constant.Pledge_Abi](../constant/constant.md)*

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
Get accountBlock of withdraw quota. *this.callContract [constant.CancelPledge_Abi](../constant/constant.md)*

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
Get accountBlock of token issuance. *this.callContract [constant.Mint_Abi](../constant/constant.md)*

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
Cancel token staked accountBlock. *this.callContract [constant.CancelMintPledge_Abi](../constant/constant.md)*

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
Get accountBlock of additional token issuance. *this.callContract [constant.Issue_Abi](../constant/constant.md)*

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
Get accountBlock of token destruction. *this.callContract [constant.Burn_Abi](../constant/constant.md)*

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
Get account block of changed transfer owner. *this.callContract [constant.TransferOwner_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `newOwner: Address`
        - `tokenId: TokenId`
        - `height?: Uint64`
        - `prevHash?: Hex`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### changeTokenType
Get accountBlock of changing token type, change token type from enable additional token issuance to disable. *this.callContract [constant.ChangeTokenType_Abi](../constant/constant.md)*

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
ViteX Deposit. *this.callContract [constant.DexFundUserDeposit_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` Recharge currency
        - `amount: Uint64`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundUserWithdraw
ViteX Withdrawal. *this.callContract [constant.DexFundUserWithdraw_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` Withdrawal currency
        - `amount: Uint256`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexTradeCancelOrder
ViteX Revoking Orders. *this.callContract [constant.DexTradeCancelOrder_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `orderId: Bytes`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundNewOrder
ViteX Creating Orders. *this.callContract [constant.DexFundNewOrder_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tradeToken: TokenId`
        - `quoteToken: TokenId` Pricing currency / base currency
        - `side: Bool` buy: true; sell: false
        - `orderType: Uint32` Default 0. 0: Limit order 1: Market order[Not supported yet]
        - `price: String` The string representation of the decimal, the integer and fractional parts are up to 10 decimal places.
        - `quantity: Uint256`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundNewMarket
ViteX Token Listing. *this.callContract [constant.DexFundNewMarket_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `quoteToken: TokenId` New market trading currency
        - `tradeToken: TokenId` New market pricing currency
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundPledgeForVx
抵押挖矿。 *this.callContract [constant.DexFundPledgeForVx_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `actionType: Uint8` 操作类型. 1 抵押 2 解抵押
        - `amount: Uint256` 抵押金额 / 取回金额
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundPledgeForVip
Get/release vip qualification. (Staking 10,000 VITE for Becoming a VIP) *this.callContract [constant.DexFundPledgeForVip_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `actionType: Uint8` 1 Get VIP 2 Release VIP
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundBindInviteCode
Binds the invitation code. *this.callContract [constant.DexFundBindInviteCode_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address` 
        - `code: Uint32`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundNewInviter
New Inviter. *this.callContract [constant.DexFundNewInviter_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundTransferTokenOwner
Transfer the token owner. *this.callContract [constant.DexFundTransferTokenOwner_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId`
        - `owner: Address`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundMarketOwnerConfig
Transaction pair setting. *this.callContract [constant.DexFundMarketOwnerConfig_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `operationCode: Uint8` 1 Transfer Owner; 2 Setting takerFeeRate; 4 Setting makerFeeRate; 8 Stop trans. The corresponding code is added to support the simultaneous configuration of the above multiple items.
        - `tradeToken: TokenId` Required
        - `quoteToken: TokenId` Required
        - `takerFeeRate: Int32` Effective: operationCode & operationCode == 2; rate/100,000 = Actual rate
        - `makerFeeRate: Int32` Effective: operationCode & operationCode == 4; rate/100,000 = Actual rate
        - `stopMarket: Bool` Effective: operationCode & operationCode == 8; true: stop trans; false: open trans 
        - `owner: Address` Effective: operationCode & operationCode === 1
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

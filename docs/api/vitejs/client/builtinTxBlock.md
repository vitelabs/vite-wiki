# buildinTxBlock

## getAccountBlock.sync
Same as `utils.accountBlock.getAccountBlock`

## asyncAccountBlock | getAccountBlock.async
Get accountBlock asynchronously

- **Parameters** 
    __namedParameters: object
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

## SBPreg
Get accountBlock of SBP registration

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `nodeName: string`
        * `toAddress: Address`
        * `tokenId: TokenId`
        * `amount: BigInt`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock
- **Return**:
    * Promise<`AccountBlock`>

## updateReg
Get accountBlock of updating SBP registration

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `nodeName: string`
        * `toAddress: Address`
        * `tokenId: TokenId`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock
- **Return**:
    * Promise<`AccountBlock`>

## revokeReg
Get accountBlock of revoking SBP registration

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `nodeName: string`
        * `tokenId: TokenId`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock
- **Return**:
    * Promise<`AccountBlock`>

## retrieveReward
Get accountBlock of rewards

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `nodeName: string`
        * `toAddress: Address`
        * `tokenId: TokenId`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock
- **Return**:
    * Promise<`AccountBlock`>

## voting
Get accountBlock of voting

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `nodeName: string`
        * `tokenId: TokenId`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock
- **Return**:
    * Promise<`AccountBlock`>

## revokeVoting
Get accountBlock when revoking vote

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `tokenId: TokenId`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock
- **Return**:
    * Promise<`AccountBlock`>

## getQuota
Get accountBlock of quota

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `toAddress: Address`
        * `tokenId: TokenId`
        * `amount: BigInt`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock
- **Return**:
    * Promise<`AccountBlock`>

## withdrawalOfQuota
Get accountBlock of withdraw quota

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `toAddress: Address`
        * `tokenId: TokenId`
        * `amount: BigInt`
        * `prevHash?: Hex`
        * `height?: Uint64`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock
- **Return**:
    * Promise<`AccountBlock`>

## sendTx.sync
Same as `utils.accountBlock.getSendTxBlock`

## asyncSendTx | sendTx.async 
Get accountBlock of sending transaction

- **Parameters** 
    __namedParameters: object
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

## receiveTx.sync
Same as `utils.accountBlock.getReceiveTxBlock`

## asyncReceiveTx | receiveTx.async 
Get accountBlock of receiving transaction

- **Parameters** 
    __namedParameters: object
    * `accountAddress: Address`
    * `fromBlockHash: Hex`
    * `prevHash?: Hex`
    * `height?: Uint64`
    * `snapshotHash?: Hex`
- **Return**:
    * Promise<`AccountBlock`>

## createContract
Get accountBlock of creating contract

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `tokenId: TokenId`
        * `amount: BigInt`
        * `fee: BigInt,`
        * `hexCode: Hex`
        * `abi: string`
        * `params?: stirng`
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

## callContract
Get accountBlock of calling contract

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `toAddress: Address`
        * `abi: string`
        * `tokenId?: TokenId` Default viteTokenID
        * `amount: BigInt`
        * `methodName: stirng`
        * `params?: stirng`
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

## mintage
Get accountBlock of token issuance

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `tokenName: string`
        * `decimals: uint8`
        * `totalSupply: bigInt`
        * `tokenSymbol: string`
        * `isReIssuable: bool`
        * `maxSupply: Uint256`
        * `ownerBurnOnly: bool`
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
        * `feeType: string` burn or stake
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>


## mintageCancelPledge
Cancel token staked accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `tokenId: TokenId` token id
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

## mintageIssue
Get accountBlock of additional token issuance

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `tokenId: TokenId` Token id
        * `amount: uint64` Additional amount
        * `beneficial: Address` Additional token receiving address
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

## mintageBurn
Get accountBlock of token destruction

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `tokenId: TokenId` Destroyed token id
        * `amount: uint64` Destroyed token amount
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

## changeTransferOwner
Get account block of changed transfer owner

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `ownerAddress: Address`
        * `tokenId: TokenId`
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

## changeTokenType
Get accountBlock of changing token type, e.g change token type from enable additional token issuance to disable

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `tokenId: TokenId`
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

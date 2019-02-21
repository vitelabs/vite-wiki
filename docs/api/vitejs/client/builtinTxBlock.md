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
        * `Gid?: string`
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
        * `Gid?: string`
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
        * `Gid?: string`
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
        * `Gid?: string`
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
        * `Gid?: string`
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
        * `Gid?: string`
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
        * `tokenId: TokenId`
        * `amount: BigInt`
        * `methodName: stirng`
        * `params?: stirng`
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>
    
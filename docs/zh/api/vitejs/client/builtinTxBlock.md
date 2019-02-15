# buildinTxBlock

## getAccountBlock.sync
同 utils.accountBlock.getAccountBlock

## asyncAccountBlock | getAccountBlock.async
异步获取accountBlock

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

## updateReg
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

## revokeReg
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

## retrieveReward
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

## voting
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

## revokeVoting
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

## getQuota
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

## withdrawalOfQuota
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

## sendTx.sync
同 utils.accountBlock.getSendTxBlock

## asyncSendTx | sendTx.async 
获取发送交易的accountBlock

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
同 utils.accountBlock.getReceiveTxBlock

## asyncReceiveTx | receiveTx.async 
获取接收交易的accountBlock

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
获取创建合约的accountBlock

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
    - `requestType: string<'async' | 'sync'>` 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

## callContract
获取调用合约的accountBlock

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
    - `requestType: string<'async' | 'sync'>` 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

## mintage
获取铸币accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `tokenName: string`
        * `decimals: uint8`
        * `totalSupply: big.int`
        * `tokenSymbol: string`
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

## mintageIssue
获取增发代币的accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `tokenId: TokenId` 代币id
        * `amount: uint64` 增发数量
        * `beneficial: Address` 增发代币接收地址
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

## mintageBurn
获取销毁代币的accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

## changeTransferOwner
获取修改所有者的accountBlock

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `ownerAddress: Address`
        * `height?: Uint64`
        * `prevHash?: Hex`
        * `snapshotHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

## changeTokenType
获取修改代币类型的accountBlock, 将可增发代币修改为不可增发

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

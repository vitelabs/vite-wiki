# BuiltinTxBlock

Gvite-RPC [ledger_getLatestBlock](../../rpc/ledger.md)

```javascript
// For example
// ...
accountBlock.prevHash = latestBlock ? latestBlock.hash : Default_Hash;
accountBlock.height = latestBlock ? latestBlock.height + 1 : 1;
```

## 调用方式

:::warning Notice
`client.builtinTxBlock`中的方法，当`requestType`为`async`时，非必填参数皆可不填，默认`requestType = async`. 
:::

```javascript
// ...

const block = myclient.builtinTxBlock.getAccountBlock(/** ... */);
```

## 通用

### getAccountBlock
[同 accountBlock.getAccountBlock](../tool/accountBlock.md)

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
获取运行PoW成功后的AccountBlock。 *Gvite-RPC [pow_getPowNonce](../../rpc/pow.md)*

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
当没有配额时，自动运行PoW获取accountBlock。 *Gvite-RPC [tx_calcPoWDifficulty](../../rpc/tx.md) + [pow_getPowNonce](../../rpc/pow.md)*

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
[同 accountBlock.getSendTxBlock](../tool/accountBlock.md)

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
获取创建合约的accountBlock。 *Gvite-RPC [contract_getCreateContractToAddress](../../rpc/contract.md)*

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
        - `params?`
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
获取注册SBP的accountBlock。 *this.callContract [constant.Register_Abi](../constant/constant.md)*

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
获取更新注册SBP的accountBlock。 *this.callContract [constant.UpdateRegistration_Abi](../constant/constant.md)*

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
获取取消注册SBP的accountBlock。 *this.callContract [constant.CancelRegister_Abi](../constant/constant.md)*

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
获取奖励的accountBlock。 *this.callContract [constant.Reward_Abi](../constant/constant.md)*

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
获取投票的accountBlock。 *this.callContract [constant.Vote_Abi](../constant/constant.md)*

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
获取撤销投票的accountBlock。 *this.callContract [constant.CancelVote_Abi](../constant/constant.md)*

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
获取配额的accountBlock。 *this.callContract [constant.Pledge_Abi](../constant/constant.md)*

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
获取取消配额的accountBlock。 *this.callContract [constant.CancelPledge_Abi](../constant/constant.md)*

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
获取铸币accountBlock。 *this.callContract [constant.Mint_Abi](../constant/constant.md)*

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

### mintageCancelPledge
取消代币抵押的accountBlock。 *this.callContract [constant.CancelMintPledge_Abi](../constant/constant.md)*

- **Parameters** 
    - `__namedParameters: object`
        * `accountAddress: Address`
        * `tokenId: TokenId` 代币id
        * `height?: Uint64`
        * `prevHash?: Hex`
    - `requestType: string<'async' | 'sync'>` Default async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### mintageIssue
获取增发代币的accountBlock。 *this.callContract [constant.Issue_Abi](../constant/constant.md)*

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

### mintageBurn
获取销毁代币的accountBlock。 *this.callContract [constant.Burn_Abi](../constant/constant.md)*

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
获取修改所有者的accountBlock。 *this.callContract [constant.TransferOwner_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `newOwner: Address`
        - `tokenId: TokenId`
        - `height?: Uint64`
        - `prevHash?: Hex`
    * `requestType: string<'async' | 'sync'>` Default: async 规范化accountBlock时，使用同步还是异步方式

- **Return**:
    * Promise<`AccountBlock`>

### changeTokenType
获取修改代币类型的accountBlock, 将可增发代币修改为不可增发。 *this.callContract [constant.ChangeTokenType_Abi](../constant/constant.md)*

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
ViteX充值。 *this.callContract [constant.DexFundUserDeposit_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` 充值币种
        - `amount: Uint64` 金额
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundUserWithdraw
ViteX提现。 *this.callContract [constant.DexFundUserWithdraw_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` 提现币种
        - `amount: Uint256` 金额
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexTradeCancelOrder
ViteX撤单。 *this.callContract [constant.DexTradeCancelOrder_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `orderId: Bytes` 订单编号
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundNewOrder
ViteX挂单。 *this.callContract [constant.DexFundNewOrder_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tradeToken: TokenId` 交易币种
        - `quoteToken: TokenId` 计价币种/基础币种
        - `side: Bool` buy: true; sell: false
        - `orderType: Uint32` Default 0. 订单类型, 0:限价单 1: 市价单[暂不支持]
        - `price: String` 价格. 小数的字符串表示，整数和小数部分最大都是10位小数
        - `quantity: Uint256` 交易数量
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundNewMarket
ViteX 开通一个新的交易对。 *this.callContract [constant.DexFundNewMarket_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `operationCode: Uint8` 操作代码. 1 转让Owner; 2 设置takerFeeRate; 4 设置makerFeeRate; 8 停止交易. 对应code进行加和来支持以上多项的同时配置
        - `tradeToken: TokenId` 交易币种. 必需
        - `quoteToken: TokenId` 计价币种. 必需
        - `takerFeeRate: Int32` 运营商taker费率 operationCode & operationCode == 2 生效; rate/100,000 = 实际费率
        - `makerFeeRate: Int32` 运营商maker费率 operationCode & operationCode == 4 生效; rate/100,000 = 实际费率
        - `stopMarket: Bool` 打开/关闭交易开关(true 停止交易; false 开通交易) operationCode & operationCode == 8 生效
        - `owner: Address` 新owner operationCode & operationCode === 1 生效
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
获取/解除 vip资格。(Staking 10,000 VITE for Becoming a VIP) *this.callContract [constant.DexFundPledgeForVip_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `actionType: Uint8` 操作类型. 1 获取VIP 2 解除VIP
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundBindInviteCode
被邀请人绑定邀请码。 *this.callContract [constant.DexFundBindInviteCode_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address` 
        - `code: Uint32` 邀请码
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundNewInviter
创建邀请人。 *this.callContract [constant.DexFundNewInviter_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

### dexFundTransferTokenOwner
转让token owner。 *this.callContract [constant.DexFundTransferTokenOwner_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `tokenId: TokenId` TokenId
        - `owner: Address` 新owner地址
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>


### dexFundMarketOwnerConfig
交易对设置。 *this.callContract [constant.DexFundMarketOwnerConfig_Abi](../constant/constant.md)*

- **Parameters** 
    * `__namedParameters: object`
        - `accountAddress: Address`
        - `operationCode: Uint8` 操作代码. 1 转让Owner; 2 设置takerFeeRate; 4 设置makerFeeRate; 8 停止交易. 对应code进行加和来支持以上多项的同时配置
        - `tradeToken: TokenId` 交易币种. 必需
        - `quoteToken: TokenId` 计价币种. 必需
        - `takerFeeRate: Int32` 运营商taker费率 operationCode & operationCode == 2 生效; rate/100,000 = 实际费率
        - `makerFeeRate: Int32` 运营商maker费率 operationCode & operationCode == 4 生效; rate/100,000 = 实际费率
        - `stopMarket: Bool` 打开/关闭交易开关(true 停止交易; false 开通交易) operationCode & operationCode == 8 生效
        - `owner: Address` 新owner operationCode & operationCode === 1 生效
    * `requestType: string<'async' | 'sync'>` Default: async. Options (sync or async) when reformatting accountBlock

- **Return**:
    * Promise<`AccountBlock`>

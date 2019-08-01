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
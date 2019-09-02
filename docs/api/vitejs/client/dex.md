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
    
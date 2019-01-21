# buildinLedger

## getBalance
获取余额

- **Parameters** 
    * `addr: Address`
- **Return**:
    * Promise<`{ balance, onroad }`>

## getTxList
获取交易列表

- **Parameters** 
    __namedParameters: object
    * `addr: Address`
    * `index: number` 
    * `pageCount?: number` default 50
- **Return**:
    * Promise<`{ list, totalNum }`>

## sendRawTx
发送交易

- **Parameters** 
    * `accountBlock: AccountBlock` 规范化后的accountBlock (无需签名)
    * `privateKey` 私钥
- **Return**:
    * Promise<`AccountBlock`>

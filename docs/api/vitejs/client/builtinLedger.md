# buildinLedger

## getBalance
Get Balance

- **Parameters** 
    * `addr: Address`
- **Return**:
    * Promise<`{ balance, onroad }`>

## getTxList
Get Transaction List

- **Parameters** 
    __namedParameters: object
    * `addr: Address`
    * `index: number` 
    * `pageCount?: number` default 50
- **Return**:
    * Promise<`{ list, totalNum }`>

## sendRawTx
Send Transaction

- **Parameters** 
    * `accountBlock: AccountBlock` Regulated accountBlock (Signature not required)
    * `privateKey` Private Key
- **Return**:
    * Promise<`AccountBlock`>

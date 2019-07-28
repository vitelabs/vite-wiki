# Tx
:::tip 维护者
[TiantaoZhu](https://github.com/TiantaoZhu) && [lyd00](https://github.com/lyd00) && [vite-crzn](https://github.com/vite-crzn)
:::

## tx_sendRawTx
发送一个完整的原始accountBlock

- **Parameters**: `Object`: `RawTxBlock`

  * `blockType`: `byte` 交易类型 `必填`
  * `height`: `string` 高度 `必填`
  * `hash`: `Hash` 该交易的Hash `必填`
  * `prevHash`: `Hash`  出块账户链上上一个块的哈希 `必填` 如果是账户链上第一个交易，填0-Hash
  * `accountAddress`: `Address` 出块账户地址 `必填`
  * `publicKey`: `[]byte`  交易签名的公钥 `必填`
  * `signature`: `[]byte` 签名 `必填`
   
  选填：是否进行Pow，仅在需要进行Pow时指定，否则可忽略difficulty和nonce字段，或填写null
  * `difficulty`: `*string` 需要计算的PoW难度
  * `nonce`: `[]byte` Pow的nonce值
     
  选填：区分交易类型（send/receive）
  * `fromBlockHash`: `Hash`  表示receive交易所对应的send交易的hash，仅在receive交易中指定，send交易的fromBlockHash为0-Hash或忽略该字段
  * `toAddress`: `Address`  交易的接受地址，仅在send交易中指定，receive交易忽略该字段
  * `tokenId`: `TokenTypeId` 该交易的币种ID，仅在send交易中指定，当交易不实际发生金额时，tokenId为0-TokenTypeId或忽略该字段，receive交易忽略该字段
  * `amount`: `*string` 该交易发生的金额，仅在send交易中指定，当交易不实际发生金额时为"0"或null或忽略该字段， receive交易忽略该字段
  * `fee`: `*string` 发送该交易使用的手续费，无需指定币种默认为ViteToken，仅在send交易中指定， 所有receive交易忽略该字段
  * `data`: `[]byte` 交易数据，对于普通账户data仅可在send中指定，可为留言或者调用合约的交易数据，无需求时可为null或忽略改字段

- **Returns**: `Object`: `AccountBlock`

  * `blockType`: `byte`
  * `height`: `string`
  * `hash`: `Hash`
  * `prevHash`: `Hash`
  * `accountAddress`: `Address`
  * `publicKey`: `[]byte`
  * `signature`: `[]byte`
  * `fromAddress`: `Address`
  * `toAddress`: `Address`
  * `fromBlockHash`: `Hash`
  * `tokenId`: `TokenTypeId`
  * `amount`: `*string`
  * `fee`: `*string`
  * `data`: `[]byte`
  * `difficulty`: `*string`
  * `nonce`: `[]byte`
  * `quota`: `*string` 该账户的配额
  * `quotaUsed`: `*string` 该交易消耗的配额
  * `logHash`: `*types.Hash` 智能合约执行产生的LogList的Hash
  * `sendBlockList`: `[]*RawTxBlock` 合约RS块发送的请求交易列表
  * `tokenInfo`: `*RpcTokenInfo` 该交易涉及的Token信息
  * `confirmedTimes`: `*string` 该交易被确认次数
  * `confirmedHash`: `*Hash` 该交易第一次被确认的SnapshotHash
  * `timestamp`: `int64` 交易被第一次确认的Snapshot时间戳
  * `receiveBlockHeight`: `*string` 仅send交易展示，对应的receive交易的高度
  * `receiveBlockHash`: `*Hash` 仅send交易展示，对应的receive交易Hash

- **Example**:

::: demo


```json tab:Request Send
{
    "jsonrpc": "2.0",
    "id": 17,
    "method": "tx_sendRawTx",
    "params": [{
    	"blockType": 2,
        "height": "9",
        "hash": "7161f621d1bdc2571fa1e66917fca90b047e3e5c78c18e5cfb11edba32c7c2fc",
        "prevHash": "7c6a8b729e73ae98409a5ab72ccc458ff449eced5e7ee757d52de83e8f32a070",
        "accountAddress": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
        "publicKey": "WHZinxslscE+WaIqrUjGu2scOvorgD4Q+DQOOcDBv4M=",
        "signature":"Hz8bC6TUM00oWylUua7oN2sE4EEFUuCK4C9LQcZZu8vyb3UU9xG32BeJtBQ==",
        "difficulty": "65535",
        "nonce": "Tgb+PebmE4w=",
        "fromBlockHash": "0000000000000000000000000000000000000000000000000000000000000000",
        "toAddress":"vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
        "tokenId": "tti_5649544520544f4b454e6e40",
        "amount": "10000",
        "fee": "0",
        "data":null
    }]
}
```

```json tab:Request Receive
{
    "jsonrpc": "2.0",
    "id": 17,
    "method": "tx_sendRawTx",
    "params": [{
    	"blockType": 4,
        "height": "11",
        "hash": "d7a26855f131f53ba6320f0ebcba99f2c2157d60a47dc7a53a3186cd0b202b63",
        "prevHash": "9f463b7db51f91951de9445570e4a6d4f00def4d528c80ddfdf39e1e47f8498d",
        "accountAddress": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
        "publicKey": "WHZinxslscE+WaIqrUjGu2scOvorgD4Q+DQOOcDBv4M=",
        "signature":"zBF5LgOOxQ+H86oMNQ3kbuJbiQ+yCdLbtOdmEJ7QRNo67HF3b/pm+bfM5EHuxMNpOnimKgawtozZwifnFVhyDQ==",
        "difficulty": null,
        "nonce": null,
        "fromBlockHash":"7c6a8b729e73ae98409a5ab72ccc458ff449eced5e7ee757d52de83e8f32a070",
        "data":null
    }]
}
```

```json tab:Response Success
{
    "jsonrpc": "2.0",
    "id": 17,
    "result": null
}
```

```json tab:Response Error
{
    "jsonrpc": "2.0",
    "id": 17,
    "error": {
        "code": -36006,
        "message": "verify prevBlock failed, incorrect use of prevHash or fork happened"
    }
}
```

::: 


## tx_calcPoWDifficulty
用户账户通过sendRawTx创建交易时获取difficulty。接口逻辑为先根据交易参数计算所需配额，然后判断账户是否有抵押受益金额，如果抵押获得的配额足够，则不需要计算PoW；如果没有抵押或者抵押获得的配额不够，则计算PoW难度。
如果接口返回error，表示当前交易不能通过计算PoW来获取配额，例如在同一个快照时间内账户链上上一笔交易已通过PoW来获取配额，那么新交易不允许再次计算PoW。

- **Parameters**: 

  * `selfAddr`: `Address`  出块账户地址，必填
  * `prevHash`: `Hash`  出块账户链上上一个块的哈希，必填。如果是账户链上第一个交易，填0
  * `blockType`: `byte`  交易类型，必填
  * `toAddr`: `Address`  交易接受地址，如果交易类型为请求交易，则此字段必填，否则填空
  * `data`: `[]byte`  交易数据
  * `usePledgeQuota`: `bool`  是否优先使用配额

- **Returns**: `Object`
  * `difficulty`: `big.Int`  需要计算的PoW难度，如果为空字符串，说明不需要计算PoW
  * `quota`: `uint64`  交易需要的配额
  * `isCongestion`: `bool`  全网是否拥堵，true表示当前全网拥堵，此时配额成本提高，false表示不拥堵
  
- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 17,
	"method": "tx_calcPoWDifficulty",
	"params": [{
		"selfAddr":"vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",
		"prevHash":"51ee7ce9c6218eee0e98551ebfa46255dfbd9c40bf73c4b69622ff90e5b8d153",
		"blockType":4,
		"toAddr":"vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",
		"data":"8pxs4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAAAAAACA1EbeCzJnsDy6fZtJr6XnE0HHzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFc3VwZXIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
		"usePledgeQuota":true
	}]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 17,
    "result": {
        "quota": 21000,
        "difficulty": "65534"
    }
}
```
:::

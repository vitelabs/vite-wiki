# Tx
:::tip 维护者
[TiantaoZhu](https://github.com/TiantaoZhu) && [lyd00](https://github.com/lyd00) && [vite-crzn](https://github.com/vite-crzn)
:::

## tx_sendRawTx
发送一个完整的原始accountBlock

## tx_calcPoWDifficulty
用户账户通过sendRawTx创建交易时获取difficulty。接口逻辑为先根据交易参数计算所需配额，然后判断账户是否有抵押受益金额，如果抵押获得的配额足够，则不需要计算PoW；如果没有抵押或者抵押获得的配额不够，则计算PoW难度。
如果接口返回error，表示当前交易不能通过计算PoW来获取配额，例如账户链上已有交易和新交易引用了相同的快照块哈希，并且通过PoW来获取配额，那么新交易不允许再次计算PoW。

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
    "result": "67108864"
}
```
:::

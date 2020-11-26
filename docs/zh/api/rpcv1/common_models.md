# CommonModels
:::tip 维护者
[TiantaoZhu](https://github.com/TiantaoZhu) && [lyd00](https://github.com/lyd00)
:::

## RpcAccountInfo
|  名称  | json类型 | 实际类型 |说明 |
|:------------:|:-----------:|:-----:|:-----:|
| accountAddress |  string | Address| 地址|
| totalNumber | string | uint64| 该账户的交易数量|
| tokenBalanceInfoMap | map | map| 各个币种的信息|

```json ::Demo
{
    "accountAddress": "vite_f84b6eede43969a938dfd1c381e197ed47dd06f329b7c92328",
    "totalNumber": "433",
    "tokenBalanceInfoMap": {
        "tti_8816f463487a9cc3c3886b8c": {
            "tokenInfo": {
                "tokenName": "as",
                "tokenSymbol": "aa",
                "totalSupply": "10000",
                "decimals": 19,
                "owner": "vite_f84b6eede43969a938dfd1c381e197ed47dd06f329b7c92328",
                "pledgeAmount": "10000",
                "withdrawHeight": "12"
            },
            "totalAmount": "132",
            "number": "10000"
        }
    }
}
```
`tokenBalanceInfoMap: [tokenId]TokenBalanceInfo`

### RpcTokenBalanceInfo
|  名称  | json类型 | 实际类型 |说明 |
|:------------:|:-----------:|:-----:|:-----:|
| tokenInfo |  tokenInfo | tokenInfo| token的属性详情|
| totalAmount | string | bigint| 该币种的数量|
| number | string | uint64| 该币种再该账户上的交易数量|

### RpcTokenInfo
|  名称  | json类型 | 实际类型 |说明 |
|:------------:|:-----------:|:-----:|:-----:|
| tokenName |  string | string| token的名字|
| tokenSymbol | string | string| token的简称|
| totalSupply | string | bigint| 该币种的发行总量|
| decimals | string | uint8| 该币种的最小可分割单位 1e`decimals`|
| owner | string | address| 该币的铸币人|
| tokenId | string | TokenTypeId| token id|

## AccountBlock
|  名称  | json类型 |实际类型 |说明 |
|:------------:|:-----------:|:-----------:|:-----:|
| blockType | Byte |Byte | 块类型(1表示"创建合约send", 2表示"转账send", 3表示"奖励send", 4表示"交易receive", 5表示"交易receive失败", 6表示"退款send",7表示"创世receive", 1、2、3、6为send，4、5、7为receive, ps: 普通交易的send为2，receive为4)|
| hash | hex string | Hash | 该交易的Hash|
| prevHash |hex string| Hash | 该交易在其账户链上的上一个交易的hash, 如果该交易是该账户的第一笔交易，则为"0000000000000000000000000000000000000000000000000000000000000000"|
| accountAddress| string | Address | 该交易所属账号地址|
| publicKey|base64 string | []byte | 交易签名的公钥|
| fromAddress |string| Address | 交易的发送地址|
| toAddress|string | Address | 交易的接受地址|
| fromBlockHash |hex string |  Hash | 表示这个receive交易所对应的send交易的hash，所有send交易的fromBlockHash为"0000000000000000000000000000000000000000000000000000000000000000"|
| tokenId |string |TokenTypeId | 该交易的币种ID|
| data | string| []byte |  可用作交易备注|
| timestamp | int64 | int64 |  该交易被快照的时间 单位秒|
| logHash | hex string | Hash  | 智能合约执行产生的LogList的Hash |
| nonce | base64 string |[]byte] |  该交易Pow的nonce|
| signature | base64 string| []byte] | 交易的签名|
| height | string | uint64 | 该交易的高度 |
| quota | string | uint64 | 该交易消耗的配额，不包含计算PoW获得的一次性配额 |
| quotaUsed | string | uint64 | 该交易消耗的配额 |
| utUsed | string | float | 该交易消耗的配额，单位：ut，精确到小数点后4位 |
| amount |string|  big.Int | 该交易发生的金额|
| fee | string | big.Int | 发送该交易使用的手续费 |
| confirmedTimes |string| uint64 | 该交易被确认次数 |
| confirmedHash |hex string| Hash | 该交易第一次被确认的SnapshotHash |
| tokenInfo | tokenInfo | tokenInfo | 该交易涉及的Token信息 |
| sendBlockList | []*RawTxBlock | []*RawTxBlock | 合约RS块发送的请求交易列表|
| receiveBlockHeight | string | uint64 | 对应的receive交易的高度 仅send交易展示 |
| receiveBlockHash | hex string | Hash | 对应的receive交易Hash 仅send交易展示|

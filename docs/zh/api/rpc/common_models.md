# CommonModels
## tiantao && lyd
### 所有byte数组的类型，请转为base64传递，uint64和big.int都用string传递

## RpcAccountInfo
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
`tokenBalanceInfoMap: [tokentypeid]TokenBalanceInfo`

|  名称  | json类型 | 实际类型 |说明 |
|:------------:|:-----------:|:-----:|:-----:|
| accountAddress |  string | Address| 地址|
| totalNumber | string | uint64| 该账户的交易数量|
| tokenBalanceInfoMap | map | map| 各个币种的信息|

`TokenBalanceInfo`
|  名称  | json类型 | 实际类型 |说明 |
|:------------:|:-----------:|:-----:|:-----:|
| tokenInfo |  tokenInfo | tokenInfo| token的属性详情|
| totalAmount | string | bigint| 该币种的数量|
| number | string | uint64| 该币种再该账户上的交易数量|

`tokenInfo`
|  名称  | json类型 | 实际类型 |说明 |
|:------------:|:-----------:|:-----:|:-----:|
| tokenName |  string | string| token的名字|
| tokenSymbol | string | string| token的简称|
| totalSupply | string | bigint| 该币种的发行总量|
| decimals | string | uint8| 该币种的最小可分割单位 1e`decimals`|
| owner | string | address| 该币的铸币人|
| pledgeAmount | string | bigint| 铸币的抵押费|
| withdrawHeight | string | uint64| 可以取回抵押费的最低高度，过了高度就可以把钱取回来|
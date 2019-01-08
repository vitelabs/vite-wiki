# CommonModels

:::tip Maintainer
[TiantaoZhu](https://github.com/TiantaoZhu) && [lyd00](https://github.com/lyd00)
:::

:::warning
All byte arrays should be converted to base64 encoding before passed in; uint64 and big.int types should be passed in string
:::

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

|  Name  | JSON type | Actual type |Desc |
|:------------:|:-----------:|:-----:|:-----:|
| accountAddress |  string | Address| The account address|
| totalNumber | string | uint64| The total transaction number of the account|
| tokenBalanceInfoMap | map | map| The token-balance map|

`TokenBalanceInfo`
|  Name  | JSON type | Actual type |Desc |
|:------------:|:-----------:|:-----:|:-----:|
| tokenInfo |  tokenInfo | tokenInfo| The token information|
| totalAmount | string | bigint| The token balance|
| number | string | uint64| The total transaction number in the token of the account|

`tokenInfo`
|  Name  | JSON type | Actual type |Desc |
|:------------:|:-----------:|:-----:|:-----:|
| tokenName |  string | string| The token name|
| tokenSymbol | string | string| The token symbol|
| totalSupply | string | bigint| The total supply|
| decimals | string | uint8| The smallest separable unit of the token 1e`decimals`|
| owner | string | address| The name of token issuer|
| pledgeAmount | string | bigint| The amount of VITE staked when the token is forged|
| withdrawHeight | string | uint64| The minimum height to retrieve staking. The staked VITE can be withdrawn once the minimum height is reached|
| tokenId | string | TokenTypeId| The token ID|




## AccountBlock
|  Name  | JSON type | Actual type |Desc |
|:------------:|:-----------:|:-----------:|:-----:|
| blockType | Byte |Byte | The block type(1-create contract request, 2-transaction request, 3-reward request, 4-transaction response, 5-transaction response fail. Type 1, 2 and 3 are request types and 4, 5 are response. For common transactions the request block type is 2 and response block type is 4)|
| hash | hex string | Hash | The hash of transaction|
| prevHash |hex string| Hash | The hash of previous transaction in the account chain. '0000000000000000000000000000000000000000000000000000000000000000' will be filled if this is the first transaction in the account|
| accountAddress| string | Address | The account address|
| publicKey|base64 string | []byte | The public key of block producer|
| fromAddress |string| Address | The transaction sender address. Response block only|
| toAddress|string | Address | The transaction receiver address. Request block only|
| fromBlockHash |hex string |  Hash | The hash of request transaction if this is a response transaction, otherwise '0000000000000000000000000000000000000000000000000000000000000000' will be filled|
| tokenId |string |TokenTypeId | The token ID in which the transaction is settled|
| snapshotHash | hex string | Hash | The hash of snapshot block which the transaction refers to |
| data | string| []byte | The additional data. Can be used as transaction annotation|
| timestamp | int64 | int64 | The transaction time in seconds|
| logHash | hex string | Hash  | The hash of smart contract LogList |
| nonce | base64 string |[]byte] | The PoW nonce |
| signature | base64 string| []byte] | The transaction signature |
| height | string | uint64 | The transaction height |
| quota | string | uint64 | The quota consumed by the transaction |
| amount |string|  big.Int | The transaction amount |
| fee | string | big.Int | The transaction fee |
| confirmedTimes |string| uint64 | The confirmation number of the transaction |
| tokenInfo | TokenInfo | The token information in which the transaction is settled|

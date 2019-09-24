# CommonModels
:::tip 维护者
[vite-crzn](https://github.com/vite-crzn) && [lyd00](https://github.com/lyd00) && [viteLiz](https://github.com/viteLiz)
:::

## AccountInfo
|  名称  | 类型 | 说明 |
|:------------:|:-----------:|:-----:|
| address | string address| 账户地址 |
| blockCount | string uint64| 账户链上的账户块数量 |
| balanceInfoMap | map<string tokenId, BalanceInfo> | 账户余额 |

## BalanceInfo
|  名称  | 类型 | 说明 |
|:------------:|:-----------:|:-----:|
| tokenInfo | TokenInfo | 代币信息 |
| balance | string bigint| 代币余额 |
| transactionCount | string uint64| 账户链上和该币种相关的账户块数量 |

## TokenInfo 代币信息
|  名称  | 类型 |说明 |
|:------------:|:-----------:|:-----:|
| tokenName |  string | 代币名称 |
| tokenSymbol | string | 代币简称 |
| totalSupply | string bigint | 发行总量 |
| decimals | uint8 | 小数位数 |
| owner | string address | 所有者 |
| tokenId | string tokenId | 代币id |
| isReIssuable | bool | 是否可增发，true 可增发 false  不可增发 |
| maxSupply | string bigint | 最大发行量，不可增发代币此字段值为0 |
| isOwnerBurnOnly | bool | 是否仅所有者可销毁，true 仅所有者可销毁 false 所有持币账户可销毁，不可增发代币此字段值为false |
| index | uint16 | 序号，从0开始，同名tokenSymbol的序号按铸币顺序递增 |

## AccountBlock 账户块信息
|  名称  | 类型 | 说明 |
|:------------:|:-----------:|:-----:|
| blockType | byte | 交易类型 1 创建合约请求 2 转账或调用合约请求 3 增发请求 4 响应 5 响应失败 6 退款请求 7 创世响应|
| height | string uint64 | 块高度 |
| hash | string Hash | 交易哈希|
| previousHash | string hash | 账户链上上一笔交易的哈希, 账户链上第一笔交易的值为`0000000000000000000000000000000000000000000000000000000000000000`|
| address| string Address | 账户块所属的账户地址|
| publicKey| string base64 | 账户公钥 |
| producer |string address | 出块账户地址，用户账户块的出块地址为用户账户地址，合约账户块的出块地址为委托共识组的出块节点地址 |
| fromAddress |string address | 请求账户地址 |
| toAddress|string address | 响应账户地址|
| fromBlockHash | string  hash | 交易类型为请求时值为`0000000000000000000000000000000000000000000000000000000000000000`，交易类型为响应时值为对应请求的哈希|
| tokenId |string tokenId | 代币id |
| amount |string bigint | 转账金额 |
| tokenInfo | RpcTokenInfo| 转账的代币信息 |
| fee | string bigint | 手续费 |
| data | string base64| 备注 |
| difficulty | string bigint | PoW的难度 |
| nonce | string base64 | PoW的nonce |
| signature | string base64 | 签名|
| quotaByStake | string uint64 | 消耗的配额，不包含计算PoW获得的一次性配额 |
| totalQuota | string uint64 | 消耗的配额，包含计算PoW获得的一次性配额 |
| vmlogHash | string hash  | 智能合约响应交易的vmlog的哈希 |
| triggeredSendBlockList | []*AccountBlock | 合约响应交易发起的请求交易列表 |
| confirmations |string uint64 | 交易被快照块确认的次数 |
| firstSnapshotHash | string hash | 快照这笔交易的快照块哈希 |
| timestamp | int64 | 交易被快照的时间，单位秒 |
| receiveBlockHeight | string uint64 | 请求交易对应的响应交易块高度 |
| receiveBlockHash | string hash | 请求交易对应的响应交易的哈希 |

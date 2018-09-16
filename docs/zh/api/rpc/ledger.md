# Ledger
## 注意
1. 如无特殊说明 时间戳是秒为单位 bigInt的字符串是10进制的；
2. 注意区分空字符串和空指针的区别，比如PrevHash在发送交易的时候如果事实有就填正确的hash，如果没有就不要传这个字段，或者给它设置为json标准的null，千万别传空字符串
## 说明

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  `false` |  &#x2713; |waiting|`false`|

## 交易结构体字段说明
该结构体是用户发送完整的交易，或者获取账户交易统一返回，下表对其中的字段和缺省情况进行说明
### AccountBlock
|  名称  | 类型 | 发送时必填 |返回时必有|说明 |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| Meta |  AccountBlockMeta |  &#x2713; | &#x2713;|用于描述账户情况的字段，下表具体阐述|
| AccountAddress |  Address |  &#x2713; | &#x2713;|该交易的产生方地址|
| PublicKey |  hex string |  &#x2713; | &#x2715;|对交易签名产生的公钥|
| To |  Address |  &#x2713; | &#x2713;|交易的目的地址|
| From |  Address |  &#x2715; | &#x2715;|如果此字段不为空表示这是一个响应交易,所以如果发送一个响应交易必须填这个，表示该交易的发起方|
| FromHash |  hex format 256Hash |  &#x2715; | &#x2715;|表示该交易对应的发送交易的hash，配个From 字段使用|
| PrevHash |  hex format 256Hash |  &#x2715; | &#x2715;|该交易在其账户链上的上一个交易的hash,如果该交易是该账户的第一笔交易，可以为空|
| Hash |  hex format 256Hash |  &#x2713; | &#x2713;|该交易的Hash|
| Balance |  big.Int string |  &#x2713; | &#x2713;|该交易发生后账户余额|
| Amount |  big.Int string |  &#x2713; | &#x2713;|该交易发生的金额|
| Timestamp |  秒 |  &#x2713; | &#x2713;|该交易发生的时间戳|
| TokenId |  TokenTypeId |  &#x2713; | &#x2713;|该交易的币种ID|
| LastBlockHeightInToken |  big.Int string |  &#x2715; | &#x2715;|该账户链上一个同币种交易的高度|
| Data |  string |  &#x2715; | &#x2715;|可用作交易备注|
| SnapshotTimestamp | hex string  |  &#x2713; | &#x2713;|最近的快照块的hash |
| Signature |  hex  string |  &#x2713; | &#x2713;|交易的签名|
| Nonce |  hex  string |  &#x2713; | &#x2713;|该交易Pow的nonce|
| Difficulty |  hex  string |  &#x2713; | &#x2713;|该交易Pow的|
| ConfirmedTimes |  big.Int string|  &#x2715; | &#x2713;|该交易被确认的次数|
| FAmount |  big.Int string |  &#x2713; | &#x2713;|交易费|

### AccountBlockMeta
|  名称  | 类型 | 发送时必填 |返回时必有|说明 |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| Height |  big.Int string|  &#x2713; | &#x2713;|作为返回标识账户链的高度，作为发送应该把获取到底Height+1填倒这里|
| Status |  int |  &#x2715; | &#x2713;|0 是状态错误, 1 表示没有结对的响应交易, 2 代表已经有结对的响应交易|
| IsSnapshotted |  bool |  &#x2715; | &#x2713;|该交易是否被快照|
## API

### ledger_createTx
用一个完整的Block创建交易

- **Parameters**:
AccountBlock

- **Returns**: 
	- 成功则返回 null

	- 需要关注的失败的可能有
    	* -35001 余额不足


### ledger_createTxWithPassphrase
创建一个转账交易

- **Parameters**:

  * `SelfAddr`: `string of addr`  交易的发起方
  * `ToAddr`: `string of addr`  交易的接收方
  * `Passphrase`: `string`  交易发起方的账户密码
  * `TokenTypeId`: `string of tokentypeid`  交易的币种id
  * `Amount`:`big int string`  交易数量，按照该币种的最小分割单位

- **Returns**: 
	- 成功则返回 null

	- 需要关注的失败的可能有
    	* -34001 密码错误
    	* -35001 余额不足

- **Example**:

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 9,
	"method": "ledger_createTxWithPassphrase",
	"params": [{
		"SelfAddr": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
		"ToAddr": "vite_89ab1052584d8e5c68dc4883336da31bc924f355b5cff28f5d",
		"TokenTypeId": "tti_000000000000000000004cfd",
		"Passphrase": "123456",
		"Amount": "1"
	}]
}
```
```json tab:Response success
{
	"jsonrpc": "2.0",
	"id": 9,
	"result": null
}
```

```json tab:Error by balance not enough
{
	"jsonrpc": "2.0",
	"id": 13,
	"error": {
		"code": -35001,
		"message": "The balance is not enough."
	}
}
```

```json tab:Error by wrong password
{
	"jsonrpc": "2.0",
	"id": 15,
	"error": {
		"code": -34001,
		"message": "error decrypting key"
	}
}
```
```json test
{
	"jsonrpc": "2.0",
	"id": 9,
	"method": "ledger_createTxWithPassphrase",
	"params": [{
		"SelfAddr": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
		"ToAddr": "vite_89ab1052584d8e5c68dc4883336da31bc924f355b5cff28f5d",
		"TokenTypeId": "tti_000000000000000000004cfd",
		"Passphrase": "123456",
		"Amount": "1"
	}]
}
```
:::

### ledger_getBlocksByAccAddr
获得一个账户的交易列表

- **Parameters**:

  * `string`: `Addr`  要查询的addr
  * `int`:  `Index` 页码
  * `int`: `Count`  每页大小


- **Returns**:  AccountBlock列表
  
- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 17,
	"method": "ledger_getBlocksByAccAddr",
	"params": ["vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada", 0, 10]
}
```

```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 17,
    "result": [
        {
            "Meta": {
                "Height": "1255",
                "Status": 2,
                "IsSnapshotted": true
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "a413878c7e4b356155e984c204fd93047d260b5a84e58fe71c5575cd522a7c93",
            "Hash": "1caa4574a46c71846963d35315783765023d47214dbc98ae70bfb8c42a57b7f6",
            "Balance": "169",
            "Amount": "1",
            "Timestamp": 1536808025,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "c4c1e3b1a8031524643cbc659dfb86435c8fe4dba919877631c8c2fe63638c5f",
            "Signature": "4f677077002d6a4449ef1daa81981d3e196b6d8b8dac4c74022f9b60889882acb5d5e298e040c19d1827544ece22b7212a624312ba22999a6192ddc8a97bd20b",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0",
            "ConfirmedTimes": "29796"
        },
        {
            "Meta": {
                "Height": "1254",
                "Status": 2,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "From": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "FromHash": "af135e7907db89e13261711d16e74c74cd2d3dac902ce267e75f614270b7761f",
            "PrevHash": "988cef44c722df3a6cc6031f5294fd4f921c52ca4d71f0e491f6b6335aa2c94f",
            "Hash": "a413878c7e4b356155e984c204fd93047d260b5a84e58fe71c5575cd522a7c93",
            "Balance": "170",
            "Amount": "1",
            "Timestamp": 1536808023,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "c4c1e3b1a8031524643cbc659dfb86435c8fe4dba919877631c8c2fe63638c5f",
            "Signature": "343a16bd4b9bf472a130c985eeee518ebb586c7ba3f3baa61767319d65d26e4e90a1515f3143d3c852dc16ccdd9d82d4745e36f47f8bab5085741d12f44b830d",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0",
            "ConfirmedTimes": "29796"
        },
        {
            "Meta": {
                "Height": "1253",
                "Status": 2,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "3718719400936d2862509e9db7aa2a9e461d9e5b4afe62fd5787d0adccfa27e3",
            "Hash": "988cef44c722df3a6cc6031f5294fd4f921c52ca4d71f0e491f6b6335aa2c94f",
            "Balance": "169",
            "Amount": "1",
            "Timestamp": 1536808020,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "c4c1e3b1a8031524643cbc659dfb86435c8fe4dba919877631c8c2fe63638c5f",
            "Signature": "f488a40f38a8ca7cb5e2122f5075c0e919711ebb2b2e63db7f6ac02d6e3e0824afc07cc9be240d2cbc1d3d2c3e13ec95844587ce512036bc34b04d5928bcc70e",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0",
            "ConfirmedTimes": "29796"
        },
        {
            "Meta": {
                "Height": "1252",
                "Status": 2,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "From": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "FromHash": "bced2110cca240cde3778146e9816bbf02baf36a4055977739eb876e54871298",
            "PrevHash": "0b93b94cf3fc01fc80955fd637d51d736ad54d0f156dd69695df6d24a5c5a817",
            "Hash": "3718719400936d2862509e9db7aa2a9e461d9e5b4afe62fd5787d0adccfa27e3",
            "Balance": "170",
            "Amount": "1",
            "Timestamp": 1536808018,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "914113e6e5e0542f97112af0e061325e7d5a4ed16ab9cc1841bcc5c9a9cee722",
            "Signature": "ec908b498504beef3ee7c884cee5bfdfb7937fb6504182f1b02de1b338ce372f4b7dbdbe88cc97e00f24fcdbede56b5f05dd4179c926e3e6841ee12d329bd40d",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0",
            "ConfirmedTimes": "29796"
        },
        {
            "Meta": {
                "Height": "1251",
                "Status": 2,
                "IsSnapshotted": true
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "a906ad8a4745ee602119598d1207e67c5f3cc6dc0c15773f477f58996e869c17",
            "Hash": "0b93b94cf3fc01fc80955fd637d51d736ad54d0f156dd69695df6d24a5c5a817",
            "Balance": "169",
            "Amount": "1",
            "Timestamp": 1536808014,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "914113e6e5e0542f97112af0e061325e7d5a4ed16ab9cc1841bcc5c9a9cee722",
            "Signature": "eb81e4fcdae31b07d44e2fd24268f55d30e09dec88ba33a7f84fa93a5f7a36a772b9ced42d6e8a8d4d0113bc2b94f97e98634d36ffd16e46dc124afea73f8f0e",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0",
            "ConfirmedTimes": "29797"
        },
        {
            "Meta": {
                "Height": "1250",
                "Status": 2,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "From": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "FromHash": "582e2edaf510a2565809a41c51881bf0cb059c078b92506a39546c577fc7cb51",
            "PrevHash": "be123b8acb2fed100d723811cf0aa2fb9e3ad009a0d356df60c21ab834dc0469",
            "Hash": "a906ad8a4745ee602119598d1207e67c5f3cc6dc0c15773f477f58996e869c17",
            "Balance": "170",
            "Amount": "1",
            "Timestamp": 1536808012,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "1d8d02e1d43ecce7e496b0d50fd25197d16ac4845bef37d54999f66e2a4ccb5b",
            "Signature": "192ac4ebbab97888305c1e8aabc795431a6c2a6f0c46148a70223e3b8fd3b83f6328a45ab7085546f8a014aaddcea2e32511243dec74394415b54f87c04fdc0e",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0",
            "ConfirmedTimes": "29797"
        },
        {
            "Meta": {
                "Height": "1249",
                "Status": 2,
                "IsSnapshotted": true
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "2e08a2d88302b24deb447cb224b0fb203ac672eb13b18a2064822f3605832fc3",
            "Hash": "be123b8acb2fed100d723811cf0aa2fb9e3ad009a0d356df60c21ab834dc0469",
            "Balance": "169",
            "Amount": "1",
            "Timestamp": 1536808009,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "1d8d02e1d43ecce7e496b0d50fd25197d16ac4845bef37d54999f66e2a4ccb5b",
            "Signature": "675cf1ab46f10a8e6f07713cdcd505b47fcc6f030bf689348ed68faaac19d8b5706864558641d06c1b1e090d68abee7262140d7bbed129316cc50fc105030300",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0",
            "ConfirmedTimes": "29798"
        },
        {
            "Meta": {
                "Height": "1248",
                "Status": 2,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "From": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "FromHash": "fb3effc3d40448ed69478e27683daae2d8ee3da330b9356072bf69a846e6bf81",
            "PrevHash": "e9bb82d6f9ee13a23486da837d1bd951f453ad3a940e05e7756b430dc185f547",
            "Hash": "2e08a2d88302b24deb447cb224b0fb203ac672eb13b18a2064822f3605832fc3",
            "Balance": "170",
            "Amount": "1",
            "Timestamp": 1536808007,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "1d8d02e1d43ecce7e496b0d50fd25197d16ac4845bef37d54999f66e2a4ccb5b",
            "Signature": "660ff0f17617ac3f67c0f76a851d0b6a499400a89625ce458861c4394dede21ae1027d0249c57acf5917202611455e8d4303f8fccaa2945b8634073530796908",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0",
            "ConfirmedTimes": "29798"
        },
        {
            "Meta": {
                "Height": "1247",
                "Status": 2,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "41dcc050dffaebf17a54caf8c6b36241634852019d7fe754d81732bb03408659",
            "Hash": "e9bb82d6f9ee13a23486da837d1bd951f453ad3a940e05e7756b430dc185f547",
            "Balance": "169",
            "Amount": "1",
            "Timestamp": 1536808004,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "a60bdeaa1b7fda21661e43321d3bcd066a11fe40e75bfddceb52146edb13d23a",
            "Signature": "e8581f19093d39978bf53ab2a1937524021071fdb95ccfe3c092421046a606ecf6f780769315a91a5c2cfe050ce003765630333b3b1b95d9c6e2b5e41479ca08",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0",
            "ConfirmedTimes": "29798"
        },
        {
            "Meta": {
                "Height": "1246",
                "Status": 2,
                "IsSnapshotted": true
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "From": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "FromHash": "d9f0cc6e3b1b96df754146cde281447047f0ea31a91ad87c30ae68675cd47868",
            "PrevHash": "9eec1381ed059e078da226196180bbf3cddd9ce5131a14b32dcb45f370822107",
            "Hash": "41dcc050dffaebf17a54caf8c6b36241634852019d7fe754d81732bb03408659",
            "Balance": "170",
            "Amount": "1",
            "Timestamp": 1536808002,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "a60bdeaa1b7fda21661e43321d3bcd066a11fe40e75bfddceb52146edb13d23a",
            "Signature": "5153be57cafe1e0290f7c7c7dd47e4479413df299c2443c64e2b33f1778c68efcc5bc7087688d875a23ede74148f89818843baba2bfec51dcc57a511213cc90e",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0",
            "ConfirmedTimes": "29799"
        }
    ]
}
```

```json test
{
	"jsonrpc": "2.0",
	"id": 17,
	"method": "ledger_getBlocksByAccAddr",
	"params": ["vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada", 0, 10]
}
```
:::


### ledger_getAccountByAccAddr
获取一个账户的详情,包含账户链的高度，账户的各个token的余额等

- **Parameters**: 
  * string: 需要查询的账户的地址

- **Returns**:

  `Object` : 账户详情
   -  `Addr` : `string` 账户地址
   -  `BalanceInfos` : `Array of Balance` 各个代币的余额信息
	-  `BlockHeight` : `string bigint` 账户交易数量 等同于是账户链高度
  
  `Object` : `Balance` 余额信息
  -  `TokenSymbol` : `string` token的单位比如 人名币 100 元的『元』
  -  `TokenName` : `string` token的名字 比如 人民币
  -  `TokenTypeId` : `string` token id 唯一标识一个token
   -  `Balance` : `string bigint` 账户拥有的该token的余额

- **Example**:

::: demo
```json tab::Request
{
	"jsonrpc": "2.0",
	"id": 5,
	"method": "ledger_getAccountByAccAddr",
	"params": ["vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada"]
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 5,
	"result": {
		"Addr": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
		"BalanceInfos": [{
			"TokenSymbol": "VITE",
			"TokenName": "vite",
			"TokenTypeId": "tti_000000000000000000004cfd",
			"Balance": "86"
		}],
		"BlockHeight": "666"
	}
}
```
```json test
{
	"jsonrpc": "2.0",
	"id": 5,
	"method": "ledger_getAccountByAccAddr",
	"params": ["vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada"]
}
```
:::

### ledger_getUnconfirmedInfo
获取一个账户的待确认交易的详情

- **Parameters**: 
  * string: 需要获取的地址
  
- **Returns**:

  `Object` : 账户详情
    -  `Addr` : `string` 账户地址
    -  `BalanceInfos` : `Array of Balance` 余额信息
    -  `UnConfirmedBlocksLen` : `string bigint` 账户未确认交易数量


- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 10,
	"method": "ledger_getUnconfirmedInfo",
	"params": ["vite_89ab1052584d8e5c68dc4883336da31bc924f355b5cff28f5d"]
}
```
```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 10,
	"result": {
		"Addr": "vite_89ab1052584d8e5c68dc4883336da31bc924f355b5cff28f5d",
		"BalanceInfos": [{
			"TokenSymbol": "VITE",
			"TokenName": "vite",
			"TokenTypeId": "tti_000000000000000000004cfd",
			"Balance": "1"
		}],
		"UnConfirmedBlocksLen": "1"
	}
}
```
```json test
{
	"jsonrpc": "2.0",
	"id": 10,
	"method": "ledger_getUnconfirmedInfo",
	"params": ["vite_89ab1052584d8e5c68dc4883336da31bc924f355b5cff28f5d"]
}
```
:::

### ledger_getLatestSnapshotChainHash
获取最近的快照块的hash

- **Parameters**: null 

- **Returns**: `Hash` snapshot hash

- **Example**:
::: demo
```json tab:Request
{"jsonrpc":"2.0","id":1,"method":"ledger_getLatestSnapshotChainHash","params":null}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7"
}
```
```json test
{"jsonrpc":"2.0","id":1,"method":"ledger_getLatestSnapshotChainHash","params":null}
```
::: 
### ledger_getLatestBlock
获取账户的最近一个交易

- **Parameters**: `Address` 

- **Returns**: `AccountBlock`

- **Example**:
::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ledger_getLatestBlock",
    "params": [
        "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada"
    ]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "Meta": {
            "Height": "1255",
            "Status": 2,
            "IsSnapshotted": true
        },
        "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
        "PrevHash": "a413878c7e4b356155e984c204fd93047d260b5a84e58fe71c5575cd522a7c93",
        "Hash": "1caa4574a46c71846963d35315783765023d47214dbc98ae70bfb8c42a57b7f6",
        "Balance": "169",
        "Amount": "1",
        "Timestamp": 1536808025,
        "TokenId": "tti_000000000000000000004cfd",
        "Data": "",
        "SnapshotTimestamp": "c4c1e3b1a8031524643cbc659dfb86435c8fe4dba919877631c8c2fe63638c5f",
        "Signature": "4f677077002d6a4449ef1daa81981d3e196b6d8b8dac4c74022f9b60889882acb5d5e298e040c19d1827544ece22b7212a624312ba22999a6192ddc8a97bd20b",
        "Nonce": "0000000000",
        "Difficulty": "0000000000",
        "FAmount": "0"
    }
}
```
```json test
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ledger_getLatestBlock",
    "params": ["vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada"]
}
```
::: 

### ledger_getUnconfirmedBlocksByAccAddr
获取账户的待确认交易列表

- **Parameters**: 
  * `string`: `Addr`  要查询的addr
  * `int`:  `Index` 页码
  * `int`: `Count`  每页大小 

- **Returns**: `AccountBlock` 列表

- **Example**:
:::demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getUnconfirmedBlocksByAccAddr",
    "params": [
        "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
        0,
        10
    ]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": [
        {
            "Meta": {
                "Height": "1245",
                "Status": 1,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "a625a1c142f8e79e56364d1bade189eedd4b60554f2396b0bbefb8b11b3a1f68",
            "Hash": "9eec1381ed059e078da226196180bbf3cddd9ce5131a14b32dcb45f370822107",
            "Balance": "169",
            "Amount": "1",
            "Timestamp": 1536807998,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "a60bdeaa1b7fda21661e43321d3bcd066a11fe40e75bfddceb52146edb13d23a",
            "Signature": "509f841e3ab9317fe9fa6f7a0a07b904e2b6e4b1cada907fcb02de51bb0b4d570f83d15a801e4a70184f50e398d845370fe8296f10259cf62c7041749f79980f",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0"
        },
        {
            "Meta": {
                "Height": "140",
                "Status": 1,
                "IsSnapshotted": true
            },
            "AccountAddress": "vite_67aea8f9cf1d8db69812f6bb39e34964f14fce45ee38097eb7",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "1c3fb9a321e365f1a1b18a2ff7c4b57c3acd264f71d06e3ee1ab55feed436b5a",
            "Hash": "a1eeb5495eb4d3c5bcee2552bac96c237511ecb9b769bcbec5bb46062d1943a7",
            "Balance": "2509000000000000000000",
            "Amount": "10000000000000000000",
            "Timestamp": 1536810531,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "12d0b6b8ea79767ff0ccca1a43b246c3a0f7515f654233e0fb04808cfd2d1b72",
            "Signature": "12fed7abe74bc7fc558ed6004b3a1037da046507940d23bb14ed91f01ba527006b38cd3c23051f16b85b4bc63bd93dcab0db536a7a1bffa1dafafa1905f7680c",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0"
        },
        {
            "Meta": {
                "Height": "141",
                "Status": 1,
                "IsSnapshotted": true
            },
            "AccountAddress": "vite_67aea8f9cf1d8db69812f6bb39e34964f14fce45ee38097eb7",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "a1eeb5495eb4d3c5bcee2552bac96c237511ecb9b769bcbec5bb46062d1943a7",
            "Hash": "504eae3869ddbbfe350130cb51ed71676dbb9786bd85c5ffe6d79a752097190b",
            "Balance": "2499000000000000000000",
            "Amount": "10000000000000000000",
            "Timestamp": 1536810538,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "b6404d6fcb0b4b47ba8aa2de5e6d0e8c8a1e4f2ec4e70b1d2342f5cbb24bdba9",
            "Signature": "693a27aa34d8c6c189f16647c39d5078cbe84eac9153641a1cb3c5616e2a7c1968d57f124dbcafb2219971c78e65a8f1aa3ab7b1947a0b0250604a6b6f426f09",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": "0"
        }
    ]
}
    
```
```json test
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getUnconfirmedBlocksByAccAddr",
    "params": [
        "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
        0,
        10
    ]
}
```
:::

### ledger_getTokenMintage
获取某个token的铸币详情

- **Parameters**: `string` : `TokenTypeId`

- **Returns**: `Object`
   -  `Name` : `string` 币的名称
   -  `Id` : `TokenTypeId` 币的iD
   -  `Symbol` : `string` 币的单位
   -  `Owner` : `Address` 币的创建者
   -  `Decimals` : `int` 币的最小分割单位
   -  `TotalSupply` : `string bigint` 币的总量 

- **Example**:

::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ledger_getTokenMintage",
    "params": [
        "tti_000000000000000000004cfd"
    ]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
        "Name": "vite",
        "Id": "tti_000000000000000000004cfd",
        "Symbol": "VITE",
        "Owner": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
        "Decimals": 18,
        "TotalSupply": "1000000000"
    }
}
```
```json test
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ledger_getTokenMintage",
    "params": [
        "tti_000000000000000000004cfd"
    ]
}
```
:::
### ledger_getBlocksByHash
从某个账户链获取某个交易的hash开始向前得N个块

- **Parameters**: 
    - `string` : `address` 要获取的账户
    - `string` : `hash`  起始的交易Hash
    - `int` :   需要获取的长度

- **Returns**: `AccountBlock`列表

- **Example**:

::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getBlocksByHash",
    "params": [
        "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
        "eda7915d62c8fb23e6aa4483f4a4467fd76238d852da6c85269bf57a93bae4fd",
        2
    ]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 2,
    "result": [
        {
            "Meta": {
                "Height": 976,
                "Status": 0,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "PublicKey": "0f29d2519749da79ed9078654a657dd1b94b4f402b8f78e5a3574c9eb8931ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "284e180920b5b1b5d43aa6cfe4bef2ed4b08f68c7688b492d3767c342250cebc",
            "Hash": "eda7915d62c8fb23e6aa4483f4a4467fd76238d852da6c85269bf57a93bae4fd",
            "Balance": 10,
            "Amount": 1,
            "Timestamp": 1536674382,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "9ed62276cd6e3603fe3d0fd994d02affc15258cc8db053460142fbe68ed77c97",
            "Signature": "8feba549231012023b2101231e8966a41535ef05fbca4557f0da69361d24a38c060f871b0885a8389120a1d90457089d3647e9c9412050894c3ae2058e31e40f",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": 0,
            "ConfirmedTimes": 8880
        },
        {
            "Meta": {
                "Height": 975,
                "Status": 0,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "PublicKey": "0f29d2519749da79ed9078654a657dd1b94b4f402b8f78e5a3574c9eb8931ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "a4b8155e9ad783a1ec77d871ee86791ede88a26ff596607e5fa497713a55caf3",
            "Hash": "284e180920b5b1b5d43aa6cfe4bef2ed4b08f68c7688b492d3767c342250cebc",
            "Balance": 11,
            "Amount": 1,
            "Timestamp": 1536674381,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "dbb81337d709eec4ce6a29ef134b6f8fce7e4b701a23d20836cfb61bac1841ff",
            "Signature": "49557b1426338886c859891616b48b29f71eacbc508ed43548531a6c03b42b6b564d6fdb84047df8f9fb2c52ba74b7c42aeb81fb6289a2117d1972eebb16810b",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": 0,
            "ConfirmedTimes": 8880
        }
    ]
}
```
```json test
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "ledger_getBlocksByHash",
    "params": [
        "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
        "eda7915d62c8fb23e6aa4483f4a4467fd76238d852da6c85269bf57a93bae4fd",
        2
    ]
}
```
:::
### ledger_getInitSyncInfo
实时地去获取 初始化过程

- **Parameters**: `none`

- **Returns**: `Object`
   -  `StartHeight` : `string bigint` 初始化开始的快照链高度
   -  `TargetHeight` : `string bigint` 初始化要去同步的目标快照链高度
   -  `CurrentHeight` : `string bigint` 当前同步到的高度
   -  `IsFirstSyncDone` : `bool` 是否初始化完成
   -  `IsStartFirstSync` : `bool` 是否开始初始化，如果这个值是false 以上四个值都不可用

- **Example**:

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"method": "ledger.GetInitSyncInfo",
	"id": 12
}
```
```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 12,
	"result": "{\"StartHeight\":\"1\",\"TargetHeight\":\"3\",\"CurrentHeight\":\"2\",\"IsFirstSyncDone\":false,\"IsStartFirstSync\":true}"
}
```
```json test
{
	"jsonrpc": "2.0",
	"method": "ledger.GetInitSyncInfo",
	"id": 12
}
```
:::


### ledger_getSnapshotChainHeight
获取当前快照链高度

- **Parameters**: `none`

- **Returns**: `string bigint`
 当前快照链高度

- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "ledger_getSnapshotChainHeight",
	"params": null
}

```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "161646"
}
```
```json test
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "ledger_getSnapshotChainHeight",
	"params": null
}

```
:::
### types_isValidHexAddress
判断一个字符串是否是合法的地址

- **Parameters**: 

  * string : 待校验的string

- **Returns**: `bool` : 是否是合法地址

- **Example**:

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "types_isValidHexAddress",
	"params": ["vite_1cb2ab2738cd913654658e879bef8115eb1aa61a9be9d15c3a"]
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 3,
	"result": "true"
}
```
```json test
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "types_isValidHexAddress",
	"params": ["vite_1cb2ab2738cd913654658e879bef8115eb1aa61a9be9d15c3a"]
}
```
:::

### types_isValidHexTokenTypeId
判断一个字符串是否是合法的tokentypeid

- **Parameters**: 

  * `string`: 待校验的string


- **Returns**: `bool` : 是否是合法tokentypeid

- **Example**:

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "types_isValidHexTokenTypeId",
	"params": ["asd"]
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 2,
	"result": "false"
}
```
```json test
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "types_isValidHexTokenTypeId",
	"params": ["asd"]
}
```
:::
### common_logDir
返回go-vite的日志文件夹

- **Parameters**: none


- **Returns**: `string` : 返回go-vite的日志文件夹

- **Example**:

::: demo
```json tab:Request
{"jsonrpc":"2.0","id":1,"method":"common_logDir","params":null}
```

```json tab:Response
{"jsonrpc":"2.0","id":1,"result":"/Users/xxx/viteisbest/runlog"}
```
```json test
{"jsonrpc":"2.0","id":1,"method":"common_logDir","params":null}
```
:::

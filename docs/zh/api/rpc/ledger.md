# Ledger

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
| Balance |  big.Int |  &#x2713; | &#x2713;|该交易发生后账户余额|
| Amount |  big.Int |  &#x2713; | &#x2713;|该交易发生的金额|
| Timestamp |  秒 |  &#x2713; | &#x2713;|该交易发生的时间戳|
| TokenId |  TokenTypeId |  &#x2713; | &#x2713;|该交易的币种ID|
| LastBlockHeightInToken |  秒 |  &#x2715; | &#x2715;|该账户链上一个同币种交易的高度|
| Data |  string |  &#x2715; | &#x2715;|可用作交易备注|
| SnapshotTimestamp | hex format 256Hash  |  &#x2713; | &#x2713;|快照块秒为单位时间戳的256Hash |
| Signature |  hex format 256Hash |  &#x2713; | &#x2713;|交易的签名|
| Nonce |  hex format 256Hash |  &#x2713; | &#x2713;|该交易Pow的nonce|
| Difficulty |  hex format 256Hash |  &#x2713; | &#x2713;|该交易Pow的|
| ConfirmedTimes |  big.Int |  &#x2715; | &#x2713;|该交易被确认的次数|

### AccountBlockMeta
|  名称  | 类型 | 发送时必填 |返回时必有|说明 |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| Height |  big.Int |  &#x2713; | &#x2713;|作为返回标识账户链的高度，作为发送应该把获取到底Height+1填倒这里|
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
    	* -34001 密码错误
    	* -35001 余额不足


### ledger_createTxWithPassphrase
创建一个转账交易

- **Parameters**:

  * `SelfAddr`: `string of addr`  交易的发起方
  * `ToAddr`: `string of addr`  交易的接收方
  * `Passphrase`: `string`  交易发起方的账户密码
  * `TokenTypeId`: `string of tokentypeid`  交易的币种id
  * `Amount`:`big int`  交易数量，按照该币种的最小分割单位

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
```json test:测试
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
    "id": 3,
    "result": [
        {
            "Meta": {
                "Height": 985,
                "Status": 1,
                "IsSnapshotted": true
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "f5b4e253491e21e5a2e6dc75bbd417274a8f224fc43d0f41b42766a4b5449398",
            "Hash": "de657fa44954f9fba7ffc61e24894508d1e53c92154c325121496414bc1c9e4d",
            "Balance": 1,
            "Amount": 1,
            "Timestamp": 1536674398,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "76fac6609fc0a89b9e700d78e8f3496295f0bc53b89b706fdf0d4a80e81ff09b",
            "Signature": "7a89c3398c751f977d9b5d322a8b9d399adde8238ee8fd1c058e4eb07b75aebd00db0129d250cfac5d8fa4f70f7d9bf76ce2303658a409be6dbadb516ab6ad05",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": 0,
            "ConfirmedTimes": 6544
        },
        {
            "Meta": {
                "Height": 984,
                "Status": 1,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "deb013a550186ecf25ff0a1c2a74afd22557bd1e6a8bba82b5ca56ab943bec77",
            "Hash": "f5b4e253491e21e5a2e6dc75bbd417274a8f224fc43d0f41b42766a4b5449398",
            "Balance": 2,
            "Amount": 1,
            "Timestamp": 1536674397,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "76fac6609fc0a89b9e700d78e8f3496295f0bc53b89b706fdf0d4a80e81ff09b",
            "Signature": "2fc9760469756a615fb7b95c7efb8361cd3323f67af9a06add04814a0c95e15292b4413711bfa312ec8e3d5211383ca5483521d010b7c2c943fe4c0048f3e501",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": 0,
            "ConfirmedTimes": 6544
        },
        {
            "Meta": {
                "Height": 983,
                "Status": 1,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "7ccecfc3afcd03b39208109d6d6001c039af90cc56c03b3599b375bcdbf16bee",
            "Hash": "deb013a550186ecf25ff0a1c2a74afd22557bd1e6a8bba82b5ca56ab943bec77",
            "Balance": 3,
            "Amount": 1,
            "Timestamp": 1536674395,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "76fac6609fc0a89b9e700d78e8f3496295f0bc53b89b706fdf0d4a80e81ff09b",
            "Signature": "2ed4fc80d86fc495fdee1ff67a8ad7ebf758843c57d516c48932f7e09dd6a579d69af8caf3df85387a22d68ee59de68f1a62e4a9ed604c26ffa23d8e9a5b1804",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": 0,
            "ConfirmedTimes": 6544
        }
    ]
}
```

```json test:Request
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
	-  `BlockHeight` : `string of bigint` 账户交易数量 等同于是账户链高度
  
  `Object` : `Balance` 余额信息
  -  `TokenSymbol` : `string` token的单位比如 人名币 100 元的『元』
  -  `TokenName` : `string` token的名字 比如 人民币
  -  `TokenTypeId` : `string` token id 唯一标识一个token
   -  `Balance` : `string of bigint` 账户拥有的该token的余额

- **Example**:

::: demo
```json tab:Request
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
```json test:Request
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
    -  `UnConfirmedBlocksLen` : `string of bigint` 账户未确认交易数量


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
```json test:Request
{
	"jsonrpc": "2.0",
	"id": 10,
	"method": "ledger_getUnconfirmedInfo",
	"params": ["vite_89ab1052584d8e5c68dc4883336da31bc924f355b5cff28f5d"]
}
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
            "Height": 985,
            "Status": 1,
            "IsSnapshotted": true
        },
        "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
        "PrevHash": "f5b4e253491e21e5a2e6dc75bbd417274a8f224fc43d0f41b42766a4b5449398",
        "Hash": "de657fa44954f9fba7ffc61e24894508d1e53c92154c325121496414bc1c9e4d",
        "Balance": 1,
        "Amount": 1,
        "Timestamp": 1536674398,
        "TokenId": "tti_000000000000000000004cfd",
        "Data": "",
        "SnapshotTimestamp": "76fac6609fc0a89b9e700d78e8f3496295f0bc53b89b706fdf0d4a80e81ff09b",
        "Signature": "7a89c3398c751f977d9b5d322a8b9d399adde8238ee8fd1c058e4eb07b75aebd00db0129d250cfac5d8fa4f70f7d9bf76ce2303658a409be6dbadb516ab6ad05",
        "Nonce": "0000000000",
        "Difficulty": "0000000000",
        "FAmount": 0
    }
}
```
```json test:Request
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ledger_getLatestBlock",
    "params": ["vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada"]
}
```

### ledger_getUnconfirmedBlocksByAccAddr
获取账户的待确认交易列表

- **Parameters**: 
  * `string`: `Addr`  要查询的addr
  * `int`:  `Index` 页码
  * `int`: `Count`  每页大小 

- **Returns**: `AccountBlock` 列表

- **Example**:
::: demo

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
                "Height": 789,
                "Status": 1,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "a6555d57e77723dd17bbb8a9b4204141184be7b68e7307ffdfed444cc8f59eb2",
            "Hash": "30ad134de9639b46f8f2600e87ccc15909686ed4e22b4beeb0103f4c0fd7b6e5",
            "Balance": 57,
            "Amount": 1,
            "Timestamp": 1536650495,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "b6828d59bdf58b73fd0d36fa1be9c0a410653ba891905294c5f8abc1e3b58b53",
            "Signature": "831a7c88080887c92ccf9e9e87d8d41391a8da81fd0ca2bf5c4af07c1eddf326a2268650c4ca36917566300226d059913d4c94d5b09264ae805218d658146304",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": 0
        },
        {
            "Meta": {
                "Height": 795,
                "Status": 1,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "c879d8ec7cea235c46ffddde113c63ca7413c5c8722df209d6ad3256d51f6bbf",
            "Hash": "5fe77d257a472835af2d0cdca57572ac0ea6be234f95255f26bfad66a73820a5",
            "Balance": 59,
            "Amount": 1,
            "Timestamp": 1536650505,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "f23ff46b23e77f8891478069cb60461020b1ae1a69c08d538cb1dbfc995ee39f",
            "Signature": "16e025576b991b57152986ac70c7a4ba796287ca5ed7a65fce0f0844de34d091c97c1da23d480a5aa3d418f95bf57d539087d65dbc84b63968b2d77e4f28ff02",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": 0
        },
        {
            "Meta": {
                "Height": 816,
                "Status": 1,
                "IsSnapshotted": false
            },
            "AccountAddress": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
            "To": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
            "PrevHash": "06bc14839586324b5c88279a284eaea223914f90920dc2b25d88453f24860f6c",
            "Hash": "cb757e0ddebd6c87b19b3c94a050e9ce54181485d177455e7c846d9d2d57bed9",
            "Balance": 66,
            "Amount": 1,
            "Timestamp": 1536650543,
            "TokenId": "tti_000000000000000000004cfd",
            "Data": "",
            "SnapshotTimestamp": "03c784ba619f07070d01620906db381e601f23eac8e941427b6ce36a3e30bf46",
            "Signature": "fa2521a8734dd8a852043c0f95da884d901915be08652107b5ac1afe803ad7c66bfc2ffd2afd4b30c5ac42c92bed317b6726d1c93a8e291c1b19f75bf98a4204",
            "Nonce": "0000000000",
            "Difficulty": "0000000000",
            "FAmount": 0
        }
    ]
}
    
```
```json test:Request
{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ledger_getLatestBlock",
    "params": ["vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada"]
}
```




### ledger_getInitSyncInfo
实时地去获取 初始化过程

- **Parameters**: `none`

- **Returns**: `Object`
   -  `StartHeight` : `string of bigint` 初始化开始的快照链高度
   -  `TargetHeight` : `string of bigint` 初始化要去同步的目标快照链高度
   -  `CurrentHeight` : `string of bigint` 当前同步到的高度
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
```json test:Request
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

- **Returns**: `string of bigint`
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
```json test:Request
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
```json test:Request
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
```json test:Request
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
```json test:Request
{"jsonrpc":"2.0","id":1,"method":"common_logDir","params":null}
```
:::

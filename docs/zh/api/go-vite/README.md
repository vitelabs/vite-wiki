---
sidebarDepth: 4
title: RPC 接口
sidebar: auto
---

# RPC 接口

## 说明
* **IPC方式**：支持所有API调用

    1. **\*nix(linux darwin)**: `Unix domain Socket` 文件名称    `$HOME/viteisbest/vite.ipc`

    2. **Windows**: Named Pipe 受限于Windows的规范 文件名就是  `\\.\pipe\vite.ipc`
* **Http**：仅支持公共API(非wallet模块) 默认端口**48132**

* **WebSocket**：仅支持公共API(非wallet模块) 默认端口**31420**
* **不足**:

    1. 暂时不支持发布订阅模式，后续会支持；

    2. 项目迭代很快，目前的API在之后版本中会很大改变。

* **注意**:
    1. 尽量使用标准的 ***Json rpc2*** 的库
    2. 术语 交易（transaction 或者Tx） = account block

* **常见业务错误汇总**:

|  描述 | code | message | example |
|:------------:|:-----------:|:-----:|:-----:|
| 余额不足|  `-35001` |  The balance is not enough. |{"code":5001,"message":"The balance is not enough."}|
| 密码错误	|  `-34001` | error decrypting key |{"code":4001,"message":"error decrypting key"}|
| 账户重复解锁	|  `-34002` |  the address was previously unlocked |{"code":4002,"message":"the address was previously unlocked"}|

## JSON-RPC Support

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting|&#x2713;|

## API Reference


### wallet_listAddress
返回所有在标准Keystore目录下的地址

- **Parameters**: `none`

- **Returns**: 
	- `Array of HexAddress String` 所有在标准Keystore目录下的地址

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"wallet_listAddress",
   "params":null
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result":[  
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
      "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
      "vite_a394f8dd8ee65b33e30f3fe250a61be138317ad901b03448d5"
   ]
}

```
:::

### wallet_newAddress 
新建一个账户，需要用户输入一个密码

- **Parameters**: `string` - 密码

- **Returns**: `string`  新生成的账户的地址的字符串

- **Example**:

::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "wallet_newAddress",
    "params": [
        "123456"
    ]
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 3,
	"result": "vite_7cf6dd1dd4deb68d29a56326091652595f4b93d8f60e4132f9"
}
```
:::

### wallet_status

返回所有账户的解锁状态

- **Parameters**: `none`

- **Returns**: `map` 所有账户的锁定状态，如果账户处于解锁状态则返回`Unlocked`，反之则返回`Locked`

- **Example**: 

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "wallet_status",
	"params": null
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 5,
	"result": {
		"vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada": "Locked",
		"vite_535c28d4adef167de88d22b946cb29727fd11086382df777cd": "Locked",
		"vite_7cf6dd1dd4deb68d29a56326091652595f4b93d8f60e4132f9": "Unlocked",
		"vite_8e019a4a134bb7e16aea1ea11c7a807fab36641a22c8c911b1": "Locked"
	}
}
```
:::

### wallet_unlockAddress
解锁账户，解锁成功后账户会不停去自动确认它的待接受的交易

- **Parameters**: 

  1. string: 有效的地址
  *  string: 该地址对应的keystore文件的密码
  *  uint64: 账户保持解锁状态的时间，单位秒，缺省或者`<=0`都认为是一直保持解锁，不会自动上锁


- **Returns**:

  * 解锁成功 返回 true
  * 密码错误导致的解锁失败  code -34001
  * 解锁一个已经解锁的账号  code -34002

- **Example**:

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 4,
	"method": "wallet_unlockAddress",
	"params": ["vite_7cf6dd1dd4deb68d29a56326091652595f4b93d8f60e4132f9", "123456", 0]
}
```

```json tab:Response Success
{
	"jsonrpc": "2.0",
	"id": 6,
	"result": true
}
```

```json tab:Error by wrong password
{
	"jsonrpc": "2.0",
	"id": 7,
	"error": {
		"code": -34001,
		"message": "error decrypting key"
	}
}
```

```json tab:Error by unlock an unlocked address
{
	"jsonrpc": "2.0",
	"id": 4,
	"error": {
		"code": -34002,
		"message": "the address was previously unlocked"
	}
}
```
:::

### wallet_lockAddress
锁定账户

- **Parameters**: 

  * string: 需要加锁的地址

- **Returns**: `none` （锁定一个未解锁的账户不认为是错误）

- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 9,
	"method": "wallet_lockAddress",
	"params": ["vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"]
}
```
```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 9,
	"result": null
}
```
:::


### wallet_reloadAndFixAddressFile
强制更新keystore文件夹下文件，会修复错误的文件名，更新wallet中的Address 缓存，即使不调用这个方法，内部也会每隔几秒调用一次

- **Parameters**: `none`

- **Returns**: `none`

- **Example**:

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "wallet_reloadAndFixAddressFile",
	"params": null
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": null
}
```
:::

### wallet_isMayValidKeystoreFile
判断任意一个文件是否可能是Keystore文件，如果文件符合keystore文件规范，就返回这个keystore文件的包含的addrees但这不意味这个文件完全有效，因为判断文件完全有效只能用密码去尝试解密才知道

- **Parameters**: 
	- `string` : 要判断的keystore的文件路径

- **Returns**: 
 	-  `Maybe` : `bool` true代表可能是个keystore，false代表肯定不是
	- `MayAddress`: `string` 如果`Maybe`是`true`则返回可能的地址，不然则返回一个默认的地址


- **Example**:

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "wallet_isMayValidKeystoreFile",
	"params": ["/Users/xxxx/viteisbest/wallet/vite_89ab1052584d8e5c68dc4883336da31bc924f355b5cff28f5d"]
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"Maybe": true,
		"MayAddress": "vite_89ab1052584d8e5c68dc4883336da31bc924f355b5cff28f5d"
	}
}
```
:::


### wallet_getDataDir
获得钱包的keystore文件夹路径

- **Parameters**: `none`

- **Returns**: ` string ` keystore文件夹路径

- **Example**:

::: demo

```json tab:Request
{"jsonrpc":"2.0","id":1,"method":"wallet_getDataDir","params":null}
```

```json tab:Response
{"jsonrpc":"2.0","id":1,"result":"/Users/xxx/viteisbest/wallet"}
```

:::


### p2p_networkAvailable
现在节点网络是否可用

- **Parameters**: `none`

- **Returns**: `bool`  

- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "p2p_networkAvailable",
	"params": null
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 2,
	"result": true
}
```
```json test:测试
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "p2p_networkAvailable",
	"params": null
}
```
:::

### p2p_peersCount
当前节点连接的外部节点数量

- **Parameters**: `none`

- **Returns**: `int` 

- **Example**: 

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "p2p_peersCount",
	"params": null
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 3,
	"result": 10
}
```
```json test:测试
{
	"jsonrpc": "2.0",
	"id": 3,
	"method": "p2p_peersCount",
	"params": null
}
```
:::

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


- **Returns**:  交易列表
  
  * `block`:
     -  `Timestamp` : `uint64` 交易时间戳 单位秒
     -  `FromAddr` :  `string of addr` 如果此字段不为空表示这是一个响应交易。 什么是响应交易 请参考白皮书
     -  `ToAddr` :  `string of addr` 交易的目的地址
     -  `Status` :  `int` 0 是状态错误, 1 表示没有结对的响应交易, 2 代表已经有结对的响应交易
     -  `Hash` :  `string of bigint` 交易的Hash
     -  `Balance` :  `string of bigint` 当前vite余额。 todo 后续会改成map结构
     -  `ConfirmedTimes` :  `string of bigint` 当前交易被快照链确认次数

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
	"result": [{
		"Timestamp": 1536148531,
		"Amount": "1",
		"FromAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
		"ToAddr": "vite_89ab1052584d8e5c68dc4883336da31bc924f355b5cff28f5d",
		"Status": 2,
		"Hash": "3387d262a38343fd5e413efd7124361994477ced20d26050ca0cba43c8ab49a9",
		"Balance": "85",
		"ConfirmedTimes": ""
	}, {
		"Timestamp": 1535809141,
		"Amount": "1",
		"FromAddr": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
		"ToAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
		"Status": 2,
		"Hash": "2ed46e222678ad60b675909212a327ed1084fcc7580f6e955c6b74a8247981ca",
		"Balance": "86",
		"ConfirmedTimes": "37886"
	}, {
		"Timestamp": 1535809138,
		"Amount": "1",
		"FromAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
		"ToAddr": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
		"Status": 2,
		"Hash": "3d145ed11fe0e9826f7ac3d2540b9f30999544611931f6082e607dca6a21cc0a",
		"Balance": "85",
		"ConfirmedTimes": "37886"
	}, {
		"Timestamp": 1535809136,
		"Amount": "1",
		"FromAddr": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
		"ToAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
		"Status": 2,
		"Hash": "c0f6d84fb89bb263dc57f6bb23634c4ef04d95fd52b42fd3be815bcb31ce7773",
		"Balance": "86",
		"ConfirmedTimes": "37886"
	}, {
		"Timestamp": 1535809132,
		"Amount": "1",
		"FromAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
		"ToAddr": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
		"Status": 2,
		"Hash": "bfb61bcca11dbd6787c27a58908ac345a098d224ca20e47f5a2f76120af63e38",
		"Balance": "85",
		"ConfirmedTimes": "37886"
	}, {
		"Timestamp": 1535809130,
		"Amount": "1",
		"FromAddr": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
		"ToAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
		"Status": 2,
		"Hash": "a7103f1e98987ef8e7f59ae3c313aba4c6c3669cb906a04545d484f54580f484",
		"Balance": "86",
		"ConfirmedTimes": "37886"
	}, {
		"Timestamp": 1535809127,
		"Amount": "1",
		"FromAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
		"ToAddr": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
		"Status": 2,
		"Hash": "2bc0d0ba46652074a034f559c772b99875d8b6f21b6119d5a5a57bfc84af95da",
		"Balance": "85",
		"ConfirmedTimes": "37886"
	}, {
		"Timestamp": 1535809125,
		"Amount": "1",
		"FromAddr": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
		"ToAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
		"Status": 2,
		"Hash": "63f07cf2e3152230df93d116e9bb6d8005ac089813b3c70076b50b09b380b5c2",
		"Balance": "86",
		"ConfirmedTimes": "37886"
	}, {
		"Timestamp": 1535809121,
		"Amount": "1",
		"FromAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
		"ToAddr": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
		"Status": 2,
		"Hash": "db904308129c31441db60876bf78518dec0554fa05caf5776df7df89243ac752",
		"Balance": "85",
		"ConfirmedTimes": "37887"
	}, {
		"Timestamp": 1535809119,
		"Amount": "1",
		"FromAddr": "vite_c5adc192ec5a6661e49dc312e56d870550642abcc827134c7e",
		"ToAddr": "vite_0000000000000000000000000000000000000000a4f3a0cb58",
		"Status": 2,
		"Hash": "a46c724df5077126dd0acc89323bd4deaaec6d5aa37f47288a85b382f84c0157",
		"Balance": "86",
		"ConfirmedTimes": "37887"
	}]
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

### ledger.GetInitSyncInfo
实时地去获取 初始化过程x

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

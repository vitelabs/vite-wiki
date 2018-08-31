---
sidebarDepth: 4
title: RPC 接口
sidebar: auto
---

# RPC 接口

## 说明
* **这一期暂时只支持IPC方式调用具体各平台实现**：

    1. **\*nix(linux darwin)**: `Unix domain Socket` 文件名称    `$HOME/viteisbest/vite.ipc`

    2. **Windows**: Named Pipe 受限于Windows的规范 文件名就是  `\\.\pipe\vite.ipc`

* **不足**:

    1. 这一期使用的RPC框架非常轻量导致，接受的参数必须是数组或者其它数据类型，所以类似于 `wallet.NewAddress()` 虽然只需要接受一个参数，也必须传递一个长度为1的数组进来，会在后面合适的时候改造这一块；

    2. 暂时不支持发布订阅模式，后续会支持；

    3. 项目迭代很快，目前的API在之后版本中会很大改变。

* **注意**:
    1. 尽量使用标准的 ***Json rpc2*** 的库
    2. 术语 交易（transaction 或者Tx） = account block

* **业务错误汇总**:

|  描述 | code | message | example |
|:------------:|:-----------:|:-----:|:-----:|
| 余额不足|  `5001` |  The balance is not enough. |{"code":5001,"message":"The balance is not enough."}|
| 密码错误	|  `4001` | error decrypting key |{"code":4001,"message":"error decrypting key"}|
| 账户重复解锁	|  `4002` |  the address was previously unlocked |{"code":4002,"message":"the address was previously unlocked"}|

## JSON-RPC Support

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |
|:------------:|:-----------:|:-----:|:-----:|
| &#x2713;|  waiting |  &#x2713; |waiting|

## API Reference


### wallet.ListAddress
返回所有在标准Keystore目录下的地址

- **Parameters**: `none`

- **Returns**: `Array of HexAddress String`

  所有在标准Keystore目录下的地址

- **Example**:


::: demo


```json tab:Request
{
	"jsonrpc": "2.0",
	"method": "wallet.ListAddress",
	"id": 0
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 0,
	"result": "[\"vite_94b3d5a813d13214cad0c7f2984a738224254ccd939f6dc389\",\"vite_3db2796c14ce9d77391a1aa2eb4174c14386cdea18095320ae\"]"
}
```

:::

### wallet.NewAddress
新建一个账户，需要用户输入一个密码

- **Parameters**: `Array of String` 

  * Array[0] = password

- **Returns**: `string`  新生成的账户的地址

- **Example**:

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"method": "wallet.NewAddress",
	"params": ["123456"],
	"id": 1
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "vite_e2fa75b28da5e60a4d775bf915d58bf78b0a8d5ab0123bddc1"
}
```
:::

### wallet.Status

返回所有账户的解锁状态

- **Parameters**: `none`

- **Returns**: `map` 所有账户的锁定状态

- **Example**: 

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"method": "wallet.Status",
	"id": 2
}
```

```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 2,
	"result": "{\"vite_3db2796c14ce9d77391a1aa2eb4174c14386cdea18095320ae\":\"Locked\",\"vite_94b3d5a813d13214cad0c7f2984a738224254ccd939f6dc389\":\"Locked\",\"vite_e2fa75b28da5e60a4d775bf915d58bf78b0a8d5ab0123bddc1\":\"Unlocked\"}"
}
```
:::

### wallet.UnLock
解锁账户，解锁成功后账户会不停去自动确认它的待接受的交易

- **Parameters**: `Array of String `

  * Array[0] = hexAddr
  * Array[1] = password
  * Array[2] = UnLockTime (单位秒 如果UnLockTime等于0 表示账户不会自动上锁，会一直保持解锁状态)


- **Returns**:

  * 解锁成功 返回 `success`
  * 密码错误导致的解锁失败  code 4001
  * 解锁一个已经解锁的账号  code 4002

- **Example**:

::: demo
```json tab:Request
{
	"jsonrpc": "2.0",
	"method": "wallet.UnLock",
	"params": ["vite_3db2796c14ce9d77391a1aa2eb4174c14386cdea18095320ae", "123456", "0"],
	"id": 3
}
```

```json tab:Response Success
{
	"jsonrpc": "2.0",
	"id": 3,
	"result": "success"
}
```

```json tab:密码错误
{
	"jsonrpc": "2.0",
	"id": 5,
	"result": "{\"code\":4001,\"message\":\"error decrypting key\"}"
}
```

```json tab:解锁一个账户
{
	"jsonrpc": "2.0",
	"id": 6,
	"result": "{\"code\":4002,\"message\":\"the address was previously unlocked\"}"
}
```
:::

### wallet.Lock
锁定账户

- **Parameters**: `Array of String` 

  * Array[0] = hexAddr

- **Returns**: `none` （锁定一个未解锁的账户不认为是错误）

- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "2.0",
	"method": "wallet.Lock",
	"params": ["vite_e2fa75b28da5e60a4d775bf915d58bf78b0a8d5ab0123bddc1"],
	"id": 11
}
```
```json tab:Response
{
	"jsonrpc": "2.0",
	"id": 11,
	"result": ""
}
```
:::


### wallet.ReloadAndFixAddressFile
强制更新keystore文件夹下文件，会修复错误的文件名，更新wallet中的Address 缓存，即使不调用这个方法，内部也会每个几秒调用一次

- **Parameters**: `none`

- **Returns**: `none`

- **Example**:

```js
// request
{
	"jsonrpc": "2.0",
	"method": "wallet.ReloadAndFixAddressFile",
	"id": 12
}
// response
{
	"jsonrpc": "2.0",
	"id": 12
}
```

### wallet.IsMayValidKeystoreFile
判断任意一个文件是否可能是Keystore文件，如果文件符合keystore文件规范，就返回这个keystore文件的包含的addrees但这不意味这个文件完全有效，判断文件完全有效只能用密码去尝试解密才知道，如果确定这**一定不是**一个keystore文件则返回空，

- **Parameters**: `none`

- **Returns**: `string` 如果格式正确并且能解析出包含的地址 则返回地址


- **Example**:

```js
// request
{
	"jsonrpc": "2.0",
	"method": "wallet.IsMayValidKeystoreFile",
	"id": 12
}
// response 
{
	"jsonrpc": "2.0",
	"id": 12,
	"result": "vite_3db2796c14ce9d77391a1aa2eb4174c14386cdea18095320ae"
}
```

### wallet.GetDataDir
获得钱包的keystore文件夹路径

- **Parameters**: `none`

- **Returns**: ` string ` keystore文件夹路径

- **Example**:

```js
// request
{
	"jsonrpc": "2.0",
	"method": "wallet.GetDataDir",
	"id": 1
}
// response
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "/Users/xxx/viteisbest/wallet"
}
```

### p2p.NetworkAvailable
现在节点网络是否可用

- **Parameters**: `none`

- **Returns**: `bool`  

- **Example**:

```js
// request
{
	"jsonrpc": "2.0",
	"method": "p2p.NetworkAvailable",
	"id": 5
}
// response
{
	"jsonrpc": "2.0",
	"id": 5,
	"result": "false"
}
```

### p2p.PeersCount
当前节点连接的外部节点数量

- **Parameters**: `none`

- **Returns**: `int`

- **Example**: 

```js
// request
{
	"jsonrpc": "2.0",
	"method": "p2p.PeersCount",
	"id": 6
}
// response
{
	"jsonrpc": "2.0",
	"id": 6,
	"result": "1"
}
```

### ledger.CreateTxWithPassphrase
创建一个转账交易

- **Parameters**:

  * `SelfAddr`: `string of addr`  交易的发起方
  * `ToAddr`: `string of addr`  交易的接收方
  * `Passphrase`: `string`  交易发起方的账户密码
  * `TokenTypeId`: `string of tokentypeid`  交易的币种id
  * `Amount`:`big int`  交易数量，按照该币种的最小分割单位

- **Returns**: ` string `

  success 可能的错误有:
    * 4001 密码错误
    * 5001 余额不足

- **Example**:

```js
// request
{
	"jsonrpc": "2.0",
	"method": "ledger.CreateTxWithPassphrase",
	"params": {
		"SelfAddr": "vite_e2fa75b28da5e60a4d775bf915d58bf78b0a8d5ab0123bddc1",
		"ToAddr": "vite_94b3d5a813d13214cad0c7f2984a738224254ccd939f6dc389",
		"Passphrase": "123456",
		"TokenTypeId": "tti_000000000000000000004cfd",
		"Amount": "1"
	},
	"id": 8
}
// response
{
	"jsonrpc": "2.0",
	"id": 8,
	"result": "success"
}
```

### ledger.GetBlocksByAccAddr
获得一个账户的交易列表

- **Parameters**:

  * `Addr`: `string of addr`  要查询的addr
  * `Index`: `int`  页码
  * `Count`: `int`  每页大小


- **Returns**: `Array of blocks` 交易列表
  
  * `block`:
     -  `Timestamp` : `uint64` 交易时间戳 单位秒
     -  `FromAddr` :  `string of addr` 如果此字段不为空表示这是一个响应交易。 什么是响应交易 请参考白皮书
     -  `ToAddr` :  `string of addr` 交易的目的地址
     -  `Status` :  `int` 0 是状态错误, 1 表示没有结对的响应交易, 2 代表已经有结对的响应交易
     -  `Hash` :  `string of bigint` 交易的Hash
     -  `Balance` :  `string of bigint` 当前vite余额。 todo 后续会改成map结构
     -  `ConfirmedTimes` :  `string of bigint` 当前交易被快照链确认次数

- **Example**:

```js
// request
{
	"jsonrpc": "2.0",
	"method": "ledger.GetBlocksByAccAddr",
	"params": {
		"Addr": "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68",
		"Index": 0,
		"Count": 20
	},
	"id": 9
}
// response
{
	"jsonrpc": "2.0",
	"id": 9,
	"result": "[{\"Timestamp\":1534503797,\"Amount\":\"180000000000000000000\",\"FromAddr\":\"\",\"ToAddr\":\"vite_250a4e7c5a2e00c96920cbafc2d2952b1c134ffbe9dffae457\",\"Status\":2,\"Hash\":\"e84889a16002199ff47368b0d48b7b40a3b3638904718371a9fe8526e9d9ea94\",\"Balance\":\"999945382000000000000000000\",\"ConfirmedTimes\":\"25636\"},{\"Timestamp\":1534503796,\"Amount\":\"173000000000000000000\",\"FromAddr\":\"\",\"ToAddr\":\"vite_250a4e7c5a2e00c96920cbafc2d2952b1c134ffbe9dffae457\",\"Status\":2,\"Hash\":\"55189a3ffea0485142406738b1c49440ca4b4e1598026bf69f2a7d532d22b65c\",\"Balance\":\"999945562000000000000000000\",\"ConfirmedTimes\":\"25636\"},{\"Timestamp\":1534503796,\"Amount\":\"72000000000000000000\",\"FromAddr\":\"\",\"ToAddr\":\"vite_250a4e7c5a2e00c96920cbafc2d2952b1c134ffbe9dffae457\",\"Status\":2,\"Hash\":\"a7eac3a5e0e89687e1f0fde3fb330cb79b5245504c431cc69955900854cd35fe\",\"Balance\":\"999945735000000000000000000\",\"ConfirmedTimes\":\"25636\"}]"
}
```

### ledger.GetAccountByAccAddr
获取一个账户的详情

- **Parameters**: `Array of HexAddress String`
  * Array[0] = HexAddress

- **Returns**:

  `Object` : 账户详情
   -  `Addr` : `string` 账户地址
   -  `BalanceInfos` : `Array of Balance` 余额信息
  -  `BlockHeight` : `string of bigint` 账户交易数量 或者是账户链高度
  
  `Object` : `Balance` 余额信息
  -  `TokenSymbol` : `string` token的单位比如 人名币 100 元的『元』
  -  `TokenName` : `string` token的名字 比如 人民币
  -  `TokenTypeId` : `string` token id 唯一标识一个token
   -  `Balance` : `string of bigint` 账户拥有的该token的余额

- **Example**:

```js
// request
{
	"jsonrpc": "2.0",
	"method": "ledger.GetAccountByAccAddr",
	"params": ["vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"],
	"id": 11
}
// response
{
	"jsonrpc": "2.0",
	"id": 11,
	"result": "{\"Addr\":\"vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68\",\"BalanceInfos\":[{\"TokenSymbol\":\"VITE\",\"TokenName\":\"vite\",\"TokenTypeId\":\"tti_000000000000000000004cfd\",\"Balance\":\"999945382000000000000000000\"}],\"BlockHeight\":\"537\"}"
}
```

### ledger.GetUnconfirmedInfo
获取一个账户的待确认交易的详情

- **Parameters**: `Array of HexAddress String`
  * Array[0] = HexAddress
  
- **Returns**:

  `Object` : 账户详情
    -  `Addr` : `string` 账户地址
    -  `BalanceInfos` : `Array of Balance` 余额信息
    -  `UnConfirmedBlocksLen` : `string of bigint` 账户未确认交易数量


- **Example**:

```js
// request
{
	"jsonrpc": "2.0",
	"method": "ledger.GetAccountByAccAddr",
	"params": ["vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"],
	"id": 11
}
// response
{
	"jsonrpc": "2.0",
	"id": 11,
	"result": "{\"Addr\":\"vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68\",\"BalanceInfos\":[{\"TokenSymbol\":\"VITE\",\"TokenName\":\"vite\",\"TokenTypeId\":\"tti_000000000000000000004cfd\",\"Balance\":\"999945382000000000000000000\"}],\"BlockHeight\":\"537\"}"
}
```
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

```js
// request
{
	"jsonrpc": "2.0",
	"method": "ledger.GetInitSyncInfo",
	"id": 12
}
// response
{
	"jsonrpc": "2.0",
	"id": 12,
	"result": "{\"StartHeight\":\"1\",\"TargetHeight\":\"3\",\"CurrentHeight\":\"2\",\"IsFirstSyncDone\":false,\"IsStartFirstSync\":true}"
}
```

### ledger.GetSnapshotChainHeight
获取当前快照链高度

- **Parameters**: `none`

- **Returns**: `string of bigint`
 当前快照链高度

- **Example**:

```js
// request
{
	"jsonrpc": "2.0",
	"method": "ledger.GetSnapshotChainHeight",
	"id": 12
}
// response
{
	"jsonrpc": "2.0",
	"id": 12,
	"result": "11"
}
```

### types.IsValidHexAddress
判断一个字符串是否是合法的地址

- **Parameters**: `Array of String`

  * Array[0] = 待校验的string

- **Returns**: `bool` : 是否是合法地址

- **Example**:

```js
// request
{
	"jsonrpc": "2.0",
	"method": "types.IsValidHexAddress",
	"params": ["vite_1cb2ab2738cd913654658e879bef8115eb1aa61a9be9d15c3a"],
	"id": 3
}
// response
{
	"jsonrpc": "2.0",
	"id": 3,
	"result": "true"
}
```

### types.IsValidHexTokenTypeId
判断一个字符串是否是合法的tokentypeid

- **Parameters**: `Array of String`

  * Array[0] = 待校验的string


- **Returns**: `bool` : 是否是合法tokentypeid

- **Example**:

```js
// request
{
	"jsonrpc": "2.0",
	"method": "types.IsValidHexTokenTypeId",
	"params": ["asd"],
	"id": 2
}
// response
{
	"jsonrpc": "2.0",
	"id": 2,
	"result": "false"
}
```

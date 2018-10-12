---
sidebarDepth: 4
---

# Wallet

## 说明

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  `false` |  &#x2713; |waiting|`false`|

## API

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

### wallet_createTxWithPassphrase
创建一个转账交易

- **Parameters**:

`Object`
  1. `selfAddr`: `Address`  交易的发起方
  2. `toAddr`: `Address`  交易的接收方
  3. `passphrase`: `string`  交易发起方的账户密码
  4. `tokenTypeId`: `string of tokentypeid`  交易的币种id
  5. `amount`:`string`  bigint的string交易数量，按照该币种的最小分割单位
  6. `data`: `string` 可以是转账留言或者其它，不管是什么编码，转为byte数组后，再进行base64变成string后传过来

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
		"selfAddr": "vite_269ecd4bef9cef499e991eb9667ec4a33cfdfed832c8123ada",
		"toAddr": "vite_89ab1052584d8e5c68dc4883336da31bc924f355b5cff28f5d",
		"tokenTypeId": "tti_000000000000000000004cfd",
		"passphrase": "123456",
		"amount": "1"
	}]
}
```

:::

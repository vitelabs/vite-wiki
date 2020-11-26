---
sidebarDepth: 4
---

# Mintage
:::tip 维护者
[viteLiz](https://github.com/viteLiz)
:::

## 合约信息说明
铸币合约，合约账户地址： `vite_000000000000000000000000000000000000000595292d996d`

ABI：

```json
[
  // 铸币
  {"type":"function","name":"Mint","inputs":[{"name":"isReIssuable","type":"bool"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"},{"name":"totalSupply","type":"uint256"},{"name":"decimals","type":"uint8"},{"name":"maxSupply","type":"uint256"},{"name":"ownerBurnOnly","type":"bool"}]},
  // 增发代币
  {"type":"function","name":"Issue","inputs":[{"name":"tokenId","type":"tokenId"},{"name":"amount","type":"uint256"},{"name":"beneficial","type":"address"}]},
  // 销毁代币
  {"type":"function","name":"Burn","inputs":[]},
  // 转移可增发代币的所有权
  {"type":"function","name":"TransferOwner","inputs":[{"name":"tokenId","type":"tokenId"},{"name":"newOwner","type":"address"}]},
  // 将可增发代币修改为不可增发
  {"type":"function","name":"ChangeTokenType","inputs":[{"name":"tokenId","type":"tokenId"}]},
  // 链上查询代币信息
  {"type":"function","name":"GetTokenInfo","inputs":[{"name":"tokenId","type":"tokenId"},{"name":"bid","type":"uint8"}]},
  // 链上查询代币信息回调
  {"type":"callback","name":"GetTokenInfo","inputs":[{"name":"tokenId","type":"tokenId"},{"name":"bid","type":"uint8"},{"name":"exist","type":"bool"},{"name":"decimals","type":"uint8"},{"name":"tokenSymbol","type":"string"},{"name":"index","type":"uint16"},{"name":"owner","type":"address"}]},
  // 铸币成功事件
  {"type":"event","name":"mint","inputs":[{"name":"tokenId","type":"tokenId","indexed":true}]},
  // 增发成功事件
  {"type":"event","name":"issue","inputs":[{"name":"tokenId","type":"tokenId","indexed":true}]},
  // 销毁成功事件
  {"type":"event","name":"burn","inputs":[{"name":"tokenId","type":"tokenId","indexed":true},{"name":"address","type":"address"},{"name":"amount","type":"uint256"}]},
  // 转移所有权成功事件
  {"type":"event","name":"transferOwner","inputs":[{"name":"tokenId","type":"tokenId","indexed":true},{"name":"owner","type":"address"}]},
  // 修改代币类型成功事件
  {"type":"event","name":"changeTokenType","inputs":[{"name":"tokenId","type":"tokenId","indexed":true}]}
]
```

其中，链上查询代币信息的响应交易会产生回调请求交易，通知本次查询结果。

## mintage_getMintData
获取铸币交易请求数据，也可以通过对ABI中的`Mint`方法编码获取交易请求数据。

- **Parameters**: 

`Object`
  1. `tokenName`:`string`  代币名称，1-40个字符，包含大小写字母、空格和下划线，不能有连续空格，不能以空格开头或结尾
  2. `tokenSymbol`: `string` 代币简称，1-10个字符，包含大写字母、数字
  3. `totalSupply`: `big.int` 总发行量，不能超过2**256-1
  4. `decimals`: `uint8` 小数位数，10**decimals不能超过totalSupply
  5. `isReIssuable`: `bool` 是否可增发，true-可增发 false-不可增发
  6. `maxSupply`: `uint256` 最大发行量，可增发代币必填，不能超过2**256-1，maxSupply>=totalSupply
  7. `ownerBurnOnly`: `bool` 是否仅支持所有者销毁，可增发代币必填，true-仅所有者可销毁 false-所有持币者可销毁

- **Returns**: 
	- `[]byte` Data

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"mintage_getMintData",
   "params": [{
   	  "tokenName":"Test Token",
   		"tokenSymbol":"test",
   		"totalSupply":"100000000000",
   		"decimals":6,
   		"isReIssuable":true,
   		"maxSupply":"200000000000",
   		"ownerBurnOnly":true
   	}]
}
```

:::

## mintage_getIssueData
获取增发交易请求数据，也可以通过对ABI中的`Issue`方法编码获取交易请求数据。

- **Parameters**: 

`Object`
  1. `tokenId`: `TokenId`  代币id
  2. `amount`: `big.int`  增发数量
  3. `beneficial`: `Address`  增发代币接收地址


- **Returns**: 
	- `[]byte` Data

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"mintage_getIssueData",
   "params": [{
   	  "tokenId":"tti_5649544520544f4b454e6e40",
   		"amount":"100000000000",
   		"beneficial":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"
   	}]
}
```

:::

## mintage_getBurnData
获取销毁交易请求数据，也可以通过对ABI中的`Burn`方法编码获取交易请求数据。

- **Returns**: 

	- `[]byte` Data

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"mintage_getBurnData",
   "params": []
}
```

:::

## mintage_getTransferOwnerData
获取修改所有者交易请求数据，也可以通过对ABI中的`TransferOwner`方法编码获取交易请求数据。

- **Parameters**: 

`Object`
  1. `tokenId`: `TokenId`: 代币id
  2. `newOwner`: `Address`: 新的所有者账户

- **Returns**: 

	- `[]byte` Data

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"mintage_getTransferOwnerData",
   "params": [{
      "tokenId":"tti_251a3e67a41b5ea2373936c8",
      "newOwner":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"
   }]
}
```

:::

## mintage_getChangeTokenTypeData
获取修改代币类型交易请求数据，将可增发代币修改为不可增发，也可以通过对ABI中的`ChangeTokenType`方法编码获取交易请求数据。

- **Parameters**: 

  * `TokenId`: 代币id

- **Returns**: 
	- `[]byte` Data

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"mintage_getChangeTokenTypeData",
   "params": ["tti_5649544520544f4b454e6e40"]
}
```

:::

## mintage_getTokenInfoList
分页获取代币信息列表

- **Parameters**: 

  * `int`: 页码，从0开始
  * `int`: 每页条数

- **Returns**: 

`Array&lt;TokenInfo&gt;`
  1. `tokenName`: `string`  代币名称
  2. `tokenSymbol`: `string`  代币简称
  3. `totalSupply`: `big.Int` 总发行量
  4. `decimals`: `uint8` 小数位数
  5. `owner`: `Address` 所有者
  6. `isReIssuable`: `bool`  是否可增发
  7. `maxSupply`: `big.Int`  最大发行量
  8. `ownBurnOnly`: `bool`  是否仅支持所有者销毁
  9. `tokenId`: `TokenId` 代币id
  10. `index`: `uint16` 序号，范围为0-999，同一个代币简称，按铸币顺序分配序号

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"mintage_getTokenInfoList",
   "params":[0, 10]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": [{
      "tokenName":"Vite Token",
      "tokenSymbol":"VITE",
      "totalSupply":"1000000000000000000000000000",
      "decimals":18,
      "owner":"vite_60e292f0ac471c73d914aeff10bb25925e13b2a9fddb6e6122",
      "isReIssuable":false,
      "maxSupply":"0",
      "ownBurnOnly":false,
      "tokenId":"tti_5649544520544f4b454e6e40",
      "index":0
   }]
}
```
:::

## mintage_getTokenInfoById
根据代币id获取代币信息

- **Parameters**: 

  * `TokenId`: 代币id

- **Returns**: 

`TokenInfo`
  1. `tokenName`: `string`  代币名称
  2. `tokenSymbol`: `string`  代币简称
  3. `totalSupply`: `big.Int` 总发行量
  4. `decimals`: `uint8` 小数位数
  5. `owner`: `Address` 所有者
  6. `isReIssuable`: `bool`  是否可增发
  7. `maxSupply`: `big.Int`  最大发行量
  8. `ownBurnOnly`: `bool`  是否仅支持所有者销毁
  9. `tokenId`: `TokenId` 代币id
  10. `index`: `uint16` 序号，范围为0-999，同一个代币简称，按铸币顺序分配序号

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"mintage_getTokenInfoById",
   "params":["tti_5649544520544f4b454e6e40"]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": {
      "tokenName":"Vite Token",
      "tokenSymbol":"VITE",
      "totalSupply":"1000000000000000000000000000",
      "decimals":18,
      "owner":"vite_60e292f0ac471c73d914aeff10bb25925e13b2a9fddb6e6122",
      "isReIssuable":false,
      "maxSupply":"0",
      "ownBurnOnly":false,
      "tokenId":"tti_5649544520544f4b454e6e40",
      "index":0
   }
}
```
:::

## mintage_getTokenInfoListByOwner
根据所有者账号获取可增发代币信息列表

- **Parameters**: 

  * `Address`: 所有者账号

- **Returns**: 

`Array&lt;TokenInfo&gt;`
  1. `tokenName`: `string`  代币名称
  2. `tokenSymbol`: `string`  代币简称
  3. `totalSupply`: `big.Int` 总发行量
  4. `decimals`: `uint8` 小数位数
  5. `owner`: `Address` 所有者
  6. `isReIssuable`: `bool`  是否可增发
  7. `maxSupply`: `big.Int`  最大发行量
  8. `ownBurnOnly`: `bool`  是否仅支持所有者销毁
  9. `tokenId`: `TokenId` 代币id
  10. `index`: `uint16` 序号，范围为0-999，同一个代币简称，按铸币顺序分配序号

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"mintage_getTokenInfoListByOwner",
   "params":["vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": [{
      "tokenName":"Test Token",
      "tokenSymbol":"test",
      "totalSupply":"100000000000",
      "decimals":6,
      "owner":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
      "isReIssuable":true,
      "maxSupply":"200000000000",
      "ownBurnOnly":true,
      "tokenId":"tti_251a3e67a41b5ea2373936c8",
      "index":0
   }]
}
```
:::

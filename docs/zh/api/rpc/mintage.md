---
sidebarDepth: 4
---

# Mintage
:::tip 维护者
[viteLiz](https://github.com/viteLiz)
:::

铸币内置合约，合约账户地址： `vite_00000000000000000000000000000000000000056ad6d26692`

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

## mintage_getMintData
获取铸币交易请求数据

- **Parameters**: 

`Object`
  1. `tokenName`:`string`  代币名称，1-40个字符，包含大小写字母、空格和下划线，不能有连续空格，不能以空格开头或结尾
  2. `tokenSymbol`: `string` 代币简称，1-10个字符，包含大小写字母、空格和下划线，不能有连续空格，不能以空格开头或结尾
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

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "cbf0e4fa000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000174876e80000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000002e90edd0000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000a5465737420546f6b656e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000"
}
```
:::

## mintage_getMintageCancelPledgeData
获取取回铸币抵押交易请求数据

- **Parameters**: 

  * `TokenId`: 取回铸币抵押的代币id

- **Returns**: 
	- `[]byte` Data

- **Example**:

::: demo

```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"mintage_getMintageCancelPledgeData",
   "params":["tti_5649544520544f4b454e6e40"]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result":  "9b9125f5000000000000000000000000000000000000000000005649544520544f4b454e"
}
```
:::

## mintage_getIssueData
获取增发交易请求数据

- **Parameters**: 

`Object`
  1. `tokenId`: `TokenId`  代币id
  2. `amount`: `uint64`  增发数量
  3. `beneficial`: `Hash`  增发代币接收地址


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

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "1adb5572000000000000000000000000000000000000000000005649544520544f4b454e000000000000000000000000000000000000000000000000000000174876e800000000000000000000000000a5a7f08011c2f0e40ccd41b5b79afbfb818d565f"
}
```
:::

## mintage_getBurnData
获取销毁交易请求数据

- **Parameters**: 

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

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "b7bf21b4"
}
```
:::

## mintage_getTransferOwnerData
获取修改所有者交易请求数据

- **Parameters**: 

`Object`
  1. `TokenId`: 代币id
  2. `Address`: 新的所有者账户

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

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "a659fe5a00000000000000000000000000000000000000000000251a3e67a41b5ea23739000000000000000000000000a5a7f08011c2f0e40ccd41b5b79afbfb818d565f"
}
```
:::

## mintage_getChangeTokenTypeData
获取修改代币类型交易请求数据，将可增发代币修改为不可增发

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

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "7ecfb4d7000000000000000000000000000000000000000000005649544520544f4b454e"
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
  9. `pledgeAmount`: `big.Int` 抵押金额
  10. `withdrawHeight`: `uint64` 抵押到期高度
  11. `pledgeAddr`: `Address` 抵押账户
  12. `tokenId`: `TokenId` 代币id

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
      "pledgeAmount":"0",
      "withdrawHeight":"0",
      "pledgeAddr": "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
      "tokenId":"tti_5649544520544f4b454e6e40"
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
  9. `pledgeAmount`: `big.Int` 抵押金额
  10. `withdrawHeight`: `uint64` 抵押到期高度
  11. `pledgeAddr`: `Address` 抵押账户
  12. `tokenId`: `TokenId` 代币id

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
      "pledgeAmount":"0",
      "withdrawHeight":"0",
      "pledgeAddr": "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
      "tokenId":"tti_5649544520544f4b454e6e40"
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
  9. `pledgeAmount`: `big.Int` 抵押金额
  10. `withdrawHeight`: `uint64` 抵押到期高度
  11. `pledgeAddr`: `Address` 抵押账户
  12. `tokenId`: `TokenId` 代币id

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
      "pledgeAmount":"0",
      "withdrawHeight":"0",
      "pledgeAddr": "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
      "tokenId":"tti_251a3e67a41b5ea2373936c8"
   }]
}
```
:::

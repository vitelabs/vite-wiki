---
sidebarDepth: 4
---

# Mintage
:::tip Maintainer
[viteLiz](https://github.com/viteLiz)
:::

The built-in token issuance contract. Contract address: vite_000000000000000000000000000000000000000595292d996d

**Supported protocols:**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |future version| &#x2713; |

## mintage_getMintageData
Return the composed request data for issuing new token. The token will have fixed supply and cannot be re-issued. This method is **deprecated** and replaced by `mintage_getMintData` 

- **Parameters**: 

`Object`
  1. `selfAddr`: `Address`  The account address of token issuer
  2. `height`: `uint64`  The height of current block
  3. `prevHash`: `Hash`  The hash of previous account block
  4. `snapshotHash`: `Hash`  The hash of snapshot block that current account block refers to
  5. `tokenName`:`string`  The token name in 1-40 characters, including uppercase and lowercase letters, spaces and underscores. Cannot have consecutive spaces; cannot begin or end with spaces
  6. `tokenSymbol`: `string` The token symbol in 1-10 characters, including uppercase and lowercase letters, spaces and underscores. Cannot have consecutive spaces; cannot begin or end with spaces
  7. `totalSupply`: `big.int` The total supply. Cannot exceed 2**256-1
  8. `decimals`: `uint8` The decimal number. 10**`decimals` cannot exceed `totalSupply`


- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"mintage_getMintageData",
   "params": [{
   	  "selfAddr":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
   		"height":2,
   		"prevHash":"3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7",
   		"snapshotHash":"3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7",
   		"tokenName":"Test Token",
   		"tokenSymbol":"test",
   		"totalSupply":100000000000,
   		"decimals":6
   	}]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "46d0ce8b000000000000000000000000000000000000000000003fd16552e1551a267f3200000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000174876e8000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a5465737420546f6b656e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000"
}
```
:::

## mintage_getMintageCancelPledgeData
Return the composed request data for retrieving the VITE that were staked for token issuance

- **Parameters**: 

  * `TokenId`: The issued token ID

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

## mintage_newTokenId
Return new token ID

- **Parameters**: 

`Object`
  1. `selfAddr`: `Address`  The account address of token issuer
  2. `height`: `uint64`  The height of current block
  3. `prevHash`: `Hash`  The hash of previous account block
  4. `snapshotHash`: `Hash`  The hash of snapshot block that current account block refers to

- **Returns**: 
	- `[]byte` Data

- **Example**:

::: demo

```json tab:Request
{
	"jsonrpc": "1.0",
	"id": 1,
	"method": "mintage_newTokenId",
	"params": [{
   		"selfAddr":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
   		"height":"2",
   		"prevHash":"3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7",
   		"snapshotHash":"b65a60d090421928ad50c0f52044da46fa0286ef6a372047126939f64f7ebe07"
   	}]
}
```
```json tab:Response
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "tti_59f28063281a83f2d508d18e"
}
```
:::

## mintage_getMintData
Return the composed request data for issuing new token

- **Parameters**: 

`Object`
  1. `selfAddr`: `Address`  The account address of token issuer
  2. `height`: `uint64`  The height of current block
  3. `prevHash`: `Hash`  The hash of previous account block
  4. `snapshotHash`: `Hash`  The hash of snapshot block that current account block refers to
  5. `tokenName`:`string`  The token name in 1-40 characters, including uppercase and lowercase letters, spaces and underscores. Cannot have consecutive spaces; cannot begin or end with spaces
  6. `tokenSymbol`: `string` The token symbol in 1-10 characters, including uppercase and lowercase letters, spaces and underscores. Cannot have consecutive spaces; cannot begin or end with spaces
  7. `totalSupply`: `big.int` The total supply. Cannot exceed 2**256-1
  8. `decimals`: `uint8` The decimal number. 10**`decimals` cannot exceed `totalSupply`
  9. `isReIssuable`: `bool` Whether the token can be re-issued. `true` means the token has dynamic supply and additional amount can be minted.
  10. `maxSupply`: `uint256` Maximum supply. Mandatory for re-issuable token. Cannot exceed 2**256-1 and no less than `totalSupply`
  11. `ownerBurnOnly`: `bool` Whether the token can be burned by owner only. Mandatory for re-issuable token. All token holders can perform burn action if this is `false`

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
   	  "selfAddr":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
   		"height":2,
   		"prevHash":"3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7",
   		"snapshotHash":"3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7",
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
   "result": "27ad872e0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000003fd16552e1551a267f3200000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000174876e8000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000174876e8000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000a5465737420546f6b656e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000"
}
```
:::

## mintage_getIssueData
Return the composed request data for minting certain amount of token at an account address

- **Parameters**: 

`Object`
  1. `tokenId`: `TokenId`  Token ID
  2. `amount`: `uint64`  Mint amount
  3. `beneficial`: `Hash`  Account address to receive newly minted tokens


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
Return the composed request data for burning token

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
Return the composed request data for transferring token ownership

- **Parameters**: 

`Object`
  1. `TokenId`: Token ID
  2. `Address`: Account address of new owner

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
Return the composed request data for changing `isReIssuable` from `true` to `false`. One-way transition only.
- **Parameters**: 

  * `TokenId`: Token ID

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
Return the information of all issued tokens

- **Parameters**: 

  * `int`: Page index，starting from 0
  * `int`: Page size

- **Returns**: 

`Array&lt;TokenInfo&gt;`
  1. `tokenName`: `string`  Token name
  2. `tokenSymbol`: `string`  Token symbol
  3. `totalSupply`: `big.Int` The total supply
  4. `decimals`: `uint8` The decimal number
  5. `owner`: `Address` Token owner
  6. `isReIssuable`: `bool`  Whether the token can be re-issued
  7. `maxSupply`: `big.Int`  The maximum supply
  8. `ownBurnOnly`: `bool`  Whether the token can be burned by owner only
  9. `pledgeAmount`: `big.Int` The amount of staking
  10. `withdrawHeight`: `uint64` The height of staking expiration
  11. `pledgeAddr`: `Address` The address of staking account
  12. `tokenId`: `TokenId` Token ID

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
Return the information of specific token

- **Parameters**: 

  * `TokenId`: Token ID

- **Returns**: 

`TokenInfo`  
  1. `tokenName`: `string`  Token name
  2. `tokenSymbol`: `string`  Token symbol
  3. `totalSupply`: `big.Int` The total supply
  4. `decimals`: `uint8` The decimal number
  5. `owner`: `Address` Token owner
  6. `isReIssuable`: `bool`  Whether the token can be re-issued
  7. `maxSupply`: `big.Int`  The maximum supply
  8. `ownBurnOnly`: `bool`  Whether the token can be burned by owner only
  9. `pledgeAmount`: `big.Int` The amount of staking
  10. `withdrawHeight`: `uint64` The height of staking expiration
  11. `pledgeAddr`: `Address` The address of staking account
  12. `tokenId`: `TokenId` Token ID

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
Return the information of tokens issued by specific owner

- **Parameters**: 

  * `Address`: 所有者账号

- **Returns**: 

`Array&lt;TokenInfo&gt;`
  1. `tokenName`: `string`  Token name
  2. `tokenSymbol`: `string`  Token symbol
  3. `totalSupply`: `big.Int` The total supply
  4. `decimals`: `uint8` The decimal number
  5. `owner`: `Address` Token owner
  6. `isReIssuable`: `bool`  Whether the token can be re-issued
  7. `maxSupply`: `big.Int`  The maximum supply
  8. `ownBurnOnly`: `bool`  Whether the token can be burned by owner only
  9. `pledgeAmount`: `big.Int` The amount of staking
  10. `withdrawHeight`: `uint64` The height of staking expiration
  11. `pledgeAddr`: `Address` The address of staking account
  12. `tokenId`: `TokenId` Token ID

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

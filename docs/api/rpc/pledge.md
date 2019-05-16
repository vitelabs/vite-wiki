---
sidebarDepth: 4
---

# Pledge
:::tip Maintainer
[viteLiz](https://github.com/viteLiz)
:::
The built-in staking contract. Contract address is vite_0000000000000000000000000000000000000003f6af7459b9

**Supported protocol：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |future version| &#x2713; |

## pledge_getPledgeData
Return the composed request data for staking for quota

- **Parameters**: 

  * `Address`: The account address of quota recipient

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"pledge_getPledgeData",
   "params":["vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"]
}
```

:::

## pledge_getCancelPledgeData
Return the composed request data for retrieving a certain amount of tokens that were staked for the specified quota recipient

- **Parameters**: 

  * `Address`: The account address of quota recipient
  * `uint256`: The amount of token to retrieve

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"pledge_getCancelPledgeData",
   "params":[
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
      10
    ]
}
```

:::

## pledge_getPledgeQuota
Return the current quota and the maximum TPS of the specified account

- **Parameters**: 

  * `Address`: The account address

- **Returns**: 

`Object`
  1. `quota`: `uint64`  The current quota
  2. `txNum`: `uint64`  The maximum TPS

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"pledge_getPledgeQuota",
   "params": ["vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": {
      "quota": 21000,
      "txNum":1
   }
}
```
:::

## pledge_getPledgeList
Return the staking records of the specified account

- **Parameters**: 

  * `Address`: The staking account address
  * `int`: Page index, starting from 0
  * `int`: Page size

- **Returns**: 

`Object`
  1. `totalPledgeAmount`: `big.Int`  The total staking amount of the account
  2. `totalCount`: `int`  The number of staking records, indicating how many recipients that this account has staked for
  3. `pledgeInfoList`: `Array&lt;PledgeInfo&gt;`  The list of staking records
      * `amount`: `big.int`  The staking amount
      * `withdrawHeight`: `uint64`  The staking due height, which is the height of snapshot block when staking expires
      * `beneficialAddr`: `Address`  The account address of quota recipient
      * `withdrawTime`: `int64`  The estimated staking due time

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"pledge_getPledgeList",
   "params":["vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6", 0, 50]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result":  {
      "totalPledgeAmount": "5000000000000000000000",
      "totalCount": 1,
      "pledgeInfoList": [
        {
          "amount":10000000000000000000,
          "withdrawHeight":259200,
          "beneficialAddr":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
          "withdrawTime":1540213336
        }
      ]
   }
}
```
:::


---
sidebarDepth: 4
---

# Register

:::tip Maintainer
[viteLiz](https://github.com/viteLiz)
:::

The built-in super node registration contract. Contract address: vite_0000000000000000000000000000000000000001c9e9f25417

**Supported protocol:**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |future version| &#x2713; |

## register_getRegisterData
Return the composed request data for registering a new super node in the specified consensus group

- **Parameters**: 

  * `Gid`: Consensus group ID
  * `string`: The super node name
  * `Address`: The account address of block producer

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getRegisterData",
   "params": [
      "00000000000000000001",
      "super", 
      "vite_080b2d68a06f52c0fbb454f675ee5435fb7872526771840d22", 
    ]
}
```

:::

## register_getCancelRegisterData
Return the composed request data for cancelling an existing super node registration in the specified consensus group

- **Parameters**: 

  * `Gid`: Consensus group ID
  * `string`: The super node name

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getCancelRegisterData",
   "params": [
      "00000000000000000001",
      "super"
    ]
}
```

:::

## register_getRewardData
Return the composed request data for retrieving super node rewards(if applied. For the time being only super nodes(aka SBP) in snapshot consensus group are rewarded). Rewards mined within 90 days since the last retrieval block are retrieved per request. All rewards except mined in recent 30 minutes will be retrieved if the height between last retrieval block and current block is less than 90 days. Rewards mined within latest 24 hours are not allowed to retrieve.

- **Parameters**: 

  * `Gid`: Consensus group ID
  * `string`: The super node name
  * `Address`: The address of account to receive rewards

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getRewardData",
   "params": [
      "00000000000000000001", 
      "super",
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
    ]
}
```

:::

## register_getUpdateRegistrationData
Return the composed request data for changing block producer of an existing registration

- **Parameters**: 

  * `Gid`: Consensus group ID, must be the same filled value when the super node was registered
  * `string`: The super node name, must be the same filled value when the super node was registered
  * `Address`: The account address of new block producer

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getUpdateRegistrationData",
   "params": [
      "00000000000000000001", 
      "super",
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6",
    ]
}
```

:::

## register_getRegistrationList
Return the list of registered super nodes in the specified consensus group by the account

- **Parameters**: 

  * `Gid`: Consensus group ID
  * `Address`: The staking account address

- **Returns**: 

`Array&lt;RegistartionInfo&gt;`
  1. `name`: `string`  The super node name
  2. `nodeAddr`: `Address`  The account address of block producer
  3. `pledgeAddr`: `Address`  The staking account address
  4. `pledgeAmount`: `big.Int`  The staking amount
  5. `withdrawHeight`: `uint64`  The due height of staking
  6. `withdrawTime`: `uint64`  The estimated due time of staking
  7. `cancelHeight`: `uint64`  The cancelled time of staking. If the value is greater than 0, it means staking has already been cancelled.

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getRegistrationList",
   "params": [
      "00000000000000000001",
      "vite_080b2d68a06f52c0fbb454f675ee5435fb7872526771840d22"
    ]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": [
    {
      "name": "super",
      "nodeAddr": "",
      "pledgeAddr": "",
      "pledgeAmount": 100000000000,
      "withdrawHeight": 100,
      "withdrawTime":1541573925,
      "cancelHeight":0
    }
   ]
}
```
:::

## register_getCandidateList
Return the list of super node candidates in the specified consensus group

- **Parameters**: 

  * `Gid`: Consensus group ID

- **Returns**: 

`Array&lt;CandidateInfo&gt;`
  1. `name`: `string`  The super node name
  2. `nodeAddr`: `Address`  The account address of block producer

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"register_getCandidateList",
   "params": [
      "00000000000000000001"
    ]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": [
    {
      "name": "super",
      "nodeAddr": "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6"
    }
   ]
}
```
:::

---
sidebarDepth: 4
---

# Contract

:::tip Maintainer
[viteLiz](https://github.com/viteLiz)
:::

**Smart Contract**

Calling the built-in smart contract is similar to a normal transaction, but the receiving address is a built-in contract account address, not user account address.The transaction data is composed of `contract method selector` and `method parameter`, which is generated through RPC interface. The transfer amount and token ID should be filled if the contract method requires staking.

**Supported protocol：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |future version| &#x2713; |

## contract_getCreateContractToAddress
Return a newly generated smart contract address

- **Parameters**: 

  * `Address`: The account address of transaction sender
  * `uint64`: The height of current block
  * `Hash`: The hash of previous account block
  * `Hash`: The hash of snapshot block which current account block refers to

- **Returns**: 
	- `Address` New smart contract address

- **Example**:


::: demo


```json tab:Request
{  
   "jsonrpc":"2.0",
   "id":1,
   "method":"contract_getCreateContractToAddress",
   "params":[
      "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6", 
      2, 
      "3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7", 
      "3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7"]
}
```

```json tab:Response
{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "vite_22f4f195b6b0f899ea263241a377dbcb86befb8075f93eeac8"
}
```
:::

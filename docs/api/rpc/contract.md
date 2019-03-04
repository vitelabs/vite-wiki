---
sidebarDepth: 4
---

# Contract

:::tip Maintainer
[viteLiz](https://github.com/viteLiz)
:::

Smart Contract

Calling a smart contract is similar to normal transfer, but the receiving address is a contract address instead of user account address.
The request transaction should contain a data field that specifies both `method selector` and `method parameter`, which can be built up with corresponding RPC APIs. 
Transfer amount and token ID must be present if the contract method requires a token transfer when being called.

## Description

**Supported protocol：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |future version| &#x2713; |

## API

## contract_getCreateContractToAddress
Return a newly generated smart contract address

- **Parameters**: 

  * `Address`: The account address of transaction requester
  * `uint64`: The height of current block
  * `Hash`: The hash of previous block in requester's account chain
  * `Hash`: The hash of snapshot block which current transaction refers to

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
      "2", 
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

## contract_getCreateContractData
Return the composed request data for creating smart contract

- **Parameters**: 

  * `Gid`: ID of delegated consensus group that the smart contract designates, or "00000000000000000002" if global consensus group is designated
  * `string`: Hex code of smart contract
  * `string`: ABI data of smart contract
  * `[]string`: Passed-in parameters, in string for simple or JSON string for complex type 

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 17,
    "method": "contract_getCreateContractData",
    "params": [
        "00000000000000000002", 
        "608060405234801561001057600080fd5b506101ca806100206000396000f3fe608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806380ae0ea114610046575b600080fd5b6100bd6004803603602081101561005c57600080fd5b810190808035906020019064010000000081111561007957600080fd5b82018360208201111561008b57600080fd5b803590602001918460208302840111640100000000831117156100ad57600080fd5b90919293919293905050506100bf565b005b60006002838390508115156100d057fe5b061415156100dd57600080fd5b600080905060008090505b8383905081101561018a576000848483818110151561010357fe5b9050602002013590506000858560018501818110151561011f57fe5b905060200201359050808401935080841015151561013c57600080fd5b600081111561017d578173ffffffffffffffffffffffffffffffffffffffff164669ffffffffffffffffffff168260405160405180820390838587f1505050505b50506002810190506100e8565b50348114151561019957600080fd5b50505056fea165627a7a723058203cef4a3f93b33e64e99e0f88f586121282084394f6d4b70f1030ca8c360b74620029", 
        "[{\"constant\":false,\"inputs\":[{\"name\":\"voter\",\"type\":\"address\"}],\"name\":\"authorization\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"proposal\",\"type\":\"uint256\"}],\"name\":\"vote\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"proposalNames\",\"type\":\"uint256[]\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}]",
        ["[\"0x1111111111111111111111111111111111111111111111111111111111111111\",\"0x2222222222222222222222222222222222222222222222222222222222222222\"]"]
    ]
}
```

:::

## contract_getCallContractData
Return the composed request data for calling smart contract

- **Parameters**: 

  * `string`: ABI data of smart contract
  * `string`: Method name
  * `[]string`: Passed-in parameters, in string for simple or JSON string for complex type 

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 17,
    "method": "contract_getCallContractData",
    "params": [
        "[{\"constant\":false,\"inputs\":[{\"name\":\"voter\",\"type\":\"address\"}],\"name\":\"authorization\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"proposal\",\"type\":\"uint256\"}],\"name\":\"vote\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"proposalNames\",\"type\":\"uint256[]\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}]",
        "vote",
        ["0x1111111111111111111111111111111111111111111111111111111111111111"]
    ]
}
```

:::

---
sidebarDepth: 4
---

# Contract

:::tip 维护者
[viteLiz](https://github.com/viteLiz)
:::

**智能合约**

内置合约调用和普通转账交易类似，交易接收地址为内置合约地址，交易数据为 `内置合约方法选择器+方法参数` ，可以通过内置合约相关的RPC接口生成。如果调用内置合约时需要抵押Vite，则在转账金额和转账代币id字段填写相应的抵押金额和代币id即可。

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

## contract_getCreateContractToAddress
创建合约时生成新的合约地址

- **Parameters**: 

  * `Address`: 交易的发起方
  * `uint64`: 当前块高度
  * `Hash`: 交易发起方账户链上上一个块的哈希

- **Returns**: 
	- `Address` 新的合约地址

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
获取创建合约交易请求数据

- **Parameters**: 

  * `Gid`: 合约所属的委托共识组id，公共共识组id为"00000000000000000002"
  * `uint8`: 发给合约账户的request块被确认多少次之后出response块，取值范围0-75，取0表示不需要等待request被确认。如果合约代码中使用了随机数、时间戳等指令，要求这个字段值大于0
  * `string`: 十六进制合约代码
  * `string`: abi
  * `[]string`: 创建合约参数。简单类型直接转换为string，复合类型为json格式的string

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 1,
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
获取调用合约交易请求数据

- **Parameters**: 

  * `string`: abi
  * `string`: 方法名称
  * `[]string`: 方法参数。简单类型直接转换为string，复合类型为json格式的string

- **Returns**: 
	- `[]byte` Data

- **Example**:


::: demo


```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "contract_getCallContractData",
    "params": [
        "[{\"constant\":false,\"inputs\":[{\"name\":\"voter\",\"type\":\"address\"}],\"name\":\"authorization\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"proposal\",\"type\":\"uint256\"}],\"name\":\"vote\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"proposalNames\",\"type\":\"uint256[]\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"}]",
        "vote",
        ["0x1111111111111111111111111111111111111111111111111111111111111111"]
    ]
}
```

:::


## contract_getContractInfo
获取合约代码

- **Parameters**: 

  * `string`: 合约账户地址
  
- **Returns**: 
	`ContractInfo`
    1. `code`: `[]byte`  合约代码
    2. `gid`: `Gid`  合约所属委托共识组id
    3. `confirmTime`: `uint8` 发给合约账户的request块被确认多少次之后出response块

- **Example**:

::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "contract_getContractInfo",
    "params": ["vite_22f4f195b6b0f899ea263241a377dbcb86befb8075f93eeac8"]
}
```
:::

## contract_getCallOffChainData
按ABI定义对getter方法的入参进行编码。返回值可作为`contract_callOffChainMethod`方法入参中的data参数。

- **Parameters**: 

  * `string` 合约ABI
  * `string` getter方法名称
  * `[]string` getter方法参数列表
  
- **Returns**: 
	`[]byte` 按ABI定义编码后的getter方法入参。

- **Example**:

::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "contract_getCallOffChainData",
    "params": [
      "[{\"constant\":true,\"inputs\":[],\"name\":\"getTokenList\",\"outputs\":[{\"name\":\"\",\"type\":\"tokenId[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"offchain\"}]",
      "getTokenList",
      []
    ]
}
```
:::

## contract_callOffChainMethod
离线查询合约状态。合约代码中的getter方法可以通过离线查询的方式来调用。

- **Parameters**: 

  * `Object`:
    * `selfAddr`:`Address` 合约账户地址
    * `offChainCode`:`string` 用于离线查询的合约代码。编译代码时指定`--bin`参数后得到的`OffChain Binary`代码。
    * `Data`:`[]byte` 按ABI定义编码后的调用参数。
    
- **Returns**: 
	`[]byte` 按ABI定义编码后的getter方法返回值。

- **Example**:

::: demo
```json tab:Request
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "contract_callOffChainMethod",
    "params": [{
      "selfAddr":"vite_22f4f195b6b0f899ea263241a377dbcb86befb8075f93eeac8",
      "offChainCode":"608060405260043610610050576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063be46813a14610054578063f1271e08146100b157610050565b5b5b005b61008d6004803603602081101561006b5760006000fd5b81019080803569ffffffffffffffffffff169060200190929190505050610111565b60405180848152602001838152602001828152602001935050505060405180910390f35b6100b96101d1565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156100fd5780820151818401525b6020810190506100e1565b505050509050019250505060405180910390f35b600060006000600260005060008569ffffffffffffffffffff1669ffffffffffffffffffff16815260200190815260200160002160005060000160005054600260005060008669ffffffffffffffffffff1669ffffffffffffffffffff16815260200190815260200160002160005060010160005054600260005060008769ffffffffffffffffffff1669ffffffffffffffffffff168152602001908152602001600021600050600201600050549250925092506101ca565b9193909250565b6060600160005080548060200260200160405190810160405280929190818152602001828054801561025a57602002820191906000526020600021906000905b82829054906101000a900469ffffffffffffffffffff1669ffffffffffffffffffff16815260200190600a01906020826009010492830192600103820291508084116102115790505b50505050509050610266565b9056fea165627a7a72305820f495f61f697f25e46caa868c09b35b575ab331e3c608179880e1932b5848abaa0029",
      "Data":"f1271e08"
    }]
}
```
:::


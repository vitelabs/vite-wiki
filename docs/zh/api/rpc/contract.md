---
sidebarDepth: 4
---

# Contract
## viteLiz
智能合约

内置合约调用和普通转账交易类似，交易接收地址为内置合约地址，交易数据为内置合约方法选择器+方法参数，可以通过内置合约相关的RPC接口生成。如果调用内置合约时需要抵押Vite，则在转账金额和转账代币id字段填写相应的抵押金额和代币id即可。

## 说明

**支持调用方式：**

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |waiting| &#x2713; |

## API

### contract_getCreateContractToAddress
创建合约时生成新的合约地址

- **Parameters**: 

  * `Address`: 交易的发起方
  * `uint64`: 当前块高度
  * `Hash`: 前一个账户块的哈希
  * `Hash`: 当前块引用的快照块哈希

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

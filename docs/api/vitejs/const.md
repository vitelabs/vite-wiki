# Constant

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip abstract
const 包括一些常量：method，type，contract, error.
:::

## method

关于rpc方法的常量。  
调用方式

```javascript

import { client, constant } from '@vite/vitejs';
const { method } = constant;
// ......

let myClient = new client(WS_RPC);
myClient.request(method.ledger.getLatestSnapshotChainHash)
.then(()=>{
    // ......
})

```

[Detailed Reference Info](/api/rpc/)

## type

- RPCrequest
    - type 请求类型（request | notification | batch）
    - methodName [方法名称](/api/vitejs/const.html#method)
    - params 传参

- blockType  Transaction Type
    - createContract Create Contract
    - sendTx Send Transaction
    - reward Reward
    - receiveTx Receive Transaction
    - receiveTxFail Receive Transaction Failed

- txType 
   - ？？？

## Address
Some transaction addresses of built-in contract and address length related constants
- pledgeAddr Staking Address
- voteAddr Voting address
- Register_Addr SBP registration address
    
- ADDR_PRE Address prefix
- ADDR_SIZE Address actual length
- ADDR_CHECK_SUM_SIZE Address verification and length
- ADDR_LEN Full address length

# Constant

:::tip Created by
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip abstract
const: method，type，contract, error.
:::

## Methods

Constants of RPC methods 

How to invoke
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

## Type

- RPCrequest
    - type Request type（request | notification | batch）
    - methodName [methodName](/api/vitejs/const.html#method)
    - params Parameters

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

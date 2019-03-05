# Methods

:::tip Created by
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::


- How to Invoke

```javascript

import { client, constant } from '@vite/vitejs';
const { method } = constant;
// ......

let myClient = new client(WS_RPC);
myClient.request(method.ledger.getLatestSnapshotChainHash)
.then(()=>{
    // ......
})

// 或者
myClient.ledger.getLatestSnapshotChainHash()
.then(()=>{
    // ......
});

// 如果是subscribe方法
myClient.subscribeFunc.newAccountBlocks()
.then(()=>{
    // ......
});

// 或者
myClient.request(method.subscribe.newAccountBlocks)
.then(()=>{
    // ......
})
```

[Reference](/api/rpc/)

# Methods

:::tip abstract
Constants about rpc methods
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

// Or
myClient.ledger.getLatestSnapshotChainHash()
.then(()=>{
    // ......
});

// If it's subscribe method
myClient.subscribeFunc.newAccountBlocks()
.then(()=>{
    // ......
});

// Or
myClient.request(method.subscribe.newAccountBlocks)
.then(()=>{
    // ......
})
```

[More Details](/api/rpc/)

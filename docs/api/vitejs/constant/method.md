# Methods

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

// or
myClient.ledger.getLatestSnapshotChainHash()
.then(()=>{
    // ......
});

// If it is a subscribe method
myClient.subscribeFunc.newAccountBlocks()
.then(()=>{
    // ......
});

// or
myClient.request(method.subscribe.newAccountBlocks)
.then(()=>{
    // ......
})
```

[Reference](/api/rpc/)

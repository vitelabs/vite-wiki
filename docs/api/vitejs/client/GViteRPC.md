
# How to call Gvite-RPC api

**The client is only encapsulated for call Gvite-RPC apis, the returned data will directly expose RPC api original data. [Reference](/api/rpc/)**

1. `client.namespace.funcName(...args)`: If this method is defined in `constant.methods`, you can directly call `client.namespace.funcName(...args)`

```javascript
import { methods } from '@vite/vitejs-constant';
// ......

let myClient = new client(WS_RPC);
myClient.ledger.getLatestSnapshotChainHash().then(()=>{
    // ......
});
```

2. `client.request(methodName, ...args)`: If this method is not defined in `constant.methods`, you can directly call `client.request(methodName, ...args)`

```javascript
// ......
let myClient = new client(WS_RPC);
myClient.request('ledger_getLatestSnapshotChainHash').then(()=>{
    // ......
});
```

3. Because of Client extends netProcessor, the client instance have the [subscribe function](./subscribe) already. This function provides subscription. If you want to call the Gvite-RPC method `subscribe_`, the `myClient.subscribe` should be changed to `myClient.subscribeFunc`.

```javascript
import { methods } from '@vite/vitejs-constant';

// ......

let myClient = new client(WS_RPC);

myClient.subscribeFunc.newSnapshotBlocksFilter().then(()=>{
    // ......
});

// or
myClient.request(methods.subscribe.newSnapshotBlocksFilter).then(()=>{
    // ......
})
```

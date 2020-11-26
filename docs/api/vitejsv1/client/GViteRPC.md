
# How to Call Vite RPC API

:::tip Note
Client instance won't do additional data processing but just encapsulates Vite RPC API. The return value is in raw RPC format.
:::

1. If `client.namespace.funcName(...args)` has been defined in `constant.methods`, you can directly call `client.namespace.funcName(...args)`

```javascript
import { methods } from '@vite/vitejs-constant';
// ......

let myClient = new client(WS_RPC);
myClient.ledger.getLatestSnapshotChainHash().then(()=>{
    // ......
});
```

2. If `client.request(methodName, ...args)` is not defined in `constant.methods`, you can directly call `client.request(methodName, ...args)`

```javascript
// ......
let myClient = new client(WS_RPC);
myClient.request('ledger_getLatestSnapshotChainHash').then(()=>{
    // ......
});
```

3. Since `Client` extends `netProcessor`, client instance naturally has [Subscription Method](./subscribe). If you would like to call original RPC method beginning with `subscribe_`, use `myClient.subscribeFunc` instead.

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

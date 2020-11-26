
# Gvite-RPC 接口调用方式

**关于 Gvite-RPC 接口只是对于调用方式进行封装，返回的数据是暴露RPC接口的原始数据。[详细参考](/api/rpc/)**

1. `client.namespace.funcName(...args)`: 如果`constant.methods`中定义了此方法，可以直接使用`client.namespace.funcName(...args)`的方式调用

```javascript
import { methods } from '@vite/vitejs-constant';
// ......

let myClient = new client(WS_RPC);
myClient.ledger.getLatestSnapshotChainHash().then(()=>{
    // ......
});
```

2. `client.request(methodName, ...args)`: 如果`constant.methods`中未定义此方法，可以直接通过`client.request(methodName, ...args)`的方式调用

```javascript
// ......
let myClient = new client(WS_RPC);
myClient.request('ledger_getLatestSnapshotChainHash').then(()=>{
    // ......
});
```

3. 由于 client 继承自 netProcessor，已经有[subscribe方法](./subscribe)实现监听。所以如果需要单独调用 Gvite-RPC 的 `subscribe_`方法，`subscribe` 应改为 `subscribeFunc`

```javascript
import { methods } from '@vite/vitejs-constant';

// ......
let myClient = new client(WS_RPC);
myClient.subscribeFunc.newSnapshotBlocksFilter().then(()=>{
    // ......
});

// 或者
myClient.request(methods.subscribe.newSnapshotBlocksFilter).then(()=>{
    // ......
});
```


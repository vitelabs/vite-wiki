# Subscription

`Client extends netProcessor`

继承netProcessor的所有方法 (`setProvider` / `request` / `notification` / `batch` / `subscribe` / `unSubscribe` / `clearSubscriptions`)

:::tip Tips
1. 如果是采用`http`方式连接`Gvite`，`ViteJS`会自动采用轮询模式。
2. 可以监听`newSnapshotBlocks`, `newAccountBlocks`, `newLogs`, `getLogs`。

[具体参考GVite subscribe](/api/rpc/subscribe)
:::

## subscribe

- **Parameters**
    * `methods : string` 方法名称
    * `...args : boolean` 参数

- **Returns**:
    - Promise<`event`>

- **event**: subscribe返回的事件实例
    - on(`callback : Function`): 监听, 有事件发生时, 传入结果到callback函数
    - off: 取消监听

- **Example**
```javascript
import WS_RPC from '@vite/vitejs-ws';
import { client } from '@vite/vitejs';

const wsProvider = new WS_RPC("https://example.com");
const myClient = new client(WS_RPC);

myClient.subscribe('newAccountBlocks').then((event) => {
    event.on((result) => {
        console.log(result);
    });
    // event.off();
}).catch(err => {
    console.warn(err);
});
```

## unSubscribe
取消订阅

- **Parameters**: 
  * `event`: subscribe返回的event

- **Example**
```javascript
myClient.unSubscribe(event);
```

## clearSubscriptions
清空全部订阅

- **Example**
```javascript
myClient.clearSubscriptions();
```

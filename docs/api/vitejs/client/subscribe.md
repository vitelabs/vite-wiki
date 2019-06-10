# Subscription

`Client extends netProcessor`

Inherit all of netProcessor's methods (`setProvider` / `request` / `notification` / `batch` / `subscribe` / `unSubscribe` / `clearSubscriptions`)

:::tip Tips
1. If `Gvite` is connected through `http-provider`, `ViteJS` adopts polling mode automatically.
2. Subscribe `newSnapshotBlocks`, `newAccountBlocks`, `newLogs`, `getLogs`

[Refer to GVite subscribe](/api/rpc/subscribe)
:::

## subscribe

- **Parameters**
    * `methods : string` Method name
    * `...args : boolean` Parameters

- **Returns**:
    - Promise<`event`>

- **event**: The returned event instance of subscribe
    - on(`callback : Function`): Open event listener. Passing results into callback function if there is any event happened
    - off: Cancel event listener

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
Cancel Subscription

- **Example**
```javascript
myClient.unSubscribe(event);
```

- **Parameters**: 
  * `event`: Return event of subscribe

## clearSubscriptions
Clear all the Subscriptions

- **Example**
```javascript
myClient.clearSubscriptions();
```
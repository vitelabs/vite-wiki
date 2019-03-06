---
sidebarDepth: 1
---
# Start

## event (The returned event instance of subscribe)

### on
Open event listener

- **Parameters**
    * `callback : Function` Passing results into callback function if there is any event happened

### off
Cancel event listener

## Constructor

- **constructor params**
    - `provider : Provider Instance`
    - `firstConnectCb : function` : Callback function of first connection

- **Example**

```javascript

import provider from '@vite/vitejs/dist/es5/provider/WS';
import { netProcessor, constant } from '@vite/vitejs';

const { method } = constant;
const WS_RPC = new provider("https://example.com");

const myNetProcessor = new netProcessor(WS_RPC, function(_myclient) {
    console.log("Connected.");
});

myNetProcessor.request(method.ledger.getLatestSnapshotChainHash).then(() => {
    // ...
});
```

## setProvider (provider, abort)
Set provider

- **Parameters**
    * `provider : Provider Instance`
    * `abort : boolean` Whether or not to interrupt remaining provider request

## request (Methods, ...args)
Shortcut of `this.provider.request`

## notification (Methods, ...args)
Shortcut of `this.provider.notification`

## batch (RPCrequest[])
Shortcut of `this.provider.batch`

## subscribe (Methods, ...args)
Event Subscription: Share the same parameters passing mode with request

- **Returns**:
    - Promise<`event`>

- **Example**

```javascript

import provider from '@vite/vitejs/dist/es5/provider/WS';
import { client } from '@vite/vitejs';

const WS_RPC = new provider("https://example.com");

const myClient = new Client(WS_RPC, function(_myclient) {
    console.log("Connected.");
});

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

- **params**: 
  * `event`: return event of subscribe

## clearSubscriptions
Clear all the Subscriptions

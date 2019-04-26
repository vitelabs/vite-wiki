# NetProcessor

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-netprocessor --save
```

```bash tab:yarn
yarn add @vite/vitejs-netprocessor
```
:::

## Import

:::demo
```javascript tab:ES6
import { netProcessor } from '@vite/vitejs';
// Or
import netProcessor from '@vite/vitejs-netprocessor';
```

```javascript tab:require
const { netProcessor } = require('@vite/vitejs-netprocessor');
```
:::

## Constructor

- **Constructor Parameters**
    - `provider : Provider Instance`
    - `firstConnectCb : Function` : Callback function of first connection

- **Example**
```javascript
import WS_RPC from '@vite/vitejs-ws';
import netProcessor from '@vite/vitejs-netprocessor';
import { method } from '@vite/vitejs-constant';

const wsProvider = new WS_RPC("https://example.com");

const myNetProcessor = new netProcessor(wsProvider, function(_myclient) {
    console.log("Connected.");
});

myNetProcessor.request(method.ledger.getLatestSnapshotChainHash).then(() => {
    // ...
});
```

## Methods

### setProvider
Set provider

- **Parameters**
    * `provider : Provider Instance`
    * `abort : boolean` Whether or not to interrupt remaining provider request

### request (Methods, ...args)
Shortcut of `this.provider.request`

### notification (Methods, ...args)
Shortcut of `this.provider.notification`

### batch (RPCrequest[])
Shortcut of `this.provider.batch`

### subscribe
Event Subscription: Share the same parameters passing mode with request

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
import netProcessor from '@vite/vitejs-netprocessor';
import { client } from '@vite/vitejs';

const wsProvider = new WS_RPC("https://example.com");

const myNetProcessor = new netProcessor(wsProvider, function(_myNetProcessor) {
    console.log("Connected.");
});

myNetProcessor.subscribe('newAccountBlocks').then((event) => {
    event.on((result) => {
        console.log(result);
    });
    // event.off();
}).catch(err => {
    console.warn(err);
});
```

### unSubscribe
Cancel Subscription

- **Parameters**: 
  * `event`: Return event of subscribe

### clearSubscriptions
Clear all the Subscriptions

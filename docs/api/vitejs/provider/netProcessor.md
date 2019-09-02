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
    * `provider : Provider Instance`
    * `firstConnectCb : Function` : Callback function upon initial connection setup

- **Example**
```javascript
import WS_RPC from '@vite/vitejs-ws';
import netProcessor from '@vite/vitejs-netprocessor';
import { method } from '@vite/vitejs-constant';

const wsProvider = new WS_RPC("ws://example.com");

const myNetProcessor = new netProcessor(wsProvider, function(_myclient) {
    console.log("Connected.");
});

myNetProcessor.request(method.ledger.getLatestSnapshotChainHash).then(() => {
    // ...
});
```

## Methods

The following methods are specifically supported in NetProcessor.

### setProvider
Set provider

- **Parameters**
    * `provider : Provider Instance`
    * `abort : boolean` Whether the remaining requests on original provider will be abandoned

### request (Methods, ...args)

- **Parameters**
    * `methods : string` Method name
    * `...args` Request parameters

- **Returns**:
    * `Promise<JsonRPC response>`

- **Example**
```javascript
// ......

// {
//     jsonrpc: "2.0",
//     id: 33
//     method: "rpcMethodName"
//     params: [1, 1, 2]
// }
myNetProcessor.request('rpcMethodName', 1, 1, 2).then(() => {
    // ...
});
```

### notification (Methods, ...args)

- **Parameters**: 
  * `methodName : string` Method name
  * `params : any` Request parameters

### batch (RPCrequest[])

- **Parameters**
    * `__namedParameters: Object`
        - `type: string<request | notification>` Request type
        - `methodName: string` Method Name
        - `params: any` Request parameters

- **Returns**:
    * `Promise<JsonRPC response>`

- **Example**
```javascript
// ......

// [{
//     jsonrpc: "2.0",
//     id: 33
//     method: "rpcMethodName"
//     params: [1, 1, 2]
// }]
myNetProcessor.batch([
    type: 'request',
    methodName: 'rpcMethodName', 
    params: [1, 1, 2]
]).then(() => {
    // ...
});
```

### subscribe
Start event subscription

- **Parameters**
    * `methods : string` Method name
    * `...args : boolean` Parameters

- **Returns**:
    * `Promise<event>`

- **event.on**(`callback : Function`): Event listener. Event instance will be passed into the callback function once generated
- **event.off**: Stop listening to the event

- **Example**
```javascript
import WS_RPC from '@vite/vitejs-ws';
import netProcessor from '@vite/vitejs-netprocessor';
import { client } from '@vite/vitejs';

const wsProvider = new WS_RPC("ws://example.com");

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
Cancel subscription

- **Parameters**: 
  * `event`:  Event instance

- **Example**
```javascript
myNetProcessor.unSubscribe(event);
```

### clearSubscriptions
Clear all existing subscriptions

- **Example**
```javascript
myNetProcessor.clearSubscriptions();
```

# 快速开始  

1. `npm install @vite/vitejs-ws`
2. `npm install @vite/vitejs`
3. 新建文件 `test.js`
```javascript
const { WS_RPC } = require('@vite/vitejs-ws');
const { client } = require('@vite/vitejs');

let provider = new WS_RPC("ws://example.com");
let myClient = new client(provider, (_myClient) => {
    console.log("Connected");
});

myClient.ledger.getSnapshotChainHeight().then((result) => {
    console.log(result);
}).catch((err) => {
    console.warn(err);
});
```
4. `node test.js`
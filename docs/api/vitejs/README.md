---
sidebarDepth: 4
title: Start
---


## Install
- npm  
npm install @vitelabs/vitejs

- yarn   
yarn add @vitelabs/vitejs

## Quickly start  

### node/without webpack
```javascript

import provider from '@vite/vitejs/dist/es5/provider/WS';
import { client, constant } from '@vite/vitejs';

const { method } = constant;
let WS_RPC = new provider("https://example.com");

let myClient = new client(WS_RPC, (_myClient) => {
    _myClient.ledger.getSnapshotChainHeight().then((result) => {
        console.log(result);
    }).catch((err) => {
        console.warn(err);
    });
});

```

### webpack  

#### webpack.config  

```javascript
// ...
    resolve: {
        alias: {
            WSprovider: '@vite/vitejs/dist/es5/provider/WS'
        }
    }
// ...
```
#### use
```javascript

import provider from "WSprovider";
import { client } from '@vite/vitejs';

let WS_RPC = new provider("https://example.com");
let myClient = new client(WS_RPC);

```
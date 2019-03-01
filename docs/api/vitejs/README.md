---
sidebarDepth: 4
title: Start
---

:::tip Created by
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip Abstract
You can get to know about RPC API first before reading this documentation as most of the RPC API data in this project is directly exposed
:::

## Installation

- npm  
npm install @vite/vitejs

- yarn   
yarn add @vite/vitejs

## Quick Start  

### node/without webpack
```javascript

import provider from '@vite/vitejs/dist/providers/WS';
import { client, constant } from '@vite/vitejs';

const { method } = constant;
let WS_RPC = new provider("https://example.com");

let myClient = new client(WS_RPC, (_myClient) => {
    console.log("Connected");
});
myClient.ledger.getSnapshotChainHeight().then((result) => {
    console.log(result);
}).catch((err) => {
    console.warn(err);
});

```

### Webpack  

#### webpack.config  

```javascript
// ...
    resolve: {
        alias: {
            WSprovider: '@vite/vitejs/dist/providers/WS'
        }
    }
// ...
```

#### Usage
```javascript

import provider from "WSprovider";
import { client } from '@vite/vitejs';

let WS_RPC = new provider("https://example.com");
let myClient = new client(WS_RPC);

```

---
sidebarDepth: 4
title: 开始
---

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip abstract
阅读文档前, 可先行了解rpc接口, 这里大部分调用rpc接口的数据为直接暴露
:::

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs
```

```bash tab:yarn
yarn add @vite/vitejs
```
:::

## 快速开始  

### node/without webpack
```javascript

import provider from '@vite/vitejs/dist/es5/provider/WS';
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

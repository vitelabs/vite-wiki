---
sidebarDepth: 4
title: 开始
---

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

GoVite的JS类库

:::warning 注意

阅读文档前, 建议先行了解
1. [相关概念](./QA.md)
2. [Gvite-RPC](../rpc/README.md) 接口

:::

## 安装

:::demo

```bash tab:npm
npm install @vite/vitejs --save
npm install @vite/vitejs-ws --save
```

```bash tab:yarn
yarn add @vite/vitejs
yarn add @vite/vitejs-ws
```

:::

## 引入

:::demo

```javascript tab:ES6
import {
    abi, error, keystore, utils, constant,
    accountBlock, ViteAPI, wallet
} from '@vite/vitejs';

// 需要使用网络服务时，需单独安装http/ipc/ws包
import ws from '@vite/vitejs-ws';
import http from '@vite/vitejs-http';
import ipc from '@vite/vitejs-ipc';
```

```javascript tab:require
const {
    abi, error, keystore, utils, constant,
    accountBlock, ViteAPI, wallet
} = require('@vite/vitejs');

// 需要使用网络服务时，需单独安装http/ipc/ws包
const { WS_RPC } = require('@vite/vitejs-ws');
const { HTTP_RPC } = require('@vite/vitejs-http');
const { IPC_RPC } = require('@vite/vitejs-ipc');
```

:::

## 快速开始  

1. `npm install @vite/vitejs-ws`
2. `npm install @vite/vitejs`
3. 新建文件 `test.js`
```javascript
const { WS_RPC } = require('@vite/vitejs-ws');
const { ViteAPI } = require('@vite/vitejs');

let WS_service = new WS_RPC("ws://example.com");
let provider = new ViteAPI(WS_service, () => {
    console.log("Connected");
});

provider.request('ledger_getSnapshotChainHeight').then((result) => {
    console.log(result);
}).catch((err) => {
    console.warn(err);
});
```
4. `node test.js`
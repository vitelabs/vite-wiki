---
sidebarDepth: 4
title: Version 2.0.0
---

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip 简介

2.0.0版本及以上，对于vitejs包进行了细化拆分。

1. 如果你需要vitejs中的全部功能，可直接引用@vite/vitejs。
2. 若使用某个功能，可以单独引用某个包
@vite/vitejs-abi、@vite/vitejs-addraccount、@vite/vitejs-account、@vite/vitejs-accountblock、
@vite/vitejs-client、@vite/vitejs-communication、@vite/vitejs-constant、@vite/vitejs-error、
@vite/vitejs-hdaccount、@vite/vitejs-hdaddr、@vite/vitejs-keystore、@vite/vitejs-netprocessor、
@vite/vitejs-privtoaddr、@vite/vitejs-utils、@vite/vitejs-ws、@vite/vitejs-http、@vite/vitejs-ipc
3. 若使用部分功能，需要处理项目依赖以及避免不必要的代码重复，可安装@vite/vitejs，引用其中的es5模块，自行打包

【注意】
1. 引用npm包时最好版本一致，以避免不必要的错误与冲突。
2. 阅读文档前, 可先行了解RPC接口, 直接调用RPC接口，数据返回不做处理。

:::

## 安装

:::demo

```bash tab:npm
npm install @vite/vitejs
npm install @vite/vitejs-ws
```

```bash tab:yarn
yarn add @vite/vitejs
yarn add @vite/vitejs-ws
```

:::

## vitejs 结构

```javascript 引入
import {
    constant, error, utils, accountBlock, keystore, 
    privToAddr, hdAddr, netProcessor, client, 
    addrAccount, account, hdAccount, abi
} from '@vite/vitejs';

// 需要使用网络服务时，需单独安装http/ipc/ws包
import ws from '@vite/vitejs-ws';
import http from '@vite/vitejs-http';
import ipc from '@vite/vitejs-ipc';
```

## 快速开始  

```javascript

import provider from '@vite/vitejs-ws';
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

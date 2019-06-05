---
sidebarDepth: 4
title: Version 2.1.1
---

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

## 介绍

Vite JS 实现了生成地址、签名、abi等基础功能；IPC、HTTP、WS的rpc协议调用；对 [Gvite-RPC](../../rpc/README.md) 接口进行了上层封装；并且支持各类account实例，可以快捷生成钱包。

:::warning 注意

阅读文档前, 建议先行了解 [Gvite-RPC](../../rpc/README.md) 接口。

:::

## 安装

vitejs的任何包都支持es5语法，无需做特殊兼容。

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

**2.0.0版本及以上，vitejs包进行了细化拆分。**

:::warning 注意

引用 npm 包时最好版本一致，以避免不必要的错误与冲突。

:::

:::demo

```javascript tab:ES6
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

```javascript tab:require
const {
    constant, error, utils, accountBlock, keystore, 
    privToAddr, hdAddr, netProcessor, client, 
    addrAccount, account, hdAccount, abi
} = require('@vite/vitejs');

// 需要使用网络服务时，需单独安装http/ipc/ws包
const { WS_RPC } = require('@vite/vitejs-ws');
const { HTTP_RPC } = require('@vite/vitejs-http');
const { IPC_RPC } = require('@vite/vitejs-ipc');
```

:::

1. 如果你需要 ViteJS 中的全部功能，可直接引用`@vite/vitejs`。

```javascript tab:ES6
import {
    constant, error, utils, accountBlock, keystore, 
    privToAddr, hdAddr, netProcessor, client, 
    addrAccount, account, hdAccount, abi
} from '@vite/vitejs';
```

2. 若使用某一个功能，可以单独引用某一个包。
`@vite/vitejs-abi`、`@vite/vitejs-addraccount`、`@vite/vitejs-account`、`@vite/vitejs-accountblock`、
`@vite/vitejs-client`、`@vite/vitejs-communication`、`@vite/vitejs-constant`、`@vite/vitejs-error`、
`@vite/vitejs-hdaccount`、`@vite/vitejs-hdaddr`、`@vite/vitejs-keystore`、`@vite/vitejs-netprocessor`、
`@vite/vitejs-privtoaddr`、`@vite/vitejs-utils`、`@vite/vitejs-ws`、`@vite/vitejs-http`、`@vite/vitejs-ipc`

```javascript tab:ES6
import ws from '@vite/vitejs-ws';
import * as abi from '@vite/vitejs-abi';
```

3. 若使用部分功能，需要处理项目依赖以及避免不必要的代码重复，可安装`@vite/vitejs`，引用其中的es5模块，使用你喜欢的任意打包工具自行打包

```javascript tab:ES6
import * as abi from '@vite/vitejs/es5/abi';
import * as utils from '@vite/vitejs/es5/utils';
```

## 常用类型及说明
[可同时参考 constant 模块](./constant/constant.md)

```typescript
// RPC
export declare interface RPCrequest {
    type: string;
    methodName: Methods;
    params: any[];
}
export declare interface RPCresponse {
    jsonrpc: string;
    id: number;
    result?: any;
    error?: RPCerror;
}
export declare interface RPCerror {
    code: number;
    message: string;
}

export declare type Hex = string;
export declare type HexAddr = string;
export declare type Addr = string;
export declare type Base64 = string;
export declare type TokenId = string;
export declare type RawTokenId = string;
export declare type Int64 = number;
export declare type Uint64 = string;
export declare type BigInt = string;

export declare type AddrObj = {
    addr: Addr;         // 真实地址
    pubKey: Hex;        // 公钥
    privKey: Hex;       // 私钥
    hexAddr: HexAddr;   // hex编码地址
}

export declare type AccountBlock = {
    accountAddress: HexAddr;
    blockType: BlockType;
    prevHash: Hex;
    height: Uint64;
    hash: Hex;
    signature: Base64;
    publicKey: Base64;
    fee?: BigInt;
    fromBlockHash?: Hex;
    toAddress?: HexAddr;
    tokenId?: TokenId;
    amount?: BigInt;
    data?: Base64;
    nonce?: Base64;
    logHash?: Hex;
    sendBlockList?: Array;
}

// For example

// Type HexAddr
const hexAddr = "vite_69f3bdb5cdcfa145ae6cc42593a89088ff3dac587eb692d689";

// Type Addr
const addr = "69f3bdb5cdcfa145ae6cc42593a89088ff3dac5800";

// Type TokenId
const tokenId = "tti_5649544520544f4b454e6e40";

// Type RawTokenId
const rawTokenId = "5649544520544f4b454e";
```

## 快速开始  

1. `npm install @vite/vitejs-ws`
2. `npm install @vite/vitejs`
3. 新建文件 `test.js`
```javascript
const { WS_RPC } = require('@vite/vitejs-ws');
const { client } = require('@vite/vitejs');

let provider = new WS_RPC("wss://example.com");

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

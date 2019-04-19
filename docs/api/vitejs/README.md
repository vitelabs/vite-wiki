---
sidebarDepth: 4
title: Version 2.0.0
---

:::tip Created by
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip Introduction

Version 2.0.0 and above
We optimise the architecture of vitejs project and refine vitejs packages as well as split them into detailed functionality.

1. If you need to use all the functions of vitejs, you can import @vite/vitejs directly.
2. Or you can import some function individually.
@vite/vitejs-abi、@vite/vitejs-addraccount、@vite/vitejs-account、@vite/vitejs-accountblock、
@vite/vitejs-client、@vite/vitejs-communication、@vite/vitejs-constant、@vite/vitejs-error、
@vite/vitejs-hdaccount、@vite/vitejs-hdaddr、@vite/vitejs-keystore、@vite/vitejs-netprocessor、
@vite/vitejs-privtoaddr、@vite/vitejs-utils、@vite/vitejs-ws、@vite/vitejs-http、@vite/vitejs-ipc
3. If you need to process project dependency and any other redundant codes when using partial of functions, you can install @vite/vitejs and import es5 module, using whatever you like to package your project.
4.  Any of vitejs packages support es5 syntax, you do not have to do extra compatible coding.

「Notice」
1. You'd better keep npm packages' version in accordance with each other when importing them in order to avoid unnecessary errors and conflicts.
2. Before you start reading this document, we suggest that you can know about RPC api at first. The returned data are not processed when calling RPC api directly.

:::

## Installation

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

## Import

:::demo

```javascript tab:import
import {
    constant, error, utils, accountBlock, keystore, 
    privToAddr, hdAddr, netProcessor, client, 
    addrAccount, account, hdAccount, abi
} from '@vite/vitejs';

// If you need to use network services, you are required to install http/ipc/ws packages separately.
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

// If you need to use network services, you are required to install http/ipc/ws packages separately.
const { WS_RPC } = require('@vite/vitejs-ws');
const { HTTP_RPC } = require('@vite/vitejs-http');
const { IPC_RPC } = require('@vite/vitejs-ipc');
```

:::

## Quick Start  

```javascript

import provider from '@vite/vitejs-ws';
import { client, constant } from '@vite/vitejs';

const { methods } = constant;
let WS_RPC = new provider("wss://example.com");

let myClient = new client(WS_RPC, (_myClient) => {
 console.log("Connected");
});

myClient.ledger.getSnapshotChainHeight().then((result) => {
 console.log(result);
}).catch((err) => {
 console.warn(err);
});

```

## Common type and specification
[Refer to constant module](/api/vitejs/constant/constant.html)

- RPCrequest
    - type Request Type（request | notification | batch）
    - methodName [Method Name](/api/vitejs/constant/constant.html)
    - params Parameters

- RPCrequest
    - jsonrpc 2.0
    - id
    - result
    - error RPCerror

- RPCerror
    - code
    - message

```typescript example
export declare type Hex = string;
export declare type HexAddr = string;
export declare type Addr = string;
export declare type Base64 = string;
export declare type TokenId = string;
export declare type Int64 = number;
export declare type Uint64 = string;
export declare type BigInt = string;

export declare type AddrObj = {
    addr: Addr;         // Actual Address
    pubKey: Hex;        // Public Key
    privKey: Hex;       // Private Key 
    hexAddr: HexAddr;   // Hex Encode Address
}

export declare type AccountBlock = {
    accountAddress: HexAddr;
    blockType: BlockType;
    prevHash: Hex;
    snapshotHash: Hex;
    timestamp: Int64;
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
}

// For example

// Type HexAddr
const hexAddr = "vite_c5f6afcbf1e1827929d83cae9ccb054f5b06fef197191d1944";

// Type Addr
const addr = "69f3bdb5cdcfa145ae6cc42593a89088ff3dac58";

// Type TokenId
const tokenId = "tti_5649544520544f4b454e6e40";

// Type RawTokenId
const rawTokenId = "5649544520544f4b454e";
```

---
sidebarDepth: 4
title: Version 2.1.2 Introduction
---

:::tip Created by
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

Vite JS implements generation of addresses, signature, abi and other basic functions; rpc protocol calls of IPC, HTTP, and WS; encapsulate the [Gvite-RPC](../rpc/README.md) interface; and supports various account instances, which can quickly generate a wallet.

:::warning warning

Before you start reading this document, we suggest that you can know about [Gvite-RPC](../rpc/README.md) api at first.

:::

## Installation

Any of vitejs packages support es5 syntax, you do not have to do extra compatible coding.

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

**Version 2.0.0 and above. We optimise the architecture of vitejs project and refine vitejs packages as well as split them into detailed functionality.**

:::warning warning

You'd better keep npm packages' version in accordance with each other when importing them in order to avoid unnecessary errors and conflicts.

:::

:::demo

```javascript tab:ES6
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

1. If you need to use all the functions of ViteJS, you can import `@vite/vitejs` directly.

```javascript tab:ES6
import {
    constant, error, utils, accountBlock, keystore, 
    privToAddr, hdAddr, netProcessor, client, 
    addrAccount, account, hdAccount, abi
} from '@vite/vitejs';
```

2. If you need a certain function, you can import a package separately.
`@vite/vitejs-abi`、`@vite/vitejs-addraccount`、`@vite/vitejs-account`、`@vite/vitejs-accountblock`、
`@vite/vitejs-client`、`@vite/vitejs-communication`、`@vite/vitejs-constant`、`@vite/vitejs-error`、
`@vite/vitejs-hdaccount`、`@vite/vitejs-hdaddr`、`@vite/vitejs-keystore`、`@vite/vitejs-netprocessor`、
`@vite/vitejs-privtoaddr`、`@vite/vitejs-utils`、`@vite/vitejs-ws`、`@vite/vitejs-http`、`@vite/vitejs-ipc`

```javascript tab:ES6
import ws from '@vite/vitejs-ws';
import * as abi from '@vite/vitejs-abi';
import * as utils from '@vite/vitejs-utils';
```

3. If you need to process project dependency and any other redundant codes when using partial of functions, you can install `@vite/vitejs` and import es5 module, using whatever you like to package your project.

```javascript tab:ES6
import * as abi from '@vite/vitejs/es5/abi';
import * as utils from '@vite/vitejs/es5/utils';
```

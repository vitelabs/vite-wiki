---
sidebarDepth: 4
title: Start
---

:::tip Created by
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

As implementation of Vite JavaScript client API, **Vite JS** encapsulates [Vite RPC API](../rpc/README.md) and provides features like address generation, signature, ABI resolution, wallet function, etc. **Vite JS** supports IPC, HTTP and WebSocket protocols.

:::warning Warning

Necessary knowledge about [Vite RPC API](../rpc/README.md) should be present before reading this document.

:::

## Installation

ES5 syntax is supported in all Vite JS packages. Additional coding for ES5 compatibility is not necessary.

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

**Starting from v2.0.0, the package structure of ViteJS has been refactored for more direct and clear definition**.

:::warning Warning

Versions of imported npm packages should be consistent to avoid any incompatibility.

:::

:::demo

```javascript tab:ES6
import {
    constant, error, utils, accountBlock, keystore, 
    privToAddr, hdAddr, netProcessor, client, 
    addrAccount, account, hdAccount, abi
} from '@vite/vitejs';

// If you need to use network services, you must install http/ipc/ws packages separately.
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

// If you need to use network services, you must install http/ipc/ws packages separately.
const { WS_RPC } = require('@vite/vitejs-ws');
const { HTTP_RPC } = require('@vite/vitejs-http');
const { IPC_RPC } = require('@vite/vitejs-ipc');
```

:::

1. If you need all the functions of ViteJS, just import `@vite/vitejs` directly.

```javascript tab:ES6
import {
    constant, error, utils, accountBlock, keystore, 
    privToAddr, hdAddr, netProcessor, client, 
    addrAccount, account, hdAccount, abi
} from '@vite/vitejs';
```

2. If you need certain function, you can import the package separately. The list of packages contains
`@vite/vitejs-abi`, `@vite/vitejs-addraccount`, `@vite/vitejs-account`, `@vite/vitejs-accountblock`,
`@vite/vitejs-client`, `@vite/vitejs-communication`, `@vite/vitejs-constant`, `@vite/vitejs-error`,
`@vite/vitejs-hdaccount`, `@vite/vitejs-hdaddr`, `@vite/vitejs-keystore`, `@vite/vitejs-netprocessor`,
`@vite/vitejs-privtoaddr`, `@vite/vitejs-utils`, `@vite/vitejs-ws`, `@vite/vitejs-http` and `@vite/vitejs-ipc`

```javascript tab:ES6
import ws from '@vite/vitejs-ws';
import * as abi from '@vite/vitejs-abi';
import * as utils from '@vite/vitejs-utils';
```

3. If you need to handle project dependency and avoid code redundancy when using only part of functions, you can install `@vite/vitejs`, import es5 module and package your project in your own way.

```javascript tab:ES6
import * as abi from '@vite/vitejs/es5/abi';
import * as utils from '@vite/vitejs/es5/utils';
```

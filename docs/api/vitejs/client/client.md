# Introduction

The client module provides convenient access to [Vite RPC API](../rpc/README.md) in Vite JS.

:::tip Note
Some API method can only be visited under certain protocol. For example, all wallet API are only available in IPC.
:::

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-client --save
```

```bash tab:yarn
yarn add @vite/vitejs-client
```
:::

## Import

:::demo
```javascript tab:ES6
import { client } from '@vite/vitejs';
// Or
import client from '@vite/vitejs-client';
```

```javascript tab:require
const { client } = require('@vite/vitejs-client');
```
:::

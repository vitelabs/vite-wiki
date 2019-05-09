# Introduction
This part contains Gvite-RPC shortcuts.

The invocation of different levels of API varies from diverse connection ways. (All of the APIs that are underlying Gvite wallet will be accessible only by IPC.)

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

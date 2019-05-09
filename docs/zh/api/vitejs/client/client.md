# 介绍

包含对于 Gvite-RPC 接口的快捷调用方式.

不同连接方式可以调用不同级别的接口（Gvite wallet下的全部接口仅针对 ipc 连接开放).

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-client --save
```

```bash tab:yarn
yarn add @vite/vitejs-client
```
:::

## 引入

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

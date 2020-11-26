# HTTP

## 安装

:::demo
```bash tab:npm
npm install @vite/vitejs-http --save
```

```bash tab:yarn
yarn add @vite/vitejs-http
```
:::

## 引入

:::demo
```javascript tab:ES6
import HTTP_RPC from "@vite/vitejs-http";
```

```javascript tab:require
const { HTTP_RPC } = require('@vite/vitejs-http');
```
:::

## Constructor

- **Constructor Parameters**: 
    * `url : string` 连接 url Default: 'http://localhost:8415'
    * `timout : number` 超时时间(ms) Default: 60000
    * `Object` 
        - `headers : object` : 请求头信息

- **Example**:
```javascript
import HTTP_RPC from "@vite/vitejs-http";

const httpProvider = new HTTP_RPC("http://localhost:8080");
```

# HTTP

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-http --save
```

```bash tab:yarn
yarn add @vite/vitejs-http
```
:::

## Import

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
    * `url : string` Connection url. Default is 'http://localhost:8415'
    * `timout : number` Timeout(ms) Default is 60000
    * `Object` 
        - `headers : object` : Request header

- **Example**:
```javascript
import HTTP_RPC from "@vite/vitejs-http";

const httpProvider = new HTTP_RPC("http://localhost:8080");
```

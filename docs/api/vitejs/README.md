---
sidebarDepth: 4
title: 开始
---
## 安装
- npm  
npm install @vitelabs/vitejs

- yarn   
yarn add @vitelabs/vitejs

## 快速开始  

### node/without webpack
```javascript
const {client,constant} = require("@vite/vitejs");
const {initClientWithHttp} =client;
const {method}=constant;
const clientInstance=initClientWithHttp({
    host:"https://example.com",
    timeout:1000,
    headers:{}
})

client.request(method.tx.sendRawTx,{...})
```

### webpack  

#### webpack.config  

```javascript
...
    resolve: {
        alias: {
            vitejs:'@vite/vitejs/dist/es5'
            }
    }
...
```
#### use
```javascript

import {initClientWithHttp} from "vitejs/client";
import {tx} from "vitejs/const/method";

const clientInstance=initClientWithHttp({
    host:"https://example.com",
    timeout:1000,
    headers:{}
})
client.request(tx.sendRawTx,{...})
```
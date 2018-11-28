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
```javascript
import {httpProvider} from "@vitelabs/vitejs/provider";
import services from "@vitelabs/vitejs/services";
import {methods} from "@vitelabs/vitejs/const"
const provider=new httpPorvider({

});
const client=new services(provider);
client.request(methods.tx.sendRawTx,{...})
```
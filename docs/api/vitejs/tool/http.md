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

## Properties

|  名称  | 类型 | 说明 |
|:------------:|:-----:|:-----:|
| type |  string | 网络传输协议类型 |
| timeout | number(ms) | 请求超时时间 |


## Methods

### abort
打断当前连接的剩余请求，并将请求列表清空

### request
发起request请求

- **Parameters**: 
  * `methodName : string` 方法名
  * `params : any` 请求参数

- **Returns**:
    - Promise<`JsonRPC response`>

### notification

- **Parameters**: 
  * `methodName : string` 方法名
  * `params : any` 请求参数

### batch

- **Parameters**: 
  * `requests : array<object>` 
	- `type : string<request | notification | batch>` : 请求类型
    - `methodName : string`: 方法名
    - `params : any`: 请求参数

- **Returns**:
    - Promise<`JsonRPC response`>

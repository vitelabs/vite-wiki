# http

## contructor

- **constructor params**: 
  * `url : string` 连接url  default: 'http://localhost:8415'
  * `timout : number` 超时时间（ms） default: 60000
  * `Object` 
	- `headers : object` : 请求头信息

- **Example**:

```javascript

import httpProvider from "@vite/vitejs/dist/es5/provider/HTTP";
const http = new httpProvider("http://localhost:8080");

```

## Provider 实例

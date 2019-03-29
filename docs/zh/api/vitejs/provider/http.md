# Http

:::tip abstract
@vitejs/vitejs-http
:::

## Constructor

- **constructor params**: 
  * `url : string` Connecting url  default: 'http://localhost:8415'
  * `timout : number` Timeout（ms） default: 60000
  * `Object` 
	- `headers : object` : Request Header Information

- **Example**:

```javascript

import httpProvider from "@vite/vitejs-http";
const http = new httpProvider("http://localhost:8080");

```

## Provider Instance

# HTTP

## Construct

- **Constructor Params**: 
  * `url : string` Connection url  default: 'http://localhost:8415'
  * `timout : number` Timeout（ms） Default: 60000
  * `Object` 
	- `headers : object` : Request Header Information

- **Returns**: 
	- `Provider` provider instance

- **Example**:
```javascript

import httpProvider from "@vite/vitejs/dist/es5/provider/HTTP";
const http = new httpProvider("http://localhost:8080");

```

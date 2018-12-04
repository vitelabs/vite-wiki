# 常量

:::作者
[hurrytospring](https://github.com/hurrytospring)
:::

:::abstract
与gvite连接的实现层，可以通过http，websocket，ipc与gvite连接。不同连接方式可以调用不同级别的接口。
:::

## httpProvider
- **constructor params**: 

  * `url`:`string` 连接url
  * `timout`:`number` 超时时间（ms） default：1000
  * `header`:`object` 请求头信息

- **Returns**: 
	- `httpProvider` http provider 实例

- **Example**:
```javascript
import {httpProvider} from "@vite/vitejs/provider";
const h=new httpProvider({
    url:"http://localhost:8080"
})
```

## websocket
- **constructor params**: 

  * `url`:`string` 连接url
  * `protocol`:`string` 超时时间（ms） default：1000
  * `header`:`object` 请求头信息
  * `clientConfig`
  * `timeout`:`number`

- **Returns**: 
	- `wsProvider` http provider 实例

- **Example**:
```javascript
import {wsProvider} from "@vite/vitejs/provider";
const h=new wsProvider({
    url:"ws://localhost:8080"
})
```

## ipc  
- **constructor params**: 

  * `path`:`string` 连接path
  * `delimiter`:`string` 分割符 default:`\n`
  * `timeout`:`number` 超时时间（ms） default：1000

- **Returns**: 
	- `httpProvider` http provider 实例

- **Example**:
```javascript
import {ipcProvider} from "@vite/vitejs/provider";
const h=new ipcProvider({
    path:"~/.gvite/testdata/gvite.ipc"
})
```

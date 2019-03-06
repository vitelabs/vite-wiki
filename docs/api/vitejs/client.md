---
sidebarDepth: 1
---
# Client Side

:::tip Created by
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip Abstract
This part contains built-in shortcuts
:::

## Notice 
1. You can leave out those optional parameters in Methods of buildinTxBlock as below when requestType equals to async
2. Every methods in it can be invoked by `client.namespace.funcName`, learn more in constructor/example

## Constructor extends netProcessor
继承netProcessor的所有方法 (setProvider / request / notification / batch / subscribe / unSubscribe / clearSubscriptions)

- **constructor params**
    - `provider : Provider Instance`
    - `firstConnectCb : function` : Callback function of first connection

- **Example**

```javascript

import provider from '@vite/vitejs/dist/es5/provider/WS';
import { client } from '@vite/vitejs';

const WS_RPC = new provider("https://example.com");

const myClient = new Client(WS_RPC, function(_myclient) {
    console.log("Connected.");
});

const block = _myclient.buildinTxBlock.getAccountBlock.sync(
    //...
);

_myclient.onroad.getOnroadBlocksByAddress.then((data) => {
    console.log(data);
});

```

## buildinTxBlock
Refer to buildinTxBlock

## buildinLedger
Refer to buildinLedger

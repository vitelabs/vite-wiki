# 节点配置文件

``` javascript
{
  "NetID": 2, //网络id, 用于识别网络环境，testNet 1.0.0 为2，请勿更改
  "Identity": "vite-node-name",  // 此处
  "MaxPeers": 200, // 最大连接peer数目，控制最多允许互联的节点个数，无须更改
  "MaxPendingPeers": 20, //最大允许的的节点，无须更改
  "BootNodes": [
    ""
  ], //引导节点的列表，用于启动和测试网络连接，无须更改
  "Port": 8483, // udp和tcp通讯端口，无须更改，需要保证此端口没有被系统其它进程占用
  "RPCEnabled": true, // 是否开启http rpc，默认开启，如需关闭，可以改为false
  "HttpHost": "0.0.0.0", // http监听ip，可以指定固定网卡，如无特殊需求，无须修改。
  "HttpPort": 48132, // http api，监听端口，默认无须修改
  "WSEnabled": true, // 是否开启websocket，默认开启，如有需求
  "WSHost": "0.0.0.0", //websocket 监听ip，默认监听所有网卡，无须更改
  "WSPort": 41420, // websocket 端口，默认无须更改
  "IPCEnabled": true, //需要开启，用于命令行交互
  "PublicModules":[
    "ledger",
    "public_onroad",
    "net",
    "contract",
    "pledge",
    "register",
    "vote",
    "mintage",
    "consensusGroup",
    "tx",
    "debug",
    "pow"
  ], // rpc 接口开启的组件列表，默认列表，无须更改。
  "Miner": true, // 是否挖矿，true代表挖矿节点，开启后注册超级节点可以挖矿，普通全节点可以关闭
  "CoinBase": "0:vite_d2fef1e5ffa7d9139bd7c80a672e0530789bac6c7c9ff58dc6", // 挖矿的keystore地址索引和文件名，文件需要在wallet目录。
  "EntropyStorePath": "vite_d2fef1e5ffa7d9139bd7c80a672e0530789bac6c7c9ff58dc6", //keystore的文件名称
  "EntropyStorePassword": "", //keystore对应的密码
  "TopoDisabled": true, // topu传播，默认关闭，无须更改。
  "LogLevel": "info" // 日志级别，默认info级别，无须更改
}
```

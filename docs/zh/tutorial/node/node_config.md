# 节点配置文件

``` javascript
{
  "NetID": 1, //网络id, 用于识别网络环境，premainnet为1，请勿更改
  "Identity": "vite-node-name",  // 节点名称
  "MaxPeers": 10, // 最大连接peer数目，控制最多允许互联的节点个数，无须更改
  "MaxPendingPeers": 10, //最大同时接入的节点数，无须更改
  "BootSeed": [
    "https://bootnodes.vite.net/bootmainnet.json" // bootseed地址，可以通过这个地址获取boot节点
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
    "dashboard",  // 全节点状态数据上报
    "sbpstats"
  ], // rpc 接口开启的组件列表，默认列表，无须更改。
  "Miner": true, // 是否挖矿，true代表挖矿节点，开启后注册超级节点可以挖矿，普通全节点可以关闭
  "CoinBase": "0:vite_d2fef1e5ffa7d9139bd7c80a672e0530789bac6c7c9ff58dc6", // 挖矿的keystore地址索引和文件名，文件需要在wallet目录。
  "EntropyStorePath": "vite_d2fef1e5ffa7d9139bd7c80a672e0530789bac6c7c9ff58dc6", //keystore的文件名称
  "EntropyStorePassword": "", //keystore对应的密码
  "DashboardTargetURL":"wss://stats.vite.net",  // 全节点数据上报地址
  "RewardAddr":"vite_xxx",   // 全节点奖励地址
  "LogLevel": "info", // 日志级别，默认info级别，无须更改
  "VmLogAll": false, // 值为false时不保存合约的vmlog（即event），值为true时保存所有合约的vmlog
  "VmLogWhiteList": ["vite_bc68fb14f8a81015af1d28e6f88edff1e1db48473aca563a34"] // 保存指定合约的vmlog
}
```

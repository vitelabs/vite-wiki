# 安装

## gvite节点是什么?
gvite节点分为`全节点`和`超级节点`，超级节点是特殊的全节点。目前全节点存储全量的账本数据，并且和全网同步数据达成共识。
全节点可以完成GVITE支持的所有功能，例如通过全节点，可以获取全网的数据，也可以作为发送交易和接收交易的操作节点以及竞选超级节点和对超级节点投票。
全节点支持开启 `HTTP`、`WEBSOCKET` 和 `IPC API`，同样支持`命令行`模式和其交互。

## 开始之前
安装方式支持`二进制`安装和`源码`安装两种

| 操作系统 | ubuntu  |  mac |   windows |
| ------------- | ------------------------------ |------|-------|
| gvite 1.0.0 testNet  | yes  |yes |yes |

* 源码编译需要额外的go环境安装，需要go环境至少需要1.11.1及以上, 官方地址: [go 安装和下载](https://golang.org/dl/)

## 二进制文件安装gvite
通过命令行下载和安装gvite, 支持ubuntu、mac、centos、windows
ubuntu:
```
## 下载
curl -L -O https://github.com/vitelabs/go-vite/releases/download/1.0.0/gvite-1.0.0-linux-amd64.tar.gz
## 解压
tar -xzvf gvite-1.0.0-linux-amd64.tar.gz
## 进入解压目录，包含三个文件 gvite、bootstrap 和 node_config.json
cd gvite-1.0.0-linux-amd64/
## 启动
./bootstrap
```
程序是否正常启动，通过查看启动脚本所在目录的 gvite.log 看日志来确定, 这个文件
```
cat gvite.log
```
如下说明启动成功
```
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.DataDir:/home/ubuntu/.gvite/testdata module=gvite/node_manager
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.KeyStoreDir:/home/ubuntu/.gvite/testdata/wallet module=gvite/node_manager
Prepare the Node success!!!
Start the Node success!!!
```

* gvite 执行程序
* bootstrap 启动脚本
* node_config.json 配置文件 [配置说明]()

系统默认端口 8483、8484，需要保证没有被其他程序占用，并且防火墙允许其通信
```
 netstat -nlp|grep 8483 
```
确定是否有被占用，例如gvite正常启动后会显示 
```
netstat -nlp|grep 8483
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
tcp6       0      0 :::8483                 :::*                    LISTEN      22821/gvite     
udp6       0      0 :::8483                 :::*                                22821/gvite
```

运行目录说明
```
cd ~/.gvite/testdata
```
这是gvite的数据目录，在下面你会看到ledger  ledger_files  LOCK  p2p  rpclog  runlog  wallet 等目录和文件。
gvite 数据目录说明:
* ledger 账本目录
* rpclog rpc访问日志
* runlog 运行日志目录, runlog目录
* wallet 钱包keyStore目录，用于存储私钥生成的keyStore文件，如果是超级节点涉及到挖矿账户安全，请`妥善保管`

## 源码安装gvite
* golang 环境确认
```
go env
```
>需要至少安装1.11.0 以上版本golang
golang 安装方法 [go 安装](https://golang.org/doc/install)


* github 下载源码

* 编译可执行文件

* 配置文件配置

* 启动脚本编写



## node_config配置文件说明
``` json
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

## 超级节点配置说明
和全节点基本一样，额外需要开启挖矿，并且配置keystore文件。

1、生成keystore文件，keystore是助记词，也就是私钥，所以非常重要。参见keyStore生成方法。
得到keystore，如primaryAddr vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf，请修改为自己的地址


2、修改node_config.json的配置
a、增加Miner 的值为 true
增加 CoinBase为格式为 `索引:地址`的格式，例如 0:vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf，请修改为自己的地址
b、增加 EntropyStorePath 为自己的地址，例如vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf，请修改为自己的地址
c、增加EntropyStorePassword为自己的keystore 对应的密码，keyStore 文件生成方法中的输入的123456，`请修改为自己的密码`

3、重启全节点即可
找到进程
```ps -ef|grep gvite```
得到
```
ubuntu   27268     1 99 16:00 ?        01:54:56 ./gvite -pprof 
```
执行
```
kill -9 27268
```
杀死进程

重新执行
```
./bootstrap
```
利用 ps -ef 来查看进程是否启动成功即可


## keyStore 文件生成方法
* 我还没有助记词
通过命令行得到keyStore文件，
1、首先参照全节点的启动方式，启动全节点。
2、通过命令行连接全节点：找到全节点的目录gvite文件。进入到该目录，然后执行如下命令
```./gvite attach ~/.gvite/testdata/gvite.ipc```

得到类似如下的结果，代表已经连接成功
```
INFO[11-12|16:47:07] cannot read the config file, will use the default config module=config error="open vite.config.json: no such file or directory"
INFO[11-12|16:47:07]                                          monitor-log=/home/ubuntu/go-vite/backend-log/backend.log.30693
Welcome to the Gvite JavaScript console!
->
```
在交互命令行中输入：
```
vite.wallet_newMnemonicAndEntropyStore("123456")
```
其中123456 为keystore的密码，需要指定为自己的密码，并且牢记该密码。

```
{"jsonrpc":"2.0","id":1,"result":{"mnemonic":"24 g个单词","primaryAddr":"vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf","filename":"~/.gvite/testdata/wallet/vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf"}}
```
`mnemonic`:  助记词，十分重要，请牢记，并安全记录。
`primaryAddr`: 助记词对应的第一个vite地址
`filename`: 保存助记词的keyStore的所在位置，无须修改，挖矿需要指定

执行exit 退出交互式命令行

* 通过助记词恢复

如果你已经有了助记词，想要生成keyStore文件，
通过命令行连接全节点，参照如上生成新的助记词的方法
然后在交互命令行中输入

```
vite.wallet_recoverEntropyStoreFromMnemonic("utility client point estate auction region jump hat sick blast tomorrow pottery detect mixture clog able person matrix blast volume decide april congress resource","123456")
```
其中 utility client point estate auction region jump hat sick blast tomorrow pottery detect mixture clog able person matrix blast volume decide april congress resource 修改为自己的助记词
其中123456 为keystore的密码，需要指定为自己的密码，并且牢记该密码。

返回结果类似如下：
```
    "jsonrpc": "2.0",
    "id": 4,
    "result": {
        "mnemonic": "utility client point estate auction region jump hat sick blast tomorrow pottery detect mixture clog able person matrix blast volume decide april congress resource",
        "primaryAddr": "vite_981bca7a348de85bd431b842d4b6c17044335f71e5f3da59c0",
        "filename": "~/.gvite/testdata/wallet/vite_981bca7a348de85bd431b842d4b6c17044335f71e5f3da59c0"
    }
}
```
这样就得到了助记词对应的keyStore文件




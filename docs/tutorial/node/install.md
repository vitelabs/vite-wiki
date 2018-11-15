# 安装

## gvite节点是什么?

gvite节点分为`全节点`和`超级节点`，超级节点是特殊的全节点。目前全节点存储全量的账本数据，并且和全网同步数据达成共识。 全节点可以完成GVITE支持的所有功能，例如通过全节点，可以获取全网的数据，也可以作为发送交易和接收交易的操作节点以及竞选超级节点和对超级节点投票。 全节点支持开启 `HTTP`、`WEBSOCKET` 和 `IPC API`，同样支持`命令行`模式和其交互。

## 开始之前

安装方式支持`二进制`安装和`源码`安装两种

| 操作系统                | ubuntu | mac | windows |
| ------------------- | ------ | --- | ------- |
| gvite 1.0.0 testNet | yes    | yes | yes     |

:::tip 源码编译需要额外的go环境安装，需要go环境至少需要1.11.1及以上, 官方地址: [go 安装和下载](https://golang.org/dl/) :::

## 二进制文件安装gvite

通过命令行下载和安装gvite, 支持ubuntu、mac、centos、windows

### ubuntu安装示例

```bash
## 下载
curl -L -O https://github.com/vitelabs/go-vite/releases/download/1.0.0/gvite-1.0.0-linux-amd64.tar.gz
```

    ## 解压
    tar -xzvf gvite-1.0.0-linux-amd64.tar.gz
    

    ## 进入解压目录，包含三个文件 gvite、bootstrap 和 node_config.json
    cd gvite-1.0.0-linux-amd64/
    

    ## 启动
    ./bootstrap
    

程序是否正常启动，通过查看启动脚本所在目录的 gvite.log 看日志来确定, 这个文件

```bash
cat gvite.log
```

如下说明启动成功

```bash
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.DataDir:/home/ubuntu/.gvite/testdata module=gvite/node_manager
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.KeyStoreDir:/home/ubuntu/.gvite/testdata/wallet module=gvite/node_manager
Prepare the Node success!!!
Start the Node success!!!
```

### mac 安装示例

```bash
## 下载
curl -L -O https://github.com/vitelabs/go-vite/releases/download/1.0.0/gvite-1.0.0-darwin-amd64.tar.gz
## 解压
tar -xzvf gvite-1.0.0-darwin-amd64.tar.gz
## 进入解压目录，包含三个文件 gvite、bootstrap 和 node_config.json
cd gvite-1.0.0-darwin-amd64
## 启动
./bootstrap
```

程序是否正常启动，通过查看启动脚本所在目录的 gvite.log 看日志来确定, 这个文件

```bash
cat gvite.log
```

如下说明启动成功

```bash
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.DataDir:/home/ubuntu/.gvite/testdata module=gvite/node_manager
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.KeyStoreDir:/home/ubuntu/.gvite/testdata/wallet module=gvite/node_manager
Prepare the Node success!!!
Start the Node success!!!
```

### 目录文件说明

* `gvite`： 执行程序
* `bootstrap`： 启动脚本
* `node_config.json`： 配置文件 \[配置说明\](./install.md#node-config配置文件说明)

### 端口

系统默认端口 8483、8484，需要保证没有被其他程序占用，并且防火墙允许其通信

```bash
 netstat -nlp|grep 8483 
```

确定是否有被占用，例如gvite正常启动后会显示

    netstat -nlp|grep 8483
    (Not all processes could be identified, non-owned process info
     will not be shown, you would have to be root to see it all.)
    tcp6       0      0 :::8483                 :::*                    LISTEN      22821/gvite     
    udp6       0      0 :::8483                 :::*                                22821/gvite
    

### 运行目录说明

```bash
cd ~/.gvite/testdata
```

这是gvite的数据目录，在下面你会看到ledger ledger_files LOCK p2p rpclog runlog wallet 等目录和文件。 gvite 数据目录说明:

* `ledger`： 账本目录
* `rpclog`： rpc访问日志
* `runlog`： 运行日志目录, runlog目录
* `wallet`： 钱包keyStore目录，用于存储私钥生成的keyStore文件，如果是超级节点涉及到挖矿账户安全，请`妥善保管`

## 源码安装gvite

* golang 环境确认

    go env
    

:::warning 需要至少安装1.11.0 以上版本golang golang 安装方法 [go 安装](https://golang.org/doc/install) :::

### github 下载源码

* 安装go环境

### 编译可执行文件

* 在终端执行 ```go get github.com/vitelabs/go-vite``` 代码所在位置 ```$GOPATH/src/github.com/vitelabs/go-vite/``` GOPATH 默认位置是 ```~/go```

### 配置文件配置

node_config.json 参见配置文件说明

### 启动脚本编写

配置文件和编译后的gvite在同一目录，例如linux 环境通过执行 ```nohup ./gvite -pprof >> gvite.log 2>&1 &``` 启动

## node_config配置文件说明

```javascript
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

* 创建钱包：钱包的生成参见：\[钱包管理\](./install.html#钱包管理)。

* 修改node_config.json的配置 在node_config.json 末尾新增4个配置，Miner、CoinBase和EntropyStorePath及EntropyStorePassword
    
    * 增加Miner属性值为 true
    * 增加 CoinBase为格式为 `索引:地址`的格式，例如 0:vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf，请修改为自己的地址
    * 增加 EntropyStorePath属性值 为自己的地址，例如vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf，请修改为自己的地址
    * 增加EntropyStorePassword属性值为自己的keystore 对应的密码，keyStore 文件生成方法中的输入的123456，`请修改为自己的密码`

**完整的示例如下：**

```json
{
    "NetID": 2,
    "Identity": "vite-38",
    "PrivateKey": "83af2b5b8fe90ecfadd69251e318a56b6e137873b610cccb90dc8ed4c117b410f0591ba79efd68de030fb2e49607f87ea944c40652d82f29305c2c28b7d5b4e7",
    "MaxPeers": 200,
    "MaxPendingPeers": 20,
    "BootNodes": [
        "vnode://864c763b198f7234e90e25c935c77f84866def8590afec4af1545ca2e45ca926@3.8.77.15:8483", "vnode://c4134dcfa3d2630613e5dae9efdc69a6eb94554a5039e56e8aa0992ab22945c6@34.247.68.140:8483", "vnode://766fbe9b0406d1978b4f433e558e1895e94c3698e6c29ec2c2042a5e516825a1@35.182.1.144:8483", "vnode://88e9933d098cad9a387cdd5ea2431c9fcb9abf0f98f95a9a7773d616cf8eab77@54.164.163.91:8483", "vnode://63b8794c10ee807f8f4617187d9eeac06532aee023f7d1f3484748d092ebf759@54.245.179.219:8483", "vnode://9355d23d1be9659987a019953ba5fd22a722db89914075004560862a909a371b@13.113.140.139:8483", "vnode://1ce4ce54cc978fdc333398bbb8beda3ae3fe3eacc34d04de1976d7fb91074406@52.78.84.56:8483", "vnode://8a6079744a54147dd6e95ec66aed5aac52bec5b5f5d85426e3888bda22a9f6f2@13.229.135.72:8483", "vnode://3ada84473109cc881d65c3d80dfef348c2f6f038c52f5b9dcea1e96cb3ebc2e9@13.233.84.63:8483", "vnode://6913de145fe933f2ba2835ab33a00c289b93167ce82e7bcccffedb67d7e19e3f@18.194.106.196:8483", "vnode://99d333bc795cb2b42f1a64309669356ae47cac8a5fc652ca39b212bd0bb8564b@13.210.254.88:8483", "vnode://22ac75beb6302823c15003fdf2972f4d1c8690e2afffa9aa76b7c7826372ca2a@45.32.120.252:8483", "vnode://0b459ee0817dc0e59dacff0d257220ea69aa7fb7ac88633df592ea20b13b6419@104.238.189.237:8483", "vnode://2b7cb786a1f7745b743139dfcd8a8a8323d7610da52cb2f2d4f27b1d0531e09e@108.61.170.32:8483", "vnode://6a01f4333f6b6466229d6cdf88892ef57c8ef78aaf41f9a5ae0d4938b59a3f31@95.179.147.156:8483", "vnode://fb528a6231fee579d7797679c128b7efef72f486b58881e06df52fd41b381900@118.25.177.35:8483", "vnode://11da939194ff9e605072608d86faacd06f7aa0fe443db4267025a701aac9c26b@118.25.72.17:8483", "vnode://681e4ffd550a86b2b308fc2058660acc1deb87b09ccb5cf7682b324414698e74@118.25.141.229:8483", "vnode://17d4fa71d89b06452c6e1fbd5b859550ff4ed55cadf519f155cd5a9aaf6c18f7@119.28.32.48:8483", "vnode://f0929aaaf8a8f7bb11494c0d973b52c6776313d26ad83fa124abcde7aa54ff46@119.28.221.175:8483", "vnode://e83d7675cefe682a5fc801d490c423e09f811a7464b7ac4e6bbc6642183dd229@150.109.40.238:8483", "vnode://f5d44b70b561471ec96bab6bc2313b1efa71022f0f1ecbe73860d1edfa2434d3@150.109.46.50:8483", "vnode://c201fb8388f7e7aabf21c851c7f75c5eda66f094c94866e5d9388e9c4fef4246@150.109.101.112:8483", "vnode://23c36e0e5f4fe2e1daf9af7bd91c7fc2a84453152fde4ff9422118ff50e28e7a@35.236.34.242:8483", "vnode://f2d3b0bd08b14d7b50149b259524907ccc63297173b129c496e64307aa4feef1@35.231.210.8:8483", "vnode://5e3520758a462b9f8175ce872090d5bd44342aac52c4704f0d12128acd610096@150.109.105.154:8483", "vnode://61afd431ccd9079fc644acc7c643f04e4b92c379f5c8ab92e4fe11a87ee1bd59@118.25.109.87:8483", "vnode://cedf763228c7fa841b67ee04e57d7ee6d2e90e927585c0f96872b8ee92a1e4ff@118.25.49.80:8483", "vnode://cb4153736d23d1858f621447963c54e8c0e0fae71a1529ad57ea86e3ba22760a@118.24.129.159:8483", "vnode://abdfba548c32b0dd8ae7265def5314a9ea98f231939a6552cf000ef7962c327f@118.24.112.219:8483", "vnode://8f89b521d4ce2437fe5872287187646a06a9ca2810d2988469ed6ee8a2003ab8@118.24.26.130:8483", "vnode://b3bfad13fe29078c7719256345ffb871a8184af211e45fd2ad9ee1f3b155f5eb@118.24.112.185:8483", "vnode://2e0ae36065b544d82f1b9e04e51c0c12d4596279f1924118550d414f016e1345@118.24.80.136:8483", "vnode://445fac2e8045f53ebe6da7f4c173820ab303d11b047e6fc381d5c1f96e12df4a@188.131.179.254:8483", "vnode://af1a36543edbcb473254eb46359f16e9f63dc96468017511448648217788cf12@188.131.180.157:8483", "vnode://62c05a8850ae35f91d1c729412376e046df1a151d54b9d6727247824450abd1e@188.131.150.140:8483", "vnode://697ead367c7121a05424ba36749f36d4b769339a8077f776a0aaacc3bc6bc1de@188.131.179.248:8483", "vnode://1d39caaf81e89e5d711b10b33e3097d538d8f7858244357eb492e3e3e6a6fab5@140.143.8.202:8483", "vnode://f0591ba79efd68de030fb2e49607f87ea944c40652d82f29305c2c28b7d5b4e7@139.199.74.104:8483", "vnode://962216b6287fab85f92adf2f8b289fca528eb8a533388d1ff75aa7c16f8a8eb3@134.175.105.236:8483", "vnode://1514ec5f5fb9628dfce9b2cf6ccb0bc9a59166f266f08ebe977c396a977cf0e2@139.199.76.167:8483", "vnode://b877dc9d759a78e39e8e37ec6f68963ef78f5d5b7d367bc007e7113b3dc97eeb@134.175.1.34:8483", "vnode://2bcdda8b936ccf3aac2c87960e20b6be458e82fc65e64ceb428b8d2873549479@134.175.18.252:8483"
    ],
    "Port": 8483,
    "RPCEnabled": true,
    "HttpHost": "0.0.0.0",
    "HttpPort": 48132,
    "WSEnabled": true,
    "WSHost": "0.0.0.0",
    "WSPort": 41420,
    "HttpVirtualHosts": [],
    "IPCEnabled": true,
    "PublicModules": [
        "ledger",
        "public_onroad",
        "net",
        "contract",
        "pledge",
        "register",
        "vote",
        "mintage",
        "consensusGroup",
        "tx"
    ],
    "Miner": true,
    "CoinBase": "0:vite_d2fef1e5ffa7d9139bd7c80a672e0530789bac6c7c9ff58dc6",
    "EntropyStorePath": "vite_d2fef1e5ffa7d9139bd7c80a672e0530789bac6c7c9ff58dc6",
    "EntropyStorePassword": "123456",
    "TopoDisabled": true,
    "LogLevel": "info"
}
```

* 重启全节点即可 找到进程 ```ps -ef|grep gvite``` 得到

    ubuntu   27268     1 99 16:00 ?        01:54:56 ./gvite -pprof 
    

执行

```bash
kill -9 27268
```

杀死进程

重新执行

```bash
./bootstrap
```

利用 ps -ef 来查看进程是否启动成功即可

## 钱包管理

### 新建钱包

通过命令行创建一个新的钱包

* 首先参照全节点的启动方式，启动全节点。
* 通过命令行连接全节点：找到全节点的目录gvite文件。进入到该目录，然后执行如下命令
    
    ```bash
    ./gvite attach ~/.gvite/testdata/gvite.ipc
    ```
    
    得到类似如下的结果，代表已经连接成功
    
        INFO[11-12|16:47:07] cannot read the config file, will use the default config module=config error="open vite.config.json: no such file or directory"
        INFO[11-12|16:47:07]                                          monitor-log=/home/ubuntu/go-vite/backend-log/backend.log.30693
        Welcome to the Gvite JavaScript console!
        ->
        
    
    在交互命令行中输入：

```javascript
vite.wallet_newMnemonicAndEntropyStore("123456")
```

其中 `123456` 为keystore的密码，需要指定为自己的密码，并且牢记该密码。

```json
{
    "jsonrpc": "2.0", 
    "id": 1, 
    "result": {
        "mnemonic": "24 g个单词", 
        "primaryAddr": "vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf", 
        "filename": "~/.gvite/testdata/wallet/vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf"
    }
}
```

* `mnemonic`: 助记词，十分重要，请牢记，并安全记录。
* `primaryAddr`: 助记词对应的第一个vite地址
* `filename`: 保存助记词的keyStore的所在位置，无须修改，挖矿需要指定

执行 `exit` 退出交互式命令行

### 通过助记词恢复钱包

如果你已经有了助记词，想要使用助记词来恢复钱包

通过命令行连接全节点，参照如上生成新的助记词的方法

然后在交互命令行中输入

```javascript
vite.wallet_recoverEntropyStoreFromMnemonic("Your Mnemonic","123456")
```

其中 `Your Mnemonic` 修改为自己的助记词

其中 `123456` 为keystore的密码，需要指定为自己的密码，并且牢记该密码。

例如：

:::demo ```javascript tab: 命令行输入 vite.wallet_recoverEntropyStoreFromMnemonic("utility client point estate auction region jump hat sick blast tomorrow pottery detect mixture clog able person matrix blast volume decide april congress resource","123456")

    ```json tab: 返回
    {
        "jsonrpc": "2.0",
        "id": 4,
        "result": {
            "mnemonic": "utility client point estate auction region jump hat sick blast tomorrow pottery detect mixture clog able person matrix blast volume decide april congress resource",
            "primaryAddr": "vite_981bca7a348de85bd431b842d4b6c17044335f71e5f3da59c0",
            "filename": "~/.gvite/testdata/wallet/vite_981bca7a348de85bd431b842d4b6c17044335f71e5f3da59c0"
        }
    }
    

:::

这样就得到了助记词对应的keyStore文件

### 命令行确认当前节点高度

* 首先参照全节点的启动方式，启动全节点。
* 通过命令行连接全节点：找到全节点的目录gvite文件。进入到该目录，然后执行如下命令 
        bash
        ./gvite attach ~/.gvite/testdata/gvite.ipc 在交互命令行中输入：

```javascript
vite.ledger_getSnapshotChainHeight();
```

得到

    "{\"id\":0,\"jsonrpc\":\"2.0\",\"result\":\"499967\"}"
    

499967 即为当前的高度，命令行支持的更多命令参见vite.help命令
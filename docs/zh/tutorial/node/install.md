# 安装

## gvite节点是什么?
gvite节点分为`全节点`和`超级节点`，超级节点是特殊的全节点。目前全节点存储全量的账本数据，并且和全网同步数据达成共识。
全节点可以完成GVITE支持的所有功能，例如通过全节点，可以获取全网的数据，也可以作为发送交易和接收交易的操作节点以及竞选超级节点和对超级节点投票。
全节点支持开启 `HTTP`、`WEBSOCKET` 和 `IPC API`，同样支持`命令行`模式和其交互。

## 开始之前

安装方式支持`二进制`安装和`源码`安装两种

| 操作系统           | ubuntu | mac | windows |
| ------------------ | ------ | --- | ------- |
| gvite  Pre-Mainnet | yes    | yes | yes     |



## 二进制文件安装
通过命令行下载和安装gvite, 支持ubuntu、mac、centos、windows

版本记录可以从 [gvite release history](https://github.com/vitelabs/go-vite/releases)获得，下载Latest release版本。

### ubuntu安装示例
```bash replace version
## 下载
curl -L -O https://github.com/vitelabs/go-vite/releases/download/${version}/gvite-${version}-linux.tar.gz
```
```bash replace version
## 解压
tar -xzvf gvite-${version}-linux.tar.gz
```
```bash replace version
## 进入解压目录，包含三个文件 gvite、bootstrap 和 node_config.json
cd gvite-${version}-linux
```
```
## 启动
./bootstrap
```
程序是否正常启动，通过查看启动脚本所在目录的 gvite.log 看日志来确定, 这个文件
```bash
cat gvite.log
```
如下说明启动成功
```bash
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.DataDir:/home/ubuntu/.gvite/maindata module=gvite/node_manager
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.KeyStoreDir:/home/ubuntu/.gvite/maindata/wallet module=gvite/node_manager
Prepare the Node success!!!
Start the Node success!!!
```

### mac 安装示例

```bash replace version
## 下载
curl -L -O https://github.com/vitelabs/go-vite/releases/download/${version}/gvite-${version}-darwin.tar.gz
## 解压
tar -xzvf gvite-${version}-darwin.tar.gz
## 进入解压目录，包含三个文件 gvite、bootstrap 和 node_config.json
cd gvite-${version}-darwin
## 启动
./bootstrap
```

程序是否正常启动，通过查看启动脚本所在目录的 gvite.log 看日志来确定, 这个文件

```bash
cat gvite.log
```

如下说明启动成功

```bash
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.DataDir:~/Library/GVite/maindata module=gvite/node_manager
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.KeyStoreDir:~/Library/GVite/maindata/wallet module=gvite/node_manager
Prepare the Node success!!!
Start the Node success!!!
```

### 安装目录文件说明

**安装目录**：指gvite启动脚本和配置文件所在文件夹。例如上文中的安装目录路径为：
 
```bash replace version
~/gvite-${version}-${os}
```

* `gvite`： 执行程序
* `bootstrap`： 启动脚本
* `node_config.json`： 配置文件 [配置说明](./node_config.md)

### 端口

系统默认端口 8483、8484，需要保证没有被其他程序占用，并且防火墙允许其通信

```bash
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

### 运行目录说明

```bash
cd ~/.gvite/maindata
```
这是gvite的数据目录，在下面你会看到ledger  ledger_files  LOCK  p2p  rpclog  runlog  wallet 等目录和文件。
gvite 数据目录说明:

* `ledger`： 账本目录
* `rpclog`： rpc访问日志
* `runlog`： 运行日志目录, runlog目录
* `wallet`： 钱包keyStore目录，用于存储私钥生成的keyStore文件，如果是超级节点涉及到挖矿账户安全，请`妥善保管`

mac 默认目录：~/Library/GVite/maindata

## 源码安装
### golang 环境确认

```
go env
```

:::warning
需要至少安装1.11.0 以上版本golang
golang 安装方法 [go 安装](https://golang.org/doc/install)
:::

### 编译可执行文件
   * 在终端执行
  ```
    go get github.com/vitelabs/go-vite
  ```
  代码所在位置
  ```
  $GOPATH/src/github.com/vitelabs/go-vite/
  ```
  GOPATH 默认位置是 ```~/go```
  
  进入代码所在目录并运行
  ```
  make gvite
  ```
  生成的gvite可执行文件位于： 
  ```
  $GOPATH/src/github.com/vitelabs/go-vite/build/cmd/gvite/gvite
  ```

### 配置文件配置
  `node_config.json` 参见: [配置文件说明](./node_config.md)

### 启动脚本编写
  配置文件和编译后的gvite在同一目录，例如linux 环境通过执行
  ```
  nohup ./gvite -pprof >> gvite.log 2>&1 &
  ```
  启动

## docker部署

### golang 环境确认

```
go env
```

:::warning
需要至少安装1.11.0 以上版本golang
golang 安装方法 [go 安装](https://golang.org/doc/install)
:::


### 安装docker
  
  参照docker[官方文档](https://docs.docker.com/v17.12/install/)

### 启动docker daemon
  
  参照docker官方文档

### 获取gvite源码

   ```
    go get github.com/vitelabs/go-vite
  ```

### 构建gvite镜像

  ```
    cd $GOPATH/src/github.com/vitelabs/go-vite/
    docker build -t gvite .
  ```

### 启动gvite容器

  ```
    docker run -v $HOME/.gvite/:/root/.gvite/ -p 48132:48132 -p 41420:41420 -p 8483:8483 -p 8484:8484 -p 8483:8483/udp -d gvite
  ```

## 监控

### 命令行确认当前节点高度

* 首先参照全节点的启动方式，启动全节点。
* 通过命令行连接全节点：找到[全节点的安装目录](./install.md#安装目录文件说明)。进入到该目录，然后执行如下命令

  Unix/Linux平台：
  ```bash
  ./gvite attach ~/.gvite/maindata/gvite.ipc
  ```
  Windows平台：
  ```bash
  gvite-windows-amd64.exe attach \\.\pipe\gvite.ipc
  ```
  在交互命令行中输入：
  ```javascript
  vite.ledger_getSnapshotChainHeight();
  ```
  得到
  ```
  "{\"id\":0,\"jsonrpc\":\"2.0\",\"result\":\"499967\"}"
  ```
  499967 即为当前的高度，命令行支持的更多命令参见 `vite.help` 命令
  
## 全节点奖励配置

为了激励全节点运行，vite官方对全节点运行给予一定奖励，用户需为全节点配置自己的奖励地址。

本文档主要阐述如何为全节点添加奖励相关配置，全节点如何运行，参见[安装](https://vite.wiki/zh/tutorial/node/install.html)。

### 配置要求
当前，vite对运行全节点会发放一定量的奖励，参与奖励的全节点需要进行一些额外的配置。
1. 配置全节点状态数据上报地址: "DashboardTargetURL":"wss://stats.vite.net"
2. 在PublicModules配置项中新增"dashboard";
3. 新增接收奖励地址: "RewardAddr":"vite_xxxx", 此地址为奖励发放地址, 请确保保管好私钥;

配置文件新增加项如下所示(确保最终的node_config.json文件符合json格式):
```
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
    "tx",
    "dashboard"  // 新增加
  ],
  "DashboardTargetURL":"wss://stats.vite.net",  // 新增加
  "RewardAddr":"vite_xxx"   // 新增加
```

### 配置结果check
当配置完成并重启节点后, 可以检查[链接](https://stats.vite.net/api/getAlivePeers)内容(链接内容刷新5min内有延迟), 查看是否包含自己节点, 并检查是否配置成功(例如地址和名称是否正确).

## 下一步

* [配置超级节点](./sbp.md)
* [节点钱包管理](./wallet-manage.md)
* [超级节点运行规则](../rule/sbp.md)  

# Ubuntu 16.04 运行超级节点

:::tip
本文将从0到1讲述如何在ubuntu16.04上运行超级节点，本指南只针对ubuntu 16.04。
:::


## 安装gvite

### 下载安装

```bash
## 下载
curl -L -O https://github.com/vitelabs/go-vite/releases/download/1.0.1/gvite-1.0.1-linux.tar.gz
```
```
## 解压
tar -xzvf gvite-1.0.1-linux.tar.gz
```
```
## 修改文件名为vite, 进入解压目录，包含三个文件 gvite、bootstrap 和 node_config.json
mv gvite-1.0.1-linux vite
cd vite
```
```
## 启动
./bootstrap
```

### 检测服务是否启动

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

### 获取安装目录路径

```bash
pwd
```
会输出gvite的安装目录路径，请记下该路径，后续会用到

例如，如果是用root用户登录的，安装目录为：

```bash
/root/vite
```

## 创建钱包

### 通过命令行连接全节点

通过命令行连接全节点：找到[全节点的安装目录][pwd]。进入到该目录，然后执行如下命令

  ```bash
  ./gvite attach ~/.gvite/testdata/gvite.ipc
  ```

  得到类似如下的结果，代表已经连接成功
  ```
  INFO[11-12|16:47:07] cannot read the config file, will use the default config module=config error="open vite.config.json: no such file or directory"
  INFO[11-12|16:47:07]                                          monitor-log=/home/ubuntu/go-vite/backend-log/backend.log.30693
  Welcome to the Gvite JavaScript console!
  ->
  ```
### 创建新钱包  
  
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
* `mnemonic`:  助记词，十分重要，请牢记，并安全记录。
* `primaryAddr`: 助记词对应的第一个vite地址
* `filename`: 保存助记词的keyStore的所在位置，无须修改，挖矿需要指定

执行 `exit` 退出交互式命令行

### 验证钱包是否创建

```bash
ls ~/.gvite/testdata/wallet/
```
会得到以下结果：

```bash
vite_065f8e8ed83dcd581bfb925ff285268d28ead80a9fc92ff083
```
`vite_065f8e8ed83dcd581bfb925ff285268d28ead80a9fc92ff083`：就是上面创建的钱包的地址，如果创建了多个钱包，这里会显示多个条目。

## 编辑node_config.json

```bash
vi node_config.json
```

将以下字段编辑为以下内容：

```
        "Miner": true,
        "CoinBase": "0:your_address",
        "EntropyStorePath": "your_address",
        "EntropyStorePassword": "your_password",
```

* `your_address`: 指上面创建钱包成功后的地址
* `your_password`: 指上面创建钱包使用的password

编辑完成之后保存

## 重启全节点

杀死进程

```bash
ps -efww|grep -w 'gvite'|grep -v grep|cut -c 9-15|xargs kill -9
```

重新执行

```bash
./bootstrap
```
验证是否启动成功：

```bash
ps -efww|grep -w 'gvite'
```

如果显示以下内容即为启动成功：

```bash
root      6560  5939  0 12:29 pts/1    00:00:00 grep --color=auto -w gvite
```

## 查询区块同步高度

```bash
  ./gvite attach ~/.gvite/testdata/gvite.ipc
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

## gvite服务开机自启动

### 创建自启动配置文件

```bash
sudo touch /etc/systemd/system/vite.service   
sudo chmod 664 /etc/systemd/system/vite.service   
sudo vi /etc/systemd/system/vite.service   
```
编辑为以下内容：

```text
[Unit]
Description=GVite node service
After=network.target

[Service]
ExecStart=/path_to_gvite/gvite
Restart=on-failure
User=vite
Group=vite

[Install]
WantedBy=multi-user.target
```

**path_to_gvite**： 假设上面记录的安装目录路径为： `/root/vite`，则这里填写：`/root/vite/bootstrap`

### 开启自启动

kill 当前gvite服务：

```bash
ps -efww|grep -w 'gvite'|grep -v grep|cut -c 9-15|xargs kill -9
```

启动gvite服务：

```bash
service vite start
```

开启自启动：

```bash
systemctl enable vite
```

## TIPS

### 快速进入gvite交互式命令行

编辑 `~/.bashrc`

```bash
vi ~/.bashrc
```

往里面添加以下内容

```bash
alias vite="~/vite/gvite attach ~/.gvite/testdata/gvite.ipc"
```
然后执行

```bash
source ~/.bashrc
```

然后直接执行

```bash
vite
```

会输出以下内容：

```bash
INFO[11-15|12:54:38]                                          monitor-log=/root/go-vite/backend-log/backend.log.9104
this vite node`s git GO version is  7aa4ebc97dfb1d9be4cdd812bd68170b13de59f5
Welcome to the Gvite JavaScript console!
-> 
```

然后执行输入：

```bash
vite.ledger_getSnapshotChainHeight();
```

即可查询区块高度

### 在交互式命令行里，定时输出当前高度

先进入交互式命令行，然后在交互式命令行内输入以下内容：

```bash
setInterval(function(){vite.ledger_getSnapshotChainHeight();}, 1000)
```

之后会每秒输出当前的区块高度，若要打断输入，请输入： `exit`，退出交互式命令行

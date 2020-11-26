# 超级节点

:::tip

阅读此文前，请先按照[节点-安装](./install.md)教程，安装gvite服务。

* **超级节点挖矿规则**：[深入了解-超级节点](../rule/sbp.md)
* **全节点安装教程**：[节点-安装](./install.md)
* **节点钱包管理**：[节点-钱包管理](./wallet-manage.md)
:::

## 超级节点配置
和全节点基本一样，额外需要开启挖矿，并且需要创建一个钱包。

### 创建钱包

钱包的生成参见：[钱包管理](./wallet-manage.md)。

### 修改node_config.json的配置

在 `node_config.json` 末尾新增4个配置：

  * 增加 `Miner` 属性值为 `true`
  * 增加  `CoinBase` 为格式为 `索引:地址`的格式，例如： `0:vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf`，请修改为自己的地址
  * 增加 `EntropyStorePath` 属性值 为自己的地址，例如：`vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf` ，请修改为自己的地址
  * 增加 `EntropyStorePassword` 属性值为自己的keystore 对应的密码，keyStore 文件生成方法中的输入的123456，`请修改为自己的密码`

**完整的示例如下：**

```json
{
  "Identity": "vite-node",
  "NetID": 1,
  "ListenInterface": "0.0.0.0",
  "Port": 8483,
  "FilePort": 8484,
  "MaxPeers": 10,
  "MinPeers": 5,
  "MaxInboundRatio": 2,
  "MaxPendingPeers": 5,
  "BootSeeds": [
    "https://bootnodes.vite.net/bootmainnet.json"
  ],
  "Discover": true,
  "RPCEnabled": true,
  "HttpHost": "0.0.0.0",
  "HttpPort": 48132,
  "WSEnabled": false,
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
    "tx",
    "debug",
    "sbpstats",
    "dashboard"
  ],
	"Miner": true,
	"CoinBase": "0:vite_d2fef1e5ffa7d9139bd7c80a672e0530789bac6c7c9ff58dc6",
	"EntropyStorePath": "vite_d2fef1e5ffa7d9139bd7c80a672e0530789bac6c7c9ff58dc6",
	"EntropyStorePassword": "123456",
  "LogLevel": "info"
}
```
### 重启全节点

找到进程
```ps -ef|grep gvite```

得到

```
ubuntu   27268     1 99 16:00 ?        01:54:56 ./gvite -pprof 
```

执行

```bash
kill -9 27268
```

杀死进程

重新执行

```bash
./bootstrap
```

利用 `ps -ef | grep gvite` 来查看进程是否启动成功即可

## 超级节点注册

:::tip
注册需要抵押100w vite，请先确保钱包中有100w以上的vite
:::

登录[Web钱包](https://wallet.vite.net/)，点击进入SBP注册页。

填写 **节点名称** 以及 **出块地址**。

请注意，这里的 **出块地址** 为服务器上超级节点配置的地址，最好不要和注册地址一致。

![](~/images/node-register.jpg)

### 节点名称

请勿随意填写节点名称，这将不利于社区识别超级节点，也不利于拉票。

例如，vite.vip，可以直接注册为vite.vip。

### 查看节点排名

[https://explorer.vite.net/SBPList](https://explorer.vite.net/SBPList)

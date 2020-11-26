# 从Test-Net 迁移到 Pre-Mainnet

## 快速开始

最快速的迁移方法为如下：

1. NetID 从 TestNet 的 `2` 改成 `1`

2. 删除 `BootNodes` 字段，并且添加 `BootSeeds` 字段，内容如下：
```json
"BootSeeds": [
  "https://bootnodes.vite.net/bootmainnet.json"
],
```

3. TestNet 默认为 `~/.gvite/testdata/` ，而 Pre-Mainnet 默认为 `~/.gvite/maindata` 。配置了keystore的用户，需要将keystore由 `~/.gvite/testdata/wallet/` 目录下移动到 `~/.gvite/maindata/wallet/` 目录下。


## 更多

在 [Pre-Mainnet](https://github.com/vitelabs/go-vite/releases/tag/v2.0.0) 发版包中已经提供了方便的默认配置。

相对于 `TestNet`，Pre-Mainnet 的配置变更如下：

| 字段 | TestNet | Pre-Mainnet | 说明 |
|:--:|:--:|:--:|:--:|
| NetID | 2 | 1 | 网络Id |
| BootSeeds | - |  | 获取 BootNodes 的来源，TestNet 无此配置，属于 Pre-Mainnet 新增字段 |
| DataDir | `~/.gvite/testdata/` | `~/.gvite/maindata` | 默认目录 |

## 其他配置

如果现有 testnet 用户进行了其他的自定义配置，请同步这些配置到 Pre-Mainnet 的配置文件。

1. 节点名称
节点名称字段为 `Identity`

2. 超级节点相关
超级节点相关字段 `Miner` `CoinBase` `EntropyStorePath` `EntropyStorePassword`

3. 全节点奖相关
全节点奖励地址 `RewardAddr`

4. 其他配置
连接相关字段 `MaxPeers` `MinPeers`

端口相关字段 `Port` `FilePort` `HttpPort` `WSPort`

节点状态 `DashboardTargetURL`

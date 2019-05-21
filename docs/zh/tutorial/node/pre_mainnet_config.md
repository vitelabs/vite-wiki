# pre_mainnet 网络 node_config.json

pre_mainnet 环境的配置文件相对于 testnet 有一些改变，具体如下，发版包中已经提供了默认配置。

1. NetID
pre_mainnet 值为 1， testnet 为 2。使用提供的配置即可。

2. BootSeeds
此字段是新增配置，用于替换 BootNodes 字段，保持默认配置就行。

3. DataDir
在testnet中默认为"~/.gvite/testdata/"，在pre_mainnet中默认为"~/.gvite/maindata"。在节点上配置了keystore的用户，需要将keystore由"~/.gvite/testdata/wallet/"目录下移动到"~/.gvite/maindata/wallet/"目录下。


# 配置 node_config.json

对于大多数全节点，只需要配置少数字段，其余使用提供的 node_config.json 即可。

如果现有 testnet 用户进行了自定义配置，请同步这些配置到 pre_mainnet。相关字段如下：

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

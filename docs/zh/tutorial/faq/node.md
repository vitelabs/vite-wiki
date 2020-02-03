# gvite节点常见问题

## gvite节点建议配置
超级节点建议4核8G及以上，全节点建议2核4G及以上，带宽5M及以上

## 节点启动常见报错
* new node error, xxx

node_config.json或者genesis.json文件json格式错误

* panic: The fork point xxxFork can't be nil. the `ForkPoints` config in genesis.json is not correct, you can remove the `ForkPoints` key in genesis.json then use the default config of `ForkPoints`

genesis.json文件中xxxFork对应的硬分叉高度没有配置，如果是测试节点，直接在genesis.json文件中配置相应的硬分叉高度即可

* Failed to prepare node, dataDir already used by another process

本地已经启动了一个gvite节点，配置了相同的`DataDir``，先kill调另一个gvite节点后再重新启动

* Failed to prepare node, stat /xxx/maindata/wallet/vite_xxx: no such file or directory

node_config.json中的`EntropyStorePath`对应的文件不存在，请检查node_config.json中的`DataDir`配置和挖矿的密钥文件路径是否一致

* Failed to prepare node, error decrypt store

根据node_config.json中的`EntropyStorePath`和`EntropyStorePassword`无法解锁对应的账户

* Failed to start node, no service for name xxx

node_config.json的`PublicModules`中配置的`xxx`模块不存在，删除错误模块重启即可

## 节点不同步、高度不涨
gvite启动成功，等了超过5分钟，快照块高度一直不涨，按以下步骤自查：
* 确定节点已经升级到最新的[稳定版本](https://github.com/vitelabs/go-vite/releases)
* 观察服务器时间，如果时间不同步，尝试同步服务器时间
* 通过RPC接口[查看是否有peer](../../api/rpc/net.html#net_peers)，如果peerCount为0，检查能否上网，执行`curl https://bootnodes.vite.net/bootmainnet.json`观察是否能正常返回，检查防火墙是否开了8483和8484端口，如果检查结果都正常，等5分钟后再查一次peerCount，如果5分钟后peerCount依然为0，尝试重启gvite。
```
curl -X POST \
  http://127.0.0.1:48132/ \
  -H 'content-type: application/json' \
  -d '{
        "jsonrpc": "2.0",
        "id": 1,
        "method": "net_peers",
        "params": null
      }'
```
* 如果有peer，通过RPC接口[查看同步详情](../../api/rpc/net.html#net_syncDetail)，观察返回的chunks字段是否有值，如果没有，等5分钟后再查一次chunks，如果5分钟后chunks依然为空，尝试重启gvite。
```
curl -X POST \
  http://127.0.0.1:48132/ \
  -H 'content-type: application/json' \
  -d '{
        "jsonrpc": "2.0",
        "id": 1,
        "method": "net_syncDetail",
        "params": null
      }'
```
* 尝试重启gvite，然后等待5分钟以上，观察高度是否增长。
* 通过RPC接口查看本地快照链状态（需要在node_config.json的`PublicModules`中配置`debug`），观察返回的current中的Head和Tail，如果Head和Tail有高度差，并且Tail一直不变，那么打包DataDir/maindata/runlog/下最新的目录，并联系官方排查；如果Head和Tail没有高度差，保存接口返回值，并打包DataDir/maindata/runlog/下最新的目录，并联系官方排查。
```
curl -X POST \
  http://127.0.0.1:48132/ \
  -H 'content-type: application/json' \
  -d '{
      	"jsonrpc": "2.0",
      	"id": 1,
      	"method":"debug_poolSnapshot",
      	"params":null
      }'
```


## 超级节点抵押地址和出块地址的区别
注册超级节点时抵押100w `VITE`的节点是抵押地址，也是超级节点的所有者，可以修改出块地址，可以提取超级节点奖励，抵押到期后可以注销超级节点并取回抵押的100w `VITE`。

私钥保存在gvite节点所在的服务器上（node_config.json中的`EntropyStorePath`和`EntropyStorePassword`对应的地址），用私钥签名快照块的地址为出块地址。

由于出块地址的私钥保存在服务器上，是不安全的，建议将抵押地址和出块地址区分开，不要使用同一个地址，尽量不要在出块地址中放币。

## 超级节点不出块
超级节点已同步到最新高度，但是不出块，按以下步骤自查：
* 确定节点已经升级到最新的[稳定版本](https://github.com/vitelabs/go-vite/releases)
* 观察服务器时间，如果时间不同步，尝试同步服务器时间。
* 确定超级节点配置在4核8G及以上，带宽在5M及以上。观察节点监控情况，没有出现CPU或者带宽打满、内存或者磁盘占用过高的情况。 
* 检查node_config.json配置，`Miner`为true，`EntropyStorePath`和`EntropyStorePassword`配置正确。
* 检查超级节点注册信息（区块链浏览器的SBP列表页面找到超级节点名称），当前出块地址和`EntropyStorePath`配置的地址一致。
* 查看超级节点排名（区块链浏览器的SBP列表页面），票数过低的节点不会被选为出块节点；排名在100名以后（不包括第100名）的节点不会被选为出块节点；排名在25名以后（不包括第25名）的超级节点出块概率较低，可以先观察一段时间。
* 刚修改过出块地址的节点（可能在修改出块地址期间丢块导致出块率降低）、近期出块率较低的节点，被选为出块节点的概率较低，可以先观察一段时间。
* 重启节点，观察出块情况。
* 打包DataDir/maindata/runlog/下最新的目录，并联系官方排查。

## 超级节点丢块、出块率降低
超级节点已同步到最新高度，但是偶尔出现丢块现象，或者出块率比平时低，按以下步骤自查：
* 确定节点已经升级到最新的[稳定版本](https://github.com/vitelabs/go-vite/releases)
* 观察服务器时间，如果时间不同步，尝试同步服务器时间。
* 确定超级节点配置在4核8G及以上，带宽在5M及以上。观察节点监控情况，没有出现CPU或者带宽打满、内存或者磁盘占用过高的情况。 
* 重启节点，观察出块情况。
* 打包DataDir/maindata/runlog/下最新的目录，并联系官方排查。

## 出新版本时是否需要升级节点，如何升级
gvite新版本包括两种，一种是包含硬分叉的版本，必须在指定时间内升级，这种版本一般会提前通过telegram、discord、微信群、论坛等渠道发出通告，并在区块链浏览器最上方滚动通知；另一种是不包含硬分叉的版本，通常是性能优化、网络层优化、新增工具接口等，这种版本不强制要求升级，但是包含节点优化的版本升级后可能会更稳定。

升级时如果升级公告中没有特殊说明，那么直接替换gvite文件，然后重启即可（超级节点升级时先替换文件，再重启，可以降低重启期间丢块的可能性），不需要修改node_config.json。如果升级公告中有特殊说明，那么结合节点情况，按说明操作即可。

升级节点后，观察同步状态。全节点状态为同步完成时，则本次升级成功。超级节点状态为同步完成，并且正常出块，则本次升级成功。

## 如何判断是否同步完成
两种方法：
* 通过RPC接口[查看节点同步状态](../../api/rpc/net.html#net_syncinfo)，状态为`Sync done`表示同步完成。
```
curl -X POST \
  http://127.0.0.1:48132/ \
  -H 'content-type: application/json' \
  -d '{
      	"jsonrpc": "2.0",
      	"id": 1,
      	"method":"net_syncinfo",
      	"params":null
      }'
```
* 通过gvite.log日志或者[RPC接口](../../api/rpc/ledger_v2.html#ledger_getSnapshotChainHeight)查看本地最新快照块高度，和区块链浏览器上的快照块高度做对比，如果高度一致说明同步完成。

## 如何分配超级节点奖励
见[超级节点奖励计算规则](../rule/sbp.html#出块奖励)。区块链浏览器的SBP节点详情页面提供了每个周期的得票明细下载功能。

如果需要将超级节点奖励分配给投票账户，可以参考论坛上其他超级节点的奖励分配方案。

## 跑多个全节点时，能否直接复制账本
可以，先kill掉gvite节点，然后复制ledger目录即可，不要复制net目录。

## 节点异常退出，runlog中报too many open files
Linux系统常见错误，修改系统限制的打开文件数量即可。

### 解决方法
1. 命令行方式修改

执行命令：
```
ulimit -n 2048
# 然后启动需要运行的程序
```
这种方式会立即生效，但退出登录后会立即失效。

2. 修改配置文件
```
vim /etc/security/limits.conf 
#在最后加入  
* soft nofile 4096  
* hard nofile 4096 
或者只加入
* - nofile 8192

# 如果是root用户，这样追加
root soft nofile 4096  
root hard nofile 4096
```
这种方式需要注销重新登录才会生效。

### 确定生效
1. 通过ulimit -n查看当前的数量
```
$ ulimit -n
1024 # 这个就是当前的设置结果；
``` 

2. 通过查看具体进程的信息查看，这样更加准确：
```
$ ps -ef | grep gvite
先通过上面命令拿到pid

$ cat /proc/{pid}/limits | grep open
然后查看具体生效的结果

```
最后，如果实在没有生效，请自行google "too many open files"，有一大堆解决方法


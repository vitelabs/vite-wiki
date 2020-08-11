# Troubleshooting - Node

## Recommended Specs
* SBP (Supernode) - 2 CPUs / 8 GB RAM
* Full node - 1 CPU / 4 GB RAM

A minimum of 5M bps stable internet connection is required.

## Boot-up failures
* `new node error`

Format error in node_config.json or genesis.json.

* panic: The fork point xxxFork can't be nil. the `ForkPoints` config in genesis.json is not correct, you can remove the `ForkPoints` key in genesis.json then use the default config of `ForkPoints`

Unconfigured or incorrect fork point in genesis.json. Check `ForkPoints` in the config file and make sure it is aligned with the upcoming hard fork. For nodes in testnet, the hard fork height can be directly configured in genesis.json.

* Failed to prepare node, dataDir already used by another process

`DataDir` has been occupied by another process. Kill the existing gvite process first. 

* Failed to prepare node, stat /xxx/maindata/wallet/vite_xxx: no such file or directory

The keystore file is missing. Check if `DataDir` is configured in node_config.json and the keystore file exists under the folder. You can also add `KeyStoreDir` in node_config.json.

* Failed to prepare node, error decrypt store

Unlock account failed, usually caused by mismatched key store file and password.

* Failed to start node, no service for name xxx

Missing module 'xxx' in `PublicModules`. Remove the module 'xxx' from node_config.json.

## Node is not syncing
The node booted up successfully but the snapshot block height is not increasing in 5 minutes. Follow the self-check steps below.
* Make sure the node has been upgraded to the latest [stable version](https://github.com/vitelabs/go-vite/releases)
* Make sure the timestamp on the node is accurate
* Check connected peers through [net_peers](../../api/rpc/net.html#net_peers). If peerCount=0, make sure port 8483/8484 are exposed, and run `curl https://bootnodes.vite.net/bootmainnet.json` to check if the node has internet access. Wait for 5 minutes, reboot gvite if the peer connected is still 0. 
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
* If peer is not zero, check sync status through [net_syncDetail](../../api/rpc/net.html#net_syncDetail). If the chunk returned is empty, wait 5 minutes and check again.
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
* Reboot gvite, wait for 5 minutes and watch if the snapshot chain height increases. 
* Examine the status of snapshot chain through debug_poolSnapshot (add `debug` in `PublicModules` of node_config.json to enable the method). If there is a height difference between Head and Tail and the value of Tail does not change, send the returned value and the latest log under ~/.gvite/maindata/runlog/ to Vite technical support for further investigation.
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

## SBP staking address and block creation address

When registering an SBP, it is required to stake 1m VITE, and the staking address becomes the owner of the SBP. The block creation address and reward withdrawal address can be updated. After the lock-up period of staking expires, the SBP owner can cancel the SBP and retain the staked 1m VITE.

The private key of block creation address is saved on the node server (corresponding to `EntropyStorePath` and `EntropyStorePassword` in node_config.json), and is used to sign snapshot blocks.

Therefore, it is highly recommended to separate the staking address from the block creation address. Do NOT store your coins in block creation address.

## SBP does not produce block
The SBP node is in sync but does not produce block. Follow the self-check steps below.
* Make sure the node has been upgraded to the latest [stable version](https://github.com/vitelabs/go-vite/releases).
* Make sure the timestamp on the node is accurate.
* Make sure the node has installed 4 CPUs and 8GB RAM with 5M bps internet connection, and there is no other program occupying the CPU, RAM, disk I/O and network bandwidth.
* Check node_config.json, make sure `Miner` is set to true, `EntropyStorePath` and `EntropyStorePassword` are correctly configured.
* Check the registration information of the SBP on [Vite block explorer](https://explorer.vite.net/SBPList) to make sure the current block creation address matches the address configured in `EntropyStorePath`.
* Check the SBP rank on [Vite block explorer](https://explorer.vite.net/SBPList). SBP nodes ranked after 25 have a lower probability of producing blocks. SBP ranked after 100 will never have the chance to produce block.
* Restart the node.
* If the problem still exists, send the latest log under ~/.gvite/maindata/runlog/ to Vite technical support for further investigation.

## SBP is missing blocks
The SBP node is in sync but missed some blocks. Follow the self-check steps below.
* Make sure the node has been upgraded to the latest [stable version](https://github.com/vitelabs/go-vite/releases).
* Make sure the timestamp on the node is accurate.
* Make sure the node has installed 4 CPUs and 8GB RAM with 5M bps internet connection, and there is no other program occupying the CPU, RAM, disk I/O and network bandwidth.
* Restart the node.
* If the problem still exists, send the latest log under ~/.gvite/maindata/runlog/ to Vite technical support for further investigation.

## Node upgrade
There are two types of gvite release. For the releases tagged "Upgrade is required", the upgrade must be completed within the designated time in order to comply with the hard fork. No worries, you have enough time to finish the upgrade. Announcements will be declared on various social channels including Telegram group, Discord channel, Vite block explorer notifications, and Vite forum usually one month ahead of the hard fork.
Another type of release is general release, including improved stability and performance, network optimization, new toolkit interface, etc. Forced upgrade is not required for this kind of release, but recommended.

If there are no special instruction in the announcement, to upgrade a node you should just replace the gvite file and restart it. This is convenient and there is no need to modify node_config.json. If there are instructions in the release announcement, follow the instructions.

After reboot, watch if the snapshot chain height is increasing (for full node and SBP node) and snapshot blocks are produced normally (for SBP node). If yes, the upgrade is successful.

:::tip Tip
To avoid unnecessary block missing for SBP node during upgrade, replace gvite file first then reboot the node.
:::

## Check sync status
You have two alternatives.
* Through [net_syncinfo](../../api/rpc/net.html#net_syncinfo)，`Sync done` indicates the node is synced up. 
```sh
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
* Through gvite.log or [ledger_getSnapshotChainHeight](../../api/rpc/ledger_v2.html#ledger_getSnapshotChainHeight) to check the latest snapshot block height on the node and compare to the explorer.

## How is the SBP reward allocated
See [SBP reward rules](../rule/sbp.html#sbp-rewards). You can download a detailed voting spreadsheet on the SBP details page from the explorer. 

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
sudo vim /etc/security/limits.conf 
#在最后加入  
* soft nofile 10240  
* hard nofile 10240 
或者只加入
* - nofile 10240

# 如果是root用户，这样追加
root soft nofile 10240  
root hard nofile 10240
```
这种方式需要注销重新登录才会生效。

### 确定生效
1. 通过ulimit -n查看当前的数量
```
$ ulimit -n
10240 # 这个就是当前的设置结果；
``` 

2. 通过查看具体进程的信息查看，这样更加准确：
```
$ ps -ef | grep gvite
先通过上面命令拿到pid

$ cat /proc/{pid}/limits | grep open
然后查看具体生效的结果

```
最后，如果实在没有生效，请自行google "too many open files"，有一大堆解决方法


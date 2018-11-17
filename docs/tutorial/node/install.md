# Installation

## What is gvite node?

There are 2 gvite node categories: `full node` and `super node`. 
At present, full nodes maintain the complete ledger, and reach consensus on the data synchronization of entire network.
Full nodes have the full functionality of gvite, such as visiting all the data on network, sending and receiving transactions, as well as participating in super node election or voting for super nodes.
Full nodes provide `HTTP`, `WEBSOCKET` and `IPC` API support, plus the `command line` tool. Super nodes are special full nodes. 

## Before the start

Gvite supports installation from `binary package` or `source code`

| OS | ubuntu  |  mac |   windows |
| ------------- | ------------------------------ |------|-------|
| gvite 1.0.0 testNet  | yes  |yes |yes |

:::tip
Go 1.11.1 or above version is required to compile the source code. It is recommended to download at Go official site: [Go download and installation](https://golang.org/dl/)
:::

## Install from binary package
Download and install gvite in command line (supporting ubuntu, mac, centos, windows)

### Example of ubuntu installation
```bash
## Download
curl -L -O https://github.com/vitelabs/go-vite/releases/download/1.0.1/gvite-1.0.1-linux.tar.gz
```
```
## Unpack
tar -xzvf gvite-1.0.1-linux.tar.gz
```
```
## Enter the extracted folder, which should contain three files: gvite, bootstrap and node_config.json
cd gvite-1.0.1-linux
```
```
## Start-up
./bootstrap
```
To determine whether the program starts normally, please check gvite.log in the same folder.
```bash
cat gvite.log
```
The following messages indicate that the startup is successful.
```bash
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.DataDir:/home/ubuntu/.gvite/testdata module=gvite/node_manager
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.KeyStoreDir:/home/ubuntu/.gvite/testdata/wallet module=gvite/node_manager
Prepare the Node success!!!
Start the Node success!!!
```

### Example of mac installation

```bash
## Download
curl -L -O https://github.com/vitelabs/go-vite/releases/download/1.0.1/gvite-1.0.1-darwin.tar.gz
## Unpack
tar -xzvf gvite-1.0.1-darwin.tar.gz
## Enter the extracted folder, which should contain three files: gvite, bootstrap and node_config.json
cd gvite-1.0.1-darwin
## Start-up
./bootstrap
```

To determine whether the program starts normally, please check gvite.log in the same folder.

```bash
cat gvite.log
```

The following messages indicate that the startup is successful.

```bash
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.DataDir:/home/ubuntu/.gvite/testdata module=gvite/node_manager
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.KeyStoreDir:/home/ubuntu/.gvite/testdata/wallet module=gvite/node_manager
Prepare the Node success!!!
Start the Node success!!!
```

### Description of installation directory

**Installation directory**：Refers to the folder where the gvite startup scripts and configuration file are located. For example, the installation directory path is: `~/gvite-${version}-${os}`

* `gvite`： Gvite executable file
* `bootstrap`： Startup script
* `node_config.json`： Configuration file [configuration description](./node_config.md)

### Ports

The system default ports are 8483/8484. If you are with default ports, please ensure that they are not occupied by other programs or blocked by the firewall.

```bash
 netstat -nlp|grep 8483 
```

To determine if the default ports are occupied. Gvite will display the following messages if the program is started up successfully.
 
```
netstat -nlp|grep 8483
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
tcp6       0      0 :::8483                 :::*                    LISTEN      22821/gvite     
udp6       0      0 :::8483                 :::*                                22821/gvite
```

### Description of working directory

```bash
cd ~/.gvite/testdata
```
This is the gvite working directory, containing directories or files such as ledger, ledger_files, LOCK, p2p, rpclog, runlog and wallet.
Description of gvite working folder:

* `ledger`： Ledger directory
* `rpclog`： Rpc access log
* `runlog`： Run-time log directory
* `wallet`： The wallet keyStore directory, saving keyStore file with secured private key. If you run a super node and participate in mining, please `keep your private key safe`.

## Install from source
### Golang environment check

```
go env
```

:::warning
Go 1.11.1 or above version is required
Go installation guild: [go installation](https://golang.org/doc/install)
:::

### Compile source code
   * Run in terminal
  ```
    go get github.com/vitelabs/go-vite
  ```
  Source code location
  ```
  $GOPATH/src/github.com/vitelabs/go-vite/
  ```
  The system default GOPATH is ```~/go```

### Configuration file
  `node_config.json` See: [Config Description](./node_config.md)

### Start-up script
  The configuration file should reside in the same directory with compiled gvite executable file. For example, in linux environment run
  ```
  nohup ./gvite -pprof >> gvite.log 2>&1 &
  ```
  to start gvite.

## Monitoring

### Query current node height in command line

* Start a full node as instructed
* Access the full node in command line: Enter [full node installation directory](./install.md#Description-of-installation-directory) and execute the following command
  ```bash
  ./gvite attach ~/.gvite/testdata/gvite.ipc
  ```
  Input：
  ```javascript
  vite.ledger_getSnapshotChainHeight();
  ```
  Output:
  ```
  "{\"id\":0,\"jsonrpc\":\"2.0\",\"result\":\"499967\"}"
  ```
  499967 is the current block height. 
  For more command usage please run `vite.help`.
  
## Next steps

* [Super node configuration](./sbp.md)
* [Wallet management](./wallet-manage.md)
* [Super node rules](../rule/sbp.md)


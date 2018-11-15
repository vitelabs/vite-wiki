# 钱包管理

:::tip
本文主要介绍如何在全节点上管理钱包。

在开始本教程之前，请先阅读：[节点-安装][install]
:::

:::danger 不推荐以下设置：
* 超级节点注册地址和运行地址为 ***同一个地址***
* 超级节点注册地址和运行地址由 ***同一个助记词*** 生成
:::

## 新建钱包

### 启动全节点

首先参照[全节点的启动方式][install]，启动全节点。

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

## 通过助记词恢复钱包

如果你已经有了助记词，想要使用助记词来恢复钱包

通过命令行连接全节点，参照如上生成新的助记词的方法

然后在交互命令行中输入

```javascript
vite.wallet_recoverEntropyStoreFromMnemonic("Your Mnemonic","123456")
```
其中 `Your Mnemonic` 修改为自己的助记词

其中 `123456` 为keystore的密码，需要指定为自己的密码，并且牢记该密码。

例如：

:::demo
```javascript tab: 命令行输入
vite.wallet_recoverEntropyStoreFromMnemonic("utility client point estate auction region jump hat sick blast tomorrow pottery detect mixture clog able person matrix blast volume decide april congress resource","123456")
```
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
```
:::

这样就得到了助记词对应的keyStore文件信息


[install]: <./install.md>
[pwd]: <./install.md#安装目录文件说明>

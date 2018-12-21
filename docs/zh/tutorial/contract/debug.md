# 调试合约

## 如何调试合约

调试合约时在本地启动一个单机模式的节点，创建合约、调用合约的交易都通过RPC接口调用这个本地节点。

目前支持部署两种调试环境，分别为开发环境和测试环境，开发环境不检查配额和余额，任意一笔交易默认配额为100w，余额充足；测试环境时检查逻辑和测试网络相同，需要保证账户拥有充足的余额和配额。

## 开发环境

### 安装

下载开发环境调试文件 TODO 链接

```bash
## 解压
unzip -o -d ~/contractdev_20181221 contractdev_20181221.zip
```
```bash
## 进入解压目录
cd ~/contractdev_20181221
```
```bash
## 启动
./run.sh
```
通过启动脚本所在目录下的启动日志 gvite.log 来查看启动是否成功
```bash
cat gvite.log
```
观察到如下日志说明启动成功
```bash
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.DataDir:/home/ubuntu/contractdev_20181221/ledger/devdata module=gvite/node_manager
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.KeyStoreDir:/home/ubuntu/contractdev_20181221/ledger/devdata/wallet module=gvite/node_manager
Prepare the Node success!!!
Start the Node success!!!
```

### 创建合约

编辑Solidity++合约代码，保存到启动脚本所在目录下。

```bash
## 使用contract.sol文件创建合约（包含创建测试账户、使用测试账户创建合约）
./create_contract.sh contract.sol
```

```bash
## 如果合约的构造方法有入参，可以通过以下方式创建合约并指定入参
curl -X POST \
  http://127.0.0.1:48132/ \
  -H 'content-type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "id": 0,
    "method": "vmdebug_createContract",
    "params": [
        {
          "fileName":"'`pwd`/c2.sol'",
          "params":{
            "A":{
              "amount":"0",
              "params":["20"]
            },
            "B":{
              "amount":"0",
              "params":["0"]
            }
          }
        }
    ]
}'
```
其中，各参数含义如下：
```
{
  // 使用当前目录下的c2.sol来创建合约
  "fileName":"'`pwd`/c2.sol'",
  "params":{
    // 各合约的创建参数，例如，下面指定了两个合约的创建参数，合约名称分别为A和B
    "A":{
      // 创建合约时的转账金额
      "amount":"0",
      // 合约构造方法的入参，示例中A合约的构造方法有一个uint64的入参
      "params":["20"]
    },
    "B":{
      "amount":"0",
      "params":["0"]
    }
  }
}
```

观察到如下日志说明创建合约交易发送成功。
```bash
{"jsonrpc":"2.0","id":0,"result":[{"accountAddr":"vite_21483c46a64799c7db0cba88cf7b007a2d1a37e863f7be94b7","accountPrivateKey":"b18bcd61db171fb0c97712c24dbfc4fe7d279a6e9f40be2a81f5e279206887237ee77ed82025fbe821a969cc8321c139ed69dde16bed9c5dfabbc6343868bb68","contractAddr":"vite_d624b0bead067237700a86314287849163e4a0fb6139fdff42","sendBlockHash":"265930575e035976f0e89b7b4ad00c5e91fefc9230647b47dadd7c7274797d3b","methodList":[{"contractAddr":"vite_d624b0bead067237700a86314287849163e4a0fb6139fdff42","accountAddr":"vite_21483c46a64799c7db0cba88cf7b007a2d1a37e863f7be94b7","amount":"0","methodName":"transfer","params":["address"]}]}]}
```
返回值说明如下：
```json
{
  "jsonrpc":"2.0",
  "id":0,
  "result":[ 
    // 合约信息列表，如果Solidity++文件中有多个合约，则会依次展示所有合约的创建结果
    {
      // 测试账户地址
      "accountAddr":"vite_21483c46a64799c7db0cba88cf7b007a2d1a37e863f7be94b7",  
      // 测试账户私钥
      "accountPrivateKey":"b18bcd61db171fb0c97712c24dbfc4fe7d279a6e9f40be2a81f5e279206887237ee77ed82025fbe821a969cc8321c139ed69dde16bed9c5dfabbc6343868bb68",
      // 合约账户地址
      "contractAddr":"vite_d624b0bead067237700a86314287849163e4a0fb6139fdff42",
      // 创建合约请求交易的ash
      "sendBlockHash":"265930575e035976f0e89b7b4ad00c5e91fefc9230647b47dadd7c7274797d3b",
      // 合约的方法列表，如果合约有多个方法，则会依次展示所有的方法。methodList中的参数给出了调用合约时的参数示例
      "methodList":[
        {
          // 合约账户地址
          "contractAddr":"vite_d624b0bead067237700a86314287849163e4a0fb6139fdff42",
          // 测试账户地址，可以用来调用合约，可以修改为本地节点启动期间创建的任意测试账户地址
          "accountAddr":"vite_21483c46a64799c7db0cba88cf7b007a2d1a37e863f7be94b7",
          // 调用合约账户时的转账金额
          "amount":"0",
          // 方法名称
          "methodName":"transfer",
          // 方法参数列表，如果有多个参数，则在params数组中会依次展示所有的参数。调用合约时需要把对应的参数改成真实调用参数
          "params":["address"]
        }
      ]
    }
  ]
}
```

### 调用合约

```
## 调用合约方法，直接用创建合约时返回的methodList中的任意一个对象来调用合约，例如：
curl -X POST \
  http://127.0.0.1:48132/ \
  -H 'content-type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "id": 0,
    "method": "vmdebug_callContract",
    "params": [
        {
          "contractAddr":"vite_d624b0bead067237700a86314287849163e4a0fb6139fdff42",
          "accountAddr":"vite_21483c46a64799c7db0cba88cf7b007a2d1a37e863f7be94b7",
          "amount":"0",
          "methodName":"transfer",
          "params":["vite_21483c46a64799c7db0cba88cf7b007a2d1a37e863f7be94b7"]
        }
    ]
}'
```
返回值说明如下：
```json
{
    "jsonrpc": "2.0", 
    "id": 0, 
    "result": {
        // 合约账户地址
        "contractAddr": "vite_0a49d38e769162f05d0df645b890ac450f80cb49d52e8765ab", 
        // 调用合约的测试账户地址
        "accountAddr": "vite_a4aa32b30a4564d3c5ffac1f7416d09cd4dd36bbf365df5be5", 
        // 调用合约的测试账户私钥
        "accountPrivateKey": "2bef2ba485ed3e4de8b93bd0fb8746db47a91f4bdde0c007127b5bc6548ff49642d4138c403cc26e20299a2f145687bf562f6ba1e7d0d45a75d7c7f58de42b25", 
        // 调用合约请求交易的hash
        "sendBlockHash": "eea88399209cd5abdedec1128b8bdfd1a28e2d6ac6ade6d5cee72e997a800893"
    }
}
```

### 观察执行结果

由于Vite创建合约和调用合约的接收交易是异步执行的，因此接收交易需要在请求交易创建成功后等待一段时间后才会执行，在本地模式中大约需要等待 1~6s。接收交易的执行过程和执行结果会分别打印到两个日志文件中。

日志文件目录为 `启动脚本所在目录/ledger/devdata/vmlog` ，两个日志文件分别为：

 * `vm.log`：开始执行交易日志、交易执行结果日志、event日志。
 * `interpreter.log`：合约代码执行过程日志，包含每一条合约指令的名称，执行后stack、memory、storage的数据等。

也可以直接查询合约账户链，观察合约账户接收结果
```bash
./query_block.sh vite_0a49d38e769162f05d0df645b890ac450f80cb49d52e8765ab
```

## 测试环境

TODO

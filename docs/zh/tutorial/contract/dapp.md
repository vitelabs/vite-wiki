# DApp开发指南

## DApp开发流程

### DApp架构
![](~/images/dapp-architecture.png)

用户通过在官方钱包App中扫描DApp二维码或者点击官方钱包App中的DApp入口，在官方钱包内部打开网页版DApp。网页版DApp通过HTTP RPC或者WS连接DApp的私有全节点，在DApp网页上展示链上数据。当需要调用合约时，通过WS和官方钱包App通信，在钱包内签名交易并通过官方全节点向链上发送交易。

### DApp上线流程
 * 完成DApp的开发和测试
 * 部署至少一台提供HTTP RPC和WS服务的全节点
 * 链上部署合约，并给合约账户抵押vite
 * 部署网页版DApp
 * 上面的步骤完成后，向官方钱包注册DApp，注册成功后官方钱包中会展示DApp入口

## 开发环境准备

### 本地运行测试节点

见 [本地运行测试节点教程](./testnode.html)

### 准备vitejs运行环境

TODO

### 官方测试钱包

安装官方测试钱包，并连接到本地测试节点。

TODO

## 编写合约代码

安装[VS Code](https://code.visualstudio.com/)，安装[Soliditypp VS Code插件](./debug.html#vs-code插件)。在本地编写合约代码并调试合约。

## 部署合约

利用vitejs来部署合约，并给合约账户抵押vite，来获得配额。

以部署一个HelloWorld合约为例，合约代码如下：
```
pragma soliditypp ^0.4.2;
contract HelloWorld {
   event transfer(address indexed addr,uint256 amount);
     onMessage SayHello(address addr) payable {
        addr.transfer(msg.tokenid ,msg.amount);
        emit transfer(addr, msg.amount);
     }
}
```
vitejs部署合约和抵押代码示例如下：
```
let abi=[{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"SayHello","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"transfer","type":"event"}]
let binaryCode ='0x608060405234801561001057600080fd5b5061013e806100206000396000f3fe608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806391a6cb4b14610046575b600080fd5b6100886004803603602081101561005c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061008a565b005b8073ffffffffffffffffffffffffffffffffffffffff164669ffffffffffffffffffff163460405160405180820390838587f1505050508073ffffffffffffffffffffffffffffffffffffffff167faa65281f5df4b4bd3c71f2ba25905b907205fce0809a816ef8e04b4d496a85bb346040518082815260200191505060405180910390a25056fea165627a7a723058209e71140ee2fdf78fceeb608c3caa88fd69b06431f165312c4726b9fcbf46dbfb0029'
……
TODO 包括导入一个账户，用这个账户部署合约，给新部署的合约抵押vite
```

## 调用合约

合约部署成功后，可以通过vitejs向官方钱包App发送调用合约请求，钱包App会根据调用参数来签名一笔调用合约的交易。

和官方钱包App交互时使用一种叫做Vite URI格式的数据，具体格式内容见 [URI格式](../../vep/vep-6.html)

调用合约示例代码如下：
```
TODO 用URI的方式调用上面示例中SayHello的接口
```

## 链上数据查询

### 常用查询接口

全部接口信息和接口调用注意事项见 [接口列表](../../api/rpc/)

TODO vitejs接口调用说明和示例

|  接口名称  | 接口说明 |
|:------------:|:-----------:|
| ledger_getLatestBlock | 查询账户链上最新一笔交易 |
| ledger_getAccountByAccAddr | 查询账户信息，包含账户链高度、各种代币的余额等 |
| ledger_getBlocksByAccAddr | 查询账户交易列表 |
| ledger_getBlockByHeight | 根据账户地址和高度查询交易 |
| ledger_getBlockByHash | 根据哈希查询交易 |
| ledger_getVmLogList | 根据哈希查询合约产生的event |
| onroad_getAccountOnroadInfo | 查询账户的在途交易信息，包括在途交易数量、资金信息等 |
| onroad_getOnroadBlocksByAddress | 查询账户的在途交易列表 |
| contract_getContractInfo | 查询合约信息，包括合约代码，所属委托共识组信息等 |
| contract_callOffChainMethod | 离线查询合约状态 |
| testapi_getTestToken | 获取测试代币 |

### 事件订阅

可以通过订阅合约产生的event的方式来实时获取合约状态变更。

[事件订阅说明](./subscribe.md)

[事件订阅接口说明](../../api/rpc/subscribe.md)

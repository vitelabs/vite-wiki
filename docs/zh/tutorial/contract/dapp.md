# DApp开发指南

## DApp开发流程

### DApp架构
![](~/images/dapp-architecture.png)

通常一个DApp由智能合约与配套的网页应用（Companion Web Application）构成。上图显示了一个DApp在Vite网络中的工作流程，DApp通过HTTP或WebSocket方式连接Vite全节点，与区块链交互并获取数据展示在前端网页中。
从资产安全角度考虑，一般不建议用户在DApp中保存助记词或私钥，而应存放在Vite钱包中。当DApp需要向区块链网络发送一笔交易的时候，通过远程访问的方式建立与Vite钱包的连接并完成签名。

目前Vite提供三种DApp交易签名方案：
1. 使用Vite钱包对DApp发送的每笔交易扫码（须符合VEP-6规范）后签名发送；
2. 将DApp集成到Vite钱包中，通过Vite Bridge传送交易到钱包中签名发送；
3. 使用**ViteConnect**建立钱包与DApp的会话连接后签名发送。

方案一要求对从DApp发送的每笔交易单独扫码，因此只适用于简单、和智能合约交互较少的DApp，例如一个简单的投票DApp。
方案二适用于Vite钱包中集成的DApp应用。不过，开发者须向Vite Labs申请将DApp和Vite钱包集成，且不保证申请一定获得通过。
方案三是我们推荐的签名方案。DApp用户只需在Vite钱包中一次扫码即可，交易支持自动签名，兼顾了安全与方便。点击[Vite Connect SDK](https://github.com/vitelabs/vite-connect-client)了解详情。

### DApp上线流程
 * 完成DApp的开发和测试
 * 部署至少一台提供HTTP RPC和WS服务的全节点
 * 链上部署合约，并给合约账户抵押配额
 * 部署网页版DApp
 * 对于集成到Vite钱包中的DApp（方案二），还需下载安装[Vite测试钱包](./testdapp.html)进行测试

## 开发环境准备

### 安装合约调试工具

安装[VS Code](https://code.visualstudio.com/)，安装[Soliditypp VS Code插件](./debug.html#vs-code插件)。

### 本地运行测试节点

见 [本地运行测试节点教程](./testnode.html)。

### 准备Vite.js运行环境

安装最新版[Vite.js SDK](../../api/vitejs/README.md)。

### 下载solidity++编译器solppc

下载最新版[solppc 编译器](https://github.com/vitelabs/soliditypp-bin/releases)。

### 官方测试钱包

对于集成到Vite钱包中的DApp，安装[测试钱包](./testdapp.html)，并按说明连接到本地测试节点。

## 编写合约代码

在VS Code IDE中编写合约代码并调试。

## 部署合约

推荐使用Vite.js。

以部署HelloWorld合约为例，合约代码如下：
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
在命令行运行solppc编译合约，得到合约的abi和二进制代码：
```bash
./solppc --abi --bin HelloWorld.solpp
```
使用Vite.js部署合约和抵押配额：
```javascript
const { HTTP_RPC } = require('@vite/vitejs-http');
const { ViteAPI, accountBlock, wallet, constant } = require('@vite/vitejs');

let provider = new HTTP_RPC("http://127.0.0.1:23456");
let client = new ViteAPI(provider);

// import account
let mnemonic = "sadness bright mother bid tongue same pear recycle useless hub beauty frozen toward nominee glide cheese picnic vibrant vague thought hurry sleep hold lizard";
let myAccount = wallet.getWallet(mnemonic).deriveAddress(0);

let abi = [{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"SayHello","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"transfer","type":"event"}];
let binaryCode ='608060405234801561001057600080fd5b50610141806100206000396000f3fe608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806391a6cb4b14610046575b600080fd5b6100896004803603602081101561005c57600080fd5b81019080803574ffffffffffffffffffffffffffffffffffffffffff16906020019092919050505061008b565b005b8074ffffffffffffffffffffffffffffffffffffffffff164669ffffffffffffffffffff163460405160405180820390838587f1505050508074ffffffffffffffffffffffffffffffffffffffffff167faa65281f5df4b4bd3c71f2ba25905b907205fce0809a816ef8e04b4d496a85bb346040518082815260200191505060405180910390a25056fea165627a7a72305820f50fe89a37e6cda887aaeae59bf45670d552e27215ee8aed9b83fe0c8d525fcb0029';

// create a new contract
let block = accountBlock.createAccountBlock('createContract', {
        address: myAccount.address,
        abi,
        code: binaryCode,
        params: []
    }).setProvider(client).setPrivateKey(myAccount.privateKey);

block.autoSetPreviousAccountBlock().then(() => {
    block.sign().send().then((result) => {
        console.log('Smart contract %s deployed!', result.toAddress);

        // stake 10000 VITE for the new contract for quota
        let contractAddress = result.toAddress;
        let block = accountBlock.createAccountBlock('stakeForQuota', {
            address: myAccount.address,
            beneficiaryAddress: contractAddress,
            amount: '10000000000000000000000'
        }).setProvider(client).setPrivateKey(myAccount.privateKey);
        block.autoSetPreviousAccountBlock().then(() => {
            block.sign().send().then(() => {
                console.log('Staked %s VITE to address %s!', 10000, contractAddress);
            }).catch((err) => {
                console.error('Error', err);
            });
        });
    });
}).catch(err => {
    console.error(err);
});
```

合约部署后，通过[合约信息查询接口](../../api/rpc/contract_v2.html#contract-getcontractinfo)获取合约信息，并**检查合约代码不为空**。如果返回的合约代码为空，则通常是由于创建合约交易在接收过程中发生了不可预期的错误，导致合约部署失败。 

## 调用合约

下面的示例调用HelloWorld合约中的`SayHello(address addr)`方法：

```javascript
async function callContract(contractAddress, methodName, abi, params, amount) {
    const block = accountBlock.createAccountBlock('callContract', {
        address: myAccount.address,
        abi,
        methodName,
        amount,
        toAddress: contractAddress,
        params
    }).setProvider(client).setPrivateKey(myAccount.privateKey);

    await block.autoSetPreviousAccountBlock();
    await block.sign().send();
}
// say hello to vite_d8f67aa50fd158f1394130a554552204d90586f5d061c6db4f
callContract(contractAddress,'SayHello', abi, ['vite_d8f67aa50fd158f1394130a554552204d90586f5d061c6db4f'], '100000000000000000000')
.then(res => console.log(res))
.catch(err => console.error(err));
```

## 远程签名库
DApp作为轻量级的第三方应用，基于安全或复杂度考虑，一般不应获取用户的助记词与私钥，或者自行维护一个HD兼容钱包。Vite提供两套远程签名库供开发者使用：
- [@vite/bridge](https://www.npmjs.com/package/@vite/bridge)   
    Vite Bridge是在Vite钱包内集成的DApp使用的首选方案。在目前的版本中Vite Bridge提供如下功能： 
    - 在DApp中获取当前用户的Vite地址
    - 连接Vite钱包请求签名并发送一笔交易或调用一个合约方法    
    
下面的示例给接收地址发送了1 VITE： 
```javascript
import Bridge from "@vite/bridge";
import { utils, constant } from "@vite/vitejs";

// initiate bridge instance
const bridge = new Bridge();

// get current account address
bridge['wallet.currentAddress']().then(accountAddress => {
    // send 1 vite to target address
    bridge["wallet.sendTxByURI"]({
        address: accountAddress, 
        uri: utils.uriStringify({ 
            target_address: 'vite_9de8095568105ee9a5297fd4237e2c466e20200c9fb012f573', 
            params: { 
                amount: 1, // 1 vite
                tti: constant.Vite_TokenId // default is vite. use another tti if you need to send other tokens
             }
        })
    }).then(accountBlock => {
      console.log(accountBlock);
    });
}).catch(err => {
    console.error(err);
});
```

调用合约方法SayHello：
```javascript
import Bridge from "@vite/bridge";
import { abi, utils } from "@vite/vitejs";

const bridge = new Bridge();
// encode function call
const hexdata = abi.encodeFunctionCall([{
    "name": "SayHello",
    "type": "function",
    "inputs": [{
        "type": "address",
        "name": "addr"
    }]
}], ['vite_9de8095568105ee9a5297fd4237e2c466e20200c9fb012f573'], 'SayHello');
// convert to base64
const base64data = utils._Buffer.from(hexdata, 'hex').toString('base64');
// send the call
bridge["wallet.sendTxByURI"]({
    address: accountAddress, // your account address
    uri: utils.uriStringify({
        target_address: contractAddress, // smart contract address
        function_name: 'SayHello',
        params: {
            data: base64data
        }
    })
}).then(accountBlock => {
  console.log(accountBlock);
});
```
更多详情请访问我们的[Github 代码库](https://github.com/vitelabs/bridge/)。

- [@vite/connector](https://github.com/vitelabs/vite-connect-client)
    Vite Connect是Vite网络中DApp远程签名的通用方案，目前的版本可支持：
    - 通过Vite钱包扫码为当前用户会话建立连接
    - 会话期间连接保持有效，无需重复建立，且支持自动重连
    - DApp发起的交易或合约调用均通过Vite钱包签名发送
    - 支持自动签名功能，无需用户额外确认
    
:::tip 推荐方案
我们推荐所有非Vite钱包集成的DApp使用Vite Connect.
:::

下面的例子创建一个Vite Connect连接并发送一笔交易：
```javascript
import Connector from '@vite/connector'

const BRIDGE = 'http://192.168.31.82:5001' // url to vite connect server

const vbInstance = new Connector({ bridge: BRIDGE })

vbInstance.createSession().then(() => {
    // vbInstance.uri can converted into an QR code image.
    // in most scenarios, you should display the QR code here so it can be scanned by the vite wallet in order to establish connection
    console.log('connect uri', vbInstance.uri)
});

vbInstance.on('connect', (err, payload) => { // connection established
    /* 
     * Payload is an Object following the following definition: (usually the peer is Vite App)

     *  {
     *      version: number,    // vc protocol version, 2 at present
     *      peerId: string,     // can be ignored
     *      peerMeta: {         // Vite App meta info
     *          bridgeVersion: number,
     *          description: string,
     *          url: string,
     *          icons: string[],
     *          name: string,
     *      },
     *      chainId: number,    // can be ignored
     *      accounts: string[]  // the address returned from Vite wallet.
     *  }
     */
    const { accounts } = payload.params[0];
    if (!accounts || !accounts[0]) throw new Error('address is null');

    const address = accounts[0];
    console.log(address)
})

// send transaction
vbInstance.sendCustomRequest({
    method: 'vite_signAndSendTx',
    params: {
        /*
         * block should have the following parameters:
           {
                toAddress: string;   // account address or contract address
                tokenId: string;    // asset id that you would like to send
                amount: string;     // in atomic unit (with full decimals)
                fee?: string;       // in atomic unit (with full decimals)
                data? string;       // base64 encoded string, necessary when calling smart contract
           }
         */
        block: {
            accountAddress: "vite_61404d3b6361f979208c8a5c442ceb87c1f072446f58118f68",
            amount: "2000000000000000000",
            data: "c2FkZmFzZg==",
            toAddress: "vite_61404d3b6361f979208c8a5c442ceb87c1f072446f58118f68",
            tokenId: "tti_5649544520544f4b454e6e40",
        },
    }
}).then(signedBlock => console.log(signedBlock), err => console.error(err))
// register disconnection listener
vbInstance.on('disconnect', err => {
    console.log(err) // any handling logic here
})  
```
更多详情请访问我们的[Github 代码库](https://github.com/vitelabs/vite-connect-client).

## 链上数据查询

### 常用查询接口

|  接口名称  | 接口说明 |
|:------------|:-----------|
| [ledger_getLatestAccountBlock](../../api/rpc/ledger_v2.html#ledger_getlatestaccountblock) | 查询账户链上最新一笔交易 |
| [ledger_getAccountInfoByAddress](../../api/rpc/ledger_v2.html#ledger_getaccountinfobyaddress) | 查询账户信息，包含账户链高度、各种代币的余额等 |
| [ledger_getAccountBlocksByAddress](../../api/rpc/ledger_v2.html#ledger_getaccountblocksbyaddress) | 查询账户交易列表 |
| [ledger_getAccountBlockByHeight](../../api/rpc/ledger_v2.html#ledger_getaccountblockbyheight) | 根据账户地址和高度查询交易 |
| [ledger_getAccountBlockByHash](../../api/rpc/ledger_v2.html#ledger_getaccountblockbyhash) | 根据哈希查询交易  |
| [ledger_getVmLogs](../../api/rpc/ledger_v2.html#ledger_getvmlogs) | 根据Log哈希查询合约产生的事件记录 |
| [ledger_getUnreceivedTransactionSummaryByAddress](../../api/rpc/ledger_v2.html#ledger_getunreceivedtransactionsummarybyaddress) | 查询账户的未接收交易信息，包括交易数量、资金信息等 |
| [ledger_getUnreceivedBlocksByAddress](../../api/rpc/ledger_v2.html#ledger_getunreceivedblocksbyaddress) | 查询账户的未接收交易列表 |
| [contract_getContractInfo](../../api/rpc/contract_v2.html#contract_getcontractinfo) | 查询合约信息，包括合约代码，所属共识组信息等 |
| [contract_callOffChainMethod](../../api/rpc/contract_v2.html#contract_calloffchainmethod) | 调用合约离线方法（通常用来查询合约状态） |

更多RPC方法请访问 [RPC API](../../api/rpc/)

关于如何使用Vite.js调用RPC方法，请访问 [Vite.js SDK](../../api/vitejs/ViteAPI/GViteRPC.html#how-to-call-gvite-rpc-methods)

### 事件订阅

可以通过订阅合约产生的事件（Event）来实时获取合约状态变更。

更多详情请访问[合约事件订阅说明](./subscribe.md)和[事件订阅接口说明](../../api/rpc/subscribe_v2.md)。

## 常见问题和注意事项

* 如何验证合约调用结果？
 
  由于Vite链上合约调用是异步执行的，因此用户成功发起调用合约交易后，并不能立即知道合约的执行结果，需要等合约接收这笔调用交易之后才能查询到合约是否执行成功。
  
  合约调用是在响应交易中执行的。有两种方式监听合约响应交易，一种是通过`ledger_getAccountBlockByHash`接口，根据请求交易哈希轮询请求交易的接收状态；另一种是通过事件订阅的方式监听合约链上事件。
  
  当合约请求交易被成功接收时，可以根据响应交易的data字段的第33字节值来判断合约执行结果，值为0表示执行成功，值为1表示执行失败，包括遇到了REVERT指令、配额不足、合约给其他账户转账余额不足等。
  
  如果合约执行成功，并且在执行过程中触发了Event（即事件），那么这个响应交易的`logHash`字段会被写入事件哈希，此时可以调用`ledger_getVmLogs`接口，根据事件哈希来查询合约执行过程中产生的事件。
  

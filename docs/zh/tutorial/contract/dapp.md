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

### 安装合约调试工具

安装[VS Code](https://code.visualstudio.com/)，安装[Soliditypp VS Code插件](./debug.html#vs-code插件)。

### 本地运行测试节点

见 [本地运行测试节点教程](./testnode.html)

### 准备vitejs运行环境

js可执行环境即可

### 下载solidity++编译器solppc

[solppc releases](https://github.com/vitelabs/soliditypp-bin/releases)

### 官方测试钱包

[安装和使用测试钱包](./testdapp.html)，并连接到本地测试节点。

## 编写合约代码

在VS Code中编写合约代码并调试合约。

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
编译合约，获得合约的abi和二进制代码
```
./solppc --abi --bin HelloWorld.solpp
```
vitejs部署合约和抵押代码示例如下：
```javascript
import WS_RPC from '@vite/vitejs-ws';
import { client, account, hdAccount, constant } from '@vite/vitejs';

let { Vite_TokenId } = constant;
let provider = new WS_RPC("wss://example.com");
let myClient = new client(provider);

// 导入一个账户
let myAccount = new account({
    client: myClient,
    privateKey: 'your privateKey'
});
// Or
// let myHdAccount = new hdAccount({ 
//     client: myClient,
//     mnemonic: 'your mnemonic'
// });
// let myAccount = myHdAccount.getAccount();

let abi = [{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"SayHello","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"transfer","type":"event"}];
let binaryCode ='0x608060405234801561001057600080fd5b5061013e806100206000396000f3fe608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806391a6cb4b14610046575b600080fd5b6100886004803603602081101561005c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061008a565b005b8073ffffffffffffffffffffffffffffffffffffffff164669ffffffffffffffffffff163460405160405180820390838587f1505050508073ffffffffffffffffffffffffffffffffffffffff167faa65281f5df4b4bd3c71f2ba25905b907205fce0809a816ef8e04b4d496a85bb346040518082815260200191505060405180910390a25056fea165627a7a723058209e71140ee2fdf78fceeb608c3caa88fd69b06431f165312c4726b9fcbf46dbfb0029';

// 用导入的账户创建合约
myAccount.createContract({
    abi,
    hexCode: binaryCode,
    confirmTime: 2,                    // 确认数 0 ~ 75
    seedCount:2,                       // 取值范围0-75, 如果合约代码中使用了随机数指令，要求这个字段值大于0。注意confirmTime必须大于或等于seedCount。
    // times: 10,                       // 翻倍数 Default 0, 如传递此参数：取值范围为10-100
    params: [/** your parameters  */],
    tokenId: Vite_TokenId,              // Default Vite_TokenId
    amount: '0',                        // Default '0'
    fee: '10000000000000000000',        // Default '10000000000000000000'
}).then((accountBlock) => {
    // accouuntBlock like this
    // { 
    //     accountAddress: 'vite_13f1f8e230f2ffa1e030e664e525033ff995d6c2bb15af4cf9',
    //     blockType: 1,
    //     prevHash: '19fd67e7e9a60196c9e832ea3718f2baca34adfaf00e4a3eda90e6c97f1aa314',
    //     height: '33',
    //     tokenId: 'tti_5649544520544f4b454e6e40',
    //     amount: '0',
    //     fee: '10000000000000000000',
    //     toAddress: 'vite_fb057bbfc47c243ea518ae72c17357b95a8eb64d73adf3c8a7',
    //     data: 'AAAAAAAAAAAAAgECYIBgQFI0gBVhABBXYACA/VtQYQHKgGEAIGAAOWAA8/5ggGBAUmAENhBhAEFXYAA1fAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkARj/////xaAY4CuDqEUYQBGV1tgAID9W2EAvWAEgDYDYCCBEBVhAFxXYACA/VuBAZCAgDWQYCABkGQBAAAAAIERFWEAeVdgAID9W4IBg2AgggERFWEAi1dgAID9W4A1kGAgAZGEYCCDAoQBEWQBAAAAAIMRFxVhAK1XYACA/VuQkZKTkZKTkFBQUGEAv1ZbAFtgAGACg4OQUIEVFWEA0Ff+WwYUFRVhAN1XYACA/VtgAICQUGAAgJBQW4ODkFCBEBVhAYpXYACEhIOBgRAVFWEBA1f+W5BQYCACATWQUGAAhYVgAYUBgYEQFRVhAR9X/luQUGAgAgE1kFCAhAGTUICEEBUVFWEBPFdgAID9W2AAgREVYQF9V4Fz//////////////////////////8WRmn/////////////FoJgQFFgQFGAggOQg4WH8VBQUFBbUFBgAoEBkFBhAOhWW1A0gRQVFWEBmVdgAID9W1BQUFb+oWVienpyMFggPO9KP5OzPmTpng+I9YYSEoIIQ5T21LcPEDDKjDYLdGIAKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAyTi80ebqatkV99gQZXQzvrWO3ZxxxxxxxxxxwAAAAADJ5ZlffgaxpkVKSVN1QehSP53y+OOOOOOOOOO',
    //     nonce: 'VJejnMfUyOM=',
    //     difficulty: '262137',
    //     hash: 'a53b80a6eb6fa078df55fa3497e7f5d0a86a5cd07f693edf0b6b5eceaeaadf77',
    //     signature: 'V+fshT2neE5DgH0PTSbskt5Vg1IAfbM17ymVJ9CJfIngbIKnpR2twbSjDY8SOX3lMf8tofdopTFdGrryoW1/DQ==',
    //     publicKey: 'iE0KOlLusSBOImOb6BA/tTzocFgtW2q0iHVM1WsFkuA=' 
    // } 

    // 给新创建的合约抵押vite
    let contractAddress = accountBlock.toAddress;
    myAccount.getQuota({
        toAddress: contractAddress,
        tokenId: Vite_TokenId,
        amount: '10000000000000000000000'
    }).then(() => {
        console.log('Okay~~');
    }).catch((err) => {
        console.error('Error', err);
    });
}).catch(err => {
    console.warn(err);
});
```

合约创建成功后，可以通过[合约信息查询接口](../rpc/contract.html#contract-getcontractinfo)查询合约信息，并**确保合约代码不为空**。如果创建合约请求交易被成功接收，但合约代码为空，可能是创建合约交易在接收过程中发生了不可预期的错误，导致合约创建失败。 

## 调用合约

合约部署成功后，可以通过vitejs直接发送调用合约请求，但是这种方式会跟钱包一样，要求导入助记词。

### 免登陆方案
dapp作为轻量级，第三方应用，理论上不应该获取到用户助记词，维护一个hd钱包。现在通过vite官方app提供两种免登陆方案：
- [@vite/bridge 文档点击这里](https://www.npmjs.com/package/@vite/bridge)   
    该方式提供给在vite官方app内打开的dapp使用，可以通过调用native-js桥的方法使用以下两个相关功能  
    - vite官方app请求签名并发送一个交易  
    - 获取用户当前地址。  
    示例： 
```javascript
//一个普通转账,发送一个vite 给 `receiver's vite address`
import Bridge from "@vite/bridge";
import { utils } from "@vite/vitejs";
const bridge = new Bridge();
bridge["wallet.sendTxByURI"]({address:"sender's vite address", uri: utils.uriStringify({target_address:`receiver's vite address`,params:{amount:1}}) }).then(accountBlock => {
  console.log(accountBlock);
});// 如果发送其它币种，请查阅 [token list](https://explorer.vite.net/zh/tokenList),并填入相应的tti参数。注意，不同环境的tti可能不同。



//一个合约调用
import Bridge from "@vite/bridge";
import { abi,utils } from "@vite/vitejs";

const bridge = new Bridge();
const hexData=abi.encodeFunctionCall([{
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'myString'
    }]
}, {
    name: 'myethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'myString'
    }]
}], ['2345675643', 'Hello!%'], 'myMethod');
const base64Data=utils._Buffer.from(hexData,'hex').toString('base64');
bridge["wallet.sendTxByURI"]({address:"self vite address", uri: utils.uriStringify({target_address:`合约地址`,function_name:'myMethod',params:{data:base64Data}}) }).then(accountBlock => {
  console.log(accountBlock);
});
```
   [更详细的demo](https://github.com/vitelabs/bridge/blob/master/example/sendTx/index.js)
- Vite Bifrost  
    该方式提供任意场景下远程签名方案。正在开发中。

## 链上数据查询

### 常用查询接口

全部接口信息和接口调用注意事项见 [RPC接口说明](../../api/rpc/) [vitejs接口调用说明和示例](../../api/vitejs/client/instance.md)

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

```javascript
import WS_RPC from '@vite/vitejs-WS';
import { client, constant } from '@vite/vitejs';

const { methods } = constant;
const wsProvider = new WS_RPC("ws://example.com");

const myClient = new Client(wsProvider, function(_myclient) {
    console.log("Connected.");
});

const address = 'vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68';

myclient.ledger.getLatestBlock(address).then((data) => {
    console.log(data);
});

// Or
myClient.request(methods.ledger.getAccountByAccAddr, address).then(()=>{});

// Or
myClient.request('ledger_getBlockByHeight', address, '75').then(()=>{});
```

### 事件订阅

可以通过订阅合约产生的event的方式来实时获取合约状态变更。

[事件订阅说明](./subscribe.md)

[事件订阅接口说明](../../api/rpc/subscribe.md)



## 常见问题和注意事项

* 如何判断合约调用结果？
 
  由于Vite链上合约调用是异步执行的，因此用户发起调用合约交易成功后，并不能立即知道合约的执行结果，需要等合约接收这笔调用交易之后，才能查询到合约是否执行成功。
  
  有两种方式监听合约响应交易，一种是通过`ledger_getBlockByHash`接口，根据请求交易哈希轮询请求交易的接收状态；另一种是通过事件订阅的方式监听链上事件。
  
  当合约请求交易被成功接收时，可以根据响应交易的data字段的第33字节值来判断合约执行结果，值为0表示执行成功，值为1表示执行失败，包括遇到了revert指令、配额不足、合约给其他账户转账余额不足等。
  
  如果合约执行成功，并且在执行过程中触发了event（即事件），那么这个响应交易的`logHash`字段值非空，此时可以调用`ledger_getVmLogList`接口，根据响应交易哈希来查询合约执行过程中产生的事件。
  

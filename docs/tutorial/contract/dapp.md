# Vite dApp Development Guide

## How dApp Works in Vite
![](~/images/dapp-architecture-en.png)

Above diagram describes how user interacts with dApp in Vite wallet. 
Typically, in order to launch a dApp, user should either scan QR code of the dApp using Vite wallet or find an entry to it inside the wallet. This will show a landing page. 
Vite dApp may communicate with a private full node via HTTP RPC or WS connection, fetch data on chain and display in the page. 
In scenario where user needs call the contract, a call contract transaction is signed in the wallet and then sent to contract through Vite full node.

## Deployment Steps
 
* Complete dApp(both contract and web application) development and testing
* Deploy at least one full node that provides HTTP RPC and WS services
* Deploy the contract on chain and stake for the contract account for quota
* Deploy dApp web application
* Register the dApp in Vite wallet. Now your dApp will have an entry point in the wallet.

## Prepare for Development Environment

### Run Local Dev Node

See [Run a Local Dev Node](./testnode.html)

### Configure vite.js

See vite.js [Installation](../../api/vitejs/README.md)

### Download solppc

Download Solidity++ compiler at [solppc releases](https://github.com/vitelabs/soliditypp-bin/releases)

### Install Testing Wallet

[Install Vite testing wallet](./testdapp.html) and connect to your local dev node.

## Write Contract

Install [VS Code](https://code.visualstudio.com/) and [Soliditypp VS Code Plug-in](./debug.html). 
Then write business code and debug your contract.

## Deploy Contract

Deploy contract in vite.js. Remember to stake for your contract account for quota.

The following code shows a simple HelloWorld contract:
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
Compile contract. Contract's ABI and binary code are generated in this step.
```
./solppc --abi --bin HelloWorld.solpp
```

Below vite.js code shows how to deploy contract and stake for quota:
```javascript
import WS_RPC from '@vite/vitejs-ws';
import { client, account, hdAccount, constant } from '@vite/vitejs';

let { Vite_TokenId } = constant;
let provider = new WS_RPC("wss://example.com");
let myClient = new client(provider);

// import account
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

// create a new contract
myAccount.createContract({
    abi,
    hexCode: binaryCode,
    confirmTimes: 2,                    // Execution waiting number in 0 ~ 75
    times: 0,                           // Quota consumption multiply factor for caller. Default is 0
    params: [/** your parameters  */],
    tokenId: Vite_TokenId,              // Default is Vite_TokenId
    amount: '0',                        // Default is '0'
    fee: '10000000000000000000',        // Default is '10000000000000000000'
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

    // stake for the new contract 
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

## Call Contract

When successfully deployed, contract can be called by sending call contract request transaction through vite.js library. However, this operation would require to know user's mnemonic in advance.

### Isolation of dApp and Private Key

As independent application developed by 3rd party, for security reason, dApp should not have access to user's private key or mnemonics. To address this issue, Vite mobile wallet provides two solutions.
- [@vite/bridge](https://www.npmjs.com/package/@vite/bridge)   
    Vite bridge is the recommended option for dApp integrated into Vite mobile wallet. By calling native-js bridge, the following actions are performed:
    - Request for sending transaction from application
    - Obtain current user address from application
    Example:
```javascript
//一个普通转账,发送一个vite 给 `a vite address`
import Bridge from "@vite/bridge";
import { utils } from "@vite/vitejs";
const bridge = new Bridge();
bridge["wallet.sendTxByURI"]({address:"self vite address", uri: utils.uriStringify({target_address:`a vite address`,params:{amount:1}}) }).then(accountBlock => {
  console.log(accountBlock);
});// 如果发送其它币总，请查阅 [token list](https://explorer.vite.net/zh/tokenList),并填入相应的tti参数。注意，不同环境的tti可能不同。



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
- Vite Bifrost  
    Vite Bifrost is the universal solution that supports signing/sending transactions from application for all scenarios, still under development.

## Query Chain Data

### Query API

|  Method name  | Description |
|:------------:|:-----------:|
| ledger_getLatestBlock | Return the latest transaction of the specified account |
| ledger_getAccountByAccAddr | Return account info by address, including account chain height, balances of various tokens, etc. |
| ledger_getBlocksByAccAddr | Return transaction list of the specified account |
| ledger_getBlockByHeight | Return a certain transaction by account height |
| ledger_getBlockByHash | Return a certain transaction by transaction hash  |
| ledger_getVmLogList | Return contract execution logs by transaction hash |
| onroad_getAccountOnroadInfo | Return pending receive info for specified account, including pending receive transaction number and total amount |
| onroad_getOnroadBlocksByAddress | Return pending receive transaction list for specified account |
| contract_getContractInfo | Return contract info by contract account, including code, designated consensus group, etc |
| contract_callOffChainMethod | Query contract state off-chain |
| testapi_getTestToken | Apply for test tokens |

For API definitions for all RPC methods, please refer to [RPC API](../../api/rpc/)

For vite.js usage, please refer to [vite.js Specification](../../api/vitejs/client/instance.md)

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

### Event Subscription

Event subscription can be used to monitor contract state change.

For more details please visit [Event Subscription](./subscribe.md) and [Subscription API](../../api/rpc/subscribe.md)




## Q&A

* How to determine contract execution result?
  
  Contract is executed asynchronously in Vite. User is unable to know execution result immediately when user has successfully sent a call contract transaction. 
  Contract execution result can only be obtained after the response transaction is handled. 
  
  One way to obtain execution result is to poll `ledger_getBlockByHash` by transaction hash of the request to determine if it was received. Another is using event subscription to monitor the contract.
      
  Once the request transaction is successfully received, user can check the 33 byte in data field of contract response for execution status, where 0 means success while 1 stands for failure. 
  Usually execution failure may result from execution reverted, insufficient quota or insufficient balance upon transferring to a 3rd account.
  
  If the status is 0 (success) and some events were triggered during execution, they will be logged in `logHash` field of response transaction. User is able to call `ledger_getVmLogList` method to query the events by response transaction hash.
  

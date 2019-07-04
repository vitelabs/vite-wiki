# Q&A

## About Mnemonic

A mnemonic phrase is able to derive multiple private keys, each having an address. Refer to [HD Wallet](/tutorial/wallet/hdwallet.md)

:::warning Notice
1. Always keep your mnemonics safe
2. Never transfer to unknown address
:::

## About Quota

Sending transaction consumes quota, which can be obtained through PoW calculation or staking Vite. Refer to [Quota](/tutorial/rule/quota)

## About Mintage

Client module provides token issuance function. Refer to [client/builtinTxBlock/Mintage](./client/builtinTxBlock)

## About Subscription

Client module extends `netProcessor` and supports event subscription. Refer to [client/subscription](./client/subscribe)

## About Account Instance

Wallet module is mainly used to quickly generate a wallet. Refer to [Wallet Introduction](./wallet/wallet)

## About Sending Transaction
Refer to [Account](./wallet/account) and [HdAccount](./wallet/hdAccount)

1. Generate `hdAccount` instance from mnemonic phrase. See more [Instances](./wallet/wallet) in wallet module.

```javascript
import WS_RPC from '@vite/vitejs-ws';
import { client, hdAccount } from '@vite/vitejs';

let myClient = new client( new WS_RPC("ws://example.com") );
let myHdAccount = new hdAccount({ 
    client: myClient,
    mnemonic: 'your mnemonic'
});
```

2. Get `account` instance for certain address through `hdAccount` instance. Below example shows how to get an account instance at address 0.

```javascript
const firstAccount = myHdAccount.getAccount({
    index: 0
});
```

3. Send transaction through `account` instance

```javascript
firstAccount.sendTx({
    toAddress: 'Your toAddress',
    amount: '10000000000000000000',    // 10 Vite (having 18 decimals)
    tokenId: Vite_TokenId
}).then((accountBlock) => {
    console.log(accountBlock);
}).catch((err) => {
    console.log(err);
});
```

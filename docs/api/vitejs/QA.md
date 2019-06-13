# Q & A

## About Mnemonic

A mnemonic can derive multiple private keys, one for each address.[Refer to hdwallet](/tutorial/wallet/hdwallet.md)

:::warning Notice
1. Keep your mnemonics carefully
2. Don't transfer to an unknown address
:::

## About quota

Sending transaction needs quota, which can be obtained through PoW or pledge Vite. [Refer to quota](/tutorial/rule/quota)

## About Mintage

Client provides mintage function. [Refer to client/builtinTxBlock/Mintage](./client/builtinTxBlock)

[Gvite-RPC Mintage](../rpc/mintage)

## About Subscription

Client extends netProcessor, providers subscription [Refer to client/subscription](./client/subscribe)

## About Account Instances under wallet

[Wallet module](./wallet/wallet) is mainly used to quickly generate a wallet.

:::tip Tips
[Refer to wallet introduction](./wallet/wallet)
:::

## About Send Transaction
Refer to [account](./wallet/account) and [hdAccount](./wallet/hdAccount)

1. You can generate an [`hdAccount` instance](./wallet/hdAccount) through your mnemonic. [Refer to more instances](./wallet/wallet)

```javascript
import WS_RPC from '@vite/vitejs-ws';
import { client, hdAccount } from '@vite/vitejs';

let myClient = new client( new WS_RPC("ws://example.com") );
let myHdAccount = new hdAccount({ 
    client: myClient,
    mnemonic: 'your mnemonic'
});
```

2. Get the `account` instance of address through the `hdAccount` instance. For example, get `an account instance of 0'address` under the mnemonic.

```javascript
const firstAccount = myHdAccount.getAccount({
    index: 0
});
```

3. Send transactions through the [`account` instance](./wallet/account).

```javascript
firstAccount.sendTx({
    toAddress: 'Your toAddress',
    amount: '10000000000000000000',    // 10Vite + 18个0
    tokenId: Vite_TokenId
}).then((accountBlock) => {
    console.log(accountBlock);
}).catch((err) => {
    console.log(err);
});
```

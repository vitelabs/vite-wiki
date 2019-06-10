# Q & A

[Wallet module](./wallet) is mainly used to quickly generate a wallet.

## About Mnemonic

A mnemonic can derive multiple private keys, one for each address.[Refer to hdwallet](/tutorial/wallet/hdwallet.md)

:::warning Notice
1. Keep your mnemonics carefully
2. Don't transfer to an unknown address
:::

## About quota

Sending transaction needs quota, which can be obtained through PoW or pledge Vite. [Refer to](/tutorial/rule/quota)

## About Account Instances

[Refer to](./wallet)

## About Send Transaction
Refer to [account](./account) and [hdAccount](./hdAccount)

1. You can generate an [`hdAccount` instance](./hdAccount) through your mnemonic. [Refer to more instances](./wallet)

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

3. Send transactions through the [`account` instance](./account).

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

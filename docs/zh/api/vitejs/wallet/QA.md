# 常见问题

Wallet模块主要用于快速生成钱包。

## 助记词

一个助记词可以派生多个私钥，一个私钥对应一个地址。[具体参考](/tutorial/wallet/hdwallet.md)

:::warning Notice
1. 请注意保管自己的助记词
2. 不要向不认识的地址转账
:::

## 配额

发送交易会消耗一部分配额，配额可以通过PoW或抵押获取。[具体参考配额](/tutorial/rule/quota)

## 几种account实例的关系

[请参考介绍](./wallet)

## 发送交易
Refer to [account](./account) and [hdAccount](./hdAccount)

1. 通过助记词 [生成一个`hdAccount`实例](./hdAccount)。[更多实例参考](./wallet)

```javascript
import WS_RPC from '@vite/vitejs-ws';
import { client, hdAccount } from '@vite/vitejs';

let myClient = new client( new WS_RPC("ws://example.com") );
let myHdAccount = new hdAccount({ 
    client: myClient,
    mnemonic: 'your mnemonic'
});
```

2. 通过[`hdAccount`实例](./hdAccount)，获取到具体地址的`account`实例。比如，获取此助记词下的`0号地址的账户实例`。

```javascript
const firstAccount = myHdAccount.getAccount({
    index: 0
});
```

3. 通过[`account`实例](./account)发送交易。

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

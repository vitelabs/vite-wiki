# 常见问题

## 助记词

一个助记词可以派生多个私钥，一个私钥对应一个地址。[具体参考](/tutorial/wallet/hdwallet.md)

:::warning Notice
1. 请注意保管自己的助记词
2. 不要向不认识的地址转账
:::

## 配额

发送交易会消耗一部分配额，配额可以通过PoW或抵押获取。[具体参考配额](/tutorial/rule/quota)

## 铸币

[Gvite-RPC 铸币](../rpc/contract_v2)

## 事件监听

ViteAPI 提供监听功能，[详见 ViteAPI](./ViteAPI/start)

## 发送交易

```typescript
import HTTP_RPC from '../../src/HTTP';
import { wallet, accountBlock, ViteAPI, constant } from '@vite/vitejs';

const { Vite_TokenId } = constant;
const { getWallet } = wallet;
const { createAccountBlock } = accountBlcok;

// 1. 通过助记词派生私钥和地址
const wallet = getWallet('yourMnemonic');
const { privateKey, address } = wallet.deriveAddress(0);  // 得到助记词0号派生路径下的私钥

// 2. 通过开发地址得到一个provider
const httpService = new HTTP_RPC("http://example.com");
const provider = new ViteAPI(httpService);

// 3. 生成accountBlock: 比如创建一个发送交易的accountBlock
const accountBlock = createAccountBlock('send', {
    toAddress: 'your toAddress', 
    tokenId: Vite_TokenId,
    amount: '1000000000000000000000'    // 10Vite + 18个0
}, provider, privateKey);

// 4. 发送accountBlock
const sendAccountBlock = async () => {
    await accountBlock.autoSetProperty();
    await accountBlock.PoW();
    return accountBlock.sign().send();
}

sendAccountBlock().then(() => {
    console.log('Send success');
}).catch((err) => {
    console.warn(err);
});
```

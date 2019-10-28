# Q&A

## About Mnemonic

A mnemonic phrase can derive multiple private keys, each having independent address. Refer to [HD Wallet](/tutorial/wallet/hdwallet.md)

:::warning Note
Always keep your mnemonic phrase safe
:::

## About Quota

Quota is necessary for sending transaction on Vite. As fee-less blockchain, quota can be obtained through PoW or staking. Refer to [Quota](/tutorial/rule/quota)

## About Token Issuance

Refer to [RPC Token Issuance API](../rpc/contract_v2)

## About Subscription

Event subscription is provided in `ViteAPI`. Refer to [ViteAPI](./ViteAPI/start)

## About Sending Transaction

```typescript
import HTTP_RPC from '../../src/HTTP';
import { wallet, accountBlock, ViteAPI, constant } from '@vite/vitejs';

const { Vite_TokenId } = constant;
const { getWallet } = wallet;
const { createAccountBlock } = accountBlcok;

// 1. Get private key and account address from mnemonic phrase
const wallet = getWallet('yourMnemonic');
const { privateKey, address } = wallet.deriveAddress(0);  // get the private key at index 0.

// 2. Get provider by HTTP address
const httpService = new HTTP_RPC("http://example.com");
const provider = new ViteAPI(httpService);

// 3. Create accountBlock instance
const accountBlock = createAccountBlock('send', {
    toAddress: 'your toAddress', 
    tokenId: Vite_TokenId,
    amount: '1000000000000000000000'    // 10 Vite (18 decimals)
}, provider, privateKey);

// 4. Send accountBlock
const sendAccountBlock = async () => {
    await accountBlock.autoSetPreviousAccountBlock();
    return accountBlock.sign().send();
}

sendAccountBlock().then(() => {
    console.log('Send success');
}).catch((err) => {
    console.warn(err);
});
```

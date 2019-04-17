# 常量

:::tip abstract
@vitejs/vitejs-constant
:::

```javascript 引入
import { constant } from '@vite/vitejs';

// Or
import * as constant from '@vite/vitejs-client';
```

## 常用变量

- Vite_TokenId
- Default_Hash

## Gid

- Snapshot_Gid
- Delegate_Gid

## 合约地址

- Quota_Addr : `抵押`
- Vote_Addr : `投票`
- Register_Addr : `注册`
- Mintage_Addr : `铸币`
- DexFund_Addr
- DexTrade_Addr
- contractAddrs
    - Quota: Quota_Addr,
    - Vote: Vote_Addr,
    - Register: Register_Addr,
    - Mintage: Mintage_Addr,
    - DexFund: DexFund_Addr,
    - DexTrade: DexTrade_Addr

## Abi

### SBP

- Register_Abi
- UpdateRegistration_Abi
- CancelRegister_Abi
- Reward_Abi

### Vote

- Vote_Abi
- CancelVote_Abi

### Pledge

- Pledge_Abi
- CancelPledge_Abi

### Mintage

- Mint_Abi
- Issue_Abi
- Burn_Abi
- TransferOwner_Abi
- ChangeTokenType_Abi
- Mint_CancelPledge_Abi

### DEX

- DexFundUserDeposit_Abi
- DexFundUserWithdraw_Abi
- DexTradeCancelOrder_Abi
- DexFundNewOrder_Abi
- DexFundNewMarket_Abi

## BlockType

- BlockType : `Transaction Type`
    - createContract = 1 : `Create Contract`
    - sendTx : `Send Transaction`
    - reward
    - receiveTx : `Receive Transaction`
    - receiveTxFail : `Receive Transaction Failed`

## viteJS 内置交易类型

- BuiltinTxType
    - SBPreg = 0 : `SBP Registration`
    - UpdateReg : `Update Registration`
    - RevokeReg : `Revoke Registration`
    - RetrieveReward 
    - Voting
    - RevokeVoting
    - GetQuota
    - WithdrawalOfQuota : `Withdraw Staked Quota`
    - Mintage : `铸币`
    - MintageIssue
    - MintageBurn
    - MintageTransferOwner 
    - MintageChangeTokenType
    - MintageCancelPledge
    - DexFundUserDeposit
    - DexFundUserWithdraw
    - DexFundNewOrder
    - DexTradeCancelOrder
    - DexFundNewMarket
    - CreateContractReq : `Create Contract`
    - TxReq : `Send Transaction`
    - RewardReq : `Rewards`
    - TxRes : `Receive Transaction`
    - TxResFail : `Receive Transaction Failed`

## 语言列表（用于创建助记词）

- LangList
    - english : `english`
    - japanese : `japanese`
    - chineseSimplified : `chinese_simplified`
    - chineseTraditional : `chinese_traditional`
    - french : `french`
    - italian : `italian`
    - korean : `korean`
    - spanish : `spanish`

## Abi 函数签名

```javascript
    let Register = abi.encodeFunctionSignature(Register_Abi);
```

- abiFuncSignature
    - Register
    - UpdateRegistration
    - CancelRegister
    - Reward
    - Vote
    - CancelVote
    - Pledge
    - CancelPledge
    - Mint
    - Issue
    - Burn
    - TransferOwner
    - ChangeTokenType
    - Mint_CancelPledge
    - DexFundUserDeposit
    - DexFundUserWithdraw
    - DexFundNewOrder
    - DexTradeCancelOrder
    - DexFundNewMarket

## 关于rpc方法的常量

- How to Invoke

```javascript

import { methods } from '@vite/vitejs-constant';

// ......

let myClient = new client(WS_RPC);
myClient.request(methods.ledger.getLatestSnapshotChainHash)
.then(()=>{
    // ......
})

// or
myClient.ledger.getLatestSnapshotChainHash()
.then(()=>{
    // ......
});

// If it is a subscribe method
myClient.subscribeFunc.newAccountBlocks()
.then(()=>{
    // ......
});

// or
myClient.request(methods.subscribe.newAccountBlocks)
.then(()=>{
    // ......
})
```

[Reference](/api/rpc/)

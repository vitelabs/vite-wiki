# 常量

:::tip abstract
@vitejs/vitejs-constant
:::

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

- BlockType : `交易类型`
    - createContract = 1 : `创建合约`
    - sendTx : `发送交易`
    - reward : `奖励交易`
    - receiveTx : `接收交易`
    - receiveTxFail : `接收交易失败`

## viteJS 内置交易类型

- BuiltinTxType
    - SBPreg = 0 : `注册SBP`
    - UpdateReg : `更新注册`
    - RevokeReg : `撤销注册`
    - RetrieveReward : `提取奖励`
    - Voting : `投票`
    - RevokeVoting : `撤销投票`
    - GetQuota : `获取配额`
    - WithdrawalOfQuota : `取回配额抵押`
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
    - CreateContractReq : `创建合约`
    - TxReq : `发送交易`
    - RewardReq : `奖励`
    - TxRes : `接收交易`
    - TxResFail : `接收交易失败`

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

- 调用方式

```javascript

import { methods } from '@vite/vitejs-constant';

// ......

let myClient = new client(WS_RPC);
myClient.request(methods.ledger.getLatestSnapshotChainHash)
.then(()=>{
    // ......
})

// 或者
myClient.ledger.getLatestSnapshotChainHash()
.then(()=>{
    // ......
});

// 如果是subscribe方法
myClient.subscribeFunc.newAccountBlocks()
.then(()=>{
    // ......
});

// 或者
myClient.request(methods.subscribe.newAccountBlocks)
.then(()=>{
    // ......
})
```

[详细参考](/api/rpc/)

# Constant

:::tip abstract
@vitejs/vitejs-constant
:::

```javascript import
import { constant } from '@vite/vitejs';

// Or
import * as constant from '@vite/vitejs-client';
```

## Common constants

- Vite_TokenId
- Default_Hash

## Gid

- Snapshot_Gid
- Delegate_Gid

## Contract Address

- Quota_Addr : `Staking`
- Vote_Addr : `Voting`
- Register_Addr : `Registration`
- Mintage_Addr : `Token Issuance`
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

## viteJS built-in transaction type

- BuiltinTxType
    - SBPreg = 0 : `SBP Registration`
    - UpdateReg : `Update Registration`
    - RevokeReg : `Revoke Registration`
    - RetrieveReward 
    - Voting
    - RevokeVoting
    - GetQuota
    - WithdrawalOfQuota : `Withdraw Staked Quota`
    - Mintage : `Token Issuance`
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

## Languages (For creating mnemonic words)

- LangList
    - english : `english`
    - japanese : `japanese`
    - chineseSimplified : `chinese_simplified`
    - chineseTraditional : `chinese_traditional`
    - french : `french`
    - italian : `italian`
    - korean : `korean`
    - spanish : `spanish`

## Abi Function Signature

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

## Introduction to RPC methods' constants

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

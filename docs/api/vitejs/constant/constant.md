# Constant

## Installation

:::demo
```bash tab:npm
npm install @vite/vitejs-constant --save
```

```bash tab:yarn
yarn add @vite/vitejs-constant
```
:::

## Import

```javascript import
import { constant } from '@vite/vitejs';
// Or
import * as constant from '@vite/vitejs-constant';
```

## Common constants

- Vite_TokenId
- Default_Hash

## Gid

- Snapshot_Gid
- Delegate_Gid

## Contract Address

- Pledge_Addr : `Staking`
- Vote_Addr : `Voting`
- Register_Addr : `Registration`
- Mintage_Addr : `Token Issuance`
- DexFund_Addr
- DexTrade_Addr
- contractAddrs
    - Pledge: Pledge_Addr,
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
- CancelMintPledge_Abi

### DEX

- DexFundUserDeposit_Abi
- DexFundUserWithdraw_Abi
- DexTradeCancelOrder_Abi
- DexFundNewOrder_Abi
- DexFundNewMarket_Abi

## BlockType

- BlockType : `AccountBlock Type`
    - CreateContractReq = 1 : `Create Contract`
    - TxReq : `Send Transaction`
    - RewardReq
    - TxRes : `Receive Transaction`
    - TxResFail : `Receive Transaction Failed`
    - SendRefund
    - GenesisReceive

## viteJS built-in transaction type

- BuiltinTxType : `TX type`
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
    - SendRefund
    - GenesisReceive

## Languages 
For creating mnemonic words

- LangList
    - english : `english`
    - japanese : `japanese`
    - chineseSimplified : `chinese_simplified`
    - chineseTraditional : `chinese_traditional`
    - french : `french`
    - italian : `italian`
    - korean : `korean`
    - spanish : `spanish`

## RPC methods

```typescript
enum wallet {
    'listEntropyFilesInStandardDir' = 'wallet_listEntropyFilesInStandardDir',
    'listAllEntropyFiles' = 'wallet_listAllEntropyFiles',
    'extractMnemonic' = 'wallet_extractMnemonic',
    'unlock' = 'wallet_unlock',
    'lock' = 'wallet_lock',
    'listEntropyStoreAddresses' = 'wallet_listEntropyStoreAddresses',
    'newMnemonicAndEntropyStore' = 'wallet_newMnemonicAndEntropyStore',
    'deriveByIndex' = 'wallet_deriveByIndex',
    'deriveByFullPath' = 'wallet_deriveByFullPath',
    'recoverEntropyStoreFromMnemonic' = 'wallet_recoverEntropyStoreFromMnemonic',
    'globalCheckAddrUnlocked' = 'wallet_globalCheckAddrUnlocked',
    'isAddrUnlocked' = 'wallet_isAddrUnlocked',
    'isUnlocked' = 'wallet_isUnlocked',
    'findAddr' = 'wallet_findAddr',
    'globalFindAddr' = 'wallet_globalFindAddr',
    'createTxWithPassphrase' = 'wallet_createTxWithPassphrase',
    'addEntropyStore' = 'wallet_addEntropyStore'
}

enum onroad {
    'getOnroadBlocksByAddress' = 'onroad_getOnroadBlocksByAddress',
    'getOnroadInfoByAddress' = 'onroad_getOnroadInfoByAddress',
    'getOnroadBlocksInBatch' = 'onroad_getOnroadBlocksInBatch',
    'getOnroadInfoInBatch' = 'onroad_getOnroadInfoInBatch'
}

enum tx {
    'sendRawTx' = 'tx_sendRawTx',
    'calcPoWDifficulty' = 'tx_calcPoWDifficulty'
}

enum ledger {
    'getBlocksByAccAddr' = 'ledger_getBlocksByAccAddr',
    'getAccountByAccAddr' = 'ledger_getAccountByAccAddr',
    'getLatestSnapshotChainHash' = 'ledger_getLatestSnapshotChainHash',
    'getLatestBlock' = 'ledger_getLatestBlock',
    'getBlockByHeight' = 'ledger_getBlockByHeight',
    'getBlockByHash' = 'ledger_getBlockByHash',
    'getBlocksByHash' = 'ledger_getBlocksByHash',
    'getBlocksByHashInToken' = 'ledger_getBlocksByHashInToken',
    'getSnapshotChainHeight' = 'ledger_getSnapshotChainHeight',
    'getSnapshotBlockByHash' = 'ledger_getSnapshotBlockByHash',
    'getSnapshotBlockByHeight' = 'ledger_getSnapshotBlockByHeight',
    'getVmLogList' = 'ledger_getVmLogList',
    'getFittestSnapshotHash' = 'ledger_getFittestSnapshotHash'
}

enum contract {
    'getCreateContractToAddress' = 'contract_getCreateContractToAddress',
    'getCreateContractData' = 'contract_getCreateContractData',
    'getCreateContractParams' = 'contract_getCreateContractParams',
    'getCallContractData' = 'contract_getCallContractData',
    'getContractInfo' = 'contract_getContractInfo',
    'getCallOffChainData' = 'contract_getCallOffChainData',
    'callOffChainMethod' = 'contract_callOffChainMethod'
}

enum pledge {
    'getPledgeData' = 'pledge_getPledgeData',
    'getCancelPledgeData' = 'pledge_getCancelPledgeData',
    'getPledgeQuota' = 'pledge_getPledgeQuota',
    'getPledgeList' = 'pledge_getPledgeList'
}

enum register {
    'getRegisterData' = 'register_getRegisterData',
    'getCancelRegisterData' = 'register_getCancelRegisterData',
    'getRewardData' = 'register_getRewardData',
    'getUpdateRegistrationData' = 'register_getUpdateRegistrationData',
    'getRegistrationList' = 'register_getRegistrationList',
    'getCandidateList' = 'register_getCandidateList'
}

enum vote {
    'getVoteData' = 'vote_getVoteData',
    'getCancelVoteData' = 'vote_getCancelVoteData',
    'getVoteInfo' = 'vote_getVoteInfo'
}

enum mintage {
    'getMintData' = 'mintage_getMintData',
    'getMintageCancelPledgeData' = 'mintage_getMintageCancelPledgeData',
    'getIssueData' = 'mintage_getIssueData',
    'getBurnData' = 'mintage_getBurnData',
    'getTransferOwnerData' = 'mintage_getTransferOwnerData',
    'getChangeTokenTypeData' = 'mintage_getChangeTokenTypeData',
    'getTokenInfoList' = 'mintage_getTokenInfoList',
    'getTokenInfoById' = 'mintage_getTokenInfoById',
    'getTokenInfoListByOwner' = 'mintage_getTokenInfoListByOwner'
}

enum dexfund {
    'getAccountFundInfo' = 'dexfund_getAccountFundInfo',
    'getAccountFundInfoByStatus' = 'dexfund_getAccountFundInfoByStatus'
}

enum net {
    'syncInfo' = 'net_syncInfo',
    'peers' = 'net_peers',
    'peersCount' = 'net_peersCount'
}

enum testapi {
    'getTestToken' = 'testapi_getTestToken'
}

enum pow {
    'getPowNonce' = 'pow_getPowNonce'
}

enum subscribe {
    'newSnapshotBlocksFilter' = 'subscribe_newSnapshotBlocksFilter',
    'newAccountBlocksFilter' = 'subscribe_newAccountBlocksFilter',
    'newLogsFilter' = 'subscribe_newLogsFilter',
    'uninstallFilter' = 'subscribe_uninstallFilter',
    'getFilterChanges' = 'subscribe_getFilterChanges',
    'subscribe' = 'subscribe_subscribe'
}

export const methods = { testapi, pow, dexfund, wallet, onroad, tx, ledger, contract, pledge, register, vote, mintage, net, subscribe };
```

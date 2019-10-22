# 常用类型及说明

## 类型

```typescript
// RPC
export declare interface RPCRequest {
    type?: string;
    methodName: string;
    params: any[];
}

export declare interface RPCResponse {
    jsonrpc?: string;
    id?: number;
    result?: any;
    error?: RPCError;
}

export declare interface RPCError {
    code: number;
    message: string;
}

export declare type Hex = string;
export declare type Address = string;
export declare type Base64 = string;
export declare type TokenId = string;
export declare type Int32 = string;
export declare type Int64 = string;
export declare type Uint8 = string;
export declare type Uint16 = string;
export declare type Uint32 = string;
export declare type Uint64 = string;
export declare type Uint256 = string;
export declare type BigInt = string;

export enum TransactionType {
    'RegisterSBP' = 1,
    'UpdateBlockProducingAddress',
    'RevokeSBP',
    'WithdrawSBPReward',
    'VoteForSBP',
    'CancelVote',
    'StakeForQuota',
    'CancelStake',
    'IssueToken',
    'ReIssueToken',
    'BurnToken',
    'TransferTokenOwnership',
    'DisableReIssue',
    'DexDeposit',
    'DexWithdraw',
    'DexCreateOrder',
    'DexCancelOrder',
    'DexOpenNewMarket',
    'DexStakeForMining',
    'DexStakeForVIP',
    'DexBindInviteCode',
    'DexStakeForSuperVIP',
    'DexConfigMarketAgents',
    'DexCreateInviteCode',
    'DexTransferTokenOwnership',
    'DexMarketAdminConfig',
    'CreateContractRequest',
    'TransferRequest',
    'ReIssueRequest',
    'Response',
    'ResponseFail',
    'RefundByContractRequest',
    'GenesisResponse'
}

export declare type TokenInfo = {
    tokenName: String;
    tokenSymbol: String;
    totalSupply: BigInt;
    decimals: Uint8;
    owner: Address;
    tokenId: TokenId;
    isReIssuable: Boolean;
    maxSupply: BigInt;
    isOwnerBurnOnly: Boolean;
    index: Uint16;
}

export declare type AccountBlockType = {
    blockType: BlockType;
    height: Uint64;
    hash: Hex;
    previousHash: Hex;
    address: Address;
    publicKey: Base64;
    producer?: Address;
    fromAddress?: Address;
    toAddress: Address;
    sendBlockHash?: Hex;
    tokenId?: TokenId;
    amount?: BigInt;
    tokenInfo?: TokenInfo;
    fee?: BigInt;
    data?: Base64;
    difficulty?: BigInt;
    nonce?: Base64;
    signature: Base64;
    quotaByStake?: Uint64;
    totalQuota?: Uint64;
    vmlogHash?: Hex;
    
    triggeredSendBlockList?: AccountBlockType[]
    confirmations?: Uint64;
    firstSnapshotHash?: Hex;
    timestamp?: Uint64;
    receiveBlockHeight?: Uint64;
    receiveBlockHash?: Hex;
}

export declare type Transaction = {
    blockType: BlockType;
    height: Uint64;
    hash: Hex;
    previousHash: Hex;
    address: Address;
    publicKey: Base64;
    producer?: Address;
    fromAddress?: Address;
    toAddress?: Address;
    sendBlockHash?: Hex;
    tokenId?: TokenId;
    amount?: BigInt;
    tokenInfo?: TokenInfo;
    fee?: BigInt;
    data?: Base64;
    difficulty?: BigInt;
    nonce?: Base64;
    signature?: Base64;
    quotaByStake?: Uint64;
    totalQuota?: Uint64;
    confirmations?: Uint64;
    firstSnapshotHash?: Hex;
    timestamp?: Uint64;
    receiveBlockHeight?: Uint64;
    receiveBlockHash?: Hex;
    transationType?: String;
    contractParams?: Object;
}

export declare type AddressObj = {
    originalAddress: Hex;
    publicKey: Hex;
    privateKey: Hex;
    address: Address;
}

export enum BlockType {
    'CreateContractRequest' = 1,
    'TransferRequest',
    'ReIssueRequest',
    'Response',
    'ResponseFail',
    'RefundByContractRequest',
    'GenesisResponse'
}

export enum AddressType {
    'Illegal' = 0,
    'Account',
    'Contract'
}

// For example

// Type Address
const Address = "vite_69f3bdb5cdcfa145ae6cc42593a89088ff3dac587eb692d689";

// Type Addr
const originalAddress = "69f3bdb5cdcfa145ae6cc42593a89088ff3dac5800";

// Type TokenId
const tokenId = "tti_5649544520544f4b454e6e40";

// Type originalTokenId
const originalTokenId = "5649544520544f4b454e";
```

## 常量

### 引入

```javascript import
import { constant } from '@vite/vitejs';
```

### 常用变量

- Vite_TokenId
- Vite_Token_Info

### Gid

- Snapshot_Gid
- Delegate_Gid

### BlockType

- BlockType : `AccountBlock Type`
    - CreateContractRequest = 1 : `创建合约`
    - TransferRequest: `发送交易`
    - ReIssueRequest
    - Response
    - ResponseFail
    - RefundByContractRequest
    - GenesisResponse

### Contracts

```typescript

export const Contracts = {
    UpdateReg: {
        contractAddress: ConsensusGroup_ContractAddress,
        abi: oldAbi.UpdateRegistration_Abi
    },
    RevokeReg: {
        contractAddress: ConsensusGroup_ContractAddress,
        abi: oldAbi.CancelRegister_Abi
    },
    RetrieveReward: {
        contractAddress: ConsensusGroup_ContractAddress,
        abi: oldAbi.Reward_Abi
    },
    GetQuota: {
        contractAddress: Staking_ContractAddress,
        abi: oldAbi.Pledge_Abi
    },
    WithdrawalOfQuota: {
        contractAddress: Staking_ContractAddress,
        abi: oldAbi.CancelPledge_Abi
    },
    Mintage: {
        contractAddress: TokenIssuance_ContractAddress,
        abi: oldAbi.Mint_Abi
    },
    MintageIssue: {
        contractAddress: TokenIssuance_ContractAddress,
        abi: oldAbi.Issue_Abi
    },
    MintageTransferOwner: {
        contractAddress: TokenIssuance_ContractAddress,
        abi: oldAbi.TransferOwner_Abi
    },
    MintageChangeTokenType: {
        contractAddress: TokenIssuance_ContractAddress,
        abi: oldAbi.ChangeTokenType_Abi
    },
    DexFundUserDeposit: {
        contractAddress: DexFund_ContractAddress,
        abi: oldAbi.DexFundUserDeposit_Abi
    },
    DexFundUserWithdraw: {
        contractAddress: DexFund_ContractAddress,
        abi: oldAbi.DexFundUserWithdraw_Abi
    },
    DexFundNewOrder: {
        contractAddress: DexFund_ContractAddress,
        abi: oldAbi.DexFundNewOrder_Abi
    },
    DexTradeCancelOrder: {
        contractAddress: DexTrade_ContractAddress,
        abi: oldAbi.DexTradeCancelOrder_Abi
    },
    DexFundNewMarket: {
        contractAddress: DexFund_ContractAddress,
        abi: oldAbi.DexFundNewMarket_Abi
    },
    DexFundPledgeForVx: {
        contractAddress: DexFund_ContractAddress,
        abi: oldAbi.DexFundPledgeForVx_Abi
    },
    DexFundPledgeForVip: {
        contractAddress: DexFund_ContractAddress,
        abi: oldAbi.DexFundPledgeForVip_Abi
    },
    DexFundBindInviteCode: {
        contractAddress: DexFund_ContractAddress,
        abi: oldAbi.DexFundBindInviteCode_Abi
    },
    DexFundNewInviter: {
        contractAddress: DexFund_ContractAddress,
        abi: oldAbi.DexFundNewInviter_Abi
    },
    DexFundTransferTokenOwner: {
        contractAddress: DexFund_ContractAddress,
        abi: oldAbi.DexFundTransferTokenOwner_Abi
    },
    DexFundMarketOwnerConfig: {
        contractAddress: DexFund_ContractAddress,
        abi: oldAbi.DexFundMarketOwnerConfig_Abi
    },
    DexFundPledgeForSuperVip: {
        contractAddress: DexFund_ContractAddress,
        abi: oldAbi.DexFundPledgeForSuperVip_Abi
    },
    DexFundConfigMarketsAgent: {
        contractAddress: DexFund_ContractAddress,
        abi: oldAbi.DexFundConfigMarketsAgent_Abi
    },

    RegisterSBP: {
        contractAddress: ConsensusGroup_ContractAddress,
        abi: RegisterSBP_Abi
    },
    UpdateBlockProducingAddress: {
        contractAddress: ConsensusGroup_ContractAddress,
        abi: UpdateBlockProducingAddress_Abi
    },
    RevokeSBP: {
        contractAddress: ConsensusGroup_ContractAddress,
        abi: RevokeSBP_Abi
    },
    WithdrawSBPReward: {
        contractAddress: ConsensusGroup_ContractAddress,
        abi: WithdrawSBPReward_Abi
    },
    VoteForSBP: {
        contractAddress: ConsensusGroup_ContractAddress,
        abi: VoteForSBP_Abi
    },
    CancelVote: {
        contractAddress: ConsensusGroup_ContractAddress,
        abi: CancelVote_Abi
    },
    StakeForQuota: {
        contractAddress: Staking_ContractAddress,
        abi: StakeForQuota_Abi
    },
    CancelStake: {
        contractAddress: Staking_ContractAddress,
        abi: CancelStake_Abi
    },
    IssueToken: {
        contractAddress: TokenIssuance_ContractAddress,
        abi: IssueToken_Abi
    },
    ReIssueToken: {
        contractAddress: TokenIssuance_ContractAddress,
        abi: ReIssueToken_Abi
    },
    BurnToken: {
        contractAddress: TokenIssuance_ContractAddress,
        abi: BurnToken_Abi
    },
    TransferTokenOwnership: {
        contractAddress: TokenIssuance_ContractAddress,
        abi: TransferTokenOwnership_Abi
    },
    DisableReIssue: {
        contractAddress: TokenIssuance_ContractAddress,
        abi: DisableReIssue_Abi
    },
    DexDeposit: {
        contractAddress: DexFund_ContractAddress,
        abi: DexDeposit_Abi
    },
    DexWithdraw: {
        contractAddress: DexFund_ContractAddress,
        abi: DexWithdraw_Abi
    },
    DexCreateOrder: {
        contractAddress: DexFund_ContractAddress,
        abi: DexCreateOrder_Abi
    },
    DexCancelOrder: {
        contractAddress: DexTrade_ContractAddress,
        abi: DexCancelOrder_Abi
    },
    DexOpenNewMarket: {
        contractAddress: DexFund_ContractAddress,
        abi: DexOpenNewMarket_Abi
    },
    DexStakeForMining: {
        contractAddress: DexFund_ContractAddress,
        abi: DexStakeForMining_Abi
    },
    DexStakeForVIP: {
        contractAddress: DexFund_ContractAddress,
        abi: DexStakeForVIP_Abi
    },
    DexBindInviteCode: {
        contractAddress: DexFund_ContractAddress,
        abi: DexBindInviteCode_Abi
    },
    DexCreateInviteCode: {
        contractAddress: DexFund_ContractAddress,
        abi: DexCreateInviteCode_Abi
    },
    DexTransferTokenOwnership: {
        contractAddress: DexFund_ContractAddress,
        abi: DexTransferTokenOwnership_Abi
    },
    DexMarketAdminConfig: {
        contractAddress: DexFund_ContractAddress,
        abi: DexMarketAdminConfig_Abi
    },
    DexStakeForSuperVIP: {
        contractAddress: DexFund_ContractAddress,
        abi: DexStakeForSuperVIP_Abi
    },
    DexConfigMarketAgents: {
        contractAddress: DexFund_ContractAddress,
        abi: DexConfigMarketAgents_Abi
    }
};
```

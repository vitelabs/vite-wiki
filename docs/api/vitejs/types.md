# Common type and specification

:::tip Tips
[Refer to constant module](./constant/constant.md)
:::

```typescript
// RPC
export declare interface RPCrequest {
    type: string;
    methodName: Methods;
    params: any[];
}
export declare interface RPCresponse {
    jsonrpc: string;
    id: number;
    result?: any;
    error?: RPCerror;
}
export declare interface RPCerror {
    code: number;
    message: string;
}

export declare type Hex = string;
export declare type HexAddr = string;
export declare type Addr = string;
export declare type Base64 = string;
export declare type TokenId = string;
export declare type RawTokenId = string;
export declare type Int64 = number;
export declare type Uint64 = string;
export declare type BigInt = string;

export declare type AddrObj = {
    addr: Addr;         // Actual Address
    pubKey: Hex;        // Public Key
    privKey: Hex;       // Private Key 
    hexAddr: HexAddr;   // Hex Encode Address
}

export declare type AccountBlock = {
    accountAddress: HexAddr;
    blockType: BlockType;
    prevHash: Hex;
    height: Uint64;
    hash: Hex;
    signature: Base64;
    publicKey: Base64;
    fee?: BigInt;
    fromBlockHash?: Hex;
    toAddress?: HexAddr;
    tokenId?: TokenId;
    amount?: BigInt;
    data?: Base64;
    nonce?: Base64;
    logHash?: Hex;
    sendBlockList?: Array;
}

export enum TxType {
    'SBPreg' = 0,
    'UpdateReg',
    'RevokeReg',
    'RetrieveReward',
    'Voting',
    'RevokeVoting',
    'GetQuota',
    'WithdrawalOfQuota',
    'Mintage',
    'MintageIssue',
    'MintageBurn',
    'MintageTransferOwner',
    'MintageChangeTokenType',
    'MintageCancelPledge',
    'DexFundUserDeposit',
    'DexFundUserWithdraw',
    'DexFundNewOrder',
    'DexTradeCancelOrder',
    'DexFundNewMarket',
    'CreateContractReq',
    'TxReq',
    'RewardReq',
    'TxRes',
    'TxResFail',
    'SendRefund',
    'GenesisReceive'
}

// For example

// Type HexAddr
const hexAddr = "vite_69f3bdb5cdcfa145ae6cc42593a89088ff3dac587eb692d689";

// Type Addr
const addr = "69f3bdb5cdcfa145ae6cc42593a89088ff3dac5800";

// Type TokenId
const tokenId = "tti_5649544520544f4b454e6e40";

// Type RawTokenId
const rawTokenId = "5649544520544f4b454e";
```

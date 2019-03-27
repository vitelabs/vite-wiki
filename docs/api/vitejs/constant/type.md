# Type

- RPCrequest
    - type Request Type（request | notification | batch）
    - methodName [Method Name](/api/vitejs/const.html#method)
    - params Parameters

- RPCrequest
    - jsonrpc 2.0
    - id
    - result
    - error RPCerror

- RPCerror
    - code
    - message

- AddrObj
    - `addr : string` : Actual Address
    - `pubKey : string`: Public Key 
    - `privKey : string`: Private Key 
    - `hexAddr : string`: Hex Encode Address
    

- BlockType  Transaction Type
    - createContract Create Contract
    - sendTx Send Transaction
    - reward
    - receiveTx Receive Transaction
    - receiveTxFail Receive Transaction Failed

- BuiltinTxType Built-in Transaction Type
    - SBPreg = 0 SBP Registration
    - UpdateReg Update Registration
    - RevokeReg Revoke Registration
    - RetrieveReward 
    - Voting
    - RevokeVoting
    - GetQuota
    - WithdrawalOfQuota Withdraw Staked Quota
    - Mintage 铸币
    - MintageIssue,
    - MintageBurn,
    - MintageTransferOwner 
    - MintageChangeTokenType
    - MintageCancelPledge
    - DexFundUserDeposit
    - DexFundUserWithdraw
    - DexFundNewOrder
    - DexTradeCancelOrder
    - CreateContractReq Create Contract
    - TxReq Send Transaction
    - RewardReq Rewards
    - TxRes Receive Transaction
    - TxResFail Receive Transaction Failed

- LangList
    - `english` : english
    - `japanese` : japanese
    - `chineseSimplified` : chinese_simplified
    - `chineseTraditional` : chinese_traditional
    - `french` : french
    - `italian` : italian
    - `korean` : korean
    - `spanish` : spanish

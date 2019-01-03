# Type

:::tip Created by
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

- RPCrequest
    - type Request Type（request | notification | batch）
    - methodName [Method Name](/api/vitejs/const.html#method)
    - params Parameters


- blockType  Transaction Type
    - createContract 创建合约
    - sendTx 发送交易
    - reward 奖励交易
    - receiveTx 接收交易
    - receiveTxFail 接收交易失败

- BuiltinTxType Built-in Transaction Type
    - SBPreg = 0 SBP Registration
    - UpdateReg 更新注册
    - RevokeReg 撤销注册
    - RetrieveReward 提取奖励
    - Voting 投票
    - RevokeVoting 撤销投票
    - GetQuota 获取配额
    - WithdrawalOfQuota 取回配额抵押
    - TokenIssuance Token Issuance
    - WithdrawalOfToken Withdraw Staked Tokens
    - CreateContractReq Create Contract
    - TxReq Send Transaction
    - RewardReq Rewards
    - TxRes Receive Transaction
    - TxResFail Receive Transaction Failed

- AddrObj
    - `addr : string` : Actual Address
    - `pubKey : string`: Public Key 
    - `privKey : string`: Private Key 
    - `hexAddr : string`: Hex Encode Address

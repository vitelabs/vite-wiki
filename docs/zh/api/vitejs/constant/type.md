# type

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

- RPCrequest
    - type 请求类型（request | notification | batch）
    - methodName [方法名称](/api/vitejs/const.html#method)
    - params 传参

- RPCrequest
    - jsonrpc 2.0
    - id
    - result
    - error RPCerror

- RPCerror
    - code
    - message

- BlockType  交易类型
    - createContract 创建合约
    - sendTx 发送交易
    - reward 奖励交易
    - receiveTx 接收交易
    - receiveTxFail 接收交易失败

- BuiltinTxType 内置交易类型 (详细交易类型)
    - SBPreg = 0 注册SBP
    - UpdateReg 更新注册
    - RevokeReg 撤销注册
    - RetrieveReward 提取奖励
    - Voting 投票
    - RevokeVoting 撤销投票
    - GetQuota 获取配额
    - WithdrawalOfQuota 取回配额抵押
    - TokenIssuance 铸币
    - WithdrawalOfToken 取回铸币抵押
    - CreateContractReq 创建合约
    - TxReq 发送交易
    - RewardReq 奖励
    - TxRes 接收交易
    - TxResFail 接收交易失败

- AddrObj
    - `addr : string` : 真实地址
    - `pubKey : string`: 公钥
    - `privKey : string`: 私钥
    - `hexAddr : string`: hex编码地址

- LangList
    - `english` : english
    - `japanese` : japanese
    - `chineseSimplified` : chinese_simplified
    - `chineseTraditional` : chinese_traditional
    - `french` : french
    - `italian` : italian
    - `korean` : korean
    - `spanish` : spanish

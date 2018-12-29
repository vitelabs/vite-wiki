# 常量

:::tip 作者
[cs](https://github.com/lovelycs)
[hurrytospring](https://github.com/hurrytospring)
:::

:::tip abstract
const 包括一些常量：method，type，contract, error.
:::

## method

关于rpc方法的常量。  
调用方式

```javascript

import { client, constant } from '@vite/vitejs';
const { method } = constant;
// ......

let myClient = new client(WS_RPC);
myClient.request(method.ledger.getLatestSnapshotChainHash)
.then(()=>{
    // ......
})

```

[详细参考](/api/rpc/)

## type

- RPCrequest
    - type 请求类型（request | notification | batch）
    - methodName [方法名称](/api/vitejs/const.html#method)
    - params 传参


- blockType  交易类型
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

## contract
内置合约相关常量

- Default_Gid 默认Gid
- Default_Hash 默认Hash
- Quota_Addr 抵押地址
- Vote_Addr 投票地址
- Register_Addr SBP注册地址

## error
常用错误类型

- no(100000) 未知错误
- paramsMissing(100001) 丢失参数
- paramsFormat(100002) 参数格式错误
- paramsConflict(100003) 参数冲突
- addressIllegal(200001) 地址不合法
- addressMissing(200002) 地址不存在

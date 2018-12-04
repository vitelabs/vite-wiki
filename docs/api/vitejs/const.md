# 常量

:::作者
[hurrytospring](https://github.com/hurrytospring)
:::

:::abstract
const 包括一些常量：method，type，address。
:::

## method
一些关于rpc方法的常量。  
调用方式:const.method.tx.sendRawTx。  
详细参考[https://baidu.com]
## type

- blockType  交易类型
    - createContract 创建合约
    - sendTx 发送交易
    - reward 奖励交易
    - receiveTx 接收交易
    - receiveTxFail 接收交易失败
- txType 
   - ？？？

## address
一些内置合约的交易地址和地址长度相关的常量
- pledgeAddr 抵押地址
- voteAddr 投票地址
- Register_Addr 超级节点注册地址
    
- ADDR_PRE 地址前缀
- ADDR_SIZE 地址真实长度
- ADDR_CHECK_SUM_SIZE 地址校验和长度
- ADDR_LEN 完整地址长度

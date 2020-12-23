# 第三方交易所接入 Vite 流程

## 接入流程

1. [了解Vite链基本信息](../../introduction)

2. [搭建全节点](../../tutorial/node/install.md)

3. 确定充值方式

Vite支持通过多独立地址、以及单一地址加备注两种方式进行充值。建议采用单一地址加备注转账的方式来充值。

* 生成一个充值地址。可以通过[钱包RPC接口](../../api/rpc/wallet_v2.md#wallet_createentropyfile)来生成。
* 用户充值时直接给充值地址转账，并在备注栏填写交易所账户id。
* 交易所服务端轮询充值地址的[待接收交易列表](../../api/rpc/ledger_v2.md#ledger_getunreceivedblocksbyaddress)，并[接收交易](../../api/rpc/ledger_v2.md#ledger_sendrawtransaction)，最后生成入账记录。
* 交易所服务端定时对入账记录中的[交易确认数](../../api/rpc/ledger_v2.md#ledger_getaccountblockbyhash)进行检查，当确认数超过180时一般可以认为这笔交易已完成。

4. 确定提现方式

* 给指定地址[转账](../../api/rpc/ledger_v2.md#ledger_sendrawtransaction)，并生成出账记录。
* 交易所服务端定时查询出账记录的[交易确认数](../../api/rpc/ledger_v2.md#ledger_getaccountblockbyhash)，直到确认数超过180。

:::tip
方便起见，可以通过[Vite JavaScript API](https://vite.wiki/zh/api/vitejs/)或[Vite Java SDK](https://vite.wiki/zh/api/javasdk/)来调用RPC接口。
:::

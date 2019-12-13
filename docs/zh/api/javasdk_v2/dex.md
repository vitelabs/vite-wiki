# 第三方交易所接入vite流程

## 接入流程

1. [了解Vite链基本信息](https://vite.wiki/zh/introduction/)

2. [搭建全节点](https://vite.wiki/zh/tutorial/node/install.html)

3. 确定充值方式。例如采用带备注转账的方式来充值。

* 生成一个充值地址。可以通过[钱包RPC接口](https://vite.wiki/zh/api/rpc/wallet_v2.html#wallet-createentropyfile)来生成。
* 用户充值时直接给充值地址转账，并填写交易所账户id。
* 交易所服务端轮询充值地址的[待接收交易列表](https://vite.wiki/zh/api/rpc/ledger_v2.html#ledger-getunreceivedblocksbyaddress)，[接收交易](https://vite.wiki/zh/api/rpc/ledger_v2.html#ledger-sendrawtransaction)，生成入账记录。
* 交易所服务端定时对入账记录中的[交易确认数](https://vite.wiki/zh/api/rpc/ledger_v2.html#ledger-getaccountblockbyhash)进行判断，当确认数超过180时认为这笔交易是安全的。

4. 确定提现方式

* 给指定地址[转账](https://vite.wiki/zh/api/rpc/ledger_v2.html#ledger-sendrawtransaction)，并生成出账记录。
* 交易所服务端定时查询出账记录的[交易确认数](https://vite.wiki/zh/api/rpc/ledger_v2.html#ledger-getaccountblockbyhash)，直到确认数超过180。

5. 可以通过[Vite JavaScript API](https://vite.wiki/zh/api/vitejs/)或[Vite Java SDK](https://vite.wiki/zh/api/javasdk_v2/)来调用RPC接口。

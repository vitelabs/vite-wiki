# 第三方交易所接入vite流程
:::tip 维护者
[Eric](https://github.com/roymoro)
:::

##流程说明
1、搭建全节点，参见搭建全节点篇教程 [全节点偏](https://vite.wiki/zh/tutorial/node/install.html "全节点搭建"). 
2、引入java SDK  [java SDK](https://vite.wiki/zh/api/java-sdk/#quickstart "java sdk教程")
3、采用地址+备注方式作为充值方式
4、转账地址的配额抵押 
5、转账的确定
## 采用地址+备注方式作为充值方式
1、生成一个充值地址，所有用户使用同一地址来充值，生成地址通过Key公私钥管理工具生成，例如 vite_682ee3c0967f325b439e5b7bde5148860e422aa7d1cd740xxx
2、用户充值过程即为给vite_682ee3c0967f325b439e5b7bde5148860e422aa7d1cd74xxx地址转账。
3、用户可以用vite wallet 扫码来实现交易所充值。因此二维码符合vite的标准。[二维码生成参考规范](https://vite.wiki/zh/vep/vep-4.html "二维码规范")
4、扫描二维码即给地址用户充值过程即为给vite_682ee3c0967f325b439e5b7bde5148860e422aa7d1cd74xxx地址转账，并在备注字段填充用户在交易所的唯一id。
5、交易所后台程序定时轮训vite_682ee3c0967f325b439e5b7bde5148860e422aa7d1cd74xxx未接收交易的列表，通过接口vitej.unreceivedBlocksByAddressReq
6、获取到列表后，可以生成入账记录，进行0确认展示，有助于交易所的用户体验
7、遍历0确认的交易所入账记录，通过vitej.accountBlockByHashReq 获取交易并判断交易被快照情况，这里面认为180个块为比较安全的确认数。
8、对于符合确认数的交易，进入用户入账操作，改变订单的状态。

## 关于提现
1、提现生成提现记录
2、根据提现情况发送交易，交易转变为待确认
3、通过定时任务 确认待确认交易是否达到完成状态，可以使用vitej.accountBlockByHashReq获取确认数。


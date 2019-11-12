# 介绍

Wallet模块主要用于快速生成钱包。

:::tip Tips
**AddrAccount:** 使用账户地址生成 AddrAccount 实例。主要用于快速查询账户状态，如：账户余额、交易列表、投票信息等。

**Account:** `Account extends AddrAccount` 使用私钥生成 Account 实例。除包含AddrAccount的所有功能外，还可以快速发送交易，以及各种签名相关操作。

**HdAccount:** `HdAccount 包含多个 Account 实例` 使用助记词生成 HdAccount 实例。由于一个助记词可以派生出多个地址，所以一个钱包账户也可以包含多个 Account 实例，且可以激活多个账户。[具体功能可查看 HdAccount 模块](./hdAccount.md)
:::

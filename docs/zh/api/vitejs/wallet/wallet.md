# 介绍

Wallet模块主要用于快速生成钱包。

:::tip Tips
**AddrAccount:** 使用账户地址生成一个实例，主要用于快速查询账户状态，如：账户余额、交易列表、投票信息等。

**Account:** Account extends AddrAccount. 使用私钥生成账户实例，除包含AddrAccount的所有功能之外，还可以快速发送交易，以及各种签名相关操作。

**HdAccount:** HdAccount 包含多个 Account. 使用助记词生成钱包账户实例，由于一个助记词可派生出多个地址，所有一个钱包账户也可以获取到多个账户实例。且可以激活多个账户，具体功能可查看 HdAccount 模块.
:::

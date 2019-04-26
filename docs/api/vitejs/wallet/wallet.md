# Introduction

Wallet module is mainly used to quickly generate a wallet.

:::tip Tips
**AddrAccount:** Use the account address to generate an AddrAccount instance , mainly used to quickly query the account status. eg: account balance / transactions / voting info ...

**Account:** `Account extends AddrAccount` Use the private key to generate an Account instance. in addition to all the functions of AddrAccount, you can also quickly send transactions, as well as a variety of signature-related operations.

**HdAccount:** `HdAccount contains multiple Account instances` Using mnemonics to generate a HdAccount instance. Since a mnemonic can spawn multiple addresses, a HdAccount instance can also get multiple Account instances. And you can activate multiple accounts. [View the HdAccount module](./hdAccount.md)
:::

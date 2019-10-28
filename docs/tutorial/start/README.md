# Introduction to Vite Mainnet <Badge text="2.6.x"/>

Vite Mainnet was launched on September 25, 2019. Hit [Token Swap](https://medium.com/vitelabs/announcing-the-vite-mainnet-launch-4d55fc4b4bd2) to learn about how to convert ERC20 to native Vite coins.

## How to Get Vite Coins

### Purchase at Exchanges

* [ViteX][vitex]
* [OKEx][okex]
* [Bittrex][bittrex]
* [Upbit][upbit]

### SBP Rewards

**SBP (Snapshot Block Producer)** is responsible for producing snapshot blocks and reaching consensus in Vite network. SBP rewards are issued to incentivize SBP nodes. There are 25 SBP nodes in Vite Mainnet.

:::tip
**Block Creation Reward** is `0.951293759512937595` **VITE** per snapshot block. As part of the protocol, SBP rewards are issued on-chain. Each SBP should send **Reward Retrieval Transaction** to built-in **Consensus** contract to get rewards.
:::

Related links:

* [How to Run a SBP][sbp-manage]
* [Rules for SBP Rewards Allocation][sbp-reward]

### Full Node Rewards

Full nodes play an important role in Vite ecosystem. We are pleased to announce **Full Node Reward Program** has been extended to the Mainnet. Full node rewards are distributed on a daily basis since the program was launched on December 13, 2018. 

Related links:

* [Rules for Full Node Rewards][fullnode-reward]
* [Configuration Specification](../node/install.md#full-node-reward)

## Features of Vite Mainnet

### Fee-less Transactions

Transactions are free in Vite. No gas(as in Ethereum) is charged. Instead, Vite implements a **Quota-Based Model** according to the amount of staking for an account, and thus measures how many transactions the account can process in TPS(Transaction Per Second). 
For most of users who usually do not need to send frequent transactions, a non-staking PoW(Proof of Work) mechanism is provided to acquire a small amount of quota for one-time use (one transaction). 
For heavy users like exchange traders, they should stake **VITE** for obtaining sufficient quota.

### HDPoS Consensus

The consensus algorithm in Vite is **Hierarchical Delegated Proof of Stake(HDPoS)**. 
As a multi-tier dPoS algorithm, the top-level consensus in Vite is guaranteed by supernodes in **Snapshot Consensus Group**, while **Delegated Consensus Group** and **Private Consensus Group** are responsible for reaching consensus at smart contract level and user account level respectively.

In HDPoS, multiple instances of **Delegated Consensus Group** and **Private Consensus Group** ensure transactions can be verified and written into ledger at high speed, and the existence of **Snapshot Chain** prevents all transactions from being tempered with. 

### Fast Transactions

The DAG ledger and asynchronous communication scheme are essential to high performance. In general, the asynchronization in Vite lies in three aspects: 

* Asynchronous Design of Request and Response 
* Asynchronous Design of Transaction Writing and Confirmation 
* Asynchronous Design of Inter-Contract Calls

### Built-In Smart Contracts

Built-in smart contracts are widely used in Vite. Features like SBP registration, voting, staking, token issuance and ViteX exchange, are implemented in built-in smart contracts .

#### SBP Registration

In the Mainnet, requirements for registering an SBP node are as follows:

* Staking 1,000,000 **VITE** with a locking period of 3 months
* Operating a server and having skills to maintain said server
* Having substantial community influence and being able to solicit votes from VITE holders

#### Voting for SBP

Users can vote for SBP. The voting weight counts as the balance of **VITE** in user's account. Voting does not have locking period and can be changed at any time. 
Many SBPs distribute voting rewards to supporters. Vote for them and get rewards!

#### Staking

The recommended means to get quota is staking. In the Mainnet, the minimum staking amount is 134 VITE, no maximum limit. 

**Staking Lock-up Period**, defined as the period of time in which staked tokens are locked up and cannot be withdrawn, is 3 days in Vite Mainnet. 
Only the staking account has the permission to retrieve the staked tokens once the locking period expires.

#### Staking for a Recipient Account

Staking account should designate a beneficiary for receiving quota. If not specified, the default beneficiary is the staking account.

#### Staking Withdrawal

Staking account can cancel unlocked staking and retrieve staked **VITE** tokens. The minimum withdrawal amount is 134 **VITE**.

#### Token Issuance

Unlike Ethereum where ERC20 smart contract has to be written, issuing new token in Vite only needs to send a transaction. 
This reduces the barrier of token issuance and also improves security by removing explicit third-party token contracts.

## Coins in Vite

In addition to **VITE**, two other official coins, **VCP** and **VX**, are issued in Vite Mainnet.

### VCP

Full name：*Vite Community Points*

VCP is the credit of the community. They are distributed for free to recognize community members who have significant contribution. At the time being, VCP is mainly used for redeeming Vite merchandise (such as T-shirts and hats) in ViteStore. 
VCP will not be listed for trade in exchange.

### VX

Full name：*ViteX Coin*

As the platform token of ViteX, VX's holders are subject to the exchange's dividends. Unlike many exchange platforms, VX won't be pre-mined and 100% of VX are mined in real transactions based on an agreed distribution schedule.

[sbp-reward]: <../rule/sbp.html#SBP-rewards>
[fullnode-reward]: <../rule/fullnode.html>
[fullnode-install]: <../node/install.html>
[sbp-manage]: <../node/sbp.html>
[web-wallet]: <https://wallet.vite.net>
[app-wallet]: <https://app.vite.net>
[vitex]: <https://x.vite.net/trade?symbol=VITE_BTC-000&category=BTC>
[okex]: <https://www.okex.com/spot/trade#product=vite_btc>
[bittrex]: <https://international.bittrex.com/Market/Index?MarketName=BTC-VITE>
[upbit]: <https://upbit.com/exchange?code=CRIX.UPBIT.BTC-VITE>
[solidity++]: </zh/tutorial/contract/soliditypp.html>


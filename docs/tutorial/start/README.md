# Introduction to Vite Pre-Mainnet <Badge text="2.0.x"/>

Vite Pre-Mainnet is the first stage of Mainnet's launch process. In the Pre-Mainnet, we will examine network performance, stability and security and perform optimizations accordingly.
Vite Pre-Mainnet share the same design and specification with Mainnet. The only major difference is mandatory ERC20-to-Vite token swap will not be conducted in Pre-Mainnet.
Vite Mainnet will launch in Q3, 2019.

**Key Features Implemented**

* [VEP 5: Remove Explicit Snapshot Hash Reference as Timestamps](/vep/vep-5.html) - *Exponential rise on Vite network performance*
* [VEP 7: Merge In-Contract Request Calls into Original Response as one Transaction](/vep/vep-7.html) - *Improvement on block producing efficiency of smart contract*
* [VEP 10: Vite TestNet-PreMainnet Data Migration Plan](/vep/vep-10.html) - *Data Migration from Testnet*
* [VEP 12: The Implementation of Random Numbers in Vite](/vep/vep-12.html) - *Security improved by introducing unpredictable randoms*
* [VEP 13: Rules of SBP Rewards Calculation and Distribution](/vep/vep-13.html) - *New rules of SBP rewards in Pre-Mainnet*

::: warning
In Pre-Mainnet all historical transaction records of Testnet will be cleared, and only account balances are kept. 
See [VEP 10: Vite TestNet-PreMainnet Data Migration Plan](/zh/vep/vep-10.html) for details.
:::

## Rewards in Pre-Mainnet

### SBP Rewards

:::tip
**Block Creation Reward** is `0.951293759512937595` **VITE** per snapshot block. In Pre-Mainnet, rewards will be issued on-chain. Each SBP should send **Reward Retrieval Transaction** to get rewards.
:::

Related links:

* [How to Run a SBP][sbp-manage]
* [Rules for SBP Rewards Allocation][sbp-reward]

### Full Node Rewards

Full node rewards will continue in Pre-Mainnet. Same as in Testnet, full node rewards will be distributed on daily basis. 

Related links:

* [Rules for Full Node Rewards][fullnode-reward]
* [Configuration Specification](../node/install.md#full-node-reward)

## Features in Pre-Mainnet

### Fee-less Transactions

Transactions are free in Vite. No gas(as in Ethereum) is charged. Instead, Vite implements a **Quota-Based Model** according to the amount of Vite tokens staked for the account, and then measures how many transactions the account can send out in TPS(Transaction Per Second). 
For most of users who usually do not have demand to send a lot of transactions in short time, an alternative method of PoW(Proof of Work) mechanism can be used to obtain a small amount of quota for one-time usage(one transaction). 
For high-trading-frequency users, they should stake **VITE** for adequate quota.

### HDPoS Consensus

Vite's consensus algorithm is called **Hierarchical Delegated Proof of Stake(HDPoS)**. This is a multi-tiers dPoS algorithm.
The top-level consensus is guaranteed by **Snapshot Consensus Group**. **Delegated Consensus Group** and **Private Consensus Group** will provide consensus results at smart contract and account level.
There should have multiple **Delegated Consensus Group** and **Private Consensus Group** in the network.
In this consensus, transactions can be verified and written into ledger at high speed, and Vite **Snapshot Chain** prevents all transactions from being tempered with. 
In addition, logical private chain or consortium chain can be easily implemented in this consensus.

### Fast Transactions

DAG ledger and asynchronous communication are essential for high performance. In particular, asynchronous design in Vite lies in three aspects: 

* Asynchronous Design of Request and Response 
* Asynchronous Design of Transaction Writing and Confirmation 
* Asynchronous Design of Inter-Contract Calls

Align with "pull and push" based data delivery model, Vite Pre-Mainnet is equipped with high throughput in nature.

### Built-In Smart Contracts

From SBP registration, voting, staking and new token issuance to ViteX exchange, built-in smart contracts are widely used in Vite.
In addition to build-in smart contracts, users can also write and deploy their own smart contracts in Pre-Mainnet.

#### Supernode Registration

In Pre-Mainnet, user can migrate ERC20 tokens to Pre-Mainnet to register supernode and participate in SBP election. All existing supernodes will be carried over to MainNet when Mainnet is released. 
Registering supernode is as follows:

* Stake 500,000 **VITE**
* Operate a node server and have skills to maintain the said server
* Have substantial community influence and be able to solicit votes from VITE holders

#### Voting for Supernode

In Pre-Mainnet, user can vote for supernode in the amount of his current **VITE** balance, one at a time. Voting can be changed at any time, such as re-vote for another supernode or cancel. 
Many supernodes(will be listed on forum) from the community will issue voting rewards to backers. Vote for them and get rewards!

#### Staking

In Pre-Mainnet, staking **VITE** is the recommended way to get quota. The minimum staking amount is 134 VITE and no maximum limit. 
**Staking lock-up**, defined as the period of time in which staked tokens are "frozen" and cannot be withdrawn, is 3 days. At the time a staking transaction takes place, the designated amount of **VITE** will be sent to built-in staking contract. And only the original staker has the permission to retrieve the staked tokens once they are unlocked.

#### Staking for a Recipient Account

Staker should designate a recipient account to receive quota. The recipient will be granted the corresponding amount of quota until the staking is cancelled by staker. The default recipient is the staker himself.

#### Staking Withdrawal

Staker can cancel the staking and retrieve staked **VITE** after it expires. The withdrawal amount cannot exceed the original staking amount for the specific recipient.

#### One Step Token Issuance

Unlike Ethereum where user has to write ERC20 contract, in Vite issuing new token only needs to send transaction to built-in token issuance smart contract. Not a single line of code is written at all!
This feature effectively reduces the cost of token issuance and no doubt improve security.

## Tokens in Pre-Mainnet

In addition to **VITE**, two other official coins, **VCP** and **VX**, are issued in Pre-Mainnet.

### VCP

Full name：*Vite Community Points*

VCP is used to incentivize the community. They are distributed for free to recognize community members who have contribution. At the time being, VCP is mainly used for redeeming Vite merchandise (such as T-shirts and hats) in ViteStore. 
VCP has stable value and should not be listed for trade in exchange.

### VX

Full name：*ViteX Coin*

As the platform token of ViteX, VX's holders are subject to ViteX's dividends. 100% of VX are mined in real transactions of ViteX. There is no pre-mining at all.
Mining VX will start soon after Pre-Mainnet and ViteX are released.

[sbp-reward]: <../rule/sbp.html#SBP-rewards>
[fullnode-reward]: <../rule/fullnode.html>
[sbp-manage]: <../node/sbp.html>
[web-wallet]: <https://wallet.vite.net>


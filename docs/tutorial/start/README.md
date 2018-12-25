# Vite TestNet Introduction

Vite TestNet officially launched on November 8, 2018.
In the TestNet, you can play with all new features. This includes participating in mining, voting, running full nodes as well as getting rewards.
Token migration from ERC20 to VITE is also available now. You can migrate your Vite ERC20 tokens to Vite TestNet at a 1:1 ratio earning profits in ahead of the release of Vite MainNet! Come and enjoy!

## TestNet Rewards

### SBP Rewards

Mining will be enabled in the TestNet. For the time being, if you run a SBP node, your SBP reward won't show up in wallet. Vite Labs will instead send the actual reward directly to your address on a daily basis.

Related Documents:

* [How to Run a SBP][sbp-manage]
* [Rules for SBP Rewards Allocation][sbp-reward]

::: warning Why can't I see my SBP reward in wallet?
The reason is we want to verify [SBP reward allocation rules][sbp-reward] in the TestNet to see if they are appropriate.

In TestNet, we may alter [rule parameters][sbp-reward] frequently, which may cause hard forks. In order to avoid this, for the time being, Vite wallet does not display SBP rewards but show a link to let anybody query in Vite Block Explorer.
:::

### Full Node Rewards

In the TestNet, running full nodes will be rewarded on a daily basis. Full Node Rewards Program has launched on December 13th, 2018. 

Related Documents:

* [Rules for Full Node Rewards][fullnode-reward]
* [Configuration Spec](../node/install.md#full-node-reward)

## TestNet Features

### Feeless Transactions

Users in Vite do not pay gas for transactions. Instead, Vite implements a TPS(transactions per second) Quota-Based Model. This model dictates that the amount of Vite tokens staked accounts for the amount of quota or TPS facilitated. For low-frequency users, Vite allows a quota to be obtained through a simple PoW (Proof of Work) mechanism. For high-frequency users, however, higher quotas will be obtained through the ability to stake the corresponding amount of Vite Tokens.

In addition, a built-in function configured with accounts provides assurance that all valid transactions are automatically received.

### HDPoS Consensus

Currently, Hierarchical Delegated Proof of Stake (HDPoS) Consensus Algorithm is implemented on Vite's TestNet. The system consensus is provided by a global consensus group. The DAG ledger ensures quick recording of transactions. In addition, the Snapshot Chain prevents transactions from being tempered with. Future improvements upon this consensus algorithm will allow side chains, private chains and consortium chains to be easily implemented in Vite.

### Fast Transactions

The DAG ledger structure and Asynchronous Architecture are essential to ensuring Vite's high performance. In particular, Asynchronous designs within Vite come in three categories: 

* Asynchronous Design of Request and Response 
* Asynchronous Design of Transaction Writing and Confirmation 
* Asynchronous Design of Inter-contract Invocation

These features improve system performance through utilization of optimized P2P (peer to peer) data transmission.

### Built-In Smart Contract

Vite lays the foundation for timed scheduling, decentralized exchanges as well as other functions facilitated through the TestNet's built-in smart contract capability. Built-in contracts that have been implemented include SBP registration, voting, token staking and token issuance. Vite will provide users the capability to write, compile and deploy smart contracts soon.

#### SBP Registration

In the TestNet, users are able to migrate the ERC20 tokens to the TestNet to participate in SBP elections. At the time of MainNet launch, all SBPs on the TestNet will automatically become SBPs on the MainNet. Users who are interested in operating an SBP will be able to register in advance. The election process is as follows:

* Stake 500,000 VITE (this requirement will become 1,000,000 VITE for the MainNet).
* Run a node server and have necessary skills to maintain said server
* Have substantial community influence and be able to solicit votes from VITE holders

#### Voting for SBP

In the TestNet, users can create a transaction to vote for an SBP. The user's current VITE balance will be used as the number of votes counted towards the SBP. A user is only allowed to vote for one SBP at a time, but he can change voting at any time. In the TestNet phase, voting for the Vite official SBP will receive voting reward. The reward yield is dependent upon how many users participate in the voting process. As more users vote, the return will be diluted.

#### Vite Token Staking

In the TestNet, users can stake VITE tokens to obtain a certain amount of quota. The minimum stake value is 10 VITE; there is no maximum limit. The "lock-up" period, defined as the period of time in which tokens cannot be withdrawn from a staking request, lasts 3 days. After the user engages in staking, the VITE amount staked will be automatically sent to a smart contract address. Vite has ensured that only the staker has the authority to use the designated staked tokens.

#### Staking with a Recipient Account

The staker will designate a recipient account for the amount of Vite tokens chosen to be to staked bearing in mind the 3 day duration of the lock-up period. The recipient account attains the corresponding quota during the staking period after the response transaction has been snapshot.

#### Stake Withdrawal

The staker is able to retrieve their deposit after the staking time expires by specifying the recipient account and token amount to be withdrawn. The amount withdrawn cannot exceed the original amount staked for the recipient.

#### One Step Token Issuance

Unlike Ethereum users who have to write and deploy their own ERC20 contracts, Vite users only need to send a transaction to a token issuance smart contract address. This built-in user friendly feature has been designed to effectively reduce the high cost of token issuance on Ethereum as well as enforce heightened security.

## Tokens

Besides VITE, two other tokens are officially released in the TestNet: VCP and VTT.

### VCP

Full name：*Vite Community Points*

VCP stands for Vite Community Points used to incentivize the community with rewards points, similar to systems used by other consumer apps or credit cards. The Vite Community Incentive program was created in order help test the Vite network. You can use VCP to redeem Vite limited edition merchandise (such as T-shirts and hats) in Vite Store. VCP is stable, and is donated by Vite’s official operations. It is only used to redeem products at Vite Store (therefore, it has no value as an investment nor will it ever be traded on an exchange)

### VTT

Full name：*Vite Test Token*

VTT stands for Vite Test Token. It can be obtained freely in [Vite wallet][web-wallet] and mainly serves to help us test the Vite network.

[sbp-reward]: <../rule/sbp.html#SBP-rewards>
[fullnode-reward]: <../rule/fullnode.html>
[sbp-manage]: <../node/sbp.html>
[web-wallet]: <https://wallet.vite.net>


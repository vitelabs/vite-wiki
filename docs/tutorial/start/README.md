# Vite TestNet Introduction

Vite TestNet `1.0.0`(with *SBP* mining enabled) was officially launched on November 8, 2018.
In the TestNet, you can play with all the new features, participate in mining, voting and full-node testing and get rewards.
Token migration from ERC20 to VITE is also available now. You can migrate your Vite ERC20 tokens to Vite TestNet at a 1:1 ratio, to earn profits in ahead of the release of Vite MainNet! Come and enjoy!

## TestNet Rewards

Various airdrops and rewards will be provided in the TestNet. Among them, SBP reward and full-node reward have the most importance.

### SBP Reward

SBP mining will be enabled on the TestNet. On a temporary basis in the `1.0.x` releases, SBP reward will be marked as `0`. Instead, the actual rewards will be sent to the miners' addresses by Vite Labs.

Related documents:

* [How to run a SBP][sbp-manage]
* [SBP reward allocation rules] [sbp-reward]

::: warning Why the SBP reward is 0?
We want to test the [SBP reward allocation rules] [sbp-reward] in the TestNet since we are not sure if the current [rules] [sbp-reward] are the best.

We may frequently alter the [rule parameters] [sbp-reward] in TestNet `1.0.x`, which may cause frequent hard forks. In order to avoid this, in `1.0.x` versions, all SBP reward is `0`.
Instead, all rewards will be calculated and sent to the miner by Vite Labs team according to the [rules] [sbp-reward] at the time being.
:::

### Full-Node Reward

In order to encourage the participation in testing as full nodes in the TestNet, we will start `Full-Node Reward Program`.

The details will be announced later.

## Features

### Free Transactions

In the Vite system, the user does not pay a required gas fee for a transaction. Instead, Vite generally implements our TPS quota-based model which dictates that the amount of Vite tokens staked directly correlates to the amount of quota or TPS facilitated. For low-frequency users, Vite allows a quota to be obtained through a simple PoW (Proof of Work) mechanism. High-frequency users, however, will garner high quotas through their ability to stake a corresponding amount of Vite Tokens.
Within Vite user accounts, a built-in function has been additionally configured in order to provide assurance that all valid transactions are received automatically. The support shown for the facilitation of these transactions and the quota allocation mechanism is not possible within Bitcoin and Ethereum.

### HDPoS Consensus

At present, HDPoS consensus is basically implemented in the TestNet. The overall system consensus is guaranteed by the snapshot chain through snapshot consensus group while the the consensus on the DAG structure of the accounts ensures that the ledger are written quickly. In addition, the snapshot chain prevents transactions from being tempered with. 
In the future, side chains, private chains and consortia chains will be easily established in Vite.

### Fast Transaction Speed

In order to improve the performance of the public chain, the DAG ledger structure and asynchronous architecture are essential parts of the TestNet. There are 3 types of asynchronous design: 

* Asynchronous design of request and response 
* Asynchronous design of transaction writing and confirmation 
* Asynchronous design of communication among contracts

These features assist system performance improvement through efficient push & pull based P2P (peer to peer) data transmission.

### Built-in Smart Contract

Vite lays the foundation for timed scheduling, decentralized exchanges as well as other functions through the TestNet's built-in smart contract capability. Built-in contracts that have already been implemented include: SBP registration, SBP Voting, token staking and token forging. Vite will soon be able to assist users capability to compile smart contract code and deploy smart contracts themselves.

#### SBP Registration

In the TestNet, users are able to migrate the ERC20 tokens to the TestNet to participate in SBP election. At the time of MainNet launch, all SBPs on the TestNet will automatically become SBPs on the MainNet. Users who are interested in operating an SBP, you will be able to register in advance. The election process is as follows:

* Stake 500,000 VITE (this requirement will become 1,000,000 VITE for the MainNet)
* Run a server & have the necessary skills to maintain said server
* Have community influence and be able to solicit votes from VITE holders

#### SBP Voting

In the TestNet, users can start a transaction to vote for an SBP. One user may only vote for one SBP at a time. When counting votes, the user's current balance will be used as the number of votes sent to the SBP. Submitted votes can be modified at any time. In the TestNet phase, voting for the Vite official SBP will have its own voting reward. The collective reward yield is dependent upon how many users participate in the voting process. As more users vote, the return will be diluted.

#### Vite Token Staking

In the TestNet, users can stake VITE tokens to obtain a certain amount of quota. The minimum stake value is 10 VITE with no maximum limit. The "lock-up" period will be around 3 days. After the user applies for a stake, those VITE will be automatically sent to a smart contract address rather than to any other user. Vite has ensure that only the staker himself or herself will have the authority to use the staked tokens.

#### Stake

The staker will designate a beneficiary account, the amount of Vite tokens to stake as well as the expiration time in a stake request transaction. The beneficiary account attains the corresponding quota during the staking period after the response transaction has been snapshot.

#### Stake Cancel

The staker is able to retrieve the deposit after the stake time expires by specifying the specified beneficiary account & token amount to be retrieved; this cannot be greater than the total amount staked for the beneficiary.

#### One-Button Forging

Unlike Ethereum users who have to write and deploy their own ERC20 contracts, Vite users only need to send a transaction to a built-in token forging smart contract address which has been designed to be inherently user-friendly. This feature should effectively reduce the high cost of token issuance on Ethereum & will enforce heightened security.

## Tokens

Two tokens will be officially released in the TestNet: VCP and VTT.

### VCP

Full name：*Vite Community Point*

VCP is Vite Community Point, which is used for Vite Community Incentives, like points earned by other apps or credit cards, to help test the Vite network. You can use VCP to redeem Vite limited edition merchandise (such as T-shirts and hats) in Vite Store. VCP is stable, and is donated by Vite’s official operations. It is only used to redeem products at Vite Store (therefore, it has no value as an investment nor will it ever be traded on an exchange)

### VTT

Full name：*Vite Test Token*

VTT is Vite Test Token. It can be obtained freely in [Vite wallet][web-wallet] and mainly used for testing.

[sbp-reward]: <../rule/sbp.html#出块奖励>
[sbp-manage]: <../node/sbp.html>
[web-wallet]: <https://wallet.vite.net>



# Snapshot Block Producer

::: tip
Please note this is not a technical document, but mainly describes Vite's SBP and related topics. Technical details will be introduced in the yellow paper.

The Definitions of Terms:
* **SBP**: Snapshot Block Producer
* **Staking**： An amount of **VITE** in the account is locked up and cannot be traded or utilized.
* **A Round**: 75 seconds approximately, in which votes of supernodes are re-calculated once. In ideal condition, 75 snapshot blocks are produced in a round.
* **A Cycle**: Refers to 1152 rounds, approximately one day.
* **SBP Staking Address**: Refers to the address from which the SBP registration transaction was sent, aka registrant's address.
* **SBP Address**: Refers to the address configured on the SBP node for producing blocks, aka block producing address.
:::

Vite adopts DPoS as consensus algorithm. Compared with original DPoS, following changes have been made:

* **SBP Registration**：Register a new supernode requires a staking of 500,000 VITE
* **SBP Selection**: In each round, 25 SBPs(23 from top 25 supernodes and 2 others from 26-100) are selected for producing snapshot blocks.
* **SBP Rewards**: 50% are given to block producers as mining rewards, and rest 50% are shared among top 100 supernodes according to voting weights.

## SBP Registration

In typical DPoS algorithm, fees are usually paid for registering supernode. But in Vite, registering SBP is free and can be done through **Staking**.

### Staking Rules

To register a new SBP, you need to stake a designated amount of Vite tokens. There tokens will be locked up until the SBP is cancelled, and then can be retrieved. However, in order to maintain the SBP role, you should never retrieve staking.

**Staking Amount：**

*500,000 VITE*

**Staking Period：**

Staking cannot be retrieved immediately after registration. The lock-up period is approximately 3 months(**7776000** snapshot blocks). 
By expiration, sending a **Cancel Registration** transaction can retrieve staked tokens. But in the meantime, your SBP role will be lost.

The lock-up time is primarily incorporated to prevent unnecessary frequent staking/canceling, which would cause huge impact on the stability of consensus.

### Registration and Cancellation

Unlike typical DPoS algorithm, where the supernode's address is usually also the address used for producing blocks and receiving rewards, 
in Vite, registering SBP, producing blocks and receiving rewards can be done through 3 different addresses. 

To register an SBP in Vite, registrant can send an **SBP Registration** transaction to certain built-in smart contract. When the transaction is confirmed, the registration is completed.

Similarly, registrant can send a **Cancel Registration** transaction to cancel an SBP. In this case, the corresponding supernode will be removed from SBP list after the transaction is confirmed.

#### Parameters

* **SBP Address**: The address used to produce snapshot blocks. 
This address can be same with the address used in **SBP Registration**. However, it is highly recommended to use a different address on the node to avoid attack.
SBP address can be changed by sending an **Updating Registration** transaction by registrant.

* **SBP Name**: 1-40 characters, including Chinese and English, numbers, underscores and dots. Duplicated names are not allowed. SBP name is mainly used in voting.

## How SBP Works

### Round

A round is approximately 75 seconds. Vite snapshot chain increases at the pace of one new block per second. Voting result is re-calculated in every 75 seconds to select the SBPs in next round. Each selected SBP will have chance to produce 3 consecutive blocks in a round.

### Selection

Vite network will select 25 SBPs in each round according to following rules:

* 23 SBPs are randomly selected from the top 25 supernodes (sorted by votes). Selected ratio is ${23/25}$ if your node is in top 25
* 2 SBPs are randomly selected from supernodes ranking from 26 to 100. Selected ratio is ${2/75}$

## SBP Rewards

An annual inflation of up to 3% is granted as SBP rewards. At the time the reward for producing a snapshot block in the TestNet is fixed at ${0.951293759512937595}$ **VITE**

### Reward Allocation

The whole rewards are equally split in 2 parts:

#### Rewards Allocated to SBP Who Produced Blocks

50% will be given to block producer in number of the blocks he created, called **Block Creation Reward**.

#### Rewards Allocated to Top 100 SBPs 

50% will be given to the top 100 SBPs in a day, called **Candidate Additional Reward**.

**Candidate Additional Reward** has following rules:

* Voting weight is measured in the amount of votes a certain SBP has. More weight, more rewards.
* Rewards are generated daily in every *1152* rounds. Only rewards generated *48* rounds ago (about 1 hour) are subject to allocation. 
* In each day, SBP's online rate (up-time) is calculated in $\frac{Total Blocks Produced}{Total Blocks On Target}$. The higher online rate, the more rewards.

### Reward Calculation

**A cycle**: Refers to 1152 consecutive rounds, approximately 1 day. The first cycle starts from genesis snapshot block.

* `l`: The number of blocks that were produced by the SBP in a cycle
* `m`: The number of blocks that should be produced by the SBP in a cycle
* `X`: The number of blocks that all SBPs produced in a cycle
* `W`: The sum of all top 100 SBPs' total votes and total staking amount at last round in a cycle
* `V`: The sum of the SBP's votes and staking amount at last round in a cycle
* `R`: Fixed block creation reward of **0.951293759512937595 VITE** in the TestNet
* `Q`: The total reward for the SBP in a cycle

$$Q = \frac{l}{m}*\frac{V}{W}*X*R*0.5 + l*R*0.5$$

Note:
* According to the above formula, if a SBP ranks after 100 in the last round in a cycle, the reward for this SBP in this cycle is 0
* There is no reward for the first cycle after a SBP has just registered
* There is no reward for the last cycle when a SBP cancels registration
* If all the SBPs produce no blocks in a round (75 seconds), this round will be exempted from up-time rate calculation for all SBPs
In other words, in this round, ${Total Blocks On Target} = 0$

#### Reward Retrieval

In Vite TestNet, SBP should explicitly send a **Reward Retrieval** transaction from the staking address to get the rewards.

**Reward retrieval rules:**

* Reward retrieval transaction must only be initiated by the staking account from which the SBP was registered
* Only rewards generated **48** rounds ago (about one hour) are available for retrieving
* If no retrieving period is specified, a transaction will retrieve all available rewards, which are defined as the rewards generated between last retrieval time and one hour ago
* Reward reception address can be any valid Vite address. It is not required to be staking address only
* Reward retrieval transaction will consume `68200` quota


## FAQ
  
* I don't have enough **VITE** in my account. Can I co-stake from multiple addresses for registration?

   Currently, no. However, you can setup a crowdfunding smart contract and send SBP registration request from the contract in the form of **Cross-contract Call**.

* If the uptime of a SBP in a cycle is 0, I can understand the **Candidate Additional Reward** for this node will be 0, but will this part of rewards be distributed to other SBPs?

   Rewards distribution (in token inflation) will only take place when requested by the SBP. If a SBP's rewards is 0, no additional Vite token will be minted, so that other SBPs won't receive extra rewards either.
  
* If I register a SBP but do not have corresponding node running, can I get reward?

   No. Your SBP reward will be 0 due to 0 uptime in this case.
  
* I already have a supernode running, but why do I find out my uptime is 0?

   This may happen. The possible scenarios include your node was working on a fork, you had a network problem at the time being, or your node did not get chance to produce any block in a cycle.
  
* My SBP node produced a snapshot block, can I get both block creation reward and candidate additional reward when I retrieve reward?

   Not necessarily. There is no reward for the first cycle after registration and the last cycle before cancellation. Also, if the SBP ranks out of 100 in the last round of the cycle, it is qualified for no reward either.
  
* I staked when I registered SBP. Can I re-stake the same tokens for quota in the meantime?

   Currently, no. You cannot re-use these tokens for other purpose during SBP registration's staking period, including staking for quota and trading. However, we may introduce a more flexible solution in future.
  
* Can I register multiple SBPs from the same account address?

   Yes, you can. SBP registration address(aka staking address) can be different with the address of SBP node who produces blocks in practice. In this case, you should assign a different block producing address for every newly registered SBP node.
  
* If a SBP node has 100% uptime in the first half cycle and all SBPs produce none block in the second half, what is the uptime of the SBP node in this cycle?

  The uptime is 100%. Because all SBPs has produced no block in the second half cycle, this will cause the second half is excluded from uptime calculation. As a consequence, the SBP's uptime only comes from the first half in this cycle.
  

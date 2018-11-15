# SBP (Snapshot Block Producer)

::: tip
Please note this document is not a technical document, but mainly describes SBP and SBP-related topics. Technical details will be introduced in the yellow paper.

The Definitions of Terms:
* **SBP**: Snapshot Block Producer
* **Stake**： A part of ${\it vite}$ in the account is frozen and cannot be traded or used.
* **A round**: Vite system recalculates votes after each round(75 seconds). Ideally, 75 blocks are produced in a round.
* **A cycle**: Refers to 1152 rounds, approximately one day.
* **SBP staker address**: Refers to the SBP registration transaction initiator, aka staker.
* **SBP address**: Refers to the address configured on the SBP server.
:::

Vite invents Snapshot Chain technology and adopts DPoS consensus algorithm which is consistent with the DPoS algorithm of BTS in essence. However, compared with original DPoS, Vite has made some improvements.

**The relevant modifications are as follows (For detailed rules, please read the article below)**:

* **SBP Registration**：SBP registration requires 1,000,000 VITE staking (In Vite TestNet this requirement is 500,000 VITE)
* **SBP Election**: In each round, a random 23 SBPs in the top 25 super nodes are selected to produce snapshot blocks, plus another 2 SBPs are randomly selected in super nodes ranking between 26-100.
* **Mining Rewards**: 50% of the mining rewards are given to the SBP, and 50% are allocated to the top 100 super nodes (calculated by voting weight)

## SBP Registration

In the traditional DPoS implementation, a certain amount of tokens are paid to register delegated node. But in Vite system, computing resources as well as SBP eligibility are obtained through **staking**.
In Vite, you can stake to get **Quota** (transaction quota), or you can stake to register a SBP.

### Stake Rules

To register a SBP, you need to stake VITE tokens, which can be retrieved back by canceling the SBP eligibility. In other words, if you want to maintain SBP qualification, you should have your VITE staked all along.

**Stake Amount：**

* MainNet：*1,000,000 VITE*
* TestNet：*500,000 VITE*

**Stake Time：**

The staked VITE for SBP registration cannot be retrieved immediately.
Actually, the tokens can be retrieved by sending a transaction to **cancel the SBP eligibility** only after **7776000** snapshot blocks (about 3 months).

The *3 months* lock-time is to prevent frequent staking/canceling, which would significantly impact the stability of the entire network.

### Registration Logic

In the traditional DPoS algorithm, the address of the registered delegated node is the address to produce blocks and receive rewards. Once a node is registered as delegated node, it obtains the qualification since the time being .

In Vite, the address of the registered super node, the address of the block producer, and the address to receive rewards can be three different addresses. After a node has registered as a super node, if it sends a transaction to **cancel stake**, it will lose the super node qualification.

In the registration process, the staker sends a **SBP registration** transaction (actually calls the built-in contract), when the transaction is received by the built-in contract, the registration is complete after the receive transaction is confirmed by the snapshot chain.

#### Parameters

* **SBP Address**: The address used to produce snapshot blocks. 
This can be the address of the node who starts **SBP Registration**. However, it is recommended to generate a new address on the SBP server and then use this address as the SBP address, so that even if the server is hacked, the stake address is secure.
SBP address can be updated by sending a transaction that **modifies registration information** by the staker.

* **SBP Name**: 1-40 characters, including Chinese and English, numbers, underscores and dots. Duplicated names are not allowed. SBP name is used in voting.

## SBP Qualification

### SBP Round

In Vite system, the rate at which the snapshot chain generates new blocks is 1 block per second. In every 75 seconds (equivalent to a round) the voting result is calculated to select who are the SBPs in the next round. Each SBP generates 3 consecutive blocks in a round.

### SBP Node

In Vite system, there are 25 SBP nodes that are selected in each round. The rules are as follows:

* 23 SBP nodes are randomly selected from the top 25 super nodes (sorted by votes). The ratio of a top-25 super nodes being selected is: 23/25.
* 2 SBP nodes are randomly selected from super nodes ranking from 26 to 100. The ratio of a super node who ranks between 26 to 100 being selected is: 2/75.

## SBP Reward(aka mining reward)

After Vite MainNet is launched, an inflation of at most 3% of VITE market cap will be permitted each year as SBP rewards. The current reward for a snapshot block in the TestNet is fixed at: `0.951293759512937595`

### Reward Allocation

The reward for a block is allocated to 2 parties:

#### To SBP who produced the block

50% of reward will be given to the block producer, which we call **Block Reward**.

#### To top 100 SBPs 

50% of reward will be given to the top 100 SBPs every 75 seconds in a round, which we call **Voting Reward**.

The voting reward rules are as follows:

* Voting weight (the amount of votes won by the SBP) is used to allocate rewards. The more weight a SBP has, the more voting rewards will be given to it.
* Only rewards before *1152* rounds (about 1 day) can be allocated. Voting rewards are calculated every *1152* rounds, or every day.
* In a cycle (approximately 1 day), SBP online rate can be calculated as `total number of blocks that are actually produced / total number of blocks that should be produced`. The higher the online rate, the more rewards.

### Reward Calculation

**A cycle**: Refers to 1152 rounds, approximately one day.

* `l`: The number of blocks actually produced by the node in one cycle
* `m`: The number of blocks that should be produced by the node in a cycle
* `n`: The number of rounds in which the node ranks in top 100 SBPs in one cycle, referred to as **the number of rounds in which the node participates**
* `Xn`: The number of blocks that are actually generated by the node in Round n
* `Wn`: The sum of total number of votes received by all top 100 SBPs and the total amount of stake of all top 100 SBPs in Round n in which the node participates
* `Vn`: The sum of the number of votes and stake obtained in Round n in which the node participates
* `R`: The reward for each block. In the TestNet this is a constant: `0.951293759512937595`
* `Q`: The total reward for the node in a cycle

$$Q = \frac{l}{m}*\sum_{1}^{n }\left( \frac{Vn}{Wn}*R*0.5*Xn\right) + l*R*0.5$$

#### Reward Retrieval

The rewards in Vite TestNet are not immediately sent to the SBP's address, but the staker who registered the SBP is required to manually send a **reward retrieval** transaction to get the rewards.

**Reward retrieval rules:**

* Reward retrieval must only be requested by the account that registered the SBP, which is the address of the stake account.
* Only the rewards accumulated one cycle ago (about one day) are able to be retrieved.
* The cumulative rewards of up to three months since the last extraction can be retrieved in one request. Longer period extraction should be done in multiple **reward retrieval requests**.
* A receive address is required to receive the rewards. It does not have to be the same in each retrieval.
* Reward retrieval requires a consumption of `238800` quota each time.


## FAQ
  
* The VITE in one my account is not sufficient. Is `staking from multiple accounts` supported?
  
   Currently, no. SBP registration is implemented based on **built-in smart contract**. `Staking from multiple accounts` will be supported through **inter-contract calls** in the future, after the full functional smart contract is ready.

* If the online rate of a node in a cycle is 0, the **voting reward** for this node is 0, then the **voting reward** which should have belonged to him will be distributed to other nodes?

   The inflation only happens when a SBP sends a request to ask for his rewards. If a node has 0 reward due to 0 online rate, no new VITE token will be issued, so that no additional reward will be given to other nodes.
  
* If I register as a super node but do not run it, may I receive a reward?

   No. Your reward is 0 due to 0 **online rate** if you do not run the node at all.
  
* I have already run a super node, but I find my online rate is 0?

   It is possible. If your node happens to be in a forked chain, or if you have high network latency for the moment, you may have zero online rate. In addition, if the number of blocks that your node should produce in a cycle is 0, the online rate is also 0.
  
* I have produced a snapshot block, can I get both the block reward and voting reward for this block when I retrieve the reward?
  
   Yes, you can.
  
* May the VITEs staked when I registered for SBP be re-used for **staking for quota**?

   In the current design (the first version of TestNet), staked VITE tokens in SBP registration can not be re-used during the stake period. In other words, you can not re-stake these VITEs for other purpose such as to obtain quota. However, an in-plan enhancement may be introduced in the future release.
  
* Can I use my account to register multiple super nodes?

   Yes you can. In Vite system, SBP registration address(aka staker address) and the address of SBP node who produces blocks may be two different addresses. The staker can assign a different address to run the node each time he registers a super node.
  























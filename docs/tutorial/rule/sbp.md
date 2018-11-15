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

### 奖励计算公式

**一个周期**：指1152轮次，约一天。

* `l`: 节点在一个周期内实际出块数目
* `m`: 节点在一个周期内应该出块数目
* `n`: 节点在一个周期内，投票排名进入前100的轮次总和，简称为**该节点参与的轮次数目**
* `Xn`: 该节点参与的轮次的第n轮实际共有多少个块产生
* `Wn`: 该节点参与的轮次的第n轮前100名节点获得的总投票数，和前100名的抵押金额之和
* `Vn`: 该节点参与的轮次的第n轮获得的投票数目和抵押金额之和
* `R`: 每个块的奖励，测试网路固定为：`0.951293759512937595`
* `Q`: 每个节点一个周期内的奖励

$$Q = \frac{l}{m}*\sum_{1}^{n }\left( \frac{Vn}{Wn}*R*0.5*Xn\right) + l*R*0.5$$

#### 奖励提取

Vite 网络中的出块奖励不是立即发放到出块者地址，需要SBP的注册账户手动发起**奖励提取**交易，才能收到奖励。

**奖励提取规则：**

* 只能由注册SBP的账户发起，也就是抵押账户的地址。
* 每次提取只能提取一个周期（约一天）以前的出块奖励。
* 每次最多提取从上次提取的时间往后推三个月时间内的奖励，若待提取的时间段超过三个月，需要发送多笔**奖励提取请求**。
* 提取奖励时需要填写奖励提取的地址，每次提取时填写的地址可以不一样。
* 提取奖励需要消耗`238800`配额


## FAQ

* 一个账户上的vite不够抵押vite数量，那是否支持多地址联合抵押?
  
  目前不支持`多地址联合抵押`，SBP注册的逻辑是由**内置智能合约**实现，后续智能合约上线之后，可以通过**合约调用合约**的方式来实现`多地址联合抵押`。

* 如果一个节点一个周期内（约一天）的在线率是0，那这个节点**按票奖励**为0，那本该属于他的**按票奖励**会平分给其他节点吗？

  节点的奖励的vite是在SBP提取时增发，如果一个节点在线率为0，按票奖励为0，这个节点将无法提取这段奖励，所以这段奖励就不会增发，故而这份奖励也不会平分给其他节点。
  
* 如果注册成为超级节点之后，却不跑节点，会收到奖励么？

  不会。如果没有运行超级节点，该节点**在线率**为0，奖励为0。
  
* 我已经运行了一个超级节点，但是在线率是否也可能为0？

  有可能会。如果节点处于一个分叉链，或者网络延迟比较高，都有可能会导致在线率为0。如果这个节点在一个周期内的应该出块数为0，在线率也为0。
  
* 我出了一个快照块，提取奖励时能同时拿到这个块的按块奖励和按票奖励吗？
  
  是的。
  
* 注册SBP时抵押的vite，在抵押之后是否还可以用于**抵押获取配额**？

  在目前的设计里（第一版测试网络），SBP注册抵押的vite在抵押期间无法使用，当然也不能**抵押获取配额**，后续考虑改进，已经在计划之中。
  
* 一个地址是否可以注册多个超级节点？

  支持。因为SBP注册地址和SBP运行地址可以为两个不同的地址。SBP注册地址（也就是抵押地址）每次抵押时都可以指定另一个地址为SBP运行地址。
  























---
title: Snapshot Chain
---

# Snapshot Chain: An Improvement on Block-lattice

The block-lattice is a DAG ledger data structure introduced by Nano. Transactions in block-lattice do not compete for a global order. Because transactions don’t block each other, the block-lattice technology can theoretically provide higher throughput and lower latency compared to the Blockchain structure.

What’s missing in Block-lattice?
Block-lattice works well in Nano, but it has some defects as follows:

A. The transactions for an account exist only on its own account-chain. The transactions issued by other users will not be appended to this chain automatically. Therefore, once the user stops producing new transactions, his account-chain will not grow any more. In such a case, the probability of generating a fork to rollback a transaction at the end of a chain does not decrease over time.

B. When a fork occurs, a representative will create a vote to decide which one is selected. The voting result is not persisted into the public ledger, but recorded in the local storage of the representative node. Each verification node needs to send a request to the representative node to query the voting result without trusting any of them. The representative nodes will become the performance bottleneck of the system.

C. The system lacks a global clock. Because of this, it is impossible to measure the exact TPS of each account. Block publishing can be throttled by the PoW. But every accounts have the same TPS quota. It is hard to implement an on-demand TPS allocation mechanism. Furthermore, there has not been an efficient technique to defend against Precomputed PoW Attack till now.

In this Blog, I will introduce an additional data structure called Snapshot Chain, which can solve the problems above in an elegant way.

What is Snapshot Chain
The Snapshot Chain is an independent blockchain structure composed of Snapshot Blocks. A Snapshot Block records the balance of each account and the hash of the latest block in each account-chain. Snapshot Blocks can be issued by a group of delegated nodes following DPoS consensus algorithm. When the delegated nodes see forks in any account-chain, they will select one of them and reach consensus.


Fig.1. Snapshot Chain and Block-lattice
Transaction confirmations
Any block in block-lattice can be considered as confirmed as soon as it is snapshotted in Snapshot Chain. Once a transaction is confirmed, it will never be rolled back, even if an user issues a longer fork chain. The confirmations represent the number of blocks in the Snapshot Chain that have been accepted by the network since the block that snapshotted the transaction. To make a successful double spend attack, an attacker must build forked snapshot blocks and keep up with block creation of the main snapshot chain. So as time goes, it becomes increasingly difficult to forge a fork transaction. It is acceptable for most transactions that the confirmations over (2/3*Delegate_Nodes + 1) represent enough security to assure that the transition is valid and irreversible on DPoS algorithm.


Fig.2. Fork selecting by Snapshot Chain
Forks and consensus
Representatives and voting can be dropped from the block-lattice system if Snapshot Chain is introduced. The representative nodes can act as DPoS delegate nodes to forge snapshot blocks. Any voting result is recorded in Snapshot Chain and can be verified by other nodes. In this case, there isn’t redundant traffic between nodes and representatives.

The magic of clock
It is vital to have a clock to provide a global timestamp. Fortunately, Snapshot Chain can play the role of a global clock. We can add an additional timestamp field to a block in block-lattice and keep the hash of a snapshot block in it, and regard the height of the snapshot block as the timestamp of the transaction.


Fig.3. Snapshot Chain and transaction timestamp
As figure 3 shows, the timestamp of Tn-1 is N-2, and the timestamp of Tn is N. The time elapsed between Tn and Tn-1 is N-(N-2)=2. So we have a throughput metric for each account. For a transaction with the height of n in the account-chain, the average TPS of the recent 10 transactions is:


Where Hn is the height of the snapshot block referenced by transaction Tn, and S is the interval of two adjacent snapshot blocks, in seconds.

As a result, we have an alternative approach to throttle besides of PoW. We can make a rule to allocate TPS quota, any transaction that exceeds the TPS limit will be rejected by the system.

Ledger pruning
Due to the presence of Snapshot Chain, ledger pruning becomes much more convenient. A node can recover the world state through loading a snapshot from Snapshot Chain and replaying the transactions after the snapshot.

Will it be a burden?
It won’t be. Because any transaction can be written into the ledger no matter whether it is snapshotted. Even if a fork occurs, the user just need to wait for a valid fork to be selected by the Snapshot Chain.

Contact me
Feel free to email me at charles.chunming@gmail.com. Any further suggestions are appreciated.

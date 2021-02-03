# ViteBridge: A Generic Decentralized Cross-Chain Transfer Protocol 

## Background
Currently, there are many competitive blockchain projects dedicated to building an exclusive and closed ecosystem. When users want to store values, trade assets, or visit decentralized applications in a trustless manner, they constrain within these independent ecosystems, but instead of across their boundaries. In this circumstance, different blockchains are becoming isolated islands of information and values, and no single ecosystem meets all the demands.

This article proposes a universal decentralized cross-chain transfer protocol that bridges between different blockchains to allow free value circulation across the borders, break the barriers of various heterogeneous blockchain ecosystems, and build a more open "blockchain world" in the end.

## Design Goals
- **Generic**. The protocol is not designed for several specific blockchain projects but should apply to most existing blockchains.
- **Decentralized**. The protocol must be decentralized and cannot rely on any centralized entity. Anyone can join or leave freely according to the rules established by the protocol.
- **Secure**. The protocol must be Byzantine fault-tolerant and ensure maximum asset security in confrontation with various attacks.

## Related Works
Currently, the schemes of cross-chain transfer protocol can mainly summarize into the following categories:

### Top-Level Protocol Approaches
By providing a top-level cross-chain protocol, all transfers between blockchains that build on the protocol are supported.

[Cosmos](https://cosmos.network/) and [Polkadot](https://polkadot.network/) are based on this solution to provide cross-chain interoperability.

This solution can only provide interoperability between the blockchains within the ecosystem, but it cannot support the existing heterogeneous blockchains (such as Bitcoin and Ethereum). Moreover, the different top-level protocols are not compatible with each other.
At the current stage, it is still too far from having a universal protocol that can be accepted by the whole blockchain industry.

### Single Custodial Approaches
A trusted centralized organization manages the assets on many different blockchains through one or a set of private keys and supports cross-chain transfers between the blockchains.

[Coinbase Custody](https://custody.coinbase.com/), [Bitgo](https://www.bitgo.com/) and [Vite Gateway](https://vite.wiki/dex/api/gate.html) are based on this scheme.

This solution is effective and is suitable for most blockchains. However, it cannot meet the goals of decentralization and security.

### Federated Custodial Approaches
A group of trusted centralized entities jointly manage assets on the blockchain and realize cross-chain transfers between blockchains.

[Liquid](https://blockstream.com/liquid/) is an inter-exchange settlement network based on a federated custodial approach. Bitcoin is locked by 15 signers including exchanges and liquid providers authorized by Blockstream.

[WBTC](https://wbtc.network/) is a Bitcoin-backed ERC-20 token on Ethereum. This is still a centralized solution, but instead of relying entirely on one authority, it relies on a consortium of organizations performing different roles in the network.

Although this type of solution introduces multiple custodians to improve security, it is still centralized in nature and does not meet the goal of decentralization.

### Cryptographic Approaches
This approach leverages a smart contract on one blockchain to verify whether the transaction on the other blockchain is confirmed. The smart contract serves as a light client of the remote blockchain, and it does not verify the entire block but only the block headers or a Merkle root.  

[Waterloo](https://blog.kyber.network/waterloo-a-decentralized-practical-bridge-between-eos-and-ethereum-1c230ac65524) is a decentralized bridge between EOS and Ethereum. It implements a light client for EOS that only needs to maintain a set of block producers and an algorithm to verify Ethereum PoW hash functions based on the SmartPool algorithm.

[ETH-NEAR Rainbow Bridge](https://near.org/blog/eth-near-rainbow-bridge/) implements EthOnNearProver, a NEAR contract in Rust, and NearOnEthProver, which is written in Solidity and deployed on Ethereum. EthOnNearProver can verify Ethereum events, while the NearOnEthProver contract verifies NEAR contract execution results on Ethereum.

[tBTC](https://docs.keep.network/tbtc/) is a design for a decentralized, one-to-one redeemable token pegged to BTC. To prove a deposit, the depositor submits proof that the transaction was included in a valid Bitcoin block with sufficient subsequent accumulated work. The proof is verified by an SPV smart contract on the host blockchain such as Ethereum.

[Incognito](https://we.incognito.org/t/shielding-cryptocurrencies-turning-any-cryptocurrency-into-a-privacy-coin/83) is a platform of decentralized privacy coins. Through Incognito, a public coin can be shielded to obtain its privacy coin counterpart of the same value. Incognito validators verify the shielding transaction and the deposit proof inside it in particular by using SPV.

Such solutions meet the goals of decentralization and security. However, they are not generic enough.
Due to the serious challenge of designing a light client for PoS blockchains, it has no efficient way to validate the suffix blocks of those blockchains without the signatures of stakeholders, which depends on the recent stake distributions and cannot be verified externally.

### Game-Theoretic Approaches
This approach assumes that the user is always rational and selfish. Through a moderate economic model and rules design, the protocol can achieve game-theoretic security.

[RenVM](https://github.com/renproject/ren/wiki) uses bonding and algorithmically adjusted fees to make sure that attacks are never profitable and to make sure that it can always restore the one-to-one peg if an attack ever does succeed. 

[tBTC](https://docs.keep.network/tbtc/) requires a bond per deposit from each backing signer because signers are able to collude to censor withdrawals or abscond with funds. Bonded signers offer depositors recourse in the case of colluding signers interfering with operation.

[Incognito](https://we.incognito.org/t/shielding-cryptocurrencies-turning-any-cryptocurrency-into-a-privacy-coin/83)‘s custodian must bond some collateral (ETH or liquid ERC20) into the Bond smart contract with Collateral-to-Deposit ratio is initially set as 150%. So custodians do likely have a motivation to return original public coins to the redeemer.

Such approaches meet the goals of universality and decentralization. But they are more vulnerable than cryptographic schemes.

## Introduction
### Tradeoffs
- We are not going to propose a top-level protocol that requests every blockchain project to follow. We believe in a future where many blockchains will blossom to serve different needs. So easy transfer of data and assets between blockchains will become increasingly important. Creating a generic top-level protocol is not a prioritized task. In fact, any attempt to build such a new protocol will only introduce yet another closed ecosystem. Therefore, we choose not to ask for other blockchains to follow our specifications. But on the contrary, we have designed Vite chain to bridge every blockchain in a decentralized manner.
- Due to the significant inherent differences of blockchain projects, many blockchains do not have VMs or smart contracts. We do not intend to bridge any two blockchains directly. Instead, we will use Vite as a relay chain to forward bi-directional cross-chain transfers between two blockchains.
- It is impossible to leverage an existing blockchain, such as Ethereum, to accomplish the same goal because Ethereum lacks a few necessary functions. For example, Ethereum cannot hold a secret or sign transactions in smart contracts. Meanwhile, it does not support additional signature algorithms such as Ed25519 in the VM either. Therefore, we decide to upgrade the current Vite protocol to implement the above features.
- Vite Mainnet launched in September 2019. As a battle-hardened blockchain, some features of Vite are very suitable for cross-chain transfer. Benefited from the asynchronous smart contracts, cross-chain deposits and withdrawals can be perfectly implemented on Vite. For example, in a withdrawal case, when the confirmation number of the backed asset burning transaction reaches a given number, a smart contract function is executed by the consensus group to unlock original assets on the remote blockchain. 
- Considering universality, this protocol does not implement light clients in smart contracts on the remote blockchain. Instead, it adopts a game-theoretic scheme to verify remote chain transactions through a set of relays bonding adequate collateral. Relays that failed to perform duties will bear the loss of the collateral.
- Also based on the consideration of universality, the protocol does not require smart contracts on remote blockchains. As long as TSS or Multisig is supported, this protocol can be applied.
- Decentralization first matters. Regardless that a few tradeoffs are made in pursuit of universality, this protocol is designed not to rely on the trust of any organization or individual, and using the protocol does not require explicit permission from any party.

### Protocol Overview
The following figure outlines the architecture of the protocol:
![alt Protocol Overview](../../assets/images/bridge-overview.png)

- The protocol consists of a set of smart contracts deployed on the Vite chain and a set of relay nodes running off-chain programs.
- The Wallet contract takes the role of a decentralized wallet of the remote chain that is featured to generate public keys, construct remote chain transactions, and sign the transactions within the contract.
- The Wallet contract deploys on the Vite chain. It also designates a consensus group, whose members hold the private keys in a decentralized manner to ensure no single entity knows the complete key.
- The members of the consensus group are voted on the Vite chain. Anyone can join or leave freely without permission.
- The relay node is responsible for reporting transactions on the remote chain and minting backed assets on the Vite chain. Relays must bond collateral in advance during registration and add additional collateral for each excess deposit if required.

### Contributions
The main contributions of this article include:
- Propose a solution to realize a decentralized wallet of any blockchain through smart contracts. This solution allows the custody of assets on another blockchain in a decentralized way.
- Propose a protocol to control the issuance of backed assets through over-collateralizing original assets on the remote blockchain. The protocol achieves game-theoretic security via equilibrium, through a game with perfect information between the asset issuer and the user.

## Definitions
- **Backed Asset:**
A backed asset is a crypto asset issued on a blockchain by taking another crypto as collateral. The backed asset is redeemable for the original asset on demand.
The value of a backed asset is 1:1 pegged to the original asset.
The amount of collateral should reflect the circulating supply of the backed asset.
For example, BTC-000 is a BTC-backed asset issued on the Vite blockchain.

- **Original Asset:**
An original asset is a backing asset of the backed asset. For example, the original asset of BTC-000 is BTC.

- **Origin Blockchain:**
An original blockchain is a blockchain on which an original asset stores. For example, Bitcoin is the origin blockchain of BTC.

- **Host Blockchain:**
A host blockchain is a blockchain on which a backed asset stores. For example, Vite is the host blockchain of BTC-000.

- **Vite:**
[Vite](https://github.com/vitelabs/whitepaper/blob/master/vite_en.pdf) is a DAG-based blockchain that features zero-fee transactions and optimizes for transaction speed, reliability, and security. It installs a smart contract VM that is compatible with EVM and a built-in DEX with on-chain order books.

- **Remote Blockchain** 
A remote blockchain is a blockchain that connects to Vite through ViteBridge.

> **Note**:
>
> Vite does not always serve as the host blockchain. For example, when a BTC-backed asset is issued on Vite, Vite is the host blockchain, and the remote blockchain (Bitcoin) is the origin blockchain. On the contrary, when a VITE-backed ERC20 token is issued on Ethereum, in this case, Vite becomes the origin blockchain, and Ethereum is the host blockchain.

## Asynchronous Transfer Model
A complete transfer on Vite includes two transactions, ***T<sub>send</sub>*** and ***T<sub>receive</sub>*** . For example, if Alice wants to transfer 10 VITE to Bob, she should submit a *T<sub>send</sub>* transaction first. When the transaction is confirmed, 10 VITE will deduct from Alice's account. At this point, Bob has not received the 10 VITE, and Alice's transfer is marked as *in transit* on the chain. When Bob sees *T<sub>send</sub>* in the ledger, he should initiate a *T<sub>receive </sub>* transaction to receive it. After *T<sub>receive</sub>* is confirmed in the Vite network, the 10 VITE will finally add to Bob's account.

On Vite, Alice and Bob both have their own "blockchains" - Account Chain. There is no synced "world state" on Vite, and the account states of Alice and Bob are irrelevant.

This model is especially suitable for cross-chain transfer. Because the ledgers of different blockchains are isolated, it is impossible to change the state of two blockchains simultaneously within one transaction.

A cross-chain deposit can split into two asynchronous transactions, *T<sub>send</sub>*, which represents as *T<sub>lock</sub>* that takes place on the origin blockchain in order to lock the original asset, and *T<sub>mint</sub>*, serving the role of *T<sub>receive</sub>* that occurs on the host blockchain in the purpose of issuing backed assets.

Similarly, a cross-chain withdrawal can also be separated into two async transactions. *T<sub>send</sub>* works as *T<sub>burn</sub>* on the host blockchain to destroy the backed asset, while *T<sub>receive</sub>* becomes *T<sub>unlock</sub>* on the origin blockchain, so as to unlock the corresponding original asset.

The asynchronous transfer model must satisfy the following two conditions:
- A *T<sub>receive</sub>* is always paired with a *T<sub>send</sub>* transaction.
- A *T<sub>receive</sub>* comes eventually after a *T<sub>send</sub>* takes place.

This rule is crucial. The first condition ensures the safety of protocol. Backed assets should never be minted in the absence of real deposits, and original assets can only unlock upon actual withdrawals. The second condition guarantees liveness. After a certain period, the depositor will always get the backed asset, and the user who submitted withdrawal will finally get the original asset.

> **Note**:
>
> The asynchronous transfer model is different from atomic swap. In atomic swap, both transactions occur at the same time or neither.
>
## Problem Abstraction
In general, a cross-chain transfer protocol mainly answers the following questions:
- **Lock Transaction Verification**: How to verify that a *T<sub>lock</sub>* is confirmed on the remote chain.
- **Mint Transaction Creation**: How to generate a valid *T<sub>mint</sub>* on the host chain based on *T<sub>lock</sub>*.
- **Burn Transaction Verification**. How to verify that *T<sub>burn</sub>* is confirmed on the host chain.
- **Unlock Transaction Creation**. How to generate a valid remote chain transaction *T<sub>unlock</sub>* based on *T<sub>burn</sub>*.

The goal of this article is to establish a bi-directional cross-chain transfer protocol between Vite and the remote chain. In the first case, Vite is the host chain, and the remote chain is used as the original chain; in the second case, Vite is the original chain, and the remote chain becomes the host chain.

Let us consider the first case, using Vite as the host chain and issuing backed assets of the remote chain on Vite.

### Lock Transaction Verification
How to verify that *T<sub>lock</sub>* issued by the depositor is confirmed on the remote chain?

The perfect solution is to allow each Vite full node to keep a copy of the ledger of the remote blockchain and utilize Vite's snapshot chain to confirm the transaction. It requires to implement a full node of the remote chain on Vite.
In this way, any *T<sub>lock</sub>* can be verified in the Vite network. Unfortunately, this solution is overkill and cannot be applied in reality because it is impossible for each Vite node to also become a full node for all the remote chains.

So, is it possible to replace with light clients and only maintain the partial state, such as block headers or a Merkle root, of the remote chain on Vite?
This solution works for some remote chains, such as Bitcoin or Ethereum, by using additional cryptographic verification to improve system security. We will introduce this solution in the Augmented Transaction Verification section later.

However, for most POS blockchains, it is very hard to implement light clients. So, in this case, this approach does not apply. 

A more general solution is to introduce a set of *relay nodes* that keep a complete ledger of Vite and the remote chain at local. Relays are responsible for verifying *T<sub>lock</sub>* on the remote chain.

The integrity of relays is guaranteed by collateral bonding, and any fraud attempt will lead to collateral losses. In some cases, even the relays conspire or collude, the losses they suffer will be much larger than the money they could abuse.

How the relays verify transactions on the remote chain is a key point of this article, which will be explained in detail in the follow-up sections.

### Mint Transaction Creation
How to generate a valid Vite chain transaction *T<sub>mint</sub>* according to *T<sub>lock</sub>*?

The minting of backed assets is performed through a smart contract deployed on Vite.

The backed asset is the *redeemable token* issued on Vite. As a specific token for ViteBridge, it has no other way to mint except in the smart contract.

### Burn Transaction Verification
How to verify that *T<sub>burn</sub>* is confirmed on Vite?

It is also realized through the smart contract on Vite.

After the withdrawer sends the backed asset to the contract, these redeemable tokens will be destroyed.
The *T<sub>burn</sub>* transaction must be confirmed (after necessary snapshots) before any subsequent step can proceed.
Luckily, the presence of asynchronous smart contracts on Vite makes the above process easily accomplished. 

### Unlock Transaction Creation
How to generate a valid remote chain transaction *T<sub>unlock</sub>* according to *T<sub>burn</sub>*?

Our solution is to implement a smart contract wallet on Vite to manage remote chain's assets in a decentralized manner.
This wallet contract can construct a valid remote chain transaction and sign it in correspondence with the remote chain protocol.

It is another focus of this article and will be described in detail later.

## Workflows
The following figure describes several key workflows of the protocol by using Vite as the host chain and the original chain respectively.

- Suppose a BTC backed token BTC-000 is issued on Vite. At this time, Bitcoin is the original chain, and Vite is the host chain.
- Suppose an ERC20 contract is deployed on Ethereum and issues a BTC-000 backed token vBTC. At this time, Vite is the original chain, and Ethereum becomes the host chain.

Below we separately describe the processes of cross-chain transfer of BTC between Bitcoin and Vite, and between Vite and Ethereum.

![alt Protocol Overview](../../assets/images/bridge-workflow.png)

### Transfer from Bitcoin to Vite
1. The depositor requests a BTC deposit address from the Bitcoin Wallet contract according to his Vite address.
2. The depositor initiates a transaction on the Bitcoin chain and transfers BTC to the deposit address.
3. The relay detects that the deposit address has received BTC.
4. After the transaction is confirmed, the relay node reports a *T<sub>lock</sub>* to the Bitcoin Relay contract.
5. After the *T<sub>lock</sub>* transaction has been reported by enough relays, it is regarded as confirmed on the Bitcoin chain. At this time, the Bitcoin Wallet contract will be notified.
6. The Bitcoin Wallet contract looks up the Vite address according to the depositor's BTC deposit address, and then notifies the BTC-000 Wallet contract to mint the BTC-000 tokens.
7. The BTC-000 Wallet contract issues an equivalent amount of BTC-000 and sends them to the depositor’s Vite address.

### Vault Transfers
8. In order to facilitate subsequent unlocking of funds for withdrawal, it is necessary to collect funds scattered in different deposit addresses and aggregate them into a vault address.
9. When the TSS consensus group is ready for re-election, a new vault address will be generated. At this time, the old vault address will be discarded and all funds will be transferred to the new vault.

### Transfer from Vite to Bitcoin
10. In a withdrawal process, a user holding BTC-000 can initiate a withdrawal transaction on the Vite chain, sending BTC-000 tokens to the BTC-000 Wallet contract, and binds his BTC withdrawal address.
11. The BTC-000 Wallet contract burns the received BTC-000 tokens and waits until the *T<sub>burn</sub>* transaction obtains enough confirmations, then notifies the Bitcoin Wallet contract to unlock the equal amount of BTC.
12. The Bitcoin Wallet contract assembles a *T<sub>unlock</sub>* on the Bitcoin chain and sign it.
13. The relay obtains the signed BTC transaction and propagates it to the Bitcoin chain.
14. After *T<sub>unlock</sub>* is confirmed, the withdrawer receives the original BTC in his Bitcoin address.

### Internal Transfers
15. As a native token issued on Vite, BTC-000 can be freely transferred on the Vite chain.

### Transfer from Vite to Ethereum
16. In a cross-chain scenario, users who hold BTC-000 can transfer it to Ethereum to obtain the equivalent vBTC. At this point, the depositor can initiate a transaction on the Vite chain, sending BTC-000 to the BTC-000 Wallet contract, and binds his Ethereum address.
17. At this time, unlike the withdrawal process, the BTC-000 Wallet contract does not destroy the BTC-000 tokens, but will lock them in the contract as a reserve for vBTC. When *T<sub>lock</sub>* has obtained enough confirmations, the Ethereum Wallet contract will be notified to unlock the corresponding vBTC.
18. The Ethereum Wallet contract constructs a *T<sub>mint</sub>* on the Ethereum chain and completes signature. This transaction will be sent to the vBTC ERC20 contract on Ethereum by relays.
19. The relay obtains the signed Ethereum transaction and propagates it to the Ethereum chain.
20. After the vBTC ERC20 contract on Ethereum receives the transaction, it verifies the signature according to the public keys of the consensus group it maintains. If the verification passes, the same amount of vBTC will be released and sent to the user's Ethereum address.

### Transfer from Ethereum to Vite
21. Holders of vBTC can initiate a cross-chain redeem transaction, by calling a function in the vBTC ERC20 contract on Ethereum, to recover an equivalent amount of BTC-000. The vBTC ERC20 contract will deduct the vBTC from the user's balance and destroy them.
22. The relay detected a *T<sub>burn</sub>* transaction of the vBTC ERC20 contract on Ethereum.
23. When *T<sub>burn</sub>* is confirmed, the relay reports it to the Ethereum Relay contract.
24. After the Ethereum Relay contract has received enough confirmations from relays, the *T<sub>burn</sub>* transaction is regarded as confirmed, and the BTC-000 Wallet contract will be notified to unlock BTC-000.
25. The BTC-000 Wallet contract unlocks an equivalent amount of BTC-000 and sends them to the user's Vite address.

## Wallet Contract
In this section, we discuss how to implement a remote chain wallet through Vite smart contracts, so as to manage remote chain assets in a decentralized manner. The contract has the following functions:
- According to the beneficiary address provided by the depositor, a separate deposit address is generated. Depending on the remote chain protocol, the deposit address can be an address, or a tuple of ```(address, memo)```.
- Maintain address mapping and look up the corresponding beneficiary address of *T<sub>mint</sub>* after receiving a *T<sub>lock</sub>* notification from the Relay contract.
- Assemble a remote chain transaction in the correct format.
- Sign a remote chain transaction.

For the general purpose of the protocol, the smart contract should hold a private key, so as to generate addresses and sign transactions based on the remote chain's protocol.
In the meantime, in order to keep the protocol decentralized, no relay node knows the private key.

It is not easy for other blockchains because ordinary smart contracts cannot hold a secret. But on Vite, thanks to the presence of Consensus Group, the Wallet contract can be implemented.

### Consensus Group
On Vite, each contract has assigned a consensus group, and the nodes constituting the consensus group are selected according to protocol rules. For example, the stakeholders of VITE vote for the top *N* nodes in the group.

Only nodes in the consensus group can generate blocks for the contract. To complete this job, they execute the contract's code and return a correct result that can be verified by other nodes in the Vite network.

Why is consensus group so important? Let's look at several scenarios.
1. Multiple users call a contract simultaneously. In this scenario, the contract must prioritize the requests. For example, two users submit orders to a DEX contract at the same time, if there is no rule specifying the order of processing, it will cause front-running.
2. Generate a secure random number in a decentralized manner.
3. Sign a message in a smart contract in a decentralized way.

On a blockchain without consensus groups, such as Ethereum, the scenarios cannot be handled well.

1. In a DEX on Ethereum, after a place order request is broadcasted, a front-runner can quickly place another order at the same price with a higher gas price. Since the execution order of the transactions is determined by miners, the first order will be suppressed because miners always choose transactions with higher fees.
2. A third party can deploy a VRF-based random number generation contract on Ethereum, such as [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf). The random numbers can be verified on the chain, but the nodes participating in the generation of the random number are determined by Chainlink's off-chain rules, which will not go through the on-chain consensus of Ethereum.
3. Ethereum can only verify signatures in the contract. Signing a message in the contract is not supported.

In contrast, we can easily implement the scenarios through consensus groups on Vite.

#### Contract Request Ordering
The consensus group defines a rule to sort incoming requests, for example, by the hash of request transaction, to prevent front-running.

#### Random Functions
The consensus group uses VRF (Verifiable Random Function) to generate random numbers that will be used in the contract. It communicates with the smart contract through specific built-in functions and ViteVM instructions.
- A node in the consensus group generates a random seed at local and publishes the proof to the Vite network.
- After a certain period, the consensus group node releases the previously generated random seed to the Vite network, and other nodes can verify based on the proof they received earlier.
- A smart contract requests a random number by calling the built-in function ```random64()``` or ```nextrandom()```.
- The two functions are compiled into ViteVM code instructions ```0x4A OP_SEED``` and ```0x4B OP_RANDOM```.
- A user initiates a *T<sub>request</sub>* transaction to call the contract. The contract will not be executed until the transaction is confirmed to ensure the execution will not revert.
- When the VM executes instruction ```0x4A OP_SEED`'' or ```0x4B OP_RANDOM```, it obtains a random seed according to the height of *T<sub>request</sub>* and generates a random number based on it.

#### Sign messages in Smart Contract
By leveraging distributed off-chain computation, the consensus group signs the data within the contract according to a specific signing rule. For example, among *M* nodes in the consensus group, *N* (*N* < *M*) nodes can collaborate and generate a valid signature.

The following conditions must be satisfied to produce a decentralized signature:
- To prevent fraud, any node in the Vite network can verify the membership of the current consensus group.
- The members of the consensus group are voted every a certain time has passed. New members do not need permission from old ones to join.
- No single node in the consensus group can obtain the complete private key. Even if multiple nodes conspire, they still cannot assemble a valid signature.

### TSS Consensus Group
Below we take use of TSS (threshold signature scheme) to construct a consensus group, generate public keys, and sign transactions for smart contracts in a decentralized manner.

The workflow is as follows:
- The consensus group executes TSS Key Generation to create a public key and a set of private keys for each node in the group, then publishes the public key to the Vite network. The private keys will be used for subsequent signing usage. This process requires ad-hoc peer to peer communications between nodes in the consensus group.
- The membership of consensus group has a fixed term. When it expires, the protocol will select a new group of nodes according to the consensus rules, then calls TSS Regroup to generate a new public key and new private keys, and finally publishes the public key to the Vite network.
- It is necessary to set up a transition period for group handover. During the time, the old members of the consensus group cannot quit immediately, but they still need to process incoming signing requests.
- Every time the consensus group is changed, it sends a ```tssRegrouped``` message to notify the smart contract.
- The smart contract calls the Vite built-in function ```tss_pubkey(uint epoch)``` to obtain the public key of the consensus group. The epoch parameter stands for the previous *N* consensus group (N has a fixed upper limit).
- The smart contract signs a transaction by calling the Vite built-in function ```tss_sign(unit epoch, bytes32 data)```. The epoch parameter specifies the previous *N* consensus group that will be used to sign the transaction. The signature will not return immediately. Instead, the consensus group will send an asynchronous ```tssSigned``` message to the smart contract and return the signature.

### Deposit Address
In order to map *T<sub>lock</sub>* on the remote chain to *T<sub>mint</sub>* on Vite, it is necessary to create different mapping schemes according to the protocols of the remote chain.

First of all, the remote chain should support at least one of the following features: Smart contracts, Multi-sig, or TSS, in order to implement a decentralized wallet based on smart contracts on Vite.

For remote chains that support smart contracts, a deposit can be sent to the smart contract address including a valid beneficiary address as parameter. 

For remote chains that do not support smart contracts, there are usually two ways to generate a deposit address:
1. Remote chain supports memo or other custom fields in the transaction. In this case, a shared deposit address can be generated through the Wallet contract, and the depositor should specify the beneficiary address in the field.
2. Remote chain does not support custom fields in the transaction. In this case, a separate deposit address is generated for each user through the Wallet contract, and the address mapping between deposit address and benificiary address is stored in the Wallet contract in order to identify different users.

Below we take Bitcoin as an example to introduce how to generate a separate remote chain deposit address for each user in the Wallet contract.

Every Bitcoin transaction contains a Bitcoin Script, which can be used to carry custom data. However, adding a beneficiary address directly to the locking script of *T<sub>lock</sub>* requires that the depositor must use a specific wallet software to sign the transaction, which is not user-friendly.

In BIP16, Bitcoin introduced P2SH (Pay to Script Hash) transactions to simplify the locking script. Therefore, we choose the P2SH address as the deposit address, so that users can use any client that supports BIP16 to initiate a deposit, including from an exchange.

The deposit address generation scheme is as follows:
```
// Redeem script
<recipient_address_hash>
OP_DROP
<tss_pubkey>
OP_CHECKSIG

// Locking script
OP_HASH160
<20-byte hash of Redeem Script>
OP_EQUAL

// Unlocking script
<tss_signature>
<redeem script>
```
In the redeem script, the hash of beneficiary address will be pushed into the stack and popped up immediately. The instructions here are only used to distinguish different depositors and have no influence on the unlocking process.

```tss_pubkey``` is the TSS public key of the consensus group. It is returned by calling the Vite built-in function ```tss_pubkey_secp256k1()``` in the Wallet contract.

When the consensus group is changed, tss_pubkey may update, causing all the deposit addresses maintained in the contract to change. Therefore, it is important to show the expiration time of the current deposit address on the terminal UI.

### Refund
If the depositor transfers funds to an expired deposit address by accident, the funds may lose. To avoid this situation, we add a deposit address timeout in the redeem script as follows:
```
// Redeem script	
OP_IF
    <beneficiary_address_hash>
    OP_DROP
    <tss_pubkey>
    OP_CHECKSIG
OP_ELSE
    <deposit_timeout>
    OP_CHECKSEQUENCEVERIFY
    OP_DROP
    <jury_pubkey>
    OP_CHECKSIG
OP_ENDIF

// Locking script
OP_HASH160
<20-byte hash of Redeem Script>
OP_EQUAL

// Unlocking script - Unlock transaction
<tss_signature>
<TRUE>
<redeem script>

// Unlocking script - Refund transaction
<jury_signature>
<FALSE>
<redeem script>
```

As shown in the example, a Time Lock is added to the redeem script. If a *T<sub>lock</sub>* transaction exceeds the deposit_timeout, a refund transaction will initiate to return the assets to ViteBridge Jury.
In order to get refund, the depositor should submit a support ticket and attach deposit proof. Jury will review the proof and return funds to the depositor if the proof is sufficient.

### Funds Collection
If a multi-address deposit approach is adopted, the original assets will scatter in multiple accounts, and these funds need to be gathered regularly and aggregated into one account. This aggregate account is called Vault Account, which is generated by the Wallet contract and is used to unlock funds withdrawal.

The fund-gathering code is written in the Wallet contract, and a reasonable policy should be set up according to the throughput and cost on the remote chain. For example, in Bitcoin, it is reasonable to complete the gathering process by specifying multiple inputs in one transaction. One can also put this step in the *T<sub>lock</sub>* of withdrawal to save more transaction fees.

For each gathering process, the Wallet contract is required to generate and sign a remote chain transaction, which is shortly propagated to the remote chain by relay nodes.

The gathering of funds consumes a certain cost, which should be covered in the cross-chain transfer service fee.

### Vault Handover
Since the members of the consensus group change regularly, a new vault account must be generated from time to time. In this case, all the original assets that are locked in the previous vault should be transferred to the new vault.

By leveraging the asynchronous smart contract on Vite, we can monitor the ```tssRegrouped``` message and deal with vault handover in the message listener. The pseudo-code is as follows:

```javascript
contract Wallet {
    uint currentEpoch;
    mapping(bytes32 => RemoteBlockchainTransaction) transactionsToSign;
    address relayContract = address("vite_000...");
    message relayTransaction(uint epoch, RemoteBlockchainTransaction transaction);

     // Message listener for tssRegroup messages triggered by TSS consensus group
    onMessage tssRegroup(uint nextEpoch) {
        if (nextEpoch > currentEpoch) {
            // fetch new TSS public key of the next epoch
            bytes32 tssPubkey = tss_pubkey(nextEpoch);
            // create vault_handover transaction
            RemoteBlockchainTransaction tx = createVaultHandoverTransaction(tssPubkey);
            // put into mapping
            transactionsToSign[tx.id] = tx;
            // Sign vault_handover transaction with the private keys of the previous members.
            // The result can not be returned immediately. It's an asynchronous call.
            tss_sign(tx.id, tx, currentEpoch);
        }
    }

    // Message listener for tssSign messages triggered by TSS consensus group
    onMessage tssSigned(uint32 epoch, bytes32 id, bytes32 signature) {
        RemoteBlockchainTransaction tx = transactionsToSign[id];
        tx.rawTransaction.signature = signature;
        // notify RelayContract
        send(relayContract, relayTransaction(epoch, tx));
    }
}
```

### Funds Unlocking
In order to unlock original assets, the Wallet contract generates a remote chain transaction first, then call the Vite built-in signing function, such as ```tss_sign_secp256k1()```, to sign the transaction.

Once the function returns, the relay node will broadcast the signed transaction to the remote chain.

There is a side-effect for signing the remote chain transaction. Once the contract is performed, even if the contract chain rolls back on Vite, the unlocking process is irreversible. It is highly recommended to wait until *T<sub>burn</sub>* has enough confirmations before executing the unlocking function.

### Wallet State Updating
Sometimes, offline wallets cannot be implemented for some remote chains. So the Wallet contract must maintain a state in order to assemble remote chain transactions.

For example, Nano requires a ```previous_hash``` field for each transaction, and Ethereum needs a ```gas_price``` field.

One solution is to have relay nodes pass the states to Wallet contract. However, this requires the state must be auditable. If a relay submits fake data, it will be punished.

## Relays
This protocol leverages a group of relays to report remote chain transactions to the Vite chain. To achieve this, the relay should have access to the remote chain's ledger.

In the meantime, relays are also responsible for sending transactions signed on Vite to the remote chain.
Since relays have the opportunity to steal assets on Vite by reporting fake transactions, they must bond collateral in order to obtain the privilege to mint or unlock assets.
For each original asset, a separate group of relays is assigned, and each relay is required to bond a certain amount of the asset as collateral.
In return, relay is eligible to cross-chain transaction fee incomes.

> **Note**:
>
> Unlike other cross-chain transfer protocols, we do not use VITE, the native asset on the Vite blockchain as collateral, but directly use the original assets.
> This makes over-collateralization easier to achieve, so that the total value of backed asset on Vite is not limited by the market value of VITE coin.
> At the same time, we avoid using Price Oracle and auctions to compensate users who suffered losses, in the end reducing the complexity of the protocol.
>
> The key is that we use a decentralized wallet contract to host the original assets for deposit.

Each remote chain has assigned a group of relay nodes. A relay node is an off-chain program that can access both the Vite chain and the remote chain through full node APIs.
Each relay node has a Vite address. When the relay node calls the Relay contract, a Vite chain transaction is initiated from this address.

### Bridge Bootstrap
Before the bridge of a new backed asset starts to work, it must go through the bootstrap process. The relay jointed in the cold start phase is called *bootstrap relay*.

For this purpose, some parameters should be pre-configured in the Relay contract:
|  Configuration   | Type  | Description | Example |
|  ----  | ----  | ----  | ----  |
| origin_blockchain | ```string``` | Original chain name | Bitcoin |
| host_blockchain | ```string``` | Host chain name | Vite |
| original_asset | ```string``` | Original asset name | BTC |
| backed_asset | ```string``` | Backed asset name | BTC-000 |
| min_relay_num | ```uint``` | Minimum node number required for the bridge | 3 |
| max_relay_num | ```uint``` | Maximum node number allowed for the bridge | 10 |
| relay_quorum | ```uint``` | Minimum number of approval of a remote chain transaction | 2 |
| min_collateral_amount | ```uint``` | Minimum collateral amount | 10 |
| collateral_abort_delay | ```uint``` | Time delay (in round, appromixately 75s) to refund collateral if a relay is about to quit during bootstrap | 300 |
| collateral_unlock_delay | ```uint``` | Time delay (in round, appromixately 75s) to refund excess collateral | 300 |
| bootstrap_relay_bond_amount | ```uint``` | Additional bond (in VITE) to become a bootstrap relay | 10,000 |
| bond_unlock_delay | ```uint``` | Time delay (in round, appromixately 75s) to unlock a bond | 1152 |
| liquidate_delay | ```uint``` | Time delay (in round, appromixately 75s) before liquidating an insufficient collateral (usually caused by the failure to pay the full amount of collateral within the specified time) | 11520 |

The bootstrap process is as follows:
- The bootstrap relay obtains a collateral address from the Relay contract. When Vite is used as the host blockchain, the address is a remote chain address generated by the Wallet contract, such as a Bitcoin address; when Vite is used as the original chain, this address is the Vite address of the Relay contract.
- The bootstrap relay transfers the ```min_collateral_amount``` of assets to the collateral address. For example, transfer 10 BTC to the Bitcoin address returned by the Relay contract.
- When the collateral transaction is confirmed, the bootstrap relay calls the ```setup()``` function of the Relay contract to register its id, collateral transaction hash, etc. According to the ```bootstrap_relay_bond_amount``` specified in the bridge, the bootstrap relay may also need to bond a certain amount of VITE coins. This part of collateral is irrelevant to the deposit, but mainly to increase the cost of the relay and prevent fraud.
- Before bootstrap is complete, relays already joined can quit by calling the ```abort()``` function of the Relay contract. The collateral will not refund until the time of ```collateral_abort_delay``` expires. This is to prevent the protocol from being attacked by frequently joining and quitting of the relay.
- When the collateral is an asset on the remote chain, the Relay contract on Vite cannot verify whether the collateral is paid in full amount on its own. Therefore, each relay needs to audit the collateral payment status of other relays. Since the collateral address of each relay is public, and the transactions on the remote chain are also public (for a private remote chain, proof of collateral needs to be provided in a separate way), bootstrap Relays can audit each other.
- If a bootstrap relay is found to cheat, other relays can choose to quit by calling ```abort()```, and(or) submit a challenge request to *ViteBridge Jury*.
- When a sufficient number of bootstrap relays complete setup and pass peer audit, each relay must explicitly call the ```bootstrap()``` function of the Relay contract.
- When a ```min_relay_num``` of bootstrap relays have called  ```bootstrap()```, the Relay contract is activated. At this time, the bridge starts to work.
- Bootstrap can only be performed once in the entire life of a bridge. After bootstrap is complete, the joining and quitting of a relay will follow other rules.

> **Important**
>
> Peer audit between bootstrap relays cannot sufficiently guarantee the bridge security since all bootstrap relays may collude or be in control by attackers.
> Therefore, it is necessary for users to inspect the relay's collateral before using a new bridge. Trusting a bridge in carelessness may result in asset losses.
>
> This protocol assumes that the user is also a game player with audit responsibility.
> All data required for the audit are public. Using some audit tools can improve efficiency. 
> Besides ordinary users, *ViteBridge Jury* will also take the audit responsibility.

### Remote Transaction Report
- Relay nodes need to keep monitoring the relevant addresses on the remote chain. After finding a new *T<sub>lock</sub>* or *T<sub>burn</sub>* transaction, the relay should call the ```report()``` function to report it.
- Relay nodes need to keep monitoring any unconfirmed cross-chain transactions on the remote chain. When such a transaction is confirmed, the relay calls the ```confirm()``` function to report it.
- In the Relay contract, any *T<sub>lock</sub>* or *T<sub>burn</sub>* transaction should be confirmed by multiple relays. When the number of confirmed relays reaches ```relay_quorum```, the transaction is marked as the confirmed state.
- If the total issuance of the current backed asset does not reach the upper limit, the transaction will be approved, and the contract will generate a *T<sub>mint</sub>* or *T<sub>unlock</sub>* transaction. At this time, for relays participating in approval, a number of ```(transaction_amount / relay_quorum)``` collateral will be locked for the relay. If a relay's current unlocked collateral is less than ```(transaction_amount / relay_quorum)```, it fails to participate in the approval.
- If the total issuance of the current backed asset has reached the upper limit, the cross-chain transaction will keep at the confirmed state, and the deposit cannot be credited until another user withdraws. Because withdrawal will lead to some backed assets being destroyed and decrease the total circulation, the pending deposit can be processed.
- Any locked collateral, if there is no dispute, will be unlocked after ```bond_unlock_delay``` passes.
- In a dispute, unlocking collateral must wait for the judgment of *ViteBridge Jury*, which finally determines whether the collateral can be unlocked or not.
- The commission of relay is calculated based on the total number of participants in the approval. If a relay does not approve any transaction, it won't get the commission.

> **Important**
>
> If all the relay's collaterals of a bridge are locked up, the bridge will suspend deposits because no backed assets can be minted due to insufficient reserve.
> At this time, the bridge no longer accepts incoming deposits, and any request for a deposit address will fail.
>
> If a user initiates a deposit transaction in this circumstance, the deposit will enter a dispute state, which should be resolved by *ViteBridge Jury* later.

### Relay Registration
This protocol is open to everyone. New relays can join freely by completing the following registration process:
- To become a relay, one needs to bond a sufficient amount of collateral. Collateral is paid with backed assets. We recommend depositing through the current bridge first, then bonds the collateral with the backed assets obtained.
- The relay calls the ```register()``` function of the Relay contract to complete the registration. A ```min_collateral_amount``` of the backed asset should be sent within the transaction.
- If the number of relays in the bridge is less than ```max_relay_num```, new relay registration can be accepted. After a new relay completes the registration process, the bonded collateral will be forwarded to the Mint contract for destruction. Only collateral balance is tracked in the Relay contract.
- If the number of relays in the bridge reaches ```max_relay_num```, the registration request will fail, and bonded collateral will be returned.

### Relay Quit
When a relay is about to quit, it needs to go through the following quitting process:
- The relay calls the ```quit()``` function of the Relay contract to initiate a quit request.
- If the number of relays in the bridge is equal to ```min_relay_num```, the quit request won't be accepted. All remaining relays can not quit unless new relays join, or going through the liquidation process.
- If the number of relays in the bridge is more than ```min_relay_num```, the quit request will be accepted. A quitting relay will no longer approve transactions, and the collateral will be returned after the specified time.
- Relay's quit will reduce the issuance limit of the backed asset. If the existing issuance has exceeded the new upper limit, the bridge will no longer accept new deposits, but only accept withdrawals until the issuance drops below the limit.
- The unlocked collateral of a quitting relay will be sent to the relay's address on the original chain after calling the ```withdraw()``` function of the Relay contract.
- The collateral unlock waiting period is specified by ```collateral_unlock_delay```.
- The locked bond, if no dispute, will be unlocked after ```(bond_unlock_delay + collateral_unlock_delay)```.
- In a dispute, *ViteBridge Jury* will judge whether the bond can be unlocked.
- The collateral that was slashed for any reason will no longer be returned.

> **Important**
>
> It is necessary to pay attention to any quitting relays. If a cheating behavior is observed in the past, anyone can submit a challenge request to the Relay contract to postpone the relay from getting the collateral back in time.
>
> In this case, it takes a longer time for the relay to unlock collateral. Users and other relays will have enough time to withdraw ahead of the cheating relay.

### Bridge Liquidation
If the number of relay nodes in a bridge reduces to the lower limit, any relay's quit will cause the bridge to stop working. At this time, if a relay still wants to quit, it must go through the liquidation process:
- When the remaining relays in the bridge reach ```min_relay_num```, any relay that wants to quit can initiate a liquidation request by calling the ```liquidate()``` function of the Relay contract.
- The bridge in liquidation process will no longer accept relay registrations and deposit requests. It only responds to withdrawal requests.
- Starting from the liquidation request is initiated, the bridge will open a ```liquidate_delay``` time window for all current users to withdraw.
- After the withdrawal window is over, the collateral unlocking countdown starts for all relays. The rest process is similar to relay quit.
- After the liquidation is complete, the bridge enters the dismissed state.

### Bridge Bankruptcy
A bridge may stop working under the following situations:
- Original assets locked in the Wallet contract are lost.
- A confirmed original asset deposit is rolled back.
- Fail to properly handle the hard fork of the original chain.
- Relay fraud is not found in time. 

Once such situations occur, there is no guarantee that the backed asset can be fully redeemed. At this time, the bridge must go through the bankruptcy process:
- The bankruptcy request can be initiated by *ViteBridge Jury*, or by a relay and reviewed by *ViteBridge Jury*.
- After the bridge enters the bankrupt state, it should immediately stop deposit and withdrawal, and no longer accept relay registration or quit requests.
- A bankrupt bridge needs to perform Bankruptcy Liquidation, which is similar to ordinary liquidation, but the main difference is that the bridge may already be insolvent at this time.
- In the bankruptcy liquidation process, ordinary users who hold backed assets have a higher withdrawal priority than relays. *ViteBridge Jury* needs to audit the process and specify two parameters ```user_redeem_rate``` and ```relay_redeem_rate```, indicating the numbers of original assets that can be redeemed for 1 unit of backed asset for ordinary users and relays.
- Bankruptcy liquidation has two stages. In the first stage, users can request to withdraw assets at the rate of ```1: user_redeem_rate```.
- In the second stage, each relay's available collateral is calculated, and the relay is allowed to withdraw collateral assets at the rate of ```1: relay_redeem_rate```.
- After the bankruptcy liquidation is complete, the bridge enters the bankrupted state.

## Auxiliaries
The design philosophy of this protocol is to assume that a bad relay cannot be identified in advance, and all other participants should realize and stop loss in time after the cheating behavior occurs.
Once a relay commits fraud, the protocol will provide an evacuation window for all depositors, ordinary users holding the backed asset, and other honest relays to quit first, and leave the bad relay to suffer asset loss.

Basically, it requires all the participants of the protocol, including ordinary users, to be cautious and keep monitoring the behavior of the relays. However, this requirement will lead to a poor experience for users.

Therefore, in order to provide a better user experience, we introduce some auxiliary mechanisms in the protocol to supervise relays on behalf of users.

### ViteBridge Jury
We introduce a DAO to replace users to audit the financial situation of the bridge, supervise relays, and solve disputes. Such DAO is called *ViteBridge Jury*.
The DAO contains 11 members, who are selected through voting by VITE stakeholders.
*ViteBridge Jury* is controlled by the Jury contract deployed on Vite. The Jury members will call the Jury contract to perform their duties, and the judgment result will automatically take effect.

A Jury member's main responsibility includes:
- Audit the collateral rate of a new bridge on behalf of users. At least 8 members must approve the audit.
- Solve dispute transactions. In this case, a quorum of 5 members needs to reach an agreement to approve or reject it.
- Initiate a bridge bankruptcy request. This requires the consent of 8 members or above.
- Supervise the relay's behavior and detect fraud. In this case, a suspension transaction is immediately launched to stop the bridge with the participation of 5 agreed members.

### Watchdogs
In order to reduce the time of fraud detection, we introduce the role of Watchdog in the protocol. Watchdog is a special party that monitors relay's behavior and bridge's financial status on the chain. A report will be submitted to *ViteBridge Jury* if Watchdog finds a problem.

Anyone can become Watchdog and call the ```inform()``` function of the Jury contract to report fraud, such as a fake remote chain transaction or an original collateral asset problem.

Each report must bond a small amount of VITE coin. If the report is found fake by *ViteBridge Jury*, the bond will be slashed.

If the report is confirmed valid by *ViteBridge Jury*, the first reporting Watchdog will be awarded a bonus. The bonus comes from the slashed collateral from a guilty party, such as a cheating relay.

## Augmented Transaction Verification
In pursuit of universality, the protocol does not set up a cryptographic verification mechanism to check remote chain transactions on Vite. Instead, it relies on relays to transmit information, and the relay's integrity is guaranteed by game theory.

However, for some specific blockchains, we still add an additional cryptographic verification step in the bridge to provide higher security.

To achieve this, we implement a hook function ```function verifyTransaction(RemoteTransaction tx) returns(bool)``` in the Relay contract. It returns a boolean value to represent the verification result.

This function is executed after a remote chain transaction is approved. If the result is false, the transaction enters the failed state and will not trigger the subsequent minting logic or unlocking assets.

By default, this function returns ```true```. If the remote chain is suitable for a light client, this function should be re-implemented to enable cryptographic verification.

## Vite as Original Blockchain
For ease of understanding, in the previous sections, we have introduced Vite as the host chain.
In fact, this protocol also supports to use of Vite as the original chain. In this case, the remote chains must support asset issuance, such as Ethereum, which is used as the host chain.
### Lock Transaction Verification
How to verify that the *T<sub>lock</sub>* initiated by the depositor is confirmed on the Vite chain?

Since the original asset is mapped to a token on Vite, a Vite smart contract can lock the asset and trigger the subsequent logic after enough confirmations.

### Mint Transaction Creation
How to generate a valid remote chain transaction *T<sub>mint</sub>* according to *T<sub>lock</sub>*?

The Wallet contract on Vite will assemble and sign a remote chain transaction first, and then broadcast the signed transaction to the remote chain through relays. The smart contract that controls the backed asset on the remote chain needs to maintain the public key of the TSS consensus group and verify the signature. After the verification is passed, the contract will issue backed assets on the remote chain.

### Burn Transaction Verification
How to verify that *T<sub>burn</sub>* is confirmed on the remote chain?

The backed asset is destroyed in the smart contract on the remote chain. After *T<sub>burn</sub>* is confirmed, the relay is responsible for reporting to Vite. Similarly, bonding collateral is required for relay to prevent cheating.
At this time, the relay's collateral is an asset on the Vite chain, such as BTC-000, which is locked in the Vite smart contract.

### Unlock Transaction Creation
How to generate a valid *T<sub>unlock</sub>* on Vite according to *T<sub>burn</sub>*?

As a built-in function, a Vite transaction *T<sub>unlock</sub>* is triggered in the smart contract to unlock original assets.

## Transfer Redirect
In the above sections, we discussed how to transfer funds between a remote chain and Vite. Sometimes, users need to transfer assets from one remote chain to another, such as from Bitcoin to Ethereum.
To meet this demand, Vite can be used as a *relay blockchain* for cross-chain transfers between two remote chains, and the user does not need to have a Vite account, the cross-chain transfer between the two remote chains can go through without Vite accounts.

This transfer is called *Tranfer Redirect*, a new transfer type in the protocol.

Let's look at a process shown in the following figure, where a user wants to transfer BTC to Ethereum.

![alt Tranfer Redirect](../../assets/images/bridge-redirect.png)

1. Alice inputs an Ethereum address and requests a BTC deposit address from the Bitcoin Wallet contract. Since Alice doesn't have a Vite address, the contract will construct a unique BTC address based on Alice's Ethereum address and return it.
2. Alice transfers 1 BTC to the deposit address.
3. The relay monitors the BTC deposit address. In this case, it finds a Transfer Redirect transaction.
4. When the transaction is confirmed, the relay reports to the Relay contract.
5. After the Relay contract receives enough reports from relay nodes, it locks the collateral of the reporting relays and informs the Bitcoin Wallet contract.
6. The Bitcoin Wallet contract finds the beneficiary address on Ethereum according to the deposit address and informs BTC-000 Wallet contract on Vite.
7. The BTC-000 Wallet contract mints BTC-000 and locks it in the contract as a reserve for the subsequent issuance of vBTC on Ethereum.
8. When it is confirmed, the BTC-000 Wallet contract notifies the Ethereum Wallet to sign a vBTC mint transaction.
9. The relay forwards the signed vBTC mint transaction to Ethereum.
10. The vBTC ERC20 contract on Ethereum verifies the signature of the TSS consensus group. After the verification is passed, an equivalent amount of vBTC will be minted and sent to Alice's Ethereum address.

## Economy
A well-designed economic model can help improve the efficiency of the protocol and provide a good experience to user.
Below we briefly describe the concepts of the economic model but leave the design details for future introduction.
- The income of ViteBridge mainly comes from deposit and withdrawal fees. Generally speaking, users should pay for the use of cross-chain transfers. However, if the fees are too high, it will harm the enthusiasm of the users, and finally, decrease the total income of the bridge.
- The more cross-chain transfers, the more successful ecosystem on Vite. In addition to direct fee income, all DApps that benefit from cross-chain, such as ViteX, are encouraged to contribute their own platform tokens (if issued) to ViteBridge.
- The fee of Transfer Redirect should be higher than ordinary cross-chain transfer.
- The income of ViteBridge is mainly used to incentivize relays, which, as required by the protocol, must bond collateral, run nodes, and usually take more risks than others.
- ViteBridge Jury also needs to be incentivized. Otherwise, it may not be faithful in performing the duties and causes a risk.
- Watchdogs need to be incentivized too in order to discover cheating behaviors. Honest Watchdogs will receive additional rewards, while a malicious one will be punished by collateral slash.

## Governance
Compared with mature blockchain projects such as Bitcoin or Ethereum, the ledger structure and protocol of a new-emerged blockchain usually change more frequently.

As universality is first honored in our protocol, we need to introduce a decentralized governance plan to deal with possible changes on these blockchains.

The following issues need to be addressed:
- How to update the consensus rules and quorum threshold of the TSS consensus group.
- How to change the bridge settings, such as ```relay_quorum```, ```min_collateral_amount```, etc.
- How to upgrade the Wallet contract when the remote chain's protocol updates.
- How to update the election and consensus rules of ViteBridge Jury.

We are not going to answer the above questions here, but will introduce them as an in-depth topic in a future article.

## Safety and Liveness
### Safety Threats
The protocol may face the following security risks.
- **TSS Consensus Group Conspiracy**. It is the biggest security threat. Assuming that the TSS consensus group is formed by Vite SBPs (Snapshot Block Producer), an attacker needs to control enough SBPs above the TSS threshold to exploit the attack. Since becoming an SBP needs collateral of 1,000,000 VITE and adequate votes, it produces a high cost to manipulate the TSS consensus group. The asset value maintained in the Wallet contract may not cover, especially in the early stage of the bridge. So it is not profitable for attackers. Moreover, as the market value of VITE increases, the cost will keep rising. On the other hand, we can also increase the collateral requirement of the TSS consensus group in the future, making it even higher than becoming an SBP. At this time, any attempt to manipulate the TSS consensus group will be very expensive.

- **Relay Fraud**. A relay may benefit from a fake report. For example, it may mint backed assets arbitrarily and send them to itself. This behavior is not banned, but because the blockchain's ledger is public, and all relay's behaviors are tracked in the smart contract, this fraud will be discovered soon. Before the relay has a chance to unlock its collateral, a challenger can freeze the funds in the smart contract by submitting a fraud report. In this case, other users have enough time to withdraw assets ahead of the cheater. This kind of attack can only be exploited by assuming that the cheating behavior is not discovered when the collateral is being unlocked. We recommend setting ```collateral_unlock_delay``` and ```bond_unlock_delay``` of the bridge long enough to prevent the fraud. In addition, the presence of Watchdogs and Jury will also help to mitigate this risk.

- **Relay Sybil Attack**. An attacker can attempt to control a bridge by registering multiple relays. To prevent Sybil attacks, the protocol requires that each relay must bond a deposit of at least ```min_collateral_amount```. In this case, if a bridge is manipulated, the attacker will lose his collateral in exchange for backed assets, which have zero value if cannot be redeemed, and the original assets controlled by the Wallet contract won't be affected.

- **Relay Eclipse Attack**. An attacker can block a relay's access to the original blockchain and use fake data to deceive the relay. In this case, the relay is responsible for all the losses. Therefore, to prevent an eclipse attack, the relay should run a full node by itself, or access several geographically distributed full nodes for one request.

- **Phishing Attack by Relay**. During the bootstrap phase of a bridge, a bootstrap relay may deceive users by providing fake proof of its collateral. In this case, the relay is able to misappropriate the deposit funds since it did not bond collateral at all. To avoid it, a new bridge must be audited by Jury before it starts service, and users also need to pay attention to unfamiliar bridges. In addition, a well-designed terminal product also helps reduce the risk of phishing.

- **Jury Conspiracy**. If Jury is manipulated or colludes, the dispute transaction will be judged in opposite result, and the user or relay will suffer the loss. In fact, the security of the protocol is guaranteed by the game theory between the user and the relay. Jury only plays an assistant role. Users should not give up their inspection right and simply choose to trust the Jury. If Jury fails to work, in order to avoid further loss, users should stop deposit and start withdrawal immediately, and relays should also stop confirming new transactions and start unlocking collaterals. Jury's fraud can be discovered by all the users, and a cheating Jury will be voted out.

- **Watchdog Malicious Report**. Watchdog may send junk reports to interfere with Jury's work. It is similar to a DDoS attack. Since Watchdog needs to stake VITE coins for each report, a junk report will finally cause a slash.

### Liveness Threats
The protocol's liveness could be impacted by the following risks.
- **TSS Consensus Group Neglect**. If several nodes in the TSS consensus group do not respond to a signing request, the request will fail due to unsatisfied threshold for signature. At this time, the user's withdrawal may not credit for a long time. More seriously, after the consensus group changes, the original assets locked in the previous contract may not be handed over to the new group timely, even could never unlock. In this case, the non-responding nodes must be punished by a collateral slash. A low-uptime node should also be voted out to increase liveness.

- **Relay Neglect**. If enough relays are not fulfilling the responsibility, a transaction on the remote chain may never be reported on time. In this case, the user's deposit may not arrive. To avoid this situation, we need to make sure the non-reacting relay won't get fees income, in addition, if the user finds that the deposit does not arrive, he can submit a dispute to Jury, and the relay will be punished for neglect of duty.

- **Jury Neglect**. If Jury neglects to perform its duty, a dispute may not be solved for a long time. As a consequence, either the user or the relay will suffer the losses. New Jury members should be selected at this time. A neglect Jury's collateral will be slashed as a penalty.

## Use Cases
### Instant Cross-Chain Transfer
Users can use ViteBridge's Transfer Redirect function to complete cross-chain transfers from one remote chain to another.

For example, If Alice has 1 BTC and wants to transfer the money from Bitcoin to Ethereum, she can take the following steps:
- Alice opens the website of ViteBridge, navigates to the Instant Transfer page, respectively selects Bitcoin, BTC, Ethereum in the from-list, asset list, and to-list.
- Alice fills in her Ethereum address. At this time, ViteBridge displays a Bitcoin deposit address for her.
- Alice transfers 1 BTC to the deposit address.
- Alice receives a 0.995 vBTC ERC20 token on Ethereum (assuming a 0.5% commission is charged).

### Cross-Chain DEX
- Alice opens the ViteX website or mobile app, navigates to the Deposit page, then selects BTC. At this time, a Bitcoin deposit address is displayed.
- Alice transfers 1 BTC to the deposit address.
- After the transfer is confirmed, Alice gets 1 BTC-000 in her ViteX account.
- Alice places an order to trade 1 BTC-000 into 30 ETH-000. After the order is filled, 30 ETH-000 will be credited into Alice's ViteX account.
- Alice opens the ViteX Withdraw page, selects ETH, fills in her Ethereum address, and submits a withdrawal request of 30 ETH.
- 30 ETH-000 is deducted from Alice's ViteX account.
- After the withdrawal transaction is confirmed, Alice receives 29.99 ETH in her Ethereum address (assuming that a commission of 0.01 ETH is charged).

### Stable Coin Cross-Chain Exchange
A stable coin can be issued on multiple different blockchains. For example, USDT was issued on Omni, Ethereum, EOS, Tron, Algorand, Liquid Network, Bitcoin Cash, and Solana. ViteBridge can provide users with cross-chain exchange of stable coins in a trustless way.
- Alice opens the website of ViteBridge, navigates to the Stable Coin Exchange page, chooses stable coin assets, selects Tron as the transfer-out blockchain, and Ethereum as the transfer-in blockchain.
- Alice fills in her Ethereum address. At this time, ViteBridge displays a Tron address for her.
- Alice transfers 1000 USDT-TRC20 to the Tron address.
- After the transaction is confirmed, ViteBridge will mint 1,000 USDT-TRC20-000 and transfer it to the InstantExchange contract.
- The InstantExchange contract calls the ViteX contract to submit an order of which the time-in-force type is FOK (Fill or Kill). The order trades 1000 USDT-TRC20-000 for USDT-ERC20-000.
- If the order is not fully filled, the InstantExchange contract will withdraw 1000 USDT-TRC20-000 back to the deposit address, and Alice will receive a refund of 1000 USDT-TRC20 in her Tron address.
- If the order is fully filled, Alice receives 995 USDT-ERC20 on Ethereum (assuming a 0.5% commission is charged).

### Payment
- Alice transfers 100 USDT to Vite and receives 100 USDT-000.
- Alice pays 10 USDT-000 to merchant Bob on the Vite blockchain to buy a pizza. The transaction is confirmed within a few seconds with no transaction fee.
- Alice pays 1 USDT-000 to merchant Charlie on the Vite blockchain to buy a juice. It has no transaction fee too.
- Bob accepts 200 transfers on this day, a total of 2,000 USDT-000. He transfers the money to his Ethereum address at one time. In this case, he only needs to pay one cross-chain commission.
- Charlie pays the received USDT-000 to the juice supplier at night.

In the above payment scenario, through transferring Ethereum-based USDT to the Vite chain, Alice, Bob, and Charlie have saved transaction fees while benefiting from the featured instant payment on Vite.

### Cryptocurrency Custody
Alice plans to open a centralized exchange, AliceX, to provide trading services for assets on many blockchains. After consulting with a local company, she finds that the service fee of third-party custodian is high, and only a small number of blockchains with high market value are supported.
If Alice chooses to develop the custodial service by herself, the cost of development and service operation is still expensive, not to mention the challenge of security risks.

After thoughtful consideration, Alice decides to use ViteBridge to implement custody.
- Alice deploys a smart contract AlicexCustodian on Vite and designates a Vite address as the owner.
- Alice uses her private key to generate a separate Vite address for each user, and stores the mapping relationship between Account ID and Vite address in the database.
- User Bob requests his deposit address on the AliceX website. At this point, AliceX requests a DirectTransfer deposit address at ViteBridge. The deposit beneficiary is the AlicexCustodian contract, and the data field fills in Bob’s Account ID.
- Bob transfers 1 BTC to the deposit address.
- AliceX detects that the AlicexCustodian contract has received a transfer of 1 BTC-000, and then adds 1 BTC to Bob’s Account in the exchange according to the Account ID in the data field.
- Another user, Charlie, is preparing to withdraw 1,000 USDT at AliceX. He fills in his Ethereum address.
- AliceX deducts 1,000 USDT from Charlie's account, signs a Vite transaction with the owner's private key, and sends it to the AlicexCustodian contract with Charlie's Ethereum address.
- The AlicexCustodian contract sends an Ethereum withdrawal transaction through ViteBridge.
- Charlie received 9,995 USDT in his Ethereum address (assuming 5 USDT commission is charged)

In this scenario, Alice only needs to maintain a custodial service on Vite, and rely on ViteBridge to complete the communication to other blockchains.
More importantly, this custodial service is decentralized, and Alice does not have to trust any "middle man" who could take advantage of the opportunity to misappropriate assets. Alice can also implement hot/cold asset management through optimized authorization function in AlicexCustodian.
In addition, through the AlicexCustodian contract on the Vite chain, Alice can easily complete PoR (Proof of Reserve), so as to grant the users with more confidence.

### Exchange Listing
In this scenario, Alice runs a blockchain called Alichain, and she hopes to list Alichain's assets on an exchange.
However, centralized exchanges often prefer listing ERC20 tokens since listing a native coin of Alichain will consume more costs, while a DEX can only list assets issued on the same blockchain and cannot support Alichain.
Alice finally solves the problem by using ViteBridge.
- Alice works with the Alichain's community to complete the integration with ViteBridge.
- Alice contacts Bittrex, Kucoin, Hotbit, Bilaxy, and lists Alichain's Ethereum backed token vAlichain-ERC20.
- Alice lists vAlichain/ETH on Uniswap.
- Alice lists vAlichain-BEP2/BNB on Binance DEX.
- Alice lists vAlichain-Polkadot/DOT on Polkaswap.

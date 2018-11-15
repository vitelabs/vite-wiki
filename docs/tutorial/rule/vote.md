# Voting

::: tip
Please note this is not a technical document, but mainly describes voting-related topics. Technical details will be introduced in the yellow paper.

The Definitions of Terms:
* **Voting**：A solution of on-chain governance, which calculates the VITE held by the voter and uses this as the voting weight to elect the super node.
* **SBP(Snapshot Block Producer)**： The super node who is responsible for producing snapshot block.
:::

## What is voting

Vite uses a protocol-based voting mechanism for governance. There are two voting categories: global voting and delegated voting. Global voting is based on the VITE held by the user to calculate voting weight, mainly used for the super node election of the snapshot consensus group. The delegated voting is for smart contract. When the contract is deployed, a certain token is designated as the voting token, which can be used to elect the delegated node of the delegated consensus group that the contract belongs to.

In addition to the confirmation of transaction, the super node of the snapshot consensus group is able to choose whether to perform non-compatible upgrade on Vite system. Similarly, the delegated consensus group has the right to decide whether to upgrade an existing contract, so that avoiding the risk of contract upgrade failure. This helps improve the efficiency of decision-making and prevent decision failure from insufficient voting. These super nodes or delegated nodes are also subject to the consensus protocol. No upgrade will be implemented if the majority cannot reach agreement. Additionally, if they do not behave correctly as expected, users can vote them out.





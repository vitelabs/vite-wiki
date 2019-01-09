# Full Node Rewards

In Vite TestNet, the rewards mined by the 5 official SBPs will be fully distributed to the community with 30% of those rewards going to full node operators. This article serves to explain what the program is about, its features, and how to participate.

## Full Nodes

There are 2 types of nodes in the Vite network: full nodes and supernodes. As one of the major components in the peer-to-peer network, each full node serves to maintain an entire copy of the ledger and is responsible for reaching consensus amongst the whole system.

In terms of node function, full nodes have the complete set of features seen with gvite software. Users are able to visit remote data, engage in send/receive transactions, and register to vote for supernodes via HTTP, WEBSOCKET, IPC APIs, and the command line console. 

Supernodes differ from their full node counterparts in their ability to access the snapshot block creation privilege.

## Instructions for Running a Full Node

Upgrade to Gvite version: 1.1.1 or above is required

See: [Installation](../node/install.md#full-node-reward) for configuration details.

## Reward Program Details

* In the TestNet, full node rewards are derived from taking 30% of mining earnings secured from the official 5 SBPs per day.
* All full nodes with 90%+ uptimes are eligible for the reward in equal share.
* At the present moment, the official reward pool has accumulated over 98,000 VITE. VITE will be distributed to full node operators in the form of an “Early Bird Bonus”. This is done by increasing 40% of daily earnings for the consecutive 40 days following the Full Node Incentive Program kickoff.
* The program will start its first 24 hr cycle at 12:13:14 GMT+8 on December 13th, and the rewards will be distributed on a daily basis. Please note the specific arrival time for rewards is dependent on real-time system calculations, therefore there is possibility for delay. Additional reward details can be found within this link: https://reward.vite.net/.
* Supernodes are eligible for participation in the program.

::: warning Note
1. IP Restrictions: if more than one full node is running from the same IP address, the reward will only be distributed to the node with the highest uptime rate(>90%). If all uptimes happen to be the same, the reward will be distributed via random selection.
2. As specialized full nodes, supernodes that meet the requirements listed above will be subject to the same rules and opportunities to reap full node rewards.
:::

# Quota

::: tip
Please note this is not a technical document, but mainly describes quota and quota-related topics. Technical details will be introduced in the yellow paper.

The Definitions of Terms:
* **Quota**： In Vite, CPU cycles, storage space and network bandwidth consumed during transactions are paid by quota, instead of transaction fees
* **PoW**： Proof of Work, representing a certain amount of computational work has been performed
* **Stake**： Lock up an amount of VITE in the account for quota
* **Staking address**：The account who starts the staking transaction
* **Quota recipient address**：The account who receives quota
:::

## What is Quota

In Ethereum, in order to have a transaction executed timely, the sender usually has to offer an appealing transaction fee to miner. The higher gas price offered, the sooner transaction executed. 
In this typical bidding model, the supply of system processing capability and the demand of sending transactions are balanced by gas price automatically. This model works fine in Ethereum, however, from user's perspective it is hard to determine what is the best gas price to offer for a certain time. Either too low or too high price will cause a market failure. 
Moreover, since gas is associated with individual transactions, it is impossible to measure and allocate computational resources at account level.
In Vite, instead of charging transaction fees, a certain amount of quota is consumed when user sends a transaction, such as transfer, deploying new smart contract, calling smart contract, issuing new token, registering SBP, retrieving mining rewards, voting and staking. Vite has implemented a quota model to meet the supply and demand of resources.

Quota can be obtained in two ways:
* Obtain one-time, small-amount quota by computing `PoW` when sending transactions, or
* Stake VITE for account.

If you just simply need to send a transaction, you can choose `PoW`.
If you need send many transactions during a short period, you should stake VITE to get enough quota.

We recommend staking.

## Quota Consumption Rules

Various quota consumptions of different transactions:

|  Transaction Type  | Quota Consumed | In Unit Transaction |
|:------------:|:-----------:|:-----------:|
| Send a transfer without comment | 21000 | 1 |
| Receive a transfer | 21000 | 1 |
| Register SBP | 62200 | 2.9619 |
| Update SBP registration | 62200 | 2.9619 |
| Cancel SBP registration | 83200 | 3.9619 |
| Retrieve mining rewards | 68200 | 3.2476 |
| Vote | 62000 | 2.9524 |
| Cancel voting | 62000 | 2.9524 |
| Stake for quota | 82000 | 3.9048 |
| Cancel staking for quota | 73000 | 3.4762 |
| Stake for quota via delegation | 82000 | 3.9048 |
| Cancel staking for quota via delegation | 73000 | 3.4762 |
| Issue new token | 104525 | 4.9774 |
| Mint additional token | 69325 | 3.3012 |
| Burn token | 48837 | 2.3256 |
| Transfer token ownership | 58981 | 2.8086 |
| Change token type | 63125 | 3.0060 |

* **Unit Transaction**: The minimal transaction unit measured in quota consumption, equivalent to an un-commented transfer transaction

Each character in transaction's comment consumes additional 68 quota.

For example, given hex encoding is used, sending a transfer with a comment of '0x0001' (two characters) will consume

$${\it Q} = 21000 + 68 * 2 = 21136$$ quota, which translates to `1.0065` unit transaction.

::: tip Note
Due to implementation of [VEP-8](../../vep/vep-8.md), additional 136 quota (2 characters prefix) will be cost if you send a transfer with comment from Vite official wallet. 
No additional quota will be cost if no comment is attached.
:::

If `ConfirmTimes` is assigned when creating new smart contract, for each response transaction of the contract, an additional quota about `ConfirmTimes * 200` will be charged.
`ConfirmTimes` defines a waiting number that specifies in how many confirmations the contract will produce a response after the request transaction is snapshotted.

## Quota Calculation

Quotas are calculated in the following formulas:

$$Q_{PoW}=Qm \times (1- \frac{2}{1+e^{\xi d \times \rho d}})$$
$$Q_{Stake}=Qm \times (1- \frac{2}{1+e^{\xi s \times \rho s}})$$

Here,
* $Q_{PoW}$: Quota obtained through `PoW` calculation. This quota is valid once and can only be used in current transaction
* $Q_{Stake}$: Quota obtained by staking. This quota is long-time valid and can be accumulated for up to 75 snapshot blocks
* $Qm$: Quota cap of one account, related to overall system throughput and total account number
* $\xi d$: The difficulty of `PoW` calculated
* $\rho d$: The weight obtained through `PoW` calculation
* $\xi s$: The staking amount
* $\rho s$: The weight obtained by staking
* $T$: The idle time prior to sending a transaction, equivalent to height difference between the snapshot block that current transaction refers to and an earlier snapshot block that previous transaction refers to


In Vite TestNet,
* $Qm$ = 1000000
* $\rho d$ = 6.259408129e-10
* $\rho s$ = 4.201037667e-24


**UTPS**: Unit transaction per second, referring to how many un-commented transfer transactions can be sent by one account in one second

$$UTPS=\frac{Q_{Stake}}{21000}$$

The available quota of an account depends on UTPS and quota consumption during last 74 snapshot blocks. For example, account A has 1 UTPS quota through staking and hasn't send any transaction during last 74 snapshot blocks, then the available quota of account A is 75 UTPS.

The actual available quota of an account upon sending transaction depends on UTPS, quota consumption during last 74 snapshot blocks and `PoW` calculation performed. For example, account B has 1 UTPS quota through staking, hasn't send any transaction during last 74 snapshot blocks, and calculated a `PoW` having difficulty equivalent to 2 UTPS, then the available quota of account B is 77 UTPS.

For convenience in calculation, it is acceptable to calculate $(\xi d \times \rho d)$ or $(\xi s \times T \times \rho s)$ only, and then map result to corresponding quota according to following table:

|  $(\xi d \times \rho d)$ or $(\xi s \times \rho s)$ | $Q$ | UTPS | Approximately equivalent to how much VITE staked without calculating `PoW` | Approximately equivalent to how difficult the `PoW` calculated without staking |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0.0 | 0 | 0 | 0 | 0 |
| $(0, 0.042006175634155006]$ | 21000 | 1 | 10000 | 67108863 |
| $(0.042006175634155006, 0.08404944434245186]$ | 42000 | 2 | 20007 | 134276984 |
| $(0.08404944434245186, 0.1261670961035256]$ | 63000 | 3 | 30033 | 201563940 |
| $(0.1261670961035256, 0.16839681732546105]$ | 84000 | 4 | 40085 | 3733274509 |
| $(0.16839681732546105, 0.2107768956769977]$ | 105000 | 5 | 50173 | 290666828 |
| $(0.2107768956769977, 0.25334643304410037]$ | 126000 | 6 | 60306 | 310523977 |
| $(0.25334643304410037, 0.2961455696376917]$ | 147000 | 7 | 70494 | 360275060 |
| $(0.2961455696376917, 0.3392157225669637]$ | 168000 | 8 | 80746 | 428403748 |
| $(0.3392157225669637, 0.382599842575369]$ | 189000 | 9 | 91073 | 496921930 |
| $(0.382599842575369, 0.4263426931297194]$ | 210000 | 10 | 101486 | 565896574 |
| $(0.4263426931297194, 0.4704911566788094]$ | 231000 | 11 | 111995 | 635397250 |
| $(0.4704911566788094, 0.5150945736855665]$ | 252000 | 12 | 122612 | 705496588 |
| $(0.5150945736855665, 0.5602051210238872]$ | 273000 | 13 | 133350 | 776270783 |
| $(0.5602051210238872, 0.605878237567604]$ | 294000 | 14 | 144222 | 847800161 |
| $(0.605878237567604, 0.6521731063496397]$ | 315000 | 15 | 155241 | 920169805 |
| $(0.6521731063496397, 0.6991532046201573]$ | 336000 | 16 | 166424 | 993470265 |
| $(0.6991532046201573, 0.7468869355972497]$ | 357000 | 17 | 177787 | 1067798363 |
| $(0.7468869355972497, 0.7954483588344243]$ | 378000 | 18 | 189346 | 1143258118 |
| $(0.7954483588344243, 0.8449180401302736]$ | 399000 | 19 | 201122 | 1219961801 |
| $(0.8449180401302736, 0.8953840470548413]$ | 420000 | 20 | 213135 | 1298031169 |
| $(0.8953840470548413, 0.9469431228444231]$ | 441000 | 21 | 225407 | 1377598894 |
| $(0.9469431228444231, 0.9997020801479394]$ | 462000 | 22 | 237966 | 1458810249 |
| $(0.9997020801479394, 1.053779467629503]$ | 483000 | 23 | 250838 | 1541825095 |
| $(1.053779467629503, 1.1093075777848576]$ | 504000 | 24 | 264056 | 1626820249 |
| $(1.1093075777848576, 1.1664348850068706]$ | 525000 | 25 | 277654 | 1713992319 |
| $(1.1664348850068706, 1.2253290311060194]$ | 546000 | 26 | 291673 | 1803561138 |
| $(1.2253290311060194, 1.286180514353531]$ | 567000 | 27 | 306158 | 1895773931 |
| $(1.286180514353531, 1.3492072924575544]$ | 588000 | 28 | 321161 | 1990910446 |
| $(1.3492072924575544, 1.4146605870070175]$ | 609000 | 29 | 336741 | 2089289313 |
| $(1.4146605870070175, 1.4828322881625378]$ | 630000 | 30 | 352969 | 2191275997 |
| $(1.4828322881625378, 1.554064521717701]$ | 651000 | 31 | 369924 | 2297292878 |
| $(1.554064521717701, 1.6287621852605034]$ | 672000 | 32 | 387705 | 2407832162 |
| $(1.6287621852605034, 1.707409634545938]$ | 693000 | 33 | 406426 | 2523472634 |
| $(1.707409634545938, 1.7905932883378723]$ | 714000 | 34 | 426227 | 2644901733 |
| $(1.7905932883378723, 1.8790328663947373]$ | 735000 | 35 | 447279 | 2772945111 |
| $(1.8790328663947373, 1.97362554890186]$ | 756000 | 36 | 469795 | 2908606929 |
| $(1.97362554890186, 2.0755100566945326]$ | 777000 | 37 | 494048 | 3053125976 |
| $(2.0755100566945326, 2.186162517630361]$ | 798000 | 38 | 520387 | 3208055683 |
| $(2.186162517630361, 2.3075451472522963]$ | 819000 | 39 | 549280 | 3375381406 |
| $(2.3075451472522963, 2.4423470353692043]$ | 840000 | 40 | 581368 | 3557697962 |
| $(2.4423470353692043, 2.594395323511559]$ | 861000 | 41 | 617561 | 4144793358 |
| $(2.594395323511559, 2.7694056956796604]$ | 882000 | 42 | 659220 | 4424389078 |
| $(2.7694056956796604, 2.976475888792767]$ | 903000 | 43 | 708510 | 4755203412 |
| $(2.976475888792767, 3.2314282909393213]$ | 924000 | 44 | 769198 | 5162514130 |
| $(3.2314282909393213, 3.5656840708200748]$ | 945000 | 45 | 848763 | 5696519539 |
| $(3.5656840708200748, 4.057395776090949]$ | 966000 | 46 | 965808 | 6482075769 |
| $(4.057395776090949, 5.029431885090279]$ | 987000 | 47 | 1197189 | 8034995932 |

For example, given `PoW` is not calculated, staking 10000 and 20007 VITE will obtain 1 and 2 UTPS quota respectively, 
while staking 134 VITE and waiting 75 snapshot blocks(approximately 75 seconds) also qualifies for sending a transfer transaction without comment.

## Two Methods to Obtain Quota

### Staking

Quota can be obtained through staking. The specified recipient account will receive the corresponding quota after the staking transaction is processed successfully.

#### Parameters
* Staking amount: The minimum staking amount is 134 VITE
* Quota recipient address: The account who receives quota. This could be the staking account itself or any other account since staking for other accounts is permitted.

The VITE staked will be temporarily deducted from user's balance and cannot be transferred during staking period.
The staking account can retrieve staked tokens after 259,200 snapshot blocks (about 3 days) by sending a cancel-staking transaction. As a result, the corresponding quota will be deducted from recipient's account immediately.

### Calculating PoW

User can obtain one-time-valid quota by calculating `PoW` upon sending transactions. According to above table, the target `PoW` difficulty is 0x3FFFFFF for sending an uncommented transfer transaction with no staking.

In the TestNet, a central `PoW` service has been built to serve the purpose of calculating `PoW` from Vite wallets, some of which, like mobile wallets, may not have sufficient computation power to perform the calculation.

#### Calculation Steps

1. Convert $difficulty$ to $target$ in following formula:

$target$ = 2**256 / (1 + 1/$difficulty$)

* $difficulty$: `PoW` difficulty in 256-bit number, with zeros padded at front when less than 256 bits
* $target$: `PoW` target in 256-bit number, usually having 1 at first bit

For example, given $difficulty$ = 0x3FFFFFF, then $target$ = 0xFFFFFFC000000000.

2. Work out correct $nonce$ from transaction data. $nonce$ is the proof of work. In this process, random numbers are constantly assigned to $nonce$ until the following condition is met:

$$blake2b(address+prevHash) + nonce < target$$

* $blake2b$: Hash function
* $address$: User account address
* $prevHash$: Hash of previous account block

## Staking via Delegation

As a typical example of delegated staking, Account A delegates Account B to stake a certain amount of VITE to Account C, where the staker is A, quota recipient is C, and B is the delegate. 
Similarly, when delegated staking is retrieved, Account B is authorized by Account A to retrieve the Vite tokens that was previously staked to Account C.

## FAQ

* Can I stake for multiple quota recipient addresses?

Yes. You need to send multiple staking transactions to different quota recipient addresses. Each staking can have different expiration.

* Can I stake for the same recipient for multiple times?

Yes, the staking amount for the recipient will be accumulated, and the staking expiration will be reset to 3 days.

* Can I retrieve my VITE, which was staked to a recipient address, in multiple times?

Yes. After a staking expires, the staked VITE can be retrieved in multiple times. Staking retrieval won't renew the expiration time.

* Is a staking retrievable if it has not expired yet?

No. You can only retrieve expired staking.

* Will the quota obtained by staking be used up?

Yes but only in a certain snapshot block. Quota obtained through staking is related to staking amount and quota usage in last 74 snapshot blocks. If wallet shows your current quota is 0, you cannot send transactions in current snapshot any more. But no worries, your quota will be refilled in the next snapshot block.

* Can a recipient accept quota staked from multiple staking addresses?

Yes. The quota obtained is calculated on the total staking amount applying to the recipient.

* Does receiving transaction consume quota?

Yes, receiving transaction consumes 21,000 quota.

* How to receive the very first transaction in a new account if nobody stakes for me?

You can calculate `PoW` to get one-time quota for this case.

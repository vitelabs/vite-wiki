# Quota

::: tip
Please note this is not a technical document, but mainly describes quota and quota-related topics. Technical details will be introduced in the yellow paper.

The Definitions of Terms:
* **Quota**： In Vite system, transactions consume quota for exchanging computing and storage resources.
* **${\rm PoW}$**： Proof of Work, used to prove that a certain amount of computation are performed.
* **Stake**： A part of ${\it vite}$ in the account is frozen and cannot be traded or used.
* **Stake address**：The account who starts the stake transaction.
* **Quota recipient address**：The account who receives the quota.
:::

## What is quota

In Ethereum, each transaction has to specify gas and gas price as transaction fee to compete with others to write the ledger. This is a typical bidding model. In principle, the gap between supply and demand can be effectively balanced by price. However, because it is difficult for users to determine the current supply and demand before bidding, and also not possible to predict the bids of other competitors, market failure could be caused in ease. Moreover, all of the competing bids are simply applying on transactions. There is no protocol to allocate TPS resources by account.
In Vite, a certain amount of quota is consumed when the user starts a transaction, such as transfer, deploying new smart contract, invoking contract method, forging new token, registering super node, retrieving mining rewards, voting and staking. Vite introduces a quota model to achieve the balance between supply and demand.

Users are able to acquire quota in two ways:
* Compute a ${\rm PoW}$ when sending a transaction;
* Stake a certain amount of ${\it vite}$ in the account.

If the user only needs to send a transaction, he may calculate a ${\rm PoW}$ to get an one-time quota.
If the user need send transactions frequently, he should stake a certain amount of ${\it vite}$ to obtain more quota.

Vite advocates users to obtain quota by staking.

## Quota usage rules

Different transaction type consumes different amount of quota. In Vite TestNet, the quota required for various transaction types are as follows:

|  Transaction type  | Quota consumed |
|:------------:|:-----------:|
| Transfer-out without annotation | 21000 |
| Transfer-in | 21000 |
| Register super node | 62200 |
| Update super node registration | 62200 |
| Cancel super node registration | 83200 |
| Retrieve mining rewards | 238800 |
| Vote | 62000 |
| Cancel voting | 62000 |
| Stake for quota | 21000 |
| Cancel staking | 21000 |
| Forge token | 83200 |
| Cancel token forging | 83200 |

In addition, each character in annotation consumes additional quota - 4 quota for zero character and 68 quota for each non-zero character.

For example, if hex encoding is used, to send a transfer transaction with annotation of 0x0001 (having two characters in total while the first is zero and the second is non-zero). The required quota is:

$${\it Q} = 21000 + 4 * 1 + 68 * 1 = 21072$$

## Quota calculation

Quota are calculated by the following formula:

$${\it Q}={\it Qm} \times (1- \frac{2}{1+e^{\xi d \times \rho d +\xi s \times T \times \rho s}})$$

* ${\it Q}$: The current available quota of the account;
* ${\it Qm}$: The quota cap of a single account, relevant to total system throughput and total number of accounts;
* $\xi d$: The ${\rm PoW}$ difficulty computed by the account when sending a transaction;
* $\rho d$: The weight of the quota obtained by computing ${\rm PoW}$;
* $\xi s$: The amount of ${\it vite}$ staked by the account;
* $T$: The waiting time before sending a transaction;
* $\rho s$: The weight of the quota obtained by staking.

In the TestNet, some parameters are specified as constant, as follows:
* ${\it Qm}$ = 1000000
* $\rho d$ = 6.259419649e-10
* $\rho s$ = 4.200627522e-24

For the convenience in real calculation, only the value of $(\xi d \times \rho d +\xi s \times T \times \rho s)$ is calculated. The result is mapped into corresponding quota based on the following table:

|  $(\xi d \times \rho d +\xi s \times T \times \rho s)$ | ${\it Q}$ | The number of un-annotated transactions that can be sent by waiting a snapshot block | Approximately equivalent to how much ${\it vite}$ is staked without computing ${\rm PoW}$| Approximately equivalent to how much ${\rm PoW}$ is calculated without staking|
|:------------:|:-----------:|:-----------:|:-----------:|
| 0.0 | 0 | 0 | 0 | 0 |
| $(0.0, 0.042006175634155006]$ | 21000 | 1 | 10000 | 67108864 |
| $(0.042006175634155006, 0.08404944434245186]$ | 42000 | 2 | 20009 | 134276096 |
| $(0.08404944434245186, 0.1261670961035256]$ | 63000 | 3 | 30036 | 201564160 |
| $(0.1261670961035256, 0.16839681732546105]$ | 84000 | 4 | 40089 | 269029376 |
| $(0.16839681732546105, 0.2107768956769977]$ | 105000 | 5 | 50178 | 336736256 |
| $(0.2107768956769977, 0.25334643304410037]$ | 126000 | 6 | 60312 | 404742144 |
| $(0.25334643304410037, 0.2961455696376917]$ | 147000 | 7 | 70501 | 473120768 |
| $(0.2961455696376917, 0.3392157225669637]$ | 168000 | 8 | 80754 | 541929472 |
| $(0.3392157225669637, 0.382599842575369]$ | 189000 | 9 | 91082 | 611241984 |
| $(0.382599842575369, 0.4263426931297194]$ | 210000 | 10 | 101495 | 681119744 |
| $(0.4263426931297194, 0.4704911566788094]$ | 231000 | 11 | 112005 | 751652864 |
| $(0.4704911566788094, 0.5150945736855665]$ | 252000 | 12 | 122623 | 822910976 |
| $(0.5150945736855665, 0.5602051210238872]$ | 273000 | 13 | 133362 | 894976000 |
| $(0.5602051210238872, 0.605878237567604]$ | 294000 | 14 | 144235 | 967946240 |
| $(0.605878237567604, 0.6521731063496397]$ | 315000 | 15 | 155256 | 1041903616 |
| $(0.6521731063496397, 0.6991532046201573]$ | 336000 | 16 | 166440 | 1116962816 |
| $(0.6991532046201573, 0.7468869355972497]$ | 357000 | 17 | 177804 | 1193222144 |
| $(0.7468869355972497, 0.7954483588344243]$ | 378000 | 18 | 189364 | 1270800384 |
| $(0.7954483588344243, 0.8449180401302736]$ | 399000 | 19 | 201141 | 1349836800 |
| $(0.8449180401302736, 0.8953840470548413]$ | 420000 | 20 | 213156 | 1430462464 |
| $(0.8953840470548413, 0.9469431228444231]$ | 441000 | 21 | 225428 | 1512824832 |
| $(0.9469431228444231, 0.9997020801479394]$ | 462000 | 22 | 237989 | 1597120512 |
| $(0.9997020801479394, 1.053779467629503]$ | 483000 | 23 | 250862 | 1683513344 |
| $(1.053779467629503, 1.1093075777848576]$ | 504000 | 24 | 264082 | 1772216320 |
| $(1.1093075777848576, 1.1664348850068706]$ | 525000 | 25 | 277682 | 1863491584 |
| $(1.1664348850068706, 1.2253290311060194]$ | 546000 | 26 | 291702 | 1957568512 |
| $(1.2253290311060194, 1.286180514353531]$ | 567000 | 27 | 306188 | 2054791168 |
| $(1.286180514353531, 1.3492072924575544]$ | 588000 | 28 | 321192 | 2155479040 |
| $(1.3492072924575544, 1.4146605870070175]$ | 609000 | 29 | 336772 | 2260041728 |
| $(1.4146605870070175, 1.4828322881625378]$ | 630000 | 30 | 353004 | 2368962560 |
| $(1.4828322881625378, 1.554064521717701]$ | 651000 | 31 | 369958 | 2482757632 |
| $(1.554064521717701, 1.6287621852605034]$ | 672000 | 32 | 387743 | 2602090496 |
| $(1.6287621852605034, 1.707409634545938]$ | 693000 | 33 | 406468 | 2727755776 |
| $(1.707409634545938, 1.7905932883378723]$ | 714000 | 34 | 426270 | 2860646400 |
| $(1.7905932883378723, 1.8790328663947373]$ | 735000 | 35 | 447322 | 3001933824 |
| $(1.8790328663947373, 1.97362554890186]$ | 756000 | 36 | 469840 | 3153051648 |
| $(1.97362554890186, 2.0755100566945326]$ | 777000 | 37 | 494096 | 3315826688 |
| $(2.0755100566945326, 2.186162517630361]$ | 798000 | 38 | 520436 | 3492593664 |
| $(2.186162517630361, 2.3075451472522963]$ | 819000 | 39 | 549332 | 3686514688 |
| $(2.3075451472522963, 2.4423470353692043]$ | 840000 | 40 | 581427 | 3901882368 |
| $(2.4423470353692043, 2.594395323511559]$ | 861000 | 41 | 617620 | 4144775168 |
| $(2.594395323511559, 2.7694056956796604]$ | 882000 | 42 | 659288 | 4424400896 |
| $(2.7694056956796604, 2.976475888792767]$ | 903000 | 43 | 708576 | 4755193856 |
| $(2.976475888792767, 3.2314282909393213]$ | 924000 | 44 | 769276 | 5162500096 |
| $(3.2314282909393213, 3.5656840708200748]$ | 945000 | 45 | 848844 | 5696520192 |
| $(3.5656840708200748, 4.057395776090949]$ | 966000 | 46 | 965904 | 6482067456 |
| $(4.057395776090949, 5.029431885090279]$ | 987000 | 47 | 1197301 | 8034975744 |

In other words, without calculating ${\rm PoW}$, staking 10000${\it vite}$ should meet the transaction frequency of up to 1${\rm TPS}$ and staking 20009 can allow maximum 2${\rm TPS}$. Staking 10${\it vite}$ and waiting 1000 snapshot blocks (16 minutes and 40 seconds) also support to send a transfer transaction without annotation.
## Two ways of obtaining quota

### Stake

Users can obtain quota by sending a stake transaction to the built-in stake contract. When the transaction is received and confirmed, the stake beneficiary account will be granted with the corresponding quota.

#### Parameters
* Stake amount: The minimum stake amount is 10${\it vite}$.
* Stake beneficiary address: The account that obtains quota, could be stake account or any other account. In other words, staking for others is permitted.

The stake account can retrieve the staked tokens after 259,200 snapshot blocks (about 3 days) by sending a cancel-staking transaction. When the transaction is received and confirmed, the stake beneficiary account will lose the corresponding quota.

### Computing PoW

The user can obtain an one-time quota by computing a ${\rm PoW}$ when sending a transaction. According to the formula, the expected ${\rm PoW}$ difficulty is 0x3FFFFFF for sending an un-annotated transfer transaction in the absence of staking,.
In the TestNet, Vite will provide a pool that calculates ${\rm PoW}$.

#### PoW formula

1. Convert $difficulty$ to $target$ in following formula:

$target$ = 2**256 / (1 + 1/$difficulty$)

* $difficulty$: ${\rm PoW}$ difficulty, 256-bit number, padding zeros at front when less than 256 bits;
* $target$: ${\rm PoW}$ target, 256-bit number, usually the first bit is 1.

For example, when $difficulty$ = 0x3FFFFFF, the $target$ = 0xFFFFFFC000000000.

2. Calculate $nonce$ based on the transaction data. $nonce$ is the proof of work. To calculate ${\rm PoW}$, a random number is continuously assigned to $nonce$ until the following conditions are met:

$$blake2b(address+prevHash) + nonce < target$$

* $blake2b$: The hash function
* $address$: The user account address
* $prevHash$: The hash of previous account block

## FAQ

* Can an address stake for multiple beneficiary addresses?

Yes. The stake expiration time of each beneficiary address is different.

* Can an address stake for the same beneficiary address multiple times?

Yes. The height of stake expiration is 259200 + the height of the snapshot block referenced when the last stake transaction was received by the built-in contract.

* Can ${\it vite}$, which is staked to a beneficiary address, be retrieved in multiple times?

Yes. After a stake expires, the staked ${\it vite}$ can be retrieved in multiple times. This does not affect the expiration time.

* Is the stake retrievable if it has not expired yet?

No. However, the stake can be retrieved at any time after it expires.

* Does the receiving transaction consume quota?

Yes, a receiving transaction needs to consume 21,000 quota.

* How to receive the first transaction on a new account without staking?

If you don't have ${\it vite}$ to stake, instead, you can calculate ${\rm PoW}$ to get quota once.

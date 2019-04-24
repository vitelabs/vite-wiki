# Quota

::: tip
Please note this is not a technical document, but mainly describes quota and quota-related topics. Technical details will be introduced in the yellow paper.

The Definitions of Terms:
* **Quota**： In Vite system, transactions consume quota for exchanging computing and storage resources.
* **${\rm PoW}$**： Proof of Work, used to prove a certain amount of computation has been performed.
* **Stake**： A quantity of VITE in the account is frozen and cannot be spent, usually for quota in return.
* **Staking address**：The account who starts the staking transaction.
* **Quota recipient address**：The account who receives quota.
:::

## What is Quota

In Ethereum, transactions have to compete with each other by specifying attractive gas price as transaction fee. The higher gas price the bigger chance the transaction has to be processed by the miner. This is a typical bidding model. In principle, the gap between supply and demand can be effectively balanced by price. However, because it is difficult for users to determine the current supply and demand before bidding, in addition to the impossibility of predicting other competitors, market failure could be caused often. Moreover, since all the competing bids are simply applied to transactions, no effective solution is implemented to allocate TPS resources among accounts.
In Vite, a certain amount of quota is consumed when the user initiates a transaction, such as transfer, deploying smart contract, invoking smart contract method, issuing new token, registering SBP, retrieving mining rewards, voting or staking. Vite has designed a quota model to balance between resource supply and demand.

Users are able to acquire quota in two ways:
* Compute a ${\rm PoW}$ when doing a transaction, or
* Stake a amount of VITE in the account.

If the user only needs to send a transaction, he may calculate a ${\rm PoW}$ to get a small amount of free quota on demand.
If the user need send frequent transactions constantly, he should stake VITE to get enough quota.

We recommend users to obtain quota by staking.

## Quota Consumption Rules

Different types of transactions consume different amount of quota, as defined in following table:

|  Transaction type  | Quota consumed |
|:------------:|:-----------:|
| Send a transaction without comment | 21000 |
| Receive a transaction | 21000 |
| Register SBP | 62200 |
| Update SBP registration | 62200 |
| Revoke SBP registration | 83200 |
| Retrieve mining rewards | 68200 |
| Vote | 62000 |
| Cancel voting | 62000 |
| Stake for quota | 82000 |
| Cancel staking | 73000 |
| Stake for quota via delegation | 82000 |
| Cancel staking via delegation | 73000 |
| Issue new token | 104525 |
| Retrieve token issuance staking | 83200 |
| Mint additional token | 69325 |
| Burn token | 48837 |
| Transfer token ownership | 58981 |
| Change token type | 63125 |

In addition, each character in transaction comment consumes an additional 68 quota.

For example, given hex encoding is used, sending a normal transfer with a comment of '0x0001' (counting two characters) will consume a quota of:

$${\it Q} = 21000 + 68 * 2 = 21136$$

## Quota Calculation

Quotas are calculated in the following formula:

$${\it Q}={\it Qm} \times (1- \frac{2}{1+e^{\xi d \times \rho d +\xi s \times \rho s}})$$

* ${\it Q}$: The quota available to an account during the last 75 snapshot blocks
* ${\it Qm}$: The quota cap of a single account, related to total system throughput and total number of accounts
* $\xi d$: The ${\rm PoW}$ difficulty computed by the account when sending a transaction
* $\rho d$: The weight of the quota obtained by computing ${\rm PoW}$
* $\xi s$: The amount of VITE staked by the account
* $T$: The waiting time before sending a transaction, equivalent to height different between the snapshot block that current transaction refers to and an older snapshot block that previous transaction refers to
* $\rho s$: The weight of the quota obtained by staking

UTPS is used to measure the trading frequency of an account, which translates to how many un-commented transfer transactions can be initiated in one account within 1s. UTPS calculation formula is as follows:

$${\it UTPS}=\frac{\it Q}{75 * 21000}$$

In TestNet some are constants,
* ${\it Qm}$ = 1000000
* $\rho d$ = 6.259408129e-10
* $\rho s$ = 4.201037667e-06

For the convenience in actual calculation, only $(\xi d \times \rho d +\xi s \times T \times \rho s)$ is calculated. The result is mapped into corresponding quota based on the following table:

|  $(\xi d \times \rho d +\xi s \times T \times \rho s)$ | ${\it Q}$ | UTPS | Approximately equivalent to how much VITE is staked without computing ${\rm PoW}$ | Approximately equivalent to how much ${\rm PoW}$ is calculated without staking |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0.0 | 0 | 0 | 0 | 0 |
| $(0, 0.042006175634155006]$ | 1575000 | 1 | 10000 | 67108863 |
| $(0.042006175634155006, 0.08404944434245186]$ | 3150000 | 2 | 20007 | 134217735 |
| $(0.08404944434245186, 0.1261670961035256]$ | 4725000 | 3 | 30033 | 201326629 |
| $(0.1261670961035256, 0.16839681732546105]$ | 6300000 | 4 | 40085 | 268435554 |
| $(0.16839681732546105, 0.2107768956769977]$ | 7875000 | 5 | 50173 | 335544521 |
| $(0.2107768956769977, 0.25334643304410037]$ | 9450000 | 6 | 60306 | 402653541 |
| $(0.25334643304410037, 0.2961455696376917]$ | 11025000 | 7 | 70494 | 469762624 |
| $(0.2961455696376917, 0.3392157225669637]$ | 12600000 | 8 | 80746 | 536871780 |
| $(0.3392157225669637, 0.382599842575369]$ | 14175000 | 9 | 91073 | 603981021 |
| $(0.382599842575369, 0.4263426931297194]$ | 15750000 | 10 | 101486 | 671090357 |
| $(0.4263426931297194, 0.4704911566788094]$ | 17325000 | 11 | 111995 | 738199798 |
| $(0.4704911566788094, 0.5150945736855665]$ | 18900000 | 12 | 122612 | 805309354 |
| $(0.5150945736855665, 0.5602051210238872]$ | 20475000 | 13 | 133350 | 872419037 |
| $(0.5602051210238872, 0.605878237567604]$ | 22050000 | 14 | 144222 | 939528856 |
| $(0.605878237567604, 0.6521731063496397]$ | 23625000 | 15 | 155241 | 1006638823 |
| $(0.6521731063496397, 0.6991532046201573]$ | 25200000 | 16 | 166424 | 1073748948 |
| $(0.6991532046201573, 0.7468869355972497]$ | 26775000 | 17 | 177787 | 1140859241 |
| $(0.7468869355972497, 0.7954483588344243]$ | 28350000 | 18 | 189346 | 1207969713 |
| $(0.7954483588344243, 0.8449180401302736]$ | 29925000 | 19 | 201122 | 1275080375 |
| $(0.8449180401302736, 0.8953840470548413]$ | 31500000 | 20 | 213135 | 1342191236 |
| $(0.8953840470548413, 0.9469431228444231]$ | 33075000 | 21 | 225407 | 1409302308 |
| $(0.9469431228444231, 0.9997020801479394]$ | 34650000 | 22 | 237966 | 1476413601 |
| $(0.9997020801479394, 1.053779467629503]$ | 36225000 | 23 | 250838 | 1543525125 |
| $(1.053779467629503, 1.1093075777848576]$ | 37800000 | 24 | 264056 | 1610636891 |
| $(1.1093075777848576, 1.1664348850068706]$ | 39375000 | 25 | 277654 | 1677748910 |
| $(1.1664348850068706, 1.2253290311060194]$ | 40950000 | 26 | 291673 | 1744861192 |
| $(1.2253290311060194, 1.286180514353531]$ | 42525000 | 27 | 306158 | 1811973748 |
| $(1.286180514353531, 1.3492072924575544]$ | 44100000 | 28 | 321161 | 1879086588 |
| $(1.3492072924575544, 1.4146605870070175]$ | 45675000 | 29 | 336741 | 1946199722 |
| $(1.4146605870070175, 1.4828322881625378]$ | 47250000 | 30 | 352969 | 2013313162 |
| $(1.4828322881625378, 1.554064521717701]$ | 48825000 | 31 | 369924 | 2080426917 |
| $(1.554064521717701, 1.6287621852605034]$ | 50400000 | 32 | 387705 | 2147540999 |
| $(1.6287621852605034, 1.707409634545938]$ | 51975000 | 33 | 406426 | 2214655417 |
| $(1.707409634545938, 1.7905932883378723]$ | 53550000 | 34 | 426227 | 2281770183 |
| $(1.7905932883378723, 1.8790328663947373]$ | 55125000 | 35 | 447279 | 2348885307 |
| $(1.8790328663947373, 1.97362554890186]$ | 56700000 | 36 | 469795 | 2416000799 |
| $(1.97362554890186, 2.0755100566945326]$ | 58275000 | 37 | 494048 | 2483116670 |
| $(2.0755100566945326, 2.186162517630361]$ | 59850000 | 38 | 520387 | 2550232930 |
| $(2.186162517630361, 2.3075451472522963]$ | 61425000 | 39 | 549280 | 2617349590 |
| $(2.3075451472522963, 2.4423470353692043]$ | 63000000 | 40 | 581368 | 2684466661 |
| $(2.4423470353692043, 2.594395323511559]$ | 64575000 | 41 | 617561 | 2751584152 |
| $(2.594395323511559, 2.7694056956796604]$ | 66150000 | 42 | 659220 | 2818702076 |
| $(2.7694056956796604, 2.976475888792767]$ | 67725000 | 43 | 708510 | 2885820441 |
| $(2.976475888792767, 3.2314282909393213]$ | 69300000 | 44 | 769198 | 2952939259 |
| $(3.2314282909393213, 3.5656840708200748]$ | 70875000 | 45 | 848763 | 3020058540 |
| $(3.5656840708200748, 4.057395776090949]$ | 72450000 | 46 | 965808 | 3087178295 |
| $(4.057395776090949, 5.029431885090279]$ | 74025000 | 47 | 1197189 | 3154298534 |

For example, given no ${\rm PoW}$ is worked out, staking 10000 VITE can satisfy a demand of tx rate up to 1${\rm UTPS}$, or 20007 VITE to 2${\rm UTPS}$. 
Staking 134 VITE and waiting 75 snapshot blocks(about 1 minutes and 25 seconds) also qualifies for sending a transfer transaction without comment.

## Two Methods to Obtain Quota

### Staking

Quota can be obtained through staking. The specified recipient account will receive the corresponding quota after the staking transaction is processed successfully.

#### Parameters
* Staking amount: The minimum staking amount is 134 VITE
* Quota recipient address: The account who receives quota, could be the staking account itself or any other account since staking for other accounts is permitted.

The Vite tokens staked will be temporarily deducted from user's balance and cannot be transferred during staking period.
The staking account can retrieve staked tokens after 259,200 snapshot blocks (about 3 days) by sending a cancel-staking transaction. After this transaction is received and confirmed, the corresponding quota in the quota recipient account won't exist any more.

### Computing PoW

The user can obtain an one-time quota by computing a ${\rm PoW}$ upon transaction sending. According to the formula, the expected ${\rm PoW}$ difficulty is 0x3FFFFFF for sending an uncommented transfer transaction without staking.

In the TestNet, we have built a ${\rm PoW}$ pool, which provides the capability to obtain transaction quotas by calculating PoW in Vite official wallet.

#### PoW Formula

1. Convert $difficulty$ to $target$ in following formula:

$target$ = 2**256 / (1 + 1/$difficulty$)

* $difficulty$: ${\rm PoW}$ difficulty, 256-bit number, padding zeros at front when less than 256 bits;
* $target$: ${\rm PoW}$ target, 256-bit number, usually the first bit is 1.

For example, if $difficulty$ = 0x3FFFFFF, then $target$ = 0xFFFFFFC000000000.

2. Calculate $nonce$ based on transaction data. $nonce$ is the proof of work. In ${\rm PoW}$ calculation, a random number is continuously assigned to $nonce$ until the following conditions are met:

$$blake2b(address+prevHash) + nonce < target$$

* $blake2b$: Hash function
* $address$: User account address
* $prevHash$: Hash of previous account block

## Staking via Delegation

A general process of delegated staking is that Account A delegates Account B to stake a certain amount of VITE to Account C. 
In this scenario, the staker is A, the quota recipient is C, and B is the delegate. 
Similarly, when delegated staking is retrieved, Account B is authorized by Account A to retrieve the Vite tokens that was previously staked to Account C.

## FAQ

* Can I stake for multiple quota recipient addresses?

Yes. You need to send multiple staking transactions to different quota recipient addresses. Each staking can have different expiration.

* Can I stake for the same recipient multiple times?

Yes, the staking amount for this recipient will be accumulated. Staking expiration time = height of snapshot block referenced by the response block of last staking transaction + 259200.

* Can I retrieve my VITE, which was staked to a recipient address, in multiple times?

Yes. After stake expires, staked VITE can be retrieved in multiple times. Stake retrieval won't change the expiration time.

* Is a stake retrievable if it has not expired yet?

No. However, the stake can be retrieved at any time after it expires.

* Will the quota obtained by staking be used up?

Quota obtained through staking is related to staking amount and snapshot block height difference during the period in which no transaction has taken place, and continues to be effective as long as the staked VITE is not retrieved. If the wallet shows your current quota is 0, it may increase after waiting for a while.

* Can a recipient accept quota staked from multiple staking addresses?

Yes. The received quota is the sum of the staking amount that has applied to this recipient address.

* Does receiving transaction consume quota?

Yes, an individual receiving transaction consumes 21,000 quota.

* How to receive the first transaction in a new account if I don't stake?

If you don't have VITE to stake, you can calculate ${\rm PoW}$ to get one-time quota instead.

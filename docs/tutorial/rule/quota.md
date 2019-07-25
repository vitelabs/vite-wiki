# Quota

::: tip
Please note this is not a technical document, but mainly describes quota and quota-related topics. Technical details will be introduced in the yellow paper.

The Definitions of Terms:
* **Quota**： In Vite system, CPU cycles, storage space and network bandwidth consumed in transactions are paid by quota, instead of transaction fees or gas
* **PoW**： Proof of Work, representing a certain amount of computational work has been performed
* **Stake**： Lock up an certain amount of VITE in account in exchange for quota
* **Staking address**：The address of the account from which the staking transaction is initiated
* **Quota recipient address**：The address of the account receiving quota
:::

## What is Quota

In Ethereum, in order to have a transaction executed timely, the sender usually has to offer an appealing transaction fee to miner. The higher gas price offered, the sooner transaction executed. 
In this typical bidding model, the supply of system processing capability and the demand of sending transactions are balanced by gas price automatically. This model works fine in Ethereum, however, from user's perspective it is hard to determine what is the best gas price to offer for a certain time. Either too low or too high price will cause a market failure. 
Moreover, since gas is associated with individual transactions, it is impossible to measure and allocate computational resources at account level.
Vite does not charge transaction fees, but instead an amount of quota will be consumed when user sends transaction, including transfer, deploying smart contract, calling smart contract, issuing token, registering SBP, retrieving mining rewards, voting and staking. Vite has implemented a quota model to meet the supply and demand of resources.

Quota can be obtained in two methods:
* Obtain a small amount of temporary quota by calculating `PoW` upon sending a transaction, or
* Stake VITE

If you just simply need to send a transaction, calculating `PoW` is sufficient for you.
If you need send many transactions in short time, which means you may need a large amount of quota consistently, you should stake VITE.

We recommend staking.

## Quota Consumption Rules

Various quota consumptions of different transactions:

|  Transaction Type  | Quota Consumed | In Unit Transaction | Minimum Staking Amount（Vite） |
|:------------:|:-----------:|:-----------:|:-----------:|
| Send a transfer without comment | 21000 | 1 | 134 |
| Receive a transfer | 21000 | 1 | 134 |
| Register SBP | 62200 | 2.9619 | 400 |
| Update SBP registration | 62200 | 2.9619 | 400 |
| Cancel SBP registration | 83200 | 3.9619 | 534 |
| Retrieve mining rewards | 68200 | 3.2476 | 534 |
| Vote | 62000 | 2.9524 | 400 |
| Cancel voting | 62000 | 2.9524 | 400 |
| Stake for quota | 82000 | 3.9048 | 534 |
| Cancel staking for quota | 73000 | 3.4762 | 534 |
| Stake for quota via delegation | 82000 | 3.9048 | 534 |
| Cancel staking for quota via delegation | 73000 | 3.4762 | 534 |
| Issue new token | 104525 | 4.9774 | 667 |
| Mint additional token | 69325 | 3.3012 | 534 |
| Burn token | 48837 | 2.3256 | 400 |
| Transfer token ownership | 58981 | 2.8086 | 400 |
| Change token type | 63125 | 3.0060 | 534 |

* **Unit Transaction (UT)**: The minimum transaction unit measured by quota consumption, equivalent to an un-commented transfer transaction

Each character in transaction's comment consumes additional 68 quota.

For example, sending a transfer transaction with a comment of '0x0001' (two hexadecimal characters) will consume

$${\it Q} = 21000 + 68 * 2 = 21136$$ quota, which translates to `1.0065` unit transaction.

::: tip Note
Due to implementation of [VEP-8](../../vep/vep-8.md), additional 136 quota (2 characters prefix) will be charged if you send a transfer with comment from Vite wallet. 
No additional quota will be consumed if no comment is associated.
:::

If `ConfirmTimes` is assigned when creating new smart contract, for each response transaction of the contract, an additional quota about `ConfirmTimes * 200` will be charged.
`ConfirmTimes` defines a waiting number that specifies in how many confirmations the contract will produce a response after the request transaction is snapshotted.

## Quota Calculation

Quotas are calculated in the following formulas:

$$Q_{PoW}=Qm \times (1- \frac{2}{1+e^{\xi d \times \rho d}})$$
$$Q_{Stake}=Qm \times (1- \frac{2}{1+e^{\xi s \times \rho s}})$$

Here,
* $Q_{PoW}$: Quota obtained by calculating `PoW`. Valid only for current transaction
* $Q_{Stake}$: Quota obtained by staking. Will be restored every snapshot block and can accumulate for up to 75 snapshot blocks
* $Qm$: Quota cap of a single account. Related to overall system throughput and total account number
* $\xi d$: `PoW` difficulty
* $\rho d$: Quota calculation weight of `PoW`
* $\xi s$: Staking amount
* $\rho s$: Quota calculation weight of staking

In Vite Network,
* $Qm$ = 1000000
* $\rho d$ = 6.259408129e-10
* $\rho s$ = 4.201037667e-24


**UTPS**: Unit transaction per second, referring to the number of unit transactions can be sent by the account in one second

$$UTPS=\frac{Q_{Stake}}{21000}$$

**UTPE**: Unit transaction per epoch, referring to the number of unit transactions that can be sent by the account in 75 snapshot blocks (approximately an epoch).

The available quota of an account depends on basic UTPS and actual quota consumption during the last 74 snapshot blocks. 
For example, account A gets 1 UTPS by staking and hasn't sent or received any transaction during last 74 snapshot blocks, then the available quota of account A is 75 UT.

The actual available quota of an account upon sending transaction depends on basic UTPS, quota consumption during last 74 snapshot blocks and `PoW`. 
For example, account B gets 1 UTPS by staking and hasn't sent or received any transaction during last 74 snapshot blocks, while he also calculated a `PoW` nonce entitled to additional quota equivalent to 2 UT, then the actual available quota of account B is 77 UT in current snapshot block.

::: tip Note
For a single transaction, the maximum quota can be consumed is equivalent to 47.62 **Unit Transactions**.
:::

For convenience in calculation, it is acceptable to calculate $(\xi d \times \rho d)$ or $(\xi s \times T \times \rho s)$ and map result to corresponding quota according to following table:

|  $(\xi d \times \rho d)$ or $(\xi s \times \rho s)$ | $Q$ | UTPS | Max UTPE | Approximately equivalent to how much VITE staked without calculating `PoW` | Approximately equivalent to how difficult the `PoW` calculated without staking |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| 0.0 | 0 | 0 | 0 | 0 | 0 |
| $(0, 0.0005600000146345639]$ | 280 | 1/75 | 1 | 134 | 894654 |
| $(0.0005600000146345639, 0.0011200001170773874]$ | 560 | 2/75 | 2 | 267 | 1789307 |
| $(0.0011200001170773874, 0.0016800003951362111]$ | 840 | 3/75 | 3 | 400 | 2683961 |
| $(0.0016800003951362111, 0.002240000936619286]$ | 1120 | 4/75 | 4 | 534 | 3578615 |
| $(0.002240000936619286, 0.002800001829335484]$ | 1400 | 5/75 | 5 | 667 | 4473270 |
| $(0.002800001829335484, 0.003360003161093523]$ | 1680 | 6/75 | 6 | 800 | 5367925 |
| $(0.003360003161093523, 0.003920005019702078]$ | 1960 | 7/75 | 7 | 934 | 6262581 |
| $(0.003920005019702078, 0.004480007492972107]$ | 2240 | 8/75 | 8 | 1067 | 7157239 |
| $(0.004480007492972107, 0.0050400106687125265]$ | 2520 | 9/75 | 9 | 1200 | 8051897 |
| $(0.0050400106687125265, 0.005600014634735637]$ | 2800 | 10/75 | 10 | 1334 | 8946557 |
| $(0.005600014634735637, 0.006160019478852362]$ | 3080 | 11/75 | 11 | 1467 | 9841218 |
| $(0.006160019478852362, 0.006720025288875452]$ | 3360 | 12/75 | 12 | 1600 | 10735880 |
| $(0.006720025288875452, 0.0072800321526182606]$ | 3640 | 13/75 | 13 | 1733 | 11630544 |
| $(0.0072800321526182606, 0.007840040157895736]$ | 3920 | 14/75 | 14 | 1867 | 12525211 |
| $(0.007840040157895736, 0.008400049392522762]$ | 4200 | 15/75 | 15 | 2000 | 13419879 |
| $(0.008400049392522762, 0.008960059944316465]$ | 4480 | 16/75 | 16 | 2133 | 14314549 |
| $(0.008960059944316465, 0.009520071901094992]$ | 4760 | 17/75 | 17 | 2267 | 15209221 |
| $(0.009520071901094992, 0.01008008535067674]$ | 5040 | 18/75 | 18 | 2400 | 16103896 |
| $(0.01008008535067674, 0.010640100380883094]$ | 5320 | 19/75 | 19 | 2533 | 16998573 |
| $(0.010640100380883094, 0.011200117079536328]$ | 5600 | 20/75 | 20 | 2667 | 17893253 |
| $(0.011200117079536328, 0.011760135534459705]$ | 5880 | 21/75 | 21 | 2800 | 18787936 |
| $(0.011760135534459705, 0.012320155833478902]$ | 6160 | 22/75 | 22 | 2933 | 19682622 |
| $(0.012320155833478902, 0.012880178064420343]$ | 6440 | 23/75 | 23 | 3066 | 20577310 |
| $(0.012880178064420343, 0.013440202315113498]$ | 6720 | 24/75 | 24 | 3200 | 21472002 |
| $(0.013440202315113498, 0.01400022867338966]$ | 7000 | 25/75 | 25 | 3333 | 22366698 |
| $(0.01400022867338966, 0.01456025722708073]$ | 7280 | 26/75 | 26 | 3466 | 23261397 |
| $(0.01456025722708073, 0.015120288064022377]$ | 7560 | 27/75 | 27 | 3600 | 24156099 |
| $(0.015120288064022377, 0.015680321272051077]$ | 7840 | 28/75 | 28 | 3733 | 25050806 |
| $(0.015680321272051077, 0.01624035693900638]$ | 8120 | 29/75 | 29 | 3866 | 25945516 |
| $(0.01624035693900638, 0.016800395152729273]$ | 8400 | 30/75 | 30 | 4000 | 26840230 |
| $(0.016800395152729273, 0.017360436001064444]$ | 8680 | 31/75 | 31 | 4133 | 27734949 |
| $(0.017360436001064444, 0.01792047957185776]$ | 8960 | 32/75 | 32 | 4266 | 28629672 |
| $(0.01792047957185776, 0.018480525952958973]$ | 9240 | 33/75 | 33 | 4400 | 29524399 |
| $(0.018480525952958973, 0.019040575232219203]$ | 9520 | 34/75 | 34 | 4533 | 30419131 |
| $(0.019040575232219203, 0.019600627497492765]$ | 9800 | 35/75 | 35 | 4666 | 31313868 |
| $(0.019600627497492765, 0.020160682836636825]$ | 10080 | 36/75 | 36 | 4799 | 32208609 |
| $(0.020160682836636825, 0.020720741337511922]$ | 10360 | 37/75 | 37 | 4933 | 33103356 |
| $(0.020720741337511922, 0.021280803087980315]$ | 10640 | 38/75 | 38 | 5066 | 33998108 |
| $(0.021280803087980315, 0.021840868175909127]$ | 10920 | 39/75 | 39 | 5199 | 34892865 |
| $(0.021840868175909127, 0.022400936689166498]$ | 11200 | 40/75 | 40 | 5333 | 35787628 |
| $(0.022400936689166498, 0.022961008715626032]$ | 11480 | 41/75 | 41 | 5466 | 36682396 |
| $(0.022961008715626032, 0.02352108434316254]$ | 11760 | 42/75 | 42 | 5599 | 37577171 |
| $(0.02352108434316254, 0.024081163659656016]$ | 12040 | 43/75 | 43 | 5733 | 38471951 |
| $(0.024081163659656016, 0.02464124675298827]$ | 12320 | 44/75 | 44 | 5866 | 39366737 |
| $(0.02464124675298827, 0.025201333711046034]$ | 12600 | 45/75 | 45 | 5999 | 40261529 |
| $(0.025201333711046034, 0.025761424621719303]$ | 12880 | 46/75 | 46 | 6133 | 41156327 |
| $(0.025761424621719303, 0.02632151957290144]$ | 13160 | 47/75 | 47 | 6266 | 42051132 |
| $(0.02632151957290144, 0.026881618652489236]$ | 13440 | 48/75 | 48 | 6399 | 42945944 |
| $(0.026881618652489236, 0.027441721948384734]$ | 13720 | 49/75 | 49 | 6533 | 43840762 |
| $(0.027441721948384734, 0.028001829548493135]$ | 14000 | 50/75 | 50 | 6666 | 44735587 |
| $(0.028001829548493135, 0.02856194154072289]$ | 14280 | 51/75 | 51 | 6799 | 45630419 |
| $(0.02856194154072289, 0.02912205801298835]$ | 14560 | 52/75 | 52 | 6933 | 46525259 |
| $(0.02912205801298835, 0.029682179053206414]$ | 14840 | 53/75 | 53 | 7066 | 47420105 |
| $(0.029682179053206414, 0.030242304749299606]$ | 15120 | 54/75 | 54 | 7199 | 48314960 |
| $(0.030242304749299606, 0.030802435189193574]$ | 15400 | 55/75 | 55 | 7333 | 49209821 |
| $(0.030802435189193574, 0.03136257046081975]$ | 15680 | 56/75 | 56 | 7466 | 50104691 |
| $(0.03136257046081975, 0.03192271065211283]$ | 15960 | 57/75 | 57 | 7599 | 50999568 |
| $(0.03192271065211283, 0.03248285585101344]$ | 16240 | 58/75 | 58 | 7733 | 51894453 |
| $(0.03248285585101344, 0.03304300614546563]$ | 16520 | 59/75 | 59 | 7866 | 52789346 |
| $(0.03304300614546563, 0.033603161623419094]$ | 16800 | 60/75 | 60 | 7999 | 53684248 |
| $(0.033603161623419094, 0.03416332237282837]$ | 17080 | 61/75 | 61 | 8133 | 54579158 |
| $(0.03416332237282837, 0.03472348848165249]$ | 17360 | 62/75 | 62 | 8266 | 55474077 |
| $(0.03472348848165249, 0.03528366003785593]$ | 17640 | 63/75 | 63 | 8399 | 56369004 |
| $(0.03528366003785593, 0.03584383712940819]$ | 17920 | 64/75 | 64 | 8533 | 57263940 |
| $(0.03584383712940819, 0.036404019844283514]$ | 18200 | 65/75 | 65 | 8666 | 58158886 |
| $(0.036404019844283514, 0.036964208270462595]$ | 18480 | 66/75 | 66 | 8799 | 59053840 |
| $(0.036964208270462595, 0.037524402495930566]$ | 18760 | 67/75 | 67 | 8933 | 59948804 |
| $(0.037524402495930566, 0.038084602608677874]$ | 19040 | 68/75 | 68 | 9066 | 60843776 |
| $(0.038084602608677874, 0.03864480869670122]$ | 19320 | 69/75 | 69 | 9199 | 61738759 |
| $(0.03864480869670122, 0.03920502084800278]$ | 19600 | 70/75 | 70 | 9333 | 62633751 |
| $(0.03920502084800278, 0.039765239150590236]$ | 19880 | 71/75 | 71 | 9466 | 63528753 |
| $(0.039765239150590236, 0.04032546369247644]$ | 20160 | 72/75 | 72 | 9599 | 64423765 |
| $(0.04032546369247644, 0.04088569456168163]$ | 20440 | 73/75 | 73 | 9733 | 65318787 |
| $(0.04088569456168163, 0.04144593184623087]$ | 20720 | 74/75 | 74 | 9866 | 66213820 |
| $(0, 0.042006175634155006]$ | 21000 | 1 | 75 | 10000 | 67108863 |
| $(0.042006175634155006, 0.08404944434245186]$ | 42000 | 2 | 150 | 20007 | 134276984 |
| $(0.08404944434245186, 0.1261670961035256]$ | 63000 | 3 | 225 | 30033 | 201563940 |
| $(0.1261670961035256, 0.16839681732546105]$ | 84000 | 4 | 300 | 40085 | 269029937 |
| $(0.16839681732546105, 0.2107768956769977]$ | 105000 | 5 | 375 | 50173 | 336736144 |
| $(0.2107768956769977, 0.25334643304410037]$ | 126000 | 6 | 450 | 60306 | 404745030 |
| $(0.25334643304410037, 0.2961455696376917]$ | 147000 | 7 | 525 | 70494 | 473120723 |
| $(0.2961455696376917, 0.3392157225669637]$ | 168000 | 8 | 600 | 80746 | 541929390 |
| $(0.3392157225669637, 0.382599842575369]$ | 189000 | 9 | 675 | 91073 | 611239649 |
| $(0.382599842575369, 0.4263426931297194]$ | 210000 | 10 | 750 | 101486 | 681123015 |
| $(0.4263426931297194, 0.4704911566788094]$ | 231000 | 11 | 825 | 111995 | 751654385 |
| $(0.4704911566788094, 0.5150945736855665]$ | 252000 | 12 | 900 | 122612 | 822912588 |
| $(0.5150945736855665, 0.5602051210238872]$ | 273000 | 13 | 975 | 133350 | 894980979 |
| $(0.5602051210238872, 0.605878237567604]$ | 294000 | 14 | 1050 | 144222 | 967948128 |
| $(0.605878237567604, 0.6521731063496397]$ | 315000 | 15 | 1125 | 155241 | 1041908585 |
| $(0.6521731063496397, 0.6991532046201573]$ | 336000 | 16 | 1200 | 166424 | 1116963762 |
| $(0.6991532046201573, 0.7468869355972497]$ | 357000 | 17 | 1275 | 177787 | 1193222938 |
| $(0.7468869355972497, 0.7954483588344243]$ | 378000 | 18 | 1350 | 189346 | 1270804432 |
| $(0.7954483588344243, 0.8449180401302736]$ | 399000 | 19 | 1425 | 201122 | 1349836954 |
| $(0.8449180401302736, 0.8953840470548413]$ | 420000 | 20 | 1500 | 213135 | 1430461202 |
| $(0.8953840470548413, 0.9469431228444231]$ | 441000 | 21 | 1575 | 225407 | 1512831730 |
| $(0.9469431228444231, 0.9997020801479394]$ | 462000 | 22 | 1650 | 237966 | 1597119184 |
| $(0.9997020801479394, 1.053779467629503]$ | 483000 | 23 | 1725 | 250838 | 1683512956 |
| $(1.053779467629503, 1.1093075777848576]$ | 504000 | 24 | 1800 | 264056 | 1772224394 |
| $(1.1093075777848576, 1.1664348850068706]$ | 525000 | 25 | 1875 | 277654 | 1863490703 |
| $(1.1664348850068706, 1.2253290311060194]$ | 546000 | 26 | 1950 | 291673 | 1957579704 |
| $(1.2253290311060194, 1.286180514353531]$ | 567000 | 27 | 2025 | 306158 | 2054795738 |
| $(1.286180514353531, 1.3492072924575544]$ | 588000 | 28 | 2100 | 321161 | 2155487012 |
| $(1.3492072924575544, 1.4146605870070175]$ | 609000 | 29 | 2175 | 336741 | 2260054878 |
| $(1.4146605870070175, 1.4828322881625378]$ | 630000 | 30 | 2250 | 352969 | 2368965656 |
| $(1.4828322881625378, 1.554064521717701]$ | 651000 | 31 | 2325 | 369924 | 2482765926 |
| $(1.554064521717701, 1.6287621852605034]$ | 672000 | 32 | 2400 | 387705 | 2602102550 |
| $(1.6287621852605034, 1.707409634545938]$ | 693000 | 33 | 2475 | 406426 | 2727749333 |
| $(1.707409634545938, 1.7905932883378723]$ | 714000 | 34 | 2550 | 426227 | 2860643134 |
| $(1.7905932883378723, 1.8790328663947373]$ | 735000 | 35 | 2625 | 447279 | 3001933774 |
| $(1.8790328663947373, 1.97362554890186]$ | 756000 | 36 | 2700 | 469795 | 3153054584 |
| $(1.97362554890186, 2.0755100566945326]$ | 777000 | 37 | 2775 | 494048 | 3315824778 |
| $(2.0755100566945326, 2.186162517630361]$ | 798000 | 38 | 2850 | 520387 | 3492602612 |
| $(2.186162517630361, 2.3075451472522963]$ | 819000 | 39 | 2925 | 549280 | 3686522911 |
| $(2.3075451472522963, 2.4423470353692043]$ | 840000 | 40 | 3000 | 581368 | 3901881752 |
| $(2.4423470353692043, 2.594395323511559]$ | 861000 | 41 | 3075 | 617561 | 4144793358 |
| $(2.594395323511559, 2.7694056956796604]$ | 882000 | 42 | 3150 | 659220 | 4424389078 |
| $(2.7694056956796604, 2.976475888792767]$ | 903000 | 43 | 3225 | 708510 | 4755203412 |
| $(2.976475888792767, 3.2314282909393213]$ | 924000 | 44 | 3300 | 769198 | 5162514130 |
| $(3.2314282909393213, 3.5656840708200748]$ | 945000 | 45 | 3375 | 848763 | 5696519539 |
| $(3.5656840708200748, 4.057395776090949]$ | 966000 | 46 | 3450 | 965808 | 6482075769 |
| $(4.057395776090949, 5.029431885090279]$ | 987000 | 47 | 3525 | 1197189 | 8034995932 |

According to above table, if `PoW` is not taken into account, staking 10000 VITE will support 1 UTPS, or maximum 75 UTPE throughput, while staking 20007 VITE will get 2 UTPS, or maximum 150 UTPE throughput.
Staking 134 VITE also qualifies for sending a transfer transaction without comment after idling for 75 snapshot blocks, which translates to 1 UTPE.

## Two Methods to Obtain Quota

### Staking

Quota can be obtained through staking. The specified recipient account will receive the corresponding quota after the staking transaction is processed successfully.

#### Parameters
* Staking amount: The minimum staking amount is 134 VITE
* Quota recipient address: The address of the account who receives quota. This is not limited to the staking account but can be any other account. In other words, you can stake for others.

The VITE staked will be temporarily deducted from user's balance and cannot be transferred during staking period.
The staking account is able to retrieve staked tokens after 259,200 snapshot blocks (about 3 days) by sending a cancel-staking transaction. As a result, the recipient account will lose the quota correspondingly.

### Calculating PoW

User can obtain one-time quota by calculating `PoW` upon sending transactions. According to above table, the required difficulty is 0x3FFFFFF for sending an uncommented transfer transaction through `PoW`.

In Pre-Mainnet, a `PoW` service has been set up by ViteLabs to serve the purpose of calculating `PoW` for Vite wallets in consideration of that some client hardware may not have sufficient computation power to perform the calculation on their own.

#### Calculation Steps

1. Convert $difficulty$ to $target$ in following formula:

$$target=\frac{2^{256}}{1+\frac{1}{difficulty}}$$

* $difficulty$: `PoW` difficulty in 256-bit number, filling zeros at head if less than 256 bits length
* $target$: `PoW` target in 256-bit number, usually having 1 at the first bit

For example, given $difficulty$ = 0x3FFFFFF, then $target$ = 0xFFFFFFC000000000.

2. Work out a valid $nonce$ based on the transaction data as the proof of work. In this process, a widely range of random numbers are constantly feed to $nonce$ until the following condition is met:

$$blake2b(address+prevHash) + nonce < target$$

* $blake2b$: Hash function
* $address$: User account address
* $prevHash$: Hash of previous account block

## Staking via Delegation

As a typical example of delegated staking, Account A delegates Account B to stake a certain amount of VITE to Account C, where the staker is A, the quota recipient is C, and B is the delegate. 
Similarly, when delegated staking is retrieved, Account B is authorized by Account A to retrieve the Vite tokens that was previously staked to Account C.

## FAQ

* Can I stake for multiple quota recipient addresses?

Yes. You need to send multiple staking transactions to different quota recipient addresses. In this case, each staking has its own expiration time.

* Can I stake for the same recipient for multiple times?

Yes, the staking amount for the recipient will be accumulated, and the staking expiration will be reset to 3 days.

* Can I retrieve my VITE, which was staked to a recipient address, in multiple times?

Yes. After a staking expires, the staked VITE can be retrieved in multiple times. This won't get the expiration time reset.

* Is a staking retrievable if it has not expired yet?

No. You can only retrieve expired staking.

* Will the quota obtained by staking be used up?

Yes it is possible in the current snapshot block. Quota obtained through staking is related to staking amount and actual quota consumption in last 74 snapshot blocks. If your quota shows 0 in the wallet, you cannot send or receive transaction right now. But no worries, your quota will be refilled in the next snapshot block. This is exactly the benefit staking for quota over `PoW`

* Can a recipient accept quota staked from multiple staking addresses?

Yes. The quota obtained is calculated on the total staking amount applying to the recipient.

* Does receiving transaction consume quota?

Yes, receiving transaction consumes 21,000 quota, or 1 UT.

* How to receive the very first transaction in a new account if nobody stakes for me?

You can calculate `PoW` to get one-time quota for this case.

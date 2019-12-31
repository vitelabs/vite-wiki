# ViteX Decentralized Exchange

:::tip Summary

**ViteX**: a decentralized exchange built on the Vite public chain. The world's first DAG-based decentralized exchange. 

**ViteX Coin, VX**: the ViteX native coin that will be mined by the community and be used to allocate rewards to the ViteX community. VX will have no pre-sale, pre-mining nor initial coin offering (ICO).

See: [VX One Page](./one-page.html)
:::

## Highlights

* **Complete decentralization**
  - On-chain order matching
  - Smart contract-enabled transaction fee collection and dividend distribution 
  - Listing new trading pairs only requires 10,000 VITE
* **Exchange run by the community**
  - Anyone can become a ***ViteX Operator***
  - ViteX Operators have the right to set trading fees, suspend trading activity & list new trading pairs
  - All Operator functions are deployed on the smart contract
* **Native exchange coin VX can be mined in five different ways**

## ViteX Coin （VX）

VX is the coin native to the VX platform. VX holders enjoy benefits in the form of dividends as the trading fees collected by the exchange are distributed back to VX holders. 

### VX Basics

* **Total supply**: **29,328,807.8**
* **Smallest denomination**: $10^{-18}$
* **Features**: VX holders receive daily dividends from a shared dividend pool which aggregates the trading fees accumulated by ViteX and redistributes back to VX holders.
* **Distribution**: VX will have no private sale nor public sale. The only way to obtain VX is through mining. VX can be mined in five ways:
  - Trading as mining: whenever a trader takes an order off the order book, they get VX.
  - Staking as mining: since ViteX is a dApp on the Vite platform, ViteX requires quota in order to properly allocate computing resources on the Vite platform. By staking VITE for the benefit of ViteX, users receive VX as a reward. 
  - Referring as mining: for every friend that you bring to trade on ViteX (via a personal referral code), you are rewarded with VX in terms of 5% of VX mined by the invitee through trading. Your friend will get additional 2.5%.
  - Market-making as mining: place orders to boost liquidity on ViteX and get rewarded with VX. 
  - Listing as mining: a user that lists a new trading pair receives VX. 
* **Release schedule**: All VX will be released over the course of 8 years and 3 months. 
  
### VX Distribution Schedule

After the launch of VX mining, there will be two phases of VX release with the total supply set to ***29,328,797*** with no inflation. 

* **Phase 1**: Buffer Phase. In Phase 1 a fixed amount of 10,000 VX will be released daily. Phase 1 ends on December 6, 2019.

* **Phase 2**: Standard Phase. In this phase, all un-mined VX will be released according to below schedule:

  * Sub-phase 1: Starting at 10,000 from December 7, 2019, daily release will increase for 90 days at a fixed rate of **1.80435%**, until reaching **50,000** on March 6, 2020
  * Sub-phase 2: Starting from March 7, 2020, daily release decreases at a rate of **0.189724%**

![](~/images/vx-release-schedule.png)


### VX Mining Allocation

The daily amount of released VX will be allocated according to the breakdown below:

* Trading, Referring and Listing: ***60%***
  - BTC market: ***15%***
  - ETH market: ***15%***
  - VITE market: ***15%***
  - USDT market: ***15%***
* Staking: ***20%***
* Market-making: ***10%***
* Vite team: ***10%***

### VX Holder Dividends

All fees collected by the ViteX platform will be collected into a shared dividend pool and distributed at a rate of **1%** daily. For any given day, the total fees collected during that day will be fully distributed by the 100th day.

* **This shared dividend pools will consist of the following**: 
  - All **trading fees** collected by ViteX (excluding Operator fees)
  - Starting from December 8, 2019, all **VITE** in the dividend pool will be destroyed

* **In order to receive dividends**:
  - You must stake **a minimum of 10 VX** in the exchange. Please note that VX held in a wallet account will not make you eligible for dividends — the VX must be staked on the ViteX exchange's Dividends tab in order to be considered for dividend rewards.

## VX Mining

### Trading as Mining

Currently, users are able to trade in four markets: BTC, ETH, VITE and USDT and receive VX rewards accordingly.

* **Allocation**: As mentioned above, ViteX is currently divided into four different markets: BTC, ETH, VITE and USDT. By trading in these markets, users are able to receive VX mining rewards. Each market will receive 15% of daily distributed VX. 
* **How to participate**: By executing trades on **eligible trading pairs** and paying the corresponding trading fees, users mine VX (Trading as Mining). 
* **Mining reward calculation**: VX rewards are calculated based on the proportion of a user's daily accumulated trading fee to the total accumulated fees in each market. For example, for a given day, if a trader accumulates 5% of the total BTC market trading fees, then that trader will receive 5% of the 15% of VX rewards allocated to the BTC market. 
    
### Staking as Mining

By staking VITE to help ViteX obtain necessary quota, users receive VX rewards.

* **Allocation**: 20% of daily released VX
* **How to participate**: stake VITE with the beneficiary set to the ViteX smart contract
  * **Staking amount**: the minimum amount of VITE that users can stake is 134 VITE. There is no maximum cap.
  * **Staking duration**: if a user stakes his or her VITE, they will be able to withdraw it after 3 days. There is no maximum number of days for staking VITE (i.e. users can stake VITE indefinitely if they want to). It takes 7 days for the retrieved tokens to arrive in user's account.
  
  Note: after the staking amount is retrieved, it will not be counted towards staking as mining rewards. The user must re-stake VITE in order to participate in staking as mining rewards.
* **Mining reward calculation** : the amount of VX rewards will be calculated based on the proportion of VITE staked by a user's account to the total amount of VITE staked that day. 
  
### Market-making as Mining

Placing orders on ViteX will also earn users VX rewards. The amount of VX earned depends on three factors: 1) the amount of order, 2) the amount of time your order remains on the order book, and 3) the amount of deviation from the best bid and best offer in the order book spread. 

* **Allocation**: 10% of daily released VX
  - BTC market **5%**
  - ETH market **1.5%**
  - VITE market **1.5%**
  - USDT market **2%**
* **How to participate**: stake VITE with the beneficiary set to the ViteX smart contract
  - Only eligible trading pairs will be considered for market-making as mining rewards
  - The orders must not deviate more than 10% from the best buy/sell offer in the order book

> The VX mining reward for market-making has a linear relationship with the **order amount** and **order duration** (i.e. amount of time the pending order stays on the order book). 
However, the mining reward has an exponential relationship with the **order distance** (i.e. the deviation from the best bid offer). 
> For example, if Alice and Bob both place two separate orders for the same amount of token X. Both orders remain on the order book for the same amount of time. However, Alice prices her order at distance of 1% (i.e., very close to the best bid offer) and Bob prices his order at distance of 10% (i.e. further away from the best bid offer), the mining reward for Alice will be 63 times that of Bob's. This system is designed to incentive users to place orders as close to the best bid offer as possible.

* **Calculation rules**:
  * **Mining interval** ($M_{INT}$) and **mining threshold** ($TH$): Buy orders that are set within mining threshold from the best buy offer in the order book will be considered for mining rewards. For most of trading pairs the mining threshold is **10%**, however, different mining thresholds are also allowed. For threshold table please refer to: [Mining Thresholds](./mining-threshold.html).
      
    $TH = 10\%$
      
    $M_{INT} = [{Best Buy Order} * (1-TH), {Best Buy Order})$
          
  * **Buy cap** ($B_{max}$): The maximum ratio of VX eligible being mined by one buy order to best sell order. The value varies among different markets.
  
  * **Sell cap** ($S_{max}$): The maximum ratio of VX eligible being mined by one sell order to best buy order. The value varies among different markets.
  
  * **Order duration** ($T$): A buy order must stay pending on the **mining level** for at least **300** seconds. Orders placed for less than **300** seconds will not be considered for the mining reward.

  * **Total amount of buy orders** ($A_{buy}$): The sum of unfilled amount of all buy orders in the **mining interval** for one trading pair

  * **Total amount of sell orders** ($A_{sell}$): The sum of unfilled amount of all sell orders in the **mining interval** for one trading pair
    
  * **Actual pending order amount** ($\beta$): The unfilled amount of a user's pending order within a certain time range

  * **Valid pending order amount** ($a$): The unfilled amount of a user's pending order within a certain time range **valid** for mining VX. The value is related to $B_{max}$, $S_{max}$, $A_{buy}$ and $A_{sell}$.

  ***If the order is a buy order***:

    * If $A_{sell}$ > $A_{buy}$, $a= \beta$

    * If $A_{sell}$ <= $A_{buy}$

      * When $B_{max} < \frac{A_{buy}}{A_{sell}}$, $a = \frac{\beta B_{max}}{\frac{A_{buy}}{A_{sell}}}$

      * When $B_{max} >= \frac{A_{buy}}{A_{sell}}$, $a = \beta$

  ***If the order is a sell order***:

    * If $A_{sell}$ > $A_{buy}$

      * When $S_{max} < \frac{A_{sell}}{A_{buy}}$, $a = \frac{\beta S_{max}}{\frac{A_{sell}}{A_{buy}}}$

      * When $S_{max} >= \frac{A_{sell}}{A_{buy}}$, $a = \beta$

    * If $A_{sell}$ <= $A_{buy}$, $a= \beta$
        
  * **Order distance** ($d$): The amount of deviation from the user's buy order to the best buy offer. 
    
      $d = \frac {Best Buy Order - User Order} {Best Buy Order}$
      
      If the percentage deviation is greater than **threshold** ($TH$), the order will not be considered for mining rewards. If the deviation is less than **threshold** ($TH$), the g value will be: 
            
    * **Unchanged order time** ($t$): refers to the amount of time a buy order sits in the order book with a set **amount** ($a$) at a given **distance** ($d$). This value is different from the **order duration** ($T$) mentioned above. The latter is the cumulative time of the pending order. 
            
      $T = t_1 + t_2 + t_3 + ... + t_n$
      
      For example, Alice placed an order to buy 500 token X at price of $10 at 10:00:00.
      
      At 10:01:00, the order was 50% filled and the remaining order amount is 250. For this partial fill, the pending order amount, $a_1 = 500$.  
      
      At 10:05:00, the order was completely filled. For this transaction, the pending order amount, $a_2 = 250$.
      
      Assuming that **order distance** ($d$) has not changed between 10:00:00 to 10:05:00, the **unchanged order time** for Alice is:
        * 10:00:00 ~ 10:01:00, $t_1$ = 60 seconds
        * 10:01:00 ~ 10:05:00, $t_2$ = 240 seconds
        
      Following this, the order duration, T, would be $T = t_1 + t_2 = 60 + 240 = 300 
      
    * **Market-making points** ($m$): this variable is calculated using **unchanged order time** ($t$), **pending order amount** ($a$) and **order distance** ($d$)
    
      $m = t * a * 0.6^{1+\frac{9}{TH} * d} \ | \ \{0 < d <= TH\}$
      
    * $M$: The sum of market-making points from all eligible orders for the user within the market on a given day.
    
      $M = m_1+ m_2 + m_3 + ... + m_n$
      
      Returning to Alice's example, her M value would be calculated as follows:
      
      Assume the best buy order is $11 and remains at $11 for the duration of Alice's order:
      
      $d = \left \lceil \frac {11 - 10} {11} \right \rceil = 0.1$ 
      
      $M = t_1 * a_1 * 0.6^{1+\frac{9d_1}{TH}} + t_2 * a_2 * 0.6^{1+\frac{9d_2}{TH}}$

         = $60 * 500 * 0.6^{1+\frac{9 * 0.1}{0.1}} + 240 * 250 * 0.6^{1+\frac{9 * 0.1}{0.1}}$
         
         = 544.195584
    
    * $V$: The amount of VX mined by the user in the market on a given day
    
    * $M_{all}$: The sum of market-making points of all users in the market.
    
    * $H$: Total amount of VX released on a given day
    
    **VX mined by the user in one market per day**:
    
    $V = \frac{M} { M_{all}} *0.025*H$ 

  
### Referring as Mining

  User can request invitation codes to invite friends to join the ViteX platform. 
  * **For invitees, they will**:
    - Enjoy a **10%** discount on trading fees on the ViteX platform
    - Get a "bonus" of **2.5%** on the transaction fees generated
    - Get a "bonus" of **1.25%** on the market-making points generated
    
  * **The inviter will**:
    - Receive a "commission" of **5%** on all transaction fees generated by the invitees
    - Receive a "commission" of **2.5%** on all market-making points generated by the invitees
  
  * **How to participate**:
    - Apply for a referral code at [Vite Web Wallet](https://x.vite.net)
    - If you are approved, you will get a referral code that you can send to your friends
  
  * **How to generate a referral code**:
    - In order to obtain a referral code, the user will also need to pay 1,000 VITE, of which 100% will be burned.
  
  * **Mining reward calculation**:
  
    As an example, let’s say Bob gets a referral code from Alice. When Bob signs up and starts trading on ViteX, he gets 10% off of all trading fees (Base Transaction Fee + any applicable Operator Fees) on ViteX. 
    Alice, on the other hand, benefits from Bob’s trading activity as 5% of Bob’s accumulated trading fees count for Alice’s accumulated trading fees. For example, if Bob accrues $100 in trading fees and Alice accrues $200, Alice will effectively have $205 in accumulated trading fees while Bob will have $102.5 as he is rewarded with additional 2.5% of his own trading fees.

  :::warning Note
  If you are a ViteX VIP (users who have staked 10,000 VITE to obtain a 0.1% reduction in trading fees) AND joined ViteX via a referral code, your 10% discount will be applied after the 0.1% reduction.
  :::  
    
### Listing as Mining

  Whenever a trading pair is opened on ViteX, the issuer is required to pay 10,000 VITE. Of this 10,000 VITE, 5,000 VITE will be burned and the other 5,000 VITE will go into the shared dividend pool. The token issuer’s VX reward is then calculated as if he/she executed a trade involving a transaction fee of 1,000 VITE.
  
  For example, if Alice listed a trading pair, her VX reward on the given day would be calculated as follows:
  
  $$\frac {1000} {Total Transaction Fees(VITE \ Market)} * 15\% * {Daily Released VX}$$
  
## Transaction Fee Model

All trading actions on ViteX will incur a fee provided that the orders are successfully matched. No trading fees will be triggered if the order is not processed. 

### Transaction Fee Formula

***Total Transaction Fee = Base Transaction Fee + Operator Fee***

:::tip Tips
Unlike other DEXes, ViteX does not charge fees for pending orders and withdrawals provided that users have the requisite amount of quota. Related documentation: [What is quota](../tutorial/rule/quota.html). 
:::

**Base Transaction Fee**: ***0.2%***

This transaction fee will be applied to all trading pairs in the ViteX ecosystem. All the fees collected from this will be put into the shared dividend pool to be redistributed back to VX holders. 

**Operator Fee**: ***0 - 0.2%***

This is the fee that will be set by ViteX Operators for their respective Zones. Operators may set fees ranging from 0% to 0.2%. Proceeds from this fee belong to the Operators. 

### Reducing Transaction Fees

#### Stake 10,000 VITE to Become a ViteX VIP

Users can stake 10,000 VITE to reduce the **Base Transaction Fee** by 0.1%. 

Minimum Staking Duration: **30 days**

#### Get a Friend Referral Code

Users that sign up for ViteX via a referral code will get a 10% discount on the Total Transaction Fee. 

:::warning Note

If the user is a VIP user, his or her fee will first be reduced by 0.1% followed by an additional 10% off the Total Transaction Fee.

For example, if the VIP user who joined via a referral code trades on a Zone with a 0.15% Operator Fee, the final fee for this user is: $((0.2\% - 0.1\%) + 0.15\%)*90\% = 0.225\%$.

:::

## ViteX Operators & Token Issuers

ViteX adheres to the principles of openness and transparency. As such, ViteX allows anyone to operate their own decentralized exchanges, called Zones, on ViteX. Within their respective Zones, Operators can list trading pairs, customize transaction fees, and generate profits from users that choose to trade on their Zone.

### Token Issuer ("Issuer")

An Issuer is classified as anyone who issues a token on the Vite platform. By default, the rights to list a token trading pair belongs to the Issuer. However, the Issuer can transfer rights to their token to other entities (such as an Operator). 

For example, Alice issues Token A on the Vite chain. As the Issuer, Alice has the rights to Token A. If Bob wants to list a Token A / BTC trading pair, he will need Alice to first transfer the rights to Token A before he can list. 

### ViteX Operator ("Operator")

#### On-Chain Functions

On-chain functions of the Operators include listing trading pairs and setting transaction fees. As mentioned earlier, Operators have the option to set an additional transaction fee of up to 0.2% on top of the Base Transaction Fee. Additionally, Operators have the right to manage the trading pairs listed on their respective Zones. 

Per the example above, if Alice decides to transfer the rights to Token A and allow Bob to list the Token A / BTC trading pair, Bob becomes an Operator. He can then set the transaction fee for trades involving Token A / BTC. 

#### Off-Chain Functions

If an Operator lists several trading pairs using several addresses, collectively they are considered to be a Zone. The Zone run by an Operator can be thought as a business operation. As such, off-chain, Operators are responsible for promoting and marketing their respective Zones to attract more users and promote their business.

### ViteX Operator Rights

#### Token Ownership Rights

By default, the token ownership rights belong to the Issuer. However, the Issuer can transfer the rights to their token to a third party. Once they do so, the third party has full access to the token and can list trading pairs.

* **Listing Trading Pairs**

Only the token owner can list trading pairs involving the token he or she owns. 
In the case of ViteX, only **BTC/ETH/USDT/VITE** trading pairs can be listed. Attempting to open trading pairs to other cryptocurrencies will be rejected.

* **Transferring Token Ownership**

Token ownership can be transferred. The transfer of token ownership is irreversible. 

:::warning Note
A cost of 10,000 VITE is required to open a trading pair.
:::

#### Token Trading Rights

If an Issuer does not want to fully transfer the rights to his or her token, the Issuer can choose to transfer the Token Trading Rights instead. 
For example, the Issuer can first list a trading pair (i.e. Token A / BTC) and transfer the rights to this specific trading pair to a third party. 
In this case, the third party now has the right to the Token A / BTC pair — they cannot open additional trading pairs to other cryptocurrencies but can transfer their Token A / BTC right to another party should they wish to.

* **Setting Transaction Fee**

Operators have the right to set an additional transaction fee (on top of the Base Transaction Fee) of 0 - 0.2%. Operators also reserve the right to adjust these fees. 

* **Trade Suspension**

The Operator reserve the right to suspend a trading pair. After they do so, the user cannot place orders involving the given trading pair but can withdraw the order if they already had one in place. 

* **Transferring Token Trading Right**

Token trading right can be transferred. The new owner will become the Operator of the trading pair. This operation is irreversible. 

:::warning Attention

The **token ownership right** and **token trading right** are two independent sets of rights. 

For example, Alice is the Issuer of Token A, so by default, she has the token ownership right to Token A. At the moment, only Alice can open trading pairs involving Token A.
Now, Alice decides to open a trading pair: Token A / BTC. Now, she has two"sets" of rights: 1) Ownership of Token A and 2) Token A / BTC Trading.

If Alice transfer the right of Token A / BTC to Bob, Alice now no longer has the right to list Token A / BTC pair. The transfer of trading rights to Bob is irreversible. However, since Alice still has the token A ownership rights, she decides to open another trading pair of Token A / ETH.
Now, if Alice decides to transfer the Token A Ownership right to Charles, she permanently loses that right and can no longer open any additional trading pairs involving Token A. However, Alice still owns the Token A / ETH trading pair despite no longer having the Token A Ownership rights.

:::
 
  

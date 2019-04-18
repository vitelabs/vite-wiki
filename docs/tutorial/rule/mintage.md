# Mintage

::: tip
Please note this is not a technical document, but mainly introduces asset issuance on Vite. Technical details will be provided in the yellow paper.

The Definitions of Terms:
* **Token**： A digital asset
* **Mintage**： The process of issuing new tokens
* **Mintage transaction**： A special transaction through which users can issue tokens
:::

## What is Token?

In Ethereum, new token can be issued by deploying a smart contract that complies with Ethereum's token standard, such as ERC20. 
During this process, an amount of token corresponding to total supply are generated and a map of token holding relationship is maintained within the contract. 
Token transfers will not change the status of accounts, but the contract itself.

Vite supports two types of tokens, Vite native token **VITE** and user-issued tokens. 
In addition to being traded, **VITE** can also be staked for obtaining quota, but user-issued tokens can only be used for trading. 
User-issued token includes fixed-supply token and re-issuable token.

In Vite, users can send a mintage transaction to issue new token by specifying token type(re-issuable or fixed), total supply, token name, token symbol, and optional maximum supply if the token is re-issuable. 
After mintage is successful, the amount of total supply of issued tokens will be sent to token issuer's account. Unlike Ethereum, each account maintains its own balance. Both sender's and receiver's accounts status will be modified during transfer.

For re-issuable token, token owner can send re-issuance transaction to mint additional tokens after first issuance, and the total supply will increase accordingly. 
Similarly, re-issuable token can be destroyed by burning a certain amount of tokens through burn transaction, which will reduce total supply of the token. 
The ownership of re-issuable token can be transferred, also the token type can be changed to fixed-supply.

## Mintage Process

Mintage transaction is always initiated by token owner by calling built-in mintage contract and specifying necessary parameters. 
Once the transaction is accepted, mintage contract will transfer the amount of total supply of token to owner's account. 

Mintage transaction will charge a certain fee in two alternative ways:

* Burn ***1,000 VITE***, or
* Stake ***100,000 VITE***, which can be retrieved in **7776000** snapshot blocks(about 3 months). The token issued will continue to be effective.

### Parameters

* `tokenId`: The unique token id, generated automatically during mintage transaction
* `tokenName`: **1**-**40** characters token name, including uppercase and lowercase letters, spaces and underscores. Cannot have consecutive spaces; cannot begin or end with spaces
* `tokenSymbol`: **1**-**10** characters token symbol, including uppercase and lowercase letters, spaces and underscores. Cannot have consecutive spaces; cannot begin or end with spaces
* `totalSupply` and `decimals`: Having $totalSupply \times 10^{decimals} \leq 2^{256}-1$
* `isReIssuable`: Token type. Fixed-supply or re-issuable.
* `maxSupply`: Maximum supply. Mandatory for re-issuable token. Having $maxSupply \leq 2^{256}-1$
* `ownerBurnOnly`: Whether the token can be burned by owner only. Mandatory for re-issuable token.

## Re-issuance Process

Re-issuance transaction is always initiated by token owner by calling built-in mintage contract and specifying necessary parameters. 
Once the transaction is accepted, mintage contract will transfer the newly minted amount of token to the specified account. 

### Parameters

* `tokenId`: The unique id of re-issuable token
* `amount`: Re-issuance amount. Having $newTotalSupply = oldTotalSupply+amount$
* `beneficial`: Account address to receive newly minted tokens

## Burn Process

Burn transaction can be initiated either by token owner or holders by calling built-in mintage contract, specifying necessary parameters and transferring the certain amount of tokens. 
Once the transaction is accepted, the total supply of the token will decrease accordingly. 

The target token may be marked only owner is allowed to perform destruction, otherwise all holders can burn their token.

### Parameters

* `tokenId`: The unique id of re-issuable token
* `amount`: Burn amount. Having $newTotalSupply = oldTotalSupply-amount$. Destroyed tokens will be deducted from the account of transaction initiator.

## Tokens in Vite

In addition to native token **VITE**, two other tokens **VCP**(Vite Community Points) and **VTT**(Vite Test Token) were issued in Vite TestNet. The specific parameters are as follows:

| Token Id | Token Name | Token Symbol | Total Supply | Decimals |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|
| tti_5649544520544f4b454e6e40 | Vite Token | VITE | 1 billion | 18 |
| Subject to specific network | Vite Community Point | VCP | 10 billion | 0 |
| Subject to specific network | Vite Test Token | VTT | 1 billion | 18 |

## FAQ

* Can I issue multiple tokens with my account?

Yes, you only need to initiate multiple mintage transactions.

* Can I issue token with existing token name and token symbol?

Yes. Token name and symbol can be reused.

* Does mintage transaction consume quota?

Yes. Token issuance, re-issuance, burning, ownership transfer and modification of token type need to consume quota. For specific consumed amount please refer to [Quota Usage Rules](./quota.html#quota-usage-rules).

* Does re-issuance transaction need to destroy **VITE**?

No, re-issuance transaction does not consume **VITE**.

* Can I change fix-supply tokens to re-issuable?

No. Change of token type is one-way only.

* I issued my token by staking. Can I continue to have the token after I retrieve staking after 3 months?

Yes. Issued token is effective forever, no matter whether staked **VITE** is retrieved or not.

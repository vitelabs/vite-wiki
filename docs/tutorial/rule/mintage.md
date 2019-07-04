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
In addition to being traded, **VITE** can also be staked for obtaining quota. User-issued tokens can only be traded. 
User-issued token includes fixed-supply token and re-issuable token.

In Vite, users can send a mintage transaction to issue new token by specifying token type(re-issuable or fixed), total supply, token name, token symbol, and optional maximum supply if the token is re-issuable. 
After mintage is successful, the amount of total supply of issued tokens will be sent to token issuer's account. Unlike Ethereum, each account maintains its own balance. Both sender's and receiver's accounts status will be modified during transfer.

For re-issuable token, token owner can send re-issuance transaction to mint additional tokens after first issuance, and the total supply will increase accordingly. 
Similarly, re-issuable token can be destroyed by burning a certain amount of tokens through burn transaction, which will reduce total supply of the token. 
The ownership of re-issuable token can be transferred, also the token type can be changed to fixed-supply.

## Mintage

Mintage transaction is the transaction of issuing a new token on Vite. The issuer can send mintage transaction to mintage contract with passed-in parameters. 
Once the transaction is processed successfully, a total supply amount of tokens will be sent to the issuer's account and the issuer is assigned as owner.

Mintage transaction will burn ***1,000 VITE***.

### Parameters

* `tokenName`: **1**-**40** characters token name, including uppercase and lowercase letters, spaces and underscores. Cannot have consecutive spaces; cannot begin or end with spaces
* `tokenSymbol`: **1**-**10** characters token symbol, including uppercase and lowercase letters and numbers. Existing names like VITE, VCP and VX cannot be reused.
* `totalSupply` and `decimals`: Having $totalSupply \times 10^{decimals} \leq 2^{256}-1$
* `isReIssuable`: Token type. Fixed-supply or re-issuable.
* `maxSupply`: Maximum supply. Mandatory for re-issuable token. Having $maxSupply \leq 2^{256}-1$
* `ownerBurnOnly`: Whether the token can be burned by owner only. Mandatory for re-issuable token.

## Re-issuance

Re-issuance transaction is always initiated by token owner by calling mintage contract and specifying necessary parameters. 
Once the transaction is processed successfully, mintage contract will transfer the newly minted tokens to the specified account. 

### Parameters

* `tokenId`: The unique id of a re-issuable token
* `amount`: Re-issuance amount. Having $newTotalSupply = oldTotalSupply+amount$
* `beneficial`: Account address to receive newly minted tokens

## Burn

Burn transaction can be initiated either by token owner or holders, by calling mintage contract's 'burn' method and feeding the amount of tokens to be burned. 
Once the transaction is processed successfully by the contract, the token's total supply will be reduced to reflect the change. 

`ownerBurnOnly` is used to specify whether the token can only be burned by the owner. If this flag is turned on, only token's owner has privilege for token destruction, otherwise all token holders can burn their own tokens.

### Parameters

* `tokenId`: The unique id of a re-issuable token
* `amount`: Burn amount. Having $newTotalSupply = oldTotalSupply-amount$. Destroyed tokens will be deducted from the account of transaction initiator.

## Transfer Ownership

Ownership of re-issuable tokens can be transferred. In this case, the token owner should send a ownership-transfer transaction to mintage contract, specifying necessary parameters, once the transaction is processed successfully, the ownership of the token has been transferred to new owner.

A certain token can have only one owner at a moment. 

### Parameters
* Token id: The unique id of a re-issuable token
* Account address: The new owner's account address

## Change Token Type

Re-issuable tokens can be changed to non-reissuable, or fixed-supply, tokens. However, this process is one-way only, meaning once the type is changed, it cannot be changed back. 
In this case, the token owner should send a transaction to mintage contract, specifying necessary parameters, once the transaction is processed successfully, the token type is modified to be non-reissuable tokens.

### Parameters
* Token id: The unique id of a re-issuable token

## Tokens in Vite

In addition to native token **VITE**, two other coins **VCP**(Vite Community Points) and **VX**(ViteX Coin) were issued in Vite. The specific parameters are as follows:

| Token Id | Token Name | Token Symbol | Total Supply | Decimals |
|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|
| tti_5649544520544f4b454e6e40 | Vite Token | VITE | 1 billion | 18 |
| tti_251a3e67a41b5ea2373936c8 | Vite Community Point | VCP | 10 billion | 0 |
| tti_564954455820434f494e69b5 | ViteX Coin | VX | 100,000,000 | 18 |

## FAQ

* Can I issue multiple tokens in my account?

Yes, all you need to do is to send multiple mintage transactions.

* Can I issue token with existing token name and token symbol?

Yes. Token name and symbol can be reused.

* Does mintage transaction consume quota?

Yes. Token issuance, re-issuance, burning, ownership transfer and change of token type need to consume quota. For specific consumption table please refer to [Quota Consumption Rules](./quota.html#quota-consumption-rules).

* Does re-issuance transaction need to destroy **VITE**?

No, re-issuance transaction does not consume **VITE**.

* Can I change fix-supply tokens to re-issuable?

No. Change of token type is one-way only and not reversible.

---
sidebarDepth: 4
---

# Asset & Token Issuance API

## Issue New Token
```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.issueToken(keyPair,
        new IssueTokenParams()
                .setReIssuable(true)
                .setTokenName("Test Token")
                .setTokenSymbol("TT")
                .setTotalSupply(BigInteger.valueOf(10000L))
                .setMaxSupply(BigInteger.valueOf(20000L))
                .setDecimals(1)
                .setOwnerBurnOnly(false));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Re-issue Token

Mint an additional amount of token and increase token's total supply

```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.reIssue(keyPair, new TokenId("tti_10b56995f5d6a6e1f9a60441"), BigInteger.valueOf(100), keyPair.getAddress());
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Burn Token

Burn an amount of token and decrease token's total supply

```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.burn(keyPair, new TokenId("tti_10b56995f5d6a6e1f9a60441"), BigInteger.valueOf(100));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Transfer Token Ownership

Ownership of token can be transferred to another address. When a token is firstly issued, the token owner is the issuer. 

```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.transferOwnership(keyPair, new TokenId("tti_10b56995f5d6a6e1f9a60441"), new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Disable Token Re-issuance

Change a re-issuable token to non-reissuable. 

:::warning One-way Operation
Be careful with this method. The operation can not be reversed.
:::

```java
Vitej vitej = new Vitej(new HttpService());
Request<?, EmptyResponse> request = vitej.disableReIssue(keyPair, new TokenId("tti_10b56995f5d6a6e1f9a60441"));
EmptyResponse response = request.send();
Preconditions.checkArgument(response.getError() == null);
Preconditions.checkArgument(ProtocolUtils.checkCallContractResult(vitej, ((TransactionParams) request.getParams().get(0)).getHashRaw()));
```

## Get Token List

```java
Vitej vitej = new Vitej(new HttpService());
TokenInfoListWithTotalResponse response = vitej.getTokenInfoList(
        // page index. start at 0
        0,
        // page size
        10
).send();
// total token nunmber
Integer count = response.getResult().getTotalCount();
// token list
List<TokenInfo> tokenInfoList = response.getResult().getTokenInfoList();
```

## Get Token Summary

```java
Vitej vitej = new Vitej(new HttpService());
TokenInfoResponse response = vitej.getTokenInfoById(
        // token id
        new TokenId("tti_5649544520544f4b454e6e40")
).send();
TokenInfo tokenInfo = response.getResult();
```

## Get Token List (by owner)

```java
Vitej vitej = new Vitej(new HttpService());
TokenInfoListResponse response = vitej.getTokenInfoListByOwner(
        new Address("vite_0996e651f3885e6e6b83dfba8caa095ff7aa248e4a429db7bd")
).send();
List<TokenInfo> tokenInfo = response.getResult();
```

---
sidebarDepth: 4
---

# Wallet

In ViteJ, a wallet instance contains a mnemonic phrase, and is able to derive up to 100 public/private key pairs. One private key uniquely determines a Vite address.

## Wallet Instance
```java
// create new wallet instance
Wallet wallet0 = new Wallet();
// recover wallet from mnemonic phrase
Wallet wallet1 = new Wallet(Arrays.asList("network","north","tell","potato","predict","almost","wonder","spirit","wheel","smile","disease","bonus","round","flock","pole","review","music","oven","clarify","exclude","loyal","episode","image","notable"));
Wallet wallet2 = new Wallet("network north tell potato predict almost wonder spirit wheel smile disease bonus round flock pole review music oven clarify exclude loyal episode image notable");
// export mnemonic phrase from wallet
List<String> mnemonic = wallet.getMnemonic();
```
## Address Derivation
```java
// address 0
KeyPair keyPair0 = wallet.deriveKeyPair();
// address 1
KeyPair keyPair1 = wallet.deriveKeyPair(1);
```

## Key Pairs
```java
// get public key
byte[] publicKey = keyPair.getPublicKey();
// get private key
byte[] privateKey = keyPair.getPrivateKey();
// get address
Address address = keyPair.getAddress();
```

## Signature and Verification
```java
byte[] message = BytesUtils.hexStringToBytes("7683bbc8be1391172ed21cc1fe0843ac3b1311109aa329601b73f717e6a93b53");
// sign
byte[] signedData = keyPair.sign(message);
// verify signature
boolean verified = Crypto.verify(signedData, message, keyPair.getPublicKey());
```




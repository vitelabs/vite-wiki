---
sidebarDepth: 4
---

# 钱包

通过助记词生成一个钱包（Wallet），一个钱包可以派生出最多10个公私钥对（KeyPair），一个公私钥对对应一个地址。

## 创建钱包
```demo
// 创建新钱包
Wallet wallet = new Wallet();
// 根据助记词恢复钱包
Wallet wallet = new Wallet(Arrays.asList("network","north","tell","potato","predict","almost","wonder","spirit","wheel","smile","disease","bonus","round","flock","pole","review","music","oven","clarify","exclude","loyal","episode","image","notable"));
// 或者
Wallet wallet = new Wallet("network north tell potato predict almost wonder spirit wheel smile disease bonus round flock pole review music oven clarify exclude loyal episode image notable");
// 获取钱包的助记词
List<String> mnemonic = wallet.getMnemonic();
```
## 从钱包派生地址
```demo
// 第0个地址
KeyPair keyPair = wallet.deriveKeyPair();
// 第1个地址
KeyPair keyPair1 = wallet.deriveKeyPair(1);
```

## 公私钥对
``` 
// 生成公钥
byte[] publicKey = keyPair.getPublicKey();
// 生成私钥
byte[] privateKey = keyPair.getPrivateKey();
// 生成地址
Address address = keyPair.getAddress();
```

## 签名和校验
```
byte[] message = BytesUtils.hexStringToBytes("7683bbc8be1391172ed21cc1fe0843ac3b1311109aa329601b73f717e6a93b53");
// 对message进行签名
byte[] signedData = keyPair.sign(message);
// 利用publicKey验证签名结果
boolean verified = Crypto.verify(signedData, message, keyPair.getPublicKey());
```




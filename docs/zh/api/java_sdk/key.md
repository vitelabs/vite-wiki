# Wallet 管理工具

:::tip 维护者
[Eric](https://github.com/roymoro)
:::

## 说明
用于助记词派生和公私钥及地址管理

## Key.createBip39Mnemonic

获得一个账户的交易列表

- **Parameters**: 

- **Returns**:  ` List<String>` 助记词列表
  
- **Example**:

```java
        List<String> mnemonics = Key.createBip39Mnemonic();
        System.out.println(JSONObject.toJSONString(mnemonics));
        // ["type","rabbit","host","pitch","neither","series","ecology","broom","salt","carbon","hunt","mean","smile","net","exact","grape","onion","loop","nice","dirt","abstract","hen","stumble","lunar"]
```

## Key.getKeyPairFromMnemonics
根据助记词生成公私钥管理工具
- **Parameters**: 
   * @param mnemonics 助记词，只支持24个助记词
   * @param index 派生地址序号
- **Returns**:  `Key` 公私钥管理工具
  
- **Example**:

```java tab:Request
        Key key = Wallet.getKeyPairFromMnemonics("humble category output craft giant reform weapon business dinner gentle club diagram goat recycle cactus leopard library ship offer output history lake harvest struggle", 0);
```

## Key.build
根据助记词生成公私钥管理工具
- **Parameters**: 
   * @param privateKeyHex 私钥
- **Returns**:  `Key` 公私钥管理工具
  
- **Example**:

```java tab:Request
      Key key = Key.build("fca1e0220b6d27345ca1e504833eabbe6c0ca44be8af4944ffb69ad8559c0c08");
```

## Key.getAddressFromPrivateKey
根据私钥派生vite地址
- **Parameters**: 
   * @param privateKeyHex 私钥
- **Returns**:  `Address` vite地址
  
- **Example**:

```java tab:Request
  String address = Key.getAddressFromPrivateKey("fca1e0220b6d27345ca1e504833eabbe6c0ca44be8af4944ffb69ad8559c0c08");
```

## Key.getPubKeyBase64FromPrivateKey
根据私钥派生vite地址
- **Parameters**: 
   * @param privateKeyHex 私钥
- **Returns**:  `pubKeyBase64` 公钥base64形式
  
- **Example**:

```java tab:Request
        String pubKeyBase64 = Key.getPubKeyBase64FromPrivateKey("fca1e0220b6d27345ca1e504833eabbe6c0ca44be8af4944ffb69ad8559c0c08"); 
```

## getHexAddress
 获取十六进制的地址
- **Parameters**: 
- **Returns**:  获取十六进制的地址
  
- **Example**:

```java tab:Request
        Key key1 = Key.getKeyPairFromMnemonics("humble category output craft giant reform weapon business dinner gentle club diagram goat recycle cactus leopard library ship offer output history lake harvest struggle", 0);
        key1.getHexPubKey();
        //      vite_8c89b353c29a06c957d2776a3e4b8165a962adc6b7b0105e45
```

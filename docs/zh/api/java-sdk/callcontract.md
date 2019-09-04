# CallContract

:::tip 
发送交易 维护者[Eric](https://github.com/roymoro)
:::

## 说明


## CallContract.callContract
获得一个账户的交易列表

- **Parameters**: 
  * `ViteJ` : `viteJ` 连接器  
  * `CallContractReq` : `callContractReq` 合约请求
- **Returns**:  `SendTransactionRes` 交易状态，成功包含send块的hash值
  
- **Example**:

::::tabs
:::tab Request
```java
   
       // 合约abi描述
       String abi = "[\n" +
                "  {\"type\":\"function\",\"name\":\"Register\", \"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"nodeAddr\",\"type\":\"address\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"UpdateRegistration\", \"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"Name\":\"name\",\"type\":\"string\"},{\"name\":\"nodeAddr\",\"type\":\"address\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"CancelRegister\",\"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"}, {\"name\":\"name\",\"type\":\"string\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"Reward\",\"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"beneficialAddr\",\"type\":\"address\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"Vote\", \"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"name\":\"nodeName\",\"type\":\"string\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"CancelVote\",\"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"}]}\n" +
                "]";
        
        // rpc连接器
        ViteJ viteJ = ViteJ.build("http://150.109.116.1:48132");
        Key key = Key.getKeyPairFromMnemonics("humble category output craft giant reform weapon business dinner gentle club diagram goat recycle cactus leopard library ship offer output history lake harvest struggle", 0);
       
        // 方法参数列表
        List<Object> params = new ArrayList<>();
        params.add("00000000000000000001");
        params.add("V666.fun");
        
        
        CallContractReq.Builder callContractBuilder = new CallContractReq.Builder();
        // abi 描述
        // methodName 调用方法名 Vote
        // 方法参数 params 
        // fromAddress 调用方地址
        // toAddress 合约地址 vite_0000000000000000000000000000000000000004d28108e76b 超级节点合约
        // tokenId 默认使用 vite tokenId  "tti_5649544520544f4b454e6e40"
        // amount 合约金额，根据实际情况, 超级节点不需要
        // needPow 转账使用pow还是配额，true 使用pow，需要全节点支持Pow计算； 根据地址配额抵押，需要为地址抵押
        // priKey 调用方私钥 
        callContractBuilder.abi(abi)
            .methodName("Vote")
            .params(params)
            .fromAddress(key.getHexAddress())
            .toAddress("vite_0000000000000000000000000000000000000004d28108e76b")
            .tokenId("tti_5649544520544f4b454e6e40")
            .amount("0")
            .needPow(true)
            .priKey(key.getHexPriKey());
        SendTransactionRes sendTxResCallContract = CallContract.callContract(viteJ, callContractBuilder.build());

        if (sendTxResCallContract.hasError()) {
            System.out.println(sendTxResCallContract.getError().getMessage());
        } else {
            System.out.println(sendTxResCallContract.getHash());
        }
    
    
```
:::

:::tab Response
```java
     SendTransactionRes sendTxResCallContract = CallContract.callContract(viteJ, callContractBuilder.build());
    
      if (sendTxResCallContract.hasError()) {
                System.out.println(sendTxResCallContract.getError().getMessage());
      } else {
                System.out.println(sendTxResCallContract.getHash());
      }    
```
:::
::::

### 超级节点投票合约调用

```java
   
       // 合约abi描述
       String abi = "[\n" +
                "  {\"type\":\"function\",\"name\":\"Register\", \"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"nodeAddr\",\"type\":\"address\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"UpdateRegistration\", \"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"Name\":\"name\",\"type\":\"string\"},{\"name\":\"nodeAddr\",\"type\":\"address\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"CancelRegister\",\"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"}, {\"name\":\"name\",\"type\":\"string\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"Reward\",\"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"beneficialAddr\",\"type\":\"address\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"Vote\", \"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"name\":\"nodeName\",\"type\":\"string\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"CancelVote\",\"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"}]}\n" +
                "]";
        
        // rpc连接器
        ViteJ viteJ = ViteJ.build("http://150.109.116.1:48132");
        Key key = Key.getKeyPairFromMnemonics("humble category output craft giant reform weapon business dinner gentle club diagram goat recycle cactus leopard library ship offer output history lake harvest struggle", 0);
       
        // 方法参数列表
        List<Object> params = new ArrayList<>();
        params.add("00000000000000000001");
        params.add("V666.fun");
        
        CallContractReq.Builder callContractBuilder = new CallContractReq.Builder();
        // abi 描述
        // methodName 调用方法名 Vote
        // 方法参数 params 
        // fromAddress 调用方地址
        // toAddress 合约地址 vite_0000000000000000000000000000000000000004d28108e76b 超级节点合约
        // tokenId 默认使用 vite tokenId  "tti_5649544520544f4b454e6e40"
        // amount 合约金额，根据实际情况, 超级节点不需要
        // needPow 转账使用pow还是配额，true 使用pow，需要全节点支持Pow计算； 根据地址配额抵押，需要为地址抵押
        // priKey 调用方私钥 
        callContractBuilder.abi(abi)
            .methodName("Vote")
            .params(params)
            .fromAddress(key.getHexAddress())
            .toAddress("vite_0000000000000000000000000000000000000004d28108e76b")
            .tokenId("tti_5649544520544f4b454e6e40")
            .amount("0")
            .needPow(true)
            .priKey(key.getHexPriKey());
        SendTransactionRes sendTxResCallContract = CallContract.callContract(viteJ, callContractBuilder.build());

        if (sendTxResCallContract.hasError()) {
            System.out.println(sendTxResCallContract.getError().getMessage());
        } else {
            System.out.println(sendTxResCallContract.getHash());
        }
    
```

### 超级节点取消投票

```java
   
       // 合约abi描述
       String abi = "[\n" +
                "  {\"type\":\"function\",\"name\":\"Register\", \"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"nodeAddr\",\"type\":\"address\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"UpdateRegistration\", \"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"Name\":\"name\",\"type\":\"string\"},{\"name\":\"nodeAddr\",\"type\":\"address\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"CancelRegister\",\"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"}, {\"name\":\"name\",\"type\":\"string\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"Reward\",\"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"beneficialAddr\",\"type\":\"address\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"Vote\", \"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"name\":\"nodeName\",\"type\":\"string\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"CancelVote\",\"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"}]}\n" +
                "]";
        
        // rpc连接器
        ViteJ viteJ = ViteJ.build("http://150.109.116.1:48132");
        Key key = Key.getKeyPairFromMnemonics("humble category output craft giant reform weapon business dinner gentle club diagram goat recycle cactus leopard library ship offer output history lake harvest struggle", 0);
       
        // 方法参数列表
        List<Object> params = new ArrayList<>();
        params.add("00000000000000000001");
        
        CallContractReq.Builder callContractBuilder = new CallContractReq.Builder();
        // abi 描述
        // methodName 调用方法名 Vote
        // 方法参数 params 
        // fromAddress 调用方地址
        // toAddress 合约地址 vite_0000000000000000000000000000000000000004d28108e76b 超级节点合约
        // tokenId 默认使用 vite tokenId  "tti_5649544520544f4b454e6e40"
        // amount 合约金额，根据实际情况, 超级节点不需要
        // needPow 转账使用pow还是配额，true 使用pow，需要全节点支持Pow计算； 根据地址配额抵押，需要为地址抵押
        // priKey 调用方私钥 
        callContractBuilder.abi(abi)
            .methodName("CancelVote")
            .params(params)
            .fromAddress(key.getHexAddress())
            .toAddress("vite_0000000000000000000000000000000000000004d28108e76b")
            .tokenId("tti_5649544520544f4b454e6e40")
            .amount("0")
            .needPow(true)
            .priKey(key.getHexPriKey());
        SendTransactionRes sendTxResCallContract = CallContract.callContract(viteJ, callContractBuilder.build());

        if (sendTxResCallContract.hasError()) {
            System.out.println(sendTxResCallContract.getError().getMessage());
        } else {
            System.out.println(sendTxResCallContract.getHash());
        }
    
    
```

### 超级节点收取奖励

调用地址需要时注册超级节点地址，收益地址需要也选择超级节点注册地址

```java
   
       // 合约abi描述
       String abi = "[\n" +
                "  {\"type\":\"function\",\"name\":\"Register\", \"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"nodeAddr\",\"type\":\"address\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"UpdateRegistration\", \"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"Name\":\"name\",\"type\":\"string\"},{\"name\":\"nodeAddr\",\"type\":\"address\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"CancelRegister\",\"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"}, {\"name\":\"name\",\"type\":\"string\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"Reward\",\"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"beneficialAddr\",\"type\":\"address\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"Vote\", \"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"},{\"name\":\"nodeName\",\"type\":\"string\"}]},\n" +
                "  {\"type\":\"function\",\"name\":\"CancelVote\",\"inputs\":[{\"name\":\"gid\",\"type\":\"gid\"}]}\n" +
                "]";
        
        // rpc连接器
        ViteJ viteJ = ViteJ.build("http://150.109.116.1:48132");
        Key key = Key.getKeyPairFromMnemonics("humble category output craft giant reform weapon business dinner gentle club diagram goat recycle cactus leopard library ship offer output history lake harvest struggle", 0);
       
        // 方法参数列表
        List<Object> params = new ArrayList<>();
        params.add("00000000000000000001");
        params.add("V666.fun");
        params.add("vite_cd62fb21fcfe56dfc74c40fb9ae5643a75124d1bce02f9f80c");
        
        CallContractReq.Builder callContractBuilder = new CallContractReq.Builder();
        // abi 描述
        // methodName 调用方法名 Vote
        // 方法参数 params 
        // fromAddress 调用方地址
        // toAddress 合约地址 vite_0000000000000000000000000000000000000004d28108e76b 超级节点合约
        // tokenId 默认使用 vite tokenId  "tti_5649544520544f4b454e6e40"
        // amount 合约金额，根据实际情况, 超级节点不需要
        // needPow 转账使用pow还是配额，true 使用pow，需要全节点支持Pow计算； 根据地址配额抵押，需要为地址抵押
        // priKey 调用方私钥 
        callContractBuilder.abi(abi)
            .methodName("Reward")
            .params(params)
            .fromAddress(key.getHexAddress())
            .toAddress("vite_0000000000000000000000000000000000000004d28108e76b")
            .tokenId("tti_5649544520544f4b454e6e40")
            .amount("0")
            .needPow(true)
            .priKey(key.getHexPriKey());
        SendTransactionRes sendTxResCallContract = CallContract.callContract(viteJ, callContractBuilder.build());

        if (sendTxResCallContract.hasError()) {
            System.out.println(sendTxResCallContract.getError().getMessage());
        } else {
            System.out.println(sendTxResCallContract.getHash());
        }
    
```

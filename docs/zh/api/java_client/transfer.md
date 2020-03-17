# 发送交易

:::tip 维护者
[Eric](https://github.com/roymoro)
:::

## sendRawTransaction
获得一个账户的交易列表

- **Parameters**: 
  * `ViteJ` : `viteJ` 连接器  
  * `SendTransactionReq` : `sendTxReq` 交易请求
- **Returns**:  `SendTransactionRes` 交易状态，成功包含send块的hash值
  
- **Example**:

::: demo

```java tab:Request
    ViteJ viteJ = ViteJ.build("http://150.109.116.1:48132");
    SendTransactionReq.Builder builder = new SendTransactionReq.Builder();
    // fromAddresss 发送地址  vite_d789431f1d820506c83fd539a0ae9863d6961382f67341a8b5ex
    // toAddress 接收地址 
    // tokenId tti_5649544520544f4b454e6e40 
    // amount 转账金额 0，1 vite 的表示为 1000000000000000000。1 后面18个0
    // needPow 转账使用pow还是配额，true 使用pow，需要全节点支持Pow计算； 根据地址配额抵押，需要为地址抵押
    // priKey 私钥
    // data 交易备注 test
    builder.fromAddress("vite_d789431f1d820506c83fd539a0ae9863d6961382f67341a8b5ex")
        .toAddress("vite_9120592f2ef029a10253dcf35690a1c84749029871707254b2")
        .tokenId("tti_5649544520544f4b454e6e40")
        .amount("0")
        .needPow(true)
        .priKey(key1.getHexPriKey()).data("test");

    // 发送交易
    SendTransactionRes sendTxRes = Transfer.sendRawTransaction(viteJ, builder.build());
    
    
```

```java tab:Response
     SendTransactionRes sendTxRes = Transfer.sendRawTransaction(viteJ, builder.build());
     // 判断错误
     if (sendTxRes.hasError()) {
            System.out.println(sendTxRes.getError().getMessage());
      } else {
            System.out.println(sendTxRes.getHash());
      }      
```

:::


## receiveTransactionByHash
获得一个账户的交易列表
- **Parameters**: 
  * `ViteJ` : `viteJ` rpc连接器  
  * `ReceiveTransactionReq` : `receiveTransactionReq` 接收交易请求
- **Returns**:  `SendTransactionRes` 交易状态，成功包含receive块的hash值
  
- **Example**:

::: demo

```java tab:Request
    ReceiveTransactionReq.Builder receiveTxReq = new ReceiveTransactionReq.Builder();
    // hash send 交易的hash
    // needPOW 转账使用pow还是配额，true 使用pow，需要全节点支持Pow计算； 根据地址配额抵押，需要为地址抵押
    // privKey Hex格式的地址私钥
    receiveTxReq.hash("17a2f5753a571bc9959996f6f7dadce9448416be4ac3f223618e4614427cee48")
          .needPOW(true)
          .privKey(key1.getHexPriKey());
          SendTransactionRes sendTransactionRes = Transfer.receiveTransactionByHash(viteJ, receiveTxReq.build());
    
```

```java tab:Response
     SendTransactionRes sendTransactionRes = Transfer.receiveTransactionByHash(viteJ, receiveTxReq.build());
     if (sendTransactionRes.hasError()) {
                  System.out.println(sendTransactionRes.getError().getMessage());
     } else {
                  // receive块的hash值
                  System.out.println(sendTransactionRes.getHash());
     }    
```

:::


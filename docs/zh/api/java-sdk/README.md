---
sidebarDepth: 4
title: 开始
---

# 开始
## quickStart
### GITHUB
    https://github.com/vitelabs/vite-javasdk
### POM说明
    ```java
          <dependency>
                    <groupId>org.vite.sdk</groupId>
                    <artifactId>vite-javasdk</artifactId>
                    <version>2.5.0</version>
          </dependency>
    ```    
### 发送交易
     ```java
              // 构建RPC
              ViteJ viteJ = ViteJ.build("http://150.109.116.1:48132");
              // 根据助记词横撑Key，Key包含公私钥和地址派生工具
              Key key1 = Wallet.getKeyPairFromMnemonics("humble category output craft giant reform weapon business dinner gentle club diagram goat recycle cactus leopard library ship offer output history lake harvest struggle", 0);
              // 根据四是要派生base64de公钥
              String pubKey = Key.getPubKeyBase64FromPrivateKey(key1.getHexPriKey());
              // 根据四是要派生vite地址
              String address = Key.getAddressFromPrivateKey(key1.getHexPriKey());
              // 根据私钥派生Key管理工具
              Key key2 = Key.build(key1.getHexPriKey());
              // 构造发送交易的的SendRequest请求
              SendTransactionReq.Builder builder = new SendTransactionReq.Builder();
              builder.fromAddress(key1.getHexAddress()).toAddress(key1.getHexAddress()).tokenId("tti_5649544520544f4b454e6e40").amount("0").needPow(true).priKey(key1.getHexPriKey()).data("test");
               // 发送交易
              SendTransactionRes sendTxRes = Transfer.sendRawTransaction(viteJ, builder.build());
              // 判断错误
              if (sendTxRes.hasError()) {
                   System.out.println(sendTxRes.getError().getMessage());
              } else {
                       System.out.println(sendTxRes.getHash());
              }               
      ```  

## 常见RPC错误汇总

|  描述 | code | message | example |
|:------------:|:-----------:|:-----:|:-----:|
| 服务端尝试解析json出错	|  `-32700` | 语法解析错误 |{"code":-32700,"message":"missing request id"}|
| json不是一个有效的请求对象，缺少必要字段或者字段取值错误	|  `-32600` | 无效请求 |{"code":-32600,"message":"Unable to parse subscription request"}|
| 方法不存在，请确认已经在`PublicModules`中配置相应的模块，并且方法存在	|  `-32601` | 方法不存在 |{"code":-32601,"message":"The method tx_sendRawTx does not exist/is not available"}|
| 方法参数错误，例如方法要求传uint8，实际传了string	|  `-32602` | 无效参数 |{"code":-32602,"message":"missing value for required argument"}|
| 服务器已经停止服务 |  `-32000` | server is shutting down |{"code":-32000,"message":"server is shutting down"}|
| 服务器执行异常，稍后重试即可 | `-32001` | server execute panic |{"code":-32001,"message":"server execute panic"}|
| 回调方法返回错误 | `-32002` | call back error |{"code":-32002,"message":"notifications not supported"}|

## 常见业务错误汇总

|  描述 | code | message | example |
|:------------:|:-----------:|:-----:|:-----:|
| 密码错误	|  `-34001` | error decrypting key |{"code":-34001,"message":"error decrypting key"}|
| 余额不足|  `-35001` | insufficient balance for transfer |{"code":-35001,"message":"insufficient balance for transfer"}|
| 配额不足 |  `-35002` | out of quota |{"code":-35002,"message":"out of quota"}|
| 参数错误 |  `-35004` | invalid method param |{"code":-35004,"message":"invalid method param"}|
| 通过计算PoW获取配额操作过于频繁 |  `-35005` | calc PoW twice referring to one snapshot block |{"code":-35005,"message":"calc PoW twice referring to one snapshot block"}|
| 合约方法不存在 |  `-35006` | abi: method not found |{"code":-35006,"message":"abi: method not found"}|
| 创建合约时确认次数非法 |  `-35007` | invalid confirm time |{"code":-35007,"message":"invalid confirm time"}|
| 合约地址不存在 |  `-35008` | contract not exists |{"code":-35008,"message":"contract not exists"}|
| 创建合约时配额翻倍数非法 |  `-35010` | invalid quota ratio |{"code":-35010,"message":"invalid quota ratio"}|
| 出块地址不合法 |  `-36001`  |  block address not valid |{"code":-36001, "message":"general account's sendBlock.Height must be larger than 1"}|
| Hash校验失败 |  `-36002`  | verify hash failed | {"code":-36002,"message":"verify hash failed"} |
| 签名校验失败 |  `-36003`  | verify signature failed | {"code":-36003,"message":"verify signature failed"} |
| Pow值校验失败 |  `-36004`  | check pow nonce failed | {"code":-36004,"message":"check pow nonce failed"} |
| 校验依赖的前一个块Hash失败 |  `-36005`  | verify prevBlock hash failed | {"code":-36005,"message":"verify prevBlock failed, incorrect use of prevHash or fork happened"} |
| 等待依赖的关联交易块 |  `-36006`  | pending for the block referred to | {"code":-36006,"message":"verify referred block failed, pending for them"} |

## JSON-RPC Support

|  JSON-RPC 2.0  | HTTP | IPC |Publish–Subscribe |WebSocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |&#x2713;|&#x2713;|

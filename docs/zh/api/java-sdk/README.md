---
sidebarDepth: 4
---
# 快速开始

## github

[Vitej](https://github.com/vitelabs/vitej)

## 开始

### 添加maven依赖
1. 本地拉取本仓库代码，在代码目录下执行`mvn install`，安装到本地maven仓库
2. 在项目`pom.xml`中添加依赖
```
<dependency>
  <groupId>org.vitej</groupId>
  <artifactId>vitej</artifactId>
  <version>1.0.0-SNAPSHOT</version>
</dependency>
```

### 使用示例

```
import com.alibaba.fastjson.JSON;
import org.vitej.core.constants.CommonConstants;
import org.vitej.core.protocol.HttpService;
import org.vitej.core.protocol.Vitej;
import org.vitej.core.protocol.methods.Address;
import org.vitej.core.protocol.methods.Hash;
import org.vitej.core.protocol.methods.enums.EBlockType;
import org.vitej.core.protocol.methods.request.Request;
import org.vitej.core.protocol.methods.request.TransactionParams;
import org.vitej.core.protocol.methods.response.EmptyResponse;
import org.vitej.core.wallet.KeyPair;
import org.vitej.core.wallet.Wallet;

import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;

public class QuickStart {
    public static void main(String[] args) {
        try {
            // 初始化Vitej client
            Vitej vitej = new Vitej(new HttpService());
            // 通过助记词恢复钱包，取钱包中派生的第0个地址
            KeyPair keyPair = new Wallet(Arrays.asList("network", "north", "tell", "potato", "predict", "almost", "wonder", "spirit", "wheel", "smile", "disease", "bonus", "round", "flock", "pole", "review", "music", "oven", "clarify", "exclude", "loyal", "episode", "image", "notable")).deriveKeyPair();
            // 构造一笔转账交易
            Request<?, EmptyResponse> request = vitej.sendTransaction(keyPair,
                    new TransactionParams()
                            .setBlockType(EBlockType.SEND_CALL.getValue())
                            .setToAddress(new Address("vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"))
                            .setAmount(BigInteger.valueOf(1))
                            .setTokenId(CommonConstants.VITE_TOKEN_ID)
                            .setData("Hello".getBytes()),
                    true);
            Hash sendBlockHash = ((TransactionParams) request.getParams().get(0)).getHashRaw();
            System.out.println(sendBlockHash);
            // 发送转账交易
            EmptyResponse response = request.send();
            System.out.println(JSON.toJSONString(response));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```



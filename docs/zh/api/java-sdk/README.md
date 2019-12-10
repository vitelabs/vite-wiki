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
import org.vitej.core.protocol.HttpService;
import org.vitej.core.protocol.Vitej;
import org.vitej.core.protocol.methods.response.SnapshotChainHeightResponse;

import java.io.IOException;

public class QuickStart {
    public static void main(String[] args) {
        try {
            // 实例化Vitej client
            Vitej vitej = new Vitej(new HttpService());
            // 查询最新的快照块高度
            SnapshotChainHeightResponse response = vitej.getSnapshotChainHeight().send();
            System.out.println(JSON.toJSONString(response));
            Long latestSnapshotHeight = response.getHeight();
            System.out.println(latestSnapshotHeight);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```



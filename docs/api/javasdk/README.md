---
sidebarDepth: 4
---
# Start

## Installation

Download [ViteJ SDK](https://github.com/vitelabs/vitej) 

## Add Dependency

### Maven

```xml
<dependency>
  <groupId>org.vite</groupId>
  <artifactId>vitej</artifactId>
  <version>1.1.0</version>
</dependency>
<dependency>
  <groupId>org.vite</groupId>
  <artifactId>vitej-dependencies</artifactId>
  <version>1.1.0</version>
  <type>pom</type>
</dependency>
```

### Gradle

```
implementation 'org.vite:vitej:1.1.0'
implementation 'org.vite:vitej-dependencies:1.1.0'
```

### A Simple Example

```java
import com.alibaba.fastjson.JSON;
import org.vitej.core.protocol.HttpService;
import org.vitej.core.protocol.Vitej;
import org.vitej.core.protocol.methods.response.SnapshotChainHeightResponse;

import java.io.IOException;

public class QuickStart {
    public static void main(String[] args) {
        try {
            // Create a Vitej client
            Vitej vitej = new Vitej(new HttpService());
            // Look up the latest snapshot block height
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

See [ViteJ Demo](https://github.com/vitelabs/vitej-demo) for more examples and usages


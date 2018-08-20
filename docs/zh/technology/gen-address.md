# 地址生成

1. 把ed25519的Public key用Blake2b转成32字节的Hash数组，取其前20个字节，形成我们的二进制形式的地址 BinaryAddress；
2. 把二进制形式的地址，再通过Blake2b转成32字节的Hash数组，取其前5个字节，这是二进制地址的校验和 AddressChecksum；
3. 把二进制地址的校验和拼接到二进制地址之后，组成25字节的数组，把它转换成十六进制格式的字符串，再在这字符串前加上 "vite_"前缀；
``` 
HumanReadableAddress = "vite_" + Hex(Blake2b(PubKey)[0, 19] + Blake2b(Blake2b(PubKey)[0, 19])[0,4])
```


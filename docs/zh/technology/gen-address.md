# 地址生成

1. 把ed25519的Public key用输出size位20字节的Blake2b算法把Public key进行Hash后得到BinaryAddress；
2. 把二进制形式的地址，再通过输出size位5字节Blake2b算法对二进制形式地址进行Hash后，得到AddressChecksum；
3. 把二进制地址的校验和拼接到二进制地址之后，组成25字节的数组，把它转换成十六进制格式的字符串，再在这字符串前加上 "vite_"前缀；
``` 
HumanReadableAddress = "vite_" + Hex(Blake2b160(PubKey) + Blake2b40(Blake2b160(PubKey)))
```


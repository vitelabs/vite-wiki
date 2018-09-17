# 地址生成

1. 用输出size为20字节的Blake2b算法把Public key进行Hash后得到二进制形式的地址（BinaryAddress）；
2. 用输出size为5字节Blake2b算法把BinaryAddress进行Hash后得到二进制地址的校验和（AddressChecksum）；
3. 把AddressChecksum拼接到BinaryAddress之后，组成25字节的数组，把它转换成十六进制格式的字符串，再在这字符串前加上 "vite_"前缀；

    HumanReadableAddress = "vite_" + Hex(Blake2b160(PubKey) + Blake2b40(Blake2b160(PubKey)))
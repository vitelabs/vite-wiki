# 地址生成

1. 通过Seed生成Prikey,然后通过使用Ed25519生成Pubkey
2. 把Pubkey进行Blake2b的Hash转成20Bytes的PubHash(160bits) 
3. 用Blake2b把这PubHash 再求一次校验和得到5Bytes的PubHashChecksum(40bits)
4. Address = "vite_" + Hex(PubHash) + Hex(PubHashChecksum)


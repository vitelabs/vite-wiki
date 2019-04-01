# privToAddr

:::tip abstract
@vitejs/vitejs-privtoaddr
:::

## newHexAddr
根据私钥生成hex地址

- **params**
  - `privateKey?: string | buffer` 私钥
- **return**
  - `addrObj: AddrObj`

## newHexAddrFromPub
根据公钥生成hex地址

- **params**
  - `publickey: string | buffer` 公钥
- **return**
  - `hexaddr: string` hex编码地址

## getAddrFromHexAddr
获取真实地址

- **params**
  - `hexaddr: string` hex编码地址
- **return**
  - `addr: string` 真实地址

## getHexAddrFromAddr
通过真实地址获取hex地址

- **params**
  - `addr: string` 真实地址
- **return**
  - `hexaddr: string` hex编码地址

## isValidHexAddr
校验是否为合法的hex地址

- **params**
  - `hexaddr : string` hex编码地址
- **return**
  - `validate : boolean` 是否合法

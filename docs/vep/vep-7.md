# VEP 7: AccountBlock Data Content Type Definition

## Background

In general, the data field in account block can be used to carry any info when sending transactions through `tx_sendRawTx` API. 
In order to utilize or display the carried data correctly, it is necessary to describe the data content type in uniform way.

## Implementation

The proposal suggests to append 2 bytes content type at beginning to indicate what type of data is followed. 

Content type is a `uint16` number stored in big endian format.
Please note that types **1(0x0001)** - **2048(0x0800)** are officially reserved and should not be used by third party.

::: warning Restriction
It is known that content type might not be correctly recognized under the situation calling a smart contract, due to occasional conflict with method hash, which occupies the first few bytes of data field.
:::

## Defined Type

### General Type
| Type | Type(Hex) | Description |
| --- | --- | --- |
| Binary | 0x0001 | Reserved, not used yet |
| UTF-8 String | 0x0002 | Transaction comment |

### Custom Type
| Type | Type(Hex) | Description |
| --- | --- | --- |
| Grin Wallet Data | 0x8001 | Carrying Grin transaction index |

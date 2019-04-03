# VEP 7: AccountBlock Data Content Type Norm

## Background
 AccountBlock's data field can carry any data when using tx_sendRawTx API send transactions. In order to display the data carried by data field in correct format, it is necessary to describe the data type in the data field in some way.

## Implementation
The specific method is to append 2 Byte data to data at the header as Content Type to indicate what type of data is followed. It should be noted that the format of the data field described in this proposal is not mandatory, but It is recommended for better display.

However, even if data is processed or displayed in the format described in this article, there is a probability that the content type of data will not be correctly recognized, because when the smart contract is called with tx_sendRawTx API, the first few bytes of the data field are the hash of the calling contract method name. May conflict with Content Type.

Content Type use UInt16 mark, store in big endian format, restricted type to less than or equal to 2048 (0x0800) is official general type, and type that is greater than 2048 (0x0800) can be specified.

## Defined Type

### General Type
| Type | Type(Hex) | Description |
| --- | --- | --- |
| Binary | 0x0001 | Reserved, not used yet |
| UTF-8 String | 0x0002 | Used in transfer remarks |

### Custom Type
| Type | Type(Hex) | Description |
| --- | --- | --- |
| Grin Wallet Data | 0x8001 | Save to Grin file directory |

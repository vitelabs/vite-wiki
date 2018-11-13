---
sidebarDepth: 4
---
# Mintage

:::tip Maintainer [viteLiz](https://github.com/viteLiz) :::

The built-in token forging contract. Contract address: vite_00000000000000000000000000000000000000056ad6d26692

**Supported protocols:**

| JSON-RPC 2.0 |   HTTP   |   IPC    | Publish–subscribe | Websocket |
|:------------:|:--------:|:--------:|:-----------------:|:---------:|
|   &#x2713;   | &#x2713; | &#x2713; |  future version   | &#x2713;  |

## mintage_getMintageData

Return the composed request data to forge the new token

- **Parameters**: 

`Object` 1. `selfAddr`: `Address` The account address of token issuer 2. `height`: `uint64` The height of current block 3. `prevHash`: `Hash` The hash of previous account block 4. `snapshotHash`: `Hash` The hash of snapshot block that current account block refers to 5. `tokenName`:`string` The token name in 1-40 characters, including uppercase and lowercase letters, spaces and underscores. Cannot have consecutive spaces; cannot begin or end with spaces 6. `tokenSymbol`: `string` The token symbol in 1-10 characters, including uppercase and lowercase letters, spaces and underscores. Cannot have consecutive spaces; cannot begin or end with spaces 7. `totalSupply`: `big.int` The total supply. Cannot exceed 2**256-1 8. `decimals`: `uint8` The decimal number. 10**`decimals` cannot exceed `totalSupply`

- **Returns**:
    
    - `[]byte` Data

- **Example**:

::: demo

```json tab:Request {  
"jsonrpc":"2.0", "id":1, "method":"mintage_getMintageData", "params": [{ "selfAddr":"vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6", "height":2, "prevHash":"3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7", "snapshotHash":"3a56babeb0a8140b12ac55e91d2e05c41f908ebe99767b0e4aa5cd7af22d6de7", "tokenName":"Test Token", "tokenSymbol":"test", "totalSupply":100000000000, "decimals":6 }] }

    <br />```json tab:Response
    {  
       "jsonrpc":"2.0",
       "id":1,
       "result": "46d0ce8b000000000000000000000000000000000000000000003fd16552e1551a267f3200000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000174876e8000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a5465737420546f6b656e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000"
    }
    

:::

## mintage_getMintageCancelPledgeData

Return the composed request data to withdraw the tokens staked for forging

- **Parameters**:
    
    - `TokenId`: The staked token ID

- **Returns**:
    
    - `[]byte` Data

- **Example**:

::: demo

```json tab:Request {  
"jsonrpc":"2.0", "id":1, "method":"mintage_getMintageCancelPledgeData", "params":["tti_5649544520544f4b454e6e40"] }

    <br />```json tab:Response
    {  
       "jsonrpc":"2.0",
       "id":1,
       "result":  "9b9125f5000000000000000000000000000000000000000000005649544520544f4b454e"
    }
    

:::
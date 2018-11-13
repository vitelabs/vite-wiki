---
sidebarDepth: 4
---
# Vote

:::tip Maintainer [viteLiz](https://github.com/viteLiz) :::

The built-in voting contract. Contract address：vite_000000000000000000000000000000000000000270a48cc491

**Supported protocols:**

| JSON-RPC 2.0 |   HTTP   |   IPC    | Publish–subscribe | Websocket |
|:------------:|:--------:|:--------:|:-----------------:|:---------:|
|   &#x2713;   | &#x2713; | &#x2713; |  future version   | &#x2713;  |

## vote_getVoteData

Return the composed request data to vote for the super node

- **Parameters**:
    
    - `Gid`: Consensus group ID
    - `string`: The super node name

- **Returns**:
    
    - `[]byte` Data

- **Example**:

::: demo

```json tab:Request {  
"jsonrpc":"2.0", "id":1, "method":"vote_getVoteData", "params": [ "00000000000000000001", "super" ] }

    <br />:::
    
    ## vote_getCancelVoteData
    Return the composed request data to cancel voting
    
    - **Parameters**: 
    
      * `Gid`: Consensus group ID
    
    - **Returns**: 
        - `[]byte` Data
    
    - **Example**:
    
    
    ::: demo
    
    
    ```json tab:Request
    {  
       "jsonrpc":"2.0",
       "id":1,
       "method":"vote_getCancelVoteData",
       "params":["00000000000000000001"]
    }
    

:::

## vote_getVoteInfo

Return the voting information of the account

- **Parameters**:
    
    - `Gid`: Consensus group ID
    - `Address`: The account address

- **Returns**:

`Object` 1. `nodeName`: `string` The super node name 2. `nodeStatus`: `uint8` The super node status - 1 valid, 2 invalid 3. `balance`: `big.Int` The account balance

- **Example**:

::: demo

```json tab:Request {  
"jsonrpc":"2.0", "id":1, "method":"vote_getVoteInfo", "params": [ "00000000000000000001", "vite_a5a7f08011c2f0e40ccd41b5b79afbfb818d565f566002d3c6" ] }

    <br />```json tab:Response
    {  
       "jsonrpc":"2.0",
       "id":1,
       "result": {
          "nodeName": "super",
          "nodeStatus": 1
          "balance": 10,
       }
    

:::
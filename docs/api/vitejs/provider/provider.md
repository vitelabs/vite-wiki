# Introduction

In network layer, **Vite JS** employs JSON-RPC 2.0 to exchange information with Vite full node through IPC, HTTP and WebSocket protocols.

The following methods and properties are supported in all protocols.

## Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| type |  string | Type of network transmission protocol |
| timeout | number(ms) | Timeout of request |

## Methods

### abort
Break current connection and clear remaining requests in request list.

### request
Initiates a request with return value

- **Parameters**: 
  * `methodName : string` Method name
  * `params : any` Request parameters

- **Returns**:
    - `Promise<JsonRPC response>`

### notification
Initiates a request without return value

- **Parameters**: 
  * `methodName : string` Method name
  * `params : any` Request parameters

### batch
Initiate a batch request

- **Parameters**: 
  * `requests : array<object>` 
	- `type : string<request | notification | batch>` : Request type
    - `methodName : string`: Method name
    - `params : any`: Request parameters

- **Returns**:
    - `Promise<JsonRPC response>`

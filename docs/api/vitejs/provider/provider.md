# Introduction

Our network connection layer uses JSON-RPC 2.0 protocol.
You can use http, websocket or IPC to get into connect with Gvite.

HTTP / Websocket / IPC All of these have already integrated the following methods and attributes.

## Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| type |  string | Type of network transport protocol |
| timeout | number(ms) | Request timeout |

## Methods

### abort
Breaks the remaining requests for the current connection and clears the list of requests

### request
Initiates a request

- **Parameters**: 
  * `methodName : string` Method name
  * `params : any` Request params

- **Returns**:
    - Promise<`JsonRPC response`>

### notification

- **Parameters**: 
  * `methodName : string` Method name
  * `params : any` Request params

### batch

- **Parameters**: 
  * `requests : array<object>` 
	- `type : string<request | notification | batch>` : Request type
    - `methodName : string`: Method name
    - `params : any`: Request params

- **Returns**:
    - Promise<`JsonRPC response`>

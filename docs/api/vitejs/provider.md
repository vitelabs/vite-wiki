# Start

:::tip Created by
[cs](https://github.com/lovelycs)
:::

:::tip Abstract
Our network connection layer uses RPC protocol.
This part is mainly about how to connect to gvite, you can use http, websocket or IPC to get into connect with gvite.
The invocation of different levels of API varies from diverse connection ways. (All of the APIs that are underlying gvite wallet will be accessible only by IPC.)
:::

## provider

### Instance Properties

|  Name  | Type | Description |
|:------------:|:-----:|:-----:|
| type |  string | Type of network transport protocol |
| timeout | number(ms) | Request timeout |

### Instance Methods

#### Abort
Breaks the remaining requests for the current connection and clears the list of requests

#### Request
Initiates a request

- **params**: 

  * `methodName : string` Method name
  * `params : any` Request params

- **Returns**:
    - Promise<`JsonRPC response`>

#### Notification

- **params**: 

  * `methodName : string` Method name
  * `params : any` Request params

#### Batch

- **params**: 

  * `requests : array<object>` 
	- `type : string<request | notification | batch>` : Request type
    - `methodName : string`: Method name
    - `params : any`: Request params

- **Returns**:
    - Promise<`JsonRPC response`>

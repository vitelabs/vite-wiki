---
sidebarDepth: 4
title: START
---

# Start
## Description
* **IPC**：Supported in all APIs

    1. **\*nix(linux darwin)**: `Unix Domain Socket` file is    `$HOME/viteisbest/vite.ipc`

    2. **Windows**: Due to` Named Pipe` naming limitation the file is  `\\.\pipe\vite.ipc`
* **Http**：Public APIs ONLY. Default port is **48132**. Wallet module is excluded.

* **WebSocket**：Public APIs ONLY. Default port is **31420**. Wallet module is excluded.
* **Restrictions(for the time being)**:

    1. The subscription mode is not supported yet;

    2. Part of APIs are not yet finalized. Future change may happen.

* **Notes**:
    1. To avoid unexpected behaviors, standard ***Json rpc2*** library is highly recommended;
    
    2. Term transaction or Tx is equivalent to account block.


## Common error codes

|  Desc | Code | Message | Example |
|:------------:|:-----------:|:-----:|:-----:|
| Insufficient balance|  `-35001` |  The balance is not enough. |{"code":-35001,"message":"The balance is not enough."}|
| Wrong password	|  `-34001` | error decrypting key |{"code":-34001,"message":"error decrypting key"}|
| Account already unlocked	|  `-34002` |  the address was previously unlocked |{"code":-34002,"message":"the address was previously unlocked"}|

## JSON-RPC Support

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |future version|&#x2713;|

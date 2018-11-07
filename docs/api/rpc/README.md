---
sidebarDepth: 4
title: START
---

# Start

## Build

### Build steps

1. [Install Go](https://golang.org/doc/install)
2. Run `go get github.com/vitelabs/go-vite` in your terminal, then you will find the source code here: `$GOPATH/src/github.com/vitelabs/go-vite/` (as default, $GOPATH is `~/go`)
3. Go to the source code directory and run `make all`, you will get executable files of darwin, linux, windows here: `$GOPATH/src/github.com/vitelabs/go-vite/build/cmd/rpc`  
4. Run the appropriate binary file on your OS.


### Configuration

Normally Vite has a default configuration, however, you are able to setup your own configuration in either following ways.

#### cmd

| key | type | default | meaning |
|:--- |:--- |:--- |:--- |
| name | string | "vite-server" | Server name, used in logs |
| maxpeers | number | 50 | The maximum number of peers to connect |
| addr | string | "0.0.0.0:8483" | `listening-address:port` |
| dir | string | "~/viteisbest" | The directory where all files are stored (like logs, ledger) |
| netid | number | 2 | Network ID. For example, 2 indicates TestNet |
| priv | string | "" | The hex code string of ED25519 privateKey |

#### configFile

You can also setup configuration with a config file `vite.config.json`. For example:

```json
{
    "P2P": {
        "Name":                 "vite-server",
        "PrivateKey":           "",
        "MaxPeers":             100,
        "Addr":                 "0.0.0.0:8483",
        "NetID":                2
    },
    "DataDir": ""
}
```

`vite.config.json` should live in the same directory of vite.

## Description
* **IPC**：Supported in all API

    1. **\*nix(linux darwin)**: `Unix Domain Socket` file is    `$HOME/viteisbest/vite.ipc`

    2. **Windows**: Due to` Named Pipe` naming limitation the file is  `\\.\pipe\vite.ipc`
* **Http**：Public API ONLY. Default port is **48132**. Wallet module is excluded.

* **WebSocket**：Public API ONLY. Default port is **31420**. Wallet module is excluded.
* **Restrictions(for the time being)**:

    1. The subscription mode is not supported yet;

    2. API signature is not yet finalized. Future changes could be expected.

* **Notes**:
    1. To avoid unexpected behaviors, standard ***Json rpc2*** library is highly recommended;
    
    2. Term transaction or Tx is equivalent to account block.


## Summary of common errors

|  desc | code | message | example |
|:------------:|:-----------:|:-----:|:-----:|
| Insufficient balance|  `-35001` |  The balance is not enough. |{"code":-35001,"message":"The balance is not enough."}|
| Wrong password	|  `-34001` | error decrypting key |{"code":-34001,"message":"error decrypting key"}|
| Account already unlocked	|  `-34002` |  the address was previously unlocked |{"code":-34002,"message":"the address was previously unlocked"}|

## JSON-RPC Support

|  JSON-RPC 2.0  | HTTP | IPC |Publish–subscribe |Websocket |
|:------------:|:-----------:|:-----:|:-----:|:-----:|
| &#x2713;|  &#x2713; |  &#x2713; |pending|&#x2713;|

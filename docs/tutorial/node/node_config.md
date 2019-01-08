# node_config.json

``` javascript
{
  "NetID": 2, // Vite network ID, used to identify the connected network. NetID for Vite TestNet 1.0.0 is 2. Please do not modify this field.
  "Identity": "vite-node-name",  // SBP name
  "MaxPeers": 200, // Maximum connected peers, no need to change
  "MaxPendingPeers": 20, // no need to change
  "BootNodes": [
    ""
  ], // A list of nodes for bootstrap and network connection test, no need to change
  "Port": 8483, // UDP/TCP port. Default is 8483. Please ensure the port has not been occupied by other process
  "RPCEnabled": true, // Turn on RPC access. Default is enabled. 
  "HttpHost": "0.0.0.0", // Http listening address. Do not change unless you have demand to specify a particular network interface address.
  "HttpPort": 48132, // Http listening port. Default is 48132.
  "WSEnabled": true, // Turn on websocket access，Default is enabled. 
  "WSHost": "0.0.0.0", // Websocket listening address. Do not change unless you have demand to specify a particular network interface address.
  "WSPort": 41420, // Websocket listening port. Default is 41420.
  "IPCEnabled": true, // Turn on to enable command line interface
  "PublicModules":[
    "ledger",
    "public_onroad",
    "net",
    "contract",
    "pledge",
    "register",
    "vote",
    "mintage",
    "consensusGroup",
    "tx",
    "debug",
    "pow"
  ], // A list of gvite modules that are exposed to RPC interface, no need to change
  "Miner": true, // Turn on mining. This field must be set to true if you are running a SBP node, otherwise can be turned off
  "CoinBase": "0:vite_d2fef1e5ffa7d9139bd7c80a672e0530789bac6c7c9ff58dc6", // SBP address in format of index:address
  "EntropyStorePath": "vite_d2fef1e5ffa7d9139bd7c80a672e0530789bac6c7c9ff58dc6", // The name of keystore file corresponding to above SBP address. The keystore file should be in wallet directory.
  "EntropyStorePassword": "", // Keystore password
  "TopoDisabled": true, // Topological communication，disable by default. No need to change.
  "LogLevel": "info" // Gvite log level. Default is info. No need to change.
}
```




# Contract Debugging

## How to Debug Smart Contract

To debug smart contract, you need setup a local node. Creating or calling contract will be accomplished through the node's RPC interface.

For the time being, we provide development environment and test environment for debugging. Balance and quota are exempt from checking in development environment. 
Any transaction will receive a quota of 1,000,000 that never consumes up. In test environment, all checks keep the same as Vite TestNet. It's necessary to maintain sufficient balance or quota when debugging.
## Development Environment

### Install

Download [Gvite Debugging Package](https://github.com/vitelabs/gvite-contracts/releases) in development environment and install

```bash
## Unzip
tar -xzvf contractdev-v1.2.2-darwin.tar.gz
```
```bash
## Enter folder extracted
cd ~/contract_dev
```
```bash
## Start gvite debugging environment
sh run.sh
```
Check gvite.log to see if gvite debugging environment has been started successfully
```bash
cat gvite.log
```
Following messages show a successful startup
```bash
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.DataDir:/home/ubuntu/contract_dev/ledger/devdata module=gvite/node_manager
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.KeyStoreDir:/home/ubuntu/contract_dev/ledger/devdata/wallet module=gvite/node_manager
Prepare the Node success!!!
Start the Node success!!!
```

### Create Contract

Write contract in Solidity++ and save into a ".sol" file under the same directory with start script

```bash
## Create contract from c1.sol with test account(created during startup)
sh create_contract.sh c1.sol
```

```bash
## Below script shows how to create contract with passed-in parameters
curl -X POST \
  http://127.0.0.1:48132/ \
  -H 'content-type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "id": 0,
    "method": "vmdebug_createContract",
    "params": [
        {
          "fileName":"'`pwd`/c2.sol'",
          "params":{
            "A":{
              "amount":"0",
              "params":["20"]
            },
            "B":{
              "amount":"0",
              "params":["0"]
            }
          }
        }
    ]
}'
```
The parameters are explained below
```json
{
  // Create contract from c2.sol under current directory
  "fileName":"'`pwd`/c2.sol'",
  "params":{
    // Passed-in parameters for contracts. This example shows two contracts - A and B
    "A":{
      // Transfer amount when creating contract
      "amount":"0",
      // Passed-in parameters for contructor. In this example, it passes in a uint64 value for contract A's contructor
      "params":["20"]
    },
    "B":{
      "amount":"0",
      "params":["0"]
    }
  }
}
```

Following return message shows the contract has been created successfully
```json
{
  "jsonrpc": "2.0", 
  "id": 0, 
  "result": [
    {
      "accountAddr": "vite_21483c46a64799c7db0cba88cf7b007a2d1a37e863f7be94b7", 
      "accountPrivateKey": "b18bcd61db171fb0c97712c24dbfc4fe7d279a6e9f40be2a81f5e279206887237ee77ed82025fbe821a969cc8321c139ed69dde16bed9c5dfabbc6343868bb68", 
      "contractAddr": "vite_d624b0bead067237700a86314287849163e4a0fb6139fdff42", 
      "sendBlockHash": "265930575e035976f0e89b7b4ad00c5e91fefc9230647b47dadd7c7274797d3b", 
      "methodList": [
        {
          "contractAddr": "vite_d624b0bead067237700a86314287849163e4a0fb6139fdff42", 
          "accountAddr": "vite_21483c46a64799c7db0cba88cf7b007a2d1a37e863f7be94b7", 
          "amount": "0", 
          "methodName": "transfer", 
          "params": [
            "address"
          ]
        }
      ]
    }
  ]
}
```
Explained below
```json
{
  "jsonrpc":"2.0",
  "id":0,
  "result":[ 
    // List of contracts created. If multiple contracts exist in the .sol file, they will all be listed here
    {
      // Test account address
      "accountAddr":"vite_21483c46a64799c7db0cba88cf7b007a2d1a37e863f7be94b7",  
      // Test account private key
      "accountPrivateKey":"b18bcd61db171fb0c97712c24dbfc4fe7d279a6e9f40be2a81f5e279206887237ee77ed82025fbe821a969cc8321c139ed69dde16bed9c5dfabbc6343868bb68",
      // Contract account address
      "contractAddr":"vite_d624b0bead067237700a86314287849163e4a0fb6139fdff42",
      // Hash of request transaction that created the contract
      "sendBlockHash":"265930575e035976f0e89b7b4ad00c5e91fefc9230647b47dadd7c7274797d3b",
      // Method list of the contract
      "methodList":[
        {
          // Contract account address
          "contractAddr":"vite_d624b0bead067237700a86314287849163e4a0fb6139fdff42",
          // Test account address 
          "accountAddr":"vite_21483c46a64799c7db0cba88cf7b007a2d1a37e863f7be94b7",
          // Transfer amount when the method is called
          "amount":"0",
          // Method name
          "methodName":"transfer",
          // Parameter list with pseudo value. Multiple parameters are displayed if the method requires more than one pararmeter.
          "params":["address"]
        }
      ]
    }
  ]
}
```

### Call Contract

```bash
## Call a contract method. Remember to specify the right parameters that match your test environment
curl -X POST \
  http://127.0.0.1:48132/ \
  -H 'content-type: application/json' \
  -d '{
    "jsonrpc": "2.0",
    "id": 0,
    "method": "vmdebug_callContract",
    "params": [
        {
          "contractAddr":"vite_d624b0bead067237700a86314287849163e4a0fb6139fdff42",
          "accountAddr":"vite_21483c46a64799c7db0cba88cf7b007a2d1a37e863f7be94b7",
          "amount":"0",
          "methodName":"transfer",
          "params":["vite_21483c46a64799c7db0cba88cf7b007a2d1a37e863f7be94b7"]
        }
    ]
}'
```
Return message is explained below
```json
{
    "jsonrpc": "2.0", 
    "id": 0, 
    "result": {
        // Contract account address
        "contractAddr": "vite_0a49d38e769162f05d0df645b890ac450f80cb49d52e8765ab", 
        // Test account address that called the contract. This account was created automatically when your created the contract
        "accountAddr": "vite_a4aa32b30a4564d3c5ffac1f7416d09cd4dd36bbf365df5be5", 
        // Test account private key
        "accountPrivateKey": "2bef2ba485ed3e4de8b93bd0fb8746db47a91f4bdde0c007127b5bc6548ff49642d4138c403cc26e20299a2f145687bf562f6ba1e7d0d45a75d7c7f58de42b25", 
        // Hash of request transaction that called the contract
        "sendBlockHash": "eea88399209cd5abdedec1128b8bdfd1a28e2d6ac6ade6d5cee72e997a800893"
    }
}
```
Script call.sh shows an example how to call a contract

### Verify Execution Result

Since the response transactions of creating or calling contract are processed asynchronously, we have to wait for a while(1~6s in local environment) after sending out the request.
Executing steps and results are recorded in two separate logs.

Logs are under `/ledger/devdata/vmlog` in the folder unzipped

 * `vm.log`：Contains logs of contract execution entrance, result and events
 * `interpreter.log`：Contains detailed info of contract execution steps, including VM instructions, status of stack, memory, storage and etc.

It's also feasible to query contract account chain to check contract execution result
```bash
sh query_block.sh vite_0a49d38e769162f05d0df645b890ac450f80cb49d52e8765ab
```

## Test Environment

### Install

Download [Gvite Debugging Package](https://github.com/vitelabs/gvite-contracts/releases) in test environment and install

Installation steps in test environment are the same as in development environment

### Initialize

Since account balance and quota will be verified in test environment, additional initialization is required for the first boot-up.

Following steps are finished during initialization
 * A total supply of VITE tokens are sent to genesis account. This step needs calculate a PoW, therefore it may take some time
 * Waiting for a new snapshot block
 * Genesis account stakes to acquire quota in order to facilitate subsequent transactions to test account. This step needs calculate a PoW, therefore it may take some time
 * Waiting to receive quota 
```bash
sh init.sh
```

### Create Test Account

Remember to create new test account and stake for the account each time gvite has been rebooted. The test account will be used to create or call contract.

Following steps are finished during account creation
 * Creating new test account address
 * A amount of tokens are sent out from genesis account to test account
 * Tokens are received by test account 
 * Genesis account stakes for test account to obtain quota
 * Test account waits to receive quota

```bash
sh create_account.sh
```

### Create Contract

Compared with in development environment, additional test account address should be specified when running create_contract.sh
```bash
sh create_contract.sh c1.sol vite_d5fe580d0ba8fa4002e2a33af2cd10645a58ad1552d4562c0a
```
Run pledge_for_contract.sh to stake for contract account created
```bash
sh pledge_for_contract.sh vite_8739653f7fee7e39c3fbeee14e8c17fe4f7ff20e8607fb05ab
```

### Call Contract

See [Call Contract](#call-contract) in development environment


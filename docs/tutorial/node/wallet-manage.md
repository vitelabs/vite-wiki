# Wallet Management

:::tip
This article focuses on how to manage your wallet on a full node.

Before starting this tutorial, please follow: [Node - Installation][install] to install gvite service.
:::

:::danger Strongly not recommended：
* SBP address and SBP registration address(aka stake address) are ***the same address***
* SBP address and SBP registration address(aka stake address) are generated with ***the same mnemonic***
:::

## Create wallet

### Start full node

Follow [full node startup][install] to start a full node.

### Connect full node in command line

Enter [full node installation directory][pwd] and execute the following command:

  ```bash
  ./gvite attach ~/.gvite/testdata/gvite.ipc
  ```

  Below output indicates the full node has been connected successfully:
  ```
  INFO[11-12|16:47:07] cannot read the config file, will use the default config module=config error="open vite.config.json: no such file or directory"
  INFO[11-12|16:47:07]                                          monitor-log=/home/ubuntu/go-vite/backend-log/backend.log.30693
  Welcome to the Gvite JavaScript console!
  ->
  ```
### Create a new wallet
  
Input：
```javascript
vite.wallet_newMnemonicAndEntropyStore("123456")
```
Where `123456` is the password for the keystore, you should replace it with your own password.

```json
{
    "jsonrpc": "2.0", 
    "id": 1, 
    "result": {
        "mnemonic": "ancient rat fish intact viable flower now rebuild monkey add moral injury banana crash rabbit awful boat broom sphere welcome action exhibit job flavor", 
        "primaryAddr": "vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf", 
        "filename": "~/.gvite/testdata/wallet/vite_f1c2d944b1e5b8cbfcd5f90f94a0e877beafeced1f331d9acf"
    }
}
```

* `mnemonic`: Mnemonic words, very important. Please keep in safe
* `primaryAddr`: The first Vite address corresponding to the mnemonic
* `filename`: The location of the keyStore file where the mnemonic is saved, must be specified in mining

Run `exit` to abort

## Recover wallet keystore from mnemonic

Input in command line:

```javascript
vite.wallet_recoverEntropyStoreFromMnemonic("Your Mnemonic","123456")
```
Replace `Your Mnemonic` and `123456` with your own mnemonic and password.

For example：

:::demo
```javascript tab: Input in command line
vite.wallet_recoverEntropyStoreFromMnemonic("utility client point estate auction region jump hat sick blast tomorrow pottery detect mixture clog able person matrix blast volume decide april congress resource","123456")
```
```json tab: Ouput
{
    "jsonrpc": "2.0",
    "id": 4,
    "result": {
        "mnemonic": "utility client point estate auction region jump hat sick blast tomorrow pottery detect mixture clog able person matrix blast volume decide april congress resource",
        "primaryAddr": "vite_981bca7a348de85bd431b842d4b6c17044335f71e5f3da59c0",
        "filename": "~/.gvite/testdata/wallet/vite_981bca7a348de85bd431b842d4b6c17044335f71e5f3da59c0"
    }
}
```
:::

Now the keyStore file has been recovered.


[install]: <./install.md>
[pwd]: <./install.md#Description-of-installation-directory>



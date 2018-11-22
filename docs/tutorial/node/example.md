# Run SBP node on Ubuntu 16.04

:::tip
This article explains how to run SBP node on ubuntu 16.04. All steps have been tested on ubuntu 16.04.
:::


## Install gvite

### Install from a binary package

```bash
## Download
curl -L -O https://github.com/vitelabs/go-vite/releases/download/1.0.2/gvite-1.0.2-linux.tar.gz
```
```
## Unpack
tar -xzvf gvite-1.0.2-linux.tar.gz
```
```
## Rename the extracted folder to vite then enter it. You should see 3 files: gvite, bootstrap and node_config.json
mv gvite-1.0.2-linux vite
cd vite
```
```
## Start-up
./bootstrap
```

### Check if gvite service is started

Check the content of gvite.log in the same folder to determine whether the program boots normally.

```bash
cat gvite.log
```

The following messages indicate that the startup is successful.

```bash
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.DataDir:/home/ubuntu/.gvite/testdata module=gvite/node_manager
t=2018-11-09T17:44:48+0800 lvl=info msg=NodeServer.KeyStoreDir:/home/ubuntu/.gvite/testdata/wallet module=gvite/node_manager
Prepare the Node success!!!
Start the Node success!!!
```

### Obtain the path of installation directory 

```bash
pwd
```

Please write down the path, which will be used later

For example, if you are logged in as the root user, the installation directory is:

```bash
/root/vite
```

## Create wallet

### Connect full node in command line

Enter [full node installation directory](./install.md#Description-of-installation-directory) and execute the following command:

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
Here `123456` is the password for the keystore, you should replace it with your own password.

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

### Check if the wallet has been created successfully

```bash
ls ~/.gvite/testdata/wallet/
```
Have following result：

```bash
vite_065f8e8ed83dcd581bfb925ff285268d28ead80a9fc92ff083
```
`vite_065f8e8ed83dcd581bfb925ff285268d28ead80a9fc92ff083` is the address created above. Multiple addresses will be displayed here if more than one keystore have been created. 

## Edit node_config.json

```bash
vi node_config.json
```

Edit following content：

```
        "Miner": true,
        "CoinBase": "0:your_address",
        "EntropyStorePath": "your_address",
        "EntropyStorePassword": "your_password",
```

* `your_address`: Your wallet address created above, will be used in mining
* `your_password`: Your wallet password

Save and quit

## Reboot full node

Kill gvite process

```bash
ps -efww|grep -w 'gvite'|grep -v grep|cut -c 9-15|xargs kill -9
```

Reboot

```bash
./bootstrap
```
Check if gvite is rebooted successfully


```bash
ps -efww|grep -w 'gvite'
```

Below output indicates reboot is completed successfully:


```bash
root      6560  5939  0 12:29 pts/1    00:00:00 grep --color=auto -w gvite
```

## Query current node height in command line

```bash
  ./gvite attach ~/.gvite/testdata/gvite.ipc
```
Input：
```javascript
  vite.ledger_getSnapshotChainHeight();
```
Output:
```
  "{\"id\":0,\"jsonrpc\":\"2.0\",\"result\":\"499967\"}"
```
499967 is current block height.

For more command usage please run `vite.help`.

## Set gvite to start on boot

### Create auto-start config file

```bash
sudo touch /etc/systemd/system/vite.service   
sudo chmod 664 /etc/systemd/system/vite.service   
sudo vi /etc/systemd/system/vite.service   
```
Edit as below：

```text
[Unit]
Description=GVite node service
After=network.target

[Service]
ExecStart=/path_to_gvite/gvite
Restart=on-failure
User=vite
Group=vite

[Install]
WantedBy=multi-user.target
```

If the gvite installation path is `/root/vite`, **path_to_gvite** is `/root/vite/bootstrap`

## Start gvite as auto-boot service

### Create install.sh
```
## Navigate to gvite installation directory, and make sure it contains gvite and node_config.json
cd vite
ls
```

```bash
## Copy below script content into install.sh
vi install.sh
```

```text

#!/bin/bash

set -e

CUR_DIR=`pwd`
CONF_DIR="/etc/vite"
BIN_DIR="/usr/local/vite"
LOG_DIR=$HOME/.gvite

echo "install config to "$CONF_DIR


sudo mkdir -p $CONF_DIR
sudo cp $CUR_DIR/node_config.json $CONF_DIR
ls  $CONF_DIR/node_config.json

echo "install executable file to "$BIN_DIR
sudo mkdir -p $BIN_DIR
sudo cp $CUR_DIR/gvite $BIN_DIR

echo '#!/bin/bash
exec '$BIN_DIR/gvite' -pprof -config '$CONF_DIR/node_config.json' >> '$LOG_DIR/std.log' 2>&1' | sudo tee $BIN_DIR/gvited > /dev/null

sudo chmod +x $BIN_DIR/gvited

ls  $BIN_DIR/gvite
ls  $BIN_DIR/gvited

echo "config vite service boot."

echo '[Unit]
Description=GVite node service
After=network.target

[Service]
ExecStart='$BIN_DIR/gvited'
Restart=on-failure
User='`whoami`'

[Install]
WantedBy=multi-user.target' | sudo tee /etc/systemd/system/vite.service>/dev/null

sudo systemctl daemon-reload
```

```bash
## Grant execution permission
sudo chmod +x install.sh
```

### Run install.sh and set auto-start

```bash
## Run install.sh
./install.sh

## Set auto-start
sudo systemctl enable vite
```

### Start gvite as service

```bash
## Kill original gvite process
pgrep gvite | xargs kill -s 9

## Check result
ps -ef | grep gvite

## Start gvite service
sudo service vite start

## Check result
ps -ef | grep gvite

## Check service status
sudo service vite status

## Check boot log
tail -n200 ~/.gvite/std.log
```
Below message will be displayed if the service has been started up successfully:
```text
vite.service - GVite node service
   Loaded: loaded (/etc/systemd/system/vite.service; disabled; vendor preset: enabled)
   Active: active (running) since Thu 2018-11-22 21:23:30 CST; 1s ago
 Main PID: 15872 (gvite)
    Tasks: 7
   Memory: 12.1M
      CPU: 116ms
   CGroup: /system.slice/vite.service
           └─15872 /usr/local/vite/gvite -pprof -config /etc/vite/node_config.json

Nov 22 21:23:30 ubuntu systemd[1]: Started GVite node service.
```

```bash
## Shut down gvite service
sudo service vite stop
```

!!! Gvite service config is located in /etc/vite. Gvite console messages are logged in $HOME/.gvite/std.log.

## TIPS

### Enter gvite command line using script

Edit `~/.bashrc`

```bash
vi ~/.bashrc
```

Add following content then save & quit

```bash
alias vite="~/vite/gvite attach ~/.gvite/testdata/gvite.ipc"
```
Run

```bash
source ~/.bashrc
```

Then execute

```bash
vite
```

Now you are in gvite command line. Have fun.

```bash
INFO[11-15|12:54:38]                                          monitor-log=/root/go-vite/backend-log/backend.log.9104
this vite node`s git GO version is  7aa4ebc97dfb1d9be4cdd812bd68170b13de59f5
Welcome to the Gvite JavaScript console!
-> 
```

### Periodically output current block height

Execute below command in gvite command line：

```bash
setInterval(function(){vite.ledger_getSnapshotChainHeight();}, 1000)
```

Current block height will be printed out every second. Use `exit` to abort.

# Run SBP node on Ubuntu 16.04

:::tip
This article explains how to run SBP node on ubuntu 16.04. All steps have been tested on ubuntu 16.04.
:::


## Install gvite

### Install from a binary package

```bash
## Download
curl -L -O https://github.com/vitelabs/go-vite/releases/download/1.0.1/gvite-1.0.1-linux.tar.gz
```
```
## Unpack
tar -xzvf gvite-1.0.1-linux.tar.gz
```
```
## Rename the extracted folder to vite then enter it. You should see 3 files: gvite, bootstrap and node_config.json
mv gvite-1.0.1-linux vite
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

## To be continued

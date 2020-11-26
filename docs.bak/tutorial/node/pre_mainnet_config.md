# Migrate to Pre-Mainnet from TestNet

## Key Steps

1. Change NetID from 2 to 1

2. Delete the original `BootNodes` and replace with `BootSeeds`. The content is as followed

```json
"BootSeeds": [
  "https://bootnodes.vite.net/bootmainnet.json"
],
```

3. The default data directory in TestNet is "~/.gvite/testdata/". This has been moved to "~/.gvite/maindata in Pre-Mainnet. 
Remember to move your keystore files as well from the "~/.gvite/testdata/wallet/" to "~/.gvite/maindata/wallet/" especially if you are migrating a supernode. 

## More Information

Starting from gvite v2.0.0, a updated **node_config.json** has been provided as template in the installation package. Make your own modification based on it!

See below table for configuration changes in Pre-Mainnet

| Field | TestNet | Pre-Mainnet | Details |
|:--:|:--:|:--:|:--:|
| NetID | 2 | 1 | Vite network ID |
| BootSeeds | - | https://bootnodes.vite.net/bootmainnet.json | Newly added for fetching boot nodes |
| DataDir | ~/.gvite/testdata/ | ~/.gvite/maindata | Default data directory. Optional |

## Other Common Fields

Depending on specific usage, below fields in **node_config.json** may also need change

1. Node name

`Identity` is used to identify a node name. Duplicated names are allowed.

2. Supernode related

`Miner`, `CoinBase`, `EntropyStorePath` and `EntropyStorePassword` should be filled in.

3. Full node rewards and status

In order to receive full node rewards, you should specify your address in `RewardAddr`. `DashboardTargetURL` specifies a server link that your node reports status to.

4. Networking

`MaxPeers` and `MinPeers` define the maximum and minimum neighbors your node is able to connect to. Don't set this too large or too small. Default is 10.

5. API ports 

`Port`, `FilePort`, `HttpPort` and `WSPort` are used to customize ports exposed.



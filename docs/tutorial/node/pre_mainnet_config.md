# Switch into Pre-Mainnet from Test-Net

## Where to begin?

The easiest way to complete this switch is as follows:

1.Change NetID from 2 into 1 in Test-Net

2.Delete the field of BootNodes and add a new field - BootSeeds:

```json
"BootSeeds": [
  "https://bootnodes.vite.net/bootmainnet.json"
],
```

3.The default of DataDir in testnet environment is "~/.gvite/testdata/" and it is "~/.gvite/maindata in pre_mainnet. If keystore configured on nodes already, shall move keystore from the "~/.gvite/testdata/wallet/" directory to the "~/.gvite/maindata/wallet/" directory.

# More
The default configurations have been offered in the released package of Pre-Mainnet.

Comparing to Test-Net, the changes in configurations of Pre-Mainnet are as follows

| Field | TestNet | Pre-Mainnet | Details |
|:--:|:--:|:--:|:--:|
| NetID | 2 | 1 | The ID of Internet |
| BootSeeds | - |  | Acquire the source of BootNodes. No this configuration in the former Test-Net. It is a newly added filed in Pre-Mainnet. |
| DataDir | `~/.gvite/testdata/` | `~/.gvite/maindata` | Default Directory |

# Other Configurations

If Test-Net users have other custom configurations, please sync these configurations into that of Pre-Mainnet.

1.Node Name
The field of node name is Identity

2.For SBPs
the concerning field is Miner CoinBase EntropyStorePath EntropyStorePassword

3.RewardAddr
Full Nodes Rewards, the field of reward address for full nodes is RewardAddr

4.MaxPeers MinPeers
Other configurations, connect related fields are "MaxPeers" and "MinPeers"

Port Related Fields `Port` `FilePort` `HttpPort` `WSPort`

Node status `DashboardTargetURL`
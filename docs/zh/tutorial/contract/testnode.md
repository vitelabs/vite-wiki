# 本地运行测试节点

:::tip

阅读此文前，请先阅读[gvite安装教程](../node/install.html)。

请下载最新的gvite release版本。

:::

## 修改测试节点配置node_config.json
修改node_config.json文件，确保文件中包含以下配置：
 * 设置 `Single` 属性值为 `true`，表示节点类型为单节点；
 * 设置 `RPCEnabled` 属性值为 `true`，开启RPC接口，并配置 `HttpHost` 和 `HttpPort`，指定RPC服务的主机和端口，例如 `0.0.0.0` 和 `48132`；
 * 设置 `WSEnabled` 属性值为 `true`，并配置 `WSHost` 和 `WSPort`，指定WS服务的主机和端口，例如 `0.0.0.0` 和 `41420`；
 * 设置 `Miner` 属性值为 `true`，表示开启挖矿；
 * 设置 `CoinBase` 属性值为挖矿地址，格式为 `索引:地址`，例如 `0:vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906`；
 * 设置 `EntropyStorePath` 属性值为挖矿地址的keystore文件，例如 `vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906`；
 * 设置 `EntropyStorePassword` 属性值为挖矿地址的keystore文件密码，例如 `123`；
 * 设置 `GenesisFile` 属性值为创世块配置，例如 `genesis.json`，表示读取当前目录下的`genesis.json`文件作为创世块配置。
 * 设置 `OpenPlugins` 属性值为 `true`，表示开启统计功能，包括在途交易数统计、分代币交易列表等。

按需修改以下配置：
 * 设置数据文件目录，修改 `DataDir` 属性值，例如 `gvite/singlemode` 表示数据文件目录为当前目录下的`gvite/singlemode/devdata`目录；
 * 设置keystore文件目录，修改 `KeyStoreDir` 属性值，例如 `gvite/singlemode` 表示keystore文件目录为当前目录下的`gvite/singlemode/devdata/wallet`目录；
 * 配置测试模式，此模式下不校验账户余额，配额默认为最大配额，修改 `VmTestEnabled` 属性值为 `true`；
 * 配置测试代币，配置后可以获取测试代币，修改 `TestTokenTti` 属性值为测试代币id，例如 `tti_5649544520544f4b454e6e40`，修改 `TestTokenHexPrivKey` 属性值为发放测试代币的账号私钥，例如账号 `vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a` 的私钥为 `7488b076b27aec48692230c88cbe904411007b71981057ea47d757c1e7f7ef24f4da4390a6e2618bec08053a86a6baf98830430cbefc078d978cf396e1c43e3a`；
 * 配置开启时间订阅功能，修改 `SubscribeEnabled` 属性值为 `true`；
 * 按需配置 `PublicModules` ，在 `PublicModules` 中配置的模块可以通过RPC或者WS调用，见[模块列表](../../api/rpc/)。
 
node_config.json完整示例：
```json
{
  "NetID": 5,
  "Identity": "test",
  "MaxPeers": 200,
  "MaxPendingPeers": 20,
  "BootNodes": [
  ],
  "Port": 8483,
  "HttpVirtualHosts": [],
  "IPCEnabled": true,
  "TopoDisabled": true,
  "LogLevel": "info",
  "Single":true,
  "RPCEnabled": true,
  "HttpHost": "0.0.0.0",
  "HttpPort": 48132,
  "WSEnabled": true,
  "WSHost": "0.0.0.0",
  "WSPort": 41420,
  "Miner": true,
  "CoinBase": "0:vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
  "EntropyStorePath": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
  "EntropyStorePassword": "123",
  "GenesisFile": "./genesis.json",
  "DataDir":"gvite/singlemode",
  "KeyStoreDir":"gvite/singlemode",
  "VMTestEnabled":true,
  "TestTokenTti":"tti_5649544520544f4b454e6e40",
  "TestTokenHexPrivKey":"7488b076b27aec48692230c88cbe904411007b71981057ea47d757c1e7f7ef24f4da4390a6e2618bec08053a86a6baf98830430cbefc078d978cf396e1c43e3a",
  "SubscribeEnabled":true,
  "OpenPlugins":true,
  "PublicModules": [
    "wallet",
    "public_onroad",
    "tx",
    "ledger",
    "contract",
    "pledge",
    "register",
    "vote",
    "mintage",
    "net",
    "testapi",
    "dashboard",
    "vmdebug"
  ]
}
```
其中挖矿节点keystore文件 `vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906` 内容为：
```json
{
	"primaryAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
	"crypto": {
		"ciphername": "aes-256-gcm",
		"ciphertext": "807e09cc3e9f48c1742b22096404d98ba61e5c892994242515d48eb84cbee5f2ed93c7805ec32adb259e166fcd62428b",
		"nonce": "41d76fee25bfa544b8212cf6",
		"kdf": "scrypt",
		"scryptparams": {
			"n": 262144,
			"r": 8,
			"p": 1,
			"keylen": 32,
			"salt": "64c5f11657f91680c53bf8b618416a2a4d0c8e46c2cc6dc753fd11c9fc77441c"
		}
	},
	"seedstoreversion": 1,
	"timestamp": 1544422238
}
```

## 修改创世块配置genesis.json
参考[创世块配置文件](../node/genesis_config.html)

genesis_config.json完整示例，包含以下内容：
 * 共识组信息，快照共识组的出块节点每秒出1个块，每个节点连续出3个块，每一轮选出两个出块节点；
 * 两个出块节点
 * vite代币信息
 * 用于获得配额的2个抵押信息
 * 4个账户的余额（其中包括两个内置合约）
```json
{
  "GenesisAccountAddress": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",
  "ForkPoints":{
      "SeedFork":{
        "Height":1,
        "Version":1
      },
      "DexFork":{
        "Height":2,
        "Version":2
      }
    }
  "ConsensusGroupInfo": {
    "ConsensusGroupInfoMap": {
      "00000000000000000001": {
        "NodeCount": 2,
        "Interval": 1,
        "PerCount": 3,
        "RandCount": 2,
        "RandRank": 100,
        "Repeat": 1,
        "CheckLevel": 0,
        "CountingTokenId": "tti_5649544520544f4b454e6e40",
        "RegisterConditionId": 1,
        "RegisterConditionParam": {
          "PledgeAmount": 100000000000000000000000,
          "PledgeToken": "tti_5649544520544f4b454e6e40",
          "PledgeHeight": 0
        },
        "VoteConditionId": 1,
        "VoteConditionParam": {},
        "Owner": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",
        "PledgeAmount": 0,
        "WithdrawHeight": 1
      },
      "00000000000000000002": {
        "NodeCount": 2,
        "Interval": 3,
        "PerCount": 1,
        "RandCount": 2,
        "RandRank": 100,
        "Repeat": 48,
        "CheckLevel": 1,
        "CountingTokenId": "tti_5649544520544f4b454e6e40",
        "RegisterConditionId": 1,
        "RegisterConditionParam": {
          "PledgeAmount": 100000000000000000000000,
          "PledgeToken": "tti_5649544520544f4b454e6e40",
          "PledgeHeight": 7776000
        },
        "VoteConditionId": 1,
        "VoteConditionParam": {},
        "Owner": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",
        "PledgeAmount": 0,
        "WithdrawHeight": 1
      }
    },
    "RegistrationInfoMap": {
      "00000000000000000001": {
        "s1": {
          "NodeAddr": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
          "PledgeAddr": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",
          "Amount": 100000000000000000000000,
          "WithdrawHeight": 7776000,
          "RewardTime": 1,
          "CancelTime": 0,
          "HisAddrList": [
            "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906"
          ]
        },
        "s2": {
          "NodeAddr": "vite_0acbb1335822c8df4488f3eea6e9000eabb0f19d8802f57c87",
          "PledgeAddr": "vite_0acbb1335822c8df4488f3eea6e9000eabb0f19d8802f57c87",
          "Amount": 100000000000000000000000,
          "WithdrawHeight": 7776000,
          "RewardTime": 1,
          "CancelTime": 0,
          "HisAddrList": [
            "vite_0acbb1335822c8df4488f3eea6e9000eabb0f19d8802f57c87"
          ]
        }
      }
    },
    "HisNameMap": {
      "00000000000000000001": {
        "vite_0acbb1335822c8df4488f3eea6e9000eabb0f19d8802f57c87": "s2",
        "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906": "s1"
      }
    },
    "VoteStatusMap": {
      "00000000000000000001":{
        "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792":"s1",
        "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23":"s2"
      }
    }
  },
  "MintageInfo": {
    "TokenInfoMap": {
      "tti_5649544520544f4b454e6e40": {
        "TokenName": "Vite Token",
        "TokenSymbol": "VITE",
        "TotalSupply": 1000000000000000000000000000,
        "Decimals": 18,
        "Owner": "vite_00000000000000000000000000000000000000042d7ef71894",
        "PledgeAmount": 0,
        "PledgeAddr": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",
        "WithdrawHeight": 0,
        "MaxSupply": 115792089237316195423570985008687907853269984665640564039457584007913129639935,
        "OwnerBurnOnly": false,
        "IsReIssuable": true
      }
    },
    "LogList": [
      {
        "Data": "",
        "Topics": [
          "3f9dcc00d5e929040142c3fb2b67a3be1b0e91e98dac18d5bc2b7817a4cfecb6",
          "000000000000000000000000000000000000000000005649544520544f4b454e"
        ]
      }
    ]
  },
  "PledgeInfo": {
    "PledgeBeneficialMap": {
      "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792": 1000000000000000000000,
      "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23": 1000000000000000000000
    },
    "PledgeInfoMap": {
      "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792": [
        {
          "Amount": 1000000000000000000000,
          "WithdrawHeight": 259200,
          "BeneficialAddr": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792"
        }
      ],
      "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23": [
        {
          "Amount": 1000000000000000000000,
          "WithdrawHeight": 259200,
          "BeneficialAddr": "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23"
        }
      ]
    }
  },
  "AccountBalanceMap": {
    "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792": {
      "tti_5649544520544f4b454e6e40": 899798000000000000000000000
    },
    "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23": {
      "tti_5649544520544f4b454e6e40": 100000000000000000000000000
    },
    "vite_00000000000000000000000000000000000000042d7ef71894":{
      "tti_5649544520544f4b454e6e40": 200000000000000000000000
    },
    "vite_000000000000000000000000000000000000000309508ba646":{
      "tti_5649544520544f4b454e6e40": 2000000000000000000000
    }
  }
}
```

节点第一次启动时，会为genesis.json配置中涉及到的账户生成一个类型为7的创世块，并将相应的状态信息（余额、合约状态等）写入创世块中。如果在节点运行一段时间后需要修改创世块内容，那么只需要修改genesis.json文件，删除数据目录下的ledger文件夹，然后重启gvite节点即可。

## 启动测试节点
将node_config.json和genesis.json文件和gvite二进制文件放到同一个目录下。

在当前目录下创建`gvite/singlemode/devdata/wallet`目录，并将挖矿账号的keystore文件`vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906`放到新创建的目录下。

启动gvite，启动时会自动读取node_config.json和genesis.json配置。

检查gvite是否启动成功。

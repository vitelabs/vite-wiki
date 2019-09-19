# 创世块配置文件
```
{
  "GenesisAccountAddress": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792", // 创世账号
  "GovernanceInfo": { // 共识组信息
    "ConsensusGroupInfoMap": {
      "00000000000000000001": { // 共识组id,00000000000000000001为快照共识组，00000000000000000002为公共委托共识组
        // 以下配置表示：
        // 快照共识组每一轮选出2个节点出块，节点每秒出1个快照块，连续出3个快照块后换下一个节点。
        // 选举时根据vite代币来计票，第1个节点为得票最高的节点，第2个节点从得票最高的第2-100个节点中随机选取。
        // 注册快照共识组节点时，需要抵押1000000000000000000000000金额的vite（即100w vite），抵押在7776000个快照块后到期（大约3个月）
        "NodeCount": 2, // 每一轮出块节点数
        "Interval": 1,  // 每个块的出块间隔
        "PerCount": 3,  // 每个节点连续出块的个数
        "RandCount": 1, // 随机选取的出块节点数量
        "RandRank": 100,  // 随机选取的出块节点范围
        "Repeat": 1,  // 共识信息生效轮数，无需更改
        "CheckLevel": 0,  // 共识信息校验等级，无需更改
        "CountingTokenId": "tti_5649544520544f4b454e6e40",  // 共识计票的代币id
        "RegisterConditionId": 1, // 注册信息类型，无需更改
        "RegisterConditionParam": {
          "StakeAmount": 1000000000000000000000000, // 注册出块节点时的抵押金额
          "StakeToken": "tti_5649544520544f4b454e6e40",  // 注册出块节点时抵押的代币id
          "StakeHeight": 7776000 // 注册出块节点时的抵押到期高度
        },
        "VoteConditionId": 1, // 投票信息类型，无需更改
        "VoteConditionParam": {}, // 无需更改
        "Owner": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792", // 共识组所有者，无需更改
        "StakeAmount": 0,  // 共识组抵押金额，无需更改
        "ExpirationHeight": 1 // 共识组抵押到期高度，无需更改
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
          "StakeAmount": 1000000000000000000000000,
          "StakeToken": "tti_5649544520544f4b454e6e40",
          "StakeHeight": 7776000
        },
        "VoteConditionId": 1,
        "VoteConditionParam": {},
        "Owner": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",
        "StakeAmount": 0,
        "ExpirationHeight": 1
      }
    },
    "RegistrationInfoMap": {  // 出块节点信息
      "00000000000000000001": { // 当前快照共识组共有两个出块节点
        "s1": { // 出块节点名称
          "BlockProducingAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",  // 出块地址
          "StakeAddress": "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906",  // 抵押地址
          "Amount": 1000000000000000000000000, // 抵押金额
          "ExpirationHeight": 7776000,  // 抵押到期高度
          "RewardTime": 1,  // 出块奖励起始高度
          "RevokeTime": 0,  // 出块节点取消时间
          "HisAddrList": [  // 历史出块地址
            "vite_e41be57d38c796984952fad618a9bc91637329b5255cb18906"
          ]
        },
        "s2": {
          "BlockProducingAddress": "vite_0acbb1335822c8df4488f3eea6e9000eabb0f19d8802f57c87",
          "StakeAddress": "vite_0acbb1335822c8df4488f3eea6e9000eabb0f19d8802f57c87",
          "Amount": 1000000000000000000000000,
          "ExpirationHeight": 7776000,
          "RewardTime": 1,
          "RevokeTime": 0,
          "HisAddrList": [
            "vite_0acbb1335822c8df4488f3eea6e9000eabb0f19d8802f57c87"
          ]
        }
      }
    }
    "VoteStatusMap": {  // 投票信息
      "00000000000000000001":{  // 当前快照共识组共有两个账号投票
        "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792":"s1", // 投票地址:获得投票的出块节点名称
        "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23":"s2"
      }
    }
  },
  "AssetInfo": {  // 代币信息
    "TokenInfoMap": {
      "tti_5649544520544f4b454e6e40": { // 代币id，当前为vite代币
        "TokenName": "Vite Token",  // 代币名称
        "TokenSymbol": "VITE",  // 代币简称
        "TotalSupply": 1000000000000000000000000000,  // 总发行量，vite的总发行量为1e9 * 1e18
        "Decimals": 18, // 小数位数
        "Owner": "vite_0000000000000000000000000000000000000004d28108e76b", // 代币所有者
        "StakeAmount": 0,  // 铸币时抵押的vite金额
        "StakeAddress": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",  // 铸币时的抵押地址
        "ExpirationHeight": 0,  // 铸币时的抵押到期高度
        "MaxSupply": 115792089237316195423570985008687907853269984665640564039457584007913129639935,  // 可增发代币的最大发行量
        "IsOwnerBurnOnly": false, // 是否只允许代币所有者销毁代币
        "IsReIssuable": true  // 是否为可增发代币
      }
    }
  },
  "QuotaInfo": { // 获得配额的抵押信息
    "StakeBeneficialMap": {  // 抵押受益信息
      "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792": 1000000000000000000000,  // 抵押受益地址:受益总金额
      "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23": 1000000000000000000000
    },
    "StakeInfoMap": {  // 抵押信息
      "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792": [  // 抵押地址
        {
          "Amount": 1000000000000000000000, // 抵押金额
          "ExpirationHeight": 259200, // 抵押到期高度
          "Beneficiary": "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792" // 受益地址
        }
      ],
      "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23": [
        {
          "Amount": 1000000000000000000000,
          "ExpirationHeight": 259200,
          "Beneficiary": "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23"
        }
      ]
    }
  },
  "AccountBalanceMap": {  // 账户余额
    "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792": {  // 账户地址
      "tti_5649544520544f4b454e6e40": 899798000000000000000000000 // 代币id:代币余额
    },
    "vite_56fd05b23ff26cd7b0a40957fb77bde60c9fd6ebc35f809c23": {
      "tti_5649544520544f4b454e6e40": 100000000000000000000000000
    },
    "vite_0000000000000000000000000000000000000004d28108e76b":{ // 共识组内置合约的账户余额
      "tti_5649544520544f4b454e6e40": 200000000000000000000000
    },
    "vite_0000000000000000000000000000000000000003f6af7459b9":{ // 抵押合约的账户余额
      "tti_5649544520544f4b454e6e40": 2000000000000000000000
    }
  }
}
```

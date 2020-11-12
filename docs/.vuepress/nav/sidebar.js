module.exports = {
    introduction: [
        {
            zh: '介绍',
            en: 'Introduction',
            children: [
                '',
                'dag-ledger',
                'asynchronous-architecture',
                'other',
                'vite-token'
            ]
        }
    ],
    technology: [
        {
            zh: '开始',
            en: 'Start',
            children: [
                '',
                'design-features'
            ]
        },
        {
            zh: '地址',
            en: 'Address',
            children: [
                'gen-address'
            ]
        },
        {
            zh: '账本',
            en: 'Ledger',
            children: [
                'ledger-struct'
            ]
        },
        {
            zh: '技术文章',
            en: 'Tech Articles',
            children: [
                'built-in-contract',
                'Backend-service',
                'viteX-contract',
                'Vite-EOS-Contract',
                'viteX-Decent',
                'viteX-graphic',
                'Vite-con',
                'Vite-asynchronous',
                'ViteJS-talk',
                'Vite-Built-in-timer',
                'Vite-storage-layer',
                'Vite-blockDB',
                'Vite-indexDB'
            ]
        }
    ],
    tutorial: [
        {
            zh: '开始',
            en: 'Start',
            children: [
                'start/',
            ]
        },
        {
            zh: '钱包',
            en: 'Wallet',
            children: [
                // 'wallet/install',
                // 'wallet/manage',
                'wallet/hdwallet',
                'wallet/ledger-install',
            ]
        },
        {
            zh: '节点',
            en: 'Node',
            children: [
                'node/install',
                'node/wallet-manage',
                // 'node/fullnode',
                'node/sbp',
                'node/node_config',
                'node/example',
                'node/pre_mainnet_config'
            ]
        },
        {
            zh: '深入了解',
            en: 'Rules',
            children: [
                'rule/sbp',
                'rule/fullnode',
                'rule/quota',
                'rule/mintage',
                'rule/vote'
            ]
        },
        {
            zh: '智能合约',
            en: 'Smart contract',
            children: [
                'contract/contract',
                'contract/soliditypp',
                'contract/debug',
                'contract/instructions',
                'contract/subscribe',
                'contract/dapp'
            ]
        },
        {
            zh: 'FAQ',
            en: 'FAQ',
            children: [
                'faq/node',
                'faq/develop'
            ]
        }
    ],
    'api/rpc': [
        {
            zh: 'Vite RPC API',
            en: 'Vite RPC API',
            children: ['']
        },
        {
            zh: '钱包',
            en: 'Wallet',
            children: [
                'wallet_v2'
            ]
        },
        {
            zh: '账本',
            en: 'Ledger',
            children: [
                'ledger_v2'
            ]
        },
        {
            zh: '智能合约',
            en: 'Smart Contract',
            children: [
              'contract_v2'
            ]
        },
        {
            zh: '网络',
            en: 'Net',
            children: [
                'net'
            ]
        },
        {
            zh: '其他',
            en: 'Common',
            children: [
                'common_models_v2',
                'util',
                'subscribe_v2'
            ]
        },
    ],
    'api/vitejs': [
        {
            zh: 'Vite.js',
            en: 'Vite.js',
            children: ['', 'types', 'errors', 'QA']
        },
        {
            zh: 'ViteAPI',
            en: 'ViteAPI',
            children: ['ViteAPI/start', 'ViteAPI/GViteRPC']
        },
        {
            zh: 'AccountBlock',
            en: 'AccountBlock',
            children: ['accountBlock/start', 'accountBlock/createAccountBlock', 'accountBlock/accountBlock', 'accountBlock/receiveAccountBlockTask', 'accountBlock/utils']
        },
        {
            zh: 'Wallet',
            en: 'Wallet',
            children: ['wallet/start', 'wallet/wallet', 'wallet/more']
        },
        {
            zh: '更多',
            en: 'More',
            children: ['tool/http', 'tool/websocket', 'tool/ipc', 'tool/abi', 'tool/utils', 'tool/keystore']
        }
    ],
    'api/javasdk': [
        {
            zh: 'ViteJava',
            en: 'ViteJava',
            children: ['','faq','types','wallet','rpc','quota','sbp','asset','subscribe','utils']
        }
    ],
    vep: [
        {
            zh: '提案',
            en: 'VEP',
            children: [
                '',
                'vep-3',
                'vep-4',
                'vep-5',
                'vep-6',
                'vep-7',
                'vep-8',
                'vep-10',
                'vep-12',
                'vep-13',
                'vep-15',
                'vep-16',
                'vep-17',
                'vep-18'
            ]
        }
    ],
    dex: [
        {
            zh: '介绍',
            en: 'Introduction',
            children: ['']
        },
        {
            zh: '开发文档',
            en: 'Developers',
            children: ['api/gate', 'api/dex-apis']
        },
        {
            zh: '教程',
            en: 'Tutorial',
            children: [
                'operation/gate-integration',
                'mm'
                // 'operation/', 'operation/how-to', 'operation/tutorial'
            ]
        }
    ]
};

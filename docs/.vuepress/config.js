const path = require('path')

const docBranch = process.env.BRANCH || 'master'
const searchFilter = 'version: ' + docBranch

const sidebarConfigs = {
    introduction: [
        {
            collapsable: false,
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
            collapsable: false,
            children: [
                '',
                'design-features'
            ]
        },
        {
            collapsable: false,
            children: [
                'gen-address'
            ]
        },
        {
            collapsable: false,
            children: [
                'ledger-struct'
            ]
        }
    ],
    tutorial: [
        {
            collapsable: false,
            children: [
                'start/',
            ]
        },
        {
            collapsable: false,
            children: [
                'wallet/install',
                'wallet/manage',
                'wallet/hdwallet',
            ]
        },
        {
            collapsable: false,
            children: [
                'node/install',
                'node/wallet-manage',
                // 'node/fullnode',
                'node/sbp',
                'node/node_config',
                'node/example',
            ]
        },
        {
            collapsable: false,
            children: [
                'rule/sbp',
                'rule/fullnode',
                'rule/quota',
                'rule/mintage',
                'rule/vote'
            ]
        },
        {
          collapsable: false,
          children: [
              'contract/contract',
              'contract/soliditypp',
              'contract/debug',
              'contract/instructions',
              'contract/subscribe'
          ]
        }
    ],
    'api/rpc': [
        {
            collapsable: false,
            children: [
                '',
            ]
        },

        // wallet
        {
            collapsable: false,
            children: [
                'wallet',
                'onroad',
                'tx',
            ]
        },
        // ledger
        {
            collapsable: false,
            children: [
                'ledger',
            ]
        },

        // consensus
        {
            collapsable: false,
            children: [
                'consensus_group',
            ]
        },

        // smart-contract
        {
          collapsable: false,
          children: [
            'contract'
          ]
        },

        // build-in smart-contract
        {
            collapsable: false,
            children: [
                'pledge',
                'register',
                'vote',
                'mintage',
            ]
        },

        // net
        {
            collapsable: false,
            children: [
                'net',
            ]
        },

        // common
        {
            collapsable: false,
            children: [
                'testapi',
                'common_models',
                'pow',
                'subscribe'
            ]
        },
    ],
    'api/vitejs': [
        {
            collapsable: false,
            children: [
                ''
            ]
        },
        {
            collapsable: false,
            children: [
                'provider', 'provider/http', 'provider/websocket', 'provider/ipc'
            ]
        },
        {
            collapsable: false,
            children: [
                'utils/address', 'utils/keystore', 'utils/encoder', 'utils/tools', 'utils/ed25519', 'utils/accountBlock', 'utils/abi'
            ]
        },
        {
            collapsable: false,
            children: [
                'constant/contract', 'constant/error', 'constant/method', 'constant/type'
            ]
        },
        {
            collapsable: false,
            children: [
                'client', 'client/builtinTxBlock', 'client/builtinLedger'
            ]
        },
        {
            collapsable: false,
            children: [
                'wallet', 'wallet/account', 'wallet/walletAccount'
            ]
        }
    ],
    vep: [
        {
            collapsable: false,
            children: [
                '',
                'vep-3',
                'vep-4',
                'vep-5',
                'vep-6',
                'vep-7'
            ]
        }
    ]
};


module.exports = {
    dest: 'dist',
    locales: {
        '/': {
            lang: 'en-US',
            title: 'VITE Document',
            description: 'A Next Generation High-performance Decentralized Application Platform'
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'VITE 文档',
            description: '新一代高性能去中心化应用平台'
        }
    },
    head: [
        ['link', { rel: 'icon', href: `/icon.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    configureWebpack: {
        resolve: {
            alias: {
                'images': path.resolve(__dirname, '../../assets/images')
            }
        }
    },
    plugins: [
        ['@vuepress/google-analytics', {
          ga: 'UA-116567941-2'
        }],
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: true
        }],
        '@vuepress/medium-zoom',
        '@vuepress/back-to-top',
        '@vuepress/i18n-ui',
        '@vite/vuepress-plugin-mathjax',
        '@vuepress/plugin-notification',
        [require('./plugins/tab-code-example')]
    ],
    themeConfig: {
        editLinks: true,
        docsDir: 'docs',
        search: true,
        docsRepo: 'vitelabs/vite-wiki',
        sidebarDepth: 3,
        logo: '/logo_black.svg',
        repo: 'vitelabs/go-vite',
        docsBranch: docBranch,
        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                nav: require('./nav/en'),
                sidebar: {
                    '/introduction/': genSidebarConfig('introduction', 'Introduction'),
                    '/tutorial/': genSidebarConfig('tutorial', 'Start', 'Wallet', 'Node', 'Rules', 'Smart contract'),
                    '/api/rpc/': genSidebarConfig('api/rpc', 'RPC interface', 'Wallet', 'Ledger', 'Consensus', 'Smart Contract', 'Build-in contracts', 'P2P', 'Common'),
                    '/api/vitejs/': genSidebarConfig('api/vitejs', 'Vite JS', 'provider', 'utils', 'constant', 'client', 'wallet'),
                    '/vep/': genSidebarConfig('vep', 'VEP'),
                },
                algolia: {
                    apiKey: 'fe006d1336f2a85d144fdfaf4a089378',
                    indexName: 'vite_labs',
                    algoliaOptions: {
                        facetFilters: ['lang:en', searchFilter],
                        hitsPerPage: 10
                    }
                }
            },
            '/zh/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                nav: require('./nav/zh'),
                sidebar: {
                    // '/zh/introduction/': genSidebarConfig('introduction', '介绍'),
                    '/zh/technology/': genSidebarConfig('technology', '开始', '地址', '账本', 'VEP'),
                    '/zh/vep/': genSidebarConfig('vep', '提案'),
                    '/zh/tutorial/': genSidebarConfig('tutorial', '开始', '钱包', '节点', '深入了解', '智能合约'),
                    '/zh/api/rpc/': genSidebarConfig('api/rpc', 'RPC 接口', '钱包', '账本', '共识', '智能合约', '内置合约', 'P2P', '公共组件'),
                    '/zh/api/vitejs/': genSidebarConfig('api/vitejs', 'Vite JS', '网络连接层', '工具集合', '常量', '接口', '钱包')
                },
                algolia: {
                    apiKey: 'fe006d1336f2a85d144fdfaf4a089378',
                    indexName: 'vite_labs',
                    algoliaOptions: {
                        facetFilters: ['lang:zh', searchFilter],
                        hitsPerPage: 10
                    }
                },
                demo: {
                    errorMessage: 'JSON解析失败，请检查代码格式是否正确。以下是错误信息：',
                    successMessage: '运行结果:',
                    resetMessage: '重置代码成功'
                }
            }
        },
    }
}

function genSidebarConfig(nav, ...titles) {
    return sidebarConfigs[nav].map((item, index) => {
        return Object.assign({}, item, {
            title: titles[index]
        })
    })
}



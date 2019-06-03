const path = require('path')
const fs = require('fs')

const docBranch = process.env.BRANCH || 'master'
const searchFilter = 'version: ' + docBranch

const sidebarConfigs = {
    introduction: [
        {
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
            children: [
                '',
                'design-features'
            ]
        },
        {
            children: [
                'gen-address'
            ]
        },
        {
            children: [
                'ledger-struct'
            ]
        }
    ],
    tutorial: [
        {
            children: [
                'start/',
            ]
        },
        {
            children: [
                'wallet/install',
                'wallet/manage',
                'wallet/hdwallet',
            ]
        },
        {
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
            children: [
                'rule/sbp',
                'rule/fullnode',
                'rule/quota',
                'rule/mintage',
                'rule/vote'
            ]
        },
        {
          children: [
              'contract/contract',
              'contract/soliditypp',
              'contract/debug',
              'contract/instructions',
              'contract/subscribe',
              'contract/dapp'
          ]
        }
    ],
    'api/rpc': [
        {
            children: ['']
        },

        // wallet
        {
            children: [
                'wallet',
                'tx',
            ]
        },
        // ledger
        {
            children: [
                'ledger',
            ]
        },
        // onroad
        {
            children: [
                'onroad',
            ]
        },
        // smart-contract
        {
            children: [
              'contract'
            ]
        },

        // build-in smart-contract
        {
            children: [
                'pledge',
                'consensus',
                'mintage',
                'dex',
            ]
        },

        // net
        {
            children: [
                'net',
            ]
        },

        // common
        {
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
            children: ['']
        },
        {
            children: ['provider/provider', 'provider/http', 'provider/websocket', 'provider/ipc', 'provider/netProcessor']
        },
        {
            children: ['constant/error', 'constant/constant']
        },
        {
            children: ['tool/utils', 'tool/keystore', 'tool/abi', 'tool/privToAddr', 'tool/hdAddr', 'tool/accountBlock']
        },
        {
            children: ['client/client', 'client/instance', 'client/builtinTxBlock']
        },
        {
            children: ['wallet/wallet', 'wallet/addrAccount', 'wallet/account', 'wallet/hdAccount']
        }
    ],
    vep: [
        {
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
                'vep-15'
            ]
        }
    ],
    dex: [
      {
        children: ['']
      },
      {
        children: ['api/', 'api/gate', 'api/state']
      },
      {
        children: ['operation/', 'operation/how-to', 'operation/tutorial', 'operation/integration']
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
        ['mathjax', {
          target: 'svg',
          macros: {
            '*': '\\times',
          },
        }],
        '@vuepress/plugin-notification',
        ['redirect', {
          locales: true,
          storage: true
        }],
        'seo',
        'baidu-autopush',
        'pangu',
        'tabs',
        [require('./plugins/tab-code-example')],
        [
          '@vuepress/last-updated',
          {
            transformer: (timestamp, lang) => {
              const moment = require('moment')
              moment.locale(lang)
              return moment(timestamp).fromNow()
            }
          }
        ]
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
                    '/introduction/': genSidebarConfig('introduction', 'en', 'Introduction'),
                    '/tutorial/': genSidebarConfig('tutorial', 'en', 'Start', 'Wallet', 'Node', 'Rules', 'Smart contract'),
                    '/api/rpc/': genSidebarConfig('api/rpc', 'en', 'RPC interface', 'Wallet', 'Ledger', 'Onroad', 'Smart Contract', 'Build-in contracts', 'P2P', 'Common'),
                    '/api/vitejs/': genSidebarConfig('api/vitejs', 'en', 'Vite JS', 'Network Connection', 'Constants', 'Tools', 'Client', 'Wallet'),
                    '/vep/': genSidebarConfig('vep', 'en', 'VEP'),
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
                    '/zh/technology/': genSidebarConfig('technology', 'zh', '开始', '地址', '账本', 'VEP'),
                    '/zh/vep/': genSidebarConfig('vep', 'zh', '提案'),
                    '/zh/tutorial/': genSidebarConfig('tutorial', 'zh', '开始', '钱包', '节点', '深入了解', '智能合约', '交易所'),
                    '/zh/api/rpc/': genSidebarConfig('api/rpc', 'zh', 'RPC 接口', '钱包', '账本', '在途', '智能合约', '内置合约', 'P2P', '公共组件'),
                    '/zh/api/vitejs/': genSidebarConfig('api/vitejs', 'zh', 'Vite JS', '网络连接', '常量', '工具', 'Client', '钱包'),
                    '/zh/dex/': genSidebarConfig('dex', 'zh', '介绍', 'API', '教程', '运营')
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

function genSidebarConfig(nav, lang, ...titles) {
    lang = lang === 'en' ? '' : lang
    let itemList = sidebarConfigs[nav].map((item, index) => {
        return Object.assign({
          collapsable: true
        }, item, {
            title: titles[index]
        })
    })
    itemList.forEach(item => {
        let children = item.children
        if (Array.isArray(children)) {
          item.children = children.filter(childrenItem => {
            childrenItem = childrenItem || '/'
            let tmpPath = path.join(path.resolve(__dirname, '../'), lang, nav, childrenItem)
            let result = isFileExist(tmpPath)
            if (!result) {
              console.warn('没有找到该文件：' + path.join(lang, nav, childrenItem));
            }
            return result
          })
        }
    })
    return itemList
}

function isFileExist(file) {
  if (file[file.length - 1] === '/') {
    file = file + 'README'
  }
  if (file.extname !== '.md') {
    file = file + '.md'
  }
  try {
    fs.accessSync(file, fs.constants.F_OK)
    return true;
  }
  catch (e) {
    return false;
  }
}



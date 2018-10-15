const path = require('path')
const markdownConfig = require('./markdown')

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
  api: [
    {
      collapsable: false,
      children: [
        'rpc/',
        'rpc/wallet',
        'rpc/p2p',
        'rpc/onroad',
        'rpc/contracts',
        'rpc/common_models',
        'rpc/testapi',
        'rpc/pow',
      ]
    }
  ],
  vep: [
    {
      collapsable: false,
      children: [
        '',
        'uri-standard.md'
      ]
    }
  ]
}


module.exports = {
  dest: 'dist',
  ga: 'UA-116567941-1',
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
  serviceWorker: true,
  configureWebpack: {
    resolve: {
      alias: {
        'images': path.resolve(__dirname, '../../assets/images')
      }
    }
  },
  markdown: {
     toc: { includeLevel: [2, 3, 4] },
     config: markdownConfig
  },
  themeConfig: {
    editLinks: true,
    docsDir: 'docs',
    search: true,
    docsRepo: 'vitelabs/vite-wiki',
    sidebarDepth: 3,
    logo: '/logo_black.svg',
    repo: 'vitelabs/go-vite',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
             message: "New content is available.",
             buttonText: "Refresh"
          }
        },
        nav: [
          {
            text: 'Introduction',
            link: '/introduction/',
          },
          // {
          //   text: 'Technology Detail',
          //   link: '/technology/'
          // },
          // {
          //   text: 'API',
          //   items: [
          //     {
          //       text: 'go-vite',
          //       link: '/api/go-vite/'
          //     }
          //   ]
          // }
        ],
        sidebar: {
          '/introduction/': genSidebarConfig('introduction', 'Introduction'),
          '/technology/': genSidebarConfig('technology', 'Technology Detail')
        },
        algolia: {
          apiKey: 'fe006d1336f2a85d144fdfaf4a089378',
          indexName: 'vite_labs',
          algoliaOptions: {
            facetFilters: ["lang:en"],
            hitsPerPage: 10
          }
        }
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
          }
        },
        nav: [
          {
            text: '介绍',
            link: '/zh/introduction/',
          },
          {
            text: '技术细节',
            link: '/zh/technology/'
          },
          {
            text: 'API',
            items: [
              {
                text: 'RPC 接口',
                link: '/zh/api/rpc/'
              }
            ]
          },
          {
            text: 'VEP',
            link: '/zh/vep/'
          },
          {
            text: '关于',
            link: '/zh/about/'
          }
        ],
        sidebar: {
          '/zh/introduction/': genSidebarConfig('introduction', '介绍'),
          '/zh/technology/': genSidebarConfig('technology', '开始', '地址', '账本', 'VEP'),
          '/zh/api/': genSidebarConfig('api', 'RPC 接口'),
          '/zh/vep/': genSidebarConfig('vep', '提案')
        },
        algolia: {
          apiKey: 'fe006d1336f2a85d144fdfaf4a089378',
          indexName: 'vite_labs',
          algoliaOptions: {
            facetFilters: ["lang:zh"],
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

function genSidebarConfig (nav, ...titles) {
  return sidebarConfigs[nav].map((item, index) => {
    return Object.assign({}, item, {
      title: titles[index]
    })
  })
}

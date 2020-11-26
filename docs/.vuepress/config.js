const path = require('path')
const fs = require('fs')
const slugify = require('transliteration').slugify;

const docBranch = process.env.BRANCH || 'master'
const searchFilter = 'version: ' + docBranch

const sidebarConfigs = require('./nav/sidebar');


module.exports = {
    dest: 'dist',
    extraWatchFiles: [
        '.vuepress/nav/en.js',
        '.vuepress/nav/zh.js',
        '.vuepress/nav/sidebar.js'
    ],
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
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
        ['meta', { name: 'google-site-verification', content: 'aFFDoYqDZ_SUQtuOmoAjiKaq0A8TzrTS-X1MR-jdfUU'}]
    ],
    configureWebpack: {
        resolve: {
            alias: {
                'images': path.resolve(__dirname, '../../assets/images')
            }
        }
    },
    markdown: {
        anchor: {
            permalink: true, 
            permalinkBefore: true, 
            permalinkSymbol: '#',
            slugify: slugify
        },
        slugify: slugify
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
        }],
        '@vuepress/plugin-notification',
        ['seo', {
          siteTitle: (_, $site) => $site.title,
          title: $page => $page.title,
          description: $page => $page.frontmatter.description || $page.title,
          author: (_, $site) => 'Vite Labs',
          tags: $page => $page.frontmatter.tags,
          twitterCard: _ => 'summary_large_image',
          type: $page => ['articles', 'posts', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
          url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
          image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain || '') + $page.frontmatter.image),
          publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
          modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        }],
        'baidu-autopush',
        [
          '@vuepress/last-updated',
          {
            transformer: (timestamp, lang) => {
              return new Date(timestamp).toLocaleDateString();
            }
          }
        ],
        ['sitemap', {
          hostname: 'https://vite.wiki'
        }],
        'pangu',
        ['tabs', {
          dedupeIds: true,
          tabsAttributes: {
            options: {
              useUrlFragment: false
            }
          }
        }],
        [require('./plugins/tab-code-example')]
    ],
    themeConfig: {
        editLinks: true,
        docsDir: 'docs',
        search: true,
        docsRepo: 'vitelabs/vite-wiki',
        sidebarDepth: 4,
        logo: '/logo_black.svg',
        repo: 'vitelabs/go-vite',
        docsBranch: docBranch,
        image: 'https://vite.wiki/icon.png',
        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                nav: require('./nav/en'),
                sidebar: {
                    '/introduction/': genSidebarConfig('introduction', 'en'),
                    '/technology/': genSidebarConfig('technology', 'en'),
                    '/tutorial/': genSidebarConfig('tutorial', 'en'),
                    '/api/rpc/': genSidebarConfig('api/rpc', 'en'),
                    '/api/vitejs/': genSidebarConfig('api/vitejs', 'en'),
                    '/api/javasdk/': genSidebarConfig('api/javasdk', 'en'),
                    '/vep/': genSidebarConfig('vep', 'en'),
                    '/dex/': genSidebarConfig('dex', 'en')
                },
                algolia: {
                    apiKey: 'fe006d1336f2a85d144fdfaf4a089378',
                    indexName: 'vite_labs',
                    algoliaOptions: {
                        facetFilters: ['lang:en', searchFilter],
                        hitsPerPage: 30
                    },
                    debug: false,
                    autocompleteOptions: {
                      openOnFocus: true
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
                    '/zh/introduction/': genSidebarConfig('introduction', 'zh'),
                    '/zh/technology/': genSidebarConfig('technology', 'zh'),
                    '/zh/vep/': genSidebarConfig('vep', 'zh'),
                    '/zh/tutorial/': genSidebarConfig('tutorial', 'zh'),
                    '/zh/api/rpc/': genSidebarConfig('api/rpc', 'zh'),
                    '/zh/api/vitejs/': genSidebarConfig('api/vitejs', 'zh'),
                    '/zh/api/javasdk/': genSidebarConfig('api/javasdk', 'zh'),
                    '/zh/dex/': genSidebarConfig('dex', 'zh')
                },
                algolia: {
                    apiKey: 'fe006d1336f2a85d144fdfaf4a089378',
                    indexName: 'vite_labs',
                    algoliaOptions: {
                        facetFilters: ['lang:zh', searchFilter],
                        hitsPerPage: 30
                    },
                    debug: false,
                    autocompleteOptions: {
                      openOnFocus: true
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

function genSidebarConfig(nav, _lang) {
    lang = _lang === 'en' ? '' : _lang
    let itemList = sidebarConfigs[nav].map((item, index) => {
        return Object.assign({
          collapsable: false
        }, item, {
            title: item[_lang]
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

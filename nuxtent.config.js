const Prism = require('prismjs')
const externalLinks = require('markdown-it-link-attributes')
const emoji = require('markdown-it-emoji')
const twemoji = require('twemoji')

module.exports = {
  content: [
    ['en', {
      page: '/_slug',
      permalink: '/en/wiki/:slug',
      isPost: false,
      generate: ['get', 'getAll'],
      anchorsLevel: 4
    }],
    ['zh', {
      page: '/_slug',
      permalink: '/zh/wiki/:slug',
      isPost: false,
      generate: ['get', 'getAll'],
      anchorsLevel: 4
    }]
  ],
  api: function (isStatic) {
    return {
      browserBaseURL: isStatic ? 'http://localhost:5000' : '',
      baseURL: 'http://localhost:3000'
    }
  },
  parsers: {
    md: {
      extend (config) {
        config.highlight = (code, lang) => {
          return `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)}</code></pre>`
        }
      },
      plugins: [
        emoji,
        [ externalLinks, { target: '_blank', rel: 'noopener' } ]
      ],
      customize (parser) {
        parser.linkify.tlds('onion')
        parser.renderer.rules['emoji'] = (token, idx) => {
          return twemoji.parse(token[idx].content)
        }
      }
    }
  },
  css: [
    'prismjs/themes/prism-coy.css'
  ]
}

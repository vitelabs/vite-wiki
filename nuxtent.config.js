const Prism = require('prismjs')
const externalLinks = require('markdown-it-link-attributes')
const emoji = require('markdown-it-emoji')
const twemoji = require('twemoji')
const markdownItAnchor = require('markdown-it-headinganchor')

const anchorsLevel = 2

const contentConfig = {
  page: '/_slug',
  permalink: '/wiki/:slug',
  isPost: false,
  generate: ['get', 'getAll'],
  anchorsLevel: anchorsLevel
}

const supportLangs = ['en', 'zh']

module.exports = {
  content: supportLangs.map(item => {
    return [item, Object.assign({}, contentConfig, {
      permalink: `/${item}${contentConfig.permalink}`
    })]
  }),
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
        [ externalLinks, { target: '_blank', rel: 'noopener' } ],
        [
          markdownItAnchor, {}
        ]
      ],
      customize (parser) {
        parser.linkify.tlds('onion')
        parser.renderer.rules['emoji'] = (token, idx) => {
          return twemoji.parse(token[idx].content)
        }
      }
    }
  }
}

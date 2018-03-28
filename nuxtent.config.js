const Prism = require('prismjs')
const externalLinks = require('markdown-it-link-attributes')
const emoji = require('markdown-it-emoji')
const twemoji = require('twemoji')
const markdownItAnchor = require('markdown-it-headinganchor')
const markdownItMathjax = require('markdown-it-mathjax')

const anchorsLevel = 2

const contentConfig = {
  page: '/_slug',
  permalink: '/:slug',
  isPost: false,
  generate: ['get', 'getAll'],
  anchorsLevel: anchorsLevel
}

const supportLangs = ['en', 'zh']
const supportNavs = ['tech', 'whitePaper', 'faq', 'about']
let content = []

supportLangs.forEach(lang => {
  supportNavs.forEach(item => {
    content.push([`${lang}/${item}`, Object.assign({}, contentConfig, {
      permalink: `/${lang}/${item}${contentConfig.permalink}`
    })])
  })
})

console.log(content)

module.exports = {
  content,
  api: function (isStatic) {
    return {
      browserBaseURL: isStatic ? 'http://doc.vite.org' : '',
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
        ],
        markdownItMathjax
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

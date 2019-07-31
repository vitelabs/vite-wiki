const path = require('path');
const _ = require('lodash');
const container = require('markdown-it-container')
const variable = require('../../variable')


module.exports = (options, ctx) => {
  return {
    async ready() {
      options = Object.assign(options, {
        name: options.name || 'demo'
      })
    },
    extendMarkdown: md => {
      let name = options.name || 'demo'

      // for test
      const fence = md.renderer.rules.fence
      md.renderer.rules.fence = (...args) => {
        const [tokens, idx] = args
        const token = tokens[idx]
        let rawCode = fence(...args)
        if (token.markup === '```' && token.info.indexOf('replace') > -1) {
          let tokenInfo = token.info.trim().split(' ').map(item => item.trim())
          let index = tokenInfo.indexOf('replace')
          if (index === -1) return
          tokenInfo.slice(index + 1).forEach(item => {
            if (variable[item]) {
              rawCode = rawCode.replace(new RegExp('\\$\{' + item +'\}', 'gm'), variable[item])
            }
          })
        }
        return `<!--beforebegin--><div class="language-${token.info.trim()} extra-class">`
          + `<!--afterbegin-->${rawCode}<!--beforeend--></div><!--afterend-->`
      }

      md
        .use(...createContainer(name, name.toUpperCase()))
        // explicitly escape Vue syntax
        .use(container, 'v-pre', {
          render: (tokens, idx) => tokens[idx].nesting === 1
            ? `<div v-pre>\n`
            : `</div>\n`
        })
    },
    enhanceAppFiles: [
      path.resolve(__dirname, 'client.js')
    ],
    plugins: [
      '@vuepress/plugin-notification'
    ]
  }
}


function findCode (index, tokens) {
  let result = [];
  for (let i = index + 1; i < tokens.length; i++) {
    if (tokens[i].markup === '```') {
      tokens[i].info = tokens[i].info.trim().replace(/"/g, "'")
      // console.log(tokens[i].info)
      result.push(tokens[i])
    }
    if (tokens[i].type === 'container_demo_close') {
      return result
    }
  }
  return result
}


function createContainer (klass, defaultTitle) {
  return [container, klass, {
    render (tokens, idx) {
      const token = tokens[idx]
      const info = token.info.trim().slice(klass.length).trim()
      if (token.nesting === 1) {
        let codeContent = JSON.stringify(findCode(idx, tokens))
        return `<demo class="custom-block-${klass}"> <template slot="code">${codeContent}</template> \n`
      } else {
        return `</demo>\n`
      }
    }
  }]
}

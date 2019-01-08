const fs = require('fs');
const path = require('path');
const container = require('markdown-it-container')


module.exports = (options, ctx) => {
  return {
    async ready() {
      options = Object.assign(options, {
        name: options.name || 'demo'
      })
    },
    extendMarkdown: md => {
      let name = options.name || 'demo'
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
      tokens[i].content = tokens[i].content && tokens[i].content.substring(0, tokens[i].content.length - 1)
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

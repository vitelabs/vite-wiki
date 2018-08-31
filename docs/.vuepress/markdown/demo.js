const container = require('markdown-it-container')
const fs = require('fs')
const path = require('path')


module.exports = md => {
  md
    .use(...createContainer('demo', 'DEMO'))
    // explicitly escape Vue syntax
    .use(container, 'v-pre', {
      render: (tokens, idx) => tokens[idx].nesting === 1
        ? `<div v-pre>\n`
        : `</div>\n`
    })
}

function findCode (index, tokens) {
  let result = [];
  for (let i = index + 1; i < tokens.length; i++) {
    if (tokens[i].markup === '```') {
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

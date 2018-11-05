const markdownItMathjax = require('markdown-it-mathjax')
const demo = require('./demo')

module.exports = md => {
  md.use(demo)
  md.use(markdownItMathjax())
};

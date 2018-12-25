const path = require('path')

module.exports = (options, ctx) => {
  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'client.js')
    ]
  }
}

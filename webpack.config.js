const { resolve } = require('path');
const markdown2html = require('./plugins/markdown2html');

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  plugins:[
    new markdown2html({
      template: resolve(__dirname, 'test.md'),
      filename: 'index.html'
    })
  ]
}
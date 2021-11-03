const { readFileSync } = require('fs');
const { resolve } = require('path');
const { complierMarkdown } = require('./complierMarkdown');

const MARK_INNER = '<!-- inner -->';

class markdown2html {
  constructor({ template, filename }) {
    if(!template) {
      throw new Error('template必填！');
    }

    this.template = template;
    this.filename = filename || 'test.html';
  }

  apply(complier) {
    complier.hooks.emit.tap('markdown2html', (compilation) => {
      const _assets = compilation.assets;
      const _markdownContent = readFileSync(resolve(this.template), 'utf8');
      const _templateContent = readFileSync(resolve(__dirname, 'template.html'), 'utf8');
      const _markdownContentArr = _markdownContent.split('\n');

      const _htmlContent = complierMarkdown(_markdownContentArr);
      const _finalContent = _templateContent.replace(MARK_INNER, _htmlContent);

      _assets[this.filename] = {
        source() {
          return _finalContent;
        },
        size() {
          return _finalContent.length;
        }
      }

    });
  }
}

module.exports = markdown2html;
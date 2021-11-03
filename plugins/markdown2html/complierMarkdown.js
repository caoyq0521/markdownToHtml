const reg_sharp = /^#/;
const reg_dash = /^-/;

const { getRandomStr } = require('./util');

function createHtmlStr(obj) {
  let htmlStr = '';
  for(let [key, value] of Object.entries(obj)) {
    const label = key.split('-')[0];
    const { type, tags } = value;
    if(type === 'single') {
      tags.forEach(tag => {
        htmlStr += `${tag}\n`;
      });
    }
    if(type === 'wrap') {
      let str = '';
      tags.forEach(tag => {
        str += `${tag}\n`;
      });
      htmlStr += `<${label}>${str}</${label}>\n`;
    }
  }
  return htmlStr;
}

function complierMarkdown(arr) {
  const obj = {};
  let prevMark = '';
  let _key = '';
  for(let item of arr) {
    const randomStr = getRandomStr();
    if(!item) continue;
    const [mark, content] = item.split(' ');
    if(!content) {
      obj[`div-${randomStr}`] = {
        type: 'single',
        tags: [`<div>${mark}</div>`]
      }
      continue;
    }
    if(reg_sharp.test(mark)) {
      const { length } = mark;
      if(mark === prevMark) {
        obj[`h${length}-${_key}`].tags.push(`<h${length}>${content}</h${length}>`);
        continue;
      }
      prevMark = mark;
      _key = randomStr;
      obj[`h${length}-${randomStr}`] = {
        type: 'single',
        tags: [`<h${length}>${content}</h${length}>`]
      }
      continue;
    }
    if(reg_dash.test(mark)) {
      if(mark === prevMark) {
        obj[`ul-${_key}`].tags.push(`<li>${content}</li>`);
        continue;
      }
      prevMark = mark;
      _key = randomStr;
      obj[`ul-${randomStr}`] = {
        type: 'wrap',
        tags: [`<li>${content}</li>`]
      }
      continue;
    }
  }
  return createHtmlStr(obj);
}

module.exports = {
  complierMarkdown
};
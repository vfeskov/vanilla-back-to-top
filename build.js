const fs = require('fs')
const UglifyJS = require('uglify-es')

const original = fs.readFileSync('./index.js').toString()
const cssMinified = minifyCss(original)
const uglified = UglifyJS.minify(cssMinified).code

if (!fs.existsSync('./dist')) { fs.mkdirSync('./dist'); }
fs.writeFileSync('./dist/index.js', uglified)
console.log('Built successfully.')

function minifyCss (text) {
  const css = text.match(/\/\*minifyCss\*\/`[^`]*`/gm) || []
  if (!css.length) {
    return text
  }

  let result = text
  css.forEach(tmpl => {
    const string = tmpl
      .replace('/*minifyCss*/', '')
      .replace(/\n\s*/g, '')
      .replace(/\s*\{/g, '{')
      .replace(/\:\s+([^;]*);/g, ':$1;')
    result = result.replace(tmpl, string)
  })
  return result
}

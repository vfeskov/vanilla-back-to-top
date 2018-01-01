const fs = require('fs')
const UglifyES = require('uglify-es')
const babel = require('@babel/core')
const presetEnv = require('@babel/preset-env')
const rimraf = require('rimraf')
const postcss  = require('postcss')
const autoprefixer = require('autoprefixer')
const clean = require('postcss-clean')
const { name } = require('../package.json')

const distDir = './dist'
const original = fs.readFileSync('./index.js').toString()

recreateDistDir()
build()

function recreateDistDir () {
  rimraf.sync(distDir)
  fs.mkdirSync(distDir)
}

async function build () {
  const cssProcessed = await processCss(original)
  const { code } = babel.transformSync(cssProcessed, {
    presets: [[presetEnv, {
      // use browserslist config from package.json
      useBuiltIns: 'entry'
    }]]
  })
  const uglified = UglifyES.minify(code).code
  const filePath = `${distDir}/${name}.min.js`
  fs.writeFileSync(filePath, uglified)
  console.log(`Build was successfull.`)
}

async function processCss (text) {
  const css = text.match(/\/\*css\*\/`[^`]*`/gm) || []
  if (!css.length) {
    return text
  }

  let result = text
  await Promise.all(css.map(async tmpl => {
    const noQuotes = tmpl
      .replace('/*css*/', '')
      .replace(/`/g, '')
    const varsEscaped = noQuotes.replace(/\$\{([^\}]+)\}/g, '$\\{$1\\}')
    const processed = await postcss([autoprefixer, clean()])
      // "from" is to make it use browserslist config from package.json
      .process(varsEscaped, { from: '.' })
      .then(r => r.css)
    const varsRestored = processed.replace(/\$\\\{([^\}]+)\\\}/g, '${$1}')
    result = result.replace(tmpl, `\`${varsRestored}\``)
  }))

  return result
}


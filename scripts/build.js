const fs = require('fs')
const UglifyES = require('uglify-es')
const babel = require('@babel/core')
const presetEnv = require('@babel/preset-env')
const rimraf = require('rimraf')
const postcss  = require('postcss')
const autoprefixer = require('autoprefixer')
const browsers = require('../package.json').browserslist
const prefixer = autoprefixer({ browsers })

const distDir = './dist'
const original = fs.readFileSync('./index.js').toString()

recreateDistDir()
build()

function recreateDistDir() {
  rimraf.sync(distDir)
  fs.mkdirSync(distDir)
}

async function build () {
  const cssAdapted = await prefixAndMinifyCss(original)
  const { code } = babel.transformSync(cssAdapted, {
    presets: [[presetEnv, {
      useBuiltIns: 'entry'
    }]]
  })
  const uglified = UglifyES.minify(code).code
  const filePath = `${distDir}/vanilla-back-to-top.min.js`
  fs.writeFileSync(filePath, uglified)
  console.log(`Build was successfull.`)
}

async function prefixAndMinifyCss (text) {
  const css = text.match(/\/\*minifyCss\*\/`[^`]*`/gm) || []
  if (!css.length) {
    return text
  }

  let result = text
  await Promise.all(css.map(async tmpl => {
    const noQuotes = tmpl
      .replace('/*minifyCss*/', '')
      .replace(/`/g, '')
    const varsEscaped = noQuotes.replace(/\$\{([^\}]+)\}/g, '$\\{$1\\}')
    const prefixed = await postcss([prefixer]).process(varsEscaped).css
    const varsRestored = prefixed.replace(/\$\\\{([^\}]+)\\\}/g, '${$1}')
    const minified = varsRestored
      .replace(/\n\s*/g, '')
      .replace(/\s*\{/g, '{')
      .replace(/\:\s+([^;]*);/g, ':$1;')
    result = result.replace(tmpl, `\`${minified}\``)
  }))

  return result
}

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
Promise.all([
  buildGlobalStandalone(),
  buildUMD()
]).then(success, error)

function recreateDistDir () {
  rimraf.sync(distDir)
  fs.mkdirSync(distDir)
}

async function buildGlobalStandalone () {
  const [justTheFunction] = original.match(/\/\/ FUNCTION_START[\s\S]*\/\/ FUNCTION_END/m)
  const result = await build(justTheFunction)
  const filePath = `${distDir}/${name}.min.js`
  fs.writeFileSync(filePath, result)
}

async function buildUMD () {
  const result = await build(original)
  const filePath = `${distDir}/${name}.umd.min.js`
  fs.writeFileSync(filePath, result)
}

async function build (source) {
  const cssProcessed = await processCss(source)
  const babelified = babel.transformSync(cssProcessed, {
    presets: [[presetEnv, {
      // use browserslist config from package.json
      useBuiltIns: 'entry'
    }]]
  }).code
  const uglified = UglifyES.minify(babelified).code
  return uglified
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

function success () {
  console.log('Build was successful')
}

function error () {
  console.log('Build failed')
}

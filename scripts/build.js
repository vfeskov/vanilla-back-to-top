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
const source = fs.readFileSync('./index.js').toString()

recreateDistDir()
Promise.all([
  buildGlobal(),
  buildUMD()
]).then(success, error)

function recreateDistDir () {
  rimraf.sync(distDir)
  fs.mkdirSync(distDir)
}

async function buildGlobal () {
  const [justTheFunction] = source.match(/\/\/ FUNCTION START[\s\S]*\/\/ FUNCTION END/m)
  const backwardsCompatible = await makeBackwardsCompatible(justTheFunction)
  const uglified = UglifyES.minify(backwardsCompatible).code
  fs.writeFileSync(`${distDir}/${name}.min.js`, uglified)
}

async function buildUMD () {
  const backwardsCompatible = await makeBackwardsCompatible(source)
  fs.writeFileSync(`${distDir}/${name}.umd.js`, backwardsCompatible)

  const uglified = UglifyES.minify(backwardsCompatible).code
  fs.writeFileSync(`${distDir}/${name}.umd.min.js`, uglified)
}

async function makeBackwardsCompatible (source) {
  const cssProcessed = await processCss(source)
  return babel.transformSync(cssProcessed, {
    presets: [[presetEnv, {
      // use browserslist config from package.json
      useBuiltIns: 'entry'
    }]]
  }).code
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

function error (error) {
  console.log('Build failed', error)
}

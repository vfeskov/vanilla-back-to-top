const fs = require('fs')
const UglifyES = require('uglify-es')
const babel = require('@babel/core')
const presetEnv = require('@babel/preset-env')
const rimraf = require('rimraf')
const postcss  = require('postcss')
const autoprefixer = require('autoprefixer')
const clean = require('postcss-clean')
const zlib = require('zlib')
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

  const gzipped = zlib.gzipSync(uglified)
  fs.writeFileSync(`${distDir}/${name}.min.js.gz`, gzipped)
  makeSizeShield(gzipped.length)
}

async function buildUMD () {
  const backwardsCompatible = await makeBackwardsCompatible(source)
  fs.writeFileSync(`${distDir}/${name}.umd.js`, backwardsCompatible)
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
    const templateLiteralRemoved = varsRestored
      .replace(/\$\{([^\}]+)\}/g, '\' + $1 + \'')
      .replace(/`/g, '')
    result = result.replace(tmpl, `'${templateLiteralRemoved}'`)
  }))

  return result
}

function success () {
  console.log('Build was successful')
}

function error (error) {
  console.log('Build failed', error)
}

function makeSizeShield (size) {
  const kbs = (size / 1024).toFixed(2)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="76" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="a"><rect width="76" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#a)"><path fill="#555" d="M0 0h31v20H0z"/><path fill="#97CA00" d="M31 0h45v20H31z"/><path fill="url(#b)" d="M0 0h76v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110"><text x="165" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="210">size</text><text x="165" y="140" transform="scale(.1)" textLength="210">size</text><text x="525" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="350">${kbs} kB</text><text x="525" y="140" transform="scale(.1)" textLength="350">${kbs} kB</text></g></svg>`
  fs.writeFileSync('size-shield.svg', svg)
}

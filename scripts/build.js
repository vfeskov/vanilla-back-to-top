const fs = require('fs')
const UglifyES = require('uglify-es')
const babel = require('@babel/core')
const presetEnv = require('@babel/preset-env')
const rimraf = require('rimraf')
const postcss  = require('postcss')
const autoprefixer = require('autoprefixer')

const distDir = './dist'
const original = fs.readFileSync('./index.js').toString()

recreateDistDir()
build({ browsers: ['> 5%'] })
build({ browsers: ['> 1%', 'ie 10'], suffix: '.ie10' })

function recreateDistDir() {
  rimraf.sync(distDir)
  fs.mkdirSync(distDir)
}

async function build ({ browsers, suffix = '' }) {
  const cssAdapted = await prefixAndMinifyCss(original, browsers)
  const { code } = babel.transformSync(cssAdapted, {
    presets: [[presetEnv, {
      targets: {
        browsers
      }
    }]]
  })
  const uglified = UglifyES.minify(code).code
  const filePath = `${distDir}/vanilla-back-to-top${suffix}.min.js`
  fs.writeFileSync(filePath, uglified)
  console.log(`${filePath} built successfully.`)
}

async function prefixAndMinifyCss (text, browsers) {
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
    const prefixed = await postcss([ autoprefixer({ browsers })]).process(varsEscaped).css
    const varsRestored = prefixed.replace(/\$\\\{([^\}]+)\\\}/g, '${$1}')
    const minified = varsRestored
      .replace(/\n\s*/g, '')
      .replace(/\s*\{/g, '{')
      .replace(/\:\s+([^;]*);/g, ':$1;')
    result = result.replace(tmpl, `\`${minified}\``)
  }))

  return result
}

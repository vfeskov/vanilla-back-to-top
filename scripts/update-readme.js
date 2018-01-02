const fs = require('fs')
const { name, version } = require('../package.json')

const content = fs.readFileSync('./README.md').toString()

fs.writeFileSync(
  './README.md',
  content.replace(
    new RegExp(`(https://unpkg.com/)[^@\)]+@[^/]*(/dist)`, 'g'),
    `$1${name}@${version}$2`
  )
)

const fs = require('fs')
const { name, version } = require('../package.json')

['README.md', 'MORE.md'].forEach(doc => {
  const content = fs.readFileSync(doc).toString()

  fs.writeFileSync(
    doc,
    content.replace(
      new RegExp(`(https://unpkg.com/)[^@\)]+@[^/]*/`, 'g'),
      `$1${name}@${version}/`
    )
  )
})

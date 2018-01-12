const fs = require('fs')
const { name, version } = require('../package.json')

const docs = [ 'README.md', 'INSTALL.md', 'EXAMPLES.md', 'OPTIONS.md' ]
docs.forEach(doc => {
  const content = fs.readFileSync(doc).toString()

  fs.writeFileSync(
    doc,
    content.replace(
      new RegExp(`${name}(/blob/v|/v|@)[^/]+`, 'g'),
      match => match.replace(/[^/@v]+$/, version)
    )
  )
})

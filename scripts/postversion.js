const fs = require('fs')
const { exec } = require('child_process');
const { version } = require('../package.json')

const content = fs.readFileSync('./README.md').toString()

fs.writeFileSync(
  './README.md',
  content.replace(
    new RegExp('(https://unpkg.com/vanilla-back-to-top@)[^/]*(/dist/index.js)'),
    `$1${version}$2`
  )
)

exec('git add ./README.md && git commit -m "Update README.md" && git push --tags origin master && npm publish', (err, stdout, stderr) => {
  if (err) { return; }
  console.log(stdout);
  console.error(`stderr: ${stderr}`);
})

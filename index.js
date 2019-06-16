const fs = require('fs')
const path = require('path')
const { analizeFile } = require('./src/bundler')

const sourceFile = process.argv[process.argv.length - 1]

const bundle = analizeFile(path.join(__dirname, sourceFile))

const outputName = 'bundle.js'

fs.writeFileSync(outputName, bundle)
console.log(`Generated ${outputName}`)
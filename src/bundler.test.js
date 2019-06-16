const assert = require('assert')
const fs = require('fs')
const path = require('path')

const { analizeFile, checkRequire } = require('./bundler')

describe('Test function checkRequire', () => {
  it('file without extension', () => {
    const declarationInit = {
      callee: {
        name: 'require'
      },
      arguments: [
        { value: './test' }
      ]
    }

    assert.equal(checkRequire(declarationInit), './test.js')
  })

  it('file with extension', () => {
    const declarationInit = {
      callee: {
        name: 'require'
      },
      arguments: [
        { value: './test2.js' }
      ]
    }

    assert.equal(checkRequire(declarationInit), './test2.js')
  })
})

describe('Test function analizeFile', () => {
  it('analyze c.js from example', () => {
    const mockFile = fs.readFileSync('./src/mocks/cBundle.js', 'utf8')

    assert.equal(analizeFile(path.join(__dirname, '../example/c.js')), mockFile)
  })
})
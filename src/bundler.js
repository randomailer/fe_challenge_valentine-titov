const acorn = require('acorn')
const fs = require('fs')
const { join, dirname } = require('path')

/**
 *
 * @param {Object} obj VariableDeclarator
 * @returns {string|undefined} required file relative path
 */
const checkRequire = (obj) => {
  if (obj.callee.name && obj.callee.name == 'require') {
    let path = obj.arguments[0].value
    if (!/\.js/.test(path)) {
      path += '.js'
    }
    return path
  }
}

/**
 *
 * @param {string} path absolute file path
 * @param {string=} previousPath previous absolute file path
 * @returns {string} bundle string
 */
const analizeFileRecursive = (path, previousPath) => {
  let result = ''

  const filePath = previousPath ? join(dirname(previousPath), path) : path
  let source
  let parsed
  try {
    source = fs.readFileSync(filePath, 'utf8')
    parsed = acorn.parse(source)
  } catch (err) {
    console.warn(`Error: file '${filePath}' not found or not valid`)
    return
  }

  parsed.body.forEach(obj => {
    if (obj.declarations) {
      obj.declarations.forEach(declarationObj => {
        if (declarationObj.init.type == 'CallExpression') {
          const path = checkRequire(declarationObj.init)
          if (path) {
            result += analizeFileRecursive(path, filePath)
          }
        }
      })
    }
  })

  result += source + '\n'
  return result
}

/**
 *
 * function recursively find all dependencies and
 * returns bundle from source in order execution
 * @param {string} path absolute file path
 * @returns {string} bundle string
 */
const analizeFile = (path) => analizeFileRecursive(path)

exports.checkRequire = checkRequire
exports.analizeFile = analizeFile
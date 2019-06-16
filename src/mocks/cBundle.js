const a = 'This is module a'
module.exports = a
const b = 'This is module b'
module.exports = b
const a = require('./a')
const b = require('./b')
console.log(a, b)
const c = 'This is module c'
module.exports = c

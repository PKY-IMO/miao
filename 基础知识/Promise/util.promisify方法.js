/**
 *  util.promisify 方法
 * 
 */

const util = require('util')
const fs = require('fs')

let mineReadFile = util.promisify(fs.readFile)

mineReadFile('./基础知识/JQuery.md').then(value=>{
  console.log(value.toString())
}) 


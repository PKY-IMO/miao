
/**
 * 封装一个函数 读取文件
 * @param {文件路径} path 
 * @returns promise 对象
 */
function mineRead(path) {
  return new Promise((resolve, reject)=>{
    let fs = require('fs')
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(data)
    })
  })
}
mineRead('./基础知识/JQuery.md').then(value=>{
  console.log(value.toString())
})
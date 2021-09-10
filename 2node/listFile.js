const fs = require('fs')
const fsp = fs.promises
const path = require('path')

let targetPath = path.join(__dirname, process.argv[2]) 

// 同步版本
const listFileSync = (targetPath) => {
  let res = []
  let fileNames = fs.readdirSync(targetPath)
  fileNames = fileNames.map(i => path.join(targetPath, i))
  for (let fileName of fileNames) {
    let stat = fs.statSync(fileName)
    if (stat.isDirectory()) {
      res.push(...listFileSync(fileName))
    }else {
      res.push(fileName)
    }
  }
  return res
}
// console.log(listFileSync(targetPath).join('\n'))


// async/await版本
const listFileAsync= async (targetPath) => {
  let res = []
  let fileNames = await fsp.readdir(targetPath)
  fileNames = fileNames.map(i => path.join(targetPath, i))
  for (let fileName of fileNames) {
    let stat = await fsp.stat(fileName)
    if (stat.isDirectory()) {
      let tmp = await listFileAsync(fileName)
      res.push(...tmp)
    }else {
      res.push(fileName)
    }
  }
  return res
}
// istFileAsync(targetPath).then((res)=>console.log(res))


// promise
const listFilePromise = (targetPath) => {
  return new Promise((resolve, rej)=>{
    fsp.readdir(targetPath)
    .then(fileName => {
      return fileName.map(i => path.join(targetPath, i)) // 绝对地址
    })
    .then(filePaths => {
      let  res = []
      let count = 0
      let total = filePaths.length
      for (let filePath of filePaths) {
        fsp.stat(filePath).then((stat) => {
          if (stat.isDirectory()) {
            console.log(filePath)
            listFilePromise(filePath).then((tmp) => {
              //console.log(tmp)
              res.push(...tmp)
              count++
              if (count >= total) {
                resolve(res)
              }
            })
          }else {
            res.push(filePath)
            count++
            if (count >= total) {
              resolve(res)
            }
          }
        })
      }
    })
  })
}

listFilePromise(targetPath).then(res=>console.log(res))




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



let writeStream = fs.createWriteStream('./listFile.js')
writeStream.write('11111111111')
writeStream.end()
writeStream.on('finish', ()=>{
  console.log('finish')
})

// 复制 读的单工流
let readStream1 = fs.createReadStream('./read')
let writeStream1 = fs.createWriteStream('./target')
readStream1.pipe(writeStream1) 



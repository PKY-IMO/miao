const http = require('http')
const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const url = require('url')
const mime = require('mime')

const baseDir = __dirname
const port = 8088
const server = http.createServer()

server.on('request', async (req, res) => {
  console.log(req.method, req.url)
  // url.parse 弃用
  // var urlobj = url.parse(req.url)
  let urlObj = new URL(req.url, 'http://locathost:8088')
  // 经过网络传输会经过URL编码 %E5%93%88 
  // url包含很多部分取出路径名
  let pathName = decodeURIComponent(urlObj.pathname)
  // 得到路径
  let targetPath = path.join(baseDir, pathName)
  // 判断路径是文件还是地址
  let stat
  try {   
    // 目标的属性
    stat = await fsp.stat(targetPath)
  } catch (err) {
    console.log(err.code)
    if (err.code === 'ENOENT') {
      res.writeHead(404)
      res.write('404 Not Found')
      res.end()
    }else {
      res.writeHead(400)
      res.end()
    }
  }
  if (stat.isFile()) {//是文件
    let data = await fsp.readFile(targetPath)
    let type = mime.getType(targetPath)
    res.writeHead(200, {
      'content-type': `${type}; charset=UTF-8`
    })
    res.write(data)
    res.end()
  }
  if (stat.isDirectory()) {//是工作目录
    let fileNames = await fsp.readdir(targetPath)
    res.writeHead(200, {
      'Content-type': 'text/html; charset=UTF-8'
    })
    res.write(`
      <div>
       ${fileNames.map(name => `<div><a href="${name}/">${name}</a></div>`).join('')}
      </div>
    `)
    res.end()

  }

  console.log(targetPath)
})

server.listen(port, ()=>{
  console.log('listening on port', port)
})
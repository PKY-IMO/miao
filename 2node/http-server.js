const http = require('http')
const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const url = require('url')
const mime = require('mime')
const groupBy = require('lodash/groupBy')

const baseDir = __dirname
const port = 8088
const server = http.createServer()

server.on('request', async (req, res) => {
  console.log(req.method, req.url)
  // url.parse 弃用 会存在../求取根目录上级的问题
  // var urlObj = url.parse(req.url)  url.search没有则是null
  let urlObj = new URL(req.url, 'http://locathost:8088')
  // 经过网络传输会经过URL编码 %E5%93%88 
  // url包含很多部分取出路径名
  let pathName = decodeURIComponent(urlObj.pathname)
  // 得到路径
  let targetPath = path.join(baseDir, pathName)
  console.log('pathName',pathName)
  console.log('targetPath', targetPath)
  // 目标路径中包含隐藏文件
  let pathParts = targetPath.slice(baseDir.length).split(path.sep)
  if (pathParts.some(path => path.startsWith('.'))) {
    res.writeHead(403, {
      'Content-Type': 'text/html; charset=UTF-8'
    })
    res.write('403 forbiden') // 二进制数据或者字符
    res.end()
    return
  }

  // 目标路径请求了上级资源
  if (!targetPath.startsWith(baseDir)) {
    res.writeHead(403, {
      'Content-Type': 'text/html; charset=UTF-8'
    })
    res.write('403 forbiden')
    res.end()
    return
  }
  // 判断路径是文件还是地址
  let stat
  try {   
    // 目标的属性
    stat = await fsp.stat(targetPath)
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404)
      res.write('404 Not Found')
      res.end()
      return
    }else {
      res.writeHead(400)
      res.end()
      return
    }
  }
  // 是目录且地址最后少一个斜杠 重定向 302
  if (stat.isDirectory() && !pathName.endsWith('/')) {
    res.writeHead(302, {
      location: pathName + '/' + urlObj.search
    })
    res.end()
    return
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
    let entries = await fsp.readdir(targetPath, { withFileTypes: true })
    let filter = entries.filter(entry => !entry.name.startsWith('.'))
    // index.html的跳转
    if (filter.find(entry => entry.isFile() && entry.name === 'index.html')) {
      let indexPath = path.join(targetPath, 'index.html')
      let indexData = await fsp.readFile(indexPath)
      res.writeHead(200, {
        'Content-type': 'text/html; charset=UTF-8'
      })
      res.end(indexData)
      return
    }
    // 文件名 文件
    let sorted = sortDirents(filter)
    res.writeHead(200, {
      'Content-type': 'text/html; charset=UTF-8'
    })
    res.write(`
      <h1>Index of ${pathName}</h1>
      <div><a href="../">../</a></div>
      <div>
       ${sorted.map(entry => {
        let slash = entry.isDirectory() ? '/' : ''
        // 追加在当前路径 / 后
        // return `<div><a href="${entry.name}${slash}">${entry.name}${slash}</a></div>`
        // 根目录绝对路径
        return `<div><a href="${path.posix.join(pathName,entry.name)}${slash}">${entry.name}${slash}</a></div>`
       }).join('')}
      </div>
      <p>
      Node.js ${process.version}/ my Nubility static server running @ ${req.socket.localAddress}:${port}
      </p>
    `)
    res.end()
    return
  }

  console.log(targetPath)
})

server.listen(port, ()=>{
  console.log('listening on port', port)
})

// 为文件夹的条目排序，文件夹在前，文件在后，按字母序排
function sortDirents(entries) {
  // 将文件夹与文件分组
  var grouped = groupBy(entries, it => {
    if (it.isDirectory()) {
      return 'dirs'
    } else {
      return 'files'
    }
  })

  grouped.dirs = grouped.dirs || []
  grouped.files = grouped.files || []

  // 分别排序后重新合起来
  var sorted = grouped.dirs.sort().concat(grouped.files.sort())
  return sorted
}
//使用正则表达式的exec方法实现所有与正则相关的方法，直接实现到对应类型的原型上

// 不是全局匹配则和exec一致，是全局匹配则返回匹配所有内容的数组，匹配不到返回null
// 没有回调
String.prototype.match2 = function(reg) {
  if (!(reg instanceof RegExp)){
    reg = new RegExp(reg)
  }
  let str = this
  if(reg.global) {
    let res = []
    let idx = 0
    while(reg.exec(str)){
      reg.lastIndex = idx
      res.push(reg.exec(str)[0])
      idx = reg.lastIndex
    }
    return res.length == 0 ? null : res
  }else {
    return reg.exec(str)
  }
}

//切割 全局匹配,返回数组,第二个参数指定返回数组最大长度
//没有回调
String.prototype.split2 = function(reg) {
  if (!(reg instanceof RegExp)){
    reg = new RegExp(reg, 'g')
  }
  let str = this
  let res = []
  let idx = 0
  while(reg.exec(str)){
    reg.lastIndex = idx
    let findItem = reg.exec(str)
    let end = findItem.index
    res.push(str.slice(idx, end))
    idx = reg.lastIndex
  }
  res.push(str.slice(idx, str.length))
  return res
}

//传字符串是单一匹配 反复执行了两次
//第二个参数可以是函数，字符串，$1
String.prototype.replace2 = function(reg, replacement) {
  if (!(reg instanceof RegExp)){
    reg = new RegExp(reg)
  }
  let str = this
  let res = []
  if(reg.global) {
    let idx = 0
    reg.lastIndex = idx
    while(reg.exec(str)){
      reg.lastIndex = idx
      let findItem = reg.exec(str)
      let end = findItem.index
    //传值的replacement是函数
      res.push(str.slice(idx, end), replacement)
      idx = reg.lastIndex
    }
    res.push(str.slice(idx, str.length))
    return res.join('')
  }else {
    let findItem = reg.exec(str)
    if (!findItem) return str
    let begin = findItem.index
    let end = begin + findItem[0].length
    //传值的replacement是函数
    res.push(str.slice(0, begin), replacement, str.slice(end, str.length))
    return res.join('')
  }
}

//返回找到的起始对象下标，初始值为-1
//对reg本身的lastIndex没有影响，默认从lastIndex=0 的位置开始查找
String.prototype.search2 = function(reg, start = 0) {
  if (!(reg instanceof RegExp)){
    reg = new RegExp(reg)
  }
  // 设置g
  if (!reg.global) {
    reg = new RegExp(reg, reg.flags + 'g')
  }
  let str = this
  let pre = reg.lastIndex// 记录正则本身的lastIndex
  reg.lastIndex = start
  let findItem = reg.exec(str)
  if(!findItem) {
    reg.lastIndex = pre
    return -1
  }else {
    reg.lastIndex = pre
    return findItem.index
  }
}

RegExp.prototype.test2 = function(str) {
  return !!this.exec(str)
}


String.prototype.match3 = function(re) {
  if (!(reg instanceof RegExp)){
    re = new RegExp(re)
  }
  if (re.global) {
      var prevLastIndex = re.lastIndex
      re.lastIndex = 0
      var result = []
      var match = null

      while (match = re.exec(this)) {
          result.push(match[0])
      }

      if (result.length == 0) {
          return null
      }
      return result
  } else {
      return re.exec(this)
  }
}

String.prototype.split3 = function(reg) {
  if (!(reg instanceof RegExp)){
    reg = new RegExp(reg, 'g')
  }
  if (!reg.global) {
    reg = new RegExp(reg, reg.flags + 'g')
  }
  let str = this
  let res = []
  let idx = 0
  let match = null
  reg.lastIndex = idx
  while(match = reg.exec(str)){
    let end = match.index
    res.push(str.slice(idx, end))
    idx = reg.lastIndex
  }
  res.push(str.slice(idx, str.length))
  return res
}

String.prototype.replace3 = function(reg, replacement) {
  if (!(reg instanceof RegExp)){
    reg = new RegExp(reg)
  }
  let str = this
  let res = []
  if(reg.global) {
    let idx = 0
    let match = null
    reg.lastIndex = idx
    while(match = reg.exec(str)){
      let end = match.index
    //传值的replacement是函数
      res.push(str.slice(idx, end), replacement)
      idx = reg.lastIndex
    }
    res.push(str.slice(idx, str.length))
    return res.join('')
  }else {
    let match = reg.exec(str)
    if (!match) return str
    let begin = match.index
    let end = begin + match[0].length
    //传值的replacement是函数
    res.push(str.slice(0, begin), replacement, str.slice(end, str.length))
    return res.join('')
  }
}
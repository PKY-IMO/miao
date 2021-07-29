//使用正则表达式的exec方法实现所有与正则相关的方法，直接实现到对应类型的原型上

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

//全局匹配,返回数组
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

//传字符串是单一匹配
String.prototype.replace2 = function(reg, subs) {
  if (!(reg instanceof RegExp)){
    reg = new RegExp(reg)
  }
  let str = this
  let res = []
  if(reg.global) {
    let idx = 0
    while(reg.exec(str)){
      reg.lastIndex = idx
      let findItem = reg.exec(str)
      let end = findItem.index
      res.push(str.slice(idx, end), subs)
      idx = reg.lastIndex
    }
    res.push(str.slice(idx, str.length))
    return res.join('')
  }else {
    let findItem = reg.exec(str)
    if (!findItem) return str
    let begin = findItem.index
    let end = begin + findItem[0].length
    res.push(str.slice(0, begin), subs, str.slice(end, str.length))
    return res.join('')
  }
}

//返回找到的起始对象下标，初始值为-1
String.prototype.search2 = function(reg) {
  if (!(reg instanceof RegExp)){
    reg = new RegExp(reg)
  }
  let str = this
  let findItem = reg.exec(str)
  if(!findItem) {
    return -1
  }else {
    return findItem.index
  }
}

RegExp.prototype.test2 = function(str) {
  return !!this.exec(str)
}
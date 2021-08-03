var Parse = (function(){
var str = '[1,"fooo",[1,222235,true],{"a":1,"b":[1,2,3],"c":{"x":1,"yyy":false}},5,null]'
var i = 0

return function parseJSON(input) {
  str = input
  i = 0
  return parseValue()
}

function parseValue() {
  var c = str[i]
  if (c == '[') {
    return parseArray()
  }
  if (c == '{') {
    return parseObject()
  }
  if (c == '"') {
    return parseString()
  }
  if (c == 't') {
    return parseTrue()
  }
  if (c == 'f') {
    return parseFalse()
  }
  if (c == 'n') {
    return parseNull()
  }
  return parseNumber()
}

function parseTrue() {
  i = i + 4
  return true
}
function parseFalse() {
  i += 5
  return false
}
function parseNull() {
  i += 4
  return null
}
function parseString() {
  i++//跳过当前双引号
  let res = ''
  while(str[i] !== '"') {
    res += str[i++]
  }
  i++//跳过最后双引号
  return res
}
function parseNumber() {
  let numStr = ''
  while(/[0-9]/.test(str[i])) {
    numStr += str[i++]
  }
  return Number(numStr)
}

function parseArray() {
  i++// 跳过[
  let arr = []
  if (str[i] == ']') {
    i++
    return arr
  }
  while(true) {
    var val = parseValue()
    arr.push(val)
    if (str[i] == ']') {
      i++
      return arr
    }else if (str[i] == ',') {
      i++
    }
  }
}

function parseObject() {
  i++// 跳过{
  let obj = {}
  if (str[i] == '}') {
    i++
    return obj
  }
  while(true) {
    var key = parseString()
    i++ // 跳过：
    var value = parseValue()
    obj[key] = value
    if (str[i] == '}') {
      i++
      return obj
    }else if (str[i] == ',') {
      i++
    }
  }
}
})()


var ParseExpression = (function(){
  var str = '|(&(t,f,f),!(t))'
  var i = 0
  function parseValue() {
    if (str[i] == 't') {
      i++ 
      return true
    }else if (str[i] == 'f') {
      i++
      return false
    }
  }
  function parseFunctionCall() {
    let obj = {}
    if (str[i] == '&' ||str[i] == '|' || str[i] == '!') {
      obj.funcName = str[i]
      i++
    }
    if (str[i] === '(') {
      i++
    }
    obj.parameters = []
    while(str[i] !== ')') {
      if (str[i] == '&' ||str[i] == '|' || str[i] == '!' ) {
        obj.parameters.push(parseFunctionCall())
      }else {
        obj.parameters.push(parseValue())
      }
      if (str[i] == ',') {
        i++
      }
    }
    i++ // skip )
    return obj
  }
})()

function outputLisp(tree) {
  if (typeof tree ==)
}
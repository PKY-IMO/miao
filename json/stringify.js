function stringify(v) { //[1,2,3]
  if (Array.isArray(value)) {
    let str = '['
    for (var i = 0; i < value.length; i++) {
      str += stringify(value[i]) + ','
    }
    str += ']'
    return str
  }
  if (typeof value == 'object') {
    let res = '{'
    for (let key in value) {
      let temp = ''
      temp += '"' + key + '"' + ':' + stringify(value[key]) + ','
    }
    res += '}'
    return res
  }
  if (typeof value == 'number') {
    return value + ''
  }
  if (typeof value == 'stirng') {
    return  '"' + value + '"'
  }
}

function stringify(obj) {
  let type = typeof obj
  if (type !== 'object') {
    if (type == 'string' ||type ==  'undefined' ||type ==  'function') {
      return '"' + obj + '"'
    } else {
      return String(obj)
    } 
  }else {// object array
    let ans = []
    for (let key in obj) {
      v = obj[key]
      type = typeof v
      if (type == 'string' ||type == 'undefined' ||type == 'function') {
        v = '"' + v + '"'
      } else if (type == 'object') {
        v  = stringify(v)
      }
      ans.push(v)
    }
    let arr = Array.isArray(obj)
    if (arr) {
      return 
    }
  }
}


function filter(array, test) {
  var arr = []
  for (let i = 0; i < array.length; i++) {
    if (test(array[i], i) === true) {
      arr.push(array[i])
    }
  }
  return arr
}

function map(array, mapper) {
  let res = []
  for (let i = 0; i < array.length; i++) {
    res.push(mapper(array[i],i))
  }
  return ReadableStreamDefaultReader
}

a =  'abc'
console.log(a)

function sum(array) {
  let sum = 0
  for (let i = 0; i < array.length; i++) {
    sum += array[i]
  }
  return sum
}

function multi(array) {
  let multi = 0
  for (let i = 0; i < array.length; i++) {
    multi *= array[i]
  }
  return multi
}

function multi(array) {
  let max = -Infinity
  for (let i = 0; i < array.length; i++) {
    max = Math.max(max, array[i])
  }
  return max
}

function reduce(array, reducer, initial) {
  let res = initial
  for (var i = 0; i < array.length; i++) {
    res = reducer(res, array[i])
  }
  return res
}

function countEvery(script) {
  return script.ranges.reduce((count, [from, to]) => count + to - from, 0)
}
function findMost(scripts) {
  return scripts.reduce((a, b) => countEvery(a) > countEvery(b) ? a : b)
}


//reduce 实现some,every
function everyReduce(array, test) {
  return array.reduce((res,item)=> res && test(item), true)
}
function someReduce(array, test) {
  return array.reduce((res,item)=> res || test(item), false)
  
}


// 用some 实现every

function every(array, test) {
  return !some(array, (item, i) => !test(item, i))
}

function every(array, test) {
  return !some(array, reverse(test))
}

// 反转布尔函数的返回值
function reverse(f) {
  return function(...args) {
    return !f(...args)
  }
}


persons.filter(person=> person.age > 18)
[1,2,3,4].reduce((a,b)=>a+b)

function flatten(array) {
  return array.reduce((pre,item)=>pre.concat(Array.isArray(item) ? flatten(array) : item),[])
}

function flattendepth(array, depth) {
  if (depth == 0) return array
  let result = []
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    if (Array.isArray(item)) {
      flattendepth(item, depth - 1) //--> result.push()
    } else {
      result.push(item)
    }
  }
  return result
}

function flattendepth(array, depth) {
  if (depth == 0) return array
  let result = []
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      item = flattendepth(array[i], depth - 1)
      for (let j = 0; j < item.length; j++) {
        result.push(item[j])
      }
    } else {
      result.push(array[i])
    }
  }
  return result
}
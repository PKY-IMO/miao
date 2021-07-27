function flat(arr) {
  return arr.flat(Infinity)
}

function flat2(arr) { //!
  let f = (item) => [].concat(...item)
  return f(arr.map(item => Array.isArray(item) ? flat2(item) : item))
}

function flat3(arr) {
  return arr.reduce((prev,item)=>prev.concat(Array.isArray(item) ? flat3(item) : item),[])
}

/**
 * 对空位处理: forEach,filter,reduce,every,some 跳过空位
 * map跳过空位，保留值
 * ES6统一将空值是为undefined
 * join,toStirng 视为undefined 最后转换成空字符串‘’
 * entries、keys、values、find、findIndex\ ...扩展运算符 会将空位视为undefined
 * 
 */

 ary = [1, [2, [3, [4, 5]]], 6]
 ary1 = [[[[]]]]
 let depth = 0
 function flattenArr(arr) {
  let result = []
  arr.forEach(i => {
    if(Array.isArray(i)) {
      depth++
      result.push(...flattenArr(i))
    } else {
      result.push(i)
    }
  })
  return result
}

function flattendepth(arr, depth) {
  if (depth == 0) return arr
  let result = []
  arr.forEach(i => {
    if(Array.isArray(i)) {
      result.push(...flattendepth(i, depth-1))
    } else {
      result.push(i)
    }
  })
  return result

}

b = flattenArr(ary1)
console.log(b)
console.log(depth)
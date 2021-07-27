obj1 = {a: 1, b: null, c: {a: {d: 2}}, arr: [1, '1']}
obj2 = {a: 1, b: null, c: {a: {d: 2}}, arr: [1, 1]}

function deepCompare(obj1, obj2) {
  let keys1 = Object.keys(obj1)
  let keys2 = Object.keys(obj2)
  // 比较属性值是否相等
  if (keys1.length !== keys2.length || keys1.toString() !== keys2.toString()) {
    console.log('index length or value')
    return false}

  //属性值相等 比较值是否相等
  for (let key of keys1) {
    let type1 = getType(obj1[key])
    let type2 = getType(obj2[key])
    if (type1 != type2) {
      console.log('value type')
      return false
    }
    if (obj1[key] === obj2[key]) {// 基本数据类型 全等则正确
      continue
    }else if (type1 == 'object' || type1 == 'array') { // 引用数据类型不能全等：需要递归再判断
      let flag = deepCompare(obj1[key],obj2[key])
      if (!flag) {
        console.log('object array')
        return false
      }else continue
    }else if (type1 == 'function' || type1 == 'date' || type1 == 'regexp') { //引用数据类型：需要通过字符串判断
      if (obj1[key].toString() === obj2[key].toString()) {
        continue
      } else { //
        console.log('function date regexp')        
        return false
      }
    }else{
      console.log('basic value')  
      return false
    }
  }
  return true
}
function getType(data) {
	return Object.prototype.toString
		.call(data)
		.split(" ")[1]
		.slice(0, -1)
		.toLowerCase();
}

console.log(deepCompare(obj1, obj2))


function isEqual(a,b) {
  if (a === b) return true
  let typea = typeof a
  let typeb = typeof b
  if (typea != typeb) { //类型不同
    return false
  } else {
    if (typea == 'object') { //属性集合长度
      // 一个是数组一个不是
      if (Array.isArray(a) + Array.isArray(b) == 1) {
        return false
      }
      // 同为数组，只判断长度
      if (Array.isArray(a)) {
        if (a.length !== b.length) {
          return false
        }
      } else {// 同为数组，判断属性的数量及内容
        var keysa = Object.keys(a)
        var keysb = Object.keys(b)
        if (keysa.length !== keysb.length) { // 属性集合长度不同
          return false
        }
      } 
      for (let key in a) {
        if (!(key in b)) {
          return false
        }
        if ( !isEqual(a[key], b[key])) {
          return false
        }
      }
      return true
    } else {
      return a === b
    }

  }

}


function isEqual(a, b) {
  if (a === b) {
    return true
  }
  var typea = typeof a
  var typeb = typeof b
  if (typea !== typeb) { // 类型不同
    return false
  } else {  // 类型相同
    if (typea == 'object') {

      // 一个是数组一个是对象
      if ((Array.isArray(a) && !Array.isArray(b)) || (Array.isArray(b) && !Array.isArray(a))) {
        return false
      }

      // 往后即同为数组或同为对象

      // 同为数组，只判断长度
      if (Array.isArray(a)) {
        if (a.length !== b.length) {
          return false
        }
      } else {// 同为数组，只属性的数量及内容
        var keysa = Object.keys(a)
        var keysb = Object.keys(b)
        if (keysa.length !== keysb.length) { // 属性集合长度不同
          return false
        }
        // 如果长度相同，判断属性集合的内容相同
        // keysa.sort()
        // keysb.sort()
        // for (var index in keysa) {
        //   if (keysa[index] !== keysb[index]) { // 属性名集合名字不同
        //     return false
        //   }
        // }
      }
      for (var key in a) {
        if (!(key in b)) {
          return false
        }
        if (!isEqual(a[key], b[key])) {
          return false
        }
      }
      return true
    } else {
      return a === b
    }
  }
}

function key(obj) {
  let ary = []
  for (let key in obj) {
    ary.push(key)
  }

  return ary
}


// function deepClone(obj, map = new Map()) {
//   let res;
//   if (typeof obj === 'object' && obj !== null) {//引用类型
//     res = obj.constructor === Array ? [] : {}
//     if (map.get(obj)) {
//       return obj
//     }
//     map.set(obj, res)
//     for (let key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         res[key] = typeof obj[key] === 'objec' ? deepClone(obj[key], map) : obj[key]
//       }
//     }

//   }else {//基本类型
//     res = obj
//   }
//   return res
// }

function shallowClone(obj) {
  let res
  if (typeof obj === 'object' && obj !== null) {
    res = obj.constructor === Array ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res[key] = obj[key]
      }
    }
  }else {
    res = obj
  }
  return res
}

function deepClone2(obj, map = new Map()) {
  let res
  if (typeof obj === 'object' && obj !== null) {
    if (map.has(obj)) {
      return obj
    }
    map.set(obj, true)
    res = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res[key] = typeof obj[key] === 'object' ? deepClone(obj[key], map) : obj[key]
      }
    }
  }else {
    res = obj
  }
  return res
}



	
//JSON.parse(JSON.stringify(obj))
/**
 * 无法解决循环引用，报错
 * 对特殊数字类型--》null
 * 抛弃所有对象的构造器，指向object
 * boolean、string、number无法区分包装类型
 */


function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (hash.has(obj)) return obj

  let t = new obj.constructor()
  hash.set(obj, t)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      t[key] = deepClone(obj[key], hash)
    }
  }
  return t
}

let a = { val: 2,
  w: {
    h : 4
  },
}
a.target = a
let cpy = deepClone(a)
console.log(cpy)
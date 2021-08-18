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
 * undefined,function,symbol 对象中忽略，数组fanhuinull，单独传值返回undefined
 */


function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (hash.has(obj)) return hash.get(obj)

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

function deepClone(obj, map = new Map()) {
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (map.has(obj)) return map.get(obj)

  let t = new obj.constructor()
  map.set(obj, t)
  if (Object.prototype.toString.call(obj) == '[object Map]') {
    obj.forEach((val, key) => {
      t.set(key, deepClone(obj.get(key), map))    
    });
  }else if (Object.prototype.toString.call(obj) == '[object Set]') {
    obj.forEach((val,key)=> {
      t.add(deepClone(obj.get(key), map))
    })
  }else {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        t[key] = deepClone(obj[key], map)
      }
    }
  }
  return t
}

let a = { val: 2,
  w: {
    h : 4
  },
}

let map = new Map()
map.set(1,2)
map.set(a,2)

console.log(deepClone(map))
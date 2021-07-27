function isEqual(obj1, obj2) {
  if(obj1 === obj2) return true
  let type1 = getType(obj1)
  let type2 = getType(obj2)
  //类型
  if (type1 != type2) return false
  if (type1 !== 'object') return obj1 === obj2
  if (type1 === 'object' || type1 === 'array') {
    let key1 = Object.keys(obj1)
    let key2 = Object.keys(obj2)
    if (key1.length != key2.length) return false
    for (let key of key1) {
      if(!key2.includes(key)) return false
      if(!isEqual(obj1[key], obj2[key])) return false
    }
    return true
  }
}
function getType(obj) {
  return Object.prototype.toString
        .call(obj)
        .split(' ')[1]
        .slice(0, -1)
        .toLowerCase()
}

obj1 = {a: 1, b: null, c: {a: {d: 2}}, arr: [1, 1], g: undefined}
obj2 = {a: 1, b: null, c: {a: {d: 2}}, arr: [1, 1], k: 1}

console.log(equal(obj1,obj2))
console.log(obj1)
console.log(obj2)

function equal(obj1, obj2) {
  if (obj1 === obj2) return true
  let type1 = getType2(obj1)
  let type2 = getType2(obj2)
  if (type1 !== type2) return false
  if (type1 === 'object' || type1 === 'array') {
    let keys1 = Object.keys(obj1)
    let keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) return false
    for (let key of keys1) {
      if(!keys2.includes(key)) return false
      if(!equal(obj1[key], obj2[key])) return false
    }
    return true
  }else {
    return obj1 === obj2
  }
}
function getType2(obj) {
  return Object.prototype.toString
        .call(obj)
        .split(' ')[1]
        .slice(0, -1)
        .toLowerCase()
}
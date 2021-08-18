function MyNew(fn, ...args) {
  let obj = {}
  obj.__proto__ = fn.prototype
  // let obj = Object.create(fn.prototype)
  let res = fn.call(obj, ...args)
  return typeof res === 'object' ? res : obj
}

function create(proto) {//返回对象的__proto__ 指向 proto
  function buff(){}
  buff.prototype = proto
  return new buff()
}

function Person(name, age) {
  this.name = name
  this.age = age
}

let p = MyNew (Person,'zhang', 18)
console.log(p)

function instanceofObj(obj, constructor) {
  if (typeof constructor !== 'function') throw new TypeError('constructor is not callable')
  if (typeof obj !== 'object' && typeof obj !== 'function') return false
  let prototype = constructor.prototype
  let proto = obj.__proto__
  while(true) {
    if(proto === null) return false
    if(proto === prototype) {
      return true
    }
    proto = proto.__proto__
  }
}
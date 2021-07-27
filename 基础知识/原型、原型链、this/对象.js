function Vector(x, y) {
  if (new.target !== Vector) {
    return new Vector(x, y)
  }
  this.x = x
  this.y = y
}

Vector.prototype.plus = function(obj) {
  let res = new Vector()
  res.x = this.x + obj.x
  res.y = this.y + obj.y
  return res
}

Vector.prototype.minus = function(obj) {
  return this.x*obj.x + this.y*obj.y
}

Vector.prototype.toString = function() {
  return '(' + this.x + ',' + this.y + ')'
}

var a = new Vector(2, 3) // a表示向量(2, 3)
var b = new Vector(-1, 5)

var c = a.plus(b) // c表示向量(1,8)
var d = a.minus(c)



function Complex(x, y) {
  if (new.target !== Complex) {
    return new Complex(x, y)
  }
  this.x = x
  this.y = y
}

Complex.prototype.plus = function(c) {
  let res = new Complex()
  res.x = this.x + c.x
  res.y = this.y + c.y
  return res
}

Complex.prototype.minus = function(c) {
  let res = new Complex()
  res.x = this.x - c.x
  res.y = this.y - c.y
  return res
}


Complex.prototype.multiple = function(c) {
  let res = new Complex()
  res.x = this.x * c.x - this.y * c.y
  res.y = this.x * c.y + this.y * c.x
  return res
}

Complex.prototype.division = function(c) {
  let res = new Complex()
  res.x = (this.x * c.x + this.y * c.y) / (c.x * c.x + c.y * c.y)
  res.y = (this.y * c.x - this.x * c.y ) / (c.x * c.x + c.y * c.y)
  return res
}

Complex.prototype.toString = function() {
  if (this.y < 0) return this.x + '' + this.y + 'i'
  return this.x + '+' + this.y + 'i'
}

var a = new Complex(2, 3) // a表示2+3i
var b = new Complex(5, -4) // b表示5-4i
a.toString() // 得到 "2+3i"
var c = a.multiple(b) // c表示22+7i
var d = a.division(b)
var e = a.plus(b)
var f = a.minus(b)

//filter、map等返回时要记得重新赋值，foreach、some、every迭代内部不能return
function MyMap(inits) {
  if(inits && !Array.isArray(inits)) throw new TypeError('not a array')
  this.entries = []
  if(inits && Array.isArray(inits)) {
    if (!Array.isArray(inits[0])) throw new TypeError('not a array')
    inits.forEach(item => {
      this.set(item[0],item[1])
    })
  }
}

MyMap.prototype._keyIndex = function(key) {
  if (key !== key) {//NaN
    return this.entries.findIndex(item => item.key !== item.key)
  }
  return this.entries.findIndex(item => item.key == key)
}
MyMap.prototype.get = function(key) {
  if(this._keyIndex(key) >= 0){
    return this.entries[this._keyIndex(key)].value
  }
}
MyMap.prototype.set = function(key, value) {
  if(this._keyIndex(key) >= 0){
    this.entries[this._keyIndex(key)].value = value
  }else {
    this.entries.push({key : key, value : value})
  }
  return this
}
MyMap.prototype.has = function(key) {
  if (this._keyIndex(key) >= 0)return true
  return false
}

MyMap.prototype.delete = function(key) {
  let idx = this._keyIndex(key)
  if(idx >=0) {
    this.entries.splice(idx,1)
    return true
  }else {
    return false
  }
}
MyMap.prototype.clear = function() {
  this.entries = []
}

Object.defineProperty(MyMap.prototype,'size',{
  get: function() {
    return this.entries.length
  }
})


var m = new MyMap([[1, 2], [NaN, 8]])
var obj = {}
m.set(obj, 88)
m.get(obj) // 88
m.has(1) // true
m.delete(1) // true
m.clear() // 清空所有映射对
m.size // 返回映射对的数量




function MySet(args) {
  this.entries = []
  if(args) {
    if (getType(args) === 'array' || getType(args) === 'string') {
      for(let value of args) {
        if(!this.entries.includes(value)) {
          this.entries.push(value)
        }
      }
    }else {
      throw new TypeError('no iterator')
    }
  }

}




MySet.prototype.add = function(value) {
  if(!this.has(value)) {
    this.entries.push(value)
  }
  return this
}
MySet.prototype.has = function(value) {
  return this.entries.includes(value)
}
// MySet.prototype.delete = function(value) {
//   let res = false
//   this.entries = this.entries.filter(item => item !== value ? true : (res = true) && false)
//   return res
// }
MySet.prototype.delete = function(value) { //NaN
  if (val != val) {
    var idx = this.entries.findIndex(it => it !== it)
    if(idx >= 0) {
      this.entries.splice(idx, 1)
      return true
    }
    return false
  }
  var idx = this.entries.indexOf(val)
  if(idx >= 0) {
    this.entries.splice(idx, 1)
    return true
  }
  return false
}
MySet.prototype.clear= function() {
  this.entries = []
}
MySet.prototype.size

Object.defineProperty(MySet.prototype,'size',{
  get: function() {
    return this.entries.length
  }
})


function getType(obj) {
  return Object.prototype.toString
    .call(obj)
    .split(" ")[1]
    .slice(0, -1)
    .toLowerCase();
}



function MyMap(ary) {
  this._keys = []
  this._values = []
}


MyMap.prototype._keyIndex = function(key) {
  if (key !== key) {// 当key是NaN
    return this._keys.findIndex(it => it !== it)
  }else return this._keys.indexOf(key)
}
MyMap.prototype.has = function(key) {
  if (this._keyIndex(key) >=0) return true
  return false
}
MyMap.prototype.get = function(key) {
  return this._values[this._keyIndex(key)]
}
MyMap.prototype.set = function(key, value) {
  if (this._has(key)) {
    this._values[this._keyIndex(key)] = value
  }else {
    this._keys.push(key)
    this._values.push(value)
  }
}
Object.defineProperty(MyMap.prototype, 'size', {
  get: function() {
    return this._keys.length
  }
})

MySet.prototype = { //对象 键值对
  constructor: MySet,
  add: function(value) {
    if(!this.has(value)) {
      this.entries.push(value)
    }
    return this
  },
  delete: function(value) { //NaN
    if (val != val) {
      var idx = this.entries.findIndex(it => it !== it)
      if(idx >= 0) {
        this.entries.splice(idx, 1)
        return true
      }
      return false
    }
    var idx = this.entries.indexOf(val)
    if(idx >= 0) {
      this.entries.splice(idx, 1)
      return true
    }
    return false
  },
  has: function(value) {
    return this.entries.includes(value)
  },
  clear: function() {
    this.entries = []
  },
  get size() {
    return this.entries.length
  }
}

class MySet { // typeof Myset  'function' // Myset是构造函数，只能new 调用
  static foo = 9
  static fromArray(ary) {
    return new MySet(ary)
  }
  constructor(inits) {
    this.entries = []
    for(let i = 0; i < inits.length; i++) {
      this.add(inits[i])
    }
  }
  add(val) {
    if(!this.has(val)) {
      this.entries.push(val)
    }
    return this
  }
  delete(val) { //NaN
    if (val != val) {
      var idx = this.entries.findIndex(it => it !== it)
      if(idx >= 0) {
        this.entries.splice(idx, 1)
        return true
      }
      return false
    }
    var idx = this.entries.indexOf(val)
    if(idx >= 0) {
      this.entries.splice(idx, 1)
      return true
    }
    return false
  }
  has(value) {
    return this.entries.includes(value)
  }
  clear() {
    this.entries = []
  }
  get size() {
    return this.entries.length
  }
}

//MySet.__proto__ = Father           ==>父类的静态方法也可以访问到
//MySet2.prototype.__proto__ === Father.prototype
class MySet2 extends Father{
  constructor(inits) {
    //super调用之前不能使用this，因为super之后this才会绑定到新对象上，
    //super.add()调用父类的add方法
    super()// 相当于Father.call(this, a,b,c,d) 
  }
  // super.xxx()相当于 Father.prototype.xxx.call(this),调用时把this传进去了
}


class Vector2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  plus(obj) {
    return new Vector2(this.x + obj.x, this.y + obj.y)
  }
  minus(obj) {
    return this.x*obj.x + this.y*obj.y
  }
  toString() {
    return '(' + this.x + ',' + this.y + ')'
  }
}

class Complex2 {
  constructor(r,i) {
    this.r = r
    this.i = i
  }
  plus(c) {
    return new Complex2(this.r + c.r, this.i + c.i)
  }
  minus(c) {
    return new Complex2(this.r - c.r, this.i - c.i)
  }
  multiple(c) {
    return new Complex2(this.r * c.r - this.i * c.i, this.r * c.i + this.i * c.r)
  }
  division(c) {
    return new Complex2((this.r * c.r + this.i * c.i) / (c.r * c.r + c.i * c.i), (this.i * c.r - this.r * c.i ) / (c.r * c.r + c.i * c.i))
  }
  toString () {
    if (this.i < 0) return this.r + '' + this.i + 'i'
    return this.r + '+' + this.i + 'i'
  }
}

class MySet2 {
  constructor(inits) {
    this.entries = []
    if(inits) {
      if (getType(inits) === 'array' || getType(inits) === 'string') {
        for(let value of inits) {
          this.add(value)
        }
      }else {
        throw new TypeError('no iterator')
      }
    }   
  }
  add(value) {
    if(!this.has(value)) {
      this.entries.push(value)
    }
    return this
  }
  delete(val) { //NaN
    if (val != val) {
      var idx = this.entries.findIndex(it => it !== it)
      if(idx >= 0) {
        this.entries.splice(idx, 1)
        return true
      }
      return false
    }
    var idx = this.entries.indexOf(val)
    if(idx >= 0) {
      this.entries.splice(idx, 1)
      return true
    }
    return false
  }
  has(value) {
    return this.entries.includes(value)
  }
  clear() {
    this.entries = []
  }
  get size() {
    return this.entries.length
  }
}

class MyMap2 {
  constructor(inits) {
    if(inits && !Array.isArray(inits)) throw new TypeError('not a array')
    this.entries = []
    if(inits && Array.isArray(inits)) {
      if (!Array.isArray(inits[0])) throw new TypeError('not a array')
      inits.forEach(item => {
        this.set(item[0],item[1])
      })
    }
  }
  _keyIndex(key) {
    if (key !== key) {//NaN
      return this.entries.findIndex(item => item.key !== item.key)
    }
    return this.entries.findIndex(item => item.key == key)
  }
  get(key) {
    if(this._keyIndex(key) >= 0){
      return this.entries[this._keyIndex(key)].value
    }
  }
  set(key, value) {
    if(this._keyIndex(key) >= 0){
      this.entries[this._keyIndex(key)].value = value
    }else {
      this.entries.push({key : key, value : value})
    }
    return this
  }
  has(key) {
    if (this._keyIndex(key) >= 0)return true
    return false
  }
  
  delete(key) {
    let idx = this._keyIndex(key)
    if(idx >=0) {
      this.entries.splice(idx,1)
      return true
    }else {
      return false
    }
  }
  clear() {
    this.entries = []
  }
  get size() {
    return this.entries.length
  }
}
Function.prototype.myCall = function(ctx = window, ...args) {
  let fn = Symbol()
  ctx = typeof ctx === 'object' ? ctx : Object(ctx)
  ctx[fn] = this
  let res = ctx[fn](...args)
  delete ctx[fn]
  return res
}

Function.prototype.myApply = function(ctx = window, args) {
  if (args && !Array.isArray(args)) throw new TypeError('参数为数组')
  let fn = Symbol()
  ctx = typeof ctx === 'object' ? ctx : Object(ctx)
  ctx[fn] = this
  let res = ctx[fn](...args)
  delete ctx[fn]
  return res
}

Function.prototype.myBind = function(obj, ...fixedArgs) {
  let self = this
  let resFn = function(...args) {
    return self.call(this instanceof resFn ? this : obj, ...fixedArgs, ...args)
  }
  // function tmp(){}
  // tmp.prototype = self.prototype
  // resFn.prototype = new tmp() //resFn需要继承self的原型 为什么不能直接 resFn.prototype = new self()
  resFn.prototype = Object.create(self.prototype)
  return resFn
}

Function.prototype.myBind2 = function(obj, ...fixedArgs) {
  let self = this
  let resFn = function(...args) {
    return self.call(this instanceof resFn ? this : obj, ...fixedArgs, ...args)
  }
  resFn.prototype = Object.create(self.prototype)
  resFn.prototype.Constructor = self
  return resFn
}

function add(a,b,c) {
  return this + a + b + c
}
a = add.myCall(1,1,1,1)
b = add.myApply(1,[1,1,1])
c = add.myBind(1,1,1)(1)
console.log(a,b,c)

function foo(){  
  this.b = 100;  
  return this.a
}
var func = foo.bind({a:1})
func() 
new func()

function myNew(Constructor, ...args) {
  let obj = Object.create(Constructor.prototype)
  let res = Constructor.call(obj, ...args)
  if ((typeof res === "object" || typeof res === "function") && res !== null) {
    return res
  }else return obj
}

function create(o) {//返回实例以o为原型对象
  function tmp(){}
  tmp.prototype = o
  return new tmp()
}


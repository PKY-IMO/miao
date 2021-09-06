//1. 快排,初始值
function quickSort(arr, start=0, end=arr.length-1) {
  if(start >= end) return 
  let pivotIdx = Math.floor(Math.random()*(end - start + 1)) + start
  let pivot = arr[pivotIdx]
  let l = start, r = end
  while(l <= r) {
    while(l <= r && arr[l] < pivot) l++
    while(l <= r && arr[r] >= pivot) r--
    if (l <= r) {
      [arr[l],arr[r]] = [arr[r],arr[l]]
      l++
      r--
    }
  }
  quickSort(arr, start, r)
  quickSort(arr, l, end)
  return arr
}
//2.数组去重
arr = [1,2,2,3,4,5,5]
arr.reduce((prev, it) =>  prev.includes(it) ? prev : [...prev, it], [])

arr.filter((item, idx) => arr.indexOf(item) == idx)

let newArr = [...new Set(arr)]
let newArr2 = Array.from(new Set(arr))

console.log(arr.map(item => item*item))
//3.对象数组去重
const arr2 = [
  {
      name: 'tom',
      age: 12,
      key: 1,
  },
  {
      name: 'jurry',
      age: 10,
      key: 2,
  },
  {
      name: 'jurry',
      age: 10,
      key: 2,
  },
  {
      name: 'tom',
      age: 12,
      key: 1,
  }];
  function uniqueKey(arr) {
    let keyValue = arr.reduce((pre, item) => pre.concat(item.key),[])
    keyValue = [...new Set(keyValue)]
    let res = []
    for (let key of keyValue) {
      res.push(arr.filter(item => item.key == key)[0])
    }
    return res
  }

  function uniqueKey2(arr) {
    let hash = {}
    let newArr = arr.reduce((pre, item) => {
      let key = item.key
      if (key in hash) {
        return pre
      } else {
        hash[key] = item
        pre.push(item)
        return pre
      }
    },[])
    return newArr
  }
  console.log('uniqueKey',uniqueKey2(arr2))

  // 字符串相加，字符串相乘



  // a.map2 = function(mapper) {
  //   let result =[]
  //   for(let i = 0; i < this.length; i++) {
  //     result.push(mapper(this[i]))
  //   }
  //   return result
  // }

  // a.map2(it => it*2)

  //获取原型  a.__proto__  Object.getPrototypeOf(a)
  //设置原型  a.__proto__  Object.setPrototypeOf(a)
  //原型链是反向的树状结构，子节点指向父节点
  // obj.prototype

  //1. 数组：reduce实现map 
  Array.prototype.myMap = function(fn, ctx) {
    return this.reduce((pre, item, idx, ary)=>{
      return [...pre,fn.call(ctx, item, idx, ary)]
    },[])
  }
  //2. 数组：reduce
  Array.prototype.myReduce = function(fn, init) {
    //调用是否为数组
    if(Object.prototype.toString.call(this) !== '[object Array]') {
      throw new TypeError('not a array')
    }
    //fn校验是否为function
    if(typeof fn !== 'function') {
      throw new TypeError('not a function')
    }
    let arr = this
    let initIdx
    let acc
    // arr 是否为空
    if(arr.length === 0) {
      if (arguments.length === 1) {
        throw new TypeError('empty array')
      }else return init
    }
    initIdx = arguments.length === 1 ? 1 : 0
    acc = arguments.length === 1 ? arr[0] : init
    for (let i = initIdx; i < arr.length; i++) {
      acc = fn(acc, arr[i], i, arr)
    }
    return acc
  }
  //3. 深拷贝

  function deepCopy(obj, copyobj) {
    copyobj = copyobj || {}
    if (typeof obj !== 'object') {
      copyobj = obj
      return copyobj
    }else {
      for (let key in obj ) {
        if (obj.hasOwnproperty(key)) {
          if (obj[key] && typeof obj[key] === 'object') {
            if(obj[key] instanceof Array) {
              copyobj[key] = []
            }else {
              copyobj[key] = {}
            }
            deepCopy(obj[key], copyobj[key])
          } else{
            copyobj[key] = obj[key]
          }
        }
      }
    }
    return copyobj
  }

  //4. 实现new
  function myNew(Constructor, ...args) {
    let obj = {}
    obj.__proto__ = Constructor.prototype
    let result = Constructor.call(obj, ...args)
    if (result && typeof result === 'object') {
      return result
    } else {
      return obj
    }
  }
  //实现 Object.create
  function createObj(o) { //返回实例的__proto__ = o
    function F(){}
    F.prototype = o
    return new F()
  }

  //实现call、 apply、bind
  function bind(f, thisObj, ...fixedArgs) {
    return function(...args) {
      return f.call(thisObj, ...fixedArgs, ...args)
    }
  }

  Function.prototype.myBind = function(ctx = window, ...fixedArgs) {
    let self = this //保留这一层的f
    return function(...args) {
      return self.call(ctx, ...fixedArgs, ...args)
    }
  }
  
  Function.prototype.myBind2 = function(ctx = window, ...fixedArgs) {
    let fn = Symbol()
    ctx[fn] = this
    return function(...args) {
      let res = ctx[fn](...fixedArgs, ...args)
      delete ctx[fn]
      return res
    }
  }

  Function.prototype.myCall = function(ctx = window, ...args) {
    //1. 将方法this 挂载到传入的ctx
    //2. 将挂载后的方法调用
    //3. 删除挂在的属性
    ctx.fn = this
    let res = ctx.fn(...args)
    delete ctx.fn
    return res
  }
  Function.prototype.myApply = function(ctx = window, args = []) {
    if (args && !(args instanceof Array)) {
      throw new TypeError('not a array')
    }
    ctx.fn = this
    let res = ctx.fn(...args)
    delete ctx.fn
    return res
  }


  //测试用例
  function f1(a, b, c) {
    return this + a +b + c
  }
  f2 = f1.myBind(1, 0, 0)
  f2.call(2, 0) // 1 f2不会把自己的this传进去，bind的this值不变

  function myNew(Constructor, ...args) {
    let obj = Object.create(Constructor.prototype)
    let res = Constructor.call(obj, ...args)
    if (res && typeof res === 'object') {
      return res
    }else return obj
  }

  function create(proto) {
    function F(){}
    F.prototype = proto
    return new F()
  }

  function len(a){
    return a*2
  }
  ww = [[1,2,3,5,2,34,5,6],[1,2,3,5,9,4,5,6]]
  console.log(ww.map(i=>{
    return Math.max(...i.map(i=>len(i)))
  }))

  //css-block-layout 
  //qq-mail-block
  //qq-mail-inline
  //qq-mail-position
  //qq-mail-flex
  //oald-layout-position
  //oald-layout-flex
  //radio-slider
  //abs-center
  //iconfont
  //paint
  //css-3d
  //footer


  Function.prototype.myCall = function(ctx = window,...args) {
    if (typeof ctx !== 'object') {
      ctx = Object(ctx)
    }
    let fn = new Symbol()
    ctx[fn] = this
    let res = ctx[fn](...args)
    delete ctx[fn]
    return res
  }

  Function.prototype.myApply = function(ctx = window, args) {
    if (!Array.isArray(args)) {
      return TypeError('args must be array')
    }
    if (typeof ctx !== 'object') {
      ctx = Object(ctx)
    }
    let fn = new Symbol()
    ctx[fn] = this
    let res = ctx[fn](args)
    delete ctx[fn]
    return res
  }

  Function.prototype.myBind = function(obj, ...fixedArgs) {
    let self = this
    let resFn = function(...args) {
      return self.call(this instanceof resFn ? this : obj,...fixedArgs, ...args)
    }
    function buff(){}
    buff.prototype = self.prototype
    resFn.prototype = new buff()
    return resFn
  }
// bind

let res = 0
function d(step=39, count) {
  if(step<0) return
  if (step===0 && count % 2 ===0) {
    res++
  }
  if(step>=1) d(step-1,count+1)
  if(step>=2) d(step-2,count+1)
}

new Array(n).fill(0).map(() => new Array(2).fill(0).map(() => new Array(3).fill(0)));

//执行js 解析dom 计算布局 渲染页面是单线程的

function parse(str) {
  let obj = {}
  let str2 = decodeURIComponent(str)
  let arr = str2.split('&')
  for (let item of arr) {
    var [key,value] = item.split('=')
    obj[key] = value
  }
  return obj
}

a = {}
Object.defineProperty(a, 'foo', {
  value: 8,
  enumerable: false, // 默认
  writable: false,  // 默认
  configurable: false, // 默认，报错
})

Object.defineProperties(a, {
  z: {},
  zz: {},
  zzz: {} 
})


for (var x in a) {} // 打印对象和原型链上所有 enumerable 为true的属性,存在属性屏蔽
// x in a  // 只有存在属性就可以

Object.hasOwnProperty('toString') // 自有属性 

map.hasOwnProperty('toString') // 如果设置map.hasOwnProperty = 13 等则会失效
map = Object.create(null) ///将对象原型赋为空
map.__proto__ = null
Object.setPrototypeOf(map, null)
```
数据属性
数据属性包含一个数据值的位置。在这个位置可以读取和写入值。共有四个描述其行为的特征:
[[Configurable]]：配置，表示能否删除修改属性的特性，或者把属性修改为访问器属性。默认false
[[Enumerable]]：枚举，表示能否通过for-in循环返回属性。默认false
[[Writable]]：可写，表示能否修改属性值。默认false
[[Value]]：属性的数据值。读写属性值从该位置。默认undefined
访问器属性
访问器属性不包含数据值；它们包含一对getter和setter函数。共有四个描述其行为的特征:
[[Configurable]]：配置，表示能否删除修改属性的特性，或者把属性修改为访问器属性。默认false
[[Enumerable]]：枚举，表示能否通过for-in循环返回属性。默认false
[[Get]]：在读取属性值时调用的函数。默认undefined
[[Set]]：在写入属性值时调用的函数。默认undefined
当个一个属性定义getter、setter或者两者都有时，这个属性就成了访问器属性
```
obj = {
  x: 1,
  foo() {
    return this.x
  }
}
obj = {
  x: 1,
  foo: function() {
    return this.x
  }
}
//两种写法一致，表示obj有一个属性为foo 是一个函数



obj = {
  x: 1,
  get foo() {
    return this.x
  },
  set foo(a) {//有且仅有一个参数
    this.x = a
  }
}
//foo 属于访问器属性
obj.foo//相当于调用了 get foo
obj.foo = 20 // 相当于调用了set foo，20作为参数传进去

```
删除的是某个属性的引用，object对象的名称，property属性的名称。
操作返回的结果都是true，即：对于所有情况都是true，除非属性是一个自己不可配置的属性，
在这种情况下，非严格模式返回 false。
```

obj = {
  foo: 8,  //1. 会覆盖
  get foo() {
    return this.foo  // 调用obj.foo会爆栈
  },
  set foo(val) {
    this.foo = val   // 调用obj.foo = 9 也会爆栈
  }
}




var f = function() {
  var obj = {
      name: 'zhangshan',
      age: 888,
      height: 999,
  }

  return function(prop) {
      return obj[prop]
  }
}()

//不改变以上代码，获得到函数内obj对象的引用
Object.defineProperty(Object.prototype, 'self', {
get: function(){return this}
})

var obj = f('self')


//获取属性描述符
Object.getOwnPropertyDescriptor(OBJ,'self')
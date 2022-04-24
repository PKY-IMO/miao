```
Object.defineProperty：数据属性和
但是需要对对象的每一个属性进行遍历劫持；
  如果对象上有新增的属性，则需要对新增的属性再次进行劫持；
  如果属性是对象，还需要深度遍历。
  这也是为什么Vue给对象新增属性需要通过$set的原因，
  其原理也是通过Object.defineProperty对新增的属性再次进行劫持。
我们总结一下Object.defineProperty在劫持对象和数组时的缺陷：
1.无法检测到对象属性的添加或删除 Vue.$set
2.无法检测数组元素的变化，需要进行数组方法的重写
3.无法检测数组的长度的修改

Proxy
Proxy则更彻底，不在局限某个属性，而是直接对整个对象进行代理，我们看一下ES6文档对Proxy的描述：
  Proxy可以理解成，在目标对象之前架设一层“拦截”，
  外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
var proxy = new Proxy(target, handler);
可以看到Proxy直接代理了target整个对象，
并且返回了一个新的对象，通过监听代理对象上属性的变化来获取目标对象属性的变化；
而且我们发现Proxy不仅能够监听到属性的增加，还能监听属性的删除，比Object.defineProperty的功能更为强大。
```

// Object.getOwnPropertyNames 可枚举不可枚举属性
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

标记对象为不可扩展：Object.isExtensible都为false
Object.preventExtensions(obj)  obj：要配置为不可扩展的对象，可删不可加
Object.seal(obj)  不能给对象添加新的属性和方法，也不能删除现有的属性和方法、不能修改现有属性和方法的配置。
Object.freeze(obj)
Object.keys 方法 返回可枚举的实例属性的数组。
Object.getOwnPropertyNames 返回的是所有实例属性（包括不可枚举的）
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
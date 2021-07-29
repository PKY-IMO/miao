```
消除js代码不严谨不安全的方法，提高效率，为未来新版本的Javascript做好铺垫
1.严格模式普通函数调用时，this指向undefined，松散模式是window
2.严格模式，不用 var 声明报错，松散模式相当于创建全局变量
3.严格模式参数名重复会报错，松散模式不会
4.严格模式禁止在函数内部遍历调用栈，arguments.callee, f.caller
5.禁止八进制数字语法 015 ==》0o15

try-cath-finally 运行规则：
try里面的代码报错的时候,catch里面的代码才会执行,finally里面的代码永远会执行
catch和finally里面,正常的代码会从上到下顺序执行
如果只是catch里面代码出错,则报catch里面的错误
如果catch和finally都出错则会报finally里面的错误
try{return XX2} finally {XX1}:finally 在return之前执行


标记对象为不可扩展：Object.isExtensible都为false
Object.preventExtensions(obj)  obj：要配置为不可扩展的对象，可删不可加
Object.seal(obj)  不能给对象添加新的属性和方法，也不能删除现有的属性和方法、不能修改现有属性和方法的配置。
Object.freeze(obj)
Object.keys 方法 返回可枚举的实例属性的数组。
Object.getOwnPropertyNames 返回的是所有实例属性（包括不可枚举的）
```

23.//
function Person (name) { this.name = name }
var ferdinand = Person("Ferdinand")  // 在全局创建了一个 name
console.log(name) 

24.
" use strict ";
function Person (name) { this.name = name }
var ferdinand = Person("Ferdinand")  // 在严格模式下，严格模式普通函数调用时，this指向undefined，报错
console.log(name) 

25.
function foo () {
	console.log(this.a);
}
function doFoo (fn) {
    console.log(this); 
    fn(); 
}
var obj = {
	a: 1,
	foo
};
var a = 2;
var obj2 = {
	a: 3,
	doFoo
};

obj2.doFoo(obj.foo);

var obj = {
  a: 1,
  foo: function (b) {
      b = b || this.a; 
      return function (c) {
        console.log(this.a + b + c);
      }
  }
}
var a = 2;
var obj2 = { a: 3 };

obj.foo(a).call(obj2, 1); 
obj.foo.call(obj2)(1);






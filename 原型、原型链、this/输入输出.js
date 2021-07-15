//变量取决于【定义位置】，而不是调用位置： 词法作用域
//函数可以访问自己的变量和定义位置的变量

//this取决于【调用方式】，是一个隐含参数 (不取决于调用位置和定义位置)
// bind this绑定后不变
// obj.f() 当一个函数被当成一个对象的方法调用时，其内的this为该对象
// f(),   this为全局作用域对象
// 当一个函数被apply时，this为apply的第一个参数
// 当一个函数的this被bind绑定时，this一般不可再变
// apply, call 和 bind 模拟方法调用  obj.f() f.apply(obj)
// map forEach   后面可接第三个参数，this

let arr=[1,2,3]
let brr=arr.push(4)
let crr=arr.splice(1,1)
console.log(arr) // [1, 3, 4]
console.log(brr) // 4
console.log(crr) // [2]

function a() {}
a.key = "123"//不会报错，引用类型数据自定义属性和方法

// this
var a = 10
var obj = {
  a: 20,
  say: () => {
		console.log(this)
    console.log(this.a)
  }
}
obj.say() // 10 箭头函数的this继承自它父级的this
var anotherObj={a:30} 
obj.say.apply(anotherObj) // 10 箭头函数的this不能被bind, apply, call改变

function Person(name) {
  this.name = name;
}
Person.prototype.print = function() {
  return this.name;
};

Person('abc'); //普通函数this指向window ==> window.name='abc'
const a = new Person('abc').print.call({});
console.log(a); // undefined

const fn = () => {
  this.x = 'z'; // this 指向 window
};

const b = {x: 'y'};
fn.call(b);//不改变
console.log(b); // {x: 'y'}




// 原型链问题
// 1.屏蔽问题 2.改变prototype时，前后创建对象指向不同原型 3.实例对象原型链没有Function.prototype
function Parent() {
  this.a = 'Parent'
}
     
function Child() {
  this.a = 'Child'
}
 
Function.prototype.print = function() {
  console.log(this.a)
}
 
Parent.print() // undefined
Child.print() // undefined
 
var p = new Parent()
p.print() // error

2.//原型链改变过程中创建的对象指向不同原型
function A() {
}
A.prototype.n=1
var b = new A()
A.prototype = {
	n:2,
	m:3
} 
var c = new A() 
console.log(b.n, b.m, c.n, c.m)// 1 undefined 2 3

3. //f ==> F.prototype ==> Object.prototype
		//     F ==> Function.prototype ==> Object.prototype
function F() {}
Object.prototype.a = function() {
	console.log("a")
}
Function.prototype.b = function(){
	console.log("b")
}
var f = new F()
f.a()//a
f.b()//f.b is not a function
F.a()//a
F.b()//b



//作用域问题
(function(){
	var x = y = 1;  // 相当于 y = 1, var x = 1 //y是全局，x是局部
})();
var z;

console.log(y); // 1
console.log(z); // undefined
console.log(x); // ReferenceError

var a = 123;
function fun(a) {
alert(a);
a = 456;
}
fun(); //undefined
alert(a); //123

2.
var x = 10;
function fn() {
console.log(x);
}
function show(f) {
 var x = 20;
 f();
}
show(fn); //10

3.
var fn = function() {
console.log(fn)
}
fn() //   function() {
		//console.log(fn)
		//}
4.
var obj= {
fn2: function() {
console.log(fn2)  //改成this.fn2 即可
}
}
obj.fn2()// fn2 is not defined

4.
function fn1() {
var a = 2
function fn2() {
	a++
	console.log(a)
}
return fn2
}
var f = fn1()
f() //3
f() //4



function fn() {  
	getName = function() { console.log('yifang')}  
	return this; 
} 
fn.getName = function() {console.log('liudehua')} 
fn.prototype.getName = function() {console.log('zhangxueyou')} 
var getName = function () {console.log('zhouxingchi')} 
function getName() {console.log('huangzesi')}  


fn().getName();  //yifang this指向window fn() 将getName 修改了
fn.getName(); //liudehua
getName(); //yifang 
new fn.getName(); //liudehua
new new fn.getName();//liudehua TypeError: (intermediate value) is not a constructor


function fn(){
  getValue = function(){ console.log(1) }; //没有用 var 进行声明，执行到这时实际上将外层作用域的 getValue 函数修改了
  return this;
}
fn.getValue = function(){ console.log(2) };
fn.prototype.getValue = function(){ console.log(3) };
var getValue = function(){ console.log(4) };
function getValue(){ console.log(5); }

//请写出下面结果：
getValue();//4
fn().getValue();//1  
// 之后，fn 函数返回了 this，
// this 的指向在函数定义的时候是确定不了的，
// 只有函数执行的时候才能确定 this 到底指向谁，
// 而此处的直接调用方式，this 指向了 window 对象，
// 所以此处相当于执行 window.getValue()，
// 现在 getValue 已经被修改成 console.log(1) 所以输出 1
getValue();//4  1
new fn.getValue();//2  new (fn.getValue()); 点的优先级是 18 ，new 无参数列表优先级是 17，点的优先级高，所以这里相当于 先执行fn.getValue ，再new无参列表
new fn().getValue();//3   (new fn()).getValue() 这里的this指向实例对象



[1,2,3,4].reduce((total,p,i) => {
	console.log(total,p,i)
	return (total + i)} ); console.log(res); // 输出多少 
const res1 = [1,2,3,4].reduce((total,p,i) => total + i, 0); console.log(res1); // 输出多少
// reduce 不传初始值，从index = 1 开始执行， 传初始值，从index = 0 开始执行，执行次数不同
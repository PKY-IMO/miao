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



//函数的this
// 函数的this指向什么值取决于函数的【调用形式】，与函数的定义位置和调用位置无关
// 调用形式主要分以下几种：
// 	(1) f() 以函数的形式调用，this指向全局作用域对象，在浏览器里是window
// 	(2) obj.f() 以对象方法的形式调用，f的this指向obj
// 	(3) f.call/apply(obj5) 直接用call或apply调用，f的this指向obj5
// 	(4) new f() 以构造函数的形式调用，f里的this指向一个新的空对象，且其原型为f.prototype
// 	将函数传给其它函数时，无法确定函数的this，需要看那个函数是以何种形式调用该函数的
// 	将函数从对象里读出放一个变量中，通过该变量调用该函数，this为window
// 	箭头函数的this相当于一个未在箭头函数内声明的普通变量，即箭头函数的this看其外面的this，如果外面是一个函数，得先确定这个函数此时的this，如果外面依然是一个箭头的内部，则看更外层
//原型
// 	除了null和undefined，每个值都有原型，可以通过__proto__属性读到，也可以通过Object.getPrototypeOf(cal)访问到
// 	原型的作用是做属性读取的后备(fallback)
// 		即当在一个对象上查找某个属性找不到时，会到它的原型对象上找，如果原型对象上找不到，会在该原型对象的原型上找，以此类推
// 	每个函数都自动有一个prototype属性，这个属性跟该函数的__proto__没有任何关系
// 	它是做为被该函数构造出来的对象的原型的
// 		构造函数的得名：构造函数会申请必要的空间，并在该空间内存储为了表示该对象所必要的信息


//   setTimeout(fn,0) fn中的this指向window

/**
 * 对空位处理: forEach,filter,reduce,every,some 跳过空位 ,后可接参数this
 * map跳过空位，保留值
 * ES6统一将空值是为undefined
 * join,toStirng 视为undefined 最后转换成空字符串‘’
 * entries、keys、values、find、findIndex\ ...扩展运算符 会将空位视为undefined
 * 
 */


let arr=[1,2,3]
let brr=arr.push(4)
let crr=arr.splice(1,1)
console.log(arr) // [1, 3, 4]
console.log(brr) // 4
console.log(crr) // [2]

function a() {}
a.key = "123"//不会报错，引用类型数据自定义属性和方法

// this 
//1.将普通函数从对象里读出放一个变量中，通过该变量调用该函数，this为window
//2.箭头函数this相当于函数内未声明的普通变量，this为外部存在的this
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
const a = new Person('abc').print.call({});  //  (new Person('abc')).print.call({})
console.log(a); // undefined

const fn = () => {
  this.x = 'z'; // this 指向 window
};

const b = {x: 'y'};
fn.call(b);//不改变
console.log(b); // {x: 'y'}




// 原型链问题
// 1.屏蔽问题 2.改变prototype时，前后创建对象指向不同原型 3.实例对象原型链没有Function.prototype
// 
function Parent() {
  this.a = 'Parent'
}
     
function Child() {
  this.a = 'Child'
}
 
Function.prototype.print = function() {
  console.log(this.a)
}
// 构造函数的原型链上有Function.prototype
Parent.print() // undefined
Child.print() // undefined
 
var p = new Parent() //实例对象原型链没有Function.prototype
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


1.
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

2.
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


3.
[1,2,3,4].reduce((total,p,i) => {
	console.log(total,p,i)
	return (total + i)} ); console.log(res); // 输出多少 
const res1 = [1,2,3,4].reduce((total,p,i) => total + i, 0); console.log(res1); // 输出多少
// reduce 不传初始值，从index = 1 开始执行,初始值是数组的第一项值; 传初始值，从index = 0 开始执行，执行次数不同

4.//= 从右向左执行 
let a = {n:1};
let b = a;
a.x = a = {n:2};
console.log(a.x);
console.log(b.x)

//undefined 
//{n:2}


5.
function user(obj){
	obj.name = 'aaa';
	obj = new Object();
	obj.name = 'bbb';
}

let person = new Object();
user(person);
console.log(person.name);

//'bbb'



6.
var a1 = {}, b1 = '123', c1 = 123;
a1[b1] = 'b';
a1[c1] = 'c';
console.log(a1[b1]);
 
var a2 = {}, b2 = Symbol('123'), c2 = Symbol('123');
a2[b2] = 'b';
a2[c2] = 'c';
console.log(a2[b2]);
 
var a3 = {}, b3 = {key:'123'}, c3 = {key:'456'};
a3[b3] = 'b';
a3[c3] = 'c';
console.log(a3[b3]);

//c b c


7.
var a = xx
if(a==1 && a==2 && a==3){
    console.log(1);
}
//1
var a = {
	i:1,
	toString:function(){
			return a.i++;
	}
}
//2
var a = [1,2,3];
a.join = a.shift;

const value = 'value is' + !!Number(['0']) ? 'aaa' : 'bbb';
console.log(value);
//aaa


8.
function showCase(value){
	switch(value){
			case 'A':
					console.log('case A');
					break;
			case 'B':
					console.log('case B');
					break;
			case undefined:
					console.log('undefined');
					break;
			default:
					console.log('Do not know');
					
	}
}

showCase(new String('A'));


9.
function f(){}
const a = f.prototype,
      b = Object.getPrototypeOf(f);
 
console.log(a===b);

10.
console.log(['1','2','3'].map(parseInt));


11.//字符串不会改变
var str = 'hello world'
str.a = 8
console.log(str.a)      
str.length = 5
console.log(str)
var num = 8
num.value = 9
console.log(num)
var arr = [1,2,3,4,5]
arr.length = 3
console.log(arr)

12. //闭包，函数定义的位置
var a = 1
function foo() {
		var a = 4
		var o = {
				bar: function() {
						window.a = 99
						console.log(a)
				}
		}
		return o
}

var b = foo()
b.baar = function() {
		console.log(a)
}
b.bar() 
b.baar() 

13.//=即指向
function foo(a, b, c) {
	a = {
			name: 'damiao'
	}
	b.teacher = 'xieran'
	c.radix = 16
	console.log(c.radix) //undefined
}

var company = {
	name: 'xiaomi'
}
var person = {
	teacher: 'xiedamiao'
}
var c = 99
foo(company, person, c)
console.log(company, person, c)
//company 	
// {
// 			name: 'damiao'
// 		} 
//person 
// {
// 	teacher: 'xieran'
// }

//https://blog.csdn.net/mfwscq/category_9839700_2.html


14.
var t = null;
var replaceThing = function() {
    var o = t
    var unused = function() {
        if (o)
            console.log("hi")
    }
    t = {
            longStr: new Array(1000000).join('*'),
            someMethod: function() {
              console.log(1)
            }
        }
}
setInterval(replaceThing, 1000)//循环引用

/**
 * 1.函数嵌套函数，内层函数引用了外层函数作用域下的变量，
 * 并且内层函数被全局环境下的变量引用，就形成了闭包。
 * 2.函数内部定义的所有函数共享同一个闭包对象。
 */

15.
const num = {
	a:10,
	add(){
			return this.a + 2;
	},
	reduce:()=>this.a - 2
};

console.log(num.add());
console.log(num.reduce());

//12,NaN

16.
var company = {
	address:'chengdu'
}
var obj = Object.create(company);
delete obj.address;//true
console.log(obj.address);//chengdu

17.
var fullname = 'a';
var obj = {
    fullname: 'b',
    prop : {
        fullname: 'c',
        getFullname: function(){
            return this.fullname;
        }
    }
};
console.log(obj.prop.getFullname());
var test = obj.prop.getFullname;
console.log(test());

18.
function Foo(){
	Foo.a = function(){
			console.log(1);
	}
	this.a = function(){
			console.log(2)
	}
}

Foo.prototype.a = function(){
	console.log(3);
}

Foo.a = function(){
	console.log(4);
}

Foo.a();
let obj = new Foo();
obj.a();
Foo.a();

//4 2 1

19.
let x,y;
try{
    throw new Error();
}catch(x){
    x = 1;
    y = 2;
    console.log(x);
}
 
console.log(x);
console.log(y);
//catch存在块级作用域
```
catch 块接收参数 x ，当我们传递参数时，这与变量 x 不同。
这个变量 x 是属于 catch 作用域的。

需要注意的是 catch 的作用域其实并不是常见的块作用域，
并不能绑定自己的内部声明的变量。catch 创建的作用域，
只对 catch 的参数有效。
**对于在内部声明的变量，catch 并没有创建一个新的作用域，只是一个普通的代码块。**
```


20.
var a = 10;
var foo={
    a:20,
    bar:function(){
        var a=30;
        return this.a;
    }
}
console.log(foo.bar());
console.log((foo.bar)());
console.log((foo.bar=foo.bar)());
console.log((foo.bar,foo.bar)());

//20 20 10 10

21.
const reg = /^[a-z]+$/;
console.log(reg.test('a'));
console.log(reg.test(null));
console.log(reg.test());

22.
let length = 10;  //let 声明的属性无法通过window.访问到,window.length是开启窗口的数量，默认是0
function fn(){
    console.log(this.length);
}
var obj = {
    length:5,
    method:function(fn){
        fn();
        arguments[0]();
    }
};
 
obj.method(fn,1);

// 0 2
```
.argumengs[0]() 知识点：在方法调用（如果某个对象的属性是函数，这个属性就叫方法，
调用这个属性，就叫方法调用）中，执行函数体的时候，作为属性访问主体的对象和数组便是
其调用方法内 this 的指向。（通俗的说，调用谁的方法 this 就指向谁）
这里 arguments[0]() 是作为 arguments 对象的属性 [0] 来调用 fn 的，
所以 fn 中的 this 指向属性访问主体的对象 arguments
```

function switchCase(value) {
	switch(value) {
		case '0': console.log('case 0');
		case '1': console.log('case 1');break;
		case undefined: console.log('undefined');break;
		default: console.log('default')
	}
}

switchCase(0); //default
switchCase('0'); //case 0 case 1
switchCase() //undefined

//作用域 块级作用域的函数声明会意外的改变外部的同名变量
// 类似于 set
var a = 0;
if (true) {
    function a () {

    }
    a = 3;

}
console.log(a) // a() {}


// 类似于set
var a = 0;
if (true) {
    //console.log(a, window.a) // function a () {} 0，提升仍然存在
    a = 1
    //console.log(a, window.a) // 1 0，a = 1 赋值了块级作用域内的 a
    function a () {}
    //console.log(a, window.a) // 1 1，非严格模式下上面那句函数声明将块级作用域里的 a 赋值给了外面
    a = 21
    //console.log(a) // 21
}
console.log(a) // 1




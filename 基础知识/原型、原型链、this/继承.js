function Father(arg) {
  
}
function Child(arg) {
  Father.call(this, arg)
}


//Child.prototype.__proto__ = Father.prototype
//Object.setPrototypeOf(Child.prototype, Father.prototype)
Child.prototype = Object.create(Father.prototype)

function Creature(type, born) {
  this.type = type
  this.born = born
}

function Dog(born, name, master) {
  Creature.call(this, 'dog', born)
  this.name = name
  this.master = master
}

//ES6 Class extends  
//寄生组合继承是先创建子类实例this对象，然后再对其增强；
//而ES6先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），
//然后再用子类的构造函数修改this。

//MySet.__proto__ = Father           ==>父类的静态方法也可以访问到
//MySet2.prototype.__proto__ === Father.prototype

//Object.setPrototypeOf(MySet2.prototype, Father.prototype)
//Object.setPrototypeOf(MySet2, Father)

class MySet2 extends Father{
  constructor(inits) {
    //super调用之前不能使用this，因为super之后this才会绑定到新对象上，
    //super.add()调用父类的add方法
    super()// 相当于Father.call(this, a,b,c,d) 
  }
  // super.xxx()相当于 Father.prototype.xxx.call(this),调用时把this传进去了
}



/**
 * 继承实现
 * 
 * 
 */

function Person() {
  this.kind = "person";
}

Person.prototype.eat = function (food) {
  console.log(this.kind + " is eating " + food);
}

function Student() {

}


//1. 原型链继承：可以实现继承，都共享有父级原型对象的属性及方法,
// 缺点：无法传参;引用类型的属性被所有实例共享
Student.prototype = new Person();
//2. 构造继承:可以传参、实例化对象独立
//缺点：无法调用父级构造函数原型对象的方法（prototype）
//      方法都在构造函数中定义，每次创建实例都会创建一遍方法
function student() {
  person.call(this);
}
//3.组合继承 原型链+构造函数继承，父级构造函数属性、原型对象的属性方法以及可以传参
// 无论什么情况，都会调用两次父级构造函数：1.创建子级原型2.子级构造函数内部
// 从而覆盖了Child.prototype子类原型中的同名属性。这种被覆盖的情况造成了性能上的浪费。
Child.prototype = new Parent() 
Child.prototype.constructor = Child
//4. 原型式继承 : 可以不用创建父类实例
/* 原型式继承 */
function object(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
//例子：
var person = {
  name:'TanJ',
  colors:['red','green','blue']
}
var person1 = object(person)
person1.colors.push('yellow')
console.log(person1.colors) /* ["red", "green", "blue", "yellow"] */
var person2 = object(person)
console.log(person2.colors) /* ["red", "green", "blue", "yellow"] */
//与原型链继承类似，引用属性共享，
student.prototype = Object.create(person.prototype);


// 5.寄生式继承：使用原型式继承获得一个目标对象的浅复制，然后增强这个浅复制的能力
/* 寄生式继承 */
function createAnother(original){
  var clone = object(original);    /* 通过调用函数创建一个新对象 */
  clone.sayHi = function(){      /* 以某种方式来增强这个对象 */
      console.log("hi")
  }
  return clone                  /* 返回这个对象 */
}


//6. 寄生组合继承 ：组合继承会两次调用父类的构造函数造成浪费，寄生组合继承就可以解决这个问题
/*核心：因为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费 */
function inheritPrototype(subType, superType) {
  var prototype = object(superType.prototype) // 创建了父类原型的浅复制
  prototype.constructor = subType             // 修正原型的构造函数
  subType.prototype = prototype               // 将子类的原型替换为这个原型
}
//SubType.prototype.__proto__= object.prototype
//(1) 既能具有组合继承的优点，又可以不必两次调用超类型的构造函数
//(2) 避免了在 SubType.prototype 上面创建不必要的、多余的属性
// （在原型链继承时，SubType.prototype被重写为SuperType的实例，因此具有了他的实例属性）

//参考： https://blog.csdn.net/jian_zi/article/details/99847658
//柯里化函数:用闭包把参数保存起来，当参数的数量足够执行就返回
function curry(fn, ...args) {
    if (args.length >= fn.length) {
        // 判断当前函数传入的参数是否大于或等于fn需要参数的数量，如果是，直接执行fn
        return fn(...args);
    } else {
        // 如果传入参数数量不够，返回一个闭包，暂存传入的参数，并重新返回curry函数
        return (..._args) => curry(fn, ...args, ..._args);
    }
}

function multiFn(a, b, c) {
    return a * b * c;
}

var multi = curry(multiFn);

console.log(multi(2)(3)(4)); // 24
console.log(multi(3, 4, 5)); // 60
console.log(multi(4)(5, 6)); // 120
console.log(multi(5, 6)(7)); // 210

function curry(fn, ...args) {
  if(fn.length <= args.length) {
    return fn(...args)
  }
  return (..._args) => curry(fn, ...args, ..._args)
}




//偏函数
/**
    * 实现函数 partialUsingArguments，调用之后满足如下条件：
    1、返回一个函数 result
    2、调用 result 之后，返回的结果与调用函数 fn 的结果一致
    3、fn 的调用参数为 partialUsingArguments 的第一个参数之后的全部参数以及 result 的调用参数
*/ 
function partialUsingArguments(fn, ...args) {
  return function(..._args) {
    return fn( ...args, ..._args)
  }
}

function curry(fn, ...args) {
  if(args.length >= fn.length) return fn(...args)
  return (..._args) => curry(fn, ...args, ..._args)
}




/**
add(1); // 1
add(1)(2); // 3
add(1)(2)(3); // 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6
 */

function add(...args) {
  let fn = function(..._args) {
    return add(...args, ..._args)
  }
  fn.toString = function() {
    return args.reduce((a,b)=>a + b)
  }
  return fn
}
// function add(a) {
//   function sum(b) {
//     a = a + b
//     return sum
//   }
//   sum.toString = function() {
//     return a
//   }
//   return sum
// }
console.log(add(1));// 1
console.log(add(1)(2)); // 3
console.log(add(1)(2)(3)); // 6
console.log(add(1)(2, 3)); // 6
console.log(add(1, 2)(3)); // 6
console.log(add(1, 2, 3)); // 6



// 4+2-1=5
console.log((4).add(2).minus(1)); // 5
Number.prototype.add = function(n) {
  // this为 Number {4} 实例对象
  // this.valueOf()为Number {4}的基本数字值4
  return this.valueOf() + n;
};
Number.prototype.minus = function(n) {
  return this.valueOf() - n;
};

// 同样，也可以添加乘、除的方法
Number.prototype.mul = function(n) {
  return this.valueOf() * n;
};

Number.prototype.div = function(n) {
  return this.valueOf() / n;
};


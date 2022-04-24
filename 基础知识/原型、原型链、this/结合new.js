function bar() {
  return {method: '1'} 
}
function foo(){}
foo.prototype = new bar() // new的对象可以不是bar的实例

// foo.prototype instanceof bar   false
// foo.prototype 
// foo.prototype.__proto__ == Object.prototype
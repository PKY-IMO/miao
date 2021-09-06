// ```
// 可遍历的对象内置了Symbol.iterator属性
// for ... of 是具体实现
// 工作原理：
//   创建一个指针对象，指向数据的起始位置
//   第一次调用对象的next方法，指针自动指向数据结构第一个成员
//   不断调用next,直到指向最后一个成员
//   每次调用next都会返回value和done属性的对象
// ```
// ```
// 遍历map和set 
// for of
// forEach
// ```

const banji = {
  name: 'yiban',
  stus: [
    'xiaoming',
    'daming',
    'dabao'
  ],
  [Symbol.iterator](){
    // 索引变量
    let index = 0
    let _this = this
    return {
      next: ()=>{
        if (index < this.stus.length) {
          return {value: this.stus[index++], done:false}
        }else {
          return {value: undefined, done:true}
        }
      }
    }
  }
}

for (let v of banji) {
  console.log(v)
}


//
Number.prototype[Symbol.iterator] = function*() {
  for (var i = 0; i < this; i++) {
      yield i 
  }
}

for (var i of 10) {
  console.log(i)
}

//
obj = {a:1, b:2, c:3}

for(var val of obj) {
  console.log(val)
}

Object.prototype[Symbol.iterator] = function*(){
  for (let key in this) {
    yield this[key]
  }
}
//Object.keys(obj) Object.values(obj)
// [key, val] = Objext.entries(obj)

//
Number.prototype.digit = function*() {
  let _this = this
  while(_this) {
    let digit = _this % 10
    yield digit
    _this = (_this - digit) / 10
  }
}
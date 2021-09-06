// 生成器是一个特殊的函数
// 异步编程的特殊解决方案
function * gen() {
  console.log(1)
  yield '---'; // 分隔符
  console.log(2)
  yield '---';
  console.log(3)
  yield '---';
  console.log(4)
  yield '---';
}
let iterator = gen()
// 通过next方法控制下一次的执行
let t = iterator.next() 
iterator.next()
iterator.next()
iterator.next()
iterator.next() // 不执行

console.log(t) // { value: '---', done: false }

// 遍历
for(let v of gen()) {
  console.log(v)
}

// 1s输出 111 2s输出222 3s输出333
setTimeout(()=>{
  console.log(111)
  setTimeout(()=>{
    console.log(222) 
    setTimeout(()=>{
      console.log(333)
    },3000)
  },2000)
},1000)

// return 结束方法
// throw 

// 生成可迭代对象
function* fibbs(n) {
  var a = 0
  var b = 1
  while (n-- > 0){
      yield b;
      b = b + a
      a = b - a
  }
  return 888
}
// [...fibbs(10)]


function toArray(iterable) {
  let generated = iterable.next()
  let arr = []
  while(!generated.done) {
      arr.push(generated.value)
      generated = iterable.next()
  }
  return arr
}

function forof(iterable, f) {
  var generated = iterable.next()
  while(!generated.done) {
    if (f(generated.value) === false) {
      break
    }
    generated = iterable.next()
  }
  iterable.return()
}

// f10 = fibbs(10)
// for (let xxx of f10) {break}
// f10 undefined trur

// 生成器函数相互调用

function* c() {
  yield 'x'
  yield 'y'
}
function* b() {
  yield 1
  yield 2
  yield *c()
}
function* a() {
  yield 'a'
  yield 'b'
  yield *b()
}
[...a()]
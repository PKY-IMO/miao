// Promise 的 .then 或者 .catch 可以被调用多次，
// 但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，
// 那么后续每次调用 .then 或者 .catch 都会直接拿到该值。
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
      console.log('timer');
      resolve('success');
  }, 1000);
})
const start = Date.now();
promise.then(res => {
console.log(res, Date.now() - start);
});
promise.then(res => {
console.log(res, Date.now() - start);
});

// return new Error 返回成功的promise
// throw new Error 返回失败的promise
Promise.resolve().then(() => {
	return new Error('error!!!');
}).then(res => {
	console.log("then: ", res);
}).catch(err => {
	console.log("catch: ", err);
});


//.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
// typeError
const promise = Promise.resolve().then(() => {
	return promise;
})
promise.catch(console.err);


//值透传
Promise.resolve(1)
    .then(2) // 数字
    .then(Promise.resolve(3)) //对象
    .then(console.log);
//.then 或 .catch 必须接收一个函数，否则发生值透传


//多个promise 注意微任务队列不要顺次执行
//.finally()方法不管Promise对象最后的状态如何都会执行
//.finally()方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是没法知道Promise最终的状态是resolved还是rejected的
//它最终返回的默认会是一个上一次的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象。
Promise.resolve('1')
.then(res => {
	console.log(res);
})
.finally(() => {
	console.log('finally');
});
Promise.resolve('2')
.finally(() => {
    console.log('finally2');
    return '我是finally2返回的值';
})
.then(res => {
	console.log('finally2后面的then函数', res);
});
// 1
// finally2
// finally
// finally2后面的then函数 2



//链式调用后面的内容需要等前一个调用执行完才会执行。
function promise1 () {
  let p = new Promise((resolve) => {
      console.log('promise1'); //1 'promise1'
      resolve('1');
  });
  return p;
}
function promise2 () {
  return new Promise((resolve, reject) => {
    reject('error');
  })
}
promise1()
  .then(res => console.log(res)) //2 '1'
  .catch(err => console.log(err))//
  .finally(() => console.log('finally1'));//4 'finally1'

promise2()
  .then(res => console.log(res))// 
  .catch(err => console.log(err))//3 'erro'
  .finally(() => console.log('finally2'));//5 'finally2'
// promise1
// 1
// error
// finally1
// finally2



//async await
async function async1 () {
  console.log('async1 start');// 2
  await new Promise(resolve => {
    console.log('promise1');// 3  await 后面是pending状态的Promise 会阻塞 后面不执行
  })
  console.log('async1 success');
  return 'async1 end';
}
console.log('srcipt start');// 1
async1().then(res => console.log(res));
console.log('srcipt end');// 4




//
async function async1() {
  console.log("async1 start");//2
  await async2();
  console.log("async1 end");//6
}

async function async2() {
console.log("async2");//3
}

console.log("script start"); //1

setTimeout(function() {
console.log("setTimeout");//8
}, 0);

async1();

new Promise(function(resolve) {
  console.log("promise1");//4
  resolve();
}).then(function() {
console.log("promise2");//7
});
console.log('script end');//5



//
async function testSometing() {
  console.log("执行testSometing"); //2
  return "testSometing";
}

async function testAsync() {
  console.log("执行testAsync");//6
  return Promise.resolve("hello async");
}

async function test() {
  console.log("test start..."); //1
  const v1 = await testSometing();//v1 = "testSometing"
  console.log(v1);//5 "testSometing"
  const v2 = await testAsync();//v2 = "hello async"
  console.log(v2);//8 "hello async"
  console.log(v1, v2);//9 "testSometing" "hello async"
}

test();

var promise = new Promise(resolve => {
  console.log("promise start...");//3
  resolve("promise");
});
promise.then(val => console.log(val));//7 "promise"

console.log("test end...");//4


//await后面跟着的是一个状态为rejected的promise。
//如果在async函数中抛出了错误，则终止错误结果，不会继续向下执行。

const first = () => (
  new Promise((resolve, reject) => {
  console.log(3);//1
  let p = new Promise((resolve, reject) => {
      console.log(7);//2
      setTimeout(() => {
          console.log(5);//6
          resolve(6);
          console.log(p) //promise fulfilled:1
      }, 0)
      resolve(1);
  });
  resolve(2);
  p.then((arg) => {
      console.log(arg);//4  1
  });
  })
);
first().then((arg) => {
  console.log(arg);//5 2
});
console.log(4);//3


//
const async1 = async () => {
  console.log('async1');//2
  setTimeout(() => {//HONG1
     console.log('timer1');//7
  }, 2000)
  await new Promise(resolve => {//ZUSE
    console.log('promise1');//3
  })
  console.log('async1 end');
  return 'async1 success';
} 
console.log('script start');//1
async1().then(res => console.log(res));
console.log('script end');//4
Promise.resolve(1)
  .then(2) //
  .then(Promise.resolve(3))//
  .catch(4)//
  .then(res => console.log(res));//5 1
setTimeout(() => {
console.log('timer2');//6
}, 1000);

//finally不管Promise的状态是resolved还是rejected都会执行，且它的回调函数是接收不到Promise的结果的
//finally 返回值如果在没有抛出错误的情况下默认会是上一个Promise的返回值
const p1 = new Promise((resolve) => {
  setTimeout(() => {
      resolve('resolve3');
      console.log('timer1');//3  'timer1'
  }, 0);
  resolve('resovle1');
  resolve('resolve2');
})
.then(res => {
  console.log(res);//1 'resovle1'
  setTimeout(() => {
    console.log(p1);//4 promise fulfilled: 'undefined'
  }, 1000)
})
.finally(res => {
console.log('finally', res);//2 finally undefined
});


//内外层压入 可以当成return undefined
Promise.resolve()
    .then(() => { // 外层第一个then
        Promise.resolve().then(() => {
            console.log(1);
        }).then(() => {
            console.log(2);
        })
        // return undefined
    })
    .then(() => { // 外层第二个then
        console.log(3);
    })


//
async function async1() {
  console.log('async1 start');//2
  await async2();
  console.log('async1 end');//6
}
async function async2() {
  console.log('async2');//3
}
console.log('script start');//1
setTimeout(function() {
  console.log('setTimeout');//8
}, 0)
async1();
new Promise(function(resolve) {
  console.log('promise1');//4
  resolve();
}).then(function() {
  console.log('promise2');//7
});
console.log('script end');//5

//await 如果遇到是promise，则要等promise执行完，遇到普通值
let a;

const b = new Promise((resolve, reject) => {
    console.log('promise1');//1
    resolve();
}).then(() => {
    console.log('promise2');//4
}).then(() => {
    console.log('promise3');//5 
}).then(() => {
    console.log('promise4');//6
});

a = new Promise(async (resolve, reject) => {
    console.log(a);//2 promise pending====undefined？？？
    await b;
    console.log(a);//7 promise pending
    console.log('after1');//8
    await a;//zuse
    resolve(true);
    console.log('after2');
});

console.log('end');//3

// promise1
// undefined
// end
// promise2
// promise3
// promise4
// Promise { pending }
// after1

console.log(1);
     
setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});
 
new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})
 
setTimeout(() => {
  console.log(6);
})
 
console.log(7);
//1 4 7 5  2 3 6


setTimeout(() => {
  console.log(1);//6
},0);

new Promise(function(resolve){
  resolve();
  console.log(2); //1
}).then(console.log(3))//4 .then(()=>console.log(3))

console.log(4); //2

function a() {
  console.log('a');//7
  Promise.resolve().then(() => {
    console.log('e');//8
  })
}

function b() {
  console.log('b');//5
}

function c() {
  console.log('c');//9
}

function d() {
  setTimeout(a, 0)
  let temp = Promise.resolve().then(b)
  setTimeout(c, 0)
  console.log('d');//3
}

d()
// 2 4 'd' 3 'b' 1 'a' 'e' 'c'
// 2 3 4 d b 1 a e c

async function async1(){
  console.log('async1 start')//2
  await async2()
  console.log('async1 end')//6
}

async function async2(){
  console.log('async2')//3
}

console.log('script start')//1

setTimeout(function(){
  console.log('setTimeOut')//8
}, 0)

async1()

new Promise(function(resolve){
  console.log('promise1')//4
  resolve()
}).then(function(){
  console.log('promise2')//7
})

console.log('script end')//5


///
async function async1() {
  console.log('async1 start'); //2
  await async2();
  console.log('async1 end');//6
}
async function async2() {
  console.log('async2'); //3
}
console.log('script start'); //1
setTimeout(function () {
  console.log('setTimeout');//8
}, 0)
async1()
new Promise(function (resolve) {
  console.log('promise1')//4
  resolve()
}).then(function () {
  console.log('promise2')//7
})

console.log('script end')//5


//////
async function async1(){
  console.log('async1 start')//2
  await async2()
  console.log('async1 end')//8
}
async function async2(){
  console.log('async2')//3
}
console.log('script start')//1
setTimeout(function(){
  console.log('setTimeout0') //10
},0)  
setTimeout(function(){
  console.log('setTimeout3') //11
},3)  
setImmediate(() => console.log('setImmediate'));//12------check阶段执行
process.nextTick(() => console.log('nextTick'));//7
async1();
new Promise(function(resolve){
  console.log('promise1')//4
  resolve();
  console.log('promise2')//5
}).then(function(){
  console.log('promise3')//9
})
console.log('script end')//6


//////////
setTimeout(()=>console.log('a'), 0)//12
var p = new Promise((resolve)=>{
    console.log('b');//1
    resolve();
}
);
p.then(()=>console.log('c'));//8
p.then(()=>console.log('d'));//9

console.log('e');//2

async function async1() {
    console.log("a");//4
    await async2();
    console.log("b");//10
}
async function async2() {
    console.log('c');//5
}

console.log("d");//3

setTimeout(function() {
    console.log("e");//13
}, 0);

async1();

new Promise(function(resolve) {
    console.log("f");//6
    resolve();
}
).then(function() {
    console.log("g");//11
});

console.log('h');//7


////
obj = {
  f1: function() {
    console.log(f1)
  }
}
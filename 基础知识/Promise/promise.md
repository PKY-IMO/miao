## promise 状态
promise 实例对象的属性  [PromiseState]
* pending 未决定的
* resolved / fullfilled 成功
* rejected 失败
 # 状态改变 有且仅有pending-》resolved 或者 pending-》rejected

## Promise 对象的值
promise 实例对象的属性 [PromiseResult]
对象[成功/失败]的结果
* resolve
* reject

## Promise 执行器函数同步立即调用

## Promise.resolve 返回一个成功/失败的Promise对象
  * 如果传入参数为非promise类型的对象，返回结果为成功的promise对象
  * 如果传入参数为Promise对象，参数的结果决定了resolve的结果
  * 如果传入thenable对象，将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法
  * 如果为空，返回结果为成功的promise对象
 # Promise.reject 返回一个失败的promise对象

## Promise.all 
  如果所有的promise都为成功，返回成功的promise对象，结果为成功值组成的数组
  如果有一个为失败，返回失败的promise对象，结果为那个失败值

## Promise.race
  返回一个新的promise对象，第一个完成的promise的结果状态就是promise的结果状态

* 改变promise状态 1.resolve 2.reject 3.throw
* 为一个promise指定多个成功、失败回调都会执行吗？ 会

** then 和resolve谁先谁后。都可以，同步代码resolve先，异步任务then先执行（因为then是微任务）
** 什么时候执行回调（得到数据）1.同步任务resolve先，then方法调用就执行回调函数。2.异步任务，先then后状态，则改变状态以后再去调用成功或失败的结果

## Promise.then
  返回的promise结果状态，由指定的回调函数的执行的结果决定（返回值，没有就是undefined）
  1.throw 抛出错误，变为失败，必须为throw！！
  2.非promise对象 成功 return值就是结果
  3.promise对象 由promise结果决定

## Promise 异常穿透
  可以在最后指定catch方法，前面出错后的then不执行

## 中断Promise链
  唯一方法：返回pending状态的promise对象
  return new Promise(()=>{})

## Promise.finally
  不管Promise的状态是resolved还是rejected都会执行，且它的回调函数是接收不到Promise的结果的
  finally 返回值如果在没有抛出错误的情况下默认会是上一个Promise的返回值
  

  
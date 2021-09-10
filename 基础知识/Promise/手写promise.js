// 声明构造函数
function Promise(executor) {
  // 属性
  this.PromiseState = 'pending'
  this.PromiseResult = null
  // 声明回调函数
  this.callbacks = []
  // 保存实例的this
  const self = this
  // resolve函数
  function resolve(data) {
    // *只能改变一次状态
    if (self.PromiseState !== 'pending') return

    // 1.修改对象状态 （promiseState)
    self.PromiseState = 'fulfilled'
    // 2.设置对象结果值（promiseResult）
    self.PromiseResult = data

    // *then先调用，然后再resolve改变状态再执行回调
    // if(self.callback.onResolved) {
    //   self.callback.onResolved(data)
    // }
    queueMicrotask(()=>{
      self.callbacks.forEach(item => {
        item.onResolved(data)
      })
    })
  }
  // reject函数
  function reject(data) {
    if (self.PromiseState !== 'pending') return

    // 1.修改对象状态 （promiseState)
    self.PromiseState = 'rejected'
    // 2.设置对象结果值（promiseResult）
    self.PromiseResult = data
    
    queueMicrotask(()=>{
      self.callbacks.forEach(item => {
        item.onRejected(data)
      })
    })
  }
  
  try {
    //同步调用[执行器函数]
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }

}
// 添加 then方法
Promise.prototype.then = function(onResolved, onRejected) {
  const self = this
  // 判断回调函数参数 异常穿透 和值传递
  if(typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }
  if(typeof onResolved !== 'function') {
    onResolved = value => value;
  }
  return new Promise((resolve,reject) => {
    function callback(type) {
      try {
        let result = type(self.PromiseResult)
        // 判断
        if (result instanceof Promise) {
          // 如果是Promise对象
          result.then(v=>{
            resolve(v)
          }, r=>{
            reject(r)
          })
        }else {
          // 结果为成功
          resolve(result)
        }  
      } catch (error) {
        reject(error)
      }
    }
    // 调用回调函数，实例对象PromiseState
    if(this.PromiseState === 'fulfilled') {
      queueMicrotask(()=>{
        callback(onResolved)
      })
    }
    if(this.PromiseState === 'rejected') {
      queueMicrotask(()=>{
        callback(onRejected)
      })
    }
    // 判断pending
    if(this.PromiseState === 'pending') {
      // 保存回调函数
      this.callbacks.push({
        onResolved: ()=>callback(onResolved),
        onRejected: ()=>callback(onRejected)
      })
    }
  })
}

// 添加catch方法
Promise.prototype.catch = function(onRejected) {
  return this.then(undefined, onRejected)
}

// 添加 resolve方法
Promise.resolve = function(value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(v=>{
        resolve(v)
      },r=>{
        reject(r)
      })
    }else {
      resolve(value)
    }
  })
}

// 添加reject方法
Promise.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

// 添加all方法
Promise.all = function(promises) {
  return new Promise((resolve, reject)=>{
    let count = 0
    let arr = []
    // 遍历
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(v => {
        count++
        arr[i] = v
        if (count === promises.length) {
          resolve(arr)
        }
      },r => {
        reject(r)
      })
    }
  })
}

//添加 race方法
Promise.race = function(promises) {
  return new Promise((resolve, reject)=>{
    for(let i = 0; i < promises.length; i++) {
      promises[i].then(v => {
        resolve(v)
      },r=>{
        reject(r)
      })
    }
  })
}


Promise.allSettled = function(promises) {
  return new Promise((resolve, reject) => {
    let result = Array(promises.length)
    let settled = 0
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value => {
        settled++
        result[i] = {
          status: 'fulfilled',
          value,
        }
        if (settled == promises.length) {
          resolve(result)
        }
      }, reason => {
        settled++
        result[i] = {
          status: 'rejected',
          reason,
        }
        if (settled == promises.length) {
          resolve(result)
        }
      })
    }
  })
}

Promise.prototype.finally = function(f) {
  return this.then(
    value => Promise.resolve(f()).then(()=>value),
    // reason => Promise.resolve(f()).then(()=>{throw reason}, reason => {throw reason}) 第二个参数可以省略
    reason => Promise.resolve(f()).then(()=>{throw reason})
  )
}

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let count = 0
    let arr = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value=>{
        count++
        arr[i] = value
        if (count === promises.length) {
          resolve(arr)
        }
      },reason=>{
        reject(reason)
      })
    }
  })
}

class Promise {
  constructor(executor) {
    this.status = 'pending'
    this.data = null
    this.resolveCallback = [] //p.then p.then
    this.rejectedCallbak = []

    const resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.data = value
      }
    }
    const reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.data = reason
      }
    }

    try {
      //同步调用[执行器函数]
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onResolved, onRejected) {
    if(typeof onRejected !== 'function') {
      onRejected = reason => {
        throw reason
      }
    }
    if(typeof onResolved !== 'function') {
      onResolved = value => value;
    }

    return new Promise((resolve, reject) => {
      if (this.status === 'pending') {
        this.resolveCallback.push(onResolved)
        this.rejectedCallbak.push(onRejected)
      } else {
        if (this.status === 'fulfilled') {
          queueMicrotask(()=>{
            try {
              let x = onResolved(this.data)
              if (x instanceof Promise) {
                x.then(resolve, reject)
              }else {
                resolve(x)
              }       
            }catch(e) {
              reject(e)
            }
          })
        }
        if (this.status === 'rejected') {
          queueMicrotask(()=>{
            onRejected(this.data)
          })
        }
      }
    })

  }
}
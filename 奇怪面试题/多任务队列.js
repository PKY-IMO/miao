// class TaskQueue {
//   constructor(){  
//   }

//   addTask(task) {
//   }
  
// }

var q = new TaskQueue()
q.addTask((next) => {
  console.log(1)
  setTimeout(next, 2000)
}).addTask(next => {
  console.log(2)
  setTimeout(next, 1000)
})

// 异步任务依次执行
class TaskQueue {
  constructor(){ 
    this.isRun = false
    this.tasks = []

    this.next = ()=>{
      if(this.tasks.length) {// has task
        var task = this.tasks.shift()
        task(this.next)
      }else{// no task
        this.isRun = false
      }
    }

  }

  addTask(task) {  // task (next)=>{}   最后会调用next
    if (this.isRun) {
      this.tasks.push(task)
    }else {
      this.isRun = true
      task(this.next)
    }
    return this
  }
  
}

var q = new TaskQueue()
q.addTask(next => {
  console.log(1)
  next()
}).addTask(next => {
  console.log(2)
  setTimeout(next, 2000)
}).addTask(next => {
  console.log(3)
  setTimeout(next, 3000)
})

// 多个异步任务并行执行
class TaskQueue2 {
  constructor(limit = 2){  
    this.runTasks = 0
    this.tasks = []
    this.limit = limit
    this.next = ()=>{
      if (this.tasks.length) {
        let task = this.tasks.shift()
        task(this.next)
      }else {
        this.runTasks--
      }
    }
  }

  addTask(task) {
    if (this.runTasks >= this.limit) {
      this.tasks.push(task)
    }else {
      this.runTasks++   
      task(this.next)
    }
    return this
  }
  
}



// async.js 并行执行完tasks，执行回调
function parallel(tasks, callback) {
  if (tasks.length === 0) {
    callback()
  }else {
    let count = 0
    for(let task of tasks) {
      task(()=>{
        count++
        if (count === tasks.length) {
          callback()
        }
      })
    }
  }
}



function series(tasks, callback) {
  if (tasks.length === 0) {
    callback()
  }else {
    var runned = 0
    function next() {
      runned++
      if (tasks.length >runned) {
        tasks[runned](next)
      }else {
        callback()
      }  
    }
    tasks[0](next)
  }
}

series([
  function task1(callback) {
    console.log(1)
    callback()
  },
  function task2(callback) {
    console.log(2)
    setTimeout(callback, 1000)
  },
  function task3(callback) {
    console.log(3)
    setTimeout(callback, 1000)
  }
], function() {
  console.log('ALL DONE')
})


//
let print = new Print()
print.task(1000, () => {
    console.log(1)
}).task(2000, () => {
    console.log(2)
}).task(3000, () => {
    console.log(3)
}).start()
 
function Print() {
  this.list = []
  this.task = (time, fn) => {
      this.list.push({fn, time})
      return this
  }
  this.start = () => {
      if (this.list.length > 0) {
          let temp = this.list.shift()
          let self = this
          setTimeout(function () {
              temp.fn()
              self.start()
          }, temp.time)
      }
  }

}



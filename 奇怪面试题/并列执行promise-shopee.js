// promise异步任务调度，每次最多执行两个，当执行完一个之后立马加入下一个，用最快的速度执行完全部任务

class Scheduler {
  constructor() {
          this.tasks = [], // 待运行的任务
              this.usingTask = [] // 正在运行的任务
      }
      // promiseCreator 是一个异步函数，return Promise
  add(promiseCreator) {
      return new Promise((resolve, reject) => {
          promiseCreator.resolve = resolve
          if (this.usingTask.length < 2) {
              this.usingRun(promiseCreator)
          } else {
              this.tasks.push(promiseCreator)
          }
      })
  }

  usingRun(promiseCreator) {
      this.usingTask.push(promiseCreator)
      promiseCreator().then(() => {
          promiseCreator.resolve()
          this.usingMove(promiseCreator)
          if (this.tasks.length > 0) {
              this.usingRun(this.tasks.shift())
          }
      })
  }

  usingMove(promiseCreator) {
      let index = this.usingTask.findIndex(promiseCreator)
      this.usingTask.splice(index, 1)
  }
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(400, 4)
addTask(200, 2)
addTask(300, 3)
addTask(100, 1)

// 2, 4, 3, 1
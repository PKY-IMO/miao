function getValue(n, time = 1000) {
  return new Promise(resolve => {
      setTimeout(() => resolve(n), time)
  })
}

run(function * f() {
  console.log(1) 
  var x = yield getValue(2, 1000)
  console.log(x) 
  var x = yield getValue(6, 2000)
  console.log(x) 
  var x = yield getValue(7, 3000)
  console.log(x) 
  var x = yield getValue(8, 1000)
  console.log(x)
})

function run(generator) {
  var iterable = generator()
  var generated = iterable.next()
  tick()
  
  function tick() {
    if (!generated.done) {
      generated.value.then(value => {
        generated = iterable.next(value)
        tick()
        }, reason => {
        generated = iterable.throw(reason)
        tick()
      })
    }
  }

}

function runthen(generator) {
  return new Promise((resolve, reject)=>{

    var iterable = generator()
    var generated = iterable.next()
    
    function tick() {
      if (!generated.done) {
        generated.value.then(value => {
          try {
            generated = iterable.next(value)
            tick()
          } catch (error) {
            reject(error)
            return
          }
          }, reason => {
            try {  
              generated = iterable.throw(reason)
              tick()
            } catch (error) {
              reject(error)
              return
            }
        })
      }else {
        resolve(generated.value)
      }
    }
  
    tick()

  })
}
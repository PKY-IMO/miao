const red = () => new Promise((resolve, reject) =>  {
  console.log('red');
  setTimeout(() => {
    resolve()
  }, 10 * 1000)
})

const yellow = () => new Promise((resolve, reject) =>  {
  console.log('yellow');
  setTimeout(() => {
    resolve()
  }, 2 * 1000)
})

const green = () => new Promise((resolve, reject) =>  {
  console.log('green');
  setTimeout(() => {
    resolve()
  }, 5 * 1000)
})

const main = (curr, count) => {
  red().then(() => {
    return yellow()
  })
    .then(() => {
      return green()
    })
    .then(() => {
      curr += 1
      if (curr < count) main(curr, count)
    })
}

main(0, 5)


//
var red = () => console.log('red')

var green = () => console.log('green')

var yellow = () => console.log('yellow')

var tic = function(f, time) {
  return new Promise((resolve) => {
      f();
      setTimeout(resolve, time*1000)
    })
}
//当这里要不停的循环的话，不可以用while true 因为这里主线成相当于一直进行，settimeout不起作用
var step = function(total, count = 0) {
  tic(red, 3)
  .then(() => tic(green, 2))
  .then(() => tic(yellow, 1))
  .then(() => {
    count++
    if (count < total) step(total, count)
  })
}



var tic = function(color, time) {
  return new Promise((resolve) => {
      console.log(color)
      setTimeout(resolve, time*1000)
  })
}
//当这里要不停的循环的话，不可以用while true 因为这里主线成相当于一直进行，settimeout不起作用
var step = function(total, count = 0) {
  tic('red', 3)
  .then(() => tic('green', 2))
  .then(() => tic('yellow', 1))
  .then(() => {
    count++
    if (count < total) step(total, count)
  })
}



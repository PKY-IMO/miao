function f1(cb) {
  setTimeout(function () {
    console.log('1')
    cb()
  },300)
}

function f2(cb) {
  setTimeout(function () {
    console.log('2')
    cb()
  },500)
}

function f3(cb) {
  setTimeout(function () {
    console.log('3')
    cb()
  },100)
}

// queue([f1,f2,f3],2)  //132

function queue(list, count) {
  function request() {
    if (list.length) {
      list.shift()(request)
    }
  }
  let i = 0
  while (list.length > 0 && i < count) {
    list.shift()(request)
    i++;
  }
} 
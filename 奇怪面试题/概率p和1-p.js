var p = Math.random()

function f() {
  if (Math.random() < p) {
    return 1
  } else {
    return 0
  }
}


function rand() {
  var a = f()
  var b = f()
  if (a == 1 && b == 0) {
    return 0
  }
  if (a == 0 && b == 1) {
    return 1
  }
  return rand()
}
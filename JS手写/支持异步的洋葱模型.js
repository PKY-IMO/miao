/**一种中间件机制，函数式组合的概念：柯里化
  将一组需要顺序执行的函数复合为一个函数，
  外层函数的参数实际是内层函数的返回值
例如：有个add方法和平方的方法，先加后平方，
  实现一个compose方法，将参数拆分为第一个函数参数和其他函数参数，
  拿到第一个函数返回的结果，将这个结果作为下一个需要执行的函数的入参
  每次把执行的当前函数的返回值都给下一个函数，可以逐级把每个函数都执行玩
  内层函数的返回值抛给外层函数当参数*/
  

const add = (x, y) => x + y
const square = z => z * z

const compose = (...[first, ...other]) => (...args) => {
  let res = first(...args)
  other.forEach(fn => {
    res = fn(res)
  })
  return res
}
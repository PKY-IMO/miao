addEventListener('message', e => {
  console.log('收到主线程的消息')
  let number = e.data
  let ans = fib(number)
  postMessage(ans)
})
function fib(n) {
  return n<=2 ? 1 : fib(n-1) + fib(n-2)
}
//self.close()
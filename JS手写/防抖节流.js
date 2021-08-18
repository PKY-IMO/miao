

//防抖，在第一次触发事件时，不立即执行函数，而是给出一个期限值比如200ms，然后：
//如果在200ms内没有再次触发滚动事件，那么就执行函数
//如果在200ms内再次触发滚动事件，那么当前的计时取消，重新开始计时
function debounce(f, delay) {
  let timer = null
  return function() {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(f, delay)
  }
}

//节流
// 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
function throttle(f, delay) {
  let canRun = true
  return function() {
    if(!canRun) return
    canRun = false
    setTimeout(() => {
      f.apply(this, arguments)
      canRun = true
    }, delay)
  }
}

function throttle(fun, delay) {
  let last, 
      timer;
  return function () {
      let self = this,
          args = arguments,
          now = +new Date();

      if (last && now < last + delay) {
          clearTimeout(timer);
          timer = setTimeout(function () {
              last = now;
              fun.apply(self, args);
          }, delay);
      } else {
          last = now;
          fun.apply(self, args);
      }
  }
}
// 没秒执行一次
const myEvent = throttle(function() {
  console.log('开始执行...');
}, 1000);

document.querySelector('input').addEventListener('keyup', myEvent);
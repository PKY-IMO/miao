// fn最大执行次数为n, fn可异步可同步，失败之后过1秒接着执行

function maxRequest(url = ``, times = 3) {
  // 1. 闭包，保存私有属性
  function autoRetry (url, times) {
    console.log('times = ', times);
    times--;
    // 2. fetch 本身返回值就是 Promise，不需要再次使用 Promise 包裹
    return fetch(url).then(value => {
        if(value.status === 200) {
          console.log(`✅ OK`, value);
          // 3. 手动返回 Promise 的 value， 没有返回值 默认返回 undefined
          return value;
        } else {
          throw new Error(`❌  http code error: ${value.status }`);
        }
      }).catch((err) => {
        console.log(`❌  Error`, err);
        if (times < 1) {
          // 4. 方便后续的 thenable 处理 error
          throw new Error('💩  over max request times!');
        } else {
          // 5. 返回递归方法 
          return autoRetry(url, times);
        }
      });
  }
  // 6. 返回一个 Promise 的结果 （成功 Promise 或失败 Promise）
  return autoRetry(url, times);
}
      
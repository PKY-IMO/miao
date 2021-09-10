//倒计时 settimout 和setinterval
function fn(num) {
  for (let i = num; i>=0; i--) {
      setTimeout(function(){
          console.log(i)
      }, (num-i)*1000)
  }
}
fn(5)//, 5 ,4, 3, 2, 1//间隔1s输出一次。
function fn2(num) {
  for (var i = 0;i < num; i++) {
    (function(i) {
      setTimeout(function() {
        console.log(i)
      }, (num-i)*1000)
    })(i)
  }
}

function fn(num) {
    var timer = setInterval(function() {
        if (num >= 0) {
            console.log(num);
            num --
        }  else {
            clearInterval(timer)
        }
    }, 1000)
}

// sleep 实现promise版本
function sleep(interval){
  return new Promise(resolve=>setTimeout(resolve, interval));
}
async function stepPrint(n){
  for(let i=1; i<= n; i++){
    console.log(i);
    await sleep(i*1000);
  }
}
stepPrint(5)
  
  
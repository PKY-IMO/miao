//字符串相加 '345'+'9802'
let s1 = '98975'
let s2 = '1006'
function addString(num1, num2) {
  let l1 = num1.length - 1, l2 = num2.length - 1
  let cur = 0
  let ans = ''
  while(l1 >= 0 || l2 >= 0) {
    let a = num1[l1--] | 0
    let b = num2[l2--] | 0
    let z = a + b + cur
    let digit = z % 10
    cur = (z - digit) / 10
    ans = digit + ans
  }
  if(cur) ans = cur + ans
  return ans
}


//2的1000次方
let n = 1000
function pow2(n) {
  let pow = Array(n + 1)
  pow[0] = '1'
  for (let i = 1; i < n; i++) {
    pow[i] = addString(pow[i - 1], pow[i - 1])
  }
  for (let item of pow) {
    console.log(item)
  }
}
pow2(1000)

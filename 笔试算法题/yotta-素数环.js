// 6 1-6组成一圈 相邻两数之和都为素数的组合数量
// 输入n 输出数量
const isPrime = (x) => {
  let n = Math.sqrt(x)
  for (let i = 2; i <= n; i++) {
    if (x % i == 0) return false
  }
  return true
}

const isLegal =  (k, n, arr) => {
  for (let i = 0; i < k; i++) {
    if (a[i] === a[k]) return false
  }
  // 相邻是否为素数
  if (!isPrime(a[k] + a[k-1])) {
    return false
  }
  if (k === n-1 && !isPrime(a[k] + a[0])) {
    return false
  }
  return true
}
const primeCircle = (n) => {
  let arr = new Array(n).fill(0)
  arr[0] = 1
  let k = 1
  let count = 0
  while(k >= 1) {
    a[k] = a[k] + 1
    // 找到合适的值放入a[k]
    while (a[k] <= n) {
      if (isLegal(k, n, arr)) {
        break;
      } else {
        a[k] = a[k] +1
      }
    }
    // 求解完毕，记录素数环满足计数
    if (a[k] <= n && k === n-1) count++
    if (a[k] <= n && k < n-1 ) { //填写下一个
      k++
    } else {//回溯
      a[k--] = 0
    }
  }
  return count
}


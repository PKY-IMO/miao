#!/usr/bin/env node

//shebang
let num = parseInt(process.argv[2]) || 0
if (num <= 3) {
  console.log(`${num}: no factor`)
  return
}

// 过筛法统计小于n的素数
const primes = n => {
  let res = new Array(n+1).fill(true)
  res[0] = false
  res[1] = false
  for (let i = 2; i <= n; i++) {
    if (res[i]) {
      for (let j = i * i; j <= n; j+=i) {
        res[j] = false
      }
    }
  }
  return res
}

let primesArr = primes(num)

if (primesArr[num]) {
  console.log(`${num}: no factor`)
  return
}

let res = []
let n = num
for (let i = 2; i <= n; i++) {
  if (n % i === 0) {
    n = n / i
    res.push(i)
    i--
  }
}

let ans = res.sort().join(' ')
console.log(`${num}: ${ans}`)

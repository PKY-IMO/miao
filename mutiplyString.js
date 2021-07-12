let num1 = '22'
let num2 = '44'
function multiplyString(num1, num2) {
  if (num1 == '0' || num2 == '0') return '0'
  let i = num1.length - 1, l2 = num2.length - 1
  let m = i + l2 + 2
  let p = new Array(m).fill(0)
  for (; i >= 0; i--) {
    console.log('------------',i)
    for (let j = l2; j >= 0; j--) { //内层循环初始值
      console.log(i,j)
      let tmp = num1[i] * num2[j] + p[i + j + 1]
      p[i + j + 1] = tmp % 10
      p[i + j] += tmp / 10 | 0
    }
  }
  while(p[0] === 0) {
      p.shift()
  }
  return p.join('') 
}

// var multiply = function(num1, num2) {
//   if (num1 == '0' || num2 == '0') return '0'   
//   let l1 = num1.length - 1, l2 = num2.length - 1 
//    //23 * 123  l1=1 l2=2 p.length =5, 0-4
//   let p = new Array(l1 + l2 + 2).fill(0) 
//   for (let i = l1;i >= 0;i--) {
//       for(let j = l2;j >= 0; j--) {
//           let tmp = num1[i] * num2[j] + p[i + j + 1]
//           p[i + j + 1] = tmp % 10
//           p[i + j] += tmp / 10 | 0
//       }
//   }
//   while(p[0] === 0) {
//       p.shift()
//   }
//   return p.join('')
// }

console.log(multiplyString(num1,num2))
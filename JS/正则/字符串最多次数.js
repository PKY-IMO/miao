let str = "abcabcabcbbcccccbbb";
function findStr(str) {
  let num = 0
  let char = ''
  let obj = {}
  for (let char of str) {
    obj[char] = (obj[char] || 0) + 1
  }
  for (let c in obj) {
    if(obj[c] > num) {
      num = obj[c]
      char = c
    }else if(obj[c] === num) {
      char = [].concat(char, c)
    }
  }
  return num
}

//模板字符串匹配
function findByReg(str) {
  let num = 0
  let char = ''
  str = str.split('').sort().join('')
  let re = /(\w)\1+/g
  str.replace(re, (s, c)=>{
    if (num < s.length) {
      num = s.length
      char = c
    }else if (num === s.length) {
      char = [].concat(char, c)
    }
  })
  return [num,char]
}

console.log(findByReg(str))
function unique(arr) {
  return Array.from(new Set(arr)) // [...new Set(arr)]
}

function unique2(arr) { //过滤掉所有NaN
  return arr.filter((item,idx,arr) => arr.indexOf(item) === idx)
}

function unique3(arr) {
  return arr.reduce((prev,item) => prev.includes(item) ? prev : [...prev, item], [])
}

function unique4(arr) {//对象去重
  let obj = {}
  return arr.filter((item) => obj.hasOwnProperty(typeof item + item) ? 
        false : (obj[typeof item + item]) = true)
}

a = [1,2,3,4,6,6,7,NaN,NaN,{},{}]
b = unique(a)
c = unique2(a)
d = unique3(a)
e = unique4(a)
console.log(b)
console.log(c)
console.log(d)
console.log(e)

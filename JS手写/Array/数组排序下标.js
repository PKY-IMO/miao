// cumRank([1,3,2,3,4])  
// 输出：[0,2,1,2,4]

function cumRank(arr) {
  
  let mapArr =  arr.map((data, idx) => ({'key':idx, 'data':data}))
  let flag = new Map()
  return mapArr.sort((a, b) => a.data - b.data).map((item) => {
    if (flag.has(item.data)) {
      console.log('@@@@@@', flag)
      return flag.get(item.data)
    }
    flag.set(item.data, item.key) 
    return item.key
  })
}

console.log(cumRank([1,3,2,3,4]))
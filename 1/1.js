//1. 快排

//2.数组去重
arr = [1,2,2,3,4,5,5]
arr.reduce((prev, it) =>  prev.includes(it) ? prev : [...prev, it], [])

arr.filter((item, idx) => arr.indexOf(item) == idx)

let newArr = [...new Set(arr)]
let newArr2 = Array.from(new Set(arr))

console.log(arr.map(item => item*item))
//3.对象数组去重
const arr2 = [
  {
      name: 'tom',
      age: 12,
      key: 1,
  },
  {
      name: 'jurry',
      age: 10,
      key: 2,
  },
  {
      name: 'jurry',
      age: 10,
      key: 2,
  },
  {
      name: 'tom',
      age: 12,
      key: 1,
  }];
  function uniqueKey(arr) {
    let keyValue = arr.reduce((pre, item) => pre.concat(item.key),[])
    keyValue = [...new Set(keyValue)]
    let res = []
    for (let key of keyValue) {
      res.push(arr.filter(item => item.key == key)[0])
    }
    return res
  }

  function uniqueKey2(arr) {
    let hash = {}
    let newArr = arr.reduce((pre, item) => {
      let key = item.key
      if (key in hash) {
        return pre
      } else {
        hash[key] = item
        pre.push(item)
        return pre
      }
    },[])
    return newArr
  }
  console.log('uniqueKey',uniqueKey2(arr2))
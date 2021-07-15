//1. 快排,初始值
function quickSort(arr, start=0, end=arr.length-1) {
  if(start >= end) return 
  let pivotIdx = Math.floor(Math.random()*(end - start + 1)) + start
  let pivot = arr[pivotIdx]
  let l = start, r = end
  while(l <= r) {
    while(l <= r && arr[l] < pivot) l++
    while(l <= r && arr[r] >= pivot) r--
    if (l <= r) {
      [arr[l],arr[r]] = [arr[r],arr[l]]
      l++
      r--
    }
  }
  quickSort(arr, start, r)
  quickSort(arr, l, end)
  return arr
}
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

  // 字符串相加，字符串相乘



  a.map2 = function(mapper) {
    let result =[]
    for(let i = 0; i < this.length; i++) {
      result.push(mapper(this[i]))
    }
    return result
  }

  a.map2(it => it*2)

  //获取原型  a.__proto__  Object.getPrototypeOf(a)
  //设置原型  a.__proto__  Object.setPrototypeOf(a)
  //原型链是反向的树状结构，子节点指向父节点
  // obj.prototype

  
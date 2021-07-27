a =[6.1, 4.2, 6.3]
function uniqueBy(arr, iteratee) {
  return arr.map((item) => iteratee(item)).filter((item, idx, arr) => arr.indexOf(item) == idx)
}

function groupBy(collection, iteratee) {
  let map = {}
  for (let item of collection) {
    let key = iteratee(item)
    if(!(key in map)) {
      map[key] = [item]
    }else {
      map[key].push(item)
    }
  }
  return map
}
// console.log(groupBy(a, Math.floor))

for (let i in a) {
  console.log(i)
}

function zip(...arr) {
  let num = arguments.length
  let size = arguments[0].length
  let res = Array.from(new Array(size), () => new Array(num))
  for(let i = 0; i < size; i++) {
    for (let j = 0; j < num; j++) {
      res[i][j] = arguments[j][i]
    }
  }
  return res
}

function unzip(arr) {
  let num = arr.length
  let size = arr[0].length
  let res = Array.from(new Array(size), () => new Array(num))
  for(let i = 0; i < size; i++) {
    for (let j = 0; j < num; j++) {
      res[i][j] = arr[j][i]
    }
  }
  return res
}



function uniq(arr) {
  // return arr.filter((item,idx, arr) => arr.indexOf(item) == idx)
  // return [...new Set(arr)]
  // return Array.from(new Set(arr))
  return arr.reduce(((prev, item) => prev.includes(item) ? prev : [...prev,item]),[])
}

function uniqBy(arr, iteratee) {
  var it = iterator(iteratee)
  let map = {}, res = []
  arr.forEach((item) => {
    let key = it(item)
    if (!(key in map)) {
      map[key] = item
      res.push(item)
    }
  })
  return res
}


function some(array, predicate) {
  var it = iterator(predicate)
  for (let key in array) {
    if (it(array[key], key, array)) return true
  }
  return false
}
function every(collection, predicate) {
  var it = iterator(predicate)
  for (let key in collection) {
    if (!it(collection[key], key, collection)) return false
  }
  return true
}
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': false }
];

function fill(arr, value, start = 0, end = arr.length) {
  for (let i = start; i < end; i++) {
    arr[i] = value
  }
  return arr
}

// var array = [1, 2, 3];

// console.log(fill([4, 6, 8, 10], '*', 1, 3))

function isEqual(a, b) {
  if (a === b) return true
  let type1 = getType(a)
  let type2 = getType(b)
  if (type1 != type2) {
    return false
  }
  if (type1 == 'object' || type1 == 'array') {
    let keys1 = keys(a)
    let keys2 = keys(b)
    if (keys1.length != keys2.length) return false
    for (let key of keys1) {
      if (!isEqual(a[key],b[key])) return false
    }
    return true
  }else return a == b
}
function getType(data) {
  return Object.prototype.toString
    .call(data)
    .split(" ")[1]
    .slice(0, -1)
    .toLowerCase();
}


function keys(obj) {
  let res = []
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      res.push(key)
    }
  }
  return res
}

// var object = { 'a': 1 };
// var other = { 'a': 1 };
// console.log(isEqual(object,other))

function reverse(arr) {
  if (arr.length <= 1) return arr
  let i = 0, j = arr.length - 1
  while(i<j) {
    [arr[i],arr[j]] = [arr[j],arr[i]]
    i++
    j--
  }
  return arr
}

// a = [1,2,3]
// reverse(a)
// console.log(a)
// console.log(reverse(a))


function countBy(obj, f) {
  var it = iterator(f)
  let res = {}
  for (let item of obj) {
    let key = it(item)
    if (key in res) {
      res[key]++
    }else {
      res[key] = 1
    }  
  }
  return res
}

// console.log(countBy(['one', 'two', 'three'], 'length'))

function reduce(collection, it, accumulator) {
  let t = Array.isArray(collection) ? 0 : collection[keys(collection)[0]]
  let init = accumulator || t
  for (let key in collection) {
    init = it(init, collection[key], key)
  }
  return init
} 

// console.log(reduce([1,2,3,4,5,6,7],function(a,b){return a+b}))

function reduceRight(collection, it, accumulator) {
  let keyArr = keys(collection)
  let t = Array.isArray(collection) ? 0 : collection[keyArr[keyArr.length - 1]]
  let init = accumulator || t
  collection = reverse(collection)
  for (let key in collection) {
    init = it(init, collection[key], key)
  }
  return init
}

// var array = [[0, 1], [2, 3], [4, 5]];

// console.log(reduceRight(array, function(flattened, other) {
//   return flattened.concat(other);
// }, []))

function sum(arr) {
  return reduce(arr, (a,b)=> a+b)
}
// console.log(sum([4, 2, 8, 6]))

function sumBy(arr, f) {
  var it = iterator(f)
  return sum(arr.map((item)=>it(item)))
}
// var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
// console.log(sumBy(objects, 'n'))


function flatten(arr) {
  return arr.reduce((prev,item) => prev.concat(Array.isArray(item) ? flatten(item) : item),[])
}

// a = [[1,2,3],4,5,[[6]]]
// console.log(flatten(a))

function isEqual(a, b) {
  if (a === b) return true
  let type1 = getType(a)
  let type2 = getType(b)
  if (type1 != type2) {
    return false
  }
  if (type1 == 'object' || type1 == 'array') {
    let keys1 = keys(a)
    let keys2 = keys(b)
    if (keys1.length != keys2.length) return false
    for (let key of keys1) {
      if (!isEqual(a[key],b[key])) return false
    }
    return true
  }else return a == b
}


n = new Number(NaN)
function isNaN(n) {
  //isNaN方法首先转换类型，而Number.isNaN方法不用；
  //isNaN不能用来判断是否严格等于NaN，Number.isNaN方法可用
  if (typeof n == 'object') {
    return n.valueOf() !== n.valueOf()
  }
  return Number.isNaN(n)
}
// console.log( isNaN(NaN))

function difference(arr, ...args) {
  let val = []
  for(let i = 1; i < arguments.length; i++) {
    val = val.concat(arguments[i])
  }
  return arr.filter(item => !val.includes(item))
}

// console.log(difference([3, 2, 1, 0], [4, 2],[1]))

function concat(arr, ...args) {
  let res = arr
  for (let i = 1; i < arguments.length; i++) {
    let t = arguments[i]
    if (typeof t == 'number') {
      res.push(t)
    }else {
      for(let key in t) {
        res.push(t[key])
      }
    }
  }
  return res
}

// var array = [1];
// console.log(concat(array, 2, [3], [[4]]))

function differenceBy(arr, value, f) {
  if (arguments.length == 2) return (difference(arr,value))
  let val = []
  for(let i = 1; i < arguments.length; i++) {
    let type = getType(arguments[i])
    if( type == 'array') {
      val = val.concat(arguments[i])
    } else {
      var it = iterator(arguments[i])
    }
  }
  if(!it) {
    var it = (i) =>i
  }
  val = val.map(item=>it(item))
  return arr.filter(item => !val.includes(it(item)))
}

function differenceWith(arr, value, f) {
  if (arguments.length == 2) return difference(arr,value)
  let val = []
  for(let i = 1; i < arguments.length; i++) {
    let type = getType(arguments[i])
    if( type == 'array') {
      val = val.concat(arguments[i])
    } else {
      var compare = arguments[i]
    }
  }
  return arr.filter(item => {
    for(let v of val) {
      if(compare(item, v)) return false
    }
    return true
  })
}


function drop(arr, n = 1) {
  if (n >= arr.length) return []
  let res = []
  for (let i = n; i < arr.length; i++) {
    res.push(arr[i])
  }
  return res
}

function dropRight(arr, n = 1) {
  if (n >= arr.length) return []
  let res = []
  for (let i = 0; i < arr.length - n; i++) {
    res.push(arr[i])
  }
  return res
}

function dropWhile(arr, f) {
  let res = []
  let it = iterator(f)
  for (let i = 0; i < arr.length; i++) {
    if (!it(arr[i], i, arr)) {
      res.push(arr[i])
    }else continue
  }
  return res
}


function findLastIndex(arr, f, idx = arr.length - 1) {
  let it = iterator(f)
  for (let i = idx; i >= 0; i--) {
    if(it(arr[i])) return i
  }
  return -1
}

function fromPairs(arr) {
  return arr.reduce((res,item) => (res[item[0]] = item[1],res),{})
}


var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
function head(arr) {
  return arr[0]
}

function indexOf(arr, val, idx = 0) {
  for (let i = idx; i < arr.length; i++) {
    if(arr[i] == val) return i
  }
}


function map(collection, f) {
  let it = iterator(f)
  let res = []
  if(getType(collection) == 'object') {
    for (let key in collection) {
      res.push(it(collection[key], key, collection))
    }
  } else {
    collection.forEach((item,idx,arr)=>res.push(it(item,idx,arr)))
  }

  return res
}

function intersection(...arr) {
  let pre = arguments[0]
  return pre.reduce((prev,item)=>{
    let flag = true
    for(let j = 1; j < arguments.length; j++) {
      if(!arguments[j].includes(item)) {
        flag = false
        break
      }
    }
    if(flag) prev.push(item)
    return prev
  },[])
}

function intersectionWith(...arr) {
  let pre = arguments[0]
  let f = arguments[arguments.length -1]
  return pre.reduce((prev,item)=>{
    let flag = false
    for(let j = 1; j < arguments.length - 1; j++) {
      arguments[j].forEach(value => {
        if(f(value,item)) flag = true
      })
    }
    return flag ? [...prev, item] : prev
  },[])
}

function intersectionBy(...arr) {
  let pre = arguments[0]
  let it = iterator(arguments[arguments.length -1])
  return pre.reduce((prev,item)=>{
    let flag = false
    for(let j = 1; j < arguments.length - 1; j++) {
      arguments[j].forEach(value => {
        if (it(value) == it(item))
        flag = true
      })
    }
    return flag ? [...prev, item] : prev
  },[])
}

function intersectionWith(...arr) {
  let pre = arguments[0]
  let len = arguments.length - 2
  let f = arguments[len + 1]
  return pre.reduce((prev,item)=>{
    let sum = 0
    for(let j = 1; j < arguments.length - 1; j++) {
      let tmp = false
      arguments[j].forEach(value => {
        if(f(value,item)) tmp = true
      })
      if (tmp) sum++
    }
    return sum == len ? [...prev, item] : prev
  },[])
}


function filter(collection, it) {
  let res = []
  var predicate = iterator(it)
  if(getType(collection) == 'object') {
    for (let key in collection) {
      if (predicate(collection[key], key, collection)) {
        res.push(collection[key])
      }
    }
  }else collection.forEach((item,idx,arr)=>{
    if(predicate(item,idx,arr)) res.push(item)
  })
  return res
}

var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];


//map,reduce,filter 需要return
//forEach 不需要

function join(arr, separator=',') {
  let res = ''
  for(let item of arr) {
    res += item + separator
  }
  return res.slice(0,-1)
}

function nth(arr , n = 0) {
  return arr[n >= 0 ? n : arr.length + n]
}

function iterator(it) {
  let type = getType(it)
  if (type == 'function') {
    return it
  }
  if (type == 'string') {
    if (!it.includes('.')) {
      return obj => obj[it]
    } else {
      let itArr = it.split('.')
      console.log(itArr)
      return (obj) => {
        for (let item of itArr) {
          obj = obj[item]
        }
        return obj
      }
    }
  }
  if (type == 'array') {
    return obj => obj[it[0]] === it[1]
  }
  if (type == 'object') {
    return obj => {
      for (let key in it) {
        if (obj[key] != it[key]) {
          return false
        }
      }
      return true
    }
  }
}


function join(arr, separator=',') {
  let res = ''
  for(let item of arr) {
    res += '' + item + separator
  }
  return res.slice(0,-1)
}

var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
var other2 = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 },{ 'x': 2, 'y': 1 }];


function pull(array, ...args) {
  // 1.The Abstract Equality Comparison Algorithm ( ==）
  // 2.The Strict Equality Comparison Algorithm ( === ) 
  //    (1) NaN===NaN          // false      (2) 0 === -0         // true
  // 3.SameValue (Object.is()) 
  //    (1)Object.is(NaN, NaN) // true       (2) Object.is(0, -0) // false
  // *4.SameValueZero (has includes) const a = [0, NaN]
  //    (1) a.includes(NaN)    // true       (2) a.includes(-0)   // true 
  return array.filter((item) => {
    let flag = true
    for (let i = 1; i < arguments.length; i++) {
      if(SameValueZero(arguments[i], item)) {
        flag = false
      }
    }
    return flag
  })
}

function SameValueZero(a, b) {
  if (a !== a && b !== b) return true
  return a === b
}

function pullAll(arr, value) {
  return arr.filter(item => !value.includes(item))
}

function pullAllBy(arr, value, it) {
  let f = iterator(it)
  return arr.filter(i => !value.some(v => SameValueZero(f(i),f(v)) ))
}

function pullAllWith(arr, value, it) {
  let f = iterator(it)
  return arr.filter(i => !value.some(v => f(i,v) ))
} 


function sortedIndex(arr, value) {
  // arr是已排序的数组
  if (arr.length == 0) return 0
  if (arr[arr.length-1] < value) return arr.length
  // 在[left, right]中找到大于等于value的第一个元素的位置
  let l = 0, r = arr.length - 1
  while(l < r) {
    let mid = (l + r) >> 1
    if (arr[mid] < value) l = mid + 1
    else r = mid
  }
  return l
}

var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
 
t = sortedIndex([30, 50], 40)
console.log(t)

function quickSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return
  let pivotIdx = Math.floor(Math.random()*(end - start + 1)) + start
  let pivot = arr[pivotIdx]
  let l = start, r = end
  while(l <= r) {
    while(l <= r && arr[l] < pivot) l++
    while(l <= r && arr[r] > pivot) r--
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


t = [1,23,6,7,9,10,6,7,2,5,7,88]
console.log(quickSort(t))

var str = 'hello world'
str.a = 8
console.log(str.a)      //undefined
str.length = 5
console.log(str) //hello world
var num = 8
num.value = 9
console.log(num)  //8
var arr = [1,2,3,4,5]
arr.length = 3
console.log(arr) //[ 1, 2, 3 ]



function reduce(collection, it, init) {
  let keyArr = keys(collection), start = 0
  if (arguments.length == 2) {
    start = 1
    init = collection[keyArr[0]]
  }
  for (let i = start; i < keyArr.length; i++) {
    init = it(init, collection[keyArr[i]], keyArr[i],collection)
  }
  return init
} 

t = reduce([1, 2], function(sum, n) {
  return sum + n;
})
console.log(t)
arr = [2,2,3,4]
t = arr.reduce((total,p,i) => {
	console.log(total,p,i)
	return (total + i)} ); console.log(t); // 输出多少 
console.log('11111111')
const res1 = [1,2,3,4].reduce((total,p,i) => {
  console.log(total,i) 
  return(total + i)}, 0); console.log(res1); // 输出多少

  function deepCopy(obj, copyobj) {
    copyobj = copyobj || {}
    if (typeof obj !== 'object') {
      copyobj = obj
      return copyobj
    }else {
      for (let key in obj ) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] && typeof obj[key] === 'object') {
            if(obj[key] instanceof Array) {
              copyobj[key] = []
            }else {
              copyobj[key] = {}
            }
            deepCopy(obj[key], copyobj[key])
          } else{
            copyobj[key] = obj[key]
          }
        }
      }
    }
    return copyobj
  }

let Obj={a:"hello",b:1,c:true,d:[1,2],e:{x:1,y:2}}

console.log(deepCopy(1,a))

const lottery = () => {

  const randomNum = Math.round(Math.random() * 100)
  console.log(randomNum);

  if (randomNum >= 0 && randomNum < 10) {
    return console.log('First Prize')
  } else if (randomNum >= 10 && randomNum < 25) {
    return console.log('Second Prize')
  } else if (randomNum >= 25 && randomNum < 50) {
    return console.log('Third Prize')
  } else {
    return console.log('Forth Prize')
  }

}

function get(object, path, defaultVal = undefined) {
  path = toPath(path)
  // return path.reduce((obj, curPath) => {
  //   return obj[curPath]
  // }, object)

  for (var i = 0; i < path.length; i++) {
    if (object == undefined) {
      return defaultVal
    } else {
      object = object[path[i]]
    }
  }
  return object
}

function has(object, path) {
  path = toPath(path)

  for (var i = 0; i < path.length; i++) {
    if (object == undefined) {
      return false
    } else {
      object = object[path[i]]
    }
  }
  return true
}
var object = { 'a': { 'b': 2 } };
console.log(has(object, 'a.b'));


function toPath(val) {
  if (Array.isArray(val)) {
    return val
  } else {
    return val.split('][')
      .reduce((ary,it) => ary.concat(it.split('].')), [])
      .reduce((ary,it) => ary.concat(it.split('[')), [])
      .reduce((ary,it) => ary.concat(it.split('.')), [])
  }
}
function iteratee(predicate) {
  if (typeof predicate == 'function') {
    return predicate
  }
  if (typeof predicate == 'string') {
    return property(predicate)
  }
  if (Array.isArray(predicate)) {
    return matchesProperty(...predicate)
  }
  if (typeof predicate == 'object') {
    return matches(predicate)
  }
}
function matches(src) {
  // return bind(isMatch, null, window, src)
  return function(obj) {
    return isMatch(obj, src)
  }
}

function matchesProperty(path, val) {
  return function(obj) {
    return isEqual(get(obj, path), val)
  }
}

function isMatch(object, source) {
  if (object == source) {
    return true
  }
  if (typeof object !== 'object' || typeof source !== 'object') {
    return false
  }
  for (var key in source) {
    if (source[key] && typeof source[key] !== 'object') {
      if (object[key] !== source[key]) {
        return false
      }
    } else {
      if (!isMatch(object[key], source[key])) {
        return false
      }
    }
  }
  return true
}

// 传入什么属性名，它返回的函数就用来获取对象的什么属性名
function property(prop) {// a.b
  return function(obj) {
    return get(obj, prop)
  }
}

function get(object, path, defaultVal = undefined) {
  path = toPath(path)
  // return path.reduce((obj, curPath) => {
  //   return obj[curPath]
  // }, object)

  for (var i = 0; i < path.length; i++) {
    if (object == undefined) {
      return defaultVal
    } else {
      object = object[path[i]]
    }
  }
  return object
}

function has(object, path) {
  path = toPath(path)

  for (var i = 0; i < path.length; i++) {
    if (object == undefined) {
      return false
    } else {
      object = object[path[i]]
    }
  }
  return true
}

function toPath(val) {
  if (Array.isArray(val)) {
    return val
  } else {
    return val.split('][')
      .reduce((ary,it) => ary.concat(it.split('].')), [])
      .reduce((ary,it) => ary.concat(it.split('[')), [])
      .reduce((ary,it) => ary.concat(it.split('.')), [])
  }
}





function getType(obj) {
  return Object.prototype.toString
    .call(obj)
    .split(" ")[1]
    .slice(0, -1)
    .toLowerCase();
}

function identity(val) {
  return val
}


function sortedIndex(arr, value) {
  // arr是已排序的数组
  if (arr.length == 0) return 0
  if (arr[arr.length-1] < value) return arr.length
  // 在[left, right]中找到大于等于value的第一个元素的位置
  let l = 0, r = arr.length - 1
  while(l < r) {
    let mid = (l + r) >> 1
    if (arr[mid] < value) l = mid + 1
    else r = mid
  }
  return l
}

var objects = [{ 'x': 4 }, { 'x': 5 }];

function sortedIndexBy(arr, value, f) {
  let iter = iteratee(f)
  return sortedIndex(arr.map(i => iter(i)), iter(value))
}

function sortedIndexOf(arr, value) {
    // arr是已排序的数组
    if (arr.length == 0) return 0
    if (arr[arr.length-1] < value) return arr.length
    // 在[left, right]中找到大于等于value的第一个元素的位置
    let l = 0, r = arr.length - 1
    while(l < r) {
      let mid = (l + r) >> 1
      if (arr[mid] < value) l = mid + 1
      else r = mid
    }
    return arr[l] == value ? l : -1
}

function sortedLastIndex(arr, value) {
    // arr是已排序的数组
    if (arr.length == 0) return 0
    if (arr[0] > value) return 0
    // 在[left, right]中找到小于等于value的最后元素的位置
    let l = 0, r = arr.length - 1
    while(l < r) {
      let mid = (l + r + 1) >> 1 //需要加1
      if (arr[mid] > value) r = mid - 1
      else l = mid
    }
    return l + 1
}

function sortedLastIndexBy(arr, value, f) {
  let iter = iteratee(f)
  return sortedLastIndex(arr.map(i => iter(i)), iter(value))
}

function sortedLastIndexOf(arr, value) {
  // arr是已排序的数组
  if (arr.length == 0) return 0
  if (arr[0] > value) return 0
  // 在[left, right]中找到小于等于value的最后元素的位置
  let l = 0, r = arr.length - 1
  while(l < r) {
    let mid = (l + r + 1) >> 1 //需要加1
    if (arr[mid] > value) r = mid - 1
    else l = mid
  }
  return arr[l] == value ? l : -1
}

function sortedUniq(ary) {
  var result = []
  for (var i = 0; i < ary.length; i++) {
    if (!result.includes(ary[i])) {
      result.push(ary[i])
    }
  }
  return result
}

function sortedUniqBy(ary, predicate) {
  let set = new Set()
  let res = []
  for (let i = 0; i < ary.length; i++) {
    let computed = predicate(ary[i], i, ary)
    if (!set.has(computed)) {
      res.push(ary[i])
      set.add(computed)
    }
  }
  return res
}

function take(ary, n = 1) {
  if(ary && ary.length <= 1) return []
  // return ary.splice(0, n)
  let res = []
  if (n >= ary.length) n = ary.length
  for (let i = 0; i < n; i++) {
    res.push(ary[i])
  }
  return res
}

function takeRight(ary, n = 1) {
  if(ary && ary.length <= 1) return []
  // return ary.splice(0, n)
  let res = []
  if (n >= ary.length) n = ary.length
  let start = ary.length - n
  for (let i = start; i < ary.length; i++) {
    res.push(ary[i])
  }
  return res
}

function takeWhile(ary, predicate = identity) {
  let res = []
  predicate = iteratee(predicate)
  for (let i = 0; i < ary.length; i++) {
    if(predicate(ary[i],i,ary)) {
      res.push(ary[i])
    }else {
      break
    }
  }
  return res
}

function union(...args) {
  let res = []
  let set = new Set()
  for (let ary of args) {
    for (let item of ary) {
      if (!set.has(item)) {
        res.push(item)
        set.add(item)
      }
    }
  }
  return res
}
function unionBy(...args) { 
  let predicate = args[args.length - 1]
  predicate = iteratee(predicate)
  let len = args.length -1
  let arys = args.slice(0, len)
  let res = []
  let set = new Set()
  for (let ary of arys) {
    for (let item of ary) {
      let computed = predicate(item)
      if (!set.has(computed)) {
        res.push(item)
        set.add(computed)
      }
    }
  }
  return res
}

function unionWith(...args) {
  let comparator = args[args.length - 1]
  let len = args.length -1
  let arys = [].concat(...args.slice(0, len))
  var result = []
  for (var i = 0; i < arys.length; i++) {
    if ( !result.some(item => comparator(item, arys[i])) ) {
      result.push(arys[i])
    }
  }
  return result
}

function unzip(arr) {
  let num = arr.length
  let size = arr[0].length
  let res = Array.from(new Array(size), () => new Array(num))
  for(let i = 0; i < size; i++) {
    for (let j = 0; j < num; j++) {
      res[i][j] = arr[j][i]
    }
  }
  return res
}

function unzipWith(arr, iter) {
  let num = arr.length
  let size = arr[0].length
  let res = []
  for(let i = 0; i < size; i++) {
    let tmp = []
    for (let j = 0; j < num; j++) {
      tmp.push(arr[j][i])
    }
    tmp = iter(...tmp)
    res.push(tmp)
  }
  return res
}
function add(a,b) {
  return a+b
}
function filter(collection, predicate) {
  predicate = iteratee(predicate)

  var result = []
  for (var i in collection) {
    if (predicate(collection[i], i, collection) === true) {
      result.push(collection[i])
    }
  }
  return result
}


function without(ary, ...vals) {
  return ary.filter( it => !vals.includes(it))
}

function xor(...arys) {
  let ary = [].concat(...arys)
  let map = ary.reduce( (prev,i)=> {
    if (prev.has(i)) {
      prev.set(i, prev.get(i)+1)
    }else {
      prev.set(i, 1)
    }
    return prev}, new Map())
  let res = []
  for (let key of map.keys()) {
    if(map.get(key) == 1) {
      res.push(key)
    }
  }
  return res
}

function findIndex(arr, f, idx = 0) {
  let it = iterator(f)
  for (let i = idx; i < arr.length; i++) {
    if(it(arr[i])) return i
  }
  return -1
}

function xorBy(...args) {
  let predicate = iteratee(args[args.length - 1])
  let ary = [].concat(...args.slice(0, args.length - 1))
  let res = [], map = new Map()
  for (let item of ary) {
    let i = predicate(item)
    if (map.has(i)) {
      map.set(i, map.get(i)+1)
      let idx = findIndex(res, it => predicate(it) == i)
      res.splice(idx,1)
    }else {
      map.set(i, 1)
      res.push(item)
    }
  }
  return res
}

function xorWith(...args) {
  let compare = args[args.length - 1]
  let ary = [].concat(...args.slice(0, args.length - 1))
  let res = []
  for (let item of ary) {
    if (res.some(it => compare(it, item))) {
      let idx = findIndex(res, it => compare(it, item))
      res.splice(idx,1)
    }else {
      res.push(item)
    }
  }
  return res
}

function zip(...arr) {
  let num = arr.length
  let size = arr[0].length
  let res = []
  for(let i = 0; i < size; i++) {
    let tmp = []
    for (let j = 0; j < num; j++) {
      tmp.push(arr[j][i]) 
    }
    res.push(tmp)
  }
  return res
}

function zipObject(prop, value) {
  let res = {}
  for (let i = 0; i < prop.length; i++) {
    let key = prop[i]
    for (let j = 0; j < value.length; j++) {
      if(j == i) {
        res[key] = value[j]
      }
    }
  }
  return res
}

function zipObjectDeep(prop, value) {
  let res = {}
  for (let i = 0; i < prop.length; i++) {
    let path = toPath(prop[i])
    for (let j = 0; j < value.length; j++) {
      if(j == i) {
        let cur = res
        for(var k = 0; k < path.length - 1; k++) {
          let prop = path[k]
          let type = path[k+1]
          if (!cur.hasOwnProperty(prop)) {
            let t = (type >= '0' && type <= '9') ? [] : {}
            cur[prop] = t
          }
          cur = cur[prop]
        }
        cur[path[k]] = value[j]
      }
    }
  }
  return res
}


function zipWith(...args) {
  let arr = args.slice(0, args.length - 1)
  let iter = args[args.length - 1]
  let num = arr.length
  let size = arr[0].length
  let res = []
  for(let i = 0; i < size; i++) {
    let tmp = []
    for (let j = 0; j < num; j++) {
      tmp.push(arr[j][i]) 
    }
    let ans = iter(...tmp)
    res.push(ans)
  }
  return res
}

function find(collection, predicate = identity, fromIndex = 0) {
  predicate = iteratee(predicate)
  for (let i = fromIndex; i < collection.length; i++) {
    if (predicate(collection[i], i, collection)) return collection[i]
  }
}

function findLast(collection, predicate = identity, fromIndex = collection.length-1) {
  predicate = iteratee(predicate)
  for (let i = fromIndex; i >= 0; i--) {
    if (predicate(collection[i], i, collection)) return collection[i]
  }
}

function flatMap(collection, iteratee = identity) {
  let res = []
  for (let i = 0; i < collection.length; i++) {
    let item = iteratee(collection[i], i, collection)
    res.push(...item)
  }
  return res
}


function flatMapDeep(collection, iteratee = identity) {
  let res = []
  for (let i = 0; i < collection.length; i++) {
    let item = iteratee(collection[i], i, collection)
    res.push(...flattenDeep(item))
  }
  return res
}


function flatMapDepth(collection, iteratee = identity, depth=1) {
  let res = []
  for (let i = 0; i < collection.length; i++) {
    let item = iteratee(collection[i], i, collection)
    res.push(flattenDepth(item, depth))
  }
  return res
}







function duplicate(n) {
  return [[[n, n]]];
}

console.log(flatMapDepth([1, 2], duplicate, 2))

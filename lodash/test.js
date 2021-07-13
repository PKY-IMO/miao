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
console.log(groupBy(a, Math.floor))

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

function iterator(it) {
  let type = typeof it
  if (type == 'function') {
    return it
  }else if (type == 'string') {
    return obj => obj[it]
  }else if (Array.isArray(it)) {
    return obj => obj[it[0]] === it[1]
  }else {
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

console.log(countBy(['one', 'two', 'three'], 'length'))

function reduce(collection, it, accumulator) {
  let t = Array.isArray(collection) ? 0 : collection[keys(collection)[0]]
  let init = accumulator || t
  for (let key in collection) {
    init = it(init, collection[key], key)
  }
  return init
} 

console.log(reduce([1,2,3,4,5,6,7],function(a,b){return a+b}))

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
console.log(sum([4, 2, 8, 6]))

function sumBy(arr, f) {
  var it = iterator(f)
  return sum(arr.map((item)=>it(item)))
}
// var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
// console.log(sumBy(objects, 'n'))


function flatten(arr) {
  return arr.reduce((prev,item) => {
    if (Array.isArray(item)) {
      for (let it of item) {
        prev.push(it)
      }
    }else prev.push(item)
    return prev
  }, [])
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
console.log( isNaN(NaN))

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
  console.log(val)
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
  console.log(it)
  for (let i = 0; i < arr.length; i++) {
    if (!it(arr[i], i, arr)) {
      res.push(arr[i])
    }else continue
  }
  return res
}

var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
test = dropWhile(users, 'active')
console.log(test)
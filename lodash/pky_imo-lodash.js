var pky_imo = function () {

  function chunk(arr, size = 1) {
    if (arr.length <= size) return arr
    let tmp = []
    let ans = []
    for (let i = 0; i < arr.length; i++) {
      if (i % size == (size - 1)){
        tmp.push(arr[i])
        ans.push(tmp)
        tmp = []
      }else {
        tmp.push(arr[i])
      }
    }
    if (tmp.length != 0) ans.push(tmp)
    return ans
  }

  function compact(arr) {
    return arr.filter(item => Boolean(item))
  }

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

  function difference(arr, ...args) {
    let val = []
    for(let i = 1; i < arguments.length; i++) {
      val = val.concat(arguments[i])
    }
    return arr.filter(item => !val.includes(item))
  }

  function differenceBy(arr, value, f) {
    if (arguments.length == 2) return difference(arr,value)
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
      var it = (i) => i
    }
    val = val.map(item=>it(item))
    return arr.filter(item => !val.includes(it(item)))
  }

  function differenceWith(arr, value, f) {
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

  function dropRightWhile(arr, f) {
    let res = []
    let it = iterator(f)
    console.log(it)
    for (let i = arr.length -1; i >= 0; i--) {
      if (!it(arr[i], i, arr)) {
        res.push(arr[i])
      }else continue
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

  function findLastIndex(arr, f, idx = arr.length - 1) {
    let it = iterator(f)
    for (let i = idx; i >= 0; i--) {
      if(it(arr[i])) return i
    }
    return -1
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
    arr.forEach(( item) => {
      let key = it(item)
      if (!(key in map)) {
        map[key] = item
        res.push(item)
      }
    })
    return res
  }

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

  function flattenDeep(arr) {
    // return arr.reduce((prev, item) => prev.concat(Array.isArray(item) ? flattenDeep(item) : item), [])
    // return arr.flat(Infinity)
    let flatten = arr => [].concat(...arr)
    return flatten(arr.map(item => Array.isArray(item) ? flattenDeep(item) : item))
  }

  function flattenDepth(arr, depth = 1) {
    if (depth == 0) return arr
    let flatten = arr => [].concat(...arr) //去一层的函数
    return flattenDepth(flatten(arr), depth - 1)
  }

  function fromPairs(arr) {
    return arr.reduce((res,item) => (res[item[0]] = item[1],res),{})
  }

  function head(arr) {
    return arr[0]
  }

  function indexOf(arr, val, idx = 0) {
    for (let i = idx; i < arr.length; i++) {
      if(arr[i] == val) return i
    }
    return -1
  }

  function lastIndexOf(arr, val, idx = arr.length - 1) {
    for (let i = idx; i >= 0; i--) {
      if(arr[i] == val) return i
    }
    return -1
  }

  function initial(arr) {
    let res = []
    for (let i = 0; i < arr.length - 1; i++) {
      res.push(arr[i])
    }
    return res
  }

  function intersection(...arr) {
    let pre = arguments[0]
    return pre.reduce((prev,item)=>{
      let flag = true
      for(let j = 1; j < arguments.length - 1; j++) {
        if(!arguments[j].includes(item)) {
          flag = false
          break
        }
      }
      if(flag) prev.push(item)
      return prev
    },[])
  }

  function intersectionBy(...args) {

  }

  function join(arr, separator=',') {
    let res = ''
    for(let item of arr) {
      res += item + separator
    }
    return res.slice(0,-1)
  }

  function last(arr) {
    return arr[arr.length -1]
  }

  function nth(arr , n = 0) {
    return arr[n >= 0 ? n : arr.length + n]
  }


  function groupBy(collection, iteratee) {
    let map = {}
    let key
    for (let item of collection) {
      if (typeof iteratee == 'function') {
        key = iteratee(item)
      } else if (typeof iteratee == 'string') {
        key = item[iteratee]
      }
      if(!map[key]) {
        map[key] = [item]
      }else {
        map[key].push(item)
      }
    }
    return map
  }

  function keyBy(collection, f) {
    let it = iterator(f)
    let res = {}
    for(let i in collection) {
      let key = it(collection[i])
      res[key] = collection[i]
    }
    return res
  }

  function forEach(collection, iteratee) {
    for (key in collection) {
      iteratee(collection[key], key, collection)
    }
    return collection
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

  function reduce(collection, it, accumulator) {
    let t = Array.isArray(collection) ? 0 : collection[keys(collection)[0]]
    let init = accumulator || t
    for (let key in collection) {
      init = it(init, collection[key], key)
    }
    return init
  } 

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

  function keys(obj) {
    let res = []
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res.push(key)
      }
    }
    return res
  }

  function values(obj) {
    let res = []
    let keyArr = keys(obj)
    for (let key in obj) {
      if (keyArr.includes(key)) res.push(obj[key])
    }
    return res
  }

  function every(collection, predicate) {
    var it = iterator(predicate)
    for (let key in collection) {
      if (!it(collection[key], key, collection)) return false
    }
    return true
  }

  function some(array, predicate) {
    var it = iterator(predicate)
    for (let key in array) {
      if (it(array[key], key, array)) return true
    }
    return false
  }

  function fill(arr, value, start = 0, end = arr.length) {
    for (let i = start; i < end; i++) {
      arr[i] = value
    }
    return arr
  }

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
      for (let key in a) {
        if (!(key in b) || !isEqual(a[key],b[key])) return false
      }
      return true
    }else return a == b
  }


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

  function shuffle(arr) {
    return arr.sort(()=>Math.random()-0.5)
  }

  function toArray(arr) {
    let type = getType(arr)
    if (type == 'string') {
      return arr.split('')
    } 
    if (type == 'object') {
      let res = []
      for( let key in arr) {
        res.push(arr[key])
      }
      return res
    }
    if (type == 'array') return arr
    return []
  }

  function sum(arr) {
    return reduce(arr, (a,b)=> a+b)
  }

  function sumBy(arr, f) {
    var it = iterator(f)
    return sum(arr.map((item)=>it(item)))
  }

  /**
   * utils
   */
  function iterator(it) {
    let type = getType(it)
    if (type == 'function') {
      return it
    }
    if (type == 'string') {
      return obj => obj[it]
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

  function getType(data) {
    return Object.prototype.toString
      .call(data)
      .split(" ")[1]
      .slice(0, -1)
      .toLowerCase();
  }

  function isNaN(n) {
    //isNaN方法首先转换类型，而Number.isNaN方法不用；
    //isNaN不能用来判断是否严格等于NaN，Number.isNaN方法可用
    if (typeof n == 'object') {
      return n.valueOf() !== n.valueOf()
    }
    return Number.isNaN(n)
  }

  function isNull(n) {
    return n === null
  }

  function isNil(n) {
    return n === null || n === undefined
  }

  function isUndefined(n) {
    return n === undefined
  }



  return {
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    differenceBy: differenceBy,
    differenceWith: differenceWith,

    drop: drop,
    dropRight: dropRight,
    dropWhile: dropWhile,
    dropRightWhile: dropRightWhile,

    
    uniq: uniq,
    uniqBy: uniqBy,

    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,

    fromPairs: fromPairs,
    head: head,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    initial: initial,
    intersection: intersection,

    join: join,
    last: last,
    nth: nth,


    groupBy: groupBy,
    keyBy: keyBy,
    forEach: forEach,
    map: map,
    reduce: reduce,
    reduceRight: reduceRight,
    zip: zip,
    unzip: unzip,
    keys: keys,
    values: values,
    every: every,
    some: some,
    fill: fill,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    reverse: reverse,
    isEqual: isEqual,
    countBy: countBy,

    shuffle: shuffle,
    isNaN: isNaN,
    isNull: isNull,
    isNil: isNil,
    isUndefined: isUndefined,
    toArray: toArray,
    sum: sum,
    sumBy: sumBy

  }

}()
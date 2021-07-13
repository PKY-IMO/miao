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

  function keyBy(collection, iteratee) {
    
  }

  function forEach(collection, iteratee) {
    for (key in collection) {
      iteratee(collection[key], key, collection)
    }
    return collection
  }

  function map(collection, it) {
    let type = typeof iteratee
    let res = []
    if (type == 'function') {
      for (let key in collection) {
        res.push(iteratee(collection[key], key, collection))
      }
    }else if (type == 'string') {
      for (let item of collection) {
        res.push(item[iteratee])
      }
    }
    return res
  }
  


  function filter(collection, it) {
    let res = []
    var predicate = iterator(it)
    for (let key in collection) {
      if (predicate(collection[key], key, collection)) {
        res.push(collection[key])
      }
    }
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
      for (let key of keys1) {
        if (!isEqual(a[key],b[key])) return false
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
      for( let item of arr) {
        res.push(item)
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
    }else if (type == 'string') {
      return obj => obj[it]
    }else if (type == 'array') {
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
    uniq: uniq,
    uniqBy: uniqBy,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,

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
    sumBy: sum

  }

}()
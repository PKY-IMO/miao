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
    return arr.map((item) => iteratee(item)).filter((item, idx, arr) => arr.indexOf(item) == idx)
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
  }

  function map(collection, iteratee) {
    let type = typeof iteratee
    if (type == 'function') {
      for (let key in collection) {
        return [].concat(iteratee(collection[key], key, collection))
      }
    }else if (type == 'string') {
      for (let item of collection) {
        return [].concat(item[iteratee])
      }
    }
  }
  


  function filter(collection, predicate) {
    let res = [], 
    predicate = iterator(predicate)
    for (let key in collection) {
      if (predicate(collection[key], key, collection)) {
        res.push(collection[key])
      }
    }
  }

  function reduce(collection, it, accumulator) {
    let t = Array.isArray(collection) ? [] : {}
    let init = accumulator || t
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

  function unzip(...arr) {
    return zip(...arr)
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


  /**
   * utils
   */
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
    filter: filter,
    reduce: reduce,
    zip: zip,
    unzip: unzip,
    keys: keys,
    values: values
  }

}()
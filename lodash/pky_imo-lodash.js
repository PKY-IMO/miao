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
    for (let i = 0; i < arr.length; i++) {
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

  function intersectionBy(...arr) {
    let pre = arguments[0]
    let it = iterator(arguments[arguments.length -1])
    return pre.reduce((prev,item)=>{
      let flag = true
      for(let j = 1; j < arguments.length - 1; j++) {
        let arr = arguments[j].map(item => it(item))
        if(!arr.includes(it(item))) {
          flag = false
          break
        }
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
        if(tmp) sum++
      }
      return sum == len ? [...prev, item] : prev
    },[])
  }

  function join(arr, separator=',') {
    let res = ''
    for(let item of arr) {
      res += '' + item + separator
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
          break
        }
      }
      return flag
    })
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

  function sortedIndexBy(arr, value, f) {
    let iter = iteratee(f)
    return sortedIndex(arr.map(i => iter(i)), iter(value))
  }

  function sortedIndexOf(arr, value) {
    // arr是已排序的数组
    if (arr.length == 0) return 0
    if (arr[arr.length-1] < value) return arr.length// 不存在大于等于value的值
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
    if (arr[0] > value) return 0 //不存在小于等于value的值
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

  function tail(ary) {
    if(ary && ary.length <= 1) return []
    return ary.splice(1)
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

  function takeRightWhile(ary, predicate = identity) {
    let res = []
    predicate = iteratee(predicate)
    for (let i = ary.length - 1; i >= 0; i--) {
      if(predicate(ary[i],i,ary)) {
        res.unshift(ary[i])
      }else {
        break
      }
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

  function uniqWith(ary, predicate) {
    var res = []
    for (var i = 0; i < ary.length; i++) {
      if ( !res.some(it => predicate(it, ary[i]))) {
        res.push(ary[i])
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

  function unzipWith(arr, iter) {
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

  function isMatch(object, source) {
    if (object == source) {
      return true
    }
    if (typeof source !== 'object' || typeof object !== 'object') {
      return false
    }
    for (var key in source) {
      if (source[key] && typeof source[key] !== 'object') {
        if (object[key] !== source[key]) {
          return false
        } else {
          if (!isMatch(bject[key], source[key])) {
            return false
          }
        }
      }
    }
    return true
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
    for (let i = arr.length - 1; i > 0; i--) {
      var randIdx = Math.floor(Math.random() * (i + 1))
      [arr[i], arr[randIdx]] = [arr[randIdx], arr[i]]
    }
    return arr[i]
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


  /**
   * utils
   */
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

  function SameValueZero(a, b) {
    if (a !== a && b !== b) return true
    return a === b
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

    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,

    fromPairs: fromPairs,
    head: head,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    initial: initial,
    intersection: intersection,
    intersectionBy: intersectionBy,
    intersectionWith: intersectionWith,

    join: join,
    last: last,
    nth: nth,
    pull: pull,
    pullAll: pullAll,
    pullAllBy: pullAllBy,
    pullAllWith: pullAllWith,

    sortedIndex: sortedIndex,
    sortedIndexBy: sortedIndexBy,
    sortedIndexOf: sortedIndexOf,
    sortedLastIndex: sortedLastIndex,
    sortedLastIndexBy: sortedLastIndexBy,
    sortedLastIndexOf: sortedLastIndexOf,
    sortedUniq: sortedUniq,
    sortedUniqBy: sortedUniqBy,
    tail: tail,
    take: take,
    takeRight: takeRight,
    takeRightWhile: takeRightWhile,
    takeWhile: takeWhile,
    union: union,
    unionBy: unionBy,
    unionWith: unionWith,

    uniq: uniq,
    uniqBy: uniqBy,
    uniqWith: uniqWith,

    unzip: unzip,
    unzipWith: unzipWith,
    without: without,
    xor: xor,
    xorBy: xorBy,
    xorWith: xorWith,
    zip: zip,
    zipObject: zipObject,
    zipObjectDeep: zipObjectDeep,
    zipWith: zipWith,

    groupBy: groupBy,
    keyBy: keyBy,
    forEach: forEach,
    map: map,
    reduce: reduce,
    reduceRight: reduceRight,
    zip: zip,

    keys: keys,
    values: values,
    every: every,
    some: some,
    fill: fill,
    filter: filter,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    reverse: reverse,
    isEqual: isEqual,
    countBy: countBy,

    shuffle: shuffle,
    isMatch: isMatch,
    isNaN: isNaN,
    isNull: isNull,
    isNil: isNil,
    isUndefined: isUndefined,
    toArray: toArray,
    sum: sum,
    sumBy: sumBy,

    get: get,
    has: has,

  }

}()
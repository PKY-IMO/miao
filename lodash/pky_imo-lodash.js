var pky_imo = function () {
  let _ = Symbol.for('placeholder')

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
    let it = iterator(f)
    for (var i = 0; i < arr.length; i++) {
      if (!it(arr[i], i, arr)) {
        break
      }
    }
    return arr.slice(i)
  }

  function dropRightWhile(arr, f) {
    let it = iterator(f)
    for (var i = arr.length - 1; i >= 0; i--) {
      if (!it(arr[i], i, arr)) {
        break
      }
    }
    return arr.slice(0, i+1)
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

  function keyBy(collection, f) {
    let it = iterator(f)
    let res = {}
    for(let i in collection) {
      let key = it(collection[i])
      res[key] = collection[i]
    }
    return res
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
    //    (1)Object.is(NaN, NaN) // true       (2) Object.is(0, -0) // false//Object.is(0,+0)true
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
    predicate = iterator(predicate)
    for (var i = ary.length - 1; i >= 0; i--) {
      if(!predicate(ary[i],i,ary)) 
        break
    }
    return ary.slice(i+1)
  }

  function takeWhile(ary, predicate = identity) {
    predicate = iterator(predicate)
    for (var i = 0; i < ary.length; i++) {
      if(!predicate(ary[i],i,ary))
        break
    }
    return ary.slice(0, i-1)
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
    let predicate = iterator(args[args.length - 1])
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

  function forEach(collection, iteratee) {
    for (key in collection) {
      iteratee(collection[key], key, collection)
    }
    return collection
  }

  function forEachRight(collection, iteratee) {
    for (let i = collection.length - 1; i >= 0; i--) {
      iteratee(collection[i], i, collection)
    }
    return collection
  }

  function groupBy(collection, iter) {
    let map = {}
    iter = iterator(iter)
    for (let item of collection) {
      let key = iter(item)
      if(!(key in map)) {
        map[key] = [item]
      }else {
        map[key].push(item)
      }
    }
    return map
  }

  function includes(collection, value, fromIndex = 0) {
    let type = getType(collection)
    if (type == 'array') {
      for(let i = fromIndex; i < collection.length; i++) {
        if(SameValueZero(collection[i], value)) {
          return true
        }
      }
      return false
    }
    if (type == 'object') {
      for (let k in collection) {
        if(SameValueZero(collection[k], value)) {
          return true
        }
      }
      return fale
    }
    if (type == 'string') {
      let reg = new RegExp(value)
      return reg.test(collection)
    }
  }

  function invokeMap(collection, path, ...args) {
    let res = []
    for(let i = 0; i < collection.length; i++) {
      if(typeof path == 'function') {
        res.push(path.call(collection[i],...args))
      }else {
        path = toPath(path)
        path = get(collection[i], path)
        res.push(path.call(collection[i],...args))
      }
    }
    return res
  }

  function orderBy(arr, iter = [identity], orders) {
    function comparetor3(a, b, iter, orders) {
      for (let i = 0; i < iter.length; i++) {
        let f = (obj) => obj[iter[i]]
        let flag = orders[i] == 'asc' ? 1 : -1
        if ( f(a) > f(b)) {
          return 1*flag
        }else if ( f(a) < f(b)){
          return -1*flag
        }
      }
      return 0
    }

    for (var i = 1; i < arr.length; i++) {
      var t = arr[i]
      for (var j = i - 1; j >= 0; j--) {
        // if (arr[j] > t)
        if (comparetor3(arr[j], t, iter, orders) > 0) {
          arr[j + 1] = arr[j]
        } else {
          break
        }
      }
      arr[j + 1] = t
    }
    return arr
  }
  

  
  function sortBy(arr, iteratees = [identity]) {
    for (var i = 1; i < arr.length; i++) {
      var t = arr[i]
      for (var j = i - 1; j >= 0; j--) {
        // if (arr[j] > t)
        if (comparetor(arr[j], t, iteratees) > 0) {
          arr[j + 1] = arr[j]
        } else {
          break
        }
      }
      arr[j + 1] = t
    }
    return arr
  }

  function partition(collection, predicate = identity) {
    predicate = iteratee(predicate)
    let res = [[],[]]
    for (let item of collection) {
      if(predicate(item)) res[0].push(item)
      else res[1].push(item)
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

  function reject(collection, predicate) {
    predicate = iteratee(predicate)
  
    var result = []
    for (var i in collection) {
      if (!predicate(collection[i], i, collection)) {
        result.push(collection[i])
      }
    }
    return result
  }

  function sample(collection) {
    let len = size(collection)
    let random = Math.floor(Math.random()*len)
    for (var item of collection) {
      if(random == 0) return item
      random--
    }
  }

  function sampleSize(collection, n = 1) {
    let len = size(collection)
    if (n > len) n = len
    let res = []
    while(n) {
      let t = sample(collection)
      if(!res.includes(t)) {
        res.push(t)
        n--
      }
    }
    return res
  }

  function size(collection) {  
    return  collection.length || Object.keys(collection).length
  }

  function castArray(value){
    if (arguments.length == 0) return []
    if (value instanceof Array) return value
    return [value]
  }

  function conformsTo(object, source) {
    for(let key in source) {
      let predicate = iteratee(source[key]) 
      if(!predicate(object[key])) return false
    }
    return true
  }

  function eq(object, other) {
    return SameValueZero(object, other)
  }

  function gt(value, other) {
    return value > other ? true : false
  }
  
  function gte(value, other) {
    return value >= other ? true : false
  }

  function lt(value, other) {
    return value < other ? true : false
  }
  
  function lte(value, other) {
    return value <= other ? true : false
  }

  function isObject(value) {
    let type = typeof value
    return value !== null && (type === 'object' || type === 'function')
  }
  
  function isObjectLike(value) {
    return value !== null && typeof value === 'object'
  }
  
  function isPlainObject(value) {
    if (!isObjectLike(value)) return false
    return value.__proto__ == Object.prototype || value.__proto__ == null
  }
  
  
  function isArguments(value) {
    return isObjectLike(value) && getType(value) === 'arguments'
  }
  
  function isArray(value) {
    return getType(value) === 'array'
  }
  
  function isArrayBuffer(value) {
    return getType(value) === 'arraybuffer'
  }
  
  function isArrayLike(value) {
    if (typeof value === 'string') return true
    if (typeof value === 'function') return false
    let key = 'length'
    if (!(key in value)) return false
    return value.length >= 0 && value.length <= Number.MAX_SAFE_INTEGER
  }
  
  function isArrayLike(value) {
    return isArrayLikeObject(value) || typeof value === 'string'
  }
  
  function isArrayLikeObject(value) {
    if (typeof value !== 'object') return false
    let key = 'length'
    if (!(key in value)) return false
    return value.length >= 0 && value.length <= Number.MAX_SAFE_INTEGER
  }
  
  function isBoolean(value) {
    return getType(value) === 'boolean'
  }
  
  function isDate(value) {
    return getType(value) === 'date'
  }
  
  function isElement(value) {
    return getType(value) === 'htmlbodyelement' // HTMLBodyElement
  }
  
  function isEmpty(value) {
    // 不是 object、string
    if (!isObjectLike(value) && typeof value !== 'string') return true 
    // map set
    if (getType(value) === 'map' || getType(value) === 'set') return value.size === 0 
    // 类数组对象 string 之类
    if (isArrayLike(value)) return value.length === 0
    // object对象
    return Object.keys(value).length === 0
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
        if(!(key in b)) return false
        // if (a[key] === b[key]) continue
        if (!isEqual(a[key],b[key])) return false
      }
      return true
    }else return a == b
  }
  
  
  function isEqualWith(a, b, customizer) {
    if (a === b || customizer(a,b)) return true
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
        if (!(key in b)) return false
        if (a[key] === b[key]) continue
        if (!customizer(a[key],b[key],key,a,b,this.stack)) return false
      }
      return true
    }else return a === b || customizer(a,b)
  }
  
  function isError(value) {
    return getType(value) === 'error'
  }
  
  function isFinite(value) {
    return Number.isFinite(value)
  }
  
  function isFunction(value) {
    return typeof value === 'function'
  }
  
  function isInteger(value) {
    return Number.isInteger(value)
  }
  
  function isMap(value) {
    return getType(value) === 'map'
  }
  
  function isMatchWith(object, source, customizer) {
    if (object === source) {
      return true
    }
    if (typeof object !== 'object' || typeof source !== 'object') {
      return false
    }
    for (var key in source) {
      if (source[key] && typeof source[key] !== 'object') {//基本数据类型
        if (!customizer(object[key],source[key],key,object,source)) {
          return false
        }
      } else {//引用数据类型
        if (!isMatch(object[key], source[key])) {
          return false
        }
      }
    }
    return true
  }
  
  function isNumber(value) {
    if(!value) return false
    if(value === Infinity || value === -Infinity || isNaN(value)) return true
    return isFinite(value)
  }
  
  
  function isLength(value) {
    if (!value || isNaN(value)) return false
    let target = toLength(value)
    return value === target
  }
  
  function toLength(value) {
    // Let len be ? ToInteger(argument).
    // If len ≤ +0, return +0.
    // If len is +∞, return 232-1.
    // Return min(len, 232-1).
    if (!value || isNaN(value)) return +0
    value = toInteger(value)
    value = value <= +0 ? +0 : value
    return Math.min(value, 2**32-1)
  }
  function toInteger(value) {
    if (!value || isNaN(value)) return 0
    value = toFinite(value)  // Infinity | 0 ==> 0
    let decimal = value % 1
    return decimal ? value - decimal : value
  }
  
  function toNumber(value) {
    if (!value) return 0
    return Number(value)
  }
  
  function toFinite(value) {
    //有限数字
   if (!value || isNaN(value)) return 0
   value = Number(value)
   if (value === Infinity || value === -Infinity) {
     var sign = value > 0 ? 1 : -1
     return sign * Number.MAX_VALUE
   }
   return value
  }

  function toSafeInteger(value) {
    value = toInteger(value)
    return Math.min(value, 2**53-1)
  }

  function assign(...objs) {
    let target = objs[0]
    for (let i = 1; i < objs.length; i++) {
      let source = objs[i]
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key]
        }
      }
    }
    return target
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

  function every(collection, predicate) {
    var it = iterator(predicate)
    for (let key in collection) {
      if (!it(collection[key], key, collection)) return false
    }
    return true
  }

  function some(collection, predicate) {
    predicate = iterator(predicate)
    for (let key in collection) {
      if (predicate(collection[key], key, collection)) return true
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
    for (let i = arr.length - 1; i > 0; i--) {
      var randIdx = Math.floor(Math.random() * (i + 1));//解构赋值上一行得加分号
      [arr[i], arr[randIdx]] = [arr[randIdx], arr[i]]
    }
    return arr
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
    return arr.reduce((a,b)=> a+b)
  }

  function sumBy(arr, f) {
    var it = iterator(f)
    return sum(arr.map((item)=>it(item)))
  }

  function filter(collection, predicate) {
    predicate = iterator(predicate)

    var result = []
    for (var i in collection) {
      if (predicate(collection[i], i, collection)) {
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
      if (!object.hasOwnProperty(path[i])) {
        return false
      } else {
        object = object[path[i]]
      }
    }
    return true
  }

  function hasIn(object, path) {
    path = toPath(path)
    for (var i = 0; i < path.length; i++) {
      if (!(path[i] in object)) {
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
        .reduce((ary,it) =>ary.concat(it.replace(']','')), [])
        .filter(i=>i !== '')
    }
  }



  function comparetor2(a, b, iter, orders) {
    let iterArr = zip(iter, orders)
    for (let it of iterArr) {
      let f = iterator(it[0])
      let flag = it[1] == 'asc' ? 1 : -1
      if ( f(a) > f(b)) {
        return 1 * flag
      }else if ( f(a) < f(b)){
        return -1 * flag
      }else continue
    }
    return 0
  }
  
  function comparetor(a, b, iterator) {
    for (let it of iterator) {
      let f = iteratee(it)
      if ( f(a) > f(b)) {
        return 1
      }else if ( f(a) < f(b)){
        return -1
      }else continue
    }
    return 0
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

  //判断


  function isNaN(n) {
    //isNaN方法首先转换类型，而Number.isNaN方法不用；
    //isNaN不能用来判断是否严格等于NaN，Number.isNaN【严格】
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

  function isRegExp(value) {
    return getType(value) === 'regexp'
  }
  
  function isSafeInteger(value) {
    return value === toSafeInteger(value)
  }
  
  function isSet(value) {
    return getType(value) === 'set'
  }
  
  function isString(value) {
    return getType(value) === 'string'
  }
  
  function isSymbol(value) {
    return getType(value) === 'symbol'
  }
  
  function isTypedArray(value) {
    return getType(value) === 'uint8array'
  }
  
  function isWeakMap(value) {
    return getType(value) === 'weakmap'
  }
  
  function isWeakSet(value) {
    return getType(value) === 'weakset'
  }

  function parseJson(input) {
    let str = input
    let i = 0
    return parseValue()
    function parseValue() {
      var c = str[i]
  
      if (c == '[') {
        return parseArray()
      }
      if (c == '{') {
        return parseObject()
      }
      if (c == '"') {
        return parseString()
      }
      if (c == 't') {
        return parseTrue()
      }
      if (c == 'f') {
        return parseFalse()
      }
      if (c == 'n') {
        return parseNull()
      }
      return parseNumber()
    }
  
    // 从i指向的位置解析出一个true，并将i指向true的下一个位置
    function parseTrue() {
      i += 4
      return true
    }
  
    function parseFalse() {
      i += 5
      return false
    }
  
    function parseNull() {
      i += 4
      return null
    }
  
    // 从i指向的位置（此时是"）解析出一个字符串，并将i移动到字符串之后
    function parseString() {
      i++ // 跳过当前双引号
      var result = ''
      while (str[i] !== '"') {
        result += str[i++]
      }
      i++ // 跳过最后一个双引号
      return result
    }
  
    // 从i指向的位置解析出一个数值，此时i已经指向了该数值的最左一位
    function parseNumber() {
      var numStr = ''
      while (str[i] >= '0' && str[i] <= '9') {
        numStr += str[i++]
      }
      return Number(numStr)
    }
  
    // 此时i指向数组开始的中括号（[），解析出这个数组，移动i到数组后面，并返回解析出的数组
    function parseArray() {
      var result = []
      i++
      while (str[i] !== ']') {
        var val = parseValue()
        result.push(val)
        if (str[i] == ',') {
          i++ // 跳过这个逗号
        }
      }
      i++
      return result
    }
  
    // 此时i指向对象开始的中括号（{），解析出这个对象，移动i到对象后面，并返回解析出的对象
    function parseObject() {
      var result = {}
      i++
      while (str[i] !== '}') {
        var key = parseString()
        i++ // 跳过冒号
        var val = parseValue()
        result[key] = val
        if (str[i] == ',') {
          i++
        }
      }
      i++
      return result
    }
    
  }
  
  function stringifyJson(obj) {
    //undefined function symbol 序列化时： 
    //数组转为null;对象忽略;单独传值则是undefined
    let type = typeof obj
    if(type != 'object' || obj === null) {
      //字符串  对象中的key 要加"" 
      if(/string/.test(type)) {
        obj = '"' + obj + '"'
      }else if(/undefined|function|symbol/.test(type)) {
        obj = null
      }
      return String(obj)
    }else {
      let res = []
      let arr = Array.isArray(obj)
      for (let key in obj) {
        let value = stringifyJson(obj[key])
        if(arr) {
          res.push(value)
        }else {
          let t = '"' + key + '":' + value
          res.push(t)
        }
      }
      return (arr ? '[' : '{') + String(res) + (arr ? ']' : '}') 
    }
  }
  
  function defer(func, ...args) {
    let self = this
    let timer = setTimeout(()=>{
      func.apply(self, args)
    },1)
    return timer
  }

  function delay(func, wait, ...args) {
    let self = this
    let timer = setTimeout(()=>{
      func.apply(self, args)
    }, wait)
    return timer
  }

  function add(a,b){
    return a+b
  }

  function ceil(num, precision = 0) {
    let mul = Math.pow(10, precision)
    const f = (num) => num % 1 === 0 ? num : parseInt(num) + 1
    return f(num * mul) / mul
  }

  function round(num, precision = 0) {
    let mul = Math.pow(10, precision)
    const f = (num) => num % 1 < 0.5 ? parseInt(num) : parseInt(num) + 1
    return f(num * mul) / mul
  }

  function divide(a, b) {
    return a/b
  }

  function floor(num, precision = 0) {
    let mul = Math.pow(10, precision)
    const f = (num) => num % 1 === 0 ? num : parseInt(num)
    return f(num * mul) / mul
  }

  function max(array) {
    if (array.length === 0) return undefined
    return array.reduce((max,item)=>item > max ? item : max)
  }

  function maxBy(array, iter) {
    if (array.length === 0) return undefined
    iter = iterator(iter)
    return array.reduce((max, item) => iter(max) > iter(item) ? max : item)
  }

  function mean(array) {
    if (array.length === 0) return undefined
    return array.reduce((sum, item) => sum + item) / array.length
  }

  function meanBy(array, iter) {
    if (array.length === 0) return undefined
    iter = iterator(iter)
    return array.reduce((sum, item) => sum + iter(item), 0) / array.length
  }

  function min(array) {
    if (array.length === 0) return undefined
    return array.reduce((max,item)=>item < max ? item : max)
  }

  function minBy(array, iter) {
    if (array.length === 0) return undefined
    iter = iterator(iter)
    return array.reduce((max, item) => iter(max) < iter(item) ? max : item)
  }

  function multiply(a,b) {
    return a * b
  }

  function subtract(a, b) {
    return a - b
  }

  function sum(array) {
    if (array.length === 0) return undefined
    return array.reduce((sum, item) => sum + item)
  }

  function sumBy(array, iter) {
    if (array.length === 0) return undefined
    iter = iterator(iter)
    return array.reduce((sum, item) => sum + iter(item), 0)
  }

  function clamp(num, lower, upper) {
    if (num >= upper) return upper
    if (num <= lower) return lower
  }

  function inRange(num, start = 0, end) {
    if (end === undefined) {
      end = start
      start = 0
    }
    if (start > end) {
      [start, end] = [end, start];
    }
    return num > start && num < end
  }

  function random(lower = 0, upper, float = false) {
    if (typeof upper !== 'number') {
      if (typeof upper === 'boolean') {
        float = upper
      }
      upper = lower
      lower = 0
    }
    return float ? Math.random()*(upper-lower) + lower : Math.floor(Math.random()*(upper-lower) + lower)
  }

  function assignIn(obj, ...sources) {
    for(let s of sources) {
      for (let key in s) {
        obj[key] = s[key]
      }
    }
    return obj
  }

  function at(obj, paths) {
    let res = []
    for (let s of paths) {
      let path = toPath(s)
      let tmp = obj
      for (let p of path) {
        tmp = tmp[p]
      }
      res.push(tmp)
    }
    return res
  }

  function defaults(obj, ...srcs) {
    for (let src of srcs) {
      for(let key in src) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = src[key]
        }
      }
    }
    return obj
  }

  function defaultsDeep(obj, ...srcs) {
    for (let src of srcs) {
      for(let key in src) {
        if (typeof src[key] === 'object') {
          defaultsDeep(obj[key], src[key])
        }else {
          if (!obj.hasOwnProperty(key)) {
            obj[key] = src[key]
          }
        }
      }
    }
    return obj
  }

  function findKey(obj, predicate) {
    predicate = iterator(predicate)
    for (let key in obj) {
      if (predicate(obj[key])) {
        return key
      }
    }
  }

  function findLastKey(obj, predicate) {
    predicate = iterator(predicate)
    let keys = Object.keys(obj)
    let n = keys.length
    for (let i = n - 1; i>=0; i--) {
      let key = keys[i]
      if (predicate(obj[key])) {
        return key
      }
    }
  }

  function forIn(obj, iter) {
    for (let key in obj) {
      if(!iter(obj[key], key, obj)) {
        break
      }
    }
    return obj
  }

  function forInRight(obj, iter) {
    const allKeys = (obj) => {
      let keys = []
      for (let key in obj) {
        keys.push(key)
      }
      return keys
    }
    let keys = allKeys(obj)
    let n = keys.length
    for (let i = n - 1; i >= 0; i++) {
      let key = keys[i]
      if (!iter(obj[key], key, obj)) {
        break
      }
    }
    return obj
  }

  function forOwn(obj, iter) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if(!iter(obj[key], key, obj)) {
          break
        }
      }
    }
    return obj
  }

  function forOwnRight(obj, iter) {
    let keys = Object.keys(obj)
    let n = keys.length
    for (let i = n - 1; i >= 0; i++) {
      let key = keys[i]
      if (!iter(obj[key], key, obj)) {
        break
      }
    }
    return obj
  }

  function functions(obj) {
    return Object.keys(obj).filter(it => typeof obj[it] === 'function')
  }

  function functionsIn(obj) {
    const allKeys = (obj) => {
      let keys = []
      for (let key in obj) {
        keys.push(key)
      }
      return keys
    }
    return allKeys(obj).filter(it => typeof obj[it] === 'function')
  }

  function isNative(f) {
    if (typeof f !== 'function') return false
    return Function.prototype.toString.call(f).includes('native code')
  }

  function invert(obj) {
    let res = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res[obj[key]] = key
      }
    }
    return res
  }

  function invertBy(obj, iter) {   
    let res = {}
    if (!iter) {
      iter = v => v
    }
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = iter(obj[key])
        if (res[value]) {
          res[value] = [].concat(res[value], key)
        }else {
          res[value] = [key]
        }
      }
    }
    return res
  }

  function invoke(obj, path, ...args) {
    path = toPath(path)
    let tmp = obj
    let pre
    for (let p of path) {
      if (typeof tmp !== 'function') {
        pre = tmp
        tmp = tmp[p]
      }else {
        break
      }
    }
    return tmp.call(pre, ...args)
  }

  function keysIn(obj) {
    let res = []
    for (let key in obj) {
      res.push(key)
    }
    return res
  }

  function mapKeys(obj, iter) {
    let res = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        key2 = iter(obj[key],key,obj)
        res[key2] = obj[key]
      }
    }
    return res
  }

  function mapValues(obj, iter) {
    let res = {}
    iter = iterator(iter)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = iter(obj[key],key,obj)
        res[key] = value
      }
    }
    return res
  }

  function merge(obj, ...sources) {
    for (let src of sources) {
      for (let key in src) {
        if (key in obj) {
          if (typeof obj[key] === 'object' && typeof src[key] === 'object') {
            merge(obj[key], src[key])
          }else {
            obj[key] = src[key]
          }
        }else {
          obj[key] = src[key]
        }
      }
    }
    return obj
  }

  function mergeWith(obj, ...args) {
    let f = args.pop()
    let sources = args
    for (let src of sources) {
      for (let key in src) {
        if (key in obj) {
          let value = f(obj[key], src[key], key, obj, src)
          if (value) {
            obj[key] = value
          }else {
            if (typeof obj[key] === 'object' && typeof src[key] === 'object') {
              merge(obj[key], src[key])
            }else {
              obj[key] = src[key]
            }
          }
        }else {
          obj[key] = src[key]
        }
      }
    }
    return obj
  }

  function omit(obj, paths) {
    let res = {}
    if (typeof paths === 'string') paths = [paths]
    for (let key in obj) {
      if (!paths.includes(key)) {
        res[key] = obj[key]
      }
    }
    return res
  }

  function omitBy(obj, f) {
    let res = {}
    for (let key in obj) {
      if (f(obj[key], key)) {
        continue
      }else {
        res[key] = obj[key]
      }
    }
    return res
  }

  function pick(obj, paths) {
    let res = {}
    if (typeof paths === 'string') {
      paths = [paths]
    }
    for (let key in obj) {
      if (paths.includes(key)) {
        res[key] = obj[key]
      }
    }
    return res
  }

  function pickBy(obj, f) {
    let res = {}
    for (let key in obj) {
      if (f(obj[key], key)) {
        res[key] = obj[key]
      }
    }
    return res
  }

  function result(obj, path, defaultVal) {
    path = toPath(path)
    for (let p of path) {
      if(!(p in obj)) {
        return typeof defaultVal === 'function' ? defaultVal() : defaultVal
      }
      obj = obj[p]
    }
    return typeof obj === 'function' ? obj() : obj
  }

  function set(obj, path, value) {
    path = toPath(path)
    let n = path.length
    let tmp = obj
    for (let i = 0; i < n; i++) {
      key = path[i]
      if (i < n-1) {
        if (key in tmp) {
          tmp = tmp[key]
        }else {
          tmp[key] = isNaN(path[i+1]) ? {} : []
          tmp = tmp[key]
        }
      }else {
        tmp[key] = value
      }
    }
    return obj
  }

  function setWith(obj, path, value, f) {
    //?
    path = toPath(path)
    let n = path.length
    let tmp = obj
    for (let i = 0; i < n; i++) {
      p = path[i]
      if (i < n-1) {
        if (p in tmp) {
          tmp = tmp[p]
        }else {
          tmp[p] = new f
          tmp = tmp[p]
        }
      }else {
        tmp[p] = value
      }
    }
    return obj
  }

  function toPairs(obj) {
    let res = []
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res.push([key, obj[key]])
      }
    }
    return res
  }

  function toPairsIn(obj) {
    let res = []
    for (let key in obj) {
        res.push([key, obj[key]])
    }
    return res
  }

  function transform(obj, f, acc) {
    if (acc === undefined) acc = new obj.constructor
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if(!f(acc, obj[key], key, obj)) break;
      }
    }
    return acc
  }

  function unset(obj, path) {
    path = toPath(path)
    let n = path.length
    for (let i = 0; i < n -1; i++) {
      let key = path[i]
      if (key in obj) {
        obj = obj[key]
      }else {
        return false
      }
    }
    return delete obj[path[n-1]]
  }

  function update(obj, path, updater) {
    path = toPath(path)
    let n = path.length
    let tmp = obj
    for (let i = 0; i < n - 1; i++) {
      let key = path[i]
      if (key in tmp) {
        tmp = tmp[key]
      }else {
        if (/^\d+$/g.test(path[i+1])) {
          tmp[key] = []
          tmp = tmp[key]
        }else {
          tmp[key] = {}
          tmp = tmp[key]
        }
      }
    }
    tmp[path[n-1]] = updater(tmp[path[n-1]])
    return obj
  }

  function updateWith(obj, path, updater, f) {
    path = toPath(path)
    let n = path.length
    let tmp = obj
    for (let i = 0; i < n - 1; i++) {
      let key = path[i]
      if (key in tmp) {
        tmp = tmp[key]
      }else {
        tmp[key] = new f
        tmp = tmp[key]
      }
    }
    tmp[path[n-1]] = updater(tmp[path[n-1]])
    return obj
  }

  function values(obj) {
    let res = []
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res.push(obj[key])
      }
    }
    return res
  }

  function valuesIn(obj) {
    let res = []
    for (let key in obj) {
        res.push(obj[key])
    }
    return res
  }

  function camelCase(str) {
    return str.trim().toLowerCase()
              .replace(/([^0-9A-Za-z]+)/g, '-') // 所有符号转换为’-‘
              .replace(/^-+|-+$/g,'') // 去除头尾的‘-’
              .replace(/-(\w)/g, (_, x) => x.toUpperCase()) // 中划线转驼峰
  }

  function capitalize(str) {
    return str.toLowerCase().replace(/\w/, x => x.toUpperCase())
  }

  function deburr(str) {

  }

  function endsWith(str, target, pos = str.length) {
    return str[--pos] === target
  }

  function escape(str) {
    let map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&apos;'
    }
    return str.replace(/[&><'"]/g, x => map[x])
  }

  function unescape(str) {
    let map = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&apos;': '\''
    }
    return str.replace(/(&amp;)|(&lt;)|(&gt;)|(&quot;)|(&apos;)/g, x => map[x])
  }

  function escapeRegExp(str) {
    // 正则中需要转义的14个字符 [ ] \ ^ $ . | ? * + ( ) { }
    return str.replace(/[\[\]\\\^\$\.\|\?\*\+\(\)\{\}]/g, x => '\\'+x)
  }

  function kebabCase(str) {
    return str.trim()
              .replace(/([^A-Z])([A-Z])/g, (_,x,y) => x + '-' + y) //fooBar  找到oB
              .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '') // 开头结尾去除
              .replace(/[^a-zA-Z0-0-]/g,'') 
              .toLowerCase()
  }

  function lowerCase(str) {// foo bar
    return str.replace(/[^a-zA-Z]/g, ' ')
              .replace(/([a-z])([A-Z])/g, (_, x, y) => x + ' ' + y)
              .toLowerCase()
              .trim()
  }

  function upperCase(str) {// FOO BAR
    return str.replace(/[^a-zA-Z]/g, ' ')
              .replace(/([a-z])([A-Z])/g, (_, x, y) => x + ' ' + y)
              .toUpperCase()
              .trim()
  }

  function lowerFirst(str) {
    return str.replace(/./, x => x.toLowerCase())
  }

  function upperFirst(str) {
    return str.replace(/./, x => x.toUpperCase())
  }

  function pad(str, num = 0, char = ' ') {
    let n = str.length
    if (n >= num) return str
    let start = (num - n) >> 1
    let end = start + n
    let leftTimes = Math.ceil(start / char.length)
    let rightTimes = Math.ceil((num - end) / char.length)
    return char.repeat(leftTimes).slice(0, start) + str + char.repeat(rightTimes).slice(0, num - end)
  } 

  function padEnd(str, num = 0, char = ' ') {
    let n = str.length
    if (n >= num) return str
    let times = Math.ceil((num - n) / char.length)
    return str + char.repeat(times).slice(0, num - n)
  }

  function padStart(str, num, char = ' ') {
    let n = str.length
    if (n >= num) return str
    let times = Math.ceil((num - n) / char.length)
    return char.repeat(times).slice(0, num - n) + str
  }

  function parseInt(str, radix = 10) {
    class Auto{
      constructor(radix) {
          this.state = 'start'
          this.answer = 0
          this.sign = 1
          this.radix = radix
          this.maxPos = Math.pow(2, 31) - 1
          this.maxNeg = Math.pow(2, 31)
          this.map = new Map([// 空格 正负 数字 其它
              ['start', ['start', 'signed', 'in_number', 'end']],
              ['signed', ['end', 'end', 'in_number', 'end']],
              ['in_number', ['end', 'end', 'in_number', 'end']],
              ['end', ['end', 'end', 'end', 'end']]
          ])
      }
      getTypeIndex(char) {
          if (char === ' ') {
              return 0
          }else if (/[\+-]/.test(char)) {
              return 1
          }else if (/[0-9]/.test(char)) {
              return 2
          }else {
              return 3
          }
      }
      go(char) {
          this.state = this.map.get(this.state)[this.getTypeIndex(char)]
          if (this.state === 'signed') {
              this.sign = char === '+' ? 1 : -1
          }
          if (this.state === 'in_number') {
              this.answer = this.answer * this.radix + +char
              this.answer = this.sign > 0 ? 
                  Math.min(this.answer, this.maxPos) : Math.min(this.answer, this.maxNeg)
          }
      }
    }
    str = ''+str
    let auto = new Auto(radix)
    for (let c of str) {
        auto.go(c)
    }
    return auto.answer * auto.sign
  }

  function repeat(str='', n = 1) {
    let res = ''
    for (let i = 0; i < n; i++) {
      res += str
    }
    return res
  }

  function replace(str, pattern, replacement) {
    return str.replace(pattern, replacement)
  }

  function snakeCase(str) {//foo_bar
    return str.trim()
    .replace(/([^A-Z])([A-Z])/g, (_,x,y) => x + '_' + y) //fooBar  找到oB
    .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '') // 开头结尾去除
    .replace(/[^\w]/g,'') 
    .toLowerCase()
  }

  function split(str, sep, limit) {
    return str.split(sep).splice(0, limit)
  }

  function startCase(str) {// Foo BAR
    return str.replace(/[^a-zA-Z]/g, ' ')
              .replace(/([a-z])([A-Z])/g, (_, x, y) => x + ' ' + y)
              .replace(/\s\w/g, x=>x.toUpperCase())
              .trim()    
              .replace(/^[a-z]/, x=>x.toUpperCase())     
  }

  function startsWith(str, target, pos = 0) {
    return str[pos] === target
  }

  function toLower(str) {
    return str.split('').map(i => i.charCodeAt())
              .map(code => code >=65 && code <=90 ? code + 32 : code)
              .map(code => String.fromCharCode(code))
              .join('')
  }

  function toUpper(str) {
    return str.split('').map(i => i.charCodeAt())
              .map(code => code >=97 && code <=122 ? code - 32 : code)
              .map(code => String.fromCharCode(code))
              .join('')
  }

  function trim(str, char) {
    // let regStr = `^${char}+|${char}+$`
    // let reg = new RegExp(regStr, 'g')
    // return str.replace(reg,'')
    if (char === undefined) return str.replace(/^\s+|\s+$/g,'')
    let left = 0, right = str.length - 1
    let len = str.length
    while(left < len && char.includes(str[left])){
        left++
    }
    while(right >= 0 && char.includes(str[right])) {
      right--
    }
    return str.slice(left, right + 1)
  }

  function trimEnd(str, char) {
    if (char === undefined) return str.replace(/\s+$/g,'')
    let right = str.length - 1
    while(right >= 0 && char.includes(str[right])) {
      right--
    }
    return str.slice(0, right + 1)
  }

  function trimStart(str, char) {
    if (char === undefined) return str.replace(/^\s+/g,'')
    let left = 0
    let len = str.length
    while(left < len && char.includes(str[left])){
        left++
    }
    return str.slice(left)
  }

  function truncate(str, options = {}) {  
    // 处理option
    if (!options.length) options.lenth = 30
    if (!options.omission) options.omission = '...'
    // 不需要操作
    if (str.length <= options.length) {
      return str
    }
    // 需要操作
    let omissLen = options.omission.length
    if (options.separator) {
      let matchReg = new RegExp(options.separator, 'g')
      let end = 0
      let match
      while(match = matchReg.exec(str) ) {
        if((match.index + omissLen) <= options.length) {
          end = match.index
        }else break;
      }
      return str.slice(0, end) + options.omission
    }else {
      let reserve= options.lenth - omissLen
      return str.slice(0, reserve) + options.omission
    }
  }

  function words(str, pattern) {
    if (!pattern) {
      // 普通单词匹配：/\b\w+\b/g
      return str.match(/([a-zA-Z])+|([0-9])+/g)
    }else {
      return str.match(pattern)
    }
  }

  function bindAll(obj, methodNames) {
    methodNames = [].concat(methodNames)
    for (let method of methodNames) {
      obj[method] = obj[method].bind(obj)
    }
    return obj
  }

  function defaultTo(value, defaultValue) {
    return value || defaultValue
  }

  function range(start = 0, end, step = 1) {
    if (arguments.length === 1) {
      if (start < 0) step = -1
      end = start
      start = 0
    }
    if (end === start ||(end > start && step < 0) ||(end < start && step > 0)) return []
    let times = Math.abs((end-start)/(step||1))
    let res = []
    for (let i = 0; i < times; i++) {
      res.push(start)
      start += step
    } 
    return res
  }

  function rangeRight(start = 0, end, step = 1) {
    if (arguments.length === 1) {
      if (start < 0) step = -1
      end = start
      start = 0
    }
    if (end === start ||(end > start && step < 0) ||(end < start && step > 0)) return []
    let times = Math.abs((end-start)/(step||1))
    let res = []
    for (let i = 0; i < times; i++) {
      res.unshift(start)
      start += step
    } 
    return res
  }

  function times(n, f) {
    let res = []
    for (let i = 0; i < n; i++) {
      res.push(f(i))
    }
    return res
  }

  function uniqueIdPre() {
    let n = 0
    return function(prefix="") {
      return prefix+(++n)
    }
  }

  uniqueId = uniqueIdPre()

  function cloneDeep(obj, map = new Map()) {
    if (obj === null) return null
    if (obj instanceof RegExp) return new RegExp(obj)
    if (obj instanceof Date) return new Date(obj)
    if (typeof obj !== 'object') return obj
    // 循环引用
    if (map.has(obj)) return map.get(obj)
    let t = new obj.constructor()
    map.set(obj, t)
    // map
    if (obj instanceof Map) {
      obj.forEach((val, key) => {
        t.set(cloneDeep(key, map), cloneDeep(val, map))    
      })
    }
    // set
    if (obj instanceof Set) {
      obj.forEach(val => {
        t.add(cloneDeep(val, map))    
      })
    }
    // obj、array
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        t[key] = cloneDeep(obj[key], map)
      }
    }
    return t
  }

  function identity(obj) {
    return obj
  }

  function pullAt(arr, indexs) {
    if (typeof indexs === 'number') indexs = [indexs]
    let res =[], count = 0
    for (let index of indexs) {
      res.push(arr.splice(index - count, 1)[0])
      count++
    }
    return res
  }

  function matches(source) {
    return function(obj) {
      for (let key in source) {
        if (!obj[key] === source[key]) {
          return false
        }
      }
      return true
    }
  }

  function property(path) {
    return function(obj) {
      return get(obj, path)
    }
  }

  function ary(func, n = func.length) {
    return function(...args){
      let argsFinal = args.slice(0, n)
      return func(...argsFinal)
    }
  }

  function unary(func) {
    return function(...args) {
      return func(args[0])
    }
  }

  function once(func) {
    let canRun = true 
    return function(...args) {
      if (!canRun) return 
      canRun = false
      return func(...args)
    }
  }

  function before(n, func) {
    let count = 0
    return function(...args) {
      count++
      if (count < n) {
        return func(...args)
      }
    }
  }

  function after(n, func) {
    let count = 0
    return function(...args) {
      count++
      if (count > n) {
        coun = n
        return func(...args)
      }
    }
  }

  function bind(func, obj, ...fixedArgs) {
    return function(...args) {
      for (let i = 0; i < fixedArgs.length; i++ ) {
        if (fixedArgs[i] === _) {
          fixedArgs[i] = args.shift()
        }
      }
      return func.call(obj, ...fixedArgs, ...args)
    }
  }

  function bindKey(obj, key, ...fixedArgs) {
    return function(...args) {
      for (let i = 0; i < fixedArgs.length; i++ ) {
        if (fixedArgs[i] === _) {
          fixedArgs[i] = args.shift()
        }
      }
      return obj[key].call(obj, ...fixedArgs, ...args)
    }
  }

  function curry(func, ...fixedArgs) {
    let tmp = fixedArgs.filter(i => i !== _)
    if (tmp.length >= func.length) return func(...tmp)
    return (...args) => {
      for (let i = 0; i < fixedArgs.length; i++ ) {
        if (fixedArgs[i] === _) {
          fixedArgs[i] = args.shift()
        }
      }
      return curry(func, ...fixedArgs, ...args)
    } 
  }

  function curryRight(func, ...fixedArgs) {
    let tmp = fixedArgs.filter(i => i !== _)
    if (tmp.length >= func.length) return func(...tmp)
    return (...args) => {
      for (let i = 0; i < fixedArgs.length; i++ ) {
        if (fixedArgs[i] === _) {
          fixedArgs[i] = args.shift()
        }
      }
      return curryRight(func, ...args, ...fixedArgs)
    } 
  }

  function debounce(func, delay, options ={}) {
    //fangdou 
    let timer = null
    return function() {
      if (timer) clearTimeout(timer)
      timer = setTimeout(func, delay)
    }
  }

  function throttle(func, delay, options={}) {
    let canRun = true
    return function () {
      if (!canRun) return
      canRun = false
      setTimeout(()=>{
        func.apply(this, arguments)
        canRun = true
      }, delay)
    }
  }

  function flip(func) {
    return function(...args) {
      return func(...args.reverse())
    }
  }

  function overArgs(func, trans) {
    return function(...args) {
      if (typeof trans === 'function') trans = [trans]
      args = args.map((arg, i) => trans[i](arg))
      return func(...args)
    }
  }

  function partial(func, ...fixedArgs) {
    return function(...args) {
      for (let i = 0; i < fixedArgs.length; i++ ) {
        if (fixedArgs[i] === _) {
          fixedArgs[i] = args.shift()
        }
      }
      return func(...fixedArgs, ...args)
    }
  }

  function partialRight(func, ...fixedArgs) {
    return function(...args) {
      for (let i = 0; i < fixedArgs.length; i++ ) {
        if (fixedArgs[i] === _) {
          fixedArgs[i] = args.shift()
        }
      }
      return func(...args, ...fixedArgs)
    }
  }

  function rearg(func, indexs) {
    return function(...args) {
      indexs = [].concat(indexs)
      let newArgs = []
      for (let i = 0; i< args.length;i++) {
        newArgs[i] = args[indexs[i]]
      }
      return func(...newArgs)
    }
  }

  function spread(func) {
    return function(ary) {
      return func(...ary)
    }
  }

  function wrap(value, wrapper) {
    return function(...args) {
      return wrapper(value, ...args)
    }
  }

  function rest(func, start = func.length-1) {
    return function(...args) {
      let preArgs = args.splice(0, start)
      let resArgs = args
      return func(...preArgs, resArgs)
    }
  }

  function negate(func) {
    return function(...args) {
      return !func(...args)
    }
  }

  function constant(value) {
    return () => value
  }

  function flow(funcs) {
    funcs = [].concat(funcs)
    return function(...args) {
      let res
      let flag = false
      for (let func of funcs) {
        if (flag) {
          res = func(res)
        }else {
          flag = true
          res = func(...args)
        }
      }
      return res
    }
  }

  function propertyOf(obj) {
    return function(path) {
      path = toPath(path)
      let tmp = obj
      for (let p of path) {
        tmp = tmp[p]
      }
      return tmp
    }
  }

  function nthArg(n = 0) {
    return function(...args) {
      let total = args.length
      n = n >= 0 ? n : total - n
      return args[n]
    }
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

    find: find,
    findLast: findLast,
    flatMap: flatMap,
    flatMapDeep: flatMapDeep,
    flatMapDepth: flatMapDepth,

    forEach: forEach,
    forEachRight: forEachRight,   

    groupBy: groupBy,
    includes: includes,
    invokeMap: invokeMap,
    keyBy: keyBy,
    map: map,
    orderBy: orderBy,
    sortBy: sortBy,
    partition: partition,
    
    reduce: reduce,
    reduceRight: reduceRight,
    reject: reject,
    sample: sample,
    sampleSize: sampleSize,
    size: size,
    some: some,
    castArray: castArray,
    conformsTo: conformsTo,
    eq: eq,
    gt: gt,
    gte: gte,
    lt: lt,
    lte: lte,

    isArguments: isArguments,
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isArrayLike: isArrayLike,
    isArrayLikeObject: isArrayLikeObject,
    isBoolean: isBoolean,
    isDate: isDate,
    isElement: isElement,
    isEmpty: isEmpty,
    isEqual: isEqual,
    isEqualWith: isEqualWith,
    isError: isError,
    isFinite: isFinite,
    isFunction: isFunction,
    isInteger: isInteger,
    isLength: isLength,
    isMap: isMap,
    isMatch: isMatch,
    isMatchWith: isMatchWith,
    isNaN: isNaN,
    isNull: isNull,
    isNil: isNil,
    isNumber: isNumber,
    isObject: isObject,
    isObjectLike: isObjectLike,
    isPlainObject: isPlainObject,
    isRegExp: isRegExp,
    isSafeInteger: isSafeInteger,
    isSet: isSet,
    isString: isString,
    isSymbol: isSymbol,
    isTypedArray: isTypedArray,
    isWeakMap: isWeakMap,
    isWeakSet: isWeakSet,
    isNative: isNative,
    toArray: toArray,
    toFinite: toFinite,
    toInteger: toInteger,
    toLength: toLength,
    toNumber: toNumber,
    toSafeInteger: toSafeInteger,  
    
    assign: assign,

    keys: keys,
    values: values,
    every: every,
    fill: fill,
    filter: filter,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    reverse: reverse,

    countBy: countBy,

    shuffle: shuffle,

 

    isUndefined: isUndefined,
    toArray: toArray,

    get: get,
    has: has,
    hasIn: hasIn,

    parseJson: parseJson,
    stringifyJson: stringifyJson,
    defer: defer,
    delay: delay,

    add: add,
    ceil: ceil,
    divide: divide,
    floor: floor,
    max: max,
    maxBy: maxBy,
    mean: mean,
    meanBy: meanBy,
    min: min,
    minBy: minBy,
    multiply: multiply,
    round: round,
    subtract: subtract,
    sum: sum,
    sumBy: sumBy,
    clamp: clamp,
    inRange: inRange,
    random: random,
    assignIn: assignIn,
    at: at,
    defaults: defaults,
    defaultsDeep: defaultsDeep,
    findKey: findKey,
    findLastKey: findLastKey,
    forIn: forIn,
    forInRight: forInRight,
    forOwn: forOwn,
    forOwnRight: forOwnRight,
    functions: functions,
    functionsIn: functionsIn,
    hasIn: hasIn,
    invert: invert,
    invertBy: invertBy,
    invoke: invoke,
    keysIn: keysIn,
    mapKeys: mapKeys,
    mapValues: mapValues,
    merge: merge,
    mergeWith: mergeWith,
    omit: omit,
    omitBy: omitBy,
    pick: pick,
    pickBy: pickBy,
    result: result,
    set: set,
    setWith: setWith,
    toPairs: toPairs,
    toPairsIn: toPairsIn,
    transform: transform,
    unset: unset,
    update: update,
    updateWith: updateWith,
    values: values,
    valuesIn: valuesIn,
    camelCase: camelCase,
    capitalize: capitalize,
    deburr: deburr,
    endsWith: endsWith,
    escape: escape,
    escapeRegExp: escapeRegExp,
    kebabCase: kebabCase,
    lowerCase: lowerCase,
    lowerFirst: lowerFirst,
    pad: pad,
    padEnd: padEnd,
    padStart: padStart,
    repeat: repeat,
    replace: replace,
    snakeCase: snakeCase,
    split: split,
    startCase: startCase,
    startsWith: startsWith,
    toLower: toLower,
    toUpper: toUpper,
    trim: trim,
    trimEnd: trimEnd,
    trimStart: trimStart,
    truncate: truncate,
    unescape: unescape,
    upperCase: upperCase,
    upperFirst: upperFirst,
    words: words,
    bindAll: bindAll,
    defaultTo: defaultTo,
    range: range,
    rangeRight: rangeRight,
    times: times,
    toPath: toPath,
    uniqueId: uniqueId,
    cloneDeep: cloneDeep,
    identity: identity,
    concat: concat,
    pullAt: pullAll,
    matches: matches,
    property: property,

    ary: ary,
    after: after,
    before: before,
    bind: bind,
    bindKey: bindKey,
    curry: curry,
    curryRight: curryRight,
    debounce: debounce,
    defer: defer,
    flip: flip,
    once: once,
    overArgs: overArgs,
    partial: partial,
    partialRight: partialRight,
    rearg: rearg,
    rest: rest,
    spread: spread,
    throttle: throttle,
    unary: unary,
    wrap: wrap,
    pullAt: pullAt,
    negate: negate,
    constant: constant,
    flow: flow,
    property: property,
    propertyOf: propertyOf,
    nthArg: nthArg,
    parseInt: parseInt
  }

}()
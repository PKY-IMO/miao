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
      }
    }
    return res
  }

  function dropRightWhile(arr, f) {
    let res = []
    let it = iterator(f)
    for (let i = 0; i < arr.length; i++) {
      if (!it(arr[i], i, arr)) {
        res.push(arr[i])
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
    iter = iteratee(iter)
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
    for (var i = 1; i < arr.length; i++) {
      var t = arr[i]
      for (var j = i - 1; j >= 0; j--) {
        // if (arr[j] > t)
        if (comparetor2(arr[j], t, iter, orders) > 0) {
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
    return  keys(collection).length
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
    return typeof value === 'boolean'
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
    return keys(value).length === 0
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

  function some(collection, predicate) {
    predicate = iteratee(predicate)
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


  function comparetor2(a, b, iter, orders) {
    let iterArr = zip(iter, orders)
    for (let it of iterArr) {
      let f = iteratee(it[0])
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
    toArray: toArray,
    toFinite: toFinite,
    toInteger: toInteger,
    toLength: toLength,
    toNumber: toNumber,
    toSafeInteger: toSafeInteger,  

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
    sum: sum,
    sumBy: sumBy,

    get: get,
    has: has,

  }

}()
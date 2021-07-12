//浅拷贝
function shallowCopy(obj) {
  var copy = {};
  // 只复制可遍历的属性
  for (key in obj) {
      // 只复制本身拥有的属性
      if (obj.hasOwnProperty(key)) {
          copy[key] = obj[key];
      }
  }
  return copy;
}

//深拷贝
function deepCopy(obj, copyobj) {
  var copyobj = copyobj || {}
  for (var keys in obj) {
    if (obj.hasOwnProperty(keys)) {
      if (typeof(obj[keys]) == 'object' && obj[keys] != null) {
        if(Object.prototype.toString.call(obj[keys]) === '[object Array]') {
          copyobj[keys] = []
        } else {
          copyobj[keys] = {}
        }
        deepCopy(obj[keys], copyobj[keys])
      } else {
        copyobj[keys] = obj[keys]
      }
    }
  }
  return copyobj
}


//Vue实现
function find(list, f) {
  return list.filter(f)[0]
}
function deepCopyV(obj, cache) {
  if (cache === void 0) cache = []
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  // if obj is hit, it is in circular structure
  var hit = find(cache, function(c) { return c.original === obj })
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  })

  Object.keys(obj).forEach(function(key) {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

// const Constructor = obj.constructor
// // typeof null的返回值为object，所以可以直接省略
// if (typeof obj !== 'object') {
//   return obj
// } else if (Constructor === RegExp) {
//   return new Constructor(obj)
// } else if (Constructor === Date) {
//   return new Constructor(obj.getTime())
// }




newObj = JSON.parse(JSON.stringify(obj));



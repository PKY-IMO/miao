Array.prototype.myMap = function (callback, thisArg) {
  let length = this.length
  let res = []
  if (!Array.isArray(this)) throw new TypeError('this is not an array')
  if (typeof callback !== 'function') throw new TypeError(callback + 'is not a function')
  if (length === 0) {
    return res
  }
  for (let i = 0; i < length; i++) {
    res[i] = callback.call(thisArg, this[i], i, this)
  }
  return res
}


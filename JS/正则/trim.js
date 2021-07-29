String.prototype.myTrim = function() {
  let str = this
  return str.replace(/^\s+|\s+$/g,'')
}
let str = '   a n d   '
console.log(str.myTrim())
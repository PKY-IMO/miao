String.prototype.myTrim = function() {
  let str = this
  return str.replace(/^\s+|\s+$/g,'')
}
let str = '   a n d   '
console.log(str.myTrim())

//匹配任意字符不区分大小写的trim
//string = "LLLHello Worldlll" and c = "l" => "Hello World"
//string = "Visca ElbarcaXxX" and c = "X" => "Visca Elbarca"
String.prototype.trim = function(c = ' '){
  c = c.replace(/(?=\W)/g,'\\')
  var str = `^${c}+|${c}+$`
  return this.replace(new RegExp(str, 'gi'), '')
}
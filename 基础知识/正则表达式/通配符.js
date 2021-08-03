//实现函数判断通配符与字符串的匹配关系,通配符中*代表任意内容，?代表任意单个符号
// wildcardMatching('??ccd', 'abccd') -> true
// wildcardMatching('*', 'abccd') -> true
// wildcardMatching('a*cd', 'abccd') -> true
// wildcardMatching('x*ccd', 'abccd') -> false
function wildcardMatching(wildcard, str) {
  if (wildcard == '*') return true
  wildcard = wildcard.replace(/(?=[^\w\s])(?![?*])/g, '\\')
  let reg = /\*/g
  wildcard = wildcard.replace(/\*/g,'.\*')
  let reg2 = /\?/g
  wildcard = wildcard.replace(reg2,'.')
  let reg3 = new RegExp('^'+wildcard+'$')
  return reg3.test(str)
}

function wildcardMatching(wildcard, str) {
  var reSource = wildcard
    .replace(/(?=[^\w\s])(?![?*])/g, '\\') //不能让+.这类字符生效
    .replace(/\*/g, '.*')
    .replace(/\?/g, '.')
  var re = new RegExp('^'+ reSource +'$')
  return re.test(str)
}

console.log(wildcardMatching('??ccd', 'abccd') )
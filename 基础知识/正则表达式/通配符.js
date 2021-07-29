//实现函数判断通配符与字符串的匹配关系,通配符中*代表任意内容，?代表任意单个符号
// wildcardMatching('??ccd', 'abccd') -> true
// wildcardMatching('*', 'abccd') -> true
// wildcardMatching('a*cd', 'abccd') -> true
// wildcardMatching('x*ccd', 'abccd') -> false
function wildcardMatching(wildcard, str) {
  if (wildcard == '*') return true
  let reg = /\*/g
  wildcard = wildcard.replace(reg,'.\*')
  let reg2 = /\?/g
  wildcard = wildcard.replace(reg2,'.\{1\}')
  let reg3 = new RegExp(wildcard)
  return reg3.test(str)
}

console.log(wildcardMatching('??ccd', 'abccd') )
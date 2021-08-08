
function lastSurvivors(str) {
  let reg = /([a-z])[^\\1]*\1/g
  while (reg.test(str)) {
    str = str.replace(reg, ($0,$1) => {
      let code = $1.charCodeAt() + 1
      if( code == 123) code = 97
      return String.fromCharCode(code) + $0.slice(1,$0.length-1)
    })
  }
  return str
}
str = "zzzab"


reg = /(^\*([^\*]+) matches .+\2$)|(^(.+) matches \4$)|(^([^\*]+)\* matches \6(.+)$)|(.*\*([^*])([^*]+)([^*]*)\*.* matches [^\\8]+\8\9\10[^\\10]+$)/
str = '*hormog matches hormogonium'


ret = /(^\*([^\*]+) matches (.+)(\2)$)/

console.log(str.match(ret))

function maskify(cc) {
  if (cc.length <= 4) return cc
  let reg = /^(\w+)(\w{4})$/
  return cc.replace(reg, (_,$1,$2)=> { console.log($1,$2); return'#'.repeat($1.length)+$2})
}

console.log(maskify('4556364607935616'))

function decipherThis(str) {
  //have fun!
    let reg = /\d+/g
    let reg2 = /\b(\w+)\b/g
    let arr
    return str.replace(reg, x=>String.fromCharCode(x|0)).replace(reg2, (match)=>{
      let len = match.length
      if (len<=2) return match
      arr = match.split('')

      let t = arr[len-1]
      arr[len - 1] =arr[1]
      arr[1] = t 
      return arr.join('')
    })
  
  }; 
  console.log(decipherThis('72eva 97 103o 97t 116sih 97dn 115ee 104wo 121uo 100o'))
  
  function uniqBy(arr, iteratee) {
    var it = compare(iteratee)
    let map = {}, res = []
    arr.forEach((item) => {
      let key = it(item)
      if (!(key in map)) {
        map[key] = item
        res.push(item)
      }
    })
    return res
  }


  let  kua = 0
  if(kua = 5) 
    console.log(kua)
  
  


 
let a = 1234567894532
let b = 673439.4542

function numFormat(num) {
  let res = num.toString().replace(/\d+/, (integer) => {
    return integer.replace(/(\d)(?=(\d{3})+$)/g,($1)=> $1 + ',')
  })
  return res
}
console.log(numFormat(b))



let test = 673439.4542
test = test.toString().replace(/\d+/, function(match) {
  // (\d{3})+  要写括号不然报错Nothing to repeat
  return match.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
})

console.log(test)
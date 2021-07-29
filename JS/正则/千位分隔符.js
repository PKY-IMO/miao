let a = 1234567894532
let b = 673439.4542

function numFormat(num) {
  let res = num.toString().replace(/\d+/, (integer) => {
    return integer.replace(/(\d)(?=(\d{3})+$)/g,(_,$1)=> $1 + ',')
  })
  return res
}
console.log(numFormat(b))


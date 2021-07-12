a =[6.1, 4.2, 6.3]
function uniqueBy(arr, iteratee) {
  return arr.map((item) => iteratee(item)).filter((item, idx, arr) => arr.indexOf(item) == idx)
}

function groupBy(collection, iteratee) {
  let map = {}
  for (let item of collection) {
    let key = iteratee(item)
    if(!(key in map)) {
      map[key] = [item]
    }else {
      map[key].push(item)
    }
  }
  return map
}
console.log(groupBy(a, Math.floor))
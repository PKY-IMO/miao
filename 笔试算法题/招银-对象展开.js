// 对象展开
let obj = {
    name: 'xiaohuang',
    birth: {
      year: '2010',
      time: {
        hour: 'PM2',
        minute: '10'
      }
    },
    age: 12,
    gender: 'boy'
}

function falttenObj(obj) {
  const res = {}
  const flatObj = (obj, preKey='') => {
    if (typeof obj != 'object') {
      res[preKey] == obj
      return
    }
    let keys = Object.keys(obj)
    for (let key of keys) {
      let value = obj[key]
      let newKey = key
      if (preKey) {
        newKey = preKey + '.' + key
      }
      if (typeof value === 'object') {
        flatObj(value, newKey)
      }
      if (typeof value !== 'object') {
        res[newKey] = value
      }
    }
  }
  flatObj(obj, '')
  return res
}

console.log(falttenObj(obj))
```
ES6
tagged template string
一个函数后紧跟一个模板字符串，将会以特殊的形式调用

第一个参数为模板字符串各部分字符串组成的数组， 该数组包含一个属性raw
后续参数为各个替换位内容。


```


function row(partials, ...interpolations) {
  var result = partials.raw[0]
  for (let i = 0; i < interpolations.length; i++) {
    result += interpolations[i] + partials.raw[i+1]
  }
  return result
}
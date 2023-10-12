/**
 * 数组扁平化 例如二维数组一维化
 */
//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);

//闭包
ary = [1, [2, [3, [4, 5]]], 6]
function flattenArr() {
  let result = []
  return function flatten(arr) {
    arr.forEach(ele => {
      if (Array.isArray(ele)) {
        flatten(ele)
      } else {
        result.push(ele)
      } 
    })
    return result
  }
}
// flattenArr()(ary)

//无闭包 
function flattenArr(arr) {
  let result = []
  arr.forEach(i => {
    if(Array.isArray(i)) {
      result.push(...flattenArr(i))
    } else {
      result.push(i)
    }
  })
  return result
}

//2. join + split
function flatten(arr) {
  return arr.join().split(',').map(item => item | 0)
}

//3. 展开运算
function flattenArr(arr) {
  let flatten = arr => [].concat(...arr) //展开运算符 去除一层[]
  return flatten(arr.map(item => Array.isArray(item) ? flattenArr(item) : item))
}

//4.reduce + concat
 function flattenArr(arr) {
  return arr.reduce((prev,item) => prev.concat(Array.isArray(item) ? flattenArr(item) : item),[])
}


function flattendepth(arr, depth) {
  if (depth == 0) {
    return arr
  }
  var result = []
  for (var i = 0; i < arr.length; i++) {
    var item = array[i]
    if (Array.isArray(item)) {
      item = flattendepth(item, depth-1)
      for (var j = 0; j < item.length; j++) {
        result.push(item[j])
      }
    } else {
      result.push(item)
    }
  }
  return result
}
/**
 *  累计数组的和
 */
 var sum = [0, 1, 2, 3].reduce((p, i) => p + i, 0)

 /**
  * 按属性对object分类
  */
  var people = [
    { name: 'Alice', age: 21 },
    { name: 'Max', age: 20 },
    { name: 'Jane', age: 20 }
  ];

  function groupBy(object, property) {
    let map = {}
    for (let i = 0; i < object.length; i++) {
      let key = object[i][property]
      if (!(key in map)) {
        map[key] = []
        map[key].push(object[i])
      } else {
        map[key].push(object[i])
      }
    }
    return map
  }


  function groupBy(object, property) {
    return object.reduce((res,item)=>{
      let key = item[property]
      if (!(key in res)) {
        res[key] = []
        res[key].push(item)
      } else {
        res[key].push(item)
      }
      return res
    },{})
  }




  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }
  
  var groupedPeople = groupBy(people, 'age');


  /**
   * 使用扩展运算符和initialValue绑定包含在对象数组中的数组
   */
  var friends = [{
    name: 'Anna',
    books: ['Bible', 'Harry Potter'],
    age: 21
  }, {
    name: 'Bob',
    books: ['War and peace', 'Romeo and Juliet'],
    age: 26
  }, {
    name: 'Alice',
    books: ['The Lord of the Rings', 'The Shining'],
    age: 18
  }];

  let allbooks = friends.reduce((pre, cur) => {
   return pre.concat(cur.books)
  },[])

  // allbooks = [
//   'Alphabet', 'Bible', 'Harry Potter', 'War and peace',
//   'Romeo and Juliet', 'The Lord of the Rings',
//   'The Shining'
// ]

/**
 * 数组去重
 */
 let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
 //1. set方法
 let newArray = [...new Set(myArray)]
 let newArray2 = Array.from(new Set(myArray))

 //2. filter
 let newArray3 = myArray.filter((item, index, arr) => {
    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item) === index;
  })

  //3. reduce+includes
  let newArray4 = myArray.reduce((prev, cur) => {return prev.includes(cur) ? prev : [...prev, cur]},[])

  

/**
 * 对象数组去重
 */
//  输入:
//  [{a:1,b:2,c:3},{b:2,c:3,a:1},{d:2,c:2}]
//  输出:
//  [{a:1,b:2,c:3},{d:2,c:2}]
// 把内容转json.stringify存入set，set转数组，
//再map，json.parse
function objSort(obj){
  let newObj = {}
  //遍历对象，并将key进行排序
  Object.keys(obj).sort().map(key => {
      newObj[key] = obj[key]
  })
  //将排序好的数组转成字符串
  return JSON.stringify(newObj)
}

function unique(arr){
  let set = new Set();
  for(let i=0;i<arr.length;i++){
      let str = objSort(arr[i])
      set.add(str)
  }
  //将数组中的字符串转回对象
  arr = [...set].map(item => {
      return JSON.parse(item)
  })
  return arr
}

function uniqWith(arr, isEqual) {
  let res = []
  for (let i = 0; i < arr.length;i++ ) {
    if (!res.some(it=>isEqual(arr[i], it))){
      res.push(arr[i])
    }
  }
  return res
}
function isEqual(obj1, obj2) {
  if (typeof obj1 !== 'object' && typeof obj2 != 'object') {
    return obj1 === obj2
  }
  for (let key in obj1) {
    if (!(key in obj2)) return false
    if (!isEqual(obj1[key], obj2[key])) return false
  }
  return true
}

arruniq = [{a:1,b:2,c:3},{b:2,c:3,a:1},{d:2,c:2}]
console.log(uniqWith(arruniq,isEqual))






  /**
   * 转化为驼峰命名
   */

   var s1 = "get-element-by-id"
   // 转化为 getElementById

  return s1.replace(/-\w/g, x => x.slice(1).toUpperCase() )
   
   var f = function(s) {
       return s.replace(/-\w/g, function(x) {
           return x.slice(1).toUpperCase();
       })
   }

//对数组成员个数进行统计
const arr = [0, 1, 1, 2, 2, 2];
// { 0: 1, 1: 2, 2: 3 }

function Count(arr = []) {
  return arr.reduce((t, v) => (t[v] = (t[v] || 0) + 1, t), {});
}


// 二维数组行转列
rows = [[1,2,3,5,2,34,5,6],
        [1,2,3,5,9,4,5,6],
        [1,2,3,5,9,4,5,6]]

function col(rows) {
  return rows[0].map((_,idx) => {
    return rows.map(row => row[idx])
  })
}

m = col(rows)
console.log(m)


function chunk(array, size = 1) {
  if (!Array.isArray(array)) {
      return []
  }
  const result = []
  let len = size
  for (let i = 0; i < array.length;) {
      let temp = []
      while (i < array.length && len--) {
          temp.push(array[i++])
      }
      result.push(temp)
      len = size
  }
  return result
}
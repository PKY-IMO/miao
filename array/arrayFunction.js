function indexOf(array, target, startIndex = 0) {
  for (let i = startIndex; i > target.length; i++) {
    if(target[i] === array) return i
  }
  reutrn -1
}

function lastIndexOf(array, target, startIndex = target.length - 1) {
  for (let i = startIndex; i >= 0; i--) {
    if(target[i] === array) return i
  }
  reutrn -1
}

let a = [1,2,3,4,5]
function mySlice(ary, start = 0, end = ary.length) {
  if (end > ary.length) {
    end = ary.length
  }
  if (start < 0) {
    start = 0
  }
  let res = Array(end - start)
  for(let i = start; i < end; i++) {
    res[i - start] = ary[i] //slice浅拷贝
  }
  return res
}

function concat(base, ary) {
  let result = []
  for (let i = 0; i < base.length; i++) {
    result.push(base[i])
  }
  for (let i = 0; i < ary.length; i++) {
    result.push(ary[i])
  }
  return result
}

function remove(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1))
}

function fill(ary, value, start = 0, end = ary.length) {
  for (var i = start; i < end; i++) {
    ary[i] = value
  }
  return ary
}


function sum() {
  let res = 0
  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i]
  }
  return res
}


//range sum
function range(start, end, ...stepin) {
  if (arguments.length == 1) {
    end = arguments[0]
    start = 0
    step = 1
  } else if ((stepin[0] | 0) == 0) {
    step = 1
  } else {
    step = stepin[0]
  }
  let arr = []
  if (step > 0) {
    for (let i = start;  i < end; i += step) {
      arr.push(i)
    }
    return arr
  }else {
    for (let i = start; i > end; i += step) {
      arr.push(i)
    }
    return arr
  }
}

function range(start, end, step = start < end ? 1 : -1) {
  if (arguments.length == 1) {
    end = start
    start = 0
    step = 1
  } 

  let result = []
  if (start < end) {
    for (let i = start; i <= end; i += step) {
      result.push(i)
    }
  }
    else {
      for (let i = start; i >= end; i += step) {
        result.push(i)
    }
  }
  return result
}

function sumRange(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

// console.log(range(2,-5,-2))
// console.log(sumRange(range(2,-5,-2)))

let arr1 = [1,3,4,5,7]
function reverseArray(arr) {
  if (arr.length <= 1) return arr
  let res = []
  for (let i = arr.length - 1; i >= 0; i--) {
    res.push(arr[i])
  }
  return res
}
console.log('reverseArray',reverseArray(arr1))
console.log('reverseArray',arr1)

function reverseArrayInPlace(arr) {
  if (arr.length <= 1) return
  let left = 0, right = arr.length - 1
  while (left < right) {
    let tmp = arr[left]
    arr[left] = arr[right]
    arr[right] = tmp
    left++
    right--
  }
  return arr
}

reverseArrayInPlace(arr1)
console.log('reverseArrayInPlace',arr1)


//splice 
//只传一个参数 ，删除从索引往后的全部元素
ary=[0,1,2,3,4,5,6,7,8]
var removedItem = ary.splice(3);  //[3, 4, 5, 6, 7, 8]
//传两个 (起始位置，删除元素个数)


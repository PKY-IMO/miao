
/**
 * 时间复杂度：O(n * n)
 * 空间复杂度：O(1)
 * 最好：O(n)
 */
function bubbleSort(array) {
  for (var j = 0; j < array.length - 1; j++) {
    var swapped = false
    for (var i = 0; i < array.length - 1 - j; i++) {
      if (array[i] > array[i + 1]) {
        swapped = true
        swap(array, i, i + 1)
      }
    }
    if (!swapped) {
      break
    }
  }
  return array
}

function swap(array, i, j) {
  var t = array[i]
  array[i] = array[j]
  array[j] = t
  return array
}

/**选择排序
 * 时间复杂度：O(n * n)
 * 空间复杂度：O(1)
 */
function selectSort(array) {
  for (var i = 0; i < array.length - 1; i++) {
    var minIdx = i
    for (var j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIdx]) {
        minIdx = j
      }
    }
    swap(array, i, minIdx)
  }
  return array
}

/**
 * 插入排序：将无序部分的第一个数插入到有序部分的正确位置
 * 时间复杂度：O(n*n)
 * 空间复杂度：O(1)
 * 最好：O(n)
 */
function insertSort(array) {
  for (var i = 1; i < array.length; i++) {
    var t = array[i]
    for (var j = i - 1; j >= 0; j--) {
      if (array[j] > t) {
        array[j + 1] = array[j]
      } else {
        break
      }
    }
    array[j + 1] = t
  }
  return array
}

/**
 * 希尔排序：将数组一分为二分别排序，再将两个有序数组合并
 * 时间复杂度：n*log(n)-
 * 空间复杂度：n
 */
 function shellSort(array) {
  for (var step = array.length >> 1; step > 0; step = step >> 1) {
    for (var i = step; i < array.length; i++) {
      var t = array[i]
      for (var j = i - step; j >= 0; j -= step) {
        if (array[j] > t) {
          array[j + step] = array[j]
        } else {
          break
        }
      }
      array[j + step] = t
    }
  }

  return array
}




/**
 * 归并排序：将数组一分为二分别排序，再将两个有序数组合并
 * 时间复杂度：n*log(n)
 * 空间复杂度：n
 */
function mergeSort(array) {
  if (array.length < 2) {
    return array
  }
  var midIdx = array.length >> 1
  var leftArray = array.slice(0, midIdx)
  var rightArray = array.slice(midIdx)
  leftArray = mergeSort(leftArray)
  rightArray = mergeSort(rightArray)

  var i = 0
  var j = 0
  var k = 0
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] < rightArray[j]) {
      array[k++] = leftArray[i++]
    } else {
      array[k++] = rightArray[j++]
    }
  }

  while (i < leftArray.length) {
    array[k++] = leftArray[i++]
  }
  while (j < rightArray.length) {
    array[k++] = rightArray[j++]
  }

  return array
}


/**
 * 快速排序：将数组一分为二分别排序，再将两个有序数组合并
 * 时间复杂度：n*log(n)  最差：n方  
 * 空间复杂度：log(n)
 */

// 1、先从数列中取出一个数作为基准数
// 2、分区过程，将比这个数大的数全放到它的右边，小于或等于它的数全放到它的左边
// 3、再对左右区间重复第二步，直到各区间只有一个数
function quickSort(ary, start, end) {
  if (start >= end) {
      return
  }
  let l= start, r = end;
  let pivot = ary[(start + end) >>1]
  while (l <= r) {
      while (l <= r  && ary[l] < pivot) {
          l++
      }
      while (l <= r && ary[r] > pivot) {
          r--
      }
      if (l <= r) {
          let t = ary[l]
          ary[l] = ary[r]
          ary[r] = t
          l++
          r--
      }
  }
  quickSort(ary, start, r)
  quickSort(ary, l, end)
  return ary
} 


function quickSort2(array) {
  if (array.length < 2) {
    return array
  }
  var randIdx = Math.floor(Math.random() * array.length)
  var randItem = array[randIdx]
  var a = [] // 所有小于randItem的元素
  var b = [] // 所有等于randItem的元素
  var c = [] // 所有大于randItem的元素
  for (var i = 0; i < array.length; i++) {
    if (array[i] < randItem) {
      a.push(array[i])
    } else if (array[i] > randItem) {
      c.push(array[i])
    } else {
      b.push(array[i])
    }
  }
  a = quickSort2(a)
  c = quickSort2(c)

  return a.concat(b, c)
}


// 对数组中start到end（包含）范围内的数执行快速排序
function quickSort(array, start = 0, end = array.length - 1) {
  if (end - start < 1) {
    return array
  }
  var pivotIdx = Math.floor(Math.random() * (end - start + 1)) + start
  var pivot = array[pivotIdx]
  swap(array, pivotIdx, end)
  var i = start
  var j = start
  for (; j < end; j++) {
    if (array[j] < pivot) {
      swap(array, i++, j)
    }
  }
  swap(array, i, end)

  quickSort(array, start, i - 1)
  quickSort(array, i + 1, end)

  return array
}

function quickSort(array, start = 0, end = array.length - 1) {
  if (end - start < 1) {
    return array
  }
  var pivotIdx = Math.floor(Math.random() * (end - start + 1)) + start
  var pivot = array[pivotIdx]

  var i = start
  var j = end

  while(i < j) {
    while(array[i] <= pivot) {
      i++
    }
    while(array[j] > pivot) {
      j--
    }
    swap(array, i, j)
  }

  quickSort(array, start, i - 1)
  quickSort(array, i + 1, end)

  return array
}

function isSorted(array) {
  for (var i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      return false
    }
  }
  return true
}

//不稳定的排序算法 ： 选择，快速,希尔排序，堆排

function countSort(array) {
  let max = array.reduce((prev,item) => item > prev ? item : prev)
  let res = []
  let count = new Array(max + 1).fill(0)
  for (item of array) {
    count[item]++
  }
  for (let i = 0; i < count.length; i++) {
    while(count[i]) {
      res.push(i)
      count[i]--
    }
  }
  return res
}
arr = [2,9,5,7,1,1,6,3,3,4]
let sortArr = countSort(arr)

function isSorted(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] < arr[i]) return false
  }
  return true
}

console.log(isSorted(sortArr))

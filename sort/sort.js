//冒泡排序：从左到右将取出数组中相邻的元素两两比较，逆序则交换
//复杂度O(n*n), 稳定
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let swapped = false
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swapped = true
        arr = swap(arr, j, j + 1)
      }
    }
    if (!swapped) break
  }
  return arr
}
function swap(arr, i, j) {
  let t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
  return arr
}

//选择排序：从左到右，将未排序元素中最小的值放在合适的位置
//不稳定，O(n*n)
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j
        }
    }
    swap(arr, i, min)
  }
  return arr
}

//?插入排序：将元素插入到左侧排序好的元素中的合适位置
//稳定，O(n*n)
function insertSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let t = arr[i]
    for (var j = i - 1; j >= 0; j--) {
      if (arr[j] > t) {
        arr[j + 1] = arr[j]
      } else {
        break
      }
      
    }
    arr[j + 1] = t
  }
  return arr
}

//快速排序：每次随机选取一个基准数，将大于它的元素放在右侧，小于它的元素放在左侧，再依次对左右的数组进行递归
//O(nlogn),不稳定
function quickSort(arr, start = 0, end = arr.length -1) {
  if (start >= end) return 
  let pivotIdx = Math.floor(Math.random()* (end - start + 1) + start)
  let pivot = arr[pivotIdx]
  let l = start, r = end
  while(l <= r) {
    while (l <= r && arr[l] < pivot) l++
    while (l <= r && arr[r] > pivot) r--
    if (l <= r) {
      arr = swap(arr, l, r)
      l++
      r--
    }
  }
  quickSort(arr, start, r)
  quickSort(arr, l, end)
  return arr
}


function isSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] < arr[i]) return false
  }
  return true
}

test =  [2,9,5,7,1,1,6,3,3,4,99,9,0,8,8,7]
//console.log(quickSort(test))
//console.log(isSort(quickSort(test)))

function quickSort2(arr) {
  if (arr.length <= 1) return arr
  let pivotIdx = Math.floor(Math.random()*arr.length)
  let pivot = arr[pivotIdx]
  let a = []
  let b = []
  let c = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) a.push(arr[i])
    else if (arr[i] > pivot) c.push(arr[i])
    else b.push(arr[i])
  }
  a = quickSort2(a)
  c = quickSort2(c)
  return a.concat(b,c)
}

//归并
function mergeSort(arr) {
  if (arr.length <= 1) return arr
  let mid = arr.length >> 1
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  left = mergeSort(left)
  right = mergeSort(right)
  let i = 0, j = 0, k = 0
  while(i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr[k++] = left[i++]
    }else {
      arr[k++] = right[j++]
    }
  }
  while(i < left.length) {
    arr[k++] = left[i++]
  }
  while(j < left.length) {
    arr[k++] = right[j++]
  }
  return arr
} 

//console.log(mergeSort(test))
//console.log(isSort(mergeSort(test)))

function quickSort3(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return
  let pivotIdx = Math.floor(Math.random()*(end - start + 1)) + start
  let pivot = arr[pivotIdx]
  let l = start, r = end
  while( l <= r) {
    while(l <= r && arr[l] < pivot) l++
    while(l <= r && arr[r] > pivot) r--
    if (l <= r) {
      let t = arr[l]
      arr[l] = arr[r]
      arr[r] = t
      l++
      r--
    }
  }
  quickSort3(arr, start, r)
  quickSort3(arr, l, end)
  return arr
}



function insertSort3(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[i]) {
        let t = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = t
      }
    }
  }
  return arr
}
console.log(insertSort3(test))
console.log(isSort(insertSort3(test)))

function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    let t = arr[i]
    arr[i] = arr[min]
    arr[min] = t
  }
  return arr
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr
  let midIdx = arr.length >> 1
  let left = arr.slice(0, midIdx)
  let right = arr.slice(midIdx)
  left = mergeSort(left)
  right = mergeSort(right)
  let i = 0, j = 0, k = 0
  while (i < left.length && j < right.length) {
    if (arr[i] < arr[j]) {
      arr[k++] = arr[i++]
    } else {
      arr[k++] = arr[j++]
    }
  }
  while(i < left.length) {
    arr[k++] = arr[i++]
  }
  while(j < left.length) {
    arr[k++] = arr[j++]
  }
  return arr

}
console.log(mergeSort(test))
console.log(isSort(mergeSort(test)))
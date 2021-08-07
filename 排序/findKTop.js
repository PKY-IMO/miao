//找到最大的第k个数
var findKthLargest = function(nums, k) {
  function quickSort(arr, k, start) {
    if (arr.length <= 1) return arr[0]
    let pivotIdx = arr.length >> 1
    let pivot = arr.splice(pivotIdx, 1)[0]//要把这个数去掉
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i])
      }else {
        right.push(arr[i])
      }
    }
    if ((left.length + start) == k) {
      return pivot
    }else if ((left.length + start) > k) {
      return quickSort(left, k, start)
    }else {
      return quickSort(right, k, left.length + start + 1)
    }
  }
  return quickSort(nums, nums.length - k, 0)
}
// let a = [3,2,3,1,2,4,5,5,6,9]
// console.log(findKthLargest(a,4))


function findKTop(arr, k, start) {
  if (arr.length <= 1) return arr[0]
  let pivotIdx = arr.length >> 1
  let pivot = arr.splice(pivotIdx, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i])
    else right.push(arr[i])
  }
  if ((left.length + start) == k) return pivot
  else if ((left.length + start) > k) return findKTop(left, k, start)
  else return findKTop(right, k, left.length + start + 1)
}
let a = [3,2,3,1,2,4,5,5,6,9]
//console.log(findKTop(a, 9, 0))
//5个数 第1大的数，左边要有4个
function findK(arr, k, start) {
  if (arr.length <= 1) return arr[0]
  let pivotIdx = arr.length >> 1
  let pivot = arr.splice(pivotIdx,1)[0]
  let left = []
  let right = []
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] < pivot) {
      left.push(arr[i])
    }else {
      right.push(arr[i])
    }
  }
  if ((left.length + start) == k) return pivot
  else if ((left.length + start) > k) {
    return findK(left, k, start)
  }else {
    return findK(right, k, start + left.length + 1)
  }
}

//console.log(findK(a, 9, 0))

function mergeSort(arr) {
  if (arr.length < 2) return arr
  let mid = arr.length >> 1
  let leftArr = arr.slice(0, mid)
  let rightArr = arr.slice(mid)
  mergeSort(leftArr)
  mergeSort(rightArr)
  let i = 0
  let j = 0
  let k = 0
  while(i < leftArr.length && j < rightArr.length) {
    if(leftArr[i] < rightArr[j]) arr[k++] = leftArr[i++]
    else arr[k++] = rightArr[j++]
  }
  while(i < leftArr.length) {
    arr[k++] = leftArr[i++]
  }
  while(j < rightArr.length) {
    arr[k++] = rightArr[j++]
  }
  return arr
}

console.log(mergeSort(a))
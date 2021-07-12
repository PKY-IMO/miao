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
    }
    else return quickSort(right, k, left.length + start + 1)
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
console.log(findKTop(a, 10, 0))
function quickSort(arr, start = 0, end = arr.length -1) {
  if (start >= end) return 
  let pivotIdx = Math.floor(Math.random()*start - end + 1) + start
  let pivot = arr[pivotIdx]
  let l = start, r = end
  while(l <= r) {
      while(l <= r && arr[l] < pivot) l++
      while(l <= r && arr[r] > pivot) r--
      while(l <= r) {
          [arr[l], arr[r]] = [arr[r], arr[l]];
          l++
          r--
      }
 }
 quickSort(arr, start, r)
 quickSort(arr, l, end)
 return arr
}
quickSort([15, 5, 524, 684, 69])

function quickSort(arr, start=0, end=arr.length-1) {
  if(start >= end) return 
  let pivotIdx = Math.floor(Math.random()*(end - start + 1)) + start
  let pivot = arr[pivotIdx]
  let l = start, r = end
  while(l <= r) {
    while(l <= r && arr[l] < pivot) l++
    while(l <= r && arr[r] > pivot) r--
    if (l <= r) {
      [arr[l],arr[r]] = [arr[r],arr[l]]
      l++
      r--
    }
  }
  quickSort(arr, start, r)
  quickSort(arr, l, end)
  return arr
}
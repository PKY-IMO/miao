arr = [1,2,3,4,6,6,4,3]
function mergeSort(arr) {
  if (arr.length < 2) return arr
  let mid = arr.length >> 1
  let leftArr = arr.slice(0, mid)
  let rightArr = arr.slice(mid)
  mergeSort(leftArr)
  mergeSort(rightArr)
  let i = 0;
  let j = 0;
  let k = 0;
  while(i < leftArr.length && j < rightArr.length) {
    if(leftArr[i] < rightArr[i]) {
      arr[k++] = leftArr[i++]
    } else { 
      arr[k++] = rightArr[j++]
    }
  }
  while(i < leftArr.length) {
    arr[k++] = leftArr[i++]
  }
  while(j < leftArr.length) {
    arr[k++] = rightArr[j++]
  }
  return arr
  
}
console.log(mergeSort(arr))

let a = new MinPriorityQueue()
a.enqueue(1,1)
a.enqueue(2,2)
console.log(a.dequeue().element)
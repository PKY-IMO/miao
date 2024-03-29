function jsQuickSort(array) {
  if (array.length <= 1) {
      return array;
  }
  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array.splice(pivotIndex, 1)[0];  //从数组中取出我们的"基准"元素
  const left = [], right = [];
  array.forEach(item => {
      if (item < pivot) {  //left 存放比 pivot 小的元素
          left.push(item); 
      } else {  //right 存放大于或等于 pivot 的元素
          right.push(item);
      }
  });
  //至此，我们将数组分成了left和right两个部分
  return jsQuickSort(left).concat(pivot, jsQuickSort(right));  //分而治之
}

const arr = [98, 42, 25, 54, 15, 3, 25, 72, 41, 10, 121];
console.log(jsQuickSort(arr));  //输出：[ 3, 10, 15, 25, 25, 41, 42, 54, 72, 98, 121 ]


function qSort(ary) {
    quickSort(ary, 0, ary.length-1)
    return ary
}


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
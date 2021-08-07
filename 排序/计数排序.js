Array.prototype.countSort = function() {
  let len = this.length
  if (len < 2) {
      return
  }
  // 桶数组
  var suportArr = new Array(len + 1);
  // 结果数组
  var resArr = new Array(len);
  // 初始化桶数组
  for (i = 0; i < suportArr.length; i++) {
      suportArr[i] = 0;
  }
  // 待排序数组中的数组出现，在桶子对应位置+1代表这个数出现的个数+1了
  for (let i = 0; i < len; i++) {
      suportArr[arr[i]]++;
  }
  console.log('1----',suportArr)
   // 从第1项开始，桶数组加上前一个桶的个数，现在辅助数组的意义变成了每一项的排名了。
    for (let i = 1; i < suportArr.length; i++) {
      suportArr[i] += suportArr[i - 1];
    }
  console.log('2----',suportArr)
    // 根据辅助数组的排名，从后往前赋值
    for (let i = len - 1; i >= 0; i--) {
      resArr[suportArr[arr[i]] - 1] = arr[i];
      console.log('*----',resArr)
      suportArr[arr[i]]--;
    }
  console.log('3----',suportArr)
  // 这里this不能直接赋值数组，我们就只能采取splice剪切数组再替换新的
  this.splice(0, this.length, resArr)
}
let arr = [2,9,5,7,1,1,6,3,3,4]
arr.countSort()
console.log("c排序后：", arr.toString())
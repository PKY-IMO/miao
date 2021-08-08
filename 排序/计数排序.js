Array.prototype.countSort = function() {
  let len = this.length
  if (len < 2) {
      return
  }
  // 桶数组
  var suportArr = new Array(len+1);
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


 /*
         * @array 原始数组
         * @step 每个桶的步长：比如step = 3;表示一个桶放连续的3个数字，比如 0,1,2 | 3,4,5 |6,7,8
         * @bucket 二维数组保存数组 
         * @bucketCount 桶的数量
         * @bucketL 每个桶的长度
         * @max 数组最大值
         * @min 数组最小值 
         * @ i 原数组索引
         * @ j 桶的索引
         * @ z bucket的索引
         * @temp 临时保存每一项
         * @newArr 新数组
         */
 function BucketSort(array, step) {
  let temp,
      bucketL = 0,
      bucket = [],
      l = array.length,
      max = Math.max(...array),
      min = Math.min(...array),
      bucketCount = Math.ceil((max - min + 1) / step),
      newArr = [];
  // 入桶
  for (let i = 0; i < l; i++) {
      temp = array[i];
      for (let j = 0; j < bucketCount; j++) {
          // 初始化
          if (!bucket[j]) {
              bucket[j] = [];
          }
          bucketL = bucket[j].length;
          if (temp >= min + j * step && temp <= min + j * step + step - 1) {
              bucket[j].push(temp);
              if (bucketL > 0) {
                  // 桶内排序 插入排序 
                  for (let k = bucketL - 1; k >= 0; k--) {
                      if (temp < bucket[j][k]) {
                          bucket[j].splice(k, 0, temp);
                          bucket[j].splice(k + 2, 1)
                      }
                  }
              }
          }
      }
  }
  // 出桶 
  for(let z = 0 ; z<bucket.length;z++){
      if(bucket[z]){
          newArr.push(...bucket[z])
      }
  }
  return newArr;
}
console.log(BucketSort([ 12, 26, 20, 17, 2,0,2, 7], 4));

 /*
         * @i 原数组索引 
         * @hashIndex hash内键值对的键
         * @countIndex hash内键值对的值
         */
 function CountingSort(array) {
  let hash = {},
      max = array[0],
      newArr = [];
  for (let i = 0; i < array.length; i++) {
      let number = array[i];
      if (hash[number]) {
          hash[number]++
      } else {
          hash[number] = 1;
          if (number > max) {
              max = number
          }
      }
  }
  for (let hashIndex = 0; hashIndex < max + 1; hashIndex++) {
      let count = hash[hashIndex];
      if (count) {
          for (let countIndex = 0; countIndex < count; countIndex++) {
              newArr.push(hashIndex);
          }
      }
  }
  return newArr;
}
console.log(CountingSort([3, 0,4, 1, 5, 6, 8, 1, 5, 4, 9, 5]));
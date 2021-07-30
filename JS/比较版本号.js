// 将输入字符串数组，按照版本号排序，

// 例如：
// 输入：var versions=['1.45.0','1.5','6','3.3.3.3.3.3.3']
// 输出：var sorted=['1.5','1.45.0','3.3.3.3.3.3','6']


var compareVersion = function(version1, version2) {
  let v1 = version1.split('.')
  let v2 = version2.split('.')
  let len = Math.max(v1.length, v2.length)
  for(let i = 0; i < len; i++) {
      let num1 = v1[i] | 0
      let num2 = v2[i] | 0
      if (num1 > num2) return 1
      if (num1 < num2) return -1
  }
  return 0
}


var versions=['1.45.0','1.5','6','3.3.3.3.3.3.3']
versions.sort(compareVersion)
console.log(versions)
// var sorted=['1.5','1.45.0','3.3.3.3.3.3','6']
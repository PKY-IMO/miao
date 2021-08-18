//匹配括号，记录栈的最大长度
 function getDepth(arr) {
      let s = JSON.stringify(arr)// arr.toString()没有[]
      let stack = []
      let res = 0;
      let i = 0;
      while (i < s.length) {
          if (s.charAt(i) == '[') {
              stack.push(s.charAt(i));
              res = Math.max(res, stack.length)
          }else if (s.charAt(i) == ']') {
              stack.pop();
          }
          i++;
      }
    return res
  }

//递归
function getArrayDepth(arr, depth = 1) {
  let max = depth;
  for (const item of arr) {
    let tempIndex = depth
    if (Array.isArray(item)) {
      tempIndex = getArrayDepth(item, depth + 1)
      max = Math.max(tempIndex, max)
    }
  }
  return max
}
ary = [1, [2, [3, [4, 5]]],[8,[5],9],[8,9], 6]
console.log(getDepth(ary))

function getArrayLayer(arr, attr, depth = 1) {
  let max = depth;
  for (const iterator of arr) {
    let tempIndex = depth
    if (iterator[attr]) {
      tempIndex = getArrayLayer(iterator[attr], attr, depth + 1)
      max = Math.max(tempIndex, max)
    }
  }
  return max
}


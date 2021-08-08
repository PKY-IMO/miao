// 用js实现一个随机打乱数组顺序的函数，要求可以设定数组种任意1个元素的位置不变，其他位置的元素位置随机变化。
function shuffle(arr, target) {
  let length = arr.length;
  for (let i = length - 1; i >= 0; i--) {
    if (target == i) continue
    let random = Math.floor(Math.random() * (i + 1)); // 生成起始位置到基准位置之间的随机位置，并将基准从结束位置不停左移。
    [arr[i], arr[random]] = [arr[random], arr[i]]; // 本质为交换元素位置。
  }
  return arr;
}


function shuffle(arr) {
  let length = arr.length;
  for (let i = length - 1; i >= 0; i--) {
    let random = Math.floor(Math.random() * (i + 1)); // 生成起始位置到基准位置之间的随机位置，并将基准从结束位置不停左移。
    [arr[i], arr[random]] = [arr[random], arr[i]]; // 本质为交换元素位置。
  }
  return arr;
}
let arr = Array.from(Array(100), (_, index) => index);
shuffle(arr);
console.log(arr);
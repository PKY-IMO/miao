// 输入
// 1 5
// 10 20
// 输出
// 6
// 30

while(line = readline()){
  var lines = line.split(' ');
  var a = parseInt(lines[0]);
  var b = parseInt(lines[1]);
  print(a + b);
}


let line;
while(line = readline()) {
    let arr = line.split(' ').map(v => +v);
    let sum = 0;
    for(let i = 1; i <= arr[0]; i++) {
        sum += arr[i];
    }
    print(sum);
}

let line;
while(line = readline()) {
    let lines = line.split(' ').map(v => parseInt(v));
    let a = lines[0];
    let b = lines[1];
    if(a == 0 && b == 0) break;
    print(a + b);
}

let nums = parseInt(readline());
while(nums) {
    let lines = readline().split(' ').map(v => +v);
    let sum = 0;
    for(let i = 1; i <= lines[0]; i += 1) {
        sum += lines[i];
    }
    print(sum);
    nums--;
}



// 5
// c d a bb e
// a bb c d e
let n = parseInt(readline());
let arr = readline().split(' ');
// split() 将字符串转换成数组
// join() 将数组转换成字符串
arr.sort();
print(arr.join(' '));
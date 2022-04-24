//总金额为100    最大金额10  最小金额2   要求随机生成15个数   这15个数的总和为100 
/* 金额，最大金额，最小金额，人数 */
let money = 100,
    maxRanDomNum = 15,
    mixRandomNum = 2,
    people = 15;
/* 最终分到的钱 */
let arrMonery = [];

/* 第一步：给15个人分钱 在最小，最大范围内，不管分多还是少 */
for (let index = 0; index < people; index++) {
    const value = randomNum(mixRandomNum, maxRanDomNum);
    arrMonery.push(value);
}

/* 第2步： 分的钱多还是少 ,如果是0 ，刚好分到100元 */
let sumMoney = ArrTotal(arrMonery) - money;
/* 钱大于100 */
if (sumMoney > 0) {
    for (let index = 0; index < sumMoney; index++) {
        const num = parseInt(Math.random() * people);
        //某一个人分到的钱小于mixRandomNum，停止减钱 但是sumMoney要加1
        if (arrMonery[num] == mixRandomNum) {
            sumMoney = sumMoney + 1;
            continue;
        }
        arrMonery[num]--;
    }
}
/* 钱 小于100 */
else if (sumMoney < 0) {
    for (let index = 0; index < sumMoney; index++) {
        const num = parseInt(Math.random() * people);
        //某一个人分到的钱是15元，停止加钱 但是sumMoney要加1
        if (arrMonery[num] == maxRanDomNum) {
            sumMoney = sumMoney + 1;
            continue;
        }
        arrMonery[num]++;
    }
}
/* 打印钱的总和 */
console.log("打印钱的总和 " + ArrTotal(arrMonery));

/* 打印所有分到的钱 */
console.log(arrMonery);

/* 数组之和 */
function ArrTotal(arr) {
    if (!arr instanceof Array) {
        console.error("参数错误，请传入数组");
        return;
    }
    if (arr.length == 0) {
        console.error("数组长度是0");
        return 0;
    }
    return eval(arr.join("+"));
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}



// 10人随机分100
var arr  = new Array(10).fill(0)
for(var i=0;i<100;i++){
  var num = parseInt(Math.random()*10)
  arr[num] ++
}
console.log(arr)
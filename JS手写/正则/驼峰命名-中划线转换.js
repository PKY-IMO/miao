/**
 * 中划线转驼峰
 */
let s1 = "get-element-by-id"; // 转化为 getElementById
console.log(fn(s1));

function fn(str) {
  // 正则带g全局替换， -e -b -i
  return str.replace(/-(\w)/g, (_,e)=>e.toUpperCase())
}



/**
 * 驼峰转中划线
 */

let s2 = 'getElementById'
console.log(fn2(s2))

function fn2(str) {
  return str.replace(/[A-Z]/g, x => '-' + x.toLowerCase())
}

//PascalCaseTest pascalCaseTest pascal_case_test pascal-case-test

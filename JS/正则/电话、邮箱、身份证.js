// 电话
// 11位数字 1开头 后面是345789
let regPhone = /^1[345789]\d{9}$/


//身份证
//15位，18位（xX结尾）
let regID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|x|X)$)/

//邮箱  122_.123 @ qq .com.cm
// _-7yujf@_-7yujf.
let regEmail = /^[\w\.-]+@\w+(\.\w+){1,2}$/
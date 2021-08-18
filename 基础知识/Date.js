d = new Date() //2021-07-28T06:37:46.866Z  可传参

//当前时区
Date() //无视参数
d.toString()  //Wed Jul 28 2021 14:38:48 GMT+0800 (中国标准时间)
d.toLocaleString() // 2021/7/28 下午2:43:31

//年
d.getYear() //121  二位数表示的遗留原因
d.getFullYear() //2021

//月
d.getMonth(); // 返回日期中的月份，其中0表示一月，11表示十二月


//日
d.getDate() //28

//星期
d.getday() //3 0-日

//毫秒数 时间戳
d.getTime() //--基于1970年
Date.now()
d.valueOf();

d2 = new Date(2021, 7, 28) //2021-08-27T16:00:00.000Z 八月

d3 = new Date('2021/07/28') //正确

function fmtDate(obj){
  var date =  new Date(obj);
  var y = date.getFullYear();
  var m = "0"+(date.getMonth()+1);
  var d = "0"+date.getDate();
  return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}




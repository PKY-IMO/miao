let url = 'http://www.domain.com/?user=anonymous&amp;id=123&amp;id=456&amp;city=%E5%8C%97%E4%BA%AC&amp;enabled';
res = parseParam(url);
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/
// 将 ? 后面的字符串取出来
//const paramsStr = /.+\?(.+)$/.exec(url)[1];

function parseParam(url) {
  let paramStr = url.split('?')[1]
  let paramArr = paramStr.split('&amp;')
  let paramObj = {}
  paramArr.forEach(param => { 
    if(/=/.test(param)) {
      let [key, val] = param.split('=')
      // 递归调用解码
      val = decodeURIComponent(val);
      if(paramObj.hasOwnProperty(key)) {
        // 判断是不是数组
        paramObj[key] = [].concat(paramObj[key],val)
      }else {
        paramObj[key] = val
      }
    }else {
      paramObj[param] = true
    }
  });
  return paramObj
}
console.log(res)
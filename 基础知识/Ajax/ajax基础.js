// 异步的JS和XML
// 部分刷新

//ajax请求默认会携带同源请求的cookie，
//而跨域请求则不会携带cookie，
//设置xhr的withCredentials的属性为true将允许携带跨域cookie。

// xhr.onreadystatechange
// 0 UNSENT 未初始化 new XMLHttpRequest 定义但是未初始化
let xhr = new XMLHttpRequest()
// 1 OPENED 载入，调用open完成初始化，并且调用send方法正在发送请求 
xhr.open() 
xhr.send()
// 2 Headers_RECEIVED 载入完成 (send方法执行完毕，接收服务器端的响应数据。但获得的还只是服务端响应的原始数据，)
// 3 LOADING 下正在解析响应内容
// 4 DONE 完成，响应内容解析完成，可以在客户端使用

```
Ajax
如果是同步的方式执行代码，代码一行行执行，到xhr.send()的时候，
代码执行就暂停，漫长地等待着数据的到来，数据到来之后通过 xhr.responseText拿到数据。
设置一个ajax：创建对象——参数设置——发送——数据到来——拿到数据
```

```
可以无刷新页面与服务端进行通信，允许通过用户事件来更新部分页面内容
没有浏览历史、存在跨越问题、SEO不友好
```
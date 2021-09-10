/**
 * 两种声明方式，构造函数转义结果与字面量形式相同
 */
let reg = new RegExp("ab+") //转义结果放入字面量
rg = /ab+/
reg2 = new RegExp("ab\+") 
rg = /ab+/   // abbbb
reg2 = new RegExp("ab\\+")
rg = /ab\+/  //ab+
// 字符串 'fwdaewqabc\+' 存在转义相当于'fwdaewqabc+'
// 'fwdaewqabc\\+' 相当于'fwdaewqabc\+'
```需要转义的字符
[ ] \ ^ $ . | ? * + ( ) { }

```

```简写形式       字符组，只是其中一个字符
\d               [0-9]
\w               [0-9A-Za-z_]
\s               [ \t\n\v\r\f] space,tab,nexline
.                任意符号除了换行 \n   [^]任意符号
\d大写取反        [^0-9] 利用^取反; [.+]代表.+自己;  [\d] 相当于\d
```

```量词
+       [1,]
*       [0,]
?       [0,1]
{n}     [n]
{n,m}   [n,m]
{n,}    [n,]                
-----------------后面加?是惰性匹配
```
//贪婪匹配，尽可能多的匹配
var regex = /\d{2,5}/g;
var string = "123 1234 12345 123456";
console.log( string.match(regex) );  //  ["123", "1234", "12345", "12345"]
//惰性匹配，尽可能少的匹配
var regex = /\d{2,5}?/g;
var string = "123 1234 12345 123456";
console.log( string.match(regex) );   //  多个输出 ["12", "12", "34", "12", "34", "12", "34", "56"]
                                      //  单个输出 [ '12', index: 0, input: '123 1234 12345 123456', groups: undefined ]



```捕获
```
let a = /(fo.)+/.exec('111 foafobfoc 222')
// ['foafobfoc', 'foc'] index:4  单个括号内容出现多次，以最后一次为准

let b = /colo(u)?(r)/.exec('111 color 222')
//  ['color', undefined, 'r']  括号内容一定占位，没有匹配到就是undefined

let c = /(\d{4})-(?:\d{2})-(\d{2}) (\d{2}):(\d{2})/.exec('ada 2020-05-08 14:32 dsa')
//非捕获分组 ['2020-05-08', '2020', '08', '14','32']  '05'没有了
// (?:) 零宽断言 取消计数匹配

let d = /(?<year>\d{4})-(?:\d{2})-(\d{2}) (\d{2}):(\d{2})/.exec('ada 2020-05-08 14:32 dsa')
//具名分组, 将捕获到的值在groups中建立隐射
// d.groups.year //2020

```零宽断言
正：要遇到某种模式 负：不能遇到
预测：向右查找  回顾：向左查找
正预测： (?=foo)
负预测： (?!foo)
正回顾： (?<=foo)
负回顾： (?<!foo)
(?<![^]) 相当于^ (?<!.)
(?![^]) 相当于$
(?<=\w)(?!\w)|(?<!\w)(?=\w) 相当于\b
```

```
/foo/igm
i:忽略大小写
g:全局
m:多行
```
```
replace:用法
replaceAll()传字符串或者带g的正则匹配
replace(/(fo)(.)/, '$1$2$&')
replace(/(fo)(.)/, ($0,$1)=>{return }) 匹配几次，callback执行几次

split()//传正则表达式

str.match(reg) g时返回全部匹配的对象
reg.exec(str)  g时依次返回单一执行的对象
```



//匹配number 带指数和小数
reg = /-?(0|([1-9]\d*))(\.\d+)?(e[+-]?\d+)?/i

//匹配16进制的颜色值 [0-9a-fA-F]
// #ffbbad
// #Fc01DF
// #FFF
// #ffE
var string = "#ffbbad #Fc01DF #FFF #ffE";
let regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g
let regx2 = /#([0-9a-fA-F]{3}){1,2}/g
console.log( string.match(regex) );

//匹配时间
// 23:59
// 02:07
let a = /([0-1]\d|2[0-3]):[0-5]\d/
a = /(0?\d|1\d|2[0-3]):(0?\d|[1-5]\d)/

//匹配日期 比如要求yyyy-mm-dd格式
//2017-06-10
let b = /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/

//匹配id
str = '<div id="container" class="main"></div>'
let c = /id="[^"]*"/
m = c.exec(str)
console.log(m[0])

var regex = /id=".*?"/ //惰性
var string = '<div id="container" class="main"></div>';
console.log(string.match(regex)[0]);
//  id="container"
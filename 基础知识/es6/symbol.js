```
Symbol.for()方法首先在全局Symbol注册表中搜索键为‘uid’的Symbol是否存在，如果存在，直接返回已有的Symbol；
否则，创建一个新的Symbol，并使用这个键在Symbol全局注册表中注册，随机返回新创建的Symbol。
后续如果再传入同样的键调用Symbol.for()会返回相同的Symbol：
还有一个与Symbol共享有关的特性：可以使用Symbol.keyFor()方法在Symbol全局注册表中检索与Symbol有关的键：
```
let uid = Symbol.for('uid');
let uid2 = Symbol.for('uid');
let object = {
     [uid] : '12345' 
} ;
console.log(uid === uid2); //true
console.log(object[uid]);  //12345
console.log(object[uid2]);  //12345
```
强制类型转换会报错
只有在使用逻辑操作符的时候，Symbol可以正常运行，
因为Symbol与JS中的非空值类似，其等价布尔值为true

在使用console.log()方法来输出Symbol的内容时，
它会调用Symbol的String()方法并输出有用的信息。
也可以像下面这样直接调用String()方法来获取相同的内容：
```
let uid = Symbol.for('uid'),
    desc = String(uid);
console.log(desc); //Symbol(uid)

let uidDesc = Symbol.for('uid') + ''; //报错
let uidSum = Symbol.for('uid') /1; //报错
```
Object.keys()和Object.getOwnPropertyNames()方法可以检索对象中所有的属性名：
前一个方法返回所有的可枚举属性名；
后一个方法不考虑属性的可枚举性一律返回。
在ES6中新增一个Object.getOwnPropertySymbols()方法来检索对象中的Symbol属性。
```

```
内置方法
 Symbol.hasInstance
 Symbol.isConcatSpreadable
```

```
原始类型
唯一标识符 nodevalue = document.Element_Node
对象的key
for of迭代使用symbol.iterator
没有自动类型转换 不能new
```

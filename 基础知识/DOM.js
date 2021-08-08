```
document.documentElement  HTML
document 文档节点

childNodes 包括文本节点、Text 和 注释节点
children 只包括元素节点
```

```
DOM属性
nodeName：文档文本注释节点#document #text #comment 
          元素节点大写标签 HTML; 属性节点与标签名一致;
nodeValue：文本属性 是本身，其余null
nodeType： 元素是1,属性是2,文本是3,注释是8,文档是9  
            document.ELEMENT_NODE  document.TEXT_NODE 

//nodeName是node 接口上的property，而tagName是element 接口上的property
```
function traverse(node) {
  if (node.nodeType == document.ELEMENT_NODE){
     console.log(node.tagName)
     for(var child of node.childNodes) {
       traverse(child) 
     }
   }
 }

```
访问 HTML 元素节点
 //getElementsByTagName 查询标签名，返回类数组对象 不区分大小写,输入‘*’返回全部
 //getElementById 查询id属性，返回节点对象
 //getElementsByName 查询name属性，返回类数组对象， HTMLCollection，
 //getElementsByClassName 查询class属性，返回类数组对象

 HTMLCollection是动态对象，会随页面变化而变化

 documents.forms
 documents.styleSheets
 documents.scripts
 documents.links
 documents.images
 documents.all

 css选择器
 querySelector()
 querySelectorAll()
 ```
 function getElementsByTagName(node, tagName) { //得到类数组对象
   let res = []
   for (var child of node.children) {
      if (child.tagName === tagName) {
        res.push(child)   
      }
      res.push(...getElementsByTagName(child, tagName)) //要push啊
   }
   return res
 }

 // 我写的
function getElementById(node = document.documentElement, id) {//得到元素节点
  for (let child of node.children) {
    if (child.id === id) {
      return child
    }else {
      let res = getElementById(child, id)
      if (res) return res
    }
  }
  return null
}

//第一版
function getElementById(id) {
  return find(document.documentElement)
  function find(node) {
    if (node.id == id) {
      return node
    }else {
      for (var child of node.children) {
        var res = find(child)
        if (res) return res
      }
      return null
    }
  }
}

// 遍历dom树，无返回不停止
function traverse(node, action) {
  if (node.nodeType == 1) {
    action(node)
    for (var child of node.children) {
      traverse(child, action)
    }
  }
}

// 遍历dom树，在第一个action返回false停止遍历
function traverse(node, action) {
  if (node.nodeType == 1) {
    if (action(node) === false) {
      return false
    }
    for (var child of node.children) {
      if (traverse(child, action) === false) {
        return false
      }
    }
  }
}

function getElementById(id) {
  var target = null
  traverse(document.documentElement, (node)=>{
    if (node.id === id) {
      target = node
      return false
    }
  })
  return target
}
```操作子元素节点
parentNode.removeChild(childNode)
parentNode.appendChild(childNode) 将已存在的节点插入最后的位置，原来的会消失，只存在一次
parentNode.insertBefore(newNode, baseNode)
parentNode.replaceChild(newNode, oldNode)


append() 传多个参数，文本节点可以不用创建节点
prepend()


normalize() 子元素连续的文本节点合并

$0.before()元素前面添加节点
$0.after()元素后面添加节点
```

function normalize(node) {
  let str = ''
  let arr = Array.from(node.childNodes)
  for (let chid of arr) {
    if (chid.nodeType === 3) {
      str += chid.data
      node.removeChild(child)
    }else {
      if(str) {
        var textNode = document.createTextNode(str)
        node.insertBefore(textNode,child)
      }
      str = ''
    }
  }
  if(str) {
    var textNode = document.createTextNode(str)
    node.appendChild(textNode)
  }
}

function elt(name, attrs = {}, ...childs) {
  var node = document.createElement(name)
  for (let key in attrs) {
    node.setAttribute(key, attrs[key])
  }
  for (let child of childs) {
    node.appendChild(child)
  }
  return node
}

```
标签的属性读取:属于标签的标准属性可以直接点运算符访问
  class $0.className
  label 标签for $0.htmlFor
不标准的属性只能通过getAttribute()访问
$0.getAttribute()

$0.className='foo bar baz'//操作字符串
$0.classList.add('boo')
$0.classList.remove('bar')
$0.classList.toggle('bar')//有就保留无就加
$0.classList.contains('')
$0.classList.replace('','')

href src  $0.src 点运算符可以读到完整路径
$0.getAttribute('src') 只能读到相对路径（显示的值）

input value属性 初始化完成后
getAttribute：读取改变dom中的值
$0.value：实时读取改变input框文本内容

利用dataset给元素添加自定义属性 data-foo-bar
$0.dataset.fooBar = '1'

node.textContent 文本标签拼接得到的内容，赋值纯文本，不受显示状态影响，保留空白
node.innerText  受css影响，受当前元素显示状态影响
node.innerHTML  可以添加html //慢-》快 原型上的getter
node.outerHTML  包含元素自身
```

function getTextContent(node) {
  let str = ''
  if (node.nodeType === 3) return node.data
  for (let child of childNodes) {
    if (child.nodeType === 3) {
      str += child.nodeValue
    }else {
      let res = getTextContent(child)
      if (res) str += res
    }
  }
  return str
}

function getTextContent(node) {
  let str = ''
  if (node.nodeType === 3) return node.data
  else {
    if (node.nodeType === document.ELEMENT_NODE){
      for (let child of node.childNodes) {
          let res = getTextContent(child)
          if (res) str += res
      }
    }
  }
  return str
}

function getTextContent(node) {
  if (node.nodeType == document.TEXT_NODE) {
      return node.data
  } else if (node.nodeType == document.ELEMENT_NODE) {
      return Array.from(node.childNodes).map(getTextContent).join('')
  }
  return ''
}

function getOuterHTML(node) {
  let str = ''
  if (node.nodeType == document.TEXT_NODE) {
    str += node.nodeName
  } else if (node.nodeType == document.ELEMENT_NODE) {
    let arr = Array.from(node.childNodes)
    // for (let item of arr) {
    //   str += '<' + item.nodeName +'>' + getOuterHTML(item) +'</' + item.nodeName +'>'
    // } 外部节点的标签名没加进去
    var tagName = node.tagName.toLowerCase()
    str += '<' + tagName +'>'
    for (let item of arr) {
       str += '<' + item.nodeName.toLowerCase() +'>' + getOuterHTML(item) +'</' + item.nodeName.toLowerCase() +'>'
     } 
    str += '</' + tagName +'>'
  }
  return str
}

function getOuterHTML(node) {
  if (node.nodeType == document.TEXT_NODE) {
      return node.data
  } else if (node.nodeType == document.ELEMENT_NODE) {
      var tagName = node.tagName.toLowerCase()
      var attrNames = node.getAttributeNames()
      var attrs = attrNames.map(name => {
          var val = node.getAttribute(name)
          return name + '="' + val + '"'
      }).join(' ')
      return `<${tagName} ${attrs}>` + Array.from(node.childNodes).map(getOuterHTML).join('') + `</${tagName}>`
  }
}

```
元素css属性获取
style标签有sheet  style.sheet

$0.style.fontSize
$0.style['font-size']

window.getComputedStyle(ele, null) 全部样式，只读 //IE中使用currentStyle代替getComputedStyle
getComputedStyle($0, after) 可以获取伪元素的【样式对象】

css选择器 
querySelectorAll()
querySelector()
1.返回静态集合
2.全局匹配 
3.可以选择伪类，不能选择伪元素
dom伪元素没有对象，不能有对象指向它

matches() 元素是否匹配选择器

```


```
dom尺寸位置相关属性：
滚动：
srollTop scrollLeft 元素【滚动条】到顶部的距离//goTop
偏移量：
offsetLeft offsetTop  左上角相对于定位元素的父元素左上角的偏移量。 相当于定位元素的 left top 属性。
边框：
clientLeft clientTop 元素边框的宽度(粗细) left可加滚动条

元素宽高：
  clientWidth、clientHeight： padding-box - 滚动条（17）可视区域
  scrollWidth、scrollHeight： padding-box - 滚动条 包括隐藏的尺寸
  offsetWidth、offsetHeight： border-box 

DOMRect对象：（只读属性）
  getClientRects() 行内元素根据它换行划分成多个盒子边界矩形
  getBoundingClientRect() 
  返回元素的大小和它相对于视窗的位置，即除了大小（width和height）
  其余的属性都是相对于视窗的左上角位置而言的，
  所以当存在滚动时，位置有可能是负值，。
```
//a节点是否包含b
function contains(a,b) {
  while(b) {
    if (b === a) return true
    b = b.parentNode
  }
  return false
}

// a,b 当传的id
function swapNode(idA, idB) {
  let a = document.getElementById(idA)
  let b = document.getElementById(idB)
  let pA = a.parentNode
  let pB = b.parentNode
  let tmpA = a.cloneNode(true)
  let tmpB = b.cloneNode(true)
  a.before(tmpB)
  b.before(tmpA)
  pA.removeChild(a)
  pB.removeChild(b)
}
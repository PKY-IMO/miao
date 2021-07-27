let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
    name: '姓名',
    age: 18
}
render(template, data); // 我是姓名，年龄18，性别undefined

function render(template, data) {
  // 模板字符串正则，单一
  let reg = /\{\{(\w+)\}\}/
  // 判断模板里是否有模板字符串
  while(reg.test(template)) {
    // 查找当前模板里第一个模板字符串的字段，对应正则表达式()中的内容
    let name = reg.exec(template)[1]
    // 将第一个模板字符串渲染
    template = template.replace(reg, data[name])
  }
  return template
}
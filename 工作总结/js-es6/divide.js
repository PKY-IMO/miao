const fs = require("fs");
const path = require("path");

const res = fs.readdirSync(__dirname);

function traverse(child) {
  const { width, margin, padding } = child.style || {};
  if (width) {
    if (width.value === 0) {
      child.style.width = undefined;
    } else {
      child.style.width = {
        value: width.value,
        unit: width.unit,
      };
    }
  }

  if (margin) {
    Object.keys(margin).forEach((key) => {
      if (margin[key].value === 0) {
        margin[key] = undefined;
      } else {
        margin[key] = {
          value: margin[key].value,
          unit: margin[key].unit,
        };
      }
    });
    if (Object.values(margin).filter((value) => !!value).length === 0) {
      child.style.margin = undefined;
    }
  }

  if (padding) {
    Object.keys(padding).forEach((key) => {
      if (padding[key].value === 0) {
        padding[key] = undefined;
      } else {
        padding[key] = {
          value: padding[key].value,
          unit: padding[key].unit,
        };
      }
    });
    if (Object.values(padding).filter((value) => !!value).length === 0) {
      child.style.padding = undefined;
    }
  }

  if (child.children) {
    child.children.forEach((child) => {
      traverse(child);
    });
  }
}

res.forEach((name, index) => {
  if (name.includes("demo1")) {
    // const pathStr = '/Users/pky/FUI-ES6/fineui/demo/js/base/button/demo.button.js';
    // const fileN = pathStr.substring(pathStr.lastIndexOf('/') + 1);
    // console.log(fileN.startsWith('demo.'));


    const fileName = path.join(__dirname, name);
    console.log(fileName);
    const sourceCode = fs.readFileSync(fileName).toString();
    if (sourceCode.match(/shortcut/g).length > 1) {
        console.log('多个:',sourceCode.match(/shortcut/g).length);
    }
    // const result = /(Demo\.(.*?)\s=\s(BI\.inherit\([^]*?BI\.shortcut(.*)\;))/.exec(sourceCode);
    const result = sourceCode.match(/[\.\s]{1}[^\s\.]+?\s=\sBI\.inherit\([^]*?BI\.shortcut.*\;/g);
    for (let i = 0; i < result.length; i++) {
        // 去除开头的 空格 或者 .
        const newCode = result[i].slice(1);
        // 匹配第一个等号之前的组件名
        const componentName = /BI\.shortcut\("(.*)"/.exec(newCode)[1];
        // 文件名转化 ButtonIcon => demo.button.icon.js
        const demoFileName = componentName + '.js';
        // 代码 componentName 前面加上BI.
        const fileCode = 'BI.' + newCode;
        
        // 规范最后一行的组件为 BI.Button
        const targetComponet = /(BI\..*)\s=/.exec(fileCode)[1];
        // 最后一行的内容
        const replaceContext = /BI\.shortcut.*;/.exec(fileCode)[0];
        // 替换
        const finalCode = fileCode.replace(replaceContext,`BI.shortcut("${componentName}", ${targetComponet});`)

        // 创建新文件
        fs.writeFileSync(demoFileName, finalCode);
    }
  }
});

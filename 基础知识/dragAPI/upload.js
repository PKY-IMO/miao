let ul = document.querySelector('ul')
let pro = document.getElementById('pro')
let proBox = document.getElementsByClassName('pro')[0]
ul.addEventListener('click', function (e){
  if (e.target.tagName === 'DIV') {
    ul.removeChild(e.target.parentNode)
  }
})
let file = document.querySelector('.file')
//input
let myFile = document.querySelector('input')
//input框选择了文件触发change事件
myFile.addEventListener('change', change)
function change() {
  // console.log(this.files)
  for (let item of this.files) {
    if (! /image\/\w+/.test(item.type)) {
      alert('请选择图片')
      return;
    }
    let fr = new FileReader();
    fr.readAsDataURL(item);
    fr.onloadstart = function (e) {
      proBox.style.display = 'block'
      pro.value = 0
      pro.max = e.total
    }
    fr.onprogress = function (e) {
      pro.value = e.loaded
    }
    fr.onloadend = function (e) {
      setTimeout (()=>{proBox.style.display = 'none'},100)

    }
    // load loadstart loadend abort error progress 
    fr.addEventListener('load', () => {
      // console.log(fr.result) base64
      let img = document.createElement('img')
      img.src = fr.result
      let div = document.createElement('div')
      div.classList.add('close')
      div.innerText = 'x'
      let li = document.createElement('li')
      li.append(div)
      li.append(img)
      ul.insertBefore(li,file)
    })
  }
}

//拖拽
//监听document的drop事件——取消其默认行为：在新窗口中打开图片
// document drop事件会触发input的change事件
document.ondragover = function(e){
  e.preventDefault(); //使得drop事件可以触发
}
document.ondrop = function(e){
  e.preventDefault(); //阻止在新窗口中打开图片，否则仍然会执行下载操作！！！
}
//监听input框的drop行为
myFile.addEventListener('dropover', (e) => {
  e.preventDefault()
})
myFile.addEventListener('drop', change2)

//监听ul框 e.dataTransfer
// ul.addEventListener('dropover', (e) => {
//   e.preventDefault()
// })
// ul.addEventListener('drop', change2)

function change2(e) {
  // console.log(this.files)
  console.log('change2')
  for (let item of e.dataTransfer.files) {
    console.log(item)
    if (! /image\/\w+/.test(item.type)) {
      alert('请选择图片')
      return;
    }
    let fr = new FileReader();
    fr.readAsDataURL(item);

    // fr.onload 完成时显示
    fr.addEventListener('load', () => {
      console.log(fr.result)
      let img = document.createElement('img')
      img.src = fr.result
      let div = document.createElement('div')
      div.classList.add('close')
      div.innerText = 'x'
      let li = document.createElement('li')
      li.append(div)
      li.append(img)
      ul.insertBefore(li,file)
    })
  }
}

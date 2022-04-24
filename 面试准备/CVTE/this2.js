function Foo(){
  function getValue(){
      console.log(1)
  }
  return this
}
var getValue
function getValue(){
  console.log(2)
}
Foo.getValue=function(){
  console.log(3)
}
Foo.prototype.getValue=function(){
  console.log(4)
}
getValue=function(){
  console.log(5)
}
Foo().getValue() //5
getValue()  //5
Foo.getValue() //3
new Foo().getValue() //4
new Foo.getValue() //3
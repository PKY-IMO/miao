var a = 99 
fn() 
function fn() {  
  console.log(a)  //undefined
  var a = 10  
  console.log(a)  //10
} 
console.log(a) //99
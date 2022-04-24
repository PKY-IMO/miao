var a = 99 
fn() 
function fn() {  
  console.log(a)  //报错 ReferenceError: Cannot access 'a' before initialization
  let a = 10  
  console.log(a)  
} 
console.log(a) 

const name = 'a' 
class A{     
  constructor() {         
    this.name = 'b'     
  }     
  getName = function() {         
    return this.name     
  } 
} 
const a = new A() 
A.getName() // A.getName is not a function
a.getName() // b



const name2 = 'a' 
class B{     
  constructor() {         
    this.name2 = 'b'     
  }     
  getName() {         
    return this.name     
  } 
} 
const b = new B() 
B.getName() // B.getName is not a function
b.getName() // b
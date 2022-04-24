function compose() {
  const argArr = Array.from(arguments);
  return function fn(args){
    if(typeof args === 'function'){
      argArr.push(args);
      return fn;
    }
    let res = args;
    argArr.forEach((item) => {
      res = item(res);
    });
    return res;
  }
}
f1 = (arr) => arr.reduce((a,b)=>a+b)
f2 = (a) => a*2
f3 = (a) => a+1
f4 = (a) => a*a

let res =compose(f1,f2)(f3)(f4)([1, 2, 3]) //=> f4(f3(f2(f1([1, 2, 3]))))
console.log(res)
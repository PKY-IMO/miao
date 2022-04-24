// 栈
// 输入：tokens = ["2","1","+","3","*"]
// 输出：9
// 解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
var evalRPN = function(tokens) {
  let numarr = []
  let len = tokens.length
  for(let i = 0;i < len; i++){
      if(tokens[i] === '+'){
          let num1 = numarr.pop()
          let num2 = numarr.pop()
          numarr.push(num1+num2)
      }else if(tokens[i] === '-'){
          let num1 = numarr.pop()
          let num2 = numarr.pop()
          numarr.push(num2-num1)
      }else if(tokens[i] === '*'){
          let num1 = numarr.pop()
          let num2 = numarr.pop()
          numarr.push(num2*num1)
      }else if(tokens[i] === '/'){
          let num1 = numarr.pop()
          let num2 = numarr.pop()
          numarr.push(parseInt(num2/num1))
      }else{
          numarr.push(parseInt(tokens[i]))
      }
  }
  return numarr.pop()
}

setTimeout(function() {
  console.log(1);
}, 0);
var promise = new Promise((resolve, reject) => {
  console.log(2);
  resolve();
}).then(() => {
  console.log(3);
})
console.log(4);
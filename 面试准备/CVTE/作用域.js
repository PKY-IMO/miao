var a = 1;
function fnB() {
  var a = 2;
  return () => {
    a++;
    console.log(a);
    fnA();
  };
}
function fnA() {
  console.log(a);
}
fnB()();
var a = 1
function foo() {
    var a = 4
    var o = {
        bar: function() {
            window.a = 99
            console.log(a)
        }
    }
    return o
}

var b = foo()
b.baar = function() {
    console.log(a)
}
b.bar() //99
b.baar() //4
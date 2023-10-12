// 整体代码是一个宏任务，放入到宏任务队列中，进入调用栈执行
console.log(1);  
setTimeout(()=>{
    console.log(2);
    Promise.resolve().then(res => { console.log(3) });
    setTimeout(()=>{  
        console.log(4); 
        Promise.resolve().then(res => { console.log(5) });
    }, 0)
}, 30)

Promise.resolve().then(res=>{ console.log(6) }) 

const fn = async () => {
    console.log(7)  
    // 遇到了await 会等待promise完成，同时交出执行权
    await new Promise((resolve)=>{
        // new Promise 中的代码立即执行
        console.log(8) 
        setTimeout(()=>{
            resolve(); 
            console.log(9)
        }, 20)
    }).then(res => console.log(10));
    console.log(11)
}
// fn执行
fn();

setTimeout(()=>{
    console.log(12); 
    new Promise((resolve) => {
        console.log(13)
        resolve();
    }).then(res => { console.log(14) })
}, 0)
// 打印结果：1 7 8 6 12 13 14 9 10 11 2 3 4 5
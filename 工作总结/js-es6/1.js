export const f1 = (...args) => {
    const [a, b, c] =  args;
    console.log(a, b, c, args.length);
}
export const f2 = (a, b, c, ...args) => {
    // const [a, b, c] =  args;
    console.log(a, b, c, args.length);
}

f1(1,11,111,1111);
f2(1,11,111,1111);
const arr = [23, 45, 22];
let myFunc = (a) => console.log(`too: ${a}`);

const arr2 = [...arr, 55, 98];

myFunc(arr2[1]);

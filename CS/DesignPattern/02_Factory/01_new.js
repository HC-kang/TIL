const num = new Object(42)
const str = new Object('abc')
const lst = new Object([1,2,3])
const dic = new Object({1:1,2:2,3:3})

console.log(num.constructor.name);
console.log(str.constructor.name);
console.log(lst.constructor.name);
console.log(dic.constructor.name);

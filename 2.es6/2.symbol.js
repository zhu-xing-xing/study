// Symbol 独一无二 

let s1 = Symbol('my'); // 描述这个symbol 内部会将描述符 toString
let s2 = Symbol('my');

let obj = {
    [s2]:1 // 如果这个属性是用symbol 来声明的，不可枚举
}
console.log(s1 === s2);

for(let key in obj){
    console.log(obj[key]);
}
console.log(Object.getOwnPropertySymbols(obj)); // Symbol的Object.keys()

// Symbol.for
let s3 = Symbol.for('xxx'); //  如果有这个symbol 并不会重新声明
let s4 = Symbol.for('xxx');
console.log(Symbol.keyFor(s4)); 

// js中原始数据类型 string number boolean null undefined symbol / object


// Symbol 具备着原编程的功能 想改变默认系统级的方法
// 11种
class MyArray {  
    static [Symbol.hasInstance](instance) {
      return Array.isArray(instance);
    }
 }
console.log([] instanceof MyArray);
// 可以做 私有属性 默认js 中没有私有属性


// Symbol 独一无二
// Symbol是由ES6规范引入的一项新特性，它的功能类似于一种标识唯一性的ID。通常情况下，我们可以通过调用Symbol()函数来创建一个Symbol实例。
// 每个Symbol实例都是唯一的,，因为js中没有私有属性，因此可以做私有属性
// 由于Symbol是一种基础数据类型，所以当我们使用typeof去检查它的类型的时候，它会返回一个属于自己的类型symbol
// 传入的描述符会内部被toString，不能传引用类型
let s1 = Symbol('my1'); 
let s2 = Symbol('my2');
console.log(s1 === s2); // false, 与传入的描述符无关
console.log(typeof s1); // symbol


// 在对象中，如果属性是用symbol声明的，那么这个属性不可枚举
// 只有用key...in才可以遍历,（key...in也是唯一可以遍历数组和对象的方法）
// Object.getOwnPropertySymbols(obj) 等价于 Symbol的Object.keys()
let obj = {
  [s1]:'a', // 如果这个属性是用symbol 来声明的，不可枚举
  [s2]:'b',
}
for(let key in obj){
  console.log(obj[key]);
}
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(my1), Symbol(my2) ] 


// Symbol.for 用它声明的变量，如果描述符相同，那么变量不会被重新声明，且两个变量严格模式下相等
let s3 = Symbol.for('xxx'); // 如果有这个symbol 并不会重新声明
let s4 = Symbol.for('xxx');
console.log(Symbol.keyFor(s4)); // 'xxx' 取出描述符:Symbol.keyFor.keyFor()
console.log(s3===s4); // true


// 数据类型是一大块
// js中原始数据类型(内置数据类型):(几种来着?查一下书)
// string number boolean null undefined symbol / object
// 除了object,其他都是基础数据类型
// function和array算是object的子集
console.log(typeof Function()); // function  (特殊)
console.log(typeof Array()); // object
console.log(typeof {}); // object
// ..把书里面的知识总结出来

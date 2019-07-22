// 解构赋值
// 1.结构相同 可以直接通过相同的结构来取值,也可以改别名(name => n)
let { name: n, age } = { name: 'zf', age: 10 };
// 等价于:
// let obj = {name:'zf',age:10};
// let n = obj.name;
// let age = obj.age

// 2.直接取数组的length属性
let { length } = [1, 2, 3];
console.log(length); // 3

// 3.数组省略第一项
let [, age] = ['xxx', 18];
console.log(age); // 18

// 4.对象的展开 ... ,剩余运算符可以在函数中使用也可以在解构中使用
let arr = [1, 2,];
let arr2 = [1, 2, 3, 4];
let arr3 = [...arr, ...arr2]; // [ 1, 2, 1, 2, 3, 4 ]

let obj1 = { name: 'xxx' };
let obj2 = { age: 18 };
let obj3 = { ...obj1, ...obj2 }; // { name: 'xxx', age: 18 }

// 5.剩余运算符只能用在最后一项，有收敛的功能，会把剩下的内容重新组装
let [a, ...args] = ['zxx', 4, 5, 6];
console.log(args); //[ 4, 5, 6 ]
let { name, ...obj } = { name: 'zxx', age: 18 }
console.log(obj);//{ age: 18 }

// 6.将类数组转化成数组的方法
// Array.prototy.call(???)
// Array.from 根据length来遍历获取
// [...{}] 是通过迭代器来实现, ...是迭代器，生成器  // generator 
function toArray() {
    let obj = { ...arguments }; //{ '0': 'url', '1': 'get' }
    console.log([...obj]); // 报错:obj is not iterable, 类数组里面没有迭代器,因此不可以使用...
    // 手动加一个迭代器
    console.log([...{
        0: 'a',
        1: 'b',
        length: 2, // object也有length属性
        [Symbol.iterator]: function* () {
            // yiled 输出值 
            let i = 0;
            while (this.length !== i) {
                yield this[i++]; // {value:0,done:false}
            }
        }
    }]); // {0:'url',1:'get'}
}
toArray('url', 'get');

// Array.from [...{}]区别  Symbol.iterator

// {...obj1,...obj2} 覆盖的作用域
// 自带迭代器的数据类型: array, obj.....查一下???


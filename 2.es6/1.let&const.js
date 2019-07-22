// let const
// 尽可能使用const 如果这个值需要更改才用let

// var的问题
// 1.var 声明的变量 声明到全局 污染全局变量 （函数作用域 全局）
// 2.变量提升 可以在声明之前调用  function  var import
// 3.let const  可以 {} 方式来连用 块作用域
// 4.var  在同一个作用域下 能重复声明

// let a = 1; // es6 环境下会报错
// {
//     console.log(a); // 暂存死区 a is not defined
//     let a = 2;
// }
// console.log(a);

// 把上面的代码转成   babel可以将es6 转化到es5 
// var a = 1; 
// {
//   console.log(_a);
//   var _a = 2;
// }
// console.log(a);


for(var i = 0 ; i< 10;i++){
    // 作用域链
    setTimeout(()=>{
        console.log(i);
    }); // 4ms mdn
}
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout

// 常量
const a = {}; // 深度改变 只要不改变空间即可
a.x = 100;
console.log(a);


// eslint let 自动帮你转化成const 

// 这个空间不销毁 你不知道的javascript



// 时间不填写的时候默认为4ms，但是一般不准确，可以去mdn看一下对此的详细说明
// 链接如下：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout

// 推荐书目：《你不知道的JS》
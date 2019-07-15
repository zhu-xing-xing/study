// Promise 解决的问题
// 1) 回调嵌套 回调地狱
// 2）错误捕获不好处理错误
// 3）多个异步同步的问题 Promise.all
// 还是基于回调的方式的

// Promise是一个类 默认浏览器 高版本 node 都自带了
// es6-promise

// Promise的概念 规范文档 promise A+ 规范
// Promise 三个状态 等待 成功态 失败态
// 只有等待态 才能变成成功 / 失败
// 如果状态变化后不能再修改状态

let Promise = require('./promise')

let p = new Promise((resolve, reject) => {
  // resolve('increment')
  reject('decrement')
})

p.then(
  (value) => {
    console.log('success', value)
  },
  (reason) => {
    console.log('fail', reason)
  }
)
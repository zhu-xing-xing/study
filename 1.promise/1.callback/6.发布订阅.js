// 手写一个简单的发布订阅模式
// 发布emit，订阅on，
// 一个发布emit对应多个订阅on：每次发布，会执行所有的订阅
let fs = require('fs');

class Events {
  constructor() {
    this.stack = [];
  }
  on(callback) {
    this.stack.push(callback)
  }
  emit() {
    this.stack.forEach(func => func())
  }
}

let events = new Events()

events.on(() => {
  console.log('读取完毕')
})

events.on(() => {
  if (Object.keys(school).length === 2) {
    console.log('school:', school)
  }
})

events.on(() => console.log('test'))

let school = {}
fs.readFile('./name.txt', 'utf8', (err, data) => {
  school.name = data
  events.emit()
})

fs.readFile('./age.txt', 'utf8', (err, data) => {
  school.age = data
  events.emit()
})
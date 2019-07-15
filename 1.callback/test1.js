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
events.on(() => console.log('test'))

events.on(() => {
  console.log('读取完毕')
})

events.on(() => {
  if(Object.keys(school).length === 2) {
    console.log('school:', school)
  }
})


let school = {}

fs.readFile('./name.txt', 'utf8', (err, data) => {
  school.name = data
  events.emit()
})

fs.readFile('./age.txt', 'utf8', (err, data) => {
  school.age = data
  events.emit()
})
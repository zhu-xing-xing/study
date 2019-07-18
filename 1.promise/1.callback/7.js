
// 观察者模式基于发布订阅模式
// 被观察者
class Subject {
  constructor(name) {
    this.name = name
    this.stack = []
    this.state = 'happy'
  }
  attach(observer) {  // 把观察者放到被观察者中
    this.stack.push(observer)
  }
  setState(newState) {  // 被观察者更新状态时会告诉观察者更新状态
    this.state = newState
    this.stack.forEach(observer => observer.update(newState, this.name))
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  update(newState, newName) {
    console.log(`${this.name}, ${newName} is ${newState} !`)
  }
}

let observer1 = new Observer('mother')
let observer2 = new Observer('father')
let subject = new Subject('baby')

subject.attach(observer1)
subject.attach(observer2)
subject.setState('cry')
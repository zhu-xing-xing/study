const SUCCESS = 'fulfilled'
const FAIL = 'rejected'
const PENDING = 'pending'

class Promise {
  constructor(executor) { // executor 执行器
    console.log('??executor1', executor) 
    // 初始化promise时传进来的方法
    this.status = PENDING  // 默认是等待态
    this.values = undefined
    this.reason = undefined
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = SUCCESS
        this.value = value
      }
    }
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = FAIL
        this.reason = reason
      }
    }
    executor(resolve, reject);
    console.log('??executor2', executor) 
  }

  then(onFulfilled, onRejected) {
    console.log('?onFulfilled', onFulfilled)
    console.log('?onRejected', onRejected)
    if (this.status === SUCCESS) {
      onFulfilled(this.value)
    }
    if (this.status === FAIL) {
      onRejected(this.reason)
    }
  }
}

module.exports = Promise

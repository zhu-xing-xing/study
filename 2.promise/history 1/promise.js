const SUCCESS = 'fulfilled'
const FAIL = 'rejected'
const PENDING = 'pending'

class Promise {
  constructor(executor) { // executor 执行器
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
  }

  then(onFulfilled, onRejected) {
    if (this.status === SUCCESS) {
      onFulfilled(this.value)
    }
    if (this.status === FAIL) {
      onRejected(this.reason)
    }
  }
}

module.exports = Promise

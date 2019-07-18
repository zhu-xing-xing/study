const SUCCESS = 'fulfilled'
const FAIL = 'rejected'
const PENDING = 'pending'

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = SUCCESS
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = FAIL
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === SUCCESS) {
      console.log('1')

      onFulfilled(this.value)
    }
    if (this.status === FAIL) {
      console.log('2')

      onRejected(this.reson)
    }
    if (this.status === PENDING) {
      console.log('3')
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

module.exports = Promise
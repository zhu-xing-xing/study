let Promise = require('./promise1')
let fs = require('fs');

let p = new Promise((resolve, reject) => {
  fs.readFile('./name.txt', 'utf8', (err, data) => {
    // throw new Error('wrong!')
    if (err) {
      reject(err)
    }
    resolve(data)
  })
})

p.then(
  (value) => {
    console.log('success1', value)
  },
  (reason) => {
    console.log('fail1', reason)
  }
)

p.then(
  (value) => {
    console.log('success2', value)
  },
  (reason) => {
    console.log('fail2', reason)
  }
)
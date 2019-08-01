// fs
// 文件操作  目录操作
// fs.readFile writeFile appendFile
// fs.access / fs.stat  ???
// fs.mkdir(新建文件夹)  fs.rmdir(删除文件夹)
// fs.rname(文件重命名)  fs.unlink(删除单个文件)  
// fs.readdir

const fs = require('fs');
let pathUrl = 'c/b/c/d/e';
// // 1) 同步创建
const mkdirSync = (pathUrl) => {
  let pathArr = pathUrl.split('/');
  for (let i = 0; i < pathArr.length; i++) {
    let current = pathArr.slice(0, i + 1).join('/');
    try {
      fs.accessSync(current) // 判断是否有这个目录, 如果没有走catch中的创建目录
    } catch (e) {
      fs.mkdirSync(current);
    }
  }
}
mkdirSync(pathUrl)

// 异步创建
// const mkdir = (pathUrl, cb) => { // next
//   let pathArr = pathUrl.split('/');
//   function next(index) {
//     // 递归必须要有终止条件
//     if (index === pathArr.length) return cb();
//     let current = pathArr.slice(0, ++index).join('/');
//     fs.access(current, (err, data) => {
//       if (err) {
//         fs.mkdir(current, function () {
//           next(index);// 当前创建完毕后 创建下一次即可
//         });
//       } else { // 如果存在，创建下一层
//         next(index);
//       }
//     })
//   }
//   next(0);
// }
// mkdir(pathUrl, function () {
//   console.log('成功')
// });

// 删除单层目录,多层会报错???
// let path = require('path');
// let arr = fs.readdirSync('c'); // 读取的范围只有一层
// arr = arr.map(dir => path.join('c', dir))
// console.log(arr); //[ 'c/b' ]

// arr.forEach(dir => {
//   let statObj = fs.statSync(dir);
//   if (statObj.isFile()) {
//     fs.unlinkSync(dir); // unlink删除单个文件
//   } else {
//     fs.rmdirSync(dir); // rmdir删除文件夹
//   }
// })
// fs.rmdirSync('c');
// readdir  stat  unlink rmdir
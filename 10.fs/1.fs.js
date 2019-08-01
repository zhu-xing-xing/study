// file system 文件相关的操作都使用fs模块
// 同步的方法 sync 没有sync

// 同步方法的好处 速度快 可以立即拿到返回结果，阻塞主线程
// 异步好处 不会阻塞主线程 callback async + await
const fs = require("fs");
const path = require("path");
const resolve = filename => {
  return path.resolve(__dirname, filename);
};

// 这种读取文件的方式不适合大文件，文件过大 可能会导致淹没可用内存 只适合<64k的文件读取
// 小于64k的
// fs.readFile(resolve('./a.txt'),function(err,data){
//     // 一个文件中可以包含多个编码格式 存储的都是二进制
//     fs.writeFile(resolve('./c.txt'),data,function(err){
//         console.log('拷贝成功')
//     });
// })
// console.log(path.resolve(__dirname)); // process.cwd()

// 读取完毕（部分完毕）后再写入流
// fs.open fs.read fs.write fs.close

// 权限分为 读取:2 写入:4 执行:1  chmod -R 777 *
// 权限分组分为三组: 1)我自己的权限   2)我所在组的权限   3)其它人的权限
fs.open(resolve("a.txt"), "r", function (err, rfd) {
  // file descriptor  文件描述符
  fs.open(resolve("c.txt"), "w", function (err, wfd) {
    // fd: widnow:3开始 mac:20开始   1024
    // 读取和写入是相反的 读取:是往电脑的内存中写入;  写入:读取内存中的数据写到磁盘中
    let buffer = Buffer.alloc(3);
    let roffset = 0; // 读偏移量
    let woffset = 0; // 写偏移量
    let next = () => {
      // rfd:可读流的fd; buffer:表示读取到哪个内存中; 0:从buffer的哪个位置开始读取; 3:表示读取多少个字符; roffset:从文件的哪个位置开始读取
      fs.read(rfd, buffer, 0, 3, roffset, function (err, bytesRead) { //bytesRead:真实读取的个数
        if (err) {

        }
        if (bytesRead === 0) {  // 如果读取的内容为空,说明内容读取结束
          fs.close(rfd, () => { });
          fs.close(wfd, () => { });
          console.log('文件拷贝完毕');
        } else {
          roffset += bytesRead;
          fs.write(wfd, buffer, 0, 3, woffset, function (err, bytesWritten) {
            if (err) {

            }
            woffset += bytesWritten;
            next();
          });
        }
      });
    };
    next();
  });
});
// read write open close
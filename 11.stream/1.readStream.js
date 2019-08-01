// 可以自己实现可读流
// 实现大文件的读取的分割，分段读取
let fs = require('fs');
// 返回的是可读对象
// fs.open fs.read fs.close
let ReadStream = require('./ReadStream')
let rs = new ReadStream('./a.txt', {
    flags: 'r',
    encoding: 'utf8', // 读取到的结果都是buffer类型
    autoClose: true, // fs.close
    start: 0,
    //end:4, // 包前又包后
    highWaterMark: 3  // 每次读取的大小  默认大小64 * 1024
}); // 45 67 89 0  7 2 2 2
// 默认叫非流动模式
// http
let arr = [];
rs.on('error', function (err) {
    console.log(err);
})

rs.on('open', function (fd) {
    // console.log(fd);
})

rs.on('data', function (data) { // newListener type=='data'
    console.log(data);
    arr.push(data);
    rs.pause(); // 暂停读取事件
});

setInterval(() => {
    rs.resume(); // 继续读取事件
}, 1000)

rs.on('end', function () { // newListener type=='data'
    //  console.log( Buffer.concat(arr).toString())
});

rs.on('close', function () {  //监听文件关闭事件
    console.log('close');
})
// 必须要掌握的的方法:
// data / end
// resume pause

// 文件中有close / open
// on("error")
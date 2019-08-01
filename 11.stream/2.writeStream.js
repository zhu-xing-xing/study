const fs = require('fs');

// 如果解决异步并发的问题
let ws = fs.createWriteStream('./a.txt', {
    flags: 'w',
    encoding: 'utf8',
    mode: 0o666, // 16进制 翻译为10进制是:438,一般都写成16进制 或者更全权限的 0o777
    autoClose: true,
    start: 0,
    highWaterMark: 4
});

// 写入内容只能是buffer / string  fs.write
let flag = ws.write('123456', 'utf8', function () {
    console.log('写入成功')
})
console.log(flag) // 返回true/false 是否成功写入

flag = ws.write('55555', function () {
    console.log('写入成功')
})
console.log(flag)

flag = ws.write('6666', function () {
    console.log('写入成功')
})
console.log(flag)

flag = ws.write('7777', function () {
    console.log('写入成功')
})
console.log(flag);

ws.end('ok'); // 遗言
// ws.write('123');// 会报错: write after end 已经结束就不能再写入了

// 64k 写入 发现超过了我的预期，不要在给我了,如果在给我我只能放到内存中

// write end
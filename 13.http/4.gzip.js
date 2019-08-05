// 压缩 转化流
const zlib = require('zlib'); // ???
const fs = require('fs');

// 注意压缩后的文件后缀名: .gz

// 压缩 zlib.gzip()
// gzip 压缩视频 服务器和浏览器说我用了哪种压缩 浏览器会自动解析
let content = fs.readFileSync('./a.txt')
zlib.gzip(content, function (err, data) {
    fs.writeFileSync('c.txt.gz', data)
});

// 解压缩 zlib.unzip()
let content = fs.readFileSync('./c.txt.gz')
zlib.unzip(content, function (err, data) {
    fs.writeFileSync('c.txt', data)
})


const http = require("http");
const url = require("url");

let obj = url.parse("http://jw:12354@www.baidu.com:8000/a?a=1&b=2#app", true);
console.log('obj', obj); // 返回的是一个Url对象,内容如下:
// Url {
//     protocol: 'http:',
//     slashes: true,
//     auth: 'jw:12354',
//     host: 'www.baidu.com:8000',
//     port: '8000',
//     hostname: 'www.baidu.com',
//     hash: '#app',  // #号后是hash值,一般取不到,除非写死
//     search: '?a=1&b=2',
//     query: [Object: null prototype] { a: '1', b: '2' },
//     pathname: '/a',
//     path: '/a?a=1&b=2',  // path请求路径是完整的路径即:端口号之后->到#号之前
//     href: 'http://jw:12354@www.baidu.com:8000/a?a=1&b=2#app'
// }

// 服务器要求必须监听端口和ip地址
const server = http.createServer();
server.on("request", (req, res) => {
    // req 是一个可读流 on('data')
    // res 是一个可写流 write end
    const method = req.method; // 返回请求的方法(注意是大写的!!!) 
    // 路由 根据不同的路径返回不同的内容  路径 查询参数
    // url.parse(path, true)这里的true可以把query转换为对象  
    const { pathname, query } = url.parse(req.url, true); // 常用的是pathname和query对象
    const version = req.httpVersion;
    // ----- 以上请求行信息 ---------

    // ----- 请求头相关的 ------
    console.log(req.headers); // 所有的请求头的key都是小写的, 中间用-隔开

    // 发送的是post(get请求没有请求体) 请求请求体
    let arr = [];
    req.on("data", function (data) { // 读取请求体中的数据
        arr.push(data);
    });
    req.on("end", function () {
        console.log(Buffer.concat(arr).toString());
    });

    // ----- 响应相关的  顺序不能变 statusCode setHeader write end------
    res.statusCode = 404; // 状态码
    res.setHeader("a", 1); // 设置响应头
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    res.write("hello"); // 设置响应体
    res.end("你好"); // end 不调用 请求不结束  一定要有end,否则请求不会停止
});

let port = 8080;
server.listen(port, () => {
    console.log("server start: " + port);
});

// 如果端口号被占用 那么就让port加一,重新启动端口
server.on("error", err => {
    // 重新启动端口
    if (err.code === "EADDRINUSE") { // 端口被占用,会提示code为EADDRINUSE
        server.listen(++port);
    }
});

// nodemon  文件变化可以重启node服务,不需要再手动重启
// sudo npm install nodemon -g
// nodemon 1.http-server.js

const http = require("http");
const querystring = require("querystring"); // querystring.parse把查询字符串转为对象
// 正则匹配实现"a=1&b=2" => {a:1,b:2}
//  /([^=&]+)=([^=&]+)/   要记住!!!

http
  .createServer((req, res) => {
    let arr = [];
    req.on("data", function (chunk) {
      arr.push(chunk);
    });
    req.on("end", function () {
      let buffer = Buffer.concat(arr);
      let r;
      if (req.headers["content-type"] === "application/x-www-form-urlencoded") { // 表单传回的参数是a=1&b=2
        r = querystring.parse(buffer.toString(), "&", "=").b; // 这里的参数默认是:&(两个参数间拼接的字符) =(变量与值之间的字符), 也可以填写为其它
        // "a~1; b~2" => {a:1,b:2}
        // r = querystring.parse(buffer.toString(), "; ", "~").b; // 参数之间是'; ', 变量与值之间'~'
      } else if (req.headers["content-type"] == "application/json") {
        r = JSON.parse(buffer.toString()).a;
      } else {
        r = buffer.toString();
        console.log(decodeURIComponent(r));
      }
      res.setHeader("Content-Type", "text/plain;charset=utf-8"); // 一定要写成"utf-8"形式,IE不识别utf8
      res.end(r + ""); // 返回值转成字符串 + ''
    });
  })
  .listen(3000);

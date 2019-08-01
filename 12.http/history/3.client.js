const http = require("http");
// 中间层 从服务器取值不会跨域  只有浏览器之间才有跨域
// http.get() http.request() http.createServer()    
let client = http.request( // 爬取页面dom元素
  {
    // req
    hostname: "localhost",
    port: 3000,
    headers: {
      a: 1,
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   "Content-Type": "application/json",
      "Content-Type": "text/plain"
    },
    method: "post",
  },
  function (res) {
    res.on("data", function (chunk) {
      console.log(chunk.toString());
    });
  }
);
// 写入一些内容
let r = encodeURIComponent(`你`);
client.write(r); // 为了能发送请求体
client.end();

// 客户端和服务端之间的通信

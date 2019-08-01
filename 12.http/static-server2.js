const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs").promises;
const { createReadStream } = require("fs");
const mime = require("mime");
const chalk = require("chalk"); // 可以改变命令行(打印结果)字体颜色

// process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录，保证了文件在不同的目录下执行时，路径始终不变
// __dirname 是被执行的js文件的地址 ——文件所在目录

// 使用 async和await实现一个Server类,实现启动服务
class Server {
  constructor(config) {
    this.port = config.port || 3000;
    this.cwd = config.cwd || process.cwd();
  }

  async handleRequest(req, res) {
    let { pathname } = url.parse(req.url);
    let filepath = path.join(this.cwd, pathname);
    // 使用async和await所有的错误用一个try catch都能捕获到,避免回调嵌套和各种错误处理
    try {
      let statObj = await fs.stat(filepath); // fs.stat检查文件是否存在,返回一个statObj对象,可继续进行文件操作
      if (statObj.isDirectory()) {
        filepath = path.join(filepath, "index.html");
        await fs.access(filepath); // fs.access只判断文件是否存在(属性\方法),不会继续操作文件;回调返回的err说明不存在(路径或者属性)
      }
      this.sendFile(req, res, filepath);
    } catch (e) {
      this.sendError(req, res, e);
    }
  }

  sendFile(req, res, filepath) {
    res.setHeader("Content-Type", mime.getType(filepath) + ";charset=utf-8");
    createReadStream(filepath).pipe(res);
  }

  sendError(req, res, err) {
    console.log(err);
    res.statusCode = 404;
    res.end("Not Found");
  }

  start() {
    let server = http.createServer(this.handleRequest.bind(this)); // bind方法使this始终为Server的实例
    server.listen(this.port, () => {
      console.log(`
        ${chalk.yellow("Starting up http-server, serving ./")}
        Available on: http://127.0.0.1:${chalk.green(this.port)}
        Hit CTRL-C to stop the server
      `);
    });
  }
}
module.exports = Server;

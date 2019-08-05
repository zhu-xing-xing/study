const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime = require("mime");  // mime可以根据文件后缀返回对应的文件对应的content-type   .html => text/html
http
  .createServer((req, res) => {
    // /static/1.html
    let { pathname, query } = url.parse(req.url, true);
    let absPath = path.join(__dirname, pathname);
    fs.stat(absPath, (err, statObj) => {
      // 静态文件的处理
      if (err) {
        res.statusCode = 404;
        return res.end();
      }
      
      if (!statObj.isFile()) { // 如果是文件夹 需要找文件夹中的index.html
        absPath = path.join(absPath, "index.html");
        fs.access(absPath, function (err) { // fs.access判断目录文件是否存在
          if (err) {
            res.statusCode = 404;
            return res.end();
          } else {
             // mime.getType(absPath)获取对应的Content-Type,并拼接charset
            res.setHeader("Content-Type", mime.getType(absPath) + ";charset=utf-8");
            fs.createReadStream(absPath).pipe(res);  // 双工流, 也可以用readFile???
          }
        });
      } else {
        res.setHeader("Content-Type", mime.getType(absPath) + ";charset=utf-8");
        fs.createReadStream(absPath).pipe(res);
      }
    });
  })
  .listen(3000); // 链式调用 不优雅

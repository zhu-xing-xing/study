// 只要是用户传递的属性 都把它放在实例上   
// 可读流默认叫非流动模式
const fs = require("fs");
// 利用node原生的事件触发器模块(监听器),提供on和emit...
const EventEmitter = require("events");
class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || "r";
    this.encoding = options.encoding || null;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.end = options.end || undefined;
    this.highWaterMark = options.highWaterMark || 64 * 1024;

    this.flowing = null; // 非流动模式  flowing来表明是否读取
    this.close = false;
    // 需要打开文件
    this.open(); // 默认开启文件
    this.pos = this.start;

    this.on("newListener", type => {
      if (type === "data") {
        this.flowing = true; // 已经开始读取文件了
        this.read(); // 开始读取数据
      }
    });
  }

  //暂停读取
  pause() {
    this.flowing = false;
  }

  //继续读取
  resume() {
    if (!this.flowing) {
      // 如果是非流动模式 才需要编程流动模式
      this.flowing = true;
      this.read(); // 再次读取
    }
  }

  //读取 发布订阅
  read() {
    // 读取文件,需要等待触发open事件后在执行, 如果open事件成功,那么fd为20(mac),(window电脑为3);否则fd为undefined
    if (typeof this.fd !== "number") {
      return this.once("open", () => this.read());
    }

    // 读取的时候要看有没有超过end
    // 实际每次读取的内容个数 = 所有要读取的内容个数(this.end - this.start + 1) - 当前的偏移量(this.pos)
    // 如果小于了水位线 说明这次读取的个数不是highWaterMark个
    let howMutchToRead = this.end
      ? Math.min((this.end - this.start + 1) - this.pos, this.highWaterMark)
      : this.highWaterMark;

    let buffer = Buffer.alloc(howMutchToRead);  // alloc(分配)指定要读取得buffer长度
    fs.read(this.fd, buffer, 0, howMutchToRead, this.pos, (err, bytesRead) => {
      // bytesRead 实际读取到的内容长度   只有读取到数据后才发射结果
      if (bytesRead > 0) {
        if (this.flowing) { // 如果是正在读取状态
          this.pos += bytesRead; // 改变偏移量,下次读取的起始位置
          this.emit(
            "data",
            this.encoding ? buffer.slice(0, bytesRead).toString(this.encoding) : buffer.slice(0, bytesRead)
          ); // 截取有效个数
          this.read();
        }
      } else {  // 没有读到内容,说明读取结束了
        this.emit("end");
        if (this.autoClose) {
          fs.close(this.fd, () => {
            if (!this.close) {
              this.emit("close");
              this.close = true;
            }
          });
        }
      }
    });
  }

  // 打开文件
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.emit("error", err);
      }
      this.fd = fd;
      this.emit("open", fd);
    });
  }

  // 双工流 (可读可写)?
  pipe(ws) {
    this.on('data', (data) => {
      let flag = ws.write(data);
      if (!flag) {
        this.pause();
      }
    });
    ws.on('drain', () => {
      this.resume();
    })
  }
}
module.exports = ReadStream;

// events提供的方法 查阅 http://nodejs.cn/api/events.html
// on off once emit newListener  

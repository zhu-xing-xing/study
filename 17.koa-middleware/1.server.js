const Koa = require('koa');
const Router = require('./koa-router'); // 中间件
const router = new Router();
const app = new Koa();
// get post put delete
// 路径参数 * 表示所有路径
router.get('/hello', async (ctx, next) => {
    ctx.body = 'hello';
    next();
})
router.get('/hello', async (ctx, next) => {
    ctx.body = 'hello2';
    next();
})
router.get('/world', async (ctx, next) => {
    ctx.body = 'world';
    next(); // 这个next相当于app.use(router.routes())中的next,会执行下一个use方法
})
// 装载路由
app.use(router.routes()); // 使用中渐渐的方法,挂载到app上   原生提供了一个routes方法,相当于componse
app.use(async ctx => {
    ctx.body = '你好' // 17行的next执行,会覆盖之前的hello/world
})
app.listen(3000);


// csrf xss (获取用户的cookie)
// 钓鱼网站  referer  验证码
// wifi 
// 存到数据库 持久化
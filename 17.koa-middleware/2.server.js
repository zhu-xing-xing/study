const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const rootRouter = new Router(); // 根路由
const userRouter = require('./routes/user');  //子路由文件

// 一个大路由 控制一个小路由  
// router.use() 可以注册二级路由 

// prefix 可以增加前缀  '/user'
rootRouter.use('/user', userRouter.routes()); // 对子路由userRouter,添加前缀路由'user'
app.use(rootRouter.routes()).use(rootRouter.allowedMethods()); // 多层路由的注册写法 allowedMethods
// allowedMethods ???

app.listen(3000);

// npm install -g koa-generator
// koa2 -e project-name
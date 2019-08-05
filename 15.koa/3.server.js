// const Koa = require('koa');
const Koa = require('./koa/application')
const app = new Koa();
const logger = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('hello')
            resolve();
        },2000)
    })
}
app.use( async (ctx,next)=>{
    console.log(1);
    next();
    next();
    console.log(2);
})
app.use(async (ctx,next)=>{
    console.log(3);
    await logger();
    next();
    console.log(4);
})
app.use((ctx,next)=>{
    console.log(5);
    next();
    console.log(6);
});
app.listen(3000);
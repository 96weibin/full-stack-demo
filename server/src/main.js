const koa = require('koa')
const Helmet = require('koa-helmet')
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const koaStaticCache = require('koa-static-cache')
const path = require('path')
const koaJwt = require('koa-jwt');
const jwtError = require('./lib/jwtError')
const jsonWebToken = require('jsonwebtoken')

const mainConfig = require('./conf/mainConfig')
const globalTry = require('./lib/globalTry')
const router = require('./routers')
let app = new koa();

app
    .use(globalTry)
    .use(koaBody())
    .use(Helmet())
    .use(koaStaticCache(path.join(__dirname,'./assets'),{
        maxAge:'60 * 60 * 24',
        gzip:true
    }))
    .use(cors({
        origin:mainConfig.feOrigin
    }))
    .use(jwtError)                  //jwt 错误处理函数
    .use(koaJwt({sercet:mainConfig.jwtSecret}).unless({path:[/^\/public/]}))       //公共路径 不需要验证token
    .use(router())                             

let port = 8888;
app.listen(port);
console.log(`listen to ${port}`)
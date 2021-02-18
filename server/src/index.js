const koa = require('koa')
const Helmet = require('koa-helmet')
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const koaStaticCache = require('koa-static-cache')
const path = require('path')

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
        origin:'http://localhost:8080'
    }))
    .use(router())

let port = 8090;
app.listen(port);
console.log(`listen to ${port}`)
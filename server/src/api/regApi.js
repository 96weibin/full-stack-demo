const Router = require('@koa/router')
const regController = require('../controller/regController')

let router = new Router()
let routerPub = new Router()


routerPub.prefix('/public')
routerPub.post('/reg',regController.reg)



module.exports = [
    router,
    routerPub
]
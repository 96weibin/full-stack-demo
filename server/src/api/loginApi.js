const Router = require('@koa/router')
const captchaController = require('../controller/captchaController')
const emailController = require('../controller/emailController')
const loginController = require('../controller/loginController')


let router = new Router()
let routerPub = new Router()


routerPub.prefix('/public')
routerPub.get('/captcha',captchaController.getCaptcha)
routerPub.post('/sendMail',emailController.sendMail)
routerPub.post('/login',loginController.login)

module.exports = [
    router,
    routerPub
]
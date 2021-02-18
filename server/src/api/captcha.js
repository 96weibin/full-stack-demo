const Router = require('@koa/router')
let captchaController = require('../controller/captchaController')

let router = new Router()
router.get('/captcha',captchaController.getCaptcha)



module.exports = router
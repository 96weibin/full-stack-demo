const Router = require('@koa/router')
const emailController = require('../controller/emailController')

let router = new Router()
router.allowedMethods()
router.post('/sendMail',emailController.sendMail)

module.exports = router
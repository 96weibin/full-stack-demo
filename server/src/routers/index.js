const koaCombineRouters = require('koa-combine-routers')
const captchApi = require('../api/captcha')
const emailApi = require('../api/email')

const router = koaCombineRouters(
    captchApi,  //验证码
    emailApi    //邮件
)
module.exports = router
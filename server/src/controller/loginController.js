const { getValue,getHValue,setValue} = require('../lib/redis')
const jsonWebToken = require('jsonwebtoken')
const mainConfig = require('../conf/mainConfig')
const usersModel = require('../model/User')

let login = async (ctx,next)=>{
    //
    console.log(ctx.request.body)
    let {username,password:fePass,captcha,sid} = ctx.request.body;
    // redis验证 验证码
    let captchaOk = await checkCaptch (sid, captcha)
    if(captchaOk){
        //mongo username取password
        let {password:mongoPass} = await usersModel.findOne({username}) || {};
        if(mongoPass === fePass){
            let token = jsonWebToken.sign({foo:'bar'},mainConfig.jwtSecret,{expiresIn:'1h'})
            ctx.body = {
                code : 0,
                msg:'登录成功',
                token       //返回token
            }
        } else {
            ctx.body = {
                code:1,
                msg:"用户名或密码错误"
            }
        }
    } else {
        ctx.body = {
            code : 1,
            msg : '验证码有误 或过期'
        }
    }
}
//验证  验证码
async function checkCaptch (sid, captcha){
    let code = await getValue(sid)
    if(code){
        if(code.toUpperCase() === captcha.toUpperCase()){
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}


module.exports = {
    login,
}
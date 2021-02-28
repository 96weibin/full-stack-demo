const svgCaptcha = require('svg-captcha')
const url = require('url')
const {setValue} = require('../lib/redis')

let getCaptcha = (ctx,next)=>{ //生成验证码
    let sid = url.parse(ctx.request.url,true).query.sid
    let c = svgCaptcha.create({
        size:5,
        ignoreChars: '0o1i',
        noise: Math.floor(Math.random() * 5),
        color:true,
        height:40
    });
    setValue(sid,c.text,10 * 60) //10分钟超时  存入redis
    ctx.response.body={
        type:200,
        data:c.data
    }
}
module.exports = {
    getCaptcha
}
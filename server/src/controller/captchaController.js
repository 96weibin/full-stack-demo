const svgCaptcha = require('svg-captcha')

let getCaptcha = (ctx,next)=>{ //生成验证码
    let c = svgCaptcha.create({
        size:5,
        ignoreChars: '0o1i',
        noise: Math.floor(Math.random() * 5),
        color:false,
        height:40
    });
    ctx.response.body={
        type:200,
        ...c
    }
}
module.exports = {
    getCaptcha
}
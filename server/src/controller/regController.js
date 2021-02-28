const { getValue,getHValue,setValue} = require('../lib/redis')
const usersModel = require('../model/User')

let reg = async (ctx, next)=>{
    console.log(ctx.request.body)
    let code = 0;
    let msg = '';
    let {email,mailCode,password,username} = ctx.request.body;
    console.log(email,mailCode,password,username)
    if(!email || !mailCode || !password || !username){
        code = 1;
        msg = '缺少参数'
    } else {
        let redisCode =  await getValue(email)
        console.log(redisCode,mailCode)
        if (redisCode != mailCode){
            code =  1;
            msg = "邮箱验证码有误 或过期"
        } else {
            let res = await usersModel.find({'email':email});
            if(res.length){
                code = 1;
                msg = "此邮箱已注册,请找回密码"
            } else {
                let res = await usersModel.find({'username':username})
                console.log(res)
                if(res.length){
                    code = 1;
                    msg = "用户名已存在,请重试其他用户名"
                } else {
                    let newUser = new usersModel({
                        username,
                        password,
                        email,
                        valid:1,
                    })
                    let res = await newUser.save()
                    if(res){
                        msg = "注册成功"
                    } else {
                        code = 1;
                        msg = '数据库操作错误'
                    }
                }
            }
        }
    }
    console.log(code,msg)
    ctx.body = {
        code,
        msg
    }
}

module.exports = {
    reg
}
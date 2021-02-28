const nodemailer = require('nodemailer')
const mailConfig = require('../conf/mailConfig')
const {setValue} = require('../lib/redis')

// let mailInfo = {
//   title:'认证邮件',
//   to:"1643960119@qq.com",
//   subject:'迪拜私人酒会邀请函',
//   text:'迪拜首富邀您共享晚餐,邮轮旅行,携手共建世界最大xxxxxxxx',
//   // html:`<h1>联系电话：0000-0000000<h1>`
// }


async function sendMail(ctx,next) {
  let round = Math.floor(Math.random() * 100000).toString()
  let mailInfo = {
    title:'认证邮件',
    to:"1643960119@qq.com",
    subject:'邮箱验证码',
    text:'邮箱验证码为' + round,   //4位数随机验证码
    // html:`<h1>联系电话：0000-0000000<h1>`
  }
  mailInfo.to = ctx.request.body.to;
  // console.log(mailInfo)
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.qq.com",
      secureConnection : true, 
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: mailConfig.user, // generated ethereal user
        pass: mailConfig.pass, // generated ethereal password
      },
    });
    let info = await transporter.sendMail({   //info  不能判断邮箱是否存在，发送后可能被退回
      from: `"${mailConfig.name}" <${mailConfig.user}>`, // sender address
      to: mailInfo.to, // list of receivers
      subject: mailInfo.subject, // Subject line
      text: mailInfo.text, // plain text body
      html: mailInfo.html, // html body
    });
    //缓存 邮箱对应验证码10分钟
    setValue(mailInfo.to, round, 60 * 10)
    ctx.body = {
      code:0,
      msg : 'email send success!'
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sendMail
}


# 全栈项目

## 前端

### 技术栈 

1. ui框架选型  ：  element ui

    - 主页
        1. 公共头尾 、登录、注册模块组件化加载
        2. 布局 、 容器   进行页面布局
        
    - 登录组件
        1. element from
        2. element ui 验证填写



    
2. 前端框架选型 ： vue

    - store
    - axios     fetch太难用了
    - router
    - 主页不需要的组件   异步加载


# koa

1. [nodemailer](https://www.npmjs.com/package/nodemailer)    发送邮件

    - 获取QQ邮箱授权码  gyzuxycfdsprjiag
    - 修改配置
        参数|值
        -|-  
        host | smtp.qq.com
        port | 587
        user | QQ号码
        pass | qq邮箱授权码
    - 重写邮件
    
        text body  和 html body 二选一
    
2. [svgcaptcha](https://www.npmjs.com/package/svg-captcha)     生成验证码
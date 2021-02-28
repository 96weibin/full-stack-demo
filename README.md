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

    - store     存储 sid
    - axios     fetch太难用了
    - router    
    - 主页不需要的组件   异步加载

3. 模块概述

    - 验证码 验证
        1. mounted uuid v4生成sid 存储在localstorage和store
        2. mounted getCaptcha时   将sid  传进后台  
        3. new captcha 的 text 和 sid 作为 v-k 存入redis 定时清除
        4. 仅将 captcha 生成的svg验证码返回前端
        3. login、验证captcha 时  从redis 读 sid 对应的text 与前台传来的验证比对

    - axios 封装
        1. create({config})  配置baseURL等
        2. 拦截器 错误处理

    - 登录鉴权
        1. koa-jwt 配置 错误处理、保护&不保护的 router
        2. /public/login 登录验证 get mongo  
        3. jsonwebtoken  生成 token 登录成功返回给前端
        4. 登录后  前端访问保护router   添加请求头 
        5. 后台验证  token   


## 后端

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

3. redis 

    - 缓存 sid 验证码    登录验证
    - 缓存 邮箱验证码     

4. jwt 

    - koa-jwt    配合 router 对路由进行  token验证保护
    - jsonwebtoken   生成、解析token

5. mongo





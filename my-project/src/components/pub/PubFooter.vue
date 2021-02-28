<template>
    <div class="footer">
        © 2011~2021 北京品新传媒文化有限公司 | 京ICP备12031756号 | 京ICP证150143号 | 京公网安备11010802020581号
        <br>
        主要功能：登录 注册 邮箱验证 鉴权
        <br>
        技术栈： elementui， vue， router， axios， koa，jwt，nodemailer   mongoose， redis， 
    </div>
</template>

<script>
    export default {
        name:'PubFooter'
    }
</script>

<style lang="less" scoped>
    .footer{
        display: flex;
        width: 100%;
        height: 100%;
        background: #455055;
        font-size: 12px;
        color: #729487;
        justify-content: center;
        align-items: center;
    }
</style>
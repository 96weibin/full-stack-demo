<template>
  <div class="home">
    <el-container>
      <el-header>
        <PubHeader />
      </el-header>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in msgs" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <el-footer>
        <PubFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<script>

import PubHeader from "@/components/pub/PubHeader.vue"
import PubFooter from "@/components/pub/PubFooter.vue"
export default {
  name: 'Home',
  data() {
    return {
      activeName: 'login',
      msgs:[
        '模块化 公共头尾',
        'elementui 布局、表单验证',
        'uuid 关联用户',
        'captcha 生成验证码',
        'redis缓存 uuid ---- 验证码',
        '注册邮箱验证',
        'mongoose 存储用户信息',
        'jwt登录鉴权',
        
      ]
    }
  },
  mounted() {
    //判断是否登录
    if(!localStorage.getItem('token')){
      this.$router.push('login')
    }
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        if(tab.name === 'login'){
          this.$router.push('login')
        } else if(tab.name === 'reg'){
          this.$router.push('reg')
        }
      }
  },
  components: {
    PubHeader,
    PubFooter,
  }
}
</script>

<style lang="less" scoped>
  .el-container{
    background: #F2F6FC;
    .el-header{
      background: #EBEEF5;
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
    
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
    .el-footer{
      background: #E4E7ED;
    }
  }
</style>
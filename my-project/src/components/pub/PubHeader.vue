<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <a href="./Login" target="_blank">登录-TEST</a>
      </el-menu-item>
      未登录 首页自动跳转到 Login <br>
      登录了则不能跳转到login  
      <el-menu-item style="float:left" index="4" v-if="allredyLogin">登出</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  computed:{
    allredyLogin(){
      return localStorage.getItem('token')
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(typeof key, keyPath);

      if(key === "4"){
        localStorage.removeItem('token')
        location.reload()
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
<template>
  <div class="login">
    <el-container>
      <el-header>
        <PubHeader />
      </el-header>
      <el-main>
        <el-row type="flex" justify="center">
          <el-col :span=13 style="minHeight:600px" >
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
              <el-tab-pane label="登录" name="login">
                <Login />
              </el-tab-pane>
              <el-tab-pane label="注册" name="reg">
                <Reg />
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <PubFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<script>

import PubHeader from "@/components/pub/PubHeader.vue"
import PubFooter from "@/components/pub/PubFooter.vue"
import Login from '@/components/Login.vue'
export default {
  name: 'login',
  mounted() {
  },
  data() {
    return {
      
    }
  },
  computed: {
    activeName:{
        set: ()=>{

        },
        get(){
            return this.$store.state.activeName
        }
    }
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        if(tab.name === 'login'){
            this.$store.commit('setActiveName','login')
        } else if(tab.name === 'reg'){
            this.$store.commit('setActiveName','reg')
        }
      }
  },
  components: {
    PubHeader,
    PubFooter,
    Login,
    Reg:()=>import ('@/components/Reg.vue')
  }
}
</script>

<style lang="less" scoped>
  .el-container{
    background: #F2F6FC;
    .el-header{
      background: #EBEEF5;
    }
    .el-footer{
      background: #E4E7ED;
    }
  }
</style>
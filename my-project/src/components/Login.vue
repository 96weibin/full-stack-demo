<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="80px" @submit.native.prevent>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" placeholder="请输入密码" type="password" clearable  auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input v-model="form.captcha" placeholder="请输入验证码" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <div class="captacha" v-html="svgCaptcha" @click="getCaptcha"></div>
    </el-form-item>
    <el-form-item>
      <el-checkbox   v-model="rememberPassword" label="1">记住密码</el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="submitForm('form')">立即登录</el-button>
      <el-button>忘记密码</el-button>
    </el-form-item>
    <el-alert
      v-if="loginError" 
      :title="loginErrorMsg"
      type="warning"
      show-icon>
    </el-alert>

  </el-form>
</template>

<script>
import loginApi from "../api/loginApi";
import {v4} from "uuid"
export default {
  name: "Login",
  data() {
    //自定义校验
    // var validateCaptcha = (rule, value, callback) =>{   
    //   if(value == ''){
    //     callback(new Error('请输入验证码'))
    //   } else if (this.form.captcha.toUpperCase() != this.captchaText.toUpperCase()) {
    //     callback(new Error('请输入正确验证码'))
    //   } else {
    //     callback()
    //   }
    // };
    return {
      svgCaptcha:'',
      loginError:'',
      loginErrorMsg:'',
      rememberPassword:false,
      form: {
        username: "",
        password: "",
        captcha :''
      },
      rules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // { validator: validateCaptcha, trigger:'blue'}
        ],
      }
    };
  },
  mounted() {
    let localSid = localStorage.getItem('sid')
    if(localSid){
      this.$store.commit('setSid',localSid)
    } else {
      this.$store.commit('setSid',v4())
      localStorage.setItem('sid',this.$store.state.sid)
    };
    this.getCaptcha();

    let token = localStorage.getItem('token')
    if(token){
      this.$router.push('/')
    }
  },
  methods: {
    async getCaptcha() {
      try {
        let res = await loginApi.getCaptcha()
        if (res.type === 200) {
          this.svgCaptcha = res.data;
          // this.captchaText = res.text;
        }
      } catch (error) {
        console.log(error)
        alert("获取验证码失败");
      }
    },
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async submit() {
      // 发送
      let res = await loginApi.postLogin(this.form);
      console.log(res.code)
      if(res.code){ //有问题
        this.loginError = 1;
        this.loginErrorMsg = res.msg 
      } else {  //登录验证成功
        //将token 存入localstorate
        localStorage.setItem('token',res.token);
        //跳转到主页
        // alert('登录成功')
        this.$message({
          message: '恭喜你，登陆成功',
          type: 'success'
        });
        this.$router.push('/')
      }
    },
  },
};
</script>

<style lang="less" scoped>

</style>
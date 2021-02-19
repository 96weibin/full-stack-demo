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
      <el-button type="primary" @click="submitForm('form')">立即登录</el-button>
      <el-button>忘记密码</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Login",
  
  data() {
    var validateCaptcha = (rule, value, callback) =>{
      if(value == ''){
        callback(new Error('请输入验证码'))
      } else if (this.form.captcha.toUpperCase() != this.captchaText.toUpperCase()) {
        callback(new Error('请输入正确验证码'))
      } else {
        callback()
      }
    };
     
    return {
      svgCaptcha:'',
      captchaText:'',
      rememberPassword:false,
      form: {
        username: "",
        password: "",
        captcha :''
      },
      ruleForm2: {
        pass: '',
        checkPass: '',
        age: ''
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
          { validator: validateCaptcha, trigger:'blue'}
        ],
      }
    };
  },
  mounted() {
    this.getCaptcha();
  },
  methods: {
    async getCaptcha() {
      try {
        let res = await (
          await fetch("http://192.168.1.230:8090/captcha")
        ).json();
        console.log(res.type);
        if (res.type === 200) {
          this.svgCaptcha = res.data;
          this.captchaText = res.text;
        }
      } catch (error) {
        alert("获取验证码失败");
      }
    },
    async submitForm(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },

    submit() {
      // 发送
      console.log(this);
      $.ajax({
        url: "http://192.168.1.230:8090/login",
        method: "post",

        dataType: "json",
        data: {
          user: this.user,
          pass: this.pass,
        },
      });
      // fetch('http://192.168.1.230:8090/login',{
      //   method:'POST',
      //   body:JSON.stringify({
      //     user:this.user,
      //     pass:this.pass
      //   }),
      //   headers: new Headers({
      //     'Content-Type': 'application/json'
      //   })
      // })
    },
  },
};
</script>

<style lang="less" scoped>

</style>
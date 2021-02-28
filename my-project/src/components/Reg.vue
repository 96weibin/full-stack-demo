<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="80px">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" clearable></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" clearable></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" clearable></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input v-model="form.password2" type="password" clearable></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="mailCode">
      <el-col :span="14">
        <el-input v-model="form.mailCode" clearable></el-input>
      </el-col>
      <el-col :span="10">
        <el-button
          type="info"
          @click="sendMail"
          plain
          :disabled="getMailCode"
          >{{ sendCodeMsg }}</el-button
        >
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
    <el-alert
      v-if="regError" 
      :title="regErrorMsg"
      type="warning"
      show-icon>
    </el-alert>
  </el-form>
</template>

<script>
import regApi from '@/api/regApi'

export default {
  name: "Reg",
  data() {
    let validatePassword = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (this.form.password != this.form.password2) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    let validatemailCode = (rule, value, callback) => {
      if (this.validType === "submit") {
        //submit  需要判断  是否已经发送邮件、邮件是否有效
        if (!this.getMailCode) {
          callback(new Error("请点击 ‘发送验证码’ 获取验证码"));
        } else if (!this.form.mailCode) {
          callback(new Error("请填写邮箱收到的验证码"));
        } else {
          callback();
        }
      } else if (this.validType === "sendMail") {
        callback();
      }
    };
    return {
      regError:false,
      regErrorMsg:'',
      getMailCode: false,
      validType: "",
      sendCodeMsg: "发送验证码",
      form: {
        email: "",
        username: "",
        password: "",
        password2: "",
        mailCode: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入注册邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", required: true },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        password2: [{ validator: validatePassword, trigger: "blur" }],
        mailCode: [{ validator: validatemailCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    sendMail() {
      this.getMailCode = true;
      this.validType = "sendMail";
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.postMail();
        } else {
          this.getMailCode = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    async postMail() {
      //
      let res = await regApi.getMailCode(this.form.email)
      if(res.code === 0) {
        let t = 60;
        let sMsg = setInterval(() => {
          this.sendCodeMsg = `发送验证码（${t}s）`;
          t--;
        }, 1000);
        setTimeout(() => {
          this.getMailCode = false;
          clearInterval(sMsg);
          this.sendCodeMsg = `发送验证码`;
        }, 1000 * t);
      } else {
        this.regError = true;
        this.regErrorMsg = '验证码发送失败,请检查邮箱是否正确'
      }
    },
    submitForm(formName) {
      this.validType = "submit";
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let res = await regApi.postReg(this.form);
          console.log(res)
          if(res.code){
            this.regError = true;
            this.regErrorMsg = res.msg
          } else {
            //跳转到登录页面
            this.$message({
              message: '恭喜你，注册成功，请登录',
              type: 'success'
            });
            this.$store.commit('setActiveName','login')
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  background: #eee;
}
</style>
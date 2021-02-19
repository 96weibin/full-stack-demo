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
    <el-form-item label="验证码">
      <el-col :span=17>
        <el-input v-model="form.maillCode" clearable></el-input>
      </el-col>
      <el-col :span=7>
        <el-button type="info" @click="sendMail" plain>发送验证码</el-button>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"  @click="submitForm('form')">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name:'Reg',
        data() {
          var validatePassword = (rule, value, callback)=>{
            if(value == ''){
              callback(new Error('请再次输入密码'))
              console.log('hhh')
            } else if (this.form.password != this.form.password2) {
              callback(new Error('密码不一致'))
            } else {
              callback()
            }
          };
          return {
            form: {
              email: '',
              username: '',
              password: '',
              password2: '',
              maillCode:''
            },
            rules:{
              email:[
                { required: true, message: '请输入注册邮箱', trigger: 'blur' },
                { type: 'email', message: '邮箱格式不正确',  required: true},
              ],
              username:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
              ],
              password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
              ],
              password2:[
                { validator: validatePassword, trigger:'blue'}
              ]
            }
          }
        },
        methods: {
          sendMail(){
            // this.$refs['form'].validate((valid) => {
            //   if(valid){
            //     this.postMail()
            //   } else {
            //     console.log('error submit!!');
            //     return false;
            //   }
            // });
                this.postMail()
          },
          async postMail(){

            let data = JSON.stringify({to:this.form.email});

            // this.axios.post('http://127.0.0.1:8090/sendMail',{
            //   data:{
            //     to:'1643960119@qq.com',
            //   }
            // })
            let res = await (await fetch('http://127.0.0.1:8090/sendMail',{
              method:'post',
              body:data,
              headers: new Headers({
                'Content-Type': 'application/json'
              })
            })).json()
            console.log(res)
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
        },
    }
</script>

<style lang="less" scoped>
.container{
    background: #eee;
}
</style>
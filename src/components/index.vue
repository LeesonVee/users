<template>
  <div>
    <el-row>
      <el-col :span="24">&nbsp;</el-col>
    </el-row>
    <el-row>
      <el-col :span="10">&nbsp;</el-col>
      <el-col :span="4">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="form.pwd" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
    import {hex_md5} from '@/assets/js/md5.js';
    export default {
      name: "index",
      data () {
        return {
          form:{
            name:'',
            pwd:''
          },
          rules: {
            name: [
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            pwd: [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ]
          }
        }
      },
      methods:{
        onSubmit:function(formName){
          let me = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let pwd = hex_md5(this.form.pwd);
              this.$http.post(process.env.API_ROOT+'logon.json', {
                username: this.form.name,
                password: pwd
              }).then(result => {
                if(result.status===200){
                  let body = result.body;
                  if(body.data){
                    me.myMessage('success','验证成功');
                    me.$router.push({path:'/Main2'})
                  }else{
                    me.myMessage('error','验证失败')
                  }
                }
              });
            }else{
              me.myMessage('warning','请输入用户名和密码')
            }
          });
        },
        myMessage:function(type,msg){
          this.$message({
            type:type,
            message:msg
          });
        }
      }
    }
</script>

<style scoped>

</style>

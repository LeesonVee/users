<template>
  <el-container>
    <el-header></el-header>
    <el-main class="main">
      <h1>用户中心</h1>
      <el-form ref="form" :model="form" class="z-depth-2">
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
  import {hex_md5} from '@/assets/js/md5.js';
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login:function() {
        const me = this;
        let username = this.form.username;
        let password = this.form.password;
        if(!username){
          this.myMessage('warning','请输入用户名');
          return;
        }
        if(!password){
          this.myMessage('warning','请输入密码');
          return;
        }
        this.$http.post(process.env.API_ROOT+'logon.json', {
          username: username,
          password: hex_md5(password)
        }).then(result => {
          if(result.status===200){
            let body = result.body;
            if(body.data){
              me.myMessage('success','验证成功');
              me.$router.push('/Home');
              // me.$router.push({path:'/Main2'})
            }else{
              me.myMessage('error','验证失败')
            }
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
  h1 {
    text-align: center;
    color: #606266;
  }

  form {
    padding: 20px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 2px;
  }

  .main {
    width: 400px;
    margin: 0px auto;
  }
</style>

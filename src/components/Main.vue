<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="240px">
          <el-col :span="24" style="height:900px;text-align: left;">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router unique-opened>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>应用域管理</span>
                </template>
                <el-menu-item index="1-1">应用域注册</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>注册管理</span>
                </template>
                <el-menu-item index="2-1">机构科室注册</el-menu-item>
                <el-menu-item index="2-2">人员注册</el-menu-item>
                <el-menu-item index="2-3">用户注册</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main id="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default {
      name: "Main",
      data () {
        const item = {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
          tableData: Array(20).fill(item)
        }
      },
      methods:{
        handleOpen:function(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose:function(key, keyPath) {
          console.log(key, keyPath);
        },
        handleSelect(key,keyPath){
          $('#main').load(key);
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
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    height:100%;
  }
</style>

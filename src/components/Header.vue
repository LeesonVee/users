<template>
  <div  class="head-wrap">
    <el-row>
      <el-col :span="1">
        <div class="head-wrap-left"><el-button class="no-b el-icon-menu" @click="toggleMenuOpen"></el-button></div>
      </el-col>
      <el-col :span="22">&nbsp;</el-col>
      <el-col :span="1" class="text-r">
        <div class="head-wrap-right">
          <el-dropdown>
            <el-button class="no-b">
              <i class="fa fa-user-circle" aria-hidden="true"></i> <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="fa fa-address-card-o"></i>查看个人信息
              </el-dropdown-item>
              <el-dropdown-item>
                <i class="fa fa-power-off"></i>登出
              </el-dropdown-item>
              <el-dropdown-item>
                <i class="fa fa-wrench"></i>修改密码
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      toggleMenuOpen() {
        this.$store.commit('toggleMenuOpen')
      }
    },
    computed: {
    }
  }
</script>


<style scoped>
  .no-b{
    border: none!important
  }
  .text-r {
    text-align: right
  }
  .head-wrap {
    height: 60px;
  }
  .head-wrap-left{
    margin: 8px 0px 8px 5px;
  }
  .head-wrap-right{
    margin: 8px 5px 8px 0px;
  }
</style>

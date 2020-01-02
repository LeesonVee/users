<template>
  <div>
    <el-container>
      <el-header>
        <div class="v3-header"> <Header /> </div>
      </el-header>
      <el-main>
        <NavMenu />
        <div class="v3-main" :style="{'margin-left': isNavMenuOpen ? '200px': '64px'}">
          <div class="v3-tabs"> <TopNav /> </div>
          <el-main class="v3-content-main">
            <keep-alive :include="navTagIndexs">
              <router-view></router-view>
            </keep-alive>
          </el-main>
        </div>
      </el-main>
    </el-container>

  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import NavMenu from '../components/NavMenu'
import Header from '../components/Header'
import TopNav from '../components/TopNav'

export default {
  name: 'Layout',
  components: {
    NavMenu, Header, TopNav
  },
  computed: {
    ...mapGetters(['navTagIndexs']),
    ...mapState(['isNavMenuOpen'])
  }
}
</script>

<style scoped>
  .el-header,.el-main{
    padding: 0px;
  }
.v3-header {
  height: 60px;
  border-bottom: 1px solid #B3C0D1;
  background-color: #B3C0D1;
}
.v3-main {
  margin-left: 200px;
}
.v3-content-main {
  background: #fff;
  margin: 10px;
}
.v3-tabs {
  background: #fff
}
</style>

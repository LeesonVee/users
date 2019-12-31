import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/Main',
      name: 'Main',
      component: resolve => require(['../components/Main.vue'], resolve)
    }
  ]
})

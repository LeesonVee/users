// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource';
import 'normalize.css'
import store from './store'

Vue.use(ElementUI);
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.http.options.emulateJSON=false;
Vue.http.options.headers = {
  'Content-Type': 'application/json'
}

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

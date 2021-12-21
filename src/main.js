// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketIO from 'vue-socket.io'
import VueLazyload from 'vue-lazyload'

import http from './utils/http/request.js'
import store from './store/store.js'

import test from './test.vue'

Vue.component('upload', test)

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$http = http
Vue.prototype.$store = store
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8888'
}))
Vue.use(VueLazyload, {
	loading: '../assets/card1.jpg'
})
/* router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        // 通过vuex state获取当前的token是否存在
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/homepage',
                // 将跳转的路由path作为参数，登录成功后跳转到该路由
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
}) */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

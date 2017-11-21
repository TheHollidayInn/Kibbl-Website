// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import axios from 'axios'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const userToken = localStorage.getItem('user-token')
  config.headers.Authorization = 'Bearer ' + userToken
  config.headers['x-access-token'] = userToken

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// import boostrap

import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css'

import axios from 'axios'
// cors proxy
axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/'
// axios.defaults.baseURL = 'https://cors-proxy.htmldriven.com/?url='

import './font-awesome'

Vue.prototype.$http = axios

Vue.config.productionTip = false

import router from './router'

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

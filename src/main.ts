import Vue from 'vue'
import App from './App.vue'
import store from './store'
import uView from 'uview-ui'
import './uni.promisify.adaptor'



Vue.config.productionTip = false
Vue.use(uView)
const app = new Vue({
  store,
  render: h => h(App)
})
app.$mount();


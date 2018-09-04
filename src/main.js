// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import './components/graphBase/css/style.styl'
import * as common from './common/common.js'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import VueResource from 'vue-resource'
Vue.use(VueResource)
  // globally (in your main .js file)
Vue.component('icon', Icon)

Vue.config.productionTip = false
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts 
import d3 from 'd3'


Vue.use(d3)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// import Vue from 'vue'
// import App from './App.vue'

// //
// Vue.config.productionTip = false 

// new Vue({
//   render: h => h(App),
// }).$mount('#app')


import '@babel/polyfill'
import Vue from 'vue'
//import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import JsonExcel from "vue-json-excel";
import VueSidebarMenu from 'vue-sidebar-menu'
import VueSession from 'vue-session'

var sessionOptions = {
  persist: true
}
Vue.use(VueSession, sessionOptions)
// import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
// Vue.use(VueSidebarMenu)

//Vue.component('paginate', Paginate)
//app.use(VueSidebarMenu)
Vue.use(VueSidebarMenu)
Vue.component("downloadExcel", JsonExcel);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})//.$mount('#app')
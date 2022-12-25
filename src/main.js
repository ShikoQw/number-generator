import Vue from 'vue'
import App from './App.vue'
import VueMask from 'v-mask'
import vuetify from "./plugins/veutify"
import router from "./router"
import store from "./store"
import "./plugins/utils"


Vue.use(VueMask);
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')

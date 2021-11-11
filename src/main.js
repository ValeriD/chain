import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(VueAxios, axios)
axios.defaults.baseURL = process.env.VUE_APP_BASEURL

Vue.config.productionTip = false

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')

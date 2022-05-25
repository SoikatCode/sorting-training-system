import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

const config = {
  fieldsBagName: 'fieldBags'
} // used to avoid 'fields'prop conflict with vue-datatable
Vue.use(VeeValidate, config)

Vue.use(VModal, {
  dynamicDefaults: {
    clickToClose: false,
    height: 'auto',
    width: '450px'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from "./router"
import vuetify from './plugins/vuetify' // path to vuetify export
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';



Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.component('app-MakeNumber');
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
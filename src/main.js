import Vue from 'vue'

// import * as Sentry from '@sentry/vue';

import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from "./router"
import vuetify from './plugins/vuetify' // path to vuetify export
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

// Sentry.init({
//   Vue: Vue,
//   dsn: 'https://8a21a85ac35a4617b027c4bb0d121808@o395189.ingest.sentry.io/5246621',
// });

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.component('app-MakeNumber');
Vue.use(Vuelidate)

Vue.config.productionTip = false

let vm0 = new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
window.vm0 = vm0;
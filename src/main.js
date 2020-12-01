import Vue from 'vue'

// import * as Sentry from "@sentry/browser";
// import { Vue as VueIntegration } from "@sentry/integrations";
// import { Integrations } from "@sentry/tracing";

import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from "./router"
import vuetify from './plugins/vuetify' // path to vuetify export
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

// Sentry.init({
//   dsn: "https://8a21a85ac35a4617b027c4bb0d121808@o395189.ingest.sentry.io/5246621",
//   integrations: [
//     new VueIntegration({
//       Vue,
//       tracing: true,
//     }),
//     new Integrations.BrowserTracing(),
//   ],
//
//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
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
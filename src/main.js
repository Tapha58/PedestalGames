import Vue from 'vue'
import App from './App.vue'
import MakeNumber from './components/MakeNumber.vue'
import GameGuessNumber from './components/GameGuessNumber.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.component('app-GameGuessNumber', GameGuessNumber)
Vue.component('app-MakeNumber', MakeNumber)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
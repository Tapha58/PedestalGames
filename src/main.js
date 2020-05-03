import Vue from 'vue'
import App from './App.vue'
import Rules from './components/Rules.vue'
import GuessTheNumber from './components/GuessTheNumber.vue'
import PostSettings from './components/PostSettings.vue'
import imagePost from './components/Image post.vue'
import timePost from './components/TimePost.vue'
import ChoiceOfPrize from './components/СhoiceOfPrize.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

Vue.component('app-rules', Rules)
Vue.component('app-GuessTheNumber', GuessTheNumber)
Vue.component('app-PostSettings', PostSettings)
Vue.component('app-image', imagePost)
Vue.component('app-time', timePost)
Vue.component('app-ChoiceOfPrize', ChoiceOfPrize)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
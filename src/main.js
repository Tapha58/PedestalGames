import Vue from 'vue'
import App from './App.vue'
import Rules from './components/Rules.vue'
import GuessTheNumber from './components/GuessTheNumber.vue'
import PostSettings from './components/PostSettings.vue'
import imagePost from './components/Image post.vue'
import timePost from './components/TimePost.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import DatetimePicker from 'vuetify-datetime-picker'

// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
Vue.component('app-rules', Rules)
Vue.component('app-GuessTheNumber', GuessTheNumber)
Vue.component('app-PostSettings', PostSettings)
Vue.component('app-image', imagePost)
Vue.component('app-time', timePost)
Vue.use(DatetimePicker)
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
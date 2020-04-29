import Vue from 'vue'
import App from './App.vue'
import Rules from './components/Rules.vue'
import GuessTheNumber from './components/GuessTheNumber.vue'
// import postSettings from './components/Post settings.vue'
// import imagePost from './components/Image post.vue'
// import timePost from './components/TimePost.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
Vue.component('app-rules', Rules)
Vue.component('app-GuessTheNumber', GuessTheNumber)
// Vue.component('app-postSettings', postSettings)
// Vue.component('app-image', imagePost)
// Vue.component('app-time', timePost)
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
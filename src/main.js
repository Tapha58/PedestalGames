import Vue from 'vue'
import App from './App.vue'
import Rules from './components/Rules.vue'
import guessTheNumber from './components/Guess the number.vue'
import postSettings from './components/Post settings.vue'
import imagePost from './components/Image post.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('app-rules', Rules)
Vue.component('app-guessTheNumber', guessTheNumber)
Vue.component('app-postSettings', postSettings)
Vue.component('app-image', imagePost)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

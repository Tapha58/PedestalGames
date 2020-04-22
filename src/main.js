import Vue from 'vue'
import App from './App.vue'
import Rules from './components/Rules.vue'
import guessTheNumber from './components/Guess the number.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('app-rules', Rules)
Vue.component('app-guessTheNumber', guessTheNumber)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ru from 'vuetify/es5/locale/ru'
Vue.use(Vuetify)

const opts = {
    theme: {
        dark: false,
        default: 'light',
        themes: {
            light: {
                primary: '#4a76a8',
                secondary: '#424242',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FB8C00',
            },
            dark: {
                primary: '#4a76a8',
                secondary: '#424242',
                accent: '#FF4081',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FB8C00',
            },
        },
    },
    lang: {
        locales: { ru },
        current: 'ru',
    },

}

export default new Vuetify(opts)
// export default new Vuetify({
//     lang: {
//         locales: { ru },
//         current: 'ru',
//     },
//     opts
// })
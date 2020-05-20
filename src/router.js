import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/HomeView'),
            children: [
            {
                path: '/all_games',
                component: () => import('./views/AllGames')
            },
            {
                path: '/my_games',
                component: () => import('./views/MyGames')
            }
        ]
        },
        {
            path: '/guess_number_settings',
            name: 'home',
            component: () => import('./views/GameGuessNumber'),
        }


    ]
})
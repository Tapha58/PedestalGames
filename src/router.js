import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '/app/wallgames/index/',

    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/HomeView'),
            redirect: { name: 'all_games' },
            children: [
            {
                path: '/all_games',
                component: () => import('./views/AllGames'),
                name: 'all_games'
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
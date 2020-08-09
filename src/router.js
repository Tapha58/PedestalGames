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
            redirect: { name: 'choice_games' },
            children: [
            {
                path: '/choice_games',
                component: () => import('./views/СhoiceGames'),
                name: 'choice_games'
            },
            {
                path: '/my_games',
                component: () => import('./views/MyGames'),
                name: 'my_games'
            },
        ]
        },
        {
            path: '/guess_number_settings',
            name: 'guess_number_settings',
            component: () => import('./views/games/GuessNumber'),
        },
        {
            path: '/guess_number_settings/:id',
            name: 'guess_number_settings_id',
            component: () => import('./views/games/GuessNumber'),
        },
        {
            path: '/anagram',
            name: 'anagram',
            component: () => import('./views/games/Anagram'),
        },
        {
            path: '/anagram_settings/:id',
            name: 'anagram_settings_id',
            component: () => import('./views/games/Anagram'),
        },
        {
            path: '/words_with_letter',
            name: 'words_with_letter',
            component: () => import('./views/games/WordStartsWith'),
        },
        {
            path: '/words_with_letter_settings/:id',
            name: 'words_with_letter_settings_id',
            component: () => import('./views/games/WordStartsWith'),
        },
    ]
})
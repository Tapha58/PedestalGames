import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '/app/wallgames/index/',

    routes: [
        {
            path: '/',
            name: 'route_page',
            component: () => import('./views/RoutePage'),
        },
        {
            path: '/home_view',
            name: 'home',
            component: () => import('./views/HomeView'),
            // redirect: { name: 'choice_games' },
            children: [
                {
                    path: '/choice_games',
                    component: () => import('./views/СhoiceGames'),
                    name: 'новая игра'
                },
                {
                    path: '/my_games',
                    component: () => import('./views/MyGames'),
                    name: 'мои игры'
                },
                {
                    path: '/balance',
                    component: () => import('./views/Balance'),
                    name: 'баланс'
                },
                {
                    path: '/settings',
                    component: () => import('./views/Settings'),
                    name: 'сервисы'
                },
            ]
        },
        {
            path: '/app_install_page',
            name: 'app_install_page',
            component: () => import('./views/AppInstallPage'),
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
        {
            path: '/max_comments',
            name: 'max_comments',
            component: () => import('./views/games/MaxComments'),
        },
        {
            path: '/max_comments_settings/:id',
            name: 'max_comments_settings_id',
            component: () => import('./views/games/MaxComments'),
        },
        {
            path: '/sea_battle',
            name: 'sea_battle',
            component: () => import('./views/games/SeaBattle'),
        },
        {
            path: '/map/:id',
            name: 'map',
            component: () => import('./views/games/Map'),
        },
        {
            path: '/sea_battle_settings/:id',
            name: 'sea_battle_settings_id',
            component: () => import('./views/games/SeaBattle'),
        },
        {
            path: '/sea_battle_with_score',
            name: 'sea_battle_with_score',
            component: () => import('./views/games/SeaBattleWithScore'),
        },
        {
            path: '/sea_battle_with_score_settings/:id',
            name: 'sea_battle_with_score_settings_id',
            component: () => import('./views/games/SeaBattleWithScore'),
        },
        {
            path: '/results/:id',
            name: 'results',
            component: () => import('./views/Results'),
        },
    ]
})
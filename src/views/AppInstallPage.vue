<template>
    <div>
        <div v-if="settings.auth_data.vk_platform !== 'desktop_web' && $vuetify.breakpoint.name === ('xs')" id="top_div">
            <span class="app_name ml-3 text-button colorprimary">Пьедестал. Игры</span>
        </div>

        <div v-if="!show_alert_successful_installation">
            <v-sheet
                    class="d-flex mb-3"
                    color="#f0f2f5"
                    height="auto"
            >
                <v-col align="center" class="mt-3" v-if="$vuetify.breakpoint.name !== ('xs')">
                    <h3 class="mb-1">Пьедестал. Игры</h3>
                    <span>Подключите приложение в сообщество <br> и запустите первую интерактивную игру <br> уже через 5 минут.</span><br>
                    <v-btn @click="app_install" class="mt-3" color="primary" small>Подключить к сообществу</v-btn>
                </v-col>
                <v-col align="center" v-else>
                    <h3 class="mb-1">Пьедестал. Игры</h3>
                    <span>Подключите приложение в сообщество и запустите первую интерактивную игру уже через 5 минут!</span><br>
                    <v-btn @click="app_install" class="mt-3" color="primary" small>Подключить к сообществу</v-btn>
                </v-col>
            </v-sheet>
            <v-row justify="space-around" class="mx-3">
                <v-card
                        v-for="(game) in game_card"
                        :key="game.name"
                        class="mx-0 mb-3"
                        :max-width="max_width_card"
                        min-width="297"
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="name_game mb-1">{{game.name}}</v-list-item-title>
                            <v-list-item-subtitle class="pt-2">{{game.description}}
                            </v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar
                                class="n"
                                color="grey"
                                size="80"
                                tile
                        ><img
                                alt="Изображение"
                                :src=game.url_avatar
                        ></v-list-item-avatar>
                    </v-list-item>
                </v-card>
            </v-row>
        </div>
        <div v-else>
            <v-alert
                    class="mt-3"
                    text
                    prominent
                    type="primary"
                    icon="mdi-check"
            >
                <v-row align="center">
                    <v-col class="">
                        Приложение успешно добавлено в сообщество. Вы можете перейти в приложение и запустить первую
                        игру.
                    </v-col>
                    <v-col class="shrink">
                        <v-btn :href="'https://vk.com/app' + settings.auth_data.vk_app_id + '_-' + vk_group_id"
                               small color="primary" target="_target">Перейти в приложение
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </div>
    </div>
</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        data: () => ({
            settings: {
                auth_data: ''
            },
            show_alert_successful_installation: false,
            vk_group_id: '',
            game_card: [
                {
                    name: 'Морской бой',
                    img: 'https://vk.com/albums312527953?z=photo312527953_457244927%2Fphotos312527953',
                    description: 'Игроки стреляют в ячейки. Побеждают только меткие.',
                    url_avatar: '/static/wallgames/image/promo_games/sea_battle.png',
                    btn_example: 'https://vk.com/club197375430?w=wall-197375430_152',
                    btn_more_details: 'https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-morskoy-boy'
                },
                {
                    name: 'Битва комментаторов',
                    description: 'Выигрывают те, кто напишет максимум комментариев.',
                    url_avatar: '/static/wallgames/image/promo_games/max_comments.png',
                    btn_example: 'https://vk.com/club197375430?w=wall-197375430_151',
                    btn_more_details: 'https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-bitva-kommentatorov'
                },
                {
                    name: 'Угадай число',
                    description: 'Загадайте число. Тот из игроков, кто первым отгадает, получит приз.',
                    url_avatar: '/static/wallgames/image/promo_games/guess_number.png',
                    btn_example: 'https://vk.com/club197375430?w=wall-197375430_21',
                    btn_more_details: 'https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-ugaday-chislo'
                },
                {
                    name: 'Анаграммы',
                    description: 'Загадайте слово, а игроки будут составлять из него другие слова.',
                    url_avatar: '/static/wallgames/image/promo_games/anagram.png',
                    btn_example: 'https://vk.com/club197375430?w=wall-197375430_22',
                    btn_more_details: 'https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-anagrammy'
                },
                // {
                //     name: 'Слова на букву(ы)',
                //     description: 'Выигрывает тот, кто напишет больше слов на загаданную букву.',
                //     url_avatar: '/static/wallgames/image/promo_games/word_starts_with.png',
                //     btn_example: 'https://vk.com/club197375430?w=wall-197375430_23',
                //     btn_more_details: 'https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-slova-na-bukvu-y'
                // },
            ]
        }),
        mounted: async function () {
            await this.getAllUrlParams()
            this.auto_resize()
        },
        computed: {
            mobile: function () {
                return this.$vuetify.breakpoint.name !== ('xs') ? false : 12
            },
            max_width_card: function () {
                if (this.settings.auth_data.vk_platform !== 'desktop_web') {
                    return 345
                } else {
                    return 365
                }
            },
        },
        methods: {
            app_install: async function () {
                let response = await bridge.send("VKWebAppAddToCommunity", {})
                if (response.group_id) {
                    if (this.settings.auth_data.vk_platform === 'mobile_iphone') {
                        this.vk_group_id = response.group_id
                        this.show_alert_successful_installation = true
                        return
                    }
                    window.open("https://vk.com/app" + this.settings.auth_data.vk_app_id + "_-" + response.group_id, "_parent")
                    setTimeout(window.location.reload(), 1000)
                } else {
                    console.log('response')
                }
            }
        }
    }
</script>

<style>
    .logo_game {
        border-radius: 50%;
    }

    .v-window__next, .v-window__prev {
        background-color: #4a76a8;
    }

    .mdi-chevron-right, .mdi-chevron-left {
        color: white !important;
    }

    .v-list-item__subtitle {
        -webkit-line-clamp: 3 !important;
    }

    .app_name {
        background-color: #ffffff;
        top: 30px;
        top: calc(constant(safe-area-inset-top) + 10px);
        top: calc(env(safe-area-inset-top) + 10px);
        position: fixed;
        z-index: 8;
    }

    #top_div {
        top: 0px;
        position: fixed;
        width: 100%;
        background-color: #ffffff;
        z-index: 8;
        height: 46px;
        height: calc(constant(safe-area-inset-top) + 46px);
        height: calc(env(safe-area-inset-top) + 46px);
    }

    .colorprimary {
        color: #4a76a8
    }
</style>
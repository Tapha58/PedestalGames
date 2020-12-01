<template>
    <div>
        <div v-if="$vuetify.breakpoint.name !== ('xs' || 'sm') ? false : true" class="mobile_background_top"></div>
        <v-btn  v-if="settings.auth_data.vk_platform !== 'desktop_web'" class="app_name ml-3" color="primary" text>Пъедестал. Игры</v-btn>
<!--        <span v-if="settings.auth_data.vk_platform !== 'desktop_web'" class="app_name ml-3">Пъедестал. Игры.</span>-->
        <div v-if="!show_alert_successful_installation">
            <v-sheet
                    class="d-flex"
                    color="#f0f2f5"
                    height="auto"
            >
                <!--            <v-img src="/static/wallgames/image/fon.jpg" max-height="200">-->
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
                <!--            </v-img>-->
            </v-sheet>
            <v-row justify="space-around" class="mx-3">
                <v-card
                        v-for="(game) in game_card"
                        :key="game.name"
                        class="mx-0 mt-3"
                        max-width="375"
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


        <!--        <v-row align="center" class="mx-0">-->
        <!--            <v-col :cols="$vuetify.breakpoint.name !== ('xs') ? 2 : 12" align="center">-->
        <!--                <v-img-->
        <!--                        class="logo_game"-->
        <!--                        src="https://pedestal-test2.aiva-studio.ru/static/longtime/icons/logo/game_logo.jpg"-->
        <!--                        max-width="100"-->
        <!--                        max-height="100"-->
        <!--                ></v-img>-->
        <!--            </v-col>-->
        <!--            <v-col :cols="$vuetify.breakpoint.name !== ('xs') ? 10 : 12">-->
        <!--                <span>Сервис для проведения в сообществе автоматизированных игр (игровая механика полностью управляется приложением). <br>-->
        <!--                Доступные игры: морской бой, угадай число, анаграммы, битва комментаторов, слова на букву.</span>-->
        <!--            </v-col>-->
        <!--        </v-row>-->
        <!--        <v-row justify="center" class="mx-0 px-0">-->
        <!--            <v-btn @click="app_install" color="primary" small>Подключить к сообществу</v-btn>-->
        <!--        </v-row>-->
        <!--        <v-row justify="center" class="mt-5 mx-0">-->
        <!--            <v-col align="center">-->
        <!--                <v-carousel-->
        <!--                        light-->
        <!--                        cycle-->
        <!--                        height="160"-->
        <!--                        hide-delimiters-->
        <!--                        :show-arrows="$vuetify.breakpoint.name === ('xs' || 'sm') ? false : true"-->
        <!--                >-->
        <!--                    <v-carousel-item-->
        <!--                            v-for="(game) in game_card"-->
        <!--                            :key="game.name"-->
        <!--                    >-->
        <!--                        <v-card-->
        <!--                                class="mx-0"-->
        <!--                                max-width="380"-->
        <!--                                min-width="297"-->
        <!--                        >-->
        <!--                            <v-list-item three-line>-->
        <!--                                <v-list-item-content>-->
        <!--                                    <v-list-item-title class="name_game mb-1">{{game.name}}</v-list-item-title>-->
        <!--                                    <v-list-item-subtitle class="pt-2">{{game.description}}-->
        <!--                                    </v-list-item-subtitle>-->
        <!--                                </v-list-item-content>-->

        <!--                                <v-list-item-avatar-->
        <!--                                        class="n"-->
        <!--                                        color="grey"-->
        <!--                                        size="80"-->
        <!--                                        tile-->
        <!--                                ><img-->
        <!--                                        alt="Изображение"-->
        <!--                                        :src=game.url_avatar-->
        <!--                                ></v-list-item-avatar>-->
        <!--                            </v-list-item>-->

        <!--                            <v-card-actions class="pt-0 d-flex justify-space-between">-->
        <!--                                <v-btn color="primary"-->
        <!--                                       :href="game.btn_example" target="_blank"-->
        <!--                                       text>-->
        <!--                                    Пример-->
        <!--                                </v-btn>-->
        <!--                                <v-btn color="primary"-->
        <!--                                       :href="game.btn_more_details" target="_blank"-->
        <!--                                       text>-->
        <!--                                    Подробнее-->
        <!--                                </v-btn>-->
        <!--                            </v-card-actions>-->
        <!--                        </v-card>-->
        <!--                    </v-carousel-item>-->
        <!--                </v-carousel>-->
        <!--            </v-col>-->
        <!--        </v-row>-->
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
                    description: 'Загадайте число. Тот из игроков, кто первым отгадает получит приз.',
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
        top:30px;
        position: fixed;
        z-index: 8;
    }
</style>
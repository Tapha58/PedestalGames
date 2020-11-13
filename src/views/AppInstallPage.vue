<template>
    <div>
        <v-row align="center" class="mx-0">
            <v-col :cols="$vuetify.breakpoint.name !== ('xs') ? 2 : 12" align="center">
                <v-img
                        class="logo_game"
                        src="https://pedestal-test2.aiva-studio.ru/static/longtime/icons/logo/game_logo.jpg"
                        max-width="100"
                        max-height="100"
                ></v-img>
            </v-col>
            <v-col :cols="$vuetify.breakpoint.name !== ('xs') ? 10 : 12">
                <span>Сервис для проведения в сообществе автоматизированных игр (игровая механика полностью управляется приложением). <br>
                Доступные игры: морской бой, угадай число, анаграммы, битва комментаторов, слова на букву.</span>
            </v-col>
        </v-row>
        <v-row justify="center" class="mx-0 px-0">
            <v-btn @click="app_install" color="primary" small>Подключить к сообществу</v-btn>
        </v-row>
        <v-row justify="center" class="mt-5 mx-0">
            <v-col align="center">
                <v-carousel
                        light
                        cycle
                        height="160"
                        hide-delimiters
                        :show-arrows="$vuetify.breakpoint.name === ('xs' || 'sm') ? false : true"
                >
                    <v-carousel-item
                            v-for="(game) in game_card"
                            :key="game.name"
                    >
                        <v-card
                                class="mx-0"
                                max-width="380"
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

                            <v-card-actions class="pt-0 d-flex justify-space-between">
                                <v-btn  color="primary"
                                        :href="game.btn_example" target="_blank"
                                       text>
                                    Пример
                                </v-btn>
                                <v-btn color="primary"
                                       :href="game.btn_more_details" target="_blank"
                                       text>
                                    Подробнее
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>
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
            game_card: [
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
                {
                    name: 'Слова на букву(ы)',
                    description: 'Выигрывает тот, кто напишет больше слов на загаданную букву.',
                    url_avatar: '/static/wallgames/image/promo_games/word_starts_with.png',
                    btn_example: 'https://vk.com/club197375430?w=wall-197375430_23',
                    btn_more_details: 'https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-slova-na-bukvu-y'
                },
                {
                    name: 'Морской бой',
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
                }

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
                    window.open("https://vk.com/app" + this.settings.auth_data.vk_app_id + "_-" + response.group_id, "_parent")
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

</style>
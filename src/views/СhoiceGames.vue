<template>
    <div>
        <div id="skeleton" v-if="show_sceleton">
            <v-row>
                <v-col>
                    <v-skeleton-loader
                            class="mx-auto"
                            max-width="365"
                            min-width="297"
                            type="card"
                    ></v-skeleton-loader>
                </v-col>
                <v-col>
                    <v-skeleton-loader
                            class="mx-auto"
                            max-width="365"
                            min-width="297"
                            type="card"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row class="">
                <v-col>
                    <v-skeleton-loader
                            class="mx-auto"
                            max-width="365"
                            min-width="297"
                            type="card"
                    ></v-skeleton-loader>
                </v-col>
                <v-col>
                    <v-skeleton-loader
                            class="mx-auto"
                            max-width="365"
                            min-width="297"
                            type="card"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-skeleton-loader
                            class="mx-auto"
                            max-width="365"
                            min-width="297"
                            type="card"
                    ></v-skeleton-loader>
                </v-col>
                <v-col>
                    <v-skeleton-loader
                            class="mx-auto"
                            max-width="365"
                            min-width="297"
                            type="card"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
        </div>
        <div id="xx" v-else>
            <!--        hello-->
            <!--        <div id='war_info'  class="mt-3 pb-3">-->
            <!--            <v-col class="pb-0">-->
            <!--                <span v-bind:style="{ color: 'red' }">Внимание! </span>-->
            <!--                <span>-->
            <!--                    Раздел игры доступен лишь небольшому количеству пользователей. Убедительная просьба сохранять его-->
            <!--                    в секрете. Оплата игр производится с баланса, пополнить его можно в разделе "Настройки" -> "Оплата".-->
            <!--                    Для тестового запуска игры ознакомьтесь со статьей-->
            <!--                    <a href="https://vk.com/@pedestal-testovyi-zapusk-igr" target="_blank">"тестовый запуск"</a>.-->
            <!--                </span>-->
            <!--            </v-col>-->
            <!--        </div>-->
            <v-row justify="center">
                <!--            Морской бой-->
                <v-col>
                    <v-card
                            class="mx-auto mmm"
                            max-width="380"
                            min-width="297"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div v-if="group_status === 2" class="overline1  free_color">
                                    <v-chip
                                            class="mr-1"
                                            color="red"
                                            x-small
                                            dark
                                    >
                                        new
                                    </v-chip>
                                    {{ price_type_5 }}₽</div>
                                <div v-else class="overline1 free_color">
                                    <v-chip
                                            class="mr-1"
                                            color="red"
                                            x-small
                                            dark
                                    >
                                        new
                                    </v-chip>
                                    Бесплатно</div>
                                <v-list-item-title class="mb-1" :class="$vuetify.breakpoint.name !== 'xs' ? 'name_game' : 'name_game_16'">Морской бой</v-list-item-title>
                                <v-list-item-subtitle class="pt-2">Игроки стреляют в ячейки. Побеждают только меткие.
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar
                                    class="n"
                                    color="grey"
                                    size="80"
                                    tile
                            ><img
                                    alt="Изображение"
                                    src="/static/wallgames/image/promo_games/sea_battle.png"
                            ></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions class="pt-0 d-flex justify-space-between">
                            <v-btn color="primary" text to="/sea_battle">Создать игру</v-btn>
                            <v-btn v-show="$vuetify.breakpoint.name !== 'xs'" color="primary" text href="https://vk.com/club197375430?w=wall-197375430_152" target="_blank">Пример</v-btn>
                            <v-btn color="primary" text href="https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-morskoy-boy" target="_blank">Подробнее </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <!--            Битва комментаторов-->
                <v-col>
                    <v-card
                            class="mx-auto mmm"
                            max-width="380"
                            min-width="297"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div v-if="group_status === 2" class="overline1  free_color">
                                    <v-chip
                                            class="mr-1"
                                            color="red"
                                            x-small
                                            dark
                                    >
                                        new
                                    </v-chip>
                                    {{ price_type_4 }}₽</div>
                                <div v-else class="overline1  free_color">
                                    <v-chip
                                            class="mr-1"
                                            color="red"
                                            x-small
                                            dark
                                    >
                                        new
                                    </v-chip>
                                    Бесплатно</div>
                                <v-list-item-title class="mb-1" :class="$vuetify.breakpoint.name !== 'xs' ? 'name_game' : 'name_game_16'">Битва комментаторов</v-list-item-title>
                                <v-list-item-subtitle class="pt-2">Выигрывают те, кто напишет максимум комментариев.
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar
                                    class="n"
                                    color="grey"
                                    size="80"
                                    tile
                            ><img
                                    alt="Изображение"
                                    src="/static/wallgames/image/promo_games/max_comments.png"
                            ></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions class="pt-0 d-flex justify-space-between">
                            <v-btn color="primary" text to="/max_comments">Создать игру</v-btn>
                            <v-btn v-show="$vuetify.breakpoint.name !== 'xs'" color="primary" text href="https://vk.com/club197375430?w=wall-197375430_151" target="_blank">Пример</v-btn>
                            <v-btn color="primary" text href="https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-bitva-kommentatorov" target="_blank">Подробнее </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card
                            class="mx-auto"
                            max-width="380"
                            min-width="297"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div v-if="group_status === 2" class="overline1  free_color">Цена игры - <s>{{ base_price_type_1 }}</s> {{ price_type_1 }}₽</div>
                                <div v-else class="overline1  free_color">Бесплатно</div>
                                <v-list-item-title class="mb-1" :class="$vuetify.breakpoint.name !== 'xs' ? 'name_game' : 'name_game_16'" >Угадай число</v-list-item-title>
                                <v-list-item-subtitle class="pt-2">Загадайте число. Тот из игроков, кто первым отгадает, получит приз.
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar
                                    class="n"
                                    color="grey"
                                    size="80"
                                    tile
                            ><img
                                    alt="Изображение"
                                    src="/static/wallgames/image/promo_games/guess_number.png"
                            ></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions class="pt-0 d-flex justify-space-between">
                            <v-btn color="primary" text to="/guess_number_settings">Создать игру</v-btn>
                            <v-btn v-show="$vuetify.breakpoint.name !== 'xs'" color="primary" href="https://vk.com/club197375430?w=wall-197375430_21" target="_blank" text >Пример</v-btn>
                            <v-btn color="primary" href="https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-ugaday-chislo" target="_blank" text>Подробнее</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                            class="mx-auto"
                            max-width="380"
                            min-width="297"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div v-if="group_status === 2" class="overline1  free_color">Цена игры - <s>{{ base_price_type_2 }}</s> {{ price_type_2 }}₽</div>
                                <div v-else class="overline1  free_color">Бесплатно</div>
                                <v-list-item-title class="mb-1" :class="$vuetify.breakpoint.name !== 'xs' ? 'name_game' : 'name_game_16'">Анаграммы</v-list-item-title>
                                <v-list-item-subtitle class="pt-2">Загадайте слово, а игроки будут составлять из него другие слова.
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar
                                    class="n"
                                    color="grey"
                                    size="80"
                                    tile
                            ><img
                                    alt="Изображение"
                                    src="/static/wallgames/image/promo_games/anagram.png"
                            ></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions class="pt-0 d-flex justify-space-between">
                            <v-btn color="primary" text to="/anagram">Создать игру</v-btn>
                            <v-btn v-show="$vuetify.breakpoint.name !== 'xs'" color="primary" href="https://vk.com/club197375430?w=wall-197375430_22" target="_blank" text >Пример</v-btn>
                            <v-btn color="primary" href="https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-anagrammy" target="_blank" text>Подробнее</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card
                            class="mx-auto"
                            max-width="380"
                            min-width="297"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div v-if="group_status === 2" class="overline1  free_color">Цена игры - <s>{{ base_price_type_3 }}</s> {{ price_type_3 }}₽</div>
                                <div v-else class="overline1  free_color">Бесплатно</div>
                                <v-list-item-title class="mb-1" :class="$vuetify.breakpoint.name !== 'xs' ? 'name_game' : 'name_game_16'">Слова на букву(ы)</v-list-item-title>
                                <v-list-item-subtitle class="pt-2">Выигрывает тот, кто напишет больше слов на загаданную букву.
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar
                                    class="n"
                                    color="grey"
                                    size="80"
                                    tile
                            ><img
                                    alt="Изображение"
                                    src="/static/wallgames/image/promo_games/word_starts_with.png"
                            ></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions class="pt-0 d-flex justify-space-between">
                            <v-btn color="primary" text to="/words_with_letter">Создать игру</v-btn>
                            <v-btn v-show="$vuetify.breakpoint.name !== 'xs'" color="primary" href="https://vk.com/club197375430?w=wall-197375430_23" target="_blank" text >Пример</v-btn>
                            <v-btn color="primary" text href="https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-slova-na-bukvu-y" target="_blank">Подробнее </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                            class="mx-auto"
                            max-width="380"
                            min-width="297"
                            min-height="170"
                            max-height="170"
                            disabled
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline1  free_color"></div>
                                <v-list-item-title class="mb-1" :class="$vuetify.breakpoint.name !== 'xs' ? 'name_game' : 'name_game_16'">Игра в разработке</v-list-item-title>
                                <v-list-item-subtitle class="pt-2">
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar
                                    class="n"
                                    color="grey"
                                    size="80"
                                    tile
                            ><img
                                    alt="Изображение"
                                    src="/static/wallgames/image/promo_games/development.png"
                            ></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions class="pt-4 d-flex justify-space-between">
                            <v-btn color="primary" text to="/words_with_letter">Создать игру</v-btn>
                            <v-btn v-show="$vuetify.breakpoint.name !== 'xs'" color="primary" href="https://vk.com/club197375430?w=wall-197375430_23" target="_blank" text >Пример</v-btn>
                            <v-btn color="primary" text href="https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-slova-na-bukvu-y" target="_blank">Подробнее </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        data:() => ({

            auth_data: '',
            mobile: '',
            prices: [],
            group_status: '',
            settings: {
                auth_data: ''
            },
            show_sceleton: true
        }),
        mounted: async function () {
            if (!sessionStorage.getItem('auth_data_url'))
                sessionStorage.setItem('auth_data_url', document.location.search)
            await this.getAllUrlParams ()
            await this.create_group()
            this.mobile = this.auth_data.vk_platform !== 'desktop_web'
            await this.get_group_status ()
            if (this.group_status === 2) {
                await this.get_prices ()
            }
            this.show_sceleton = false
            setTimeout(this.auto_resize, 5000)
        },
        computed: {
            price_type_1 () {
                let obj = this.prices.find(item => item.game_type === 1)
                if (obj === undefined)
                    return
                return obj.price
            },
            price_type_2 () {
                let obj = this.prices.find(item => item.game_type === 2)
                if (obj === undefined)
                    return
                return obj.price
            },
            price_type_3 () {
                let obj = this.prices.find(item => item.game_type === 3)
                if (obj === undefined)
                    return
                return obj.price
            },
            price_type_4 () {
                let obj = this.prices.find(item => item.game_type === 4)
                if (obj === undefined)
                    return
                return obj.price
            },
            price_type_5 () {
                let obj = this.prices.find(item => item.game_type === 5)
                if (obj === undefined)
                    return
                return obj.price
            },
            base_price_type_1 () {
                let obj = this.prices.find(item => item.game_type === 1)
                if (obj === undefined)
                    return
                return obj.base_price
            },
            base_price_type_2 () {
                let obj = this.prices.find(item => item.game_type === 2)
                if (obj === undefined)
                    return
                return obj.base_price
            },
            base_price_type_3 () {
                let obj = this.prices.find(item => item.game_type === 3)
                if (obj === undefined)
                    return
                return obj.base_price
            },
            base_price_type_4 () {
                let obj = this.prices.find(item => item.game_type === 4)
                if (obj === undefined)
                    return
                return obj.base_price
            },
            base_price_type_5 () {
                let obj = this.prices.find(item => item.game_type === 5)
                if (obj === undefined)
                    return
                return obj.base_price
            },
        },
        methods: {
            go_description_page: function (url) {
                window.open(url, '_blank')
            },
            get_prices: async function () {
                let response = await fetch("/app/wallgames/payments/prices/" + sessionStorage.getItem('auth_data_url'))
                if (response.ok) {
                    this.prices = await response.json()
                } else {
                    response = await response.json()
                    console.log(response)
                }
            },
            get_group_status: async function () {
                let response = await fetch("/app/wallgames/group/" + this.settings.auth_data.vk_group_id + "/status/" + sessionStorage.getItem('auth_data_url'))
                if (response.ok) {
                    response = await response.json()
                    this.group_status = +response.status
                } else {
                    response = await response.json()
                    if (response.error.code === 15) {
                        this.group_status = 2
                        return console.log(response.error.desc)
                    }
                    console.log(response)
                }
            },
            create_group: async function () {
                let obj = {}
                obj.auth_data = this.settings.auth_data
                let response = await fetch('/app/wallgames/group/' + sessionStorage.getItem('auth_data_url'),
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(obj)
                    })
                if (response.ok) {
                    // response = await response.json()
                    // console.log(response)
                    console.log('')
                } else {
                    response = await response.json()
                    console.log(response)
                }
            },
        },
    }
</script>

<style scoped>
    .free_color {
        color: green;
    }

    .name_game {
        font-size: 20px;
    }
    .name_game_16 {
        font-size: 16px;
    }

    #war_info {
        border: 1px lightgrey;
        border-radius: 5px;
        border-style: solid;
    }

    .overline1 {
        font-size: .74rem !important;
        font-weight: 500;
        letter-spacing: .1em!important;
        line-height: 2rem;
        text-transform: uppercase;
        font-family: Roboto,sans-serif!important;
    }

    .v-skeleton-loader__image {
        height: 150px !important;
    }

    .v-list-item__subtitle {
        -webkit-line-clamp: 3 !important;
    }

    .btn {
        text-decoration: none;
    }


</style>
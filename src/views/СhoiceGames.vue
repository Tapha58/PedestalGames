<template>
    <div>

        <div id="skeleton" v-if="show_sceleton">
            <v-row justify="space-between">
                <v-col>
                    <v-skeleton-loader
                            class="mx-auto"
                            max-width="365"
                            min-width="296"
                            type="image"
                    ></v-skeleton-loader>
                </v-col>
                <v-col>
                    <v-skeleton-loader
                            class="mx-auto"
                            max-width="365"
                            min-width="296"
                            type="image"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row class="">
                <v-col>
                    <v-skeleton-loader
                            class="mx-auto"
                            max-width="365"
                            min-width="296"
                            type="image"
                    ></v-skeleton-loader>
                </v-col>
                <v-col>
                    <v-skeleton-loader
                            class="mx-auto"
                            max-width="365"
                            min-width="296"
                            type="image"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-skeleton-loader
                            class="mx-auto"
                            max-width="365"
                            min-width="296"
                            type="image"
                    ></v-skeleton-loader>
                </v-col>
                <v-col>
                    <v-skeleton-loader
                            class="mx-auto"
                            max-width="365"
                            min-width="296"
                            type="image"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
        </div>
        <div id="xx" v-show="!show_sceleton">
            <!--            <div>-->
            <!--                <v-alert-->
            <!--                        class="mt-3"-->
            <!--                        text-->
            <!--                        prominent-->
            <!--                        type="primary"-->
            <!--                        icon="mdi-progress-alert"-->
            <!--                >-->
            <!--                    <v-row align="center">-->
            <!--                        <v-col class="">-->
            <!--                            Внимание! Оплата за один запуск игры.-->
            <!--                        </v-col>-->
            <!--                        &lt;!&ndash;                    <v-col class="shrink">&ndash;&gt;-->
            <!--                        &lt;!&ndash;                        <v-btn @click="VKWebAppAllowMessagesFromGroup" small color="primary">Разрешить уведомления</v-btn>&ndash;&gt;-->
            <!--                        &lt;!&ndash;                    </v-col>&ndash;&gt;-->
            <!--                    </v-row>-->
            <!--                </v-alert>-->
            <!--            </div>-->
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
            <v-alert
                    v-if="show_alert_grant_rights"
                    class="mt-3"
                    text
                    prominent
                    type="primary"
                    icon="mdi-progress-alert"
            >
                <v-row align="center">
                    <v-col class="">
                        Необходимо предоставить права доступа для работы приложения с сообществом. Они нужны для запуска
                        игр и ответов пользователям от имени сообщества.
                    </v-col>
                    <v-col class="shrink">
                        <v-btn @click="VKWebAppGetCommunityToken" small color="primary">Предоставить права
                        </v-btn>
                    </v-col>
                </v-row>
            </v-alert>
            <v-alert
                    v-if="show_alert_first_start"
                    class="mt-3"
                    text
                    prominent
                    type="primary"
                    icon="mdi-emoticon-happy-outline"
            >
                <v-row align="center">
                    <v-col class="">
                        Привет, друг! На балансе сообщества есть жетон, его достаточно чтобы бесплатно запустить одну
                        любую игру. Выбирай из списка ниже и жми “Создать игру”.
                    </v-col>
                </v-row>
            </v-alert>
            <v-row justify="center">
                <!--            Морской бой-->
                <v-col>
                    <v-card
                            class="mx-auto mmm"
                            :max-width="max_width_card"
                            min-width="296"
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
                                    {{ price_type_5 }}₽
                                </div>
                                <div v-else class="overline1 free_color">
                                    <v-chip
                                            class="mr-1"
                                            color="red"
                                            x-small
                                            dark
                                    >
                                        new
                                    </v-chip>
                                    Бесплатно
                                </div>
                                <v-list-item-title class="mb-1"
                                                   :class="$vuetify.breakpoint.name !== 'xs' ? 'name_game' : 'name_game_16'">
                                    Морской бой
                                </v-list-item-title>
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
                            <v-btn color="primary" text :to="/sea_battle/ + auth_data_url">Создать игру</v-btn>
                            <v-btn v-show="show_example_btn" color="primary" text
                                   href="https://vk.com/club197375430?w=wall-197375430_152" target="_blank">Пример
                            </v-btn>
                            <v-btn color="primary" text
                                   href="https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-morskoy-boy"
                                   target="_blank">Подробнее
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <!--            Битва комментаторов-->
                <v-col>
                    <v-card
                            class="mx-auto mmm"
                            :max-width="max_width_card"
                            min-width="296"
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
                                    {{ price_type_4 }}₽
                                </div>
                                <div v-else class="overline1  free_color">
                                    <v-chip
                                            class="mr-1"
                                            color="red"
                                            x-small
                                            dark
                                    >
                                        new
                                    </v-chip>
                                    Бесплатно
                                </div>
                                <v-list-item-title class="mb-1"
                                                   :class="$vuetify.breakpoint.name !== 'xs' ? 'name_game' : 'name_game_16'">
                                    Битва комментаторов
                                </v-list-item-title>
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
                            <v-btn color="primary" text :to="/max_comments/ + auth_data_url">Создать игру</v-btn>
                            <v-btn v-show="show_example_btn" color="primary" text
                                   href="https://vk.com/club197375430?w=wall-197375430_151" target="_blank">Пример
                            </v-btn>
                            <v-btn color="primary" text
                                   href="https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-bitva-kommentatorov"
                                   target="_blank">Подробнее
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card
                            class="mx-auto"
                            :max-width="max_width_card"
                            min-width="296"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div v-if="group_status === 2" class="overline1  free_color"><s>{{ base_price_type_1
                                    }}</s> {{ price_type_1 }}₽
                                </div>
                                <div v-else class="overline1  free_color">Бесплатно</div>
                                <v-list-item-title class="mb-1"
                                                   :class="$vuetify.breakpoint.name !== 'xs' ? 'name_game' : 'name_game_16'">
                                    Угадай число
                                </v-list-item-title>
                                <v-list-item-subtitle class="pt-2">Загадайте число. Тот из игроков, кто первым отгадает,
                                    получит приз.
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
                            <v-btn color="primary" text :to="/guess_number_settings/ + auth_data_url">Создать игру
                            </v-btn>
                            <v-btn v-show="show_example_btn" color="primary"
                                   href="https://vk.com/club197375430?w=wall-197375430_21" target="_blank" text>Пример
                            </v-btn>
                            <v-btn color="primary"
                                   href="https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-ugaday-chislo"
                                   target="_blank" text>Подробнее
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                            class="mx-auto"
                            :max-width="max_width_card"
                            min-width="296"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div v-if="group_status === 2" class="overline1  free_color"><s>{{ base_price_type_2
                                    }}</s> {{ price_type_2 }}₽
                                </div>
                                <div v-else class="overline1  free_color">Бесплатно</div>
                                <v-list-item-title class="mb-1"
                                                   :class="$vuetify.breakpoint.name !== 'xs' ? 'name_game' : 'name_game_16'">
                                    Анаграммы
                                </v-list-item-title>
                                <v-list-item-subtitle class="pt-2">Загадайте слово, а игроки будут составлять из него
                                    другие слова.
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
                            <v-btn color="primary" text :to="/anagram/ + auth_data_url">Создать игру</v-btn>
                            <v-btn v-show="show_example_btn" color="primary"
                                   href="https://vk.com/club197375430?w=wall-197375430_22" target="_blank" text>Пример
                            </v-btn>
                            <v-btn color="primary"
                                   href="https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-anagrammy"
                                   target="_blank" text>Подробнее
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card
                            class="mx-auto"
                            :max-width="max_width_card"
                            min-width="296"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div v-if="group_status === 2" class="overline1  free_color"><s>{{ base_price_type_3
                                    }}</s> {{ price_type_3 }}₽
                                </div>
                                <div v-else class="overline1  free_color">Бесплатно</div>
                                <v-list-item-title class="mb-1"
                                                   :class="$vuetify.breakpoint.name !== 'xs' ? 'name_game' : 'name_game_16'">
                                    Слова на букву(ы)
                                </v-list-item-title>
                                <v-list-item-subtitle class="pt-2">Выигрывает тот, кто напишет больше слов на загаданную
                                    букву.
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
                            <v-btn color="primary" text :to="/words_with_letter/ + auth_data_url">Создать игру</v-btn>
                            <v-btn v-show="show_example_btn" color="primary"
                                   href="https://vk.com/club197375430?w=wall-197375430_23" target="_blank" text>Пример
                            </v-btn>
                            <v-btn color="primary" text
                                   href="https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-slova-na-bukvu-y"
                                   target="_blank">Подробнее
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                            class="mx-auto"
                            :max-width="max_width_card"
                            min-width="296"
                            :min-height="min_height_mobile_web"
                            disabled
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline1  free_color"></div>
                                <v-list-item-title class="mb-1"
                                                   :class="$vuetify.breakpoint.name !== 'xs' ? 'name_game' : 'name_game_16'">
                                    Игра в разработке
                                </v-list-item-title>
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
                            <v-btn color="primary" text :to="/words_with_letter/ + auth_data_url">Создать игру</v-btn>
                            <v-btn v-show="show_example_btn" color="primary"
                                   href="https://vk.com/club197375430?w=wall-197375430_23" target="_blank" text>Пример
                            </v-btn>
                            <v-btn color="primary" text
                                   href="https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-slova-na-bukvu-y"
                                   target="_blank">Подробнее
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    import auto_resize from "@/mixins/auto_resize";
    import bridge from "@vkontakte/vk-bridge";

    export default {
        mixins: [auto_resize],
        props: ['settings', 'auth_data_url', 'storageAvailable'],
        data: () => ({
            auth_data: '',
            mobile: '',
            prices: [],
            group_status: '',
            show_alert_first_start: false,
            show_sceleton: true,
            token_availability: true,
            incognito_mode: true,
        }),
        mounted: async function () {
            if (!this.storageAvailable || !localStorage.getItem('create_group_' + this.settings.auth_data.vk_group_id)) {
                await this.create_group()
            }
            if (!this.storageAvailable || !localStorage.getItem('not_launch_games_' + this.settings.auth_data.vk_group_id)) {
                await this.get_group_info()
            }
            this.mobile = this.auth_data.vk_platform !== 'desktop_web'
            await this.get_group_status()
            if (this.group_status === 2) {
                await this.get_prices()
            }
            this.show_sceleton = false
            setTimeout(this.auto_resize, 5000)
        },
        computed: {
            min_height_mobile_web: function () {
                if (this.settings.auth_data.vk_platform === 'mobile_web') {
                    return 186
                } else return ''
            },
            show_example_btn: function () {
                if (this.$vuetify.breakpoint.name === 'xs') {
                    return false
                } else if (this.settings.auth_data.vk_platform === 'mobile_web') {
                    return false
                } else return true
            },

            max_width_card: function () {
                if (this.settings.auth_data.vk_platform !== 'desktop_web') {
                    return 346
                } else {
                    return 380
                }
            },
            show_alert_grant_rights() {
                if (!this.show_alert_first_start && !this.token_availability) {
                    return true
                } else {
                    return false
                }
            },
            price_type_1() {
                let obj = this.prices.find(item => item.game_type === 1)
                if (obj === undefined)
                    return
                return obj.price
            },
            price_type_2() {
                let obj = this.prices.find(item => item.game_type === 2)
                if (obj === undefined)
                    return
                return obj.price
            },
            price_type_3() {
                let obj = this.prices.find(item => item.game_type === 3)
                if (obj === undefined)
                    return
                return obj.price
            },
            price_type_4() {
                let obj = this.prices.find(item => item.game_type === 4)
                if (obj === undefined)
                    return
                return obj.price
            },
            price_type_5() {
                let obj = this.prices.find(item => item.game_type === 5)
                if (obj === undefined)
                    return
                return obj.price
            },
            base_price_type_1() {
                let obj = this.prices.find(item => item.game_type === 1)
                if (obj === undefined)
                    return
                return obj.base_price
            },
            base_price_type_2() {
                let obj = this.prices.find(item => item.game_type === 2)
                if (obj === undefined)
                    return
                return obj.base_price
            },
            base_price_type_3() {
                let obj = this.prices.find(item => item.game_type === 3)
                if (obj === undefined)
                    return
                return obj.base_price
            },
            base_price_type_4() {
                let obj = this.prices.find(item => item.game_type === 4)
                if (obj === undefined)
                    return
                return obj.base_price
            },
            base_price_type_5() {
                let obj = this.prices.find(item => item.game_type === 5)
                if (obj === undefined)
                    return
                return obj.base_price
            },
        },
        methods: {
            VKWebAppGetCommunityToken: async function () {
                try {
                    let response = await bridge.send("VKWebAppGetCommunityToken", {
                        "app_id": +this.settings.auth_data.vk_app_id,
                        "group_id": +this.settings.auth_data.vk_group_id,
                        "scope": "messages, manage, wall"
                    })
                    console.log(response)
                    if (response.access_token) {
                        this.getTokenPermissions(response.access_token)
                    } else {
                        this.err_mess_rules = 'предоставленны не все права'
                    }
                } catch (e) {
                    console.log('пользователь нажал кнопку отмена')
                }
            },
            getTokenPermissions: async function (token_group) {
                let response = await bridge.send("VKWebAppCallAPIMethod", {
                    "method": "groups.getTokenPermissions",
                    "params": {"v": "5.107", "access_token": token_group}
                })
                // console.log(response)
                let mask = response.response.mask
                if (mask !== 274432) {
                    // this.message_error = 'предоставленны не все права'
                    // setTimeout(this.clear_message, 5000)
                } else if (mask === 274432) {
                    await this.put_data_group(token_group, mask)
                    // this.$refs.child_methods.get_group_status()
                }
            },
            put_data_group: async function (token_group, mask) {
                let obj = {}
                obj.auth_data = this.settings.auth_data
                obj.access_token = token_group
                obj.access_token_permission = mask

                let response = await fetch('/app/wallgames/group/' + this.settings.auth_data.vk_group_id + '/',
                    {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(obj)
                    })
                if (response.ok) {
                    // response = await response.json()
                    this.token_availability = true
                    // console.log(response)
                } else {
                    response = await response.json()
                    console.log(response)
                }
            },
            go_description_page: function (url) {
                window.open(url, '_blank')
            },
            get_prices: async function () {
                // let response = await fetch("/app/wallgames/payments/prices/" + sessionStorage.getItem('auth_data_url'))
                let response = await fetch("/app/wallgames/payments/prices/" + this.auth_data_url)
                if (response.ok) {
                    this.prices = await response.json()
                } else {
                    response = await response.json()
                    console.log(response)
                }
            },
            check_token: async function () {
                // let response = await fetch("/app/wallgames/group/" + this.settings.auth_data.id_group_vk + '/check_token/' + sessionStorage.getItem('auth_data_url'))
                let response = await fetch("/app/wallgames/group/" + this.settings.auth_data.id_group_vk + '/check_token/' + this.auth_data_url)
                if (response.ok) {
                    response = await response.json()
                    console.log(response)
                } else {
                    response = await response.json()
                    console.log(response)
                }
            },
            get_group_status: async function () {
                // let response = await fetch("/app/wallgames/group/" + this.settings.auth_data.vk_group_id + "/status/" + sessionStorage.getItem('auth_data_url'))
                let response = await fetch("/app/wallgames/group/" + this.settings.auth_data.vk_group_id + "/status/" + this.auth_data_url)
                if (response.ok) {
                    response = await response.json()
                    this.group_status = +response.status
                } else {
                    response = await response.json()

                    if (response.error.code === 15) {
                        this.group_status = 2
                        this.token_availability = false
                        return console.log(response.error.desc)
                    }
                    console.log(response)
                }
            },
            // информация, запускалась ли когда-либо игра в данном сообществе
            get_group_info: async function () {
                console.log('get_group_info')
                let response = await fetch("/app/wallgames/group_info/" + this.settings.auth_data.vk_group_id + this.auth_data_url)
                if (response.ok) {
                    response = await response.json()
                    if (response.not_launch_games) {
                        this.show_alert_first_start = true
                    } else {
                        if (this.storageAvailable) {
                        localStorage.setItem('not_launch_games_' + this.settings.auth_data.vk_group_id, false)
                    }}
                } else {
                    response = await response.json()
                    console.log(response)
                }
            },
            create_group: async function () {
                let obj = {}
                obj.auth_data = this.settings.auth_data
                let response = await fetch('/app/wallgames/group/' + this.auth_data_url,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(obj)
                    })
                if (response.ok) {
                    if (this.storageAvailable) {
                        localStorage.setItem('create_group_' + this.settings.auth_data.vk_group_id, 'true')
                    }
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
        letter-spacing: .1em !important;
        line-height: 2rem;
        text-transform: uppercase;
        font-family: Roboto, sans-serif !important;
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
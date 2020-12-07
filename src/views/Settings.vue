<template>
    <div>
        <v-row>
            <v-col :cols="$vuetify.breakpoint.name !== ('xs') ? 3 : 12" align="center">
                <v-img
                        src="https://sun9-18.userapi.com/vrm4aRKhq6oCpK0qZO7LNyFI4-YqddwUPhadug/z3CaBEs-FiE.jpg"
                        max-height="184"
                        max-width="184"
                ></v-img>
            </v-col>
            <v-col :cols="$vuetify.breakpoint.name !== ('xs') ? 9 : 12">
                <span><b>Пьедестал</b></span><br>
                <span>Интеграция даст следующие возможности:<br>
                1. В призах у игр появится вариант начисления баллов рейтинга и баланса магазина. <br>
                2. Добавится функция «платные попытки», пользователь сможет тратить баллы рейтинга / магазина для покупки дополнительных попыток в игре.</span>
                <v-row class="mt-2"  :justify="$vuetify.breakpoint.name !== ('xs') ? 'left' : 'space-around'">
                    <v-btn
                           href="https://vk.com/@pedestal-igry-integraciya-s-pedestalom" target="_blank"
                           small
                           color="primary"
                           min-width="150"
                           :class="{'mx-3' : $vuetify.breakpoint.name !== ('xs') }"
                    >Подробнее

                    </v-btn>
                    <v-btn
                            :loading="loading"
                            :disabled="loading"
                            @click="put_data_group"
                            small
                            color="primary"
                            min-width="150"
                    >{{integration_btn_name}}
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
        <v-alert
                v-if="show_alert"
                class="mt-3"
                text
                prominent
                type="primary"
                icon="mdi-progress-alert"
        >
            <v-row align="center">
                <v-col class="">
                    Приложение Пьедестал не подключено в сообществе.
                </v-col>
                <v-col class="shrink">
                    <v-btn href="https://vk.com/app7147757" target="_blank" small color="primary">Подключить</v-btn>
                </v-col>
            </v-row>
        </v-alert>
<!--        <v-btn small block dark min-width="710" color="error">Установить виджет</v-btn>-->
    </div>
</template>

<script>
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        props: ['license_expiration_at', 'settings', 'auth_data_url'],
        data: () => ({
            // settings: {
            //     auth_data: ''
            // },
            loader: 'loading',
            loading: false,
            pedestal_integration_enabled: '',
            show_alert: false,
            // auth_data_url: '',
        }),
        mounted: async function () {
            this.loading = true
            // await this.getAllUrlParams()
            await this.get_data_group()
            this.loading = false
        },
        computed: {
            possibility_integration_pedestal: function () {
                if (this.loading || this.license_expiration_at < this.now) {
                    return true
                } else {
                    return false
                }
            },
            integration_btn_name: function () {
                if (this.pedestal_integration_enabled === true) {
                    return 'Деактивировать'
                } else if (this.pedestal_integration_enabled === false) {
                    return 'Активировать'
                } else {
                    return ''
                }
            }
        },
        methods: {
            put_data_group: async function () {
                // if (!this.license_expiration_at && !this.pedestal_integration_enabled) {
                //     this.show_alert = true
                //     console.log('Приложение Пьедестал не обнаружено в сообществе')
                //     return
                // }
                this.loading = true
                let obj = {}
                obj.auth_data = this.settings.auth_data
                // в данный момент кнопку не меняем, ждем ответа от сервера, если успешно, меняем
                obj.pedestal_integration_enabled = !this.pedestal_integration_enabled
                let response = await fetch('/app/wallgames/group/' + this.settings.auth_data.vk_group_id + '/',
                    {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(obj)
                    })
                if (response.ok) {
                    response = await response.json()
                    // console.log(response)
                    if (obj.pedestal_integration_enabled !== response.pedestal_integration_enabled) {
                        this.show_alert = true
                        console.log('Приложение Пьедестал не обнаружено в сообществе')
                    }
                    this.pedestal_integration_enabled = response.pedestal_integration_enabled

                    // await this.get_data_group()

                } else {
                    response = await response.json()
                    console.log(response)
                }
                this.loading = false
            },
            get_data_group: async function () {
                // let response = await fetch('/app/wallgames/group/' + this.settings.auth_data.vk_group_id + '/' + sessionStorage.getItem('auth_data_url'))
                let response = await fetch('/app/wallgames/group/' + this.settings.auth_data.vk_group_id + '/' + this.auth_data_url)
                if (response.ok) {
                    response = await response.json()
                    this.pedestal_integration_enabled = response.pedestal_integration_enabled

                } else {
                    let result = await response.json()
                    console.log(result)
                }
            },
        }
    }
</script>

<style>

</style>
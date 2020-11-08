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
                <v-row class="mt-2"  :justify="$vuetify.breakpoint.name !== ('xs') ? 'left' : 'space-between'">
                    <v-btn class="mx-3"
                           @click="go_description_page ('https://vk.com/@pedestal-igry-integraciya-s-pedestalom')"
                           small
                           color="primary">Подробнее
                    </v-btn>
                    <v-btn
                            class="mx-1"
                            @click="put_data_group"
                            small
                            color="primary"
                            :loading="loading"
                            :disabled="loading"
                            min-width="150"
                    >{{integration_btn_name}}
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        data: () => ({
            settings: {
                auth_data: ''
            },
            loader: 'loading',
            loading: false,
            pedestal_integration_enabled: ''
        }),
        mounted: async function () {
            this.loading = true
            await this.getAllUrlParams()
            await this.get_data_group()
            this.loading = false
        },
        computed: {
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
                    await this.get_data_group()
                    // response = await response.json()
                    // console.log(response)
                } else {
                    response = await response.json()
                    console.log(response)
                }
                this.loading = false
            },
            get_data_group: async function () {
                let response = await fetch('/app/wallgames/group/' + this.settings.auth_data.vk_group_id + '/' + sessionStorage.getItem('auth_data_url'))
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
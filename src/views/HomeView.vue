<template>
    <div class="px-3">
        <v-row v-if="show_skeleton" class="ml-0">
            <v-col>
                <v-skeleton-loader
                        type='heading'
                ></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row v-else align="center" class="mx-0">
            <v-col v-if="$vuetify.breakpoint.name === 'xs'" justify="center" class="px-0 py-0">
                <v-tabs>
                    <v-tab to="/choice_games" class="tab_mobile">Создать</v-tab>
                    <v-tab to="/my_games" class="tab_mobile">Мои игры</v-tab>
                    <v-tab to="/settings" class="tab_mobile">Сервисы</v-tab>
                    <v-tab to="/balance" class="tab_mobile">Баланс</v-tab>
                </v-tabs>
            </v-col>
            <v-col v-else class="py-0 px-0" cols="auto">
                <v-tabs ripple="false">
                    <v-tab to="/choice_games">Новая игра</v-tab>
                    <v-tab to="/my_games">Мои игры</v-tab>
                    <v-tab to="/settings">Сервисы</v-tab>
                    <v-tab to="/balance">Баланс: {{balance}}₽, {{games_available_launches}}Ж</v-tab>
                </v-tabs>
            </v-col>
            <v-col v-if="show_btn_permission" class="py-0" cols="auto">
                <v-btn

                        :x-small="$vuetify.breakpoint.name === 'xs' ? true : false"
                        :small="$vuetify.breakpoint.name !== 'xs' ? true : false"
                        @click="VKWebAppGetCommunityToken"
                        color="red"
                        dark
                >Предоставить права
                </v-btn>
                                    <p class="mb-0" id="err_mess_rules">{{err_mess_rules}}</p>
            </v-col>
        </v-row>

        <router-view
                ref="child_methods"
                @load_balance="load_balance"
                :games_available_launches="games_available_launches"
                :balance="balance"
        ></router-view>
    </div>
</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        data: () => ({
            show_skeleton: true,
            games_available_launches: 0,
            err_mess_rules: '',
            settings: {
                auth_data: ''
            },
            balance: '0',
            show_btn_permission: false
        }),
        mounted: async function () {
            await this.getAllUrlParams()
            if (!await this.get_data_group()) {
                this.VKWebAppGetCommunityToken()
            }
            await this.load_balance()
            this.show_skeleton = false
        },
        watch: {
            err_mess_rules: function () {
                setTimeout(this.clear, 5000)
            }
        },
        methods: {
            VKWebAppGetCommunityToken: async function () {
                try {
                    let response = await bridge.send("VKWebAppGetCommunityToken", {
                        "app_id": +this.settings.auth_data.vk_app_id,
                        "group_id": +this.settings.auth_data.vk_group_id,
                        "scope": "messages, manage, wall"
                    })
                    if (response.scope === "messages,manage,wall" && response.access_token) {
                        this.VKWebAppCallAPIMethod(response.access_token)
                    } else {
                        this.err_mess_rules = 'предоставленны не все права'
                    }
                } catch (e) {
                    console.log('пользователь нажал кнопку отмена')
                }


            },
            VKWebAppCallAPIMethod: async function (token_group) {
                let response = await bridge.send("VKWebAppCallAPIMethod", {
                    "method": "groups.getTokenPermissions",
                    "params": {"v": "5.107", "access_token": token_group}
                })
                let mask = response.response.mask
                if (mask !== 274432) {
                    this.err_mess_rules = 'предоставленны не все права'
                } else if (mask === 274432) {
                    await this.put_data_group(token_group, mask)
                    this.$refs.child_methods.get_group_status()
                }
            },
            clear: function () {
                this.err_mess_rules = ''
            },
            load_balance: async function () {
                let response = await fetch('/app/wallgames/admin/' + this.settings.auth_data.vk_user_id + '/balance/' + sessionStorage.getItem('auth_data_url'))
                if (response.ok) {
                    response = await response.json()
                    this.balance = +response.balance
                } else {
                    let result = await response.json()
                    console.log(result)
                    this.balance = 0
                }
            },

            get_data_group: async function () {
                let response = await fetch('/app/wallgames/group/' + this.settings.auth_data.vk_group_id + '/' + sessionStorage.getItem('auth_data_url'))
                if (response.ok) {
                    response = await response.json()
                    this.games_available_launches = response.games_available_launches
                    if (response.access_token_permission) {
                        this.show_btn_permission = false
                        return 1
                    } else {
                        this.show_btn_permission = true
                        return 0
                    }
                } else {
                    let result = await response.json()
                    console.log(result)
                    this.balance = 0
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
                    response = await response.json()
                    this.show_btn_permission = false
                    console.log(response)
                } else {
                    response = await response.json()
                    console.log(response)
                }
            },
        }
    }
</script>

<style>
    #err_mess_rules {
        color: red;
        font-size: 12px;
    }

    .v-slide-group__prev {
        display: none !important;
    }

    .tab_mobile {
        font-size: 11px !important;
        padding-left: 0px;
        padding-right: 0px;
        min-width: 77px;
    }

    .v-tab1 {
        padding-left: 0px;
        padding-right: 0px;
        min-width: 77px;
    }

    .v-tabs-slider-wrapper {
        /*bottom: 14px;*/
    }


</style>
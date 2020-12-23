<template>
    <div class="px-3">
        <div v-if="!computer_mode" class="mobile_background_top">
            <div class="mobile_menu">
                <v-menu
                        bottom
                        offset-y="true"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                small
                                text
                        >
                            <v-icon class="mr-1">mdi-menu</v-icon>
                            {{$route.name}}
                        </v-btn>
                    </template>
                    <v-list
                    >
                        <v-list-item
                                v-for="(item, index) in items"
                                :key="index"
                                :to="item.to"
                        >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                                href="https://vk.me/pedestal"
                                target="_blank"
                        >
                            <v-list-item-title>Поддержка</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </div>
        <v-row v-if="show_skeleton" class="ml-0">
            <v-col>
                <v-skeleton-loader
                        type='heading'
                ></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row v-if="!show_skeleton && computer_mode" align="center" class="mx-0">
            <v-col class="py-0 px-0" cols="auto">
                <v-tabs ripple="false">
                    <v-tab :to="/choice_games/ + auth_data_url">Новая игра</v-tab>
                    <v-tab :to="/my_games/ + auth_data_url">Мои игры</v-tab>
                    <v-tab :to="/settings/ + auth_data_url">Сервисы</v-tab>
                    <v-tab :to="/balance/ + auth_data_url">Баланс: {{balance}}₽, {{games_available_launches}}Ж</v-tab>
                </v-tabs>
            </v-col>
            <v-col align="right">
                <v-tooltip left max-width="280" color="rgba(48, 44, 44, 0.99)">
                    <template v-slot:activator="{ on }">
                        <v-btn icon href="https://vk.me/pedestal" target="_blank">
                            <v-icon v-on="on" color="primary">mdi-face-agent</v-icon>
                        </v-btn>
                    </template>
                    <span>Поддержка</span>
                </v-tooltip>
            </v-col>
        </v-row>

        <router-view
                ref="child_methods"
                @load_balance="load_balance"
                :balance="balance"
                :license_expiration_at="license_expiration_at"
                :incognito_mode="incognito_mode"
                :auth_data_url="auth_data_url"
                :online="online"
                :settings="settings"
                :storageAvailable="storageAvailable"
                :games_available_launches="games_available_launches"
                v-model="data_bus"
        ></router-view>
    </div>
</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        model: {
            prop: 'data_bus'
        },
        props: ['settings', 'auth_data_url', 'data_bus', 'online'],
        data: () => ({
            license_expiration_at: null,
            show_skeleton: true,
            games_available_launches: 0,
            err_mess_rules: '',
            select_menu: '',
            balance: '0',
            incognito_mode: false,
            storageAvailable: false
        }),
        mounted: async function () {
            if (this.storageAvailableFun('localStorage')) {
                this.storageAvailable = true
            } else {
                this.storageAvailable = false
            }
            // if (!this.storageAvailable || !localStorage.getItem('create_group_' + this.settings.auth_data.vk_group_id)) {
            //     await this.create_group()
            // }
            await this.create_group()
            await this.get_data_group()
            await this.load_balance()
            this.show_skeleton = false
        },
        watch: {
            err_mess_rules: function () {
                setTimeout(this.clear, 5000)
            }
        },
        computed: {
            items() {
                return [
                    {title: 'Новая игра', to: "/choice_games/" + this.auth_data_url, icon: 'currency-usd'},
                    {title: 'Мои игры', to: "/my_games/" + this.auth_data_url, icon: 'currency-usd'},
                    {title: 'Сервисы', to: "/settings/" + this.auth_data_url, icon: 'currency-usd'},
                    {title: 'Баланс', to: "/balance/" + this.auth_data_url, icon: 'currency-usd'},
                ]
            },
            computer_mode() {
                if (this.settings.auth_data.vk_platform === 'desktop_web') {
                    return true
                } else {
                    if (this.settings.auth_data.vk_platform === 'mobile_web' && this.$vuetify.breakpoint.name !== ('xs')) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        },
        methods: {
            create_group: async function () {
                // console.log('create_group')
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
                    // console.log(response)
                    if (this.storageAvailable) {
                        localStorage.setItem('create_group_' + this.settings.auth_data.vk_group_id, 'true')
                    }
                } else {
                    response = await response.json()
                    console.log(response)
                }
            },
            storageAvailableFun: function (type) {
                try {
                    let storage = window[type];
                    let x = '__storage_test__';
                    storage.setItem(x, x);
                    storage.removeItem(x);
                    return true;
                } catch (e) {
                    return false;
                }
            },
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
                console.log(response)
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
                // let response = await fetch('/app/wallgames/admin/' + this.settings.auth_data.vk_user_id + '/balance/' + sessionStorage.getItem('auth_data_url'))
                let response = await fetch('/app/wallgames/admin/' + this.settings.auth_data.vk_user_id + '/balance/' + this.auth_data_url)
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
                let response = await fetch('/app/wallgames/group/' + this.settings.auth_data.vk_group_id + '/' + this.auth_data_url)
                if (response.ok) {
                    response = await response.json()
                    this.license_expiration_at = response.license_expiration_at
                    this.games_available_launches = response.games_available_launches
                    this.data_bus.pedestal_integration_enabled = response.pedestal_integration_enabled
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

<style scoped>
    .v-label {
        font-size: 0px !important;
    }

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
        min-width: 74px;
    }

    .v-tab1 {
        padding-left: 0px;
        padding-right: 0px;
        min-width: 74px;
    }

    .v-tabs-slider-wrapper {
        /*bottom: 14px;*/
    }

    .mobile_menu {
        background-color: #ffffff;
        position: fixed;
        top: 34px;
        top: calc(constant(safe-area-inset-top) + 14px);
        top: calc(env(safe-area-inset-top) + 14px);
        left: 12px;
        width: 100%;
        z-index: 6;
    }


</style>
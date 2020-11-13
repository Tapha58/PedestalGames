<template>
    <v-app id="app">
        <div v-if="$vuetify.breakpoint.name !== ('xs' || 'sm') ? false : true" id="mobile_background_top">
            <v-row class="mx-0">
                <v-col class="px-0 pt-7">
                    <p class="pl-3 mb-0" id="group_name">{{group_name}}</p>
                </v-col>

            </v-row>
        </div>

        <!--        <v-btn v-show="$route.path !== '/map/'" id="square" depressed  dark color="#4a76a8" @click="go_widget_page">Вернуться в основное меню</v-btn>-->
        <v-btn v-show="show_btn_pedestal" id="square" depressed dark color="#4a76a8" @click="go_widget_page">Вернуться в
            основное меню
        </v-btn>
        <!--        <v-btn @click="console">console</v-btn>-->
        <router-view></router-view>
    </v-app>
</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        data: () => ({
            token: '',
            settings: {
                auth_data: ''
            },
            group_name: '',
        }),
        methods: {
            go_widget_page: function () {
                // document.location.href = '/app/' + sessionStorage.getItem('auth_data_url')
                document.location.href = '/app/' + sessionStorage.getItem('auth_data_url')
            },
            groups_getById: async function () {
                try {
                    let response = await bridge.send("VKWebAppCallAPIMethod", {
                        "method": "groups.getById",
                        "request_id": "32test",
                        "params": {
                            "v": "5.124",
                            "group_id": this.settings.auth_data.vk_group_id,
                            "access_token": this.token
                        }
                    })
                    this.group_name = response.response[0].name

                } catch (error) {
                    console.error('Ошибка', error)
                }
            },
            vkWebAppGetAuthToken: async function () {
                try {
                    let response = await bridge.send("VKWebAppGetAuthToken", {
                        "app_id": +this.settings.auth_data.vk_app_id,
                        "scope": ""
                    })
                    this.token = response.access_token
                    // console.log('Успех token - ', response.access_token)
                } catch (error) {
                    console.error('Ошибка - url ', error)
                }
            },
        },
        mounted: async function () {
            await bridge.send("VKWebAppInit")
            sessionStorage.setItem('auth_data_url', document.location.search)
            if (/#map/.test(window.location.href)) {
                let str = window.location.href
                let map = str.substr(str.indexOf("map=") + 4);
                this.$router.push({path: '/map/' + map})
            }
            await this.getAllUrlParams()
            await this.vkWebAppGetAuthToken()
            if (this.settings.auth_data.vk_group_id) {
                await this.groups_getById()
            }


        },
        computed: {
            show_btn_pedestal: function () {
                return /#pedestal/.test(window.location.href)
            },
        },
    }

</script>


<style>
    .dense-textarea textarea {
        line-height: 1.4rem !important;
    }


    html {
        overflow-x: auto !important;
        overflow-y: auto !important;

        /*width: 795px;*/
    }

    #square {
        border-radius: 0 !important;
    }

    .compact-form {
        transform: scale(0.875);
        transform-origin: left;
    }

    .v-application--wrap {
        min-height: auto !important;
    }

    #mobile_background_top {
        background-color: #4a76a8;
        min-height: 60px;
    }



    #group_name {
        color: white;
        text-overflow: ellipsis; /* will make [...] at the end */
        width: 320px; /* change to your preferences */
        white-space: nowrap; /* paragraph to one line */
        overflow:hidden; /* older browsers */
    }

</style>

<template>
    <v-app id="app">
        <v-btn v-show="show_btn_pedestal" id="square" depressed dark color="#4a76a8" @click="go_widget_page">Вернуться в
            основное меню
        </v-btn>
        <div id="safe_area_bottom"></div>
        <router-view
                v-model="data_bus"
                id="bottom_iphone"
                :settings="settings"
                :auth_data="settings.auth_data"
                :auth_data_url="auth_data_url"
                :pedestal_integration_enabled="data_bus.pedestal_integration_enabled"
                class="px-0" :class="{ router : $vuetify.breakpoint.name === 'xs' }">
        </router-view>
    </v-app>
</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        data: () => ({
            data_bus: {
                pedestal_integration_enabled: ''
            },
            token: '',
            settings: {
                auth_data: ''
            },
            group_name: '',
            incognito_mode: true,
            auth_data_url: '',
            storageAvailable: false,
        }),
        methods: {
            go_widget_page: function () {
                document.location.href = '/app/' + this.auth_data_url
            },
            close_app: function (event) {
                if (event.state === null) {
                    console.log('закрываем приложение')
                    bridge.send("VKWebAppClose", {"status": "success"})
                }
            }
        },
        created: async function () {
            await this.getAllUrlParams()
        },
        mounted: async function () {

            await bridge.send("VKWebAppInit")
            window.onpopstate = this.close_app
            if (bridge.supports("VKWebAppSetViewSettings")) {
                bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "dark", "action_bar_color": "#ffffff"})
            }

            // если в ссылке map, то это игровое поле, и роутим на него
            if (/#map/.test(window.location.href)) {
                let str = window.location.href
                let map = str.substr(str.indexOf("map=") + 4);
                console.log('/map/' + map + this.auth_data_url)
                this.$router.push({path: '/map/' + map + this.auth_data_url})
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
    #app {


    }

    .dense-textarea textarea {
        line-height: 1.4rem !important;
    }

    html {
        overflow-x: auto !important;
        overflow-y: auto !important;
        background: white;

    }

    #bottom_iphone {
        padding-bottom-bottom: constant(safe-area-inset-bottom) !important;
        padding-bottom: env(safe-area-inset-bottom) !important;
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

    .mobile_background_top {
        background-color: white;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 6;
        border-bottom: #ccc solid 1px;
        padding-top: calc(constant(safe-area-inset-top) + 52px);
        padding-top: calc(env(safe-area-inset-top) + 52px);
    }

    .router {
        top: 83px;
        top: calc(constant(safe-area-inset-top) + 64px);
        top: calc(env(safe-area-inset-top) + 64px);
        position: relative;
        z-index: 7;
        min-width: 320px;

    }

    .px6px {
        padding-right: 6px !important;
        padding-left: 6px !important;
    }

    #group_name {
        color: #ccc;
        text-overflow: ellipsis; /* will make [...] at the end */
        width: 320px; /* change to your preferences */
        white-space: nowrap; /* paragraph to one line */
        overflow: hidden; /* older browsers */
    }

    #safe_area_bottom {
        background-color: white;
        height: constant(safe-area-inset-bottom);
        height: env(safe-area-inset-bottom);
        position: fixed;
        z-index: 8;
        width: 100%;
        bottom: 0;
    }




</style>

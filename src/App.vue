<template>
    <v-app id="app">
<!--      <h1>привет</h1>-->
        <v-btn
            v-show="from_pedestal"
            id="square"
            depressed
            dark
            color="#4a76a8"
            :href="'https://vk.com/app7147757_-' + vk_group_id_pedestal"
            target="_parent"
            :class="{back_pedestal : !computer_mode}"
        >Вернуться в основное меню
        </v-btn>
        <div id="safe_area_bottom"></div>
        <router-view
                v-model="data_bus"
                id="bottom_iphone"
                :settings="settings"
                :auth_data="settings.auth_data"
                :auth_data_url="auth_data_url"
                :online="online"
                :from_pedestal="from_pedestal"
                :pedestal_integration_enabled="data_bus.pedestal_integration_enabled"
                :vk_group_id_pedestal="data_bus.vk_group_id_pedestal"
                class="px-0" :class="{ router : $vuetify.breakpoint.name === 'xs' }">
        </router-view>
        <v-dialog
                v-model="offline"
                persistent
                width="300"
        >
            <v-card
                    color="primary"
                    dark
            >
                <v-card-text align="center">
                    Отсутствует интернет соединение
                    <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import auto_resize from "@/mixins/auto_resize";
    import shim from 'string.prototype.matchall/shim';
    shim()

    export default {
        mixins: [auto_resize],
        data: () => ({
            data_bus: {
                pedestal_integration_enabled: '',
                vk_group_id_pedestal: '',
                url_atr: '',
            },
            token: '',
            settings: {
                auth_data: ''
            },
            group_name: '',
            incognito_mode: true,
            auth_data_url: '',
            storageAvailable: false,
            online: true,
            offline: false,
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
            },


        },
        created: async function () {
            await this.getAllUrlParams()
        },
        mounted: async function () {
          this.data_bus.url_atr = window.location.href




          await bridge.send("VKWebAppInit")
            window.addEventListener('offline', () => {
                console.log("The network connection has been lost.");
                this.online = false
                this.offline = true
            });
            // addEventListener version
            window.addEventListener('online', () => {
                console.log("You are now connected to the network.");
                this.online = true
                this.offline = false
            });
            // onoffline version
            // window.onoffline = () => {
            //     console.log("The network connection has been lost1.");
            // };

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
            from_pedestal: function () {
                return /#pedestal/.test(window.location.href)
            },
          vk_group_id_pedestal: function () {
            let url = window.location.href
            if (/#pedestal/.test(url)) {
              const matchAll = require('string.prototype.matchall')
              matchAll.shim()
              let result = url.matchAll(/pedestal_(\d+)/g)
              result = Array.from(result)
              console.log(result)
              console.log(result[0][1])
              // this.data_bus.vk_group_id_pedestal = result[0][1]
              // let str = window.location.href
              // const matchAll = require('string.prototype.matchall')
              // matchAll.shim()
              // let result = str.matchAll(/(?<=pedestal_)\d+/g)
              // result = Array.from(result)
              // console.log(result)
              // return result[0]
              return result[0][1]
            } else {
              return ''
            }
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
        -webkit-user-select: none !important;

    }

    /*#bottom_iphone {*/
    /*    padding-bottom-bottom: constant(safe-area-inset-bottom) !important;*/
    /*    padding-bottom: env(safe-area-inset-bottom) !important;*/
    /*}*/

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
        position: static;
        z-index: 8;
        width: 100%;
        bottom: 0;
    }

    .back_pedestal {
      top: 83px;
      top: calc(constant(safe-area-inset-top) + 64px);
      top: calc(env(safe-area-inset-top) + 64px);
    }

    .Panel::after {
        position: fixed;
        background: white;
    }

    .caption {
        -webkit-user-select: text !important;
    }




</style>

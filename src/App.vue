<template>
    <v-app id="app">
        <!--        <div v-if="$vuetify.breakpoint.name !== ('xs' || 'sm') ? false : true" class="mobile_background_top">-->
        <!--            <v-row class="mx-0">-->
        <!--                <v-col class="px-0 pt-7">-->
        <!--                    <p class="pl-3 mb-0" id="group_name">{{group_name}}</p>-->
        <!--                </v-col>-->
        <!--            </v-row>-->
        <!--        </div>-->


        <!--        <v-btn v-show="$route.path !== '/map/'" id="square" depressed  dark color="#4a76a8" @click="go_widget_page">Вернуться в основное меню</v-btn>-->
        <v-btn v-show="show_btn_pedestal" id="square" depressed dark color="#4a76a8" @click="go_widget_page">Вернуться в
            основное меню
        </v-btn>
        <!--        <v-btn @click="console">console</v-btn>-->
                <router-view
                        :settings="settings"
                        :auth_data_url="auth_data_url"
                        class="px-0" :class="{router : $vuetify.breakpoint.name === 'xs'}"></router-view>
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
            incognito_mode: true,
            auth_data_url: '',
        }),
        methods: {
            go_widget_page: function () {
                // document.location.href = '/app/' + sessionStorage.getItem('auth_data_url')
                document.location.href = '/app/' + sessionStorage.getItem('auth_data_url')
            },
            storageAvailable: function (type) {
        try {
            let storage = window[type];
            let x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    }
            // check_incognito_mode: async function main() {
            //     let fs = window.RequestFileSystem || window.webkitRequestFileSystem;
            //     if (!fs) {
            //         console.log(1)
            //     }
            //     fs(window.TEMPORARY, 100, this.not_incognito, this.incognito);
            // },
            // not_incognito: function () {
            //     this.incognito_mode = false
            // },
            // incognito: function () {
            //     this.incognito_mode = true
            // },
            // groups_getById: async function () {
            //     try {
            //         let response = await bridge.send("VKWebAppCallAPIMethod", {
            //             "method": "groups.getById",
            //             "request_id": "32test",
            //             "params": {
            //                 "v": "5.124",
            //                 "group_id": this.settings.auth_data.vk_group_id,
            //                 "access_token": this.token
            //             }
            //         })
            //         this.group_name = response.response[0].name
            //
            //     } catch (error) {
            //         console.error('Ошибка', error)
            //     }
            // },
            // VKWebAppGetGroupInfo: async function () {
            //     try {
            //         let info = await bridge.send("VKWebAppGetGroupInfo", {"group_id": +this.settings.auth_data.vk_group_id})
            //         sessionStorage.setItem('members_count', info.members_count)
            //         this.group_name = info.name
            //
            //     } catch (error) {
            //         console.error('Ошибка', error)
            //     }
            // },
            // vkWebAppGetAuthToken: async function () {
            //     try {
            //         let response = await bridge.send("VKWebAppGetAuthToken", {
            //             "app_id": +this.settings.auth_data.vk_app_id,
            //             "scope": "photos"
            //         })
            //         this.token = response.access_token
            //         // console.log('Успех token - ', response.access_token)
            //     } catch (error) {
            //         console.error('Ошибка - url ', error)
            //     }
            // },
        },
        created: async function () {
            await this.getAllUrlParams()
        },
        mounted: async function () {
            await bridge.send("VKWebAppInit")
            // await this.check_incognito_mode()
            if (bridge.supports("VKWebAppSetViewSettings")) {
                bridge.send("VKWebAppSetViewSettings", {"status_bar_style": "dark", "action_bar_color": "#ffffff"})
            }

            if (this.storageAvailable('localStorage')) {
                console.log('Yippee! We can use localStorage awesomeness')
            }
            else {
                console.log('Too bad, no localStorage for us')
                // Too bad, no localStorage for us
            }
            // if (!this.incognito_mode) {
            //     sessionStorage.setItem('auth_data_url', document.location.search)
            //     console.log('not incognito')
            // } else {
            //     console.log('incognito')
            // }

                // console.log(document.location.search)

                // если в ссылке map, то это игровое поле, и роутим на него
                if (/#map/.test(window.location.href)) {
                    let str = window.location.href
                    let map = str.substr(str.indexOf("map=") + 4);
                    console.log('/map/' + map + this.auth_data_url)
                    this.$router.push({path: '/map/' + map + this.auth_data_url})
                }


            // if (this.settings.auth_data.vk_group_id && this.settings.auth_data.vk_viewer_group_role === 'admin') {
            //     // await this.vkWebAppGetAuthToken()
            //     // this.getAllUrlParamsAndRecordInSessionStorage()
            //     await this.VKWebAppGetGroupInfo()
            // }


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
        background: white;

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

    .mobile_background_top {
        background-color: #ffffff;
        min-height: 75px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 6;
        border-bottom: #ccc solid 1px;
    }

    .router {
        top: 83px;
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


</style>

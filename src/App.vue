<template>
    <v-app id="app">
        <v-btn id="square" depressed block dark color="#4a76a8" @click="go_widget_page">Вернуться в основное меню</v-btn>
        <router-view class="px-3"></router-view>
<!--        <router-view v-on:auto_resize="auto_resize" class="px-3"></router-view>-->
    </v-app>
</template>

<script>
    // import bridge from "@vkontakte/vk-bridge";

    export default {

        data: () => ({
            // mobile: '',
            // main_obj: {
            //     show_game_guess_number: false,
            //     show_my_games: false,
            //     show_main_page: true,
            //     show_main_page_tab: true,
            // }

        }),

        methods: {
            go_widget_page: function () {
                document.location.href = '/app/' + sessionStorage.getItem('auth_data_url')
            },
            // auto_resize: function () {
            //     if (!this.mobile) {
            //         console.log('autoresize')
            //         bridge.send("VKWebAppResizeWindow", {"width": 795, "height": Math.max(document.body.offsetHeight, 150) + 20});
            //     }
            // },
        },
        mounted:
            function () {
                sessionStorage.setItem('auth_data_url', document.location.search)
                // this.mobile = this.settings.auth_data.vk_platform !== 'desktop_web'
                // this.auto_resize ()
             }
    }

</script>


<style>
    .dense-textarea textarea {
        line-height: 1.4rem !important;
        /*margin: 1rem !important;*/
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



</style>

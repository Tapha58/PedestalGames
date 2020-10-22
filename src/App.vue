<template>
    <v-app id="app">
<!--        <v-btn v-show="$route.path !== '/map/'" id="square" depressed  dark color="#4a76a8" @click="go_widget_page">Вернуться в основное меню</v-btn>-->
        <v-btn v-show="show_btn_pedestal" id="square" depressed  dark color="#4a76a8" @click="go_widget_page">Вернуться в основное меню</v-btn>
<!--        <v-btn @click="console">console</v-btn>-->
        <router-view></router-view>
    </v-app>
</template>

<script>
    // import bridge from "@vkontakte/vk-bridge";
    export default {
        methods: {
            go_widget_page: function () {
                // document.location.href = '/app/' + sessionStorage.getItem('auth_data_url')
                document.location.href = '/app/' + sessionStorage.getItem('auth_data_url')
            },
        },
        mounted: async function () {
                // sessionStorage.setItem('auth_data_url', document.location.search)
         },
        computed: {
            show_btn_pedestal: function () {
                return /#/.test(window.location.href)
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
        width: 795px;
    }

    #square {
        border-radius: 0 !important;
    }

    .compact-form {
        transform: scale(0.875);
        transform-origin: left;
    }
    .v-application--wrap{
        min-height: auto!important;
    }



</style>

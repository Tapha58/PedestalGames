<template>
    <v-app id="app">

        <v-btn v-show="$route.path !== '/map/'" id="square" depressed  dark color="#4a76a8" @click="go_widget_page">Вернуться в основное меню</v-btn>
        <router-view></router-view>
<!--        <router-view v-on:auto_resize="auto_resize" class="px-3"></router-view>-->
    </v-app>
</template>

<script>
    // import bridge from "@vkontakte/vk-bridge";

    export default {

        data: () => ({
            // auth_data_url_test: '1',
        }),

        methods: {
            go_widget_page: function () {
                document.location.href = '/app/' + sessionStorage.getItem('auth_data_url')
            },
        },
        mounted:
            function () {
                sessionStorage.setItem('auth_data_url', document.location.search)
                // console.log(this.$route.path)
                // this.auth_data_url_test = document.location.search
                // console.log(this.auth_data_url_test)
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

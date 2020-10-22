<template>
    <div>
        <v-row align="center" justify="space-around">
            <v-img
                    src="https://sun9-48.userapi.com/nA5G9E3E_QCj9w1pXQRZN-uIYWlVsYQ3fuj4_A/IrUOdlChi30.jpg"
                    max-width="200"
                    max-height="200"
            ></v-img>
            <v-btn @click="app_install" color="primary" small>Подключить к сообществу</v-btn>
        </v-row>

    </div>
</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        data: () => ({
            settings: {
                auth_data: ''
            },
        }),
        mounted: async function () {
            await this.getAllUrlParams()
        },
        methods: {
            app_install: async function () {
                let response = await bridge.send("VKWebAppAddToCommunity", {})
                if (response.group_id) {
                    window.open("https://vk.com/app" + this.settings.auth_data.vk_app_id + "_-" + response.group_id, "_parent")
                } else {
                    console.log('response')
                }
            }
        }
    }
</script>

<style scoped>

</style>
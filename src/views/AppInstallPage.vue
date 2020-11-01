<template>
    <div>
        <v-row align="center" class="mx-0">
            <v-col cols="3">
                <v-img
                        class="logo_game"
                        src="https://pedestal-test2.aiva-studio.ru/static/longtime/icons/logo/game_logo.jpg"
                        max-width="200"
                        max-height="200"
                ></v-img>
            </v-col>
            <v-col cols="9">
                <span>Сервис для проведения в сообществе автоматизированных игр (игровая механика полностью управляется приложением). <br>
                Доступные игры: морской бой, угадай число, анаграммы, битва комментаторов, слова на букву.</span>
            </v-col>
        </v-row>
        <v-row justify="center" class="mx-0 px-0">
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
            this.auto_resize()
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
    .logo_game {
        border-radius: 50%;
    }

</style>
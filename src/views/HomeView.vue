<template>
    <div class="px-3">
        <v-row align="center">
            <v-col>
                <v-tabs>
                    <v-tab to="/choice_games">Новая игра</v-tab>
                    <v-tab to="/my_games">Мои игры</v-tab>
                    <v-tab to="/settings">Настройки</v-tab>
                    <v-tab to="/balance">Баланс: 999₽</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="3"  class="mr-1 py-0">
                <v-btn align="right"
                        @click="VKWebAppGetCommunityToken"
                        small
                        color="red"
                        dark
                >Предоставить права
                </v-btn>
                <p class="mb-0" id="err_mess_rules">{{err_mess_rules}}</p>
            </v-col>
        </v-row>
        <router-view></router-view>
    </div>
</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        data: () => ({
            err_mess_rules: '',
            settings: {
                auth_data: ''
            },
        }),
        mounted() {
            this.getAllUrlParams()
        },
        watch: {
            err_mess_rules: function () {
                setTimeout(this.clear, 5000)
            }
        },
        methods: {
            VKWebAppGetCommunityToken: async function () {
                let response = await bridge.send("VKWebAppGetCommunityToken", {
                    "app_id": +this.settings.auth_data.vk_app_id,
                    "group_id": +this.settings.auth_data.vk_group_id,
                    "scope": "messages, manage, wall"
                })
                console.log(response)
                this.VKWebAppCallAPIMethod(response.access_token)
            },
            VKWebAppCallAPIMethod: async function (token_group) {
                console.log(token_group)
                let response = await bridge.send("VKWebAppCallAPIMethod", {
                    "method": "groups.getTokenPermissions",
                    "params": {"v": "5.107", "access_token": token_group}
                })
                let mask = response.response.mask
                if (mask !== 274432) {
                    this.err_mess_rules = 'предоставленны не все права'
                }
                // response = response.response.permissions
                // console.log(mask)
                // console.log(response)
            },
            clear: function () {
                this.err_mess_rules = ''
            },
        }


    }
</script>

<style scoped>
    #err_mess_rules {
        color: red;
        font-size: 12px;
    }

</style>
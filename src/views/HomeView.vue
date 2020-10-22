<template>
    <div class="px-3">
        <v-row align="center">
            <v-col>
                <v-tabs>
                    <v-tab to="/choice_games">Новая игра</v-tab>
                    <v-tab to="/my_games">Мои игры</v-tab>
                    <v-tab to="/my_games">Баланс: 999₽</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="3" align="right">
                <v-btn
                        small
                        color="red"
                        dark
                >Предоставить права
                </v-btn>
            </v-col>
        </v-row>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data: () => ({

        }),



    }
</script>

<style scoped>

</style>
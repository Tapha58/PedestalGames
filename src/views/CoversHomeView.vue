<template>
    <div>
        <v-tabs>
            <v-tab to="/choice_games">Обложки</v-tab>
            <v-tab to="/my_games">На удалении</v-tab>
            <v-tab to="/my_games">Настройка</v-tab>
        </v-tabs>
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
    .n {
        border-radius: 10%;
    }
    .x  {
        color: #4CAF50;
    }

</style>
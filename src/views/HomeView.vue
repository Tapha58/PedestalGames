<template>
    <div>
        <v-tabs>
            <v-tab to="/all_games">Создать игру</v-tab>
            <v-tab to="/my_games">Мои игры</v-tab>
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
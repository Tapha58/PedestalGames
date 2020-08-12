<template>
    <div>
        <v-row>
            <v-col cols="9">
                <v-tabs>
                    <v-tab to="/test">Обложки</v-tab>
                    <v-tab >На удалении</v-tab>
                    <v-tab >Настройка</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="2">
                <v-btn class="mt-3" color="primary" small >Добавить обложку</v-btn>
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
    .n {
        border-radius: 10%;
    }
    .x  {
        color: #4CAF50;
    }

</style>
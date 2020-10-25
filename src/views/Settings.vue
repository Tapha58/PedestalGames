<template>
    <v-row>
        <v-col cols="4">
            <v-img
                    src="https://sun9-18.userapi.com/vrm4aRKhq6oCpK0qZO7LNyFI4-YqddwUPhadug/z3CaBEs-FiE.jpg"
                    max-height="205"
                    max-width="205"
            ></v-img>
        </v-col>
        <v-col cols="8">
            <span>Интеграция даст следующие возможности:<br>
                1. В призах у игр появится вариант начисления баллов рейтинга и баланса магазина <br>
                2. Активируется функция «платные попытки», пользователь сможет тратить баллы <br>
                рейтинга / магазина для покупки дополнительных попыток в игре.</span>
            <v-row class="mt-2">
                <v-btn class="mx-3" small color="primary">Подробнее</v-btn>
                <v-btn class="mx-3" small color="primary">Активировать</v-btn>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        data: () => ({
            text: 'Интеграция даст следующие возможности:\n' +
                '1. В призах у игр появится вариант начисления баллов рейтинга и баланса магазина\n' +
                '2. Активируется функция «платные попытки», пользователь сможет тратить баллы\n' +
                'рейтинга / магазина для покупки дополнительных попыток в игре.'
        })
    }
</script>

<style scoped>

</style>
<template>
    <v-row dense class="px-3">
        <v-col class="pt-3" cols="12" align="center">
        <v-btn x-small color="primary" @click="change_name_button">{{ name_button }}</v-btn>
        </v-col>
        <transition name="fade">
            <v-row v-if="visible">
                <v-col cols="6">
                    <v-textarea
                    class="caption"
                    v-model="message_win"
                    outlined
                    label="Сообщение, если игрок выигрывает и получает приз."
                    ></v-textarea>
                    <v-textarea
                    class="caption"
                    v-model="message_win"
                    outlined
                    label="Сообщение, если игрок выигрывает и получает приз."
                    ></v-textarea>
                </v-col>
                <v-col cols="6">
                    <v-sheet
                            class="d-flex"
                            color="blue lighten-5"
                            height="auto"
                    >

                        <div class="pa-3 caption">
                            <p>
                                <strong>Список доступных переменных:</strong><br>
                                <b>{приз}</b> — Подставится указанный приз<br>
                                <b>{profile}</b> — Ссылка на пользователя<br>
                                <b>{timeout}</b> — Оставшееся время до следующей попытки<br>
                                <b>{timeout.rule}</b> — Установленный интервал между попытками (в минутах)<br>
                                <b>{retries}</b> — Количество оставшихся попыток<br>
                                <b>{retries.max}</b> — Количество доступных попыток<br>
                                <b>{retries.additional}</b> — Случайное условие, за которое можно получить попытки<br>
                                <b>{retries.subscribe}</b> — Дополнительное количество попыток за подписку<br>
                                <b>{retries.repost}</b> — Дополнительное количество попыток за репост<br>
                                <b>{retries.messages}</b> — Дополнительное количество попыток за подписку на сообщения<br>
                                <b>{retries.external}</b> — Дополнительное количество попыток за подписку на другую группу<br>
                                <b>{retries.periodic}</b> — Дополнительные попытки, которые выдаются раз в N часов<br>
                                <b>{external}</b> — Ссылка на дополнительную группу, на которую необходимо подписаться<br>
                                <b>{prizes}</b> — Количество оставшихся призов<br>
                                <b>{ссылка}</b> — Подставится ссылка на архив<br>
                            </p>
                            <p>
                                <strong>Прикрепление вложений:</strong><br>
                                Можно прикрепить картинку, видео или гифку вставив в поле ссылку на нужный файл из ВК (Например https://vk.com/photo-174337985_456239078)
                            </p>
                            <p>
                                <strong>Список доступных функций:</strong><br>
                                <b>{plural(число)|один|два|пять}</b> — подставляет строку со склоненным существительным<br>
                                Пример: <i>{plural(retries)|{retries} попытка|{retries} попытки|{retries} попыток}</i><br><br>
                                <b>{if(условие)|верно|не верно}</b> — проверяет условие и подставляет нужную строку<br>
                                Пример: <i>{if(retries&gt;=1)|попытки ещё есть|попытки кончились}</i><br><br>
                                <b>===</b> — разделитель между вариантами ответа. Бот будет выбирать их случайным образом.
                            </p>

                        </div>



                    </v-sheet>
                </v-col>

            </v-row>
        </transition>

    </v-row>
</template>

<script>
    export default {
        name: "AdvancedSettings",
        data: () => ({
            message_win: '{profile}, поздравляем! {if(приз)|Ваш приз: {приз}! }Свяжитесь с нами, чтобы получить приз!',
            name_button: 'Показать настройки ответов бота',
            text: '',
            visible: false,
    }),
        methods: {
            change_name_button: function () {
                this.visible=!this.visible
                if (this.name_button === 'Показать настройки ответов бота')
                    this.name_button = 'Скрыть настройки ответов бота'
                else this.name_button = 'Показать настройки ответов бота'
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
</style>
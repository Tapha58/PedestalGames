<template>
    <v-row class="px-3" dense>
        <v-row>
            <v-col align="center" cols="6">
                <v-btn @click="change_name_button" block color="primary" small>{{ name_button }}</v-btn>
            </v-col>
            <v-col align="center" cols="6">
                <v-btn @click="start_game" block color="error" small>Запустить игру</v-btn>
            </v-col>
        </v-row>
        <v-row v-show="visible">
            <v-col cols="7">
                <v-expansion-panels accordion class="px-0" dense>
                    <v-expansion-panel :key="name"
                                       v-for="(advanced_settings_textare, name) in advanced_settings_textareas">
                        <v-expansion-panel-header :ripple="{ class: 'primary--text' }" class="mb-0">
                            {{advanced_settings_textare.name}}
                            <template v-slot:actions>
                                <v-icon color="primary">$expand</v-icon>
                            </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <Emoji
                                    :key="advanced_settings_textarea.id"
                                    :label='advanced_settings_textarea.label'
                                    :tooltip='advanced_settings_textarea.tooltip'
                                    v-for="advanced_settings_textarea in advanced_settings_textare.textarea_content"
                                    v-model="advanced_settings_textarea.value"
                            ></Emoji>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                </v-expansion-panels>

            </v-col>
            <v-col cols="5">
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
                            <b>{retries.messages}</b> — Дополнительное количество попыток за подписку на
                            сообщения<br>
                            <b>{retries.external}</b> — Дополнительное количество попыток за подписку на другую
                            группу<br>
                            <b>{retries.periodic}</b> — Дополнительные попытки, которые выдаются раз в N часов<br>
                            <b>{external}</b> — Ссылка на дополнительную группу, на которую необходимо
                            подписаться<br>
                            <b>{prizes}</b> — Количество оставшихся призов<br>
                            <b>{ссылка}</b> — Подставится ссылка на архив<br>
                        </p>
                        <p>
                            <strong>Прикрепление вложений:</strong><br>
                            Можно прикрепить картинку, видео или гифку вставив в поле ссылку на нужный файл из ВК
                            (Например https://vk.com/photo-174337985_456239078)
                        </p>
                        <p>
                            <strong>Список доступных функций:</strong><br>
                            <b>{plural(число)|один|два|пять}</b> — подставляет строку со склоненным
                            существительным<br>
                            Пример: <i>{plural(retries)|{retries} попытка|{retries} попытки|{retries}
                            попыток}</i><br><br>
                            <b>{if(условие)|верно|не верно}</b> — проверяет условие и подставляет нужную строку<br>
                            Пример: <i>{if(retries&gt;=1)|попытки ещё есть|попытки кончились}</i><br><br>
                            <b>===</b> — разделитель между вариантами ответа. Бот будет выбирать их случайным
                            образом.
                        </p>
                    </div>
                </v-sheet>
                <v-col align="center" cols="12">
                    <v-btn @click="load_default_messages" block color="primary" small v-if="visible">Значения по
                        умолчанию
                    </v-btn>
                </v-col>
            </v-col>
        </v-row>
    </v-row>
</template>

<script>
    // import EmojiPicker from 'vue-emoji-picker'
    import bridge from '@vkontakte/vk-bridge';
    import Emoji from "@/components/Emoji";

    export default {
        name: "AdvancedSettings",
        model: {
            prop: 'gameData',
        },
        props: ['gameData'],
        data: () => ({
            media_id: null,
            number_callback_server: '',
            result: null,
            mdi: 'mdi-alert-circle-outline',
            height: 90,
            name_button: 'Показать настройки ответов бота',
            text: '',
            visible: false,
            input: '',
            search: '',
            id_group: '',
            x: '',
            attachments_photo: '',
            token: '',
            url: '',
            src: 'https://pedestal-test2.aiva-studio.ru/app/?vk_access_token_settings=friends%2Cphotos%2Cwall%2Cgroups&vk_app_id=7355601&vk_are_notifications_enabled=0&vk_group_id=195496572&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_user_id=312527953&vk_viewer_group_role=admin&sign=pRX7wFcULWKWDii8VrK8dzAj4Yjlf7o2FffOYSPD8OE',
            advanced_settings_textareas: [
                {
                    name: 'Игровая механика',
                    textarea_content: [
                        {id: 'message_number_greater', value: '', label: 'Загаданное число больше'},
                        {id: 'message_number_less', value: '', label: 'Загаданное число меньше'},
                    ]
                },
                {
                    name: 'Игрок выиграл',
                    textarea_content: [
                        {id: 'message_win', value: '', label: 'Игрок выигрывает и получает приз'},
                        {id: 'message_win_balance', value: '', label: 'Текст при начислении баланса'},
                        {id: 'message_win_rating', value: '', label: 'Текст при начислении рейтинга'},
                        {id: 'message_win_API', value: '', label: 'Текст в случае успешного API запроса'},
                        {id: 'message_win_API_fail', value: '', label: 'Текст если API-запрос не успешный'},
                    ]
                },
                {
                    name: 'Общие ответы',
                    textarea_content: [
                        {id: 'message_already_win', value: '', label: 'Уже победил в игре', tooltip: 'я новая подсказка'},
                        {id: 'message_attempts_timeout', value: '', label: 'Время между попытками не истекло', tooltip: 'подсказка'},
                        {id: 'message_invalid_format', value: '', label: 'Не верный формат сообщения'},
                        {id: 'message_game_end', value: '', label: 'Игра завершена'},
                        {id: 'message_comment_edited', value: '', label: 'Пользователь отредактировал комментарий'},
                        {id: 'message_requirement_violated', value: '', label: 'Не выполнил условие для участия'},
                        {id: 'repost_desc', value: '', label: 'Описание действия для репоста'},
                        {id: 'enable_notifications_desc', value: '', label: 'Описание действия для включения уведомлений'},
                        {id: 'join_group_desc', value: '', label: 'Описание действия для вступления в группу'},
                        {id: 'join_partner_group_desc', value: '', label: 'Описание действия для вступления в партнёрскую группу'},
                        {id: 'message_private_profile', value: '', label: 'Невозможно проверить наличие репоста (стена закрыта), для выдачи дополнительных попыток'},
                    ]
                },
                {name: 'Попытки',
                    textarea_content: [
                        {id: 'message_has_attempts', value: '', label: 'Что пишем, если еще есть попытки'},
                        {id: 'message_attempts_out', value: '', label: 'Что пишем, если закончились попытки'},
                        {id: 'message_attempts_can_be_bought', value: '', label: 'Что пишем, если закончились, но может купить еще'},
                        {id: 'message_attempts_can_be_extended', value: '', label: 'Что пишем, если есть выдача попыток по таймеру'},
                        {id: 'message_attempts_can_be_added', value: '', label: 'Что пишем, если есть выдача по действию'},
                        {id: 'message_not_available_attempts', value: '', label: 'Что пишем, если закончились все попытки (игра завершена)'},
                    ]
                },
                {
                    name: 'Покупка попыток',
                    textarea_content: [
                        {id: 'message_bought_max_attempts', value: '', label: 'Купил максимум попыток'},
                        {id: 'message_wants_too_many_attempts', value: '', label: 'Пробует купить больше, чем можно купить (по кол-ву)'},
                        {id: 'message_not_enough_money', value: '', label: 'Не хватает баланса для покупки'},
                        {id: 'message_successful_buy', value: '', label: 'Успешная покупка'},
                    ]
                }
            ],
        }),
        methods: {
            start_game: async function () {
                const media_id = await this.upload_photo()
                if (media_id)
                    await this.activating_callback_server()
                else
                    return
                if (this.number_callback_server) {
                    await this.send_post_vk()
                } else return
                await this.create_game()
            },
            change_name_button: function () {
                this.visible = !this.visible
                if (this.name_button === 'Показать настройки ответов бота')
                    this.name_button = 'Скрыть настройки ответов бота'
                else this.name_button = 'Показать настройки ответов бота'
            },
            load_default_messages: function () {
                // Игровая механика
                let index = this.advanced_settings_textareas[0].textarea_content.findIndex(item => item.id === 'message_number_greater')
                this.advanced_settings_textareas[0].textarea_content[index].value = this.gameData.message_number_greater

                index = this.advanced_settings_textareas[0].textarea_content.findIndex(item => item.id === 'message_number_less')
                this.advanced_settings_textareas[0].textarea_content[index].value = this.gameData.message_number_less


                // Игрок выиграл
                index = this.advanced_settings_textareas[1].textarea_content.findIndex(item => item.id === 'message_win')
                this.advanced_settings_textareas[1].textarea_content[index].value = this.gameData.game.message_win

                index = this.advanced_settings_textareas[1].textarea_content.findIndex(item => item.id === 'message_win_balance')
                this.advanced_settings_textareas[1].textarea_content[index].value = this.gameData.game.message_win_balance

                index = this.advanced_settings_textareas[1].textarea_content.findIndex(item => item.id === 'message_win_rating')
                this.advanced_settings_textareas[1].textarea_content[index].value = this.gameData.game.message_win_rating

                index = this.advanced_settings_textareas[1].textarea_content.findIndex(item => item.id === 'message_win_API')
                this.advanced_settings_textareas[1].textarea_content[index].value = this.gameData.game.message_win_API

                index = this.advanced_settings_textareas[1].textarea_content.findIndex(item => item.id === 'message_win_API_fail')
                this.advanced_settings_textareas[1].textarea_content[index].value = this.gameData.game.message_win_API_fail

                // Общие ответы
                index = this.advanced_settings_textareas[2].textarea_content.findIndex(item => item.id === 'message_already_win')
                this.advanced_settings_textareas[2].textarea_content[index].value = this.gameData.game.message_already_win

                index = this.advanced_settings_textareas[2].textarea_content.findIndex(item => item.id === 'message_attempts_timeout')
                this.advanced_settings_textareas[2].textarea_content[index].value = this.gameData.game.message_attempts_timeout

                index = this.advanced_settings_textareas[2].textarea_content.findIndex(item => item.id === 'message_invalid_format')
                this.advanced_settings_textareas[2].textarea_content[index].value = this.gameData.game.message_invalid_format

                index = this.advanced_settings_textareas[2].textarea_content.findIndex(item => item.id === 'message_game_end')
                this.advanced_settings_textareas[2].textarea_content[index].value = this.gameData.game.message_game_end

                index = this.advanced_settings_textareas[2].textarea_content.findIndex(item => item.id === 'message_comment_edited')
                this.advanced_settings_textareas[2].textarea_content[index].value = this.gameData.game.message_comment_edited

                index = this.advanced_settings_textareas[2].textarea_content.findIndex(item => item.id === 'message_requirement_violated')
                this.advanced_settings_textareas[2].textarea_content[index].value = this.gameData.game.message_requirement_violated

                index = this.advanced_settings_textareas[2].textarea_content.findIndex(item => item.id === 'repost_desc')
                this.advanced_settings_textareas[2].textarea_content[index].value = this.gameData.game.repost_desc

                index = this.advanced_settings_textareas[2].textarea_content.findIndex(item => item.id === 'enable_notifications_desc')
                this.advanced_settings_textareas[2].textarea_content[index].value = this.gameData.game.enable_notifications_desc

                index = this.advanced_settings_textareas[2].textarea_content.findIndex(item => item.id === 'join_group_desc')
                this.advanced_settings_textareas[2].textarea_content[index].value = this.gameData.game.join_group_desc

                index = this.advanced_settings_textareas[2].textarea_content.findIndex(item => item.id === 'join_partner_group_desc')
                this.advanced_settings_textareas[2].textarea_content[index].value = this.gameData.game.join_partner_group_desc

                index = this.advanced_settings_textareas[2].textarea_content.findIndex(item => item.id === 'message_private_profile')
                this.advanced_settings_textareas[2].textarea_content[index].value = this.gameData.game.message_private_profile

                // Общие ответы
                index = this.advanced_settings_textareas[3].textarea_content.findIndex(item => item.id === 'message_has_attempts')
                this.advanced_settings_textareas[3].textarea_content[index].value = this.gameData.game.message_has_attempts

                index = this.advanced_settings_textareas[3].textarea_content.findIndex(item => item.id === 'message_attempts_out')
                this.advanced_settings_textareas[3].textarea_content[index].value = this.gameData.game.message_attempts_out

                index = this.advanced_settings_textareas[3].textarea_content.findIndex(item => item.id === 'message_attempts_can_be_bought')
                this.advanced_settings_textareas[3].textarea_content[index].value = this.gameData.game.message_attempts_can_be_bought

                index = this.advanced_settings_textareas[3].textarea_content.findIndex(item => item.id === 'message_attempts_can_be_extended')
                this.advanced_settings_textareas[3].textarea_content[index].value = this.gameData.game.message_attempts_can_be_extended

                index = this.advanced_settings_textareas[3].textarea_content.findIndex(item => item.id === 'message_attempts_can_be_added')
                this.advanced_settings_textareas[3].textarea_content[index].value = this.gameData.game.message_attempts_can_be_added

                index = this.advanced_settings_textareas[3].textarea_content.findIndex(item => item.id === 'message_not_available_attempts')
                this.advanced_settings_textareas[3].textarea_content[index].value = this.gameData.game.message_not_available_attempts

                // Покупка попыток
                index = this.advanced_settings_textareas[4].textarea_content.findIndex(item => item.id === 'message_bought_max_attempts')
                this.advanced_settings_textareas[4].textarea_content[index].value = this.gameData.game.message_bought_max_attempts

                index = this.advanced_settings_textareas[4].textarea_content.findIndex(item => item.id === 'message_wants_too_many_attempts')
                this.advanced_settings_textareas[4].textarea_content[index].value = this.gameData.game.message_wants_too_many_attempts

                index = this.advanced_settings_textareas[4].textarea_content.findIndex(item => item.id === 'message_not_enough_money')
                this.advanced_settings_textareas[4].textarea_content[index].value = this.gameData.game.message_not_enough_money

                index = this.advanced_settings_textareas[4].textarea_content.findIndex(item => item.id === 'message_successful_buy')
                this.advanced_settings_textareas[4].textarea_content[index].value = this.gameData.game.message_successful_buy
            },
            upload_photo: async function() {
                if (this.gameData.image === null) {
                    console.log('this.gameData.image 1 - ' + this.gameData.image)
                    return await this.upload_def_photo()
                }
                else {
                    console.log('this.gameData.image 2 - ' + this.gameData.image)
                    return await this.upload_user_photo()
                }

            },
            upload_def_photo: async function() {
                let response = await fetch("https://pedestal-test2.aiva-studio.ru/app/wallgames/upload_photo/" + document.location.search + "&game_name=guess_number")
                if (response.ok)
                    return (await response.json()).id;
                else
                    console.log("Ошибка HTTP: " + response.status)
            },
            upload_user_photo: async function() {
                const formData = new FormData();
                formData.append('photo', this.gameData.image);
                try {
                    const response = await fetch('https://pedestal-test2.aiva-studio.ru/app/wallgames/upload_photo/' + document.location.search,
                        {
                            method: 'POST',
                            body: formData
                        });
                    return (await response.json()).id;
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            },
            getAllUrlParams: function() {
                let url = document.location.href
                // let url = this.url
                // let url = this.src
                console.log(url)
                // извлекаем строку из URL или объекта window
                let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

                // объект для хранения параметров
                let obj = {};

                // если есть строка запроса
                if (queryString) {

                    // данные после знака # будут опущены
                    queryString = queryString.split('#')[0];

                    // разделяем параметры
                    let arr = queryString.split('&');

                    for (let i = 0; i < arr.length; i++) {
                        // разделяем параметр на ключ => значение
                        let a = arr[i].split('=');

                        // обработка данных вида: list[]=thing1&list[]=thing2
                        let paramNum = undefined;
                        let paramName = a[0].replace(/\[\d*\]/, function (v) {
                            paramNum = v.slice(1, -1);
                            return '';
                        });

                        // передача значения параметра ('true' если значение не задано)
                        let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                        // преобразование регистра
                        paramName = paramName.toLowerCase();
                        paramValue = paramValue.toLowerCase();

                        // если ключ параметра уже задан
                        if (obj[paramName]) {
                            // преобразуем текущее значение в массив
                            if (typeof obj[paramName] === 'string') {
                                obj[paramName] = [obj[paramName]];
                            }
                            // если не задан индекс...
                            if (typeof paramNum === 'undefined') {
                                // помещаем значение в конец массива
                                obj[paramName].push(paramValue);
                            }
                            // если индекс задан...
                            else {
                                // размещаем элемент по заданному индексу
                                obj[paramName][paramNum] = paramValue;
                            }
                        }
                        // если параметр не задан, делаем это вручную
                        else {
                            obj[paramName] = paramValue;
                        }
                    }
                }

                this.gameData.auth_data = obj
                console.log(this.gameData.auth_data)
            },
            transform_prizes_array() {
                for (let i = 0; i < this.gameData.prizes_front.length; i++) {
                    let array_games = {}
                    for (let j = 0; j < this.gameData.prizes_front[i].prizes.length; j++) {
                        if (this.gameData.prizes_front[i].prizes[j].type === 'own_prize')
                            Object.assign(array_games, {'prize_text': this.gameData.prizes_front[i].prizes[j].val})
                        if (this.gameData.prizes_front[i].prizes[j].type === 'market_balance') {
                            Object.assign(array_games, {'prize_balance_shop_min': this.gameData.prizes_front[i].prizes[j].val})
                            Object.assign(array_games, {'prize_balance_shop_max': this.gameData.prizes_front[i].prizes[j].val})
                        }
                        if (this.gameData.prizes_front[i].prizes[j].type === 'rating_balance') {
                            Object.assign(array_games, {'prize_balance_rating_min': this.gameData.prizes_front[i].prizes[j].val})
                            Object.assign(array_games, {'prize_balance_rating_max': this.gameData.prizes_front[i].prizes[j].val})
                        }
                    }
                    Object.assign(array_games, {'prize_count': this.gameData.prizes_front[i].prizes[0].prize_count})
                    this.gameData.prizes.push(array_games)
                }
            },
            activating_callback_server: async function() {

                let response = await fetch("https://pedestal-test2.aiva-studio.ru/app/wallgames/activate_callback" + document.location.search)
                if (response.ok) {
                    this.number_callback_server = await response.json();
                    console.log('запуск сервера успех - ' + this.number_callback_server)
                }
                else {
                    console.log("запуск сервера ошибка" + response.status)
                }

            },
            send_post_vk: async function() {
                console.log('id_group_vk - ' + this.gameData.auth_data.vk_group_id)
                console.log('this.media_id - ' + this.media_id)

                try {
                    let response  = await bridge.send("VKWebAppShowWallPostBox", {
                        "owner_id": - this.gameData.auth_data.vk_group_id,
                        "message": this.gameData.post_text,
                        "from_group": "1",
                        "attachments": "photo" + this.gameData.auth_data.vk_user_id + '_' + this.media_id
                    });
                    this.gameData.game.id_post_vk = JSON.stringify(response);
                    // const result = await response.json();
                    console.log('Успех:', this.gameData.game.id_post_vk);
                } catch (error) {
                    console.err('Ошибка:', error); // TypeError: failed to fetch
                }
            },
            create_game: async function() {
                try {
                    const response = await fetch('https://pedestal-test2.aiva-studio.ru/app/wallgames/guess_number',
                        {
                            method: 'POST',
                            body: this.gameData
                        });
                    let answer = await response.json();
                    // this.attachments_photo = "photo" + this.gameData.auth_data.vk_user_id + '_' + result.id
                    // console.log('Успех:', JSON.stringify(result));
                    console.log('Успех тправка данных', answer);

                } catch (error) {
                    console.error('Ошибка:', error);
                }

            }
        },
        components: {
            Emoji
        },
        mounted:
            function () {
                this.getAllUrlParams()
                this.load_default_messages()
            },
    }

</script>

<style scoped>


</style>
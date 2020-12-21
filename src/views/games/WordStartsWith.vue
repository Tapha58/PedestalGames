<template>
    <v-form ref="main_game_component" v-model="validation">
        <GeneralSettingsBlock
                :mechanics_textarea_block="mechanics_textarea_block"
                :ending_game_textarea_block="ending_game_textarea_block"
                v-model="settings"
                @validateField="validateField"
                :validation="validation"
                :is_single_winner="is_single_winner"
                :main_variables="main_variables"
                :url_default_img="url_default_img"
                :name_game="name_game"
                :game_type="game_type"
                :auth_data="auth_data"
                :auth_data_url="auth_data_url"
                :pedestal_integration_enabled="pedestal_integration_enabled"
                :online="online"
        >
            <template v-slot:settings>
                <div class="pt-5" cols="auto">
                    <v-alert
                            :color='color_alert'
                            dense
                    >2. Настройки игры
                        <v-tooltip v-if="auth_data.vk_platform === 'mobile_iphone'" bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        color="rgba(48, 44, 44, 0.99)"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
                                >
                                    <v-icon size="20" v-on="on">mdi-help-circle-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Настройте игру.</span>
                        </v-tooltip>
                        <v-tooltip v-else bottom max-width="280" color="rgba(48, 44, 44, 0.99)">
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on" size="20">mdi-help-circle-outline</v-icon>
                            </template>
                            <span>Настройте игру.</span>
                        </v-tooltip>
                    </v-alert>
                    <v-row>
                        <v-col class="py-0" sm="12" md="3">
                            <v-select
                                    dense
                                    :items="version_game"
                                    label="Вариант проведения игры"
                                    outlined
                                    v-model="settings.word_count_strategy"
                            >


                                <template v-slot:prepend-inner >
                                    <v-tooltip v-if="auth_data.vk_platform === 'mobile_iphone'" bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                    color="rgba(48, 44, 44, 0.99)"
                                                    dark
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    icon
                                            >
                                                <v-icon size="20" v-on="on">mdi-help-circle-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Вариант "найденные слова выбывают из розыгрыша" означает, что если один
                                            участник уже отгадал какое-то слово, то другим участникам это слово не будет засчитано.</span>
                                    </v-tooltip>

                                    <v-tooltip v-else bottom  color="rgba(48, 44, 44, 0.99)" max-width="280">
                                        <template v-slot:activator="{ on }">
                                            <v-icon v-on="on" size="20">mdi-help-circle-outline</v-icon>
                                        </template>
                                        <span>Вариант "найденные слова выбывают из розыгрыша" означает, что если один
                                            участник уже отгадал какое-то слово, то другим участникам это слово не будет засчитано.</span>
                                    </v-tooltip>
                                </template>
                            </v-select>
                        </v-col>
                        <v-col class="py-0" cols="12" sm="6" md="3">
                            <v-text-field
                                    dense
                                    label="Начало слова"
                                    outlined
                                    v-model="settings.start_letters"
                                    :rules="rules_start_letters"
                                    validate-on-blur
                            ><template v-slot:prepend-inner >
                                <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                                    <template v-slot:activator="{ on }">
                                        <v-icon class="mt2px" size="20" v-on="on">mdi-help-circle-outline
                                        </v-icon>
                                    </template>
                                    <span>Введите одну или несколько букв, на которые должно начинаться слово, вводимое участником. Например: "П" или "Ар"</span>
                                </v-tooltip>
                            </template></v-text-field>
                        </v-col>
                        <v-col class="py-0" cols="12" sm="6" md="3">
                            <v-text-field
                                    dense
                                    label="Длительность игры"
                                    outlined
                                    suffix="ч."
                                    type="number"
                                    min="1"
                                    v-model.number="settings.game_duration"
                                    :rules="rules_game_duration"
                                    validate-on-blur
                            ><template v-slot:prepend-inner >
                                <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                                    <template v-slot:activator="{ on }">
                                        <v-icon class="mt2px" size="20" v-on="on">mdi-help-circle-outline
                                        </v-icon>
                                    </template>
                                    <span>Через указанное кол-во часов игра завершится и последним комментарием будет
                                        опубликован список победителей и выданы указанные призы.</span>
                                </v-tooltip>
                            </template></v-text-field>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </GeneralSettingsBlock>
    </v-form>
</template>

<script>
    import GeneralSettingsBlock from "@/components/GeneralSettingsBlock";

    export default {
        components: {
            GeneralSettingsBlock
        },
        props: ['auth_data', 'auth_data_url', 'pedestal_integration_enabled', 'online'],
        data: () => ({
            settings: {
                start_letters: '',
                word_count_strategy: '',
                game_duration: '',
                post_text: 'Поиграем?)\n' +
                    '\n' +
                    'Ваша задача — написать как можно больше слов, которые начинаются на __.\n' +
                    'Победители (кто соберёт больше всех слов) получат подарки 🎁\n' +
                    '\n' +
                    'Один комментарий - одно слово. Наш бот в ответном сообщении сообщит результат.' + '\n' +
                    '\n' +
                    'Можно писать только существительные длиной не менее 3 букв.\n' +
                    'Каждый участник имеет 3 попытки с минимальным интервалом в 1 минуту.\n' +
                    '\n' +
                    'Для участия в игре нужно вступить в нашу группу.\n' +
                    'Конкурс завершится через ___ ч.'
            },
            game_type: 3,
            name_game: 'word_starts_with',
            main_variables1:
                '<div class="pa-3 caption">\n' +
                '                    <p>\n' +
                '                        <strong>Переменные игровой механики:</strong><br>\n' +
                '                        <b>{score}</b> — кол-во угаданных пользователем слов.<br>\n' +
                '                    <p>\n' +
                '                        <strong>Основные переменные:</strong><br>\n' +
                '                        <b>{profile}</b> — имя пользователя.<br>\n' +
                '\n' +
                '                        <b>{fail_conditions}</b> — случайное условие, которое пользователь не выполнил (репост и т. д.).<br>\n' +
                '                        <b>[photo100172_166443618]</b> — прикрепление картинки/видео. <a href="https://vk.com/@pedestal-wallgames?anchor=kak-prikrepit-kartinku-k-kommentariyu" target="_blank">Подробнее</a>.<br>\n' +
                '                    </p>\n' +
                '                    <p>\n' +
                '                        <strong>Призы:</strong><br>\n' +
                '                        <b>{prize}</b> — выводит информацию о призе. <a href="https://vk.com/@pedestal-wallgames?anchor=peremennaya-prize" target="_blank">Подробнее</a>.<br>\n' +
                '                        <b>{prizes}</b> — количество оставшихся призов.<br>\n' +
                '                        <b>{balance_win}</b> — количество зачисляемого баланса.<br>\n' +
                '                        <b>{rating_win}</b> — количество зачисляемого рейтинга.<br>\n' +
                '                    </p>\n' +
                '                        <strong>Попытки:</strong><br>\n' +
                '                        <b>{timeout}</b> — оставшееся время до следующей попытки.<br>\n' +
                '                        <b>{count_attempts}</b> — количество оставшихся попыток.<br>\n' +
                '                        <b>{remain_attempts_to_buy}</b> — количество попыток, которые возможно купить.<br>\n' +
                '                        <b>{next_attempts_periodic}</b> — время, через которое будет следующее начисление по таймеру.<br>\n' +
                '                        <b>{count_attempts_periodic}</b> — количество попыток, которые будут выданы по таймеру.<br>\n' +
                '                        <b>{action_for_attempts}</b> — случайное действие, за которое можно получить бесплатные попытки.<br>\n' +
                '                        <b>{external}</b> — ссылка на дополнительную группу, на которую нужно подписаться.<br>\n' +
                '                    </p>\n' +
                '                    <p>\n' +
                '                        <b>{more_attempts}</b> — выводит информацию о возможности получения дополнительных попыток (за действие, по таймеру или покупка). <a href="https://vk.com/@pedestal-wallgames?anchor=peremennaya-more-attempts" target="_blank">Подробнее</a>.<br>\n' +
                '                        <b>{info_attempts}</b> — выводит информацию о кол-ве оставшихся попыток. Если закончились, то о возможности получения дополнительных. <a href="https://vk.com/@pedestal-wallgames?anchor=peremennaya-info-attempts" target="_blank">Подробнее</a>.<br>\n' +
                '                    </p>\n' +
                '                    <p>\n' +
                '                        <strong>Название баланса:</strong><br>\n' +
                '                        <b>{balance_name_one}</b> — название баланса для формы числа 1.<br>\n' +
                '                        <b>{balance_name_two}</b> — название баланса для формы числа 2.<br>\n' +
                '                        <b>{balance_name_five}</b> — название баланса для формы числа 5.<br>\n' +
                '                    </p>\n' +
                '                    <p>\n' +
                '                        <strong>Название рейтинга:</strong><br>\n' +
                '                        <b>{rating_name_one}</b> — название рейтинга для формы числа 1.<br>\n' +
                '                        <b>{rating_name_two}</b> — название рейтинга для формы числа 2.<br>\n' +
                '                        <b>{rating_name_five}</b> — название рейтинга для формы числа 5.<br>\n' +
                '                    </p>\n' +
                '                    <p>\n' +
                '                </div>',
            main_variables2:
                '<div class="pa-3 caption">\n' +
                '                    <p>\n' +
                '                        <strong>Переменные игровой механики:</strong><br>\n' +
                '                        <b>{score}</b> — кол-во угаданных пользователем слов.<br>\n' +
                '                    <p>\n' +
                '                        <strong>Основные переменные:</strong><br>\n' +
                '                        <b>{profile}</b> — имя пользователя.<br>\n' +
                '\n' +
                '                        <b>{fail_conditions}</b> — случайное условие, которое пользователь не выполнил (репост и т. д.).<br>\n' +
                '                        <b>[photo100172_166443618]</b> — прикрепление картинки/видео. <a href="https://vk.com/@pedestal-wallgames?anchor=kak-prikrepit-kartinku-k-kommentariyu" target="_blank">Подробнее</a>.<br>\n' +
                '                    </p>\n' +
                '                    <p>\n' +
                '                        <strong>Призы:</strong><br>\n' +
                '                        <b>{prize}</b> — выводит информацию о призе. <a href="https://vk.com/@pedestal-wallgames?anchor=peremennaya-prize" target="_blank">Подробнее</a>.<br>\n' +
                '                        <b>{prizes}</b> — количество оставшихся призов.<br>\n' +
                '                    </p>\n' +
                '                        <strong>Попытки:</strong><br>\n' +
                '                        <b>{timeout}</b> — оставшееся время до следующей попытки.<br>\n' +
                '                        <b>{count_attempts}</b> — количество оставшихся попыток.<br>\n' +
                '                        <b>{next_attempts_periodic}</b> — время, через которое будет следующее начисление по таймеру.<br>\n' +
                '                        <b>{count_attempts_periodic}</b> — количество попыток, которые будут выданы по таймеру.<br>\n' +
                '                        <b>{action_for_attempts}</b> — случайное действие, за которое можно получить бесплатные попытки.<br>\n' +
                '                        <b>{external}</b> — ссылка на дополнительную группу, на которую нужно подписаться.<br>\n' +
                '                    </p>\n' +
                '                    <p>\n' +
                '                        <b>{more_attempts}</b> — выводит информацию о возможности получения дополнительных попыток (за действие, по таймеру). <a href="https://vk.com/@pedestal-wallgames?anchor=peremennaya-more-attempts" target="_blank">Подробнее</a>.<br>\n' +
                '                        <b>{info_attempts}</b> — выводит информацию о кол-ве оставшихся попыток. Если закончились, то о возможности получения дополнительных. <a href="https://vk.com/@pedestal-wallgames?anchor=peremennaya-info-attempts" target="_blank">Подробнее</a>.<br>\n' +
                '                    </p>\n' +
                '                </div>',
            url_default_img: '/static/wallgames/image_default/min/anagram_min.jpg',
            game_duration_hour: '',
            ending_game_textarea_block: {
                name: 'Завершение игры',
                textarea_content: [
                    {id: 'message_results_start', value: '', label: 'Начало текста комментария с подведением итогов конкурса', list_of_variables_for_rules: ['all_allowed']},
                    {id: 'message_results_winner_format', value: '', label: 'Формат вывода списка победителей', list_of_variables_for_rules: ['profile','prize','score', 'n']},
                    {id: 'message_results_end', value: '', label: 'Окончание текста комментария с подвед. итогов конкурса', list_of_variables_for_rules: ['all_allowed']},
                ]
            },
            mechanics_textarea_block: [
                {
                    id: 'message_valid',
                    value: '',
                    label: 'Слово засчитано',
                    list_of_variables_for_rules: []
                },
                {
                    id: 'message_already_guessed',
                    value: '',
                    label: 'Игрок угадал это слово раньше',
                    list_of_variables_for_rules: []
                },
                {
                    id: 'message_another_already_guessed',
                    value: '',
                    label: 'Кто-то другой уже угадал это слово',
                    list_of_variables_for_rules: []
                },
                {
                    id: 'message_must_startswith',
                    value: '',
                    label: 'Слово не соответствует правилам',
                    list_of_variables_for_rules: []
                },
                {
                    id: 'message_word_doesnt_exist',
                    value: '',
                    label: 'Слово не существует',
                    list_of_variables_for_rules: []
                },
                // {
                //     id: '',
                //     value: '',
                //     label: 'Можно использовать буквы только русского алфавита',
                //     list_of_variables_for_rules: []
                // },
                // {
                //     id: '',
                //     value: '',
                //     label: 'Можно использовать буквы только английского алфавита',
                //     list_of_variables_for_rules: []
                // },
            ],
            version_game: [
                {value: 1, text: 'Найденные слова выбывают из розыгрыша'},
                {value: 2, text: 'Найденные слова могут найти повторно'},
            ],
            validation: false,
            is_single_winner: false,
            color_alert: '#edeef0',
        }),
        // watch: {
        //     'game_duration'
        // },
        computed: {
            main_variables () {
                if (this.pedestal_integration_enabled) {
                    return this.main_variables1
                } else {
                    return this.main_variables2
                }
            },
            rules_start_letters () {
                return [
                    v => !!v || 'Недопустимый формат',
                    v => /^[А-Яа-я]+$/.test(v) || 'Недопустимый формат',
                    v => /^(\D){1,10}$/g.test(v) || 'Не более 10 символов'
                ]
            },
            rules_game_duration () {
                return [
                    v => !!v || 'Недопустимый формат',
                    v => !/[\D]/.test(v) || 'Недопустимый формат',
                    v => /^(\d){1,3}$/g.test(v) || 'Не более 3 символов'
                ]
            },
        },
        methods: {
            validateField () {
                this.$refs.main_game_component.validate()
            }
        },
    }

</script>

<style>
    .mt2px {
        margin-top: 2px;
    }

</style>
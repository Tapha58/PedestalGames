<template>
    <v-form ref="main_game_component" v-model="validation">
        <GeneralSettingsBlock
                :mechanics_textarea_block="mechanics_textarea_block"
                :ending_game_textarea_block="ending_game_textarea_block"
                v-model="settings"
                @validateField="validateField"
                @create_win_fields="create_win_fields"
                @create_win_fields_type5="create_win_fields_type5"
                :validation="validation"
                :is_single_winner="is_single_winner"
                :main_variables="main_variables"
                :name_game="name_game"
                :game_type="game_type"
                :auth_data="auth_data"
                :auth_data_url="auth_data_url"
                :pedestal_integration_enabled="pedestal_integration_enabled"
                :online="online"
        >
            <template v-slot:settings>
                <div class="pt-5">
                    <v-alert
                            :color='color_alert'
                            dense
                    >
                        <v-row>
                            <v-col class="py-0" cols="auto">
                                2. Настройки игры

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

                                <v-tooltip v-else bottom  color="rgba(48, 44, 44, 0.99)" max-width="280">
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on" size="20">mdi-help-circle-outline</v-icon>
                                    </template>
                                    <span>Настройте игру.</span>
                                </v-tooltip>
                            </v-col>
                            <v-col  align="right" class="py-0">
                                <a href="https://vk.com/@pedestal-wallgames-opisanie?anchor=nastroyki-igry-morskoy-boy" target="_blank">Подробнее</a>
                            </v-col>
                        </v-row>
                    </v-alert>
                    <v-row>
                        <v-col class="py-0" cols="12" sm="12" md="12">
<!--                            <v-radio-group v-model="game_type" :mandatory="false" :disabled="/^[0-9]+$/.test($route.params.id)">-->
<!--                                <v-radio label="Выдача приза сразу за каждое попадание" value="5"></v-radio>-->
<!--                                <v-radio label="Окончание игры по времени. Побеждают те, кто наберёт максимум очков" value="6"></v-radio>-->
<!--                            </v-radio-group>-->
                            <v-select
                                    dense
                                    outlined
                                    label='Тип игры'
                                    :items='sea_battle_type_game'
                                    v-model="game_type"
                                    :disabled="/^[0-9]+$/.test($route.params.id)"
                            >
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-0" cols="12" sm="4" md="3">
                            <v-select
                                    dense
                                    outlined
                                    label='Размер поля'
                                    :items='playing_field_size'
                                    v-model="settings.col_count"
                                    :disabled="/^[0-9]+$/.test($route.params.id)"
                            >
                            </v-select>
                        </v-col>
                        <v-col v-if = '+game_type === 5' class="py-0" cols="12" sm="4" md="4">
                            <v-text-field
                                    dense
                                    label="Кол-во побед игроком"
                                    outlined
                                    type="number"
                                    min="1"
                                    :disabled="/^[0-9]+$/.test($route.params.id)"
                                    v-model.number="settings.win_per_participant_limit"
                                    :rules="rules_game_duration"
                                    validate-on-blur
                            ><template v-slot:prepend-inner >
                                <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                                    <template v-slot:activator="{ on }">
                                        <v-icon class="mt2px" size="20" v-on="on">mdi-help-circle-outline</v-icon>
                                    </template>
                                    <span>Поскольку приз выдаётся за каждое попадание, то вы можете ограничить кол-во
                                        призов на одного участника. Когда участник достигнет лимита победных ходов,
                                        у него закончатся попытки.</span>
                                </v-tooltip>
                            </template></v-text-field>
                        </v-col>
                        <v-col v-if = '+game_type === 5 && settings.show_is_random_giveaway' class="py-0" cols="12" sm="4" md="4">
                            <v-select
                                    :items="is_random_giveaway_item"
                                    dense
                                    label="Выдача подарков"
                                    outlined
                                    :disabled="/^[0-9]+$/.test($route.params.id)"
                                    v-model="settings.is_random_giveaway"
                                    validate-on-blur
                            ><template v-slot:prepend-inner >
                                <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                                    <template v-slot:activator="{ on }">
                                        <v-icon class="mt2px" size="20" v-on="on">mdi-help-circle-outline
                                        </v-icon>
                                    </template>
                                    <span>Если выбран вариант "случайным образом", то подарки будут выдаваться случайно:
                                        сначала может быть 5-й, потом 1-й. Если "по порядку", то сначала полностью
                                        расходуется подарок 1, затем подарок 2 и т.д.</span>
                                </v-tooltip>
                            </template></v-select>
                        </v-col>
                        <v-col v-if = '+game_type === 6' class="py-0" cols="12" sm="4" md="3">
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
                    <v-row v-if = '+game_type === 6'>
                        <v-col>
                            <v-slider
                                    v-model="settings.win_fields_percent"
                                    :thumb-size="24"
                                    thumb-label="always"
                                    min="1"
                                    label="% победных ячеек"
                                    :disabled="/^[0-9]+$/.test($route.params.id)"
                            ></v-slider>
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
                auth_data: '',
                show_is_random_giveaway: false,
                is_random_giveaway: false,
                win_fields: [],
                col_count: '',
                row_count: '',
                win_fields_percent: 15,
                game_duration: '',
                win_per_participant_limit: 1,
                post_text:
                    'МОРСКОЙ БОЙ 🚢\n' +
                    '\n' +
                    'На нас напал вражеский флот, состоящий из ___ кораблей 🚢 Мы подготовили карту, где Вы сможете видеть свободные ячейки для обстрела. {ссылка}.\n' +
                    'Напишите в комментарии координаты для выстрела в формате b2 и узнаете: попали или нет.\n' +
                    'Уничтожив вражеский корабль, Вы сразу же будете вознаграждены случайным подарком из списка:\n' +
                    '1. ____\n' +
                    '2. ____\n' +
                    '3. ____\n' +
                    'Каждый участник на старте имеет 3 снаряда. Для участия вступите в нашу группу.\n' +
                    'Морское сражение завершится, когда будут уничтожены все вражеские корабли.',
            },
            game_type: 5,
            main_variables1:
                '<div class="pa-3 caption">\n' +
                '                    <p>\n' +
                '                        <strong>Переменные игровой механики:</strong><br>\n' +
                '                        <b>{score}</b> — кол-во засчитанных комментариев.<br>\n' +
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
                '                        <b>{score}</b> — кол-во засчитанных комментариев.<br>\n' +
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
            game_duration_hour: '',
            post_text_sea_battle_with_score:
                'МОРСКОЙ БОЙ 🚢\n' +
                '\n' +
                'На нас напал вражеский флот. Выберите свободную ячейку на игровом поле, напишите в комментарии координаты ячейки в формате b2 и мы сразу сообщим, попали Вы или нет. {ссылка}.\n' +
                '\n' +
                'Те участники, кто собьёт больше всех кораблей противника, будут вознаграждены случайном подарком из списка: приз 1, приз 2, приз 3...\n' +
                'Каждый участник нашей группы на старте имеет 3 снаряда.\n' +
                'Морское сражение завершится через ___ часа или когда будут сбиты все вражеские корабли.',
            post_text_sea_battle:
                'МОРСКОЙ БОЙ 🚢\n' +
                '\n' +
                'На нас напал вражеский флот, состоящий из ___ кораблей 🚢 Мы подготовили карту, где Вы сможете видеть свободные ячейки для обстрела. {ссылка}.\n' +
                'Напишите в комментарии координаты для выстрела в формате b2 и узнаете: попали или нет.\n' +
                'Уничтожив вражеский корабль, Вы сразу же будете вознаграждены случайным подарком из списка:\n' +
                '1. ____\n' +
                '2. ____\n' +
                '3. ____\n' +
                'Каждый участник на старте имеет 3 снаряда. Для участия вступите в нашу группу.\n' +
                'Морское сражение завершится, когда будут уничтожены все вражеские корабли.',
            playing_field_size: [
                {value: 10, text: '10х10'},
                {value: 20, text: '20х20'},
                {value: 25, text: '25х25'},
                {value: 50, text: '50х50'},
                {value: 75, text: '75х75'},
                {value: 100, text: '100х100'},
            ],
            is_random_giveaway_item: [
                {value: true, text: 'Случайным образом'},
                {value: false, text: 'По порядку'},
            ],
            sea_battle_type_game: [
                {value: 5, text: 'Выдача приза сразу за каждое попадание'},
                {value: 6, text: 'Окончание игры по времени. Побеждают те, кто наберёт максимум очков'},
            ],
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
                    id: 'message_already_occupied',
                    value: '',
                    label: 'Поле занято',
                    list_of_variables_for_rules: []
                },
                {
                    id: 'message_miss',
                    value: '',
                    label: 'Промах',
                    list_of_variables_for_rules: []
                },
                {
                    id: 'message_valid',
                    value: '',
                    label: 'Сообщение при попадании',
                    list_of_variables_for_rules: []
                },
                {
                    id: 'message_field_out_of_bounds',
                    value: '',
                    label: 'Сообщение, если поле находится за пределами карты',
                    list_of_variables_for_rules: []
                },
            ],
            validation: false,
            is_single_winner: false,
            color_alert: '#edeef0',
        }),
        mounted() {},
        computed: {
            main_variables () {
                if (this.pedestal_integration_enabled) {
                    return this.main_variables1
                } else {
                    return this.main_variables2
                }
            },
            rules_game_duration () {
                return [
                    v => !!v || 'Недопустимый формат',
                    v => !/[\D]/.test(v) || 'Недопустимый формат',
                    v => /^(\d){1,3}$/g.test(v) || 'Не более 3 символов'
                ]
            },
            name_game () {
                if (this.game_type == 5)
                    return 'sea_battle'
                if (this.game_type == 6)
                    return 'sea_battle_with_score'
                else return 'err'
            },
        },
        watch: {
            'settings.col_count': function () {
                this.settings.row_count = this.settings.col_count
            },
            game_type: function () {
                if (this.game_type === 5) {
                    this.post_text_sea_battle_with_score = this.settings.post_text
                    this.settings.post_text = this.post_text_sea_battle
                }
                if (this.game_type === 6) {
                    this.settings.is_random_giveaway = false
                    this.post_text_sea_battle = this.settings.post_text
                    this.settings.post_text = this.post_text_sea_battle_with_score
                }
            }
        },
        methods: {
            create_win_fields () {
                let playing_field_size = []
                for (let i = 1; i <= this.settings.col_count; i++) {
                    for (let j = 1; j <= this.settings.col_count; j++) {
                        let arr = []
                        arr.push(i)
                        arr.push(j)
                        playing_field_size.push(arr)
                    }
                }
                this.settings.win_fields = []
                let count = this.settings.win_fields_percent /100 * this.settings.col_count * this.settings.col_count
                for (let i = 0; i < count; i++) {
                    let max = playing_field_size.length - 1
                    let rand = Math.round (- 0.5 + Math.random() * (max + 1))
                    this.settings.win_fields.push(playing_field_size[rand])
                    playing_field_size.splice(rand, 1)
                }
            },
            create_win_fields_type5 (count_prize) {
                let playing_field_size = []
                for (let i = 1; i <= this.settings.col_count; i++) {
                    for (let j = 1; j <= this.settings.col_count; j++) {
                        let arr = []
                        arr.push(i)
                        arr.push(j)
                        playing_field_size.push(arr)
                    }
                }
                this.settings.win_fields = []
                for (let i = 0; i < count_prize; i++) {
                    let max = playing_field_size.length - 1
                    let rand = Math.round (- 0.5 + Math.random() * (max + 1))
                    this.settings.win_fields.push(playing_field_size[rand])
                    playing_field_size.splice(rand, 1)
                }
                // console.log(this.settings.win_fields)
            },
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
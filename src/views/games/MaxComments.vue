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
                :name_game="name_game"
                :game_type="game_type"
        >
            <template v-slot:settings>
                <div class="pt-5">
                    <v-alert
                            :color='color_alert'
                            dense
                    >2. Настройки игры
                        <v-tooltip bottom max-width="280" color="rgba(48, 44, 44, 0.99)">
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on" size="20">mdi-help-circle-outline</v-icon>
                            </template>
                            <span>Настройте игру.</span>
                        </v-tooltip>
                    </v-alert>
                    <v-row>
                        <v-col class="py-0" cols="12" sm="4" md="3">
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
        data: () => ({
            settings: {
                game_duration: '',
                post_text: 'Готовы поиграть? 😉\n' +
                    '\n' +
                    'Задача: написать как можно больше комментариев под этим постом. Победители (кто напишет больше ' +
                    'всех комментариев) - получат подарки 🎁\n' +
                    '\n' +
                    'Между каждым комментарием должна быть пауза - 20 секунд, иначе комментарий не будет засчитан. Для участия в игре нужно вступить в нашу группу.' + '\n' +
                    '\n' +
                    'Игра завершится через ___ часов.'
            },
            game_type: 4,
            name_game: 'max_comments',
            main_variables:
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
            ],
            validation: false,
            is_single_winner: false,
            color_alert: '#edeef0',
        }),
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
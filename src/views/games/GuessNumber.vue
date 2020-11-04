<template>
    <v-form ref="main_game_component" v-model="validation">
<!--        <v-skeleton-loader-->
<!--                :loading="loading"-->
<!--                :transition="transition"-->
<!--                height="800"-->
<!--                type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"-->
<!--        >-->
        <GeneralSettingsBlock
                :mechanics_textarea_block="mechanics_textarea_block"
                v-model="settings"
                @validateField="validateField"
                @randomNumber="randomNumber"
                :validation="validation"
                :is_single_winner="is_single_winner"
                :main_variables="main_variables"
                :name_game="name_game"
                :game_type="game_type"

        >
            <template v-slot:settings>
                <v-row class="pt-5" dense>
                    <v-col>
                        <v-alert
                                :color='color_alert'
                                dense
                        >2. Настройки игры
                            <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                                <template v-slot:activator="{ on }">
                                    <v-icon size="20" v-on="on">mdi-help-circle-outline</v-icon>
                                </template>
                                <span>По умолчанию бот настроен так, что на попытки пользователей отвечает "загаданное число больше/меньше". Поле "рядом" - это диапазон от загаданного числа, когда бот вместо "больше / меньше" начинает отвечать "рядом", чтобы продлить игру. Загаданное число может быть дробным.</span>
                            </v-tooltip>
                        </v-alert>
                        <!--            <PrizeCreator></PrizeCreator>-->
                        <!--            <v-form ref="form_make_number" v-model="settings.valid_make_number">-->

                        <v-row class="pt-2" style="border-color: #1a237e">
                            <v-col class="py-0" cols="12" sm="3">
                                <v-text-field
                                        :rules="[rules.zero, rules.only_number, rules.number_of_symbols_9]"
                                        dense
                                        label="Левая граница"
                                        min="0"
                                        outlined
                                        ref="mm"
                                        required
                                        type="number"
                                        v-model.number="settings.min_number"
                                        validate-on-blur
                                ></v-text-field>
                            </v-col>
                            <v-col class="py-0" cols="12" sm="3">
                                <v-text-field
                                        :rules="selectNumberRules"
                                        dense
                                        label="Загаданное число"
                                        outlined
                                        required
                                        type="number"
                                        v-model="settings.guessed_number"
                                        validate-on-blur
                                >
                                    <template #append>
                                        <v-btn @click="randomNumber" class="pb-1" icon small>
                                            <v-icon size="20">mdi-cached</v-icon>
                                        </v-btn>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col class="py-0" cols="12" sm="3">
                                <v-text-field
                                        :rules="maxRules"
                                        dense
                                        label="Правая граница"
                                        min="0"
                                        outlined
                                        required
                                        type="number"
                                        v-model.number="settings.max_number"
                                        validate-on-blur
                                ></v-text-field>
                            </v-col>
                            <v-col class="py-0" cols="12" sm="3">
                                <v-text-field
                                        :rules="closelyIntervalRules"
                                        dense
                                        label="Рядом"
                                        outlined
                                        required
                                        type="number"
                                        v-model="settings.closely_interval"
                                        validate-on-blur
                                >
                                    <template v-slot:append>
                                        <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                                            <template v-slot:activator="{ on }">
                                                <v-icon class="mt2px" size="20" v-on="on">mdi-help-circle-outline
                                                </v-icon>
                                            </template>
                                            <span>{{ closelyFieldTooltipText }}</span>
                                        </v-tooltip>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>

                    </v-col>
                </v-row>
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
            // loading: true,
            // transition: 'scale-transition',
            settings: {
                game_duration: '',
                min_number: '',
                max_number: '',
                guessed_number: '',
                closely_interval: '',
                post_text: 'У нас мини-игра 🎁 Мы загадали число. Угадавший получит приз\n' +
                    'Задача - угадать число, которое мы загадали. В комментариях под этим постом напишите ваш вариант. ' +
                    'Например, 15.\n' + 'Каждый участник имеет 3 попытки с интервалом между попытками в 1 минуту.  ' +
                    'Каждый раз, когда у вас ' + 'закончатся попытки, вы будете получать еще по 2 попытки каждые 10 минут! ' +
                    'Для участия в игре необходимо ' + 'вступить в нашу группу.',
            },
            game_type: 1,
            url_get_default_settings: '',
            validation: true,
            is_single_winner: true,
            name_game: 'guess_number',
            main_variables1: '<div class="pa-3 caption">\n' +
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
                '                    <p>\n' +
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
                '                </div>',
            main_variables2: '<div class="pa-3 caption">\n' +
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
                '                    <p>\n' +
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
            rules: {
                required: v => !!v || 'Недопустимый формат',
                zero: v => v !== '' || 'Недопустимый формат',
                only_number: v => !/[\D]/.test(v) || 'Недопустимый формат',
                number_of_symbols_9: v => /^(\d){1,9}$/g.test(v) || 'Не более 9 символов',
            },
            mechanics_textarea_block: [
                {
                    id: 'message_number_greater',
                    value: '',
                    label: 'Загаданное число больше',
                    list_of_variables_for_rules: []
                },
                {
                    id: 'message_number_less',
                    value: '',
                    label: 'Загаданное число меньше',
                    list_of_variables_for_rules: []
                },
                {
                    id: 'message_closely',
                    value: '',
                    label: 'Загаданное число в диапазоне «рядом»',
                    list_of_variables_for_rules: []
                },
            ],
            color_alert: '#edeef0',
        }),
        computed: {
            main_variables () {
                if (this.settings.pedestal_integration_enabled) {
                    return this.main_variables1
                } else {
                    return this.main_variables2
                }
            },
            maxRules() {
                const rules = [
                    v => !!v || v === 0 || 'Недопустимый формат',
                    v => !/[\D]/.test(v) || 'Недопустимый формат',
                    v => /^(\d){1,9}$/g.test(v) || 'Не более 9 символов',
                ]
                if (this.settings.max_number !== null) {
                    const rule =
                        v => this.settings.min_number < v || `Укажите число больше ${this.settings.min_number}`
                    rules.push(rule)
                }
                return rules
            },
            selectNumberRules() {
                const rules = [
                    v => !!v || v === 0 || 'Недопустимый формат',
                    // v => !/[\D]/.test(v) || 'Недопустимый формат',
                    v => /^([0-9,/.]){1,9}$/g.test(v) || 'Не более 9 символов'
                ]
                if (this.settings.guessed_number !== null) {
                    const regex = /^(?!0+[0-9])\d{1,11}(?:,\d{5})*(?:\.\d{1,5})?$/
                    // const regex = /^(?!0+[0-9])\d{1,11}(?:,\d{5})*(?:\.\d{1,5})?$/
                    const str = this.settings.guessed_number

                    const rule =
                        () => regex.test(str) || 'Не допустимый формат'
                    rules.push(rule)
                }
                return rules
            },
            closelyIntervalRules() {
                const rules = [
                    v => !!v || v === 0 || 'Недопустимый формат',
                    // v => !/[\D]/.test(v) || 'Недопустимый формат',
                    v => /^([0-9,/.]){1,9}$/g.test(v) || 'Не более 9 символов'
                ]
                if (this.settings.closely_interval !== null) {
                    // console.log('проверка?' - this.settings.closely_interval)
                    const regex = /^(?!0+[0-9])\d{1,11}(?:,\d{5})*(?:\.\d{1,5})?$/
                    const str = this.settings.closely_interval

                    const rule =
                        () => regex.test(str) || 'Не допустимый формат'
                    rules.push(rule)
                }
                return rules
            },
            closelyFieldTooltipText() {
                let left_border = Math.max(0, +(this.settings.guessed_number - this.settings.closely_interval))
                left_border = +left_border.toFixed(5)
                let right_border = +this.settings.guessed_number + +this.settings.closely_interval
                right_border = +right_border.toFixed(5)
                return `Игрокам будет отправляться подсказка "загаданное число рядом", если они будут вводить числа в
                диапазонах [${left_border} - ${right_border}]  при текущем загаданном числе ${this.settings.guessed_number}
                и диапазоне рядом ${this.settings.closely_interval}`
            }
        },
        methods: {
            randomNumber: function () {
                // console.log('sda' + this.settings.max_number)
                let range = this.settings.max_number + 1 - this.settings.min_number
                this.settings.guessed_number = Math.floor(+this.settings.min_number + Math.random() * range);
            },
            number: function () {
                const regex = /^(?!0+[0-9])\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/
                const str = this.settings.guessed_number
                return regex.test(str)
            },
            validateField: async function () {
                this.$refs.main_game_component.validate()
            },
        },
    }
</script>

<style scoped>

</style>
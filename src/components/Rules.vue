<template>
    <v-row class="px-3" dense>
        <v-col>
            <v-alert
                    border="left"
                    color="blue-grey"
                    dark
                    dense
                    icon="mdi-numeric-3-box"
            >Задайте правила игры
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on" x-small>Подсказка</v-btn>
                    </template>
                    <span>Подсказка</span>
                </v-tooltip>
            </v-alert>

            <div>
                <v-row>
                    <v-col cols="12" sm="9">
                        <v-select
                                :items="options"
                                dense
                                label="Репост"
                                outlined
                                v-model="gameData.required_repost_abc"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-text-field
                                :rules="repost_count_attempts_abc_rules"
                                dense
                                label="Кол-во попыток"
                                min="1"
                                outlined
                                required
                                type="number"
                                v-model.number="gameData.repost_count_attempts"
                                v-show="this.gameData.required_repost_abc === 'c'"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row class="mt-n6">
                    <v-col cols="12" sm="9">
                        <v-select
                                :items="options"
                                dense
                                label="Подписка на группу"
                                outlined
                                v-model="gameData.required_join_group_abc"
                                xs="12"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-text-field
                                :rules="join_group_count_attempts_rules" dense
                                label="Кол-во попыток"
                                md="6"
                                min="1"
                                outlined
                                required
                                type="number"
                                v-model.number="gameData.join_group_count_attempts"
                                v-show="!(this.gameData.required_join_group_abc === 'a' || this.gameData.required_join_group_abc === 'b' || this.gameData.required_join_group_abc === '')"
                                xs="6"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row class="mt-n6">
                    <v-col cols="12" sm="9">
                        <v-select
                                :items="options"
                                dense
                                label="Подписка на сообщения группы"
                                outlined
                                v-model="gameData.required_enable_notifications_abc"
                                xs="12"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-text-field
                                :rules="enable_notifications_count_attempts_rules" dense
                                label="Кол-во попыток"
                                md="6"
                                min="1"
                                outlined
                                required
                                type="number"
                                v-model.number="gameData.enable_notifications_count_attempts"
                                v-show="(this.gameData.required_enable_notifications_abc === 'c')"
                                xs="6"
                        ></v-text-field>
                    </v-col>
                </v-row>


                <v-row class="mt-n6">
                    <v-col cols="12" sm="5">
                        <v-select
                                :items="options"
                                dense
                                label="Подписка на партнерскую группу"
                                outlined
                                v-model="gameData.required_join_partner_group_abc"
                                xs="12"
                        ></v-select>
                    </v-col>


                    <v-col cols="12" sm="4">
                        <v-text-field
                                :rules="partner_group_id_rules"
                                dense
                                label="URL на партнерскую группу"
                                outlined
                                required
                                v-model.number="gameData.partner_group_id"
                                v-show="(this.gameData.required_join_partner_group_abc === 'b' || this.gameData.required_join_partner_group_abc === 'c')"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-text-field
                                :rules="join_partner_group_count_attempts_rules"
                                dense
                                label="Кол-во попыток"
                                min="1"
                                outlined
                                required
                                type="number"
                                v-model.number="gameData.join_partner_group_count_attempts"
                                v-show="this.gameData.required_join_partner_group_abc === 'c'"
                        ></v-text-field>


                    </v-col>
                </v-row>


                <v-row class="mt-n6">
                    <v-col cols="12" sm="5">
                        <v-text-field
                                :rules="free_attempts_count_rules"
                                dense
                                label="Кол-во бесплатных попыток"
                                min="1"
                                outlined
                                required
                                type="number"
                                v-model.number="gameData.free_attempts_count"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4">
                        <v-text-field
                                :rules="attempts_interval_rules"
                                dense
                                label="Время между попытками"
                                min="1"
                                outlined
                                required
                                suffix="минут"
                                type="number"
                                v-model.number="gameData.attempts_interval"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-switch
                        class="mt-n5"
                        color="primary"
                        hide-details
                        label="Периодические бесплатные попытки"

                        v-model="gameData.attempts_extended"
                ></v-switch>

                <v-row class="mt-1">
                    <v-col cols="12" sm="4">
                        <v-text-field
                                :rules="attempts_extended_frequency_minutes_rules" dense
                                label="Частота выдачи попыток"
                                md="6"
                                min="1"
                                id="area1"
                                outlined
                                prefix="каждые"
                                required
                                suffix="минут"
                                type="number"
                                v-model.number="gameData.attempts_extended_frequency_minutes"
                                v-show="gameData.attempts_extended"
                                xs="6"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field
                                :rules="attempts_extended_count_rules" dense
                                label="Кол-во попыток за одну выдачу"
                                md="6"
                                id="area2"
                                prefix="начислять"
                                suffix="попыток"
                                min="1"
                                outlined
                                required
                                type="number"
                                v-model.number="gameData.attempts_extended_count"
                                v-show="gameData.attempts_extended"
                                xs="6"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field
                                id="area3"
                                :rules="attempts_extended_max_count_rules" dense
                                label="Доп. попыток max"
                                md="6"
                                min="0"
                                prefix="но не более"
                                outlined
                                required
                                type="number"
                                v-model.number="gameData.attempts_extended_max_count"
                                v-show="gameData.attempts_extended"
                                xs="6"
                        >
                            <template v-slot:append>
                                <v-icon>mdi-help-circle-outline</v-icon>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-switch
                        class="mt-n3"
                        color="primary"
                        hide-details
                        label="Платные попытки (баланс рейтинга активности, магазина)"

                        v-model="gameData.switchPaidAttempts"
                ></v-switch>

                <v-row class="mt-1">
                    <v-col cols="12" sm="4">
                        <v-select
                                :items="itemsGameWallet"
                                dense
                                label="Кошелек"
                                outlined
                                v-model="gameData.gameWallet"
                                v-show="this.gameData.switchPaidAttempts"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="4">
                        <v-text-field
                                :rules="paid_attempts_count_rules"
                                dense
                                label="Кол-во платных попыток"
                                min="1"
                                outlined
                                required
                                type="number"
                                v-model.number="gameData.paid_attempts_count"
                                v-show="this.gameData.switchPaidAttempts"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field
                                :rules="paid_attempt_price_rules"
                                dense
                                label="Цена платной попытки"
                                min="1"
                                outlined
                                required
                                type="number"
                                v-model.number="gameData.paid_attempt_price"
                                v-show="this.gameData.switchPaidAttempts"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </div>
        </v-col>
    </v-row>
</template>

<script>
    // import bridge from '@vkontakte/vk-bridge';
    export default {
        model: {
            prop: 'gameData',
        },
        props: ['gameData'],
        data: () => ({


            repost_count_attempts_abc_rules: [v => (!!v || v === 0) || 'Значение не задано'],
            join_group_count_attempts_rules: [v => (!!v || v === 0) || 'Значение не задано'],
            enable_notifications_count_attempts_rules: [v => (!!v || v === 0) || 'Значение не задано'],
            join_partner_group_count_attempts_rules: [v => (!!v || v === 0) || 'Значение не задано'],
            free_attempts_count_rules: [v => (!!v || v === 0) || 'Значение не задано'],
            attempts_interval_rules: [v => (!!v || v === 0) || 'Значение не задано'],
            attempts_extended_count_rules: [v => (!!v || v === 0) || 'Значение не задано'],
            attempts_extended_frequency_minutes_rules: [v => (!!v || v === 0) || 'Значение не задано'],
            paid_attempt_price_rules: [v => (!!v || v === 0) || 'Значение не задано'],
            paid_attempts_count_rules: [v => (!!v || v === 0) || 'Значение не задано'],
            partner_group_id_rules: [v => (!!v || v === 0) || 'Значение не задано'],
            attempts_extended_max_count_rules: [v => (!!v || v === 0) || 'Значение не задано'],

            itemsGameOption: [
                {value: 'a', text: 'Бесплатные попытки'},
                {value: 'b', text: 'Бесплатные попытки + баланс рейтинга'},
                {value: 'c', text: 'Бесплатные попытки + баланс магазина'}
            ],
            options: [
                {value: 'a', text: 'Не требуется'},
                {value: 'b', text: 'Требуется'},
                {value: 'c', text: 'Дает доп. бесплатные попытки'}
            ],
            options1: [
                {value: 'a', text: 'Не выдаются'},
                {value: 'b', text: 'Выдаются бесплатные'},
            ],
            itemsGameWallet: [
                {value: 'a', text: 'Рейтинг активности'},
                {value: 'b', text: 'Магазин'},
            ]
        }),
        watch: {
            'gameData.required_repost_abc': function () {
                if (this.gameData.required_repost_abc !== 'c')
                    this.gameData.repost_count_attempts = 0
            },
            'gameData.required_enable_notifications_abc': function () {
                if (this.gameData.required_enable_notifications_abc !== 'c')
                    this.gameData.enable_notifications_count_attempts = 0
            },
            'gameData.required_join_group_abc': function () {
                if (this.gameData.required_join_group_abc !== 'c')
                    this.gameData.join_group_count_attempts = 0
            },
            'gameData.required_join_partner_group_abc': function () {
                if (this.gameData.required_join_partner_group_abc !== 'c')
                    this.gameData.join_partner_group_count_attempts = 0
            },
            'gameData.attempts_extended': function () {
                if (this.gameData.attempts_extended === false) {
                    this.gameData.attempts_extended_count = 0
                    this.gameData.attempts_extended_frequency_minutes = 0
                    this.gameData.attempts_extended_max_count = 0
                }
            },
            'gameData.switchPaidAttempts': function () {
                if (this.gameData.switchPaidAttempts === false) {
                    this.gameData.paid_attempts_count = 0
                    this.gameData.paid_attempt_price = 0
                }
            }
        },
    }
</script>

<style scoped>


</style>
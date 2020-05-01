<template>
    <v-row dense class="px-3">
        <v-col>
            <v-alert
                    border="left"
                    color="blue-grey"
                    dark
                    icon="mdi-numeric-2-box"
                    dense
            >Задайте правила игры
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn x-small color="primary" dark v-on="on">Подсказка</v-btn>
                    </template>
                    <span>Подсказка</span>
                </v-tooltip>
            </v-alert>

            <div>
                <v-row>
                    <v-col cols="12" sm="9">
                        <v-select
                                :items="options"
                                v-model="gameData.required_repost"
                                label="Репост"
                                outlined
                                dense
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-text-field
                                v-model.number="gameData.count_attempts_for_repost"
                                :disabled="(this.gameData.required_repost === 'a' || this.gameData.required_repost === 'b' || this.gameData.required_repost === '')"
                                label="Кол-во попыток"
                                required
                                outlined
                                dense
                                type="number"
                                min="1"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row class="mt-n6">
                    <v-col cols="12" sm="9">
                        <v-select
                                xs="12"
                                :items="options"
                                v-model="gameData.required_join_group"
                                label="Подписка на группу"
                                outlined
                                dense
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-text-field
                                xs="6" md="6"
                                v-model.number="gameData.count_attempts_for_join_group"
                                :disabled="(this.gameData.required_join_group === 'a' || this.gameData.required_join_group === 'b' || this.gameData.required_join_group === '')"
                                label="Кол-во попыток"
                                required
                                outlined
                                dense
                                type="number"
                                min="1"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row class="mt-n6">
                    <v-col cols="12" sm="9">
                        <v-select
                                xs="12"
                                :items="options"
                                v-model="gameData.required_enable_notifications"
                                label="Подписка на сообщения группы"
                                outlined
                                dense
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-text-field
                                xs="6" md="6"
                                v-model.number="gameData.enable_notifications_count_attempts"

                                label="Кол-во попыток"
                                required
                                outlined
                                :disabled="(this.gameData.required_enable_notifications === 'a' || this.gameData.required_enable_notifications === 'b' || this.gameData.required_enable_notifications === '')"
                                dense
                                type="number"
                                min="1"
                        ></v-text-field>
                    </v-col>
                </v-row>


                <v-row class="mt-n6">
                    <v-col cols="12" sm="5">
                        <v-select
                                xs="12"
                                :items="options"
                                v-model="gameData.required_join_partner_group"
                                label="Подписка на партнерскую группу"
                                outlined
                                dense
                        ></v-select>
                    </v-col>


                    <v-col cols="12" sm="4">
                        <v-text-field
                                v-model.number="gameData.partner_group_id"
                                :disabled="(this.gameData.required_join_partner_group === 'a' || this.gameData.required_join_partner_group === '')"
                                label="URL на партнерскую группу"
                                required
                                outlined
                                dense
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-text-field
                                v-model.number="gameData.count_attempts_for_join_partner_group"
                                :disabled="(this.gameData.required_join_partner_group === 'a' || this.gameData.required_join_partner_group === 'b' || this.gameData.required_join_partner_group === '')"
                                label="Кол-во попыток"
                                required
                                outlined
                                dense
                                type="number"
                                min="1"
                        ></v-text-field>


                    </v-col>
                </v-row>


                <v-row class="mt-n6">
                    <v-col cols="12" sm="6">
                        <v-text-field
                                v-model.number="gameData.count_attempts_free"
                                label="Кол-во бесплатных попыток"
                                required
                                outlined
                                dense
                                type="number"
                                min="0"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field
                                v-model.number="gameData.attempts_interval_sec"
                                label="Время между попытками"
                                required
                                outlined
                                dense
                                suffix="минут"
                                type="number"
                                min="1"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-switch
                        class="mt-n5"
                        v-model="gameData.attempts_extended"
                        label="Периодические бесплатные попытки"
                        color="primary"
                        value="success"
                        hide-details
                ></v-switch>

                <v-row class="mt-1">
                    <v-col cols="12" sm="4">
                        <v-text-field
                                xs="6" md="6"
                                v-model.number="gameData.attempts_extended_count"
                                v-show="gameData.attempts_extended"
                                label="Кол-во попыток за одну выдачу"
                                required
                                outlined
                                dense
                                type="number"
                                min="1"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field
                                xs="6" md="6"
                                v-model.number="gameData.attempts_extended_frequency_minutes"
                                v-show="gameData.attempts_extended"
                                label="Частота выдачи попыток"
                                suffix="раз в час"
                                required
                                outlined
                                dense
                                type="number"
                                min="1"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field
                                xs="6" md="6"
                                v-model.number="gameData.attempts_extended_frequency_minutes"
                                v-show="gameData.attempts_extended"
                                label="Сколько раз сработает таймер"
                                required
                                outlined
                                dense
                                type="number"
                                min="0"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-switch
                        class="mt-n3"
                        v-model="gameData.switchPaidAttempts"
                        label="Платные попытки (баланс рейтинга активности, магазина)"
                        color="primary"
                        value="success"
                        hide-details
                ></v-switch>

                <v-row class="mt-1">
                    <v-col cols="12" sm="4">
                        <v-select
                                v-show="this.gameData.switchPaidAttempts"
                                :items="itemsGameWallet"
                                v-model="gameData.gameWallet"
                                label="Кошелек"
                                outlined
                                dense
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="4">
                        <v-text-field
                                v-model.number="gameData.count_attempts_pay"
                                v-show="this.gameData.switchPaidAttempts"
                                label="Кол-во платных попыток"
                                required
                                outlined
                                dense
                                type="number"
                                min="0"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field
                                v-model.number="gameData.attempts_pay_price"
                                v-show="this.gameData.switchPaidAttempts"
                                label="Цена платной попытки"
                                required
                                outlined
                                dense
                                type="number"
                                min="0"
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
        data: () => ({
            gameData: {
                count_attempts_free: '',
                count_attempts_pay: 1,
                attempts_pay_price: 10,
                required_repost: '',
                count_attempts_for_repost: '',
                required_join_group: '',
                count_attempts_for_join_group: '',
                required_enable_notifications: '',
                required_join_partner_group: '',
                count_attempts_for_join_partner_group: '',
                enable_notifications_count_attempts: '',
                partner_group_id: '',
                attempts_interval_sec: '',
                attempts_extended: false,
                attempts_extended_count: 1,
                attempts_extended_frequency_minutes: 1,
                switchPaidAttempts: false,
                delayedLaunch: false,
                gameWallet: 'b',
                yy: false,

            },

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

    }
</script>

<style scoped>
    /*span {*/
    /*    color: green;*/
    /*}*/

</style>
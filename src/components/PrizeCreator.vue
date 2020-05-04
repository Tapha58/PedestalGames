<template>
    <v-card
            class="mx my-2"
            width="100%"
            outlined
    >
        <v-card-title class="pb-0">
            <v-row dense v-if="!is_single_winner">

                <v-col cols="6" class="pl-4">
                    Подарок № {{number_gift}}
                </v-col>
                <v-col cols="2"></v-col>
                <v-col cols="3">
                    <v-text-field
                            type="number"
                            min="1"
                            v-model.number="prize_count"
                            label="Кол-во победителей"
                            dense
                    ></v-text-field>
                </v-col>
                <v-btn v-if="!is_one_card" icon fab absolute right small @click="$emit('delete_prize_creator', id)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-row>
        </v-card-title>
        <v-card-text>
            <v-row class="mb-n5" dense v-for="(prize, i) in prizes" :key="prize.id">

                <v-col sm="5">
                    <v-select
                            :items="prize_types"
                            v-model="prize.type"
                            label="Тип приза"
                            outlined
                            dense
                    ></v-select>
                </v-col>
                <v-col sm="6" v-if="prize.type === 'own_prize'">
                    <v-text-field
                                  v-model="prize.val"
                                  label="Название приза"
                                  outlined
                                  dense
                    ></v-text-field>
                </v-col>
                <v-col sm="6" v-if="prize.type === 'market_balance' || prize.type === 'rating_balance'">
                    <v-text-field
                            v-model="prize.val"
                            label="Кол-во валеронов"
                            outlined
                            dense
                            type="number"
                            min="1"
                    ></v-text-field>
                </v-col>
                <v-col sm="2" v-if="prize.type === 'api'">
                    <v-select
                            :items="api_types"
                            v-model="prize.api_type"
                            label="Тип запроса"
                            outlined
                            dense
                    ></v-select>
                </v-col>
                <v-col sm="4" v-if="prize.type === 'api'">
                    <v-text-field
                            v-model="prize.val"
                            label="Url"
                            outlined
                            dense
                    ></v-text-field>
                </v-col>
                <v-col sm="1">
                    <v-btn v-if="prizes.length - 1 === i && prizes.length !== prize_types.length" class="mx-2" fab dark small color="indigo" @click="add_prize">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn v-else class="mx-2" fab dark small color="error" @click="prizes.splice(i, 1)">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

        </v-card-text>
        <v-btn v-if="!is_single_winner && is_last_card" fab absolute left bottom dark small color="indigo" @click="$emit('add_prize_creator')">
            <v-icon>mdi-plus</v-icon>
        </v-btn>

    </v-card>
</template>

<script>
    export default {
        name: "PrizeCreator",
        model: {
            prop: 'prizes',
        },
        props: {
            prizes: Array,
            is_single_winner: {
                default: false,
                type: Boolean
            },
            is_last_card: {
                type: Boolean
            },
            is_one_card: {
                type: Boolean
            },
            id: {
                type: Number
            },
            number_gift: {
                type: Number
            },

        },
        data: () => ({
            api_types: [
                {value: 'post', text: 'POST'},
                {value: 'get', text: 'GET'},
            ],
            prize_count: null,
            prize_next_id: 1
        }),
        computed: {
            prize_types: function () {
                return [
                    {value: 'own_prize', text: 'Свой приз', disabled: this.prizes.find(item => item.type === 'own_prize')},
                    {value: 'market_balance', text: 'Увеличение баланса магазина', disabled: this.prizes.find(item => item.type === 'market_balance')},
                    {value: 'rating_balance', text: 'Увеличение баланса рейтинга', disabled: this.prizes.find(item => item.type === 'rating_balance')},
                    {value: 'api', text: 'Выполнить POST/GET запрос', disabled: this.prizes.find(item => item.type === 'api')}
                ]
            }
        },
        methods: {
            add_prize() {
                this.prizes.push({
                    type: this.prize_types.find(type => !type.disabled).value
                })
            },
        },

    }
</script>

<style scoped>

</style>
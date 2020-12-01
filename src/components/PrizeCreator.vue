<template>

    <v-card
            :class="is_single_winner ? 'border_top_bottom_is_single_winner' : 'border_top_bottom'"
            width="100%"
            outlined
            flat
    >
        <v-card-title class="pb-0">
            <v-row dense v-if="!is_single_winner" justify="space-between">

                <v-col  cols="auto" class="pl-0">
                    Подарок № {{number_gift}}
                </v-col>
<!--                <v-col align="center">-->
<!--                    <span>Подарок № {{number_gift}}</span>-->
<!--                </v-col>-->

                <!--                <v-col cols="2"></v-col>-->
                <v-col  cols="auto">
                    <v-text-field
                            id="count_win"
                            max-width="50"
                            type="number"
                            min="1"
                            v-model.number="prizes_front_index.count"
                            label="Кол-во победителей"
                            dense
                            validate-on-blur
                            :rules="prize_count_rules"
                            :disabled="/id_game/i.test($route.params.id)"
                    ></v-text-field>
                </v-col>
                <v-col cols="1" v-if="!is_one_card && !/id_game/i.test($route.params.id)">
                    <v-btn  icon fab absolute right small
                           @click="$emit('delete_prize_creator', id)">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>

            </v-row>
        </v-card-title>

        <v-card-text class="pl-0" :class="{pad_but_0 : is_single_winner}">

            <div class="mb-0 p-0" v-for="(prize, i) in prizes_front_index.card_prizes" :key="prize.id">

                <v-row class="mb-0 p-0" dense>
                    <v-col class="pb-0 mb-n4" cols="10" xs="10" sm="5">
                        <v-select
                                :items="say_name(prize.type)"
                                v-model="prize.type"
                                label="Тип приза"
                                outlined
                                dense
                                :disabled="show_edit"
                        ></v-select>
                    </v-col>
                    <v-col class="pb-0" cols="10" xs="10" sm="6" v-if="prize.type === 'text'">
                        <v-text-field
                                v-model="prize.val"
                                label="Название приза"
                                :rules="[rules.required, rules.max_length_200]"
                                required
                                validate-on-blur
                                outlined
                                dense
                                :disabled="show_edit"
                        ></v-text-field>
                    </v-col>
                    <v-col class="pb-0" cols="10" xs="10" sm="6"
                           v-if="prize.type === 'balance_shop' || prize.type === 'balance_rating'">
                        <v-text-field
                                v-model="prize.val"
                                label="Кол-во баллов"
                                :rules="[rules.required, rules.zero, rules.range]"
                                type="text"
                                outlined
                                required
                                dense
                                validate-on-blur
                                :disabled="show_edit"
                        ></v-text-field>
                    </v-col>
                    <v-col class="pb-0" sm="2" v-if="prize.type === 'api'">
                        <v-select
                                :items="api_types"
                                v-model="prize.api_type"
                                label="Тип запроса"
                                :rules="[rules.required]"
                                outlined
                                dense
                                :disabled="show_edit"
                        ></v-select>
                    </v-col>
                    <v-col class="pb-0" sm="4" v-if="prize.type === 'api'">
                        <v-text-field
                                v-model="prize.val"
                                label="Url"
                                :rules="[rules.required]"
                                outlined
                                dense
                                :disabled="show_edit"

                        ></v-text-field>
                    </v-col>
                    <v-col class="pb-0" v-bind:class="{ 'mt-n6': $vuetify.breakpoint.name === 'xs' }" cols="1" xs="1"
                           v-show="!show_edit">
                        <!--                <v-col class="pb-0"  cols="1" xs="1" v-show="!show_edit">-->
                        <!--                    <v-btn v-if="prizes.length - 1 === i && prizes.length !== types.length" class="mx-2" fab dark small color="indigo" @click="add_prize">-->
                        <!--                        <v-icon>mdi-plus</v-icon>-->
                        <!--                    </v-btn>-->
                        <v-btn depressed v-show="prizes_front_index.card_prizes.length !== 1" class="mx-2 pb-0" fab dark
                               small color="error"
                               @click="prizes_front_index.card_prizes.splice(i, 1), $emit('auto_resize')">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row class="mt-n3" v-show="!show_edit" dense>
                    <!--                    <v-col sm="10">-->
                    <!--                    </v-col>-->
                    <v-col sm="1">
                        <v-btn depressed
                               v-show="prizes_front_index.card_prizes.length - 1 === i && prizes_front_index.card_prizes.length !== types.length && pedestal_integration_enabled"
                               class="mx-2" fab dark small color="green" @click="add_prize">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </v-card-text>

        <v-btn class="mr-n2" v-if="!is_single_winner && is_last_card" fab absolute right bottom small dark depressed
               color="#4a76a8" @click="$emit('add_prize_creator')">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-card>
</template>

<script>
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        name: "PrizeCreator",
        model: {
            prop: 'prizes_front_index',
        },
        props: {
            prizes_front_index: Object,
            is_single_winner: {
                default: true,
                type: Boolean
            },
            is_last_card: {
                type: Boolean
            },
            is_one_card: {
                type: Boolean
            },
            show_edit: {
                type: Boolean
            },
            id: {
                type: Number
            },
            number_gift: {
                type: Number
            },
            pedestal_integration_enabled: {
                type: Boolean
            },

        },
        data: () => ({
            api_types: [
                {value: 'post', text: 'POST'},
                {value: 'get', text: 'GET'},
            ],
            prize_count: 1,
            prize_next_id: 1,

            prize_count_rules: [
                v => (!!v || v === 0) || 'Значение не задано'
            ],
            rules: {
                required: v => !!v || 'Недопустимый формат',
                zero: v => (v !== '0') || 'Недопустимый формат',
                max_length_200: v => (v && v.length <= 200) || 'Максимально допустимо 200 символов',
                max_length_12: v => (v && v.length <= 12) || 'Максимально допустимо 12 символов',
                range: v => (/^[0-9]{1,6}$/.test(v) || /^[0-9]{1,6}[-]{1}[0-9]{1,6}$/.test(v)) || 'Недопустимый формат'
            },
            // n: {},
        }),
        computed: {
            types: function () {
                return [
                    {
                        value: 'text',
                        text: 'Свой приз',
                        name: "text",
                        disabled: this.prizes_front_index.card_prizes.find(item => item.type === 'text')
                    },
                    {
                        value: 'balance_shop',
                        text: 'Начислить баланс магазина',
                        name: "balance_shop",
                        disabled: this.prizes_front_index.card_prizes.find(item => item.type === 'balance_shop')
                    },
                    {
                        value: 'balance_rating',
                        text: 'Начислить баланс рейтинга',
                        disabled: this.prizes_front_index.card_prizes.find(item => item.type === 'balance_rating')
                    },
                    // {
                    //     value: 'api',
                    //     text: 'Выполнить POST/GET запрос',
                    //     disabled: this.prizes_front_index.card_prizes.find(item => item.type === 'api')
                    // }
                ]
            },
            types2: function () {
                return [
                    {
                        value: 'text',
                        text: 'Свой приз',
                        name: "text",
                        disabled: this.prizes_front_index.card_prizes.find(item => item.type === 'text')
                    },
                ]
            },
        },
        methods: {
            async add_prize() {
                await this.prizes_front_index.card_prizes.push({
                    type: this.types.find(type => !type.disabled).value
                })
            },
            say_name: function (type) {
                if (this.pedestal_integration_enabled) {
                    return this.types.map(item => ({
                        ...item,
                        disabled: item.value === type ? false : item.disabled
                    }))
                } else {
                    return this.types2.map(item => ({
                        ...item,
                        disabled: item.value === type ? false : item.disabled
                    }))
                }
            },
        },
    }
</script>

<style >
    .border_top_bottom {
        border-left: hidden !important;
        border-right: hidden !important;
        border-top: hidden !important;
        border-bottom: 1px solid #edeef0 !important;
        border-radius: 0 !important;
    }

    .border_top_bottom_is_single_winner {
        border-left: hidden !important;
        border-right: hidden !important;
        border-top: hidden !important;
        border-bottom: hidden !important;
        border-radius: 0 !important;
    }

    .pad_but_0 {
        padding-bottom: 0 !important;
        margin-bottom: -8px;
    }

    #count_win {
        width: 131px;
    }

</style>
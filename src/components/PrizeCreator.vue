<template>
    <v-card
            class="mx my-2"
            width="100%"
            outlined

    >
        <v-card-text>
            <v-row dense>

                <v-col cols="10">
                    <v-text-field
                            type="number"
                            min="0"
                            v-model.number="prize_count"
                            label="Конфигурация подарка №1. Укажите кол-во победителей, которые получат данный подарок"
                            outlined
                            dense
                    ></v-text-field>
                </v-col>

                <v-btn  icon fab absolute right small @click="prizes.splice(i, 1)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-row>
<!--            <hr class="mb-3">-->

            <v-row class="mb-n5" dense v-for="(prize, i) in prizes" :key="prize.id">
                <v-col cols="12" sm="1">
                    <v-btn class="mx-2" fab dark small color="error" @click="prizes.splice(i, 1)">
                        <v-icon dark>mdi-minus</v-icon>
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="5">
                    <v-select
                            :items="prize_types"
                            :value="prize.type"
                            label="Тип приза"
                            readonly
                            disabled
                            outlined
                            dense
                    ></v-select>


                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-if="prize.type === 'own_prize'"
                                  :value="prize.desc"
                                  label="text"
                                  outlined
                                  readonly
                                  disabled
                                  dense
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="12" sm="1">
                    <v-btn class="mx-2" fab dark small color="indigo" @click="add_prize">
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="5">
                    <v-select
                            :items="prize_types"
                            v-model="prize_type"
                            label="Тип приза"
                            outlined
                            dense
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-if="prize_type === 'own_prize'"
                                  v-model="prize_desc"
                                  label="text"
                                  outlined
                                  dense
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-btn fab absolute right bottom dark small color="indigo" @click="prizes.splice(i, 1)">
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>

<!--        <div class="text-center">-->
<!--            <v-btn class="mb-2 mt-n2 ma-2" outlined color="indigo" >Добавить конфигурацию</v-btn>-->
<!--            <v-btn class="mb-2 mt-n2" outlined color="indigo" >Удалить конфигурацию</v-btn>-->

<!--        </div>-->
<!--       </v-card-actions>-->
    </v-card>
</template>

<script>
    export default {
        name: "PrizeCreator",
        data: () => ({
            prize_types: [
                {value: 'own_prize', text: 'Свой приз'},
                {value: 'market_balance', text: 'Зачислить баланс магазина'},
                {value: 'rating_balance', text: 'Зачислить баланс рейтинга'},
                {value: 'api', text: 'Api'}
            ],
            prize_type: null,
            prizes: [],
            prize_desc: '',
            prize_count: null,
            prize_next_id: 1
        }),
        methods: {
            add_prize() {
                let prize = {id: this.prize_next_id++, type: this.prize_type}
                if (this.prize_type === 'own_prize') {
                    prize['desc'] = this.prize_desc
                }
                this.prize_desc = ''
                this.prize_type = null
                this.prizes.push(prize)
            }
        }
    }
</script>

<style scoped>

</style>
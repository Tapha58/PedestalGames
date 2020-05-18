<template>
<v-row dense class="px-3">
    <v-btn @click="transform_prizes_array" >array</v-btn>
    <v-col>
        <v-alert
                border="left"
                color="blue-grey"
                dark
                icon="mdi-numeric-1-box"
                dense
        >Выберите приз
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn x-small color="primary" dark v-on="on">Подсказка</v-btn>
                </template>
                <span>Подсказка</span>
            </v-tooltip>
        </v-alert>
        <PrizeCreator
                v-for="(prize, index) in prizes"
                :key="prize.id"
                :is_single_winner="true"
                :is_last_card="index+1 === prizes.length"
                :is_one_card="1 === prizes.length"
                :id="prize.id"
                :number_gift="index+1"
                v-model="prize.prizes"
                @add_prize_creator="add_prize"
                @delete_prize_creator="delete_prize"
        ></PrizeCreator>
    </v-col>

</v-row>

</template>

<script>
    import PrizeCreator from "@/components/PrizeCreator";
    export default {
        model: {
            prop: 'gameData',
        },
        props: ['gameData'],
        components: {PrizeCreator},
        data: () => ({
            prizes: [
                {
                    id: 1,
                    prize_count: 1,
                    prizes: [{type: 'own_prize'}]
                }
            ],
            ix: 1,
            min: '',
            typePrize: '',
            required_repost: false,

            items: [
                {id: 1, type: null},
                {id: 2, type: 'd'},
            ]
        }),
        methods: {
            add_prize() {
                this.prizes.push({
                    id: ++this.ix,
                    prizes: [{type: 'own_prize'}]
                })
            },
            delete_prize(id) {
                let x = this.prizes.findIndex(item => item.id === id)
                this.prizes.splice(x, 1)
            },
            transform_prizes_array() {
                for (let i = 0; i < this.prizes.length; i++) {
                    let array_games = {}
                    for (let j = 0; j < this.prizes[i].prizes.length; j++) {
                        if (this.prizes[i].prizes[j].type === 'own_prize')
                            Object.assign(array_games, {'prize_text': this.prizes[i].prizes[j].val})
                        if (this.prizes[i].prizes[j].type === 'market_balance')
                            Object.assign(array_games, {'prize_balance_shop_min': this.prizes[i].prizes[j].val})
                        if (this.prizes[i].prizes[j].type === 'rating_balance')
                            Object.assign(array_games, {'prize_balance_rating_max': this.prizes[i].prizes[j].val})
                    }
                    Object.assign(array_games, {'prize_count': this.prizes[i].prizes[0].prize_count})
                    this.gameData.prizes.push(array_games)
                }
            },
            // this.$on('test', function () {
            //     for (let i = 0; i < this.prizes.length; i++) {
            //         let array_games = {}
            //         for (let j = 0; j < this.prizes[i].prizes.length; j++) {
            //             if (this.prizes[i].prizes[j].type === 'own_prize')
            //                 Object.assign(array_games, {'prize_text': this.prizes[i].prizes[j].val})
            //             if (this.prizes[i].prizes[j].type === 'market_balance')
            //                 Object.assign(array_games, {'prize_balance_shop_min': this.prizes[i].prizes[j].val})
            //             if (this.prizes[i].prizes[j].type === 'rating_balance')
            //                 Object.assign(array_games, {'prize_balance_rating_max': this.prizes[i].prizes[j].val})
            //         }
            //         Object.assign(array_games, {'prize_count': this.prizes[i].prizes[0].prize_count})
            //         this.gameData.prizes.push(array_games)
            //     }
            // }),
        },
    }

</script>

<style scoped>

</style>
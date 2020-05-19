<template>
<v-row dense class="px-3">
    <v-col cols="2">
        <v-btn @click="show_main_page" color="primary" small>
            <v-icon small>mdi-arrow-left-thick</v-icon>
            Назад
        </v-btn>
    </v-col>
    <v-col align="center" cols="9">
        <span><b> Игра - угадай число </b></span>
    </v-col>
<!--    <v-col cols="12">-->
<!--        <v-alert-->

<!--                color="primary"-->
<!--                dark-->
<!--text-->
<!--                dense-->
<!--        >-->


<!--                    <v-btn  small color="primary" dark v-on="on">-->
<!--                        <v-icon small>mdi-arrow-left-thick</v-icon>-->
<!--                        Назад</v-btn>-->
<!--            Игра - угадай число-->
<!--        </v-alert>-->
<!--    </v-col>-->
    <v-col cols="12">

        <v-alert
                text
                border="left"
                color="primary"
                dark
                icon="mdi-numeric-1-box"
                dense
        >Выберите приз
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn x-small color="primary" icon dark v-on="on"><v-icon>mdi-alert-circle-outline</v-icon></v-btn>
                </template>
                <span>Подсказка</span>
            </v-tooltip>
        </v-alert>
        <PrizeCreator
                v-for="(prize, index) in gameData.prizes_front"
                :key="prize.id"
                :is_single_winner="false"
                :is_last_card="index+1 === gameData.prizes_front.length"
                :is_one_card="1 === gameData.prizes_front.length"
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
            // prizes: [
            //     {
            //         id: 1,
            //         prize_count: 1,
            //         prizes: [{type: 'own_prize'}]
            //     }
            // ],
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
                this.gameData.prizes_front.push({
                    id: ++this.ix,
                    prizes: [{type: 'own_prize'}]
                })
            },
            delete_prize(id) {
                let x = this.gameData.prizes_front.findIndex(item => item.id === id)
                this.gameData.prizes_front.splice(x, 1)
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
            show_main_page: function () {
                this.main_obj.show_my_games = false
                this.main_obj.show_main_page_tab = true
                this.main_obj.show_main_page = true
            },
        },
    }

</script>

<style scoped>

</style>
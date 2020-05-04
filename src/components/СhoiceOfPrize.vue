<template>
<v-row dense class="px-3">
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
                :is_single_winner="false"
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
        components: {PrizeCreator},
        data: () => ({
            prizes: [
                {
                    id: 1,
                    prizes: []
                }
            ],
            ix: 1,
            min: '',
            up1: '',
            up2: '',
            typePrize: '',
            required_repost: false,
            options: [
                {value: 'a', text: 'Свой приз'},
                {value: 'b', text: 'Зачислить баланс магазина'},
                {value: 'c', text: 'Зачислить баланс рейтинга'},
                {value: 'd', text: 'Выполнить POST/GET запрос'}
            ],
            items: [
                {id: 1, type: null},
                {id: 2, type: 'd'},
            ]
        }),
        methods: {
            add_prize() {
                this.prizes.push({
                    id: ++this.ix,
                    prizes: []
                })
            },
            delete_prize(id) {
                let x = this.prizes.findIndex(item => item.id === id)
                this.prizes.splice(x, 1)
            }
        }
    }
</script>

<style scoped>

</style>
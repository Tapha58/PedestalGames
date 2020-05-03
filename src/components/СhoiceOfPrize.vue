<template>
<v-row dense class="px-3">
        <v-expansion-panels hover>
        <v-expansion-panel>
            <v-expansion-panel-header  color="" disable-icon-rotate>

               1. Выберите приз
                <template v-slot:actions>
                    <v-icon color="error">mdi-alert-circle</v-icon>
                </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </v-expansion-panel-content>
        </v-expansion-panel>
        </v-expansion-panels>

<!--        <v-card-->
<!--                class="mx my-2"-->
<!--                width="100%"-->
<!--                raised-->
<!--        >-->
<!--            <v-list-item three-line>-->
<!--                <v-list-item-content>-->
<!--                    <v-row>-->
<!--                        <v-col cols="12" sm="9">-->
<!--                            <span>Конфигурация подарка №1. Укажите кол-во победителей, которые получат данный подарок.</span>-->
<!--                        </v-col>-->
<!--                        <v-col cols="12" sm="3">-->
<!--                            <v-text-field-->
<!--                                    type="number"-->
<!--                                    min="0"-->
<!--                                    v-model.number="min"-->
<!--                                    label="Кол-во победителей"-->
<!--                                    outlined-->
<!--                                    dense-->
<!--                            ></v-text-field>-->
<!--                        </v-col>-->
<!--                    </v-row>-->


<!--                    <v-row>-->
<!--                        <v-col cols="12" sm="1">-->
<!--                            <v-btn class="mx-2" fab dark small color="indigo">-->
<!--                                <v-icon dark>mdi-plus</v-icon>-->
<!--                            </v-btn>-->
<!--                        </v-col>-->
<!--                        <v-col cols="12" sm="5">-->
<!--                            <v-select-->
<!--                                    :items="options"-->
<!--                                    v-model="required_repost"-->
<!--                                    label="Тип приза"-->
<!--                                    outlined-->
<!--                                    dense-->
<!--                            ></v-select>-->
<!--                        </v-col>-->
<!--                        <v-col cols="12" sm="3">-->
<!--&lt;!&ndash;                            <v-text-field&ndash;&gt;-->
<!--&lt;!&ndash;                                    type="number"&ndash;&gt;-->
<!--&lt;!&ndash;                                    min="0"&ndash;&gt;-->
<!--&lt;!&ndash;                                    v-model.number="min"&ndash;&gt;-->
<!--&lt;!&ndash;                                    label="Кол-во баллов"&ndash;&gt;-->
<!--&lt;!&ndash;                                    outlined&ndash;&gt;-->
<!--&lt;!&ndash;                                    dense&ndash;&gt;-->
<!--&lt;!&ndash;                            ></v-text-field>&ndash;&gt;-->
<!--                        </v-col>-->

<!--                    </v-row>-->
<!--                </v-list-item-content>-->

<!--            </v-list-item>-->

<!--            <v-card-actions>-->
<!--                <v-btn text>Button</v-btn>-->
<!--                <v-btn text>Button</v-btn>-->
<!--            </v-card-actions>-->
<!--        </v-card>-->
        <PrizeCreator></PrizeCreator>
<!--    <v-select :key="items.type" v-for="items in prize"-->
<!--            :items="options"-->
<!--            v-model="items.type"-->
<!--            label="Тип приза"-->
<!--            outlined-->
<!--            dense-->
<!--    ></v-select>-->







<!--        <v-col>-->
<!--            <v-alert-->
<!--                    border="left"-->
<!--                    color="blue-grey"-->
<!--                    dark-->
<!--                    icon="mdi-numeric-1-box"-->
<!--                    dense-->
<!--            >Выберите приз-->
<!--                <v-tooltip bottom>-->
<!--                    <template v-slot:activator="{ on }">-->
<!--                        <v-btn x-small color="primary" dark v-on="on">Подсказка</v-btn>-->
<!--                    </template>-->
<!--                    <span>Подсказка</span>-->
<!--                </v-tooltip>-->
<!--            </v-alert>-->

<!--            <v-row>-->
<!--                <v-col cols="12" sm="1">-->
<!--                    <v-btn class="mx-2" fab dark small color="indigo">-->
<!--                        <v-icon dark>mdi-plus</v-icon>-->
<!--                    </v-btn>-->
<!--                </v-col>-->
<!--                <v-col cols="12" sm="5">-->
<!--                    <v-select-->
<!--                            :items="options"-->
<!--                            v-model="required_repost"-->
<!--                            label="Тип приза"-->
<!--                            outlined-->
<!--                            dense-->
<!--                    ></v-select>-->
<!--                </v-col>-->
<!--                <v-col cols="12" sm="3">-->
<!--                    <v-text-field-->
<!--                        type="number"-->
<!--                        min="0"-->
<!--                        v-model.number="min"-->
<!--                        label="Кол-во баллов"-->
<!--                        outlined-->
<!--                        dense-->
<!--                    ></v-text-field>-->
<!--                </v-col>-->
<!--                <v-col cols="12" sm="3">-->
<!--                    <v-text-field-->
<!--                        type="number"-->
<!--                        min="0"-->
<!--                        v-model.number="min"-->
<!--                        label="Кол-во призов"-->
<!--                        outlined-->
<!--                        dense-->
<!--                    ></v-text-field>-->
<!--                </v-col>-->
<!--            </v-row>-->
<!--        </v-col>-->
    </v-row>




</template>

<script>
    import PrizeCreator from "@/components/PrizeCreator";
    export default {
        components: {PrizeCreator},
        data: () => ({
            min: '',
            up1: '',
            up2: '',
            typePrize: '',
            required_repost: false,
            options: [
                {value: 'a', text: 'Свой приз'},
                {value: 'b', text: 'Зачислить баланс магазина'},
                {value: 'c', text: 'Зачислить баланс рейтинга'},
                {value: 'd', text: 'Api'}
            ],
            // prize: [
            //     {type: this.up1},
            //     {type: this.up2},
            // ],
            items: [
                {id: 1, type: null},
                {id: 2, type: 'd'},
            ]
        }),

    }
</script>

<style scoped>

</style>
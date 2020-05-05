<template>
    <v-row class="px-3 pt-3" dense>
        <!--        <v-col cols="0">-->
        <!--            <v-alert-->
        <!--                    border="left"-->
        <!--                    color="blue-grey"-->
        <!--                    dark-->
        <!--                    icon="mdi-numeric-4-box"-->
        <!--                    dense-->
        <!--            > Отложенный запуск-->
        <!--                <template #append>-->
        <!--                    <v-switch-->
        <!--                            dark-->
        <!--                            class="mt-n1"-->
        <!--                            v-model="delayedLaunch"-->
        <!--                            label=""-->
        <!--                            color="white"-->
        <!--                            hide-details-->
        <!--                    ></v-switch>-->
        <!--                </template>-->
        <!--                <v-tooltip bottom>-->
        <!--                    <template v-slot:activator="{ on }">-->
        <!--                        <v-btn x-small color="primary" dark v-on="on">Подсказка</v-btn>-->
        <!--                    </template>-->
        <!--                    <span>Подсказка</span>-->
        <!--                </v-tooltip>-->
        <!--            </v-alert>-->
        <!--        </v-col>-->
        <!--            <v-row v-show="delayedLaunch">-->
        <v-col cols="4">
            <v-switch

                    color=""
                    hide-details
                    label="Отложенный запуск"
                    v-model="delayedLaunch"
            ></v-switch>
        </v-col>
        <v-col align="center" cols="5" v-show="delayedLaunch">
            <VueCtkDateTimePicker
                    format="YYYY-MM-DD HH:mm"
                    formated="||"
                    label="Задайте дату и время публикации"
                    no-button-now
                    v-model="yourValue"/>
        </v-col>

        <!--            </v-row>-->

    </v-row>

</template>

<script>
    export default {
        data: () => ({
            date: new Date().toISOString().substr(0, 10),
            date1: '',
            menu: false,
            modal: false,
            menu2: false,
            menu1: false,
            time: null,
            modal2: false,
            delayedLaunch: false,
            condition: 'выключен',
            onOff: false,
            yourValue: '',
            color: 'error'
        }),
        methods: {
            changeCondition: function () {
                if (this.onOff) {
                    this.condition = 'выключен'
                    this.onOff = !this.onOff
                    this.color = 'error'

                } else {
                    this.condition = 'включен'
                    this.onOff = !this.onOff
                    this.color = 'success'
                }
            }
        }
    }
</script>

<style scoped>

</style>
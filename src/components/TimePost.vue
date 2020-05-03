<template>
    <v-row dense class="px-3">
        <v-col>
            <v-alert
                    border="left"
                    color="blue-grey"
                    dark
                    icon="mdi-numeric-4-box"
                    dense
            > Отложенный запуск
                <template #append>
                    <v-switch
                            dark
                            class="mt-n1"
                            v-model="delayedLaunch"
                            label=""
                            color="white"
                            hide-details
                    ></v-switch>
                </template>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn x-small color="primary" dark v-on="on">Подсказка</v-btn>
                    </template>
                    <span>Подсказка</span>
                </v-tooltip>
            </v-alert>

            <v-row v-show="delayedLaunch">
                <v-col cols="12" sm="6" md="6" class="pt-0">
                    <VueCtkDateTimePicker
                    label="Задайте дату и время публикации"
                    formated="||"
                    no-button-now
                    format="YYYY-MM-DD HH:mm"
                    v-model="yourValue" />
                </v-col>
                <v-col cols="12" sm="6" md="6">

                </v-col>
            </v-row>
        </v-col>
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

               }
                else {
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
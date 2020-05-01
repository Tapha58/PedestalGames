<template>
    <v-row dense class="px-3">
        <v-col>

            <v-alert
                    border="left"
                    color="blue-grey"
                    dark
                    icon="mdi-numeric-4-box"
                    dense
            >Отложенный запуск


                <v-btn x-small :color="color" dark @click="changeCondition">{{ condition }}</v-btn>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn x-small color="primary" dark v-on="on">Подсказка</v-btn>
                    </template>
                    <span>Подсказка</span>
                </v-tooltip>
            </v-alert>


<!--        <v-switch-->
<!--                class="mt-n3"-->
<!--                v-model="delayedLaunch"-->
<!--                label="4. Отложенный запуск"-->
<!--                color="primary"-->
<!--                hide-details-->
<!--        ></v-switch>-->

    <v-row
    v-show="onOff"
    >


        <v-col cols="12" sm="6" md="3">
            <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                            v-model="date"
                            label="Дата публикации"
                            prepend-icon="mdi-update"

                            v-on="on"
                            hint="ГГГГ/ММ/ДД формат"
                            persistent-hint

                    ></v-text-field>
                </template>
                <v-date-picker locale="ru" v-model="date" @input="menu2 = false"></v-date-picker>
            </v-menu>
        </v-col>
        <v-spacer></v-spacer>

        <v-col cols="12" sm="6" md="3">
            <v-menu
                    ref="menu"
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                            v-model="time"
                            label="Время публикации"
                            prepend-icon="mdi-update"
                            readonly
                            v-on="on"
                    ></v-text-field>
                </template>
                <v-time-picker
                        v-if="menu1"
                        v-model="time"
                        full-width
                        format="24hr"
                        @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
            </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="6"></v-col>

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
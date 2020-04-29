<template>
    <div class="col-sm-12">

        <v-tooltip bottom max-width="710">
            <template v-slot:activator="{ on }">
                <span v-on="on">1. Загадайте число</span>
                <v-btn @click="randomNumber" icon color="primary">
                    <v-icon>mdi-cached</v-icon>
                </v-btn>
            </template>
            <span>'Бот случайным образом будет подсказывать меньше загаданное число или больше. Поэтому не бойтесь загадывать число побольше. Например число от 1 до 100 игроки угадают довольно-таки быстро.'</span>
        </v-tooltip>

<!--        <v-form ref="form" v-model="valid">-->
<!--            <v-container>-->
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-text-field
                                v-model.number="min"
                                :rules="minRules"
                                label="Левая граница"
                                required
                                outlined
                                dense
                                type="number"
                                min="0"
                                ref="mm"
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="12"
                            sm="4"
                    >
                        <v-text-field
                                v-model.number="selectNumber"
                                :rules="selectNumberRules"
                                label="Загаданное число"
                                required
                                outlined
                                dense
                                type="number"
                                min="0"
                        ></v-text-field>

                    </v-col>

                    <v-col
                            cols="12"
                            sm="4"
                    >
                        <v-text-field
                                v-model.number="max"
                                :rules="maxRules"
                                label="Правая граница"
                                required
                                outlined
                                dense
                                type="number"
                                min="0"

                        ></v-text-field>
                    </v-col>
                </v-row>
<!--            </v-container>-->
<!--        </v-form>-->



    </div>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            min: 0,
            max: 123456789,
            minRules: [
                v => (!!v || v === 0) || 'Значение не задано'
            ],
            selectNumber: ''
        }),

        computed: {
            maxRules () {
                const rules = [(v) => !!v || v === 0 || 'Значение не задано']
                if (this.max !== null) {
                    const rule =
                        v => this.min < v || `Укажите число больше ${this.min}`
                    rules.push(rule)
                }
                return rules
            },
            selectNumberRules () {
                const rules = [(v) => !!v || v === 0 || 'Значение не задано']
                if (this.selectNumber !== null) {
                    const rule =
                        v => (this.min <= v && this.max >= v)  || `Число вне диапазона`
                    rules.push(rule)
                }
                return rules
            },
        },
        // watch: {
        //     min: 'validateField',
        //     max: 'validateField',
        //     number: 'validateField',
        // },
        //
        methods: {
            // validateField () {
            //     this.$refs.form.validate()
            // },
            randomNumber : function() {
                this.selectNumber = Math.floor(this.min + Math.random() * (this.max + 1 - this.min));
            }
        }
    }
</script>

<style scoped>

</style>
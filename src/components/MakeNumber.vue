<template>
    <v-row dense class="px-3 pt-5">
        <v-col>
            <v-alert
                border="left"
                color="blue-grey"
                dark
                icon="mdi-numeric-2-box"
                dense
            >Загадайте число
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn x-small color="primary" dark v-on="on">Подсказка</v-btn>
                    </template>
                    <span>Подсказка</span>
                </v-tooltip>
            </v-alert>
<!--            <PrizeCreator></PrizeCreator>-->
            <v-form ref="form" v-model="valid">
                    <v-row style="border-color: #1a237e">
                        <v-col class="pb-0" cols="12" sm="4">
                            <v-text-field
                                v-model.number="gameData.min_number"
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
                        <v-col class="pb-0" cols="12" sm="4">
                            <v-text-field
                                    v-model.number="gameData.guessed_number"
                                    :rules="selectNumberRules"
                                    label="Загаданное число"
                                    required
                                    outlined
                                    dense
                                    type="number"
                                    min="0"
                            >
                                <template #append>
                                    <v-btn  class="mt-n0" small icon @click="randomNumber">
                                        <v-icon>mdi-cached</v-icon>
                                    </v-btn>
                                 </template>
                            </v-text-field>
                        </v-col>
                        <v-col class="pb-0" cols="12" sm="4">
                            <v-text-field
                                v-model.number="gameData.max_number"
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
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        model: {
            prop: 'gameData',
        },
        props: ['gameData'],
        data: () => ({
            valid: false,
            minRules: [
                v => (!!v || v === 0) || 'Значение не задано'
            ],
        }),

        computed: {
            maxRules () {
                const rules = [(v) => !!v || v === 0 || 'Значение не задано']
                if (this.gameData.max_number !== null) {
                    const rule =
                        v => this.gameData.min_number < v || `Укажите число больше ${this.gameData.min_number}`
                    rules.push(rule)
                }
                return rules
            },
            selectNumberRules () {
                const rules = [(v) => !!v || v === 0 || 'Значение не задано']
                if (this.gameData.guessed_number !== null) {
                    const rule =
                        v => (this.gameData.min_number <= v && this.gameData.max_number >= v)  || `Число вне диапазона`
                    rules.push(rule)
                }
                return rules
            },
        },
        watch: {
            'gameData.min_number': 'validateField',
            'gameData.max_number': 'validateField',
            'gameData.guessed_number': 'validateField',
        },

        methods: {
            validateField () {
                console.log('валидация')
                this.$refs.form.validate()
            },
            randomNumber : function() {
                this.gameData.guessed_number = Math.floor(this.gameData.min_number + Math.random() * (this.gameData.max_number + 1 - this.gameData.min_number));
            }
        }
    }
</script>

<style scoped>

</style>
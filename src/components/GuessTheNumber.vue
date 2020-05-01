<template>
    <v-row dense class="px-3">
        <v-col>
            <v-alert
                border="left"
                color="blue-grey"
                dark
                icon="mdi-numeric-1-box"
                dense
            >Загадайте число
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn x-small color="primary" dark v-on="on">Подсказка</v-btn>
                    </template>
                    <span>Подсказка</span>
                </v-tooltip>
            </v-alert>

            <v-form ref="form" v-model="valid">
                    <v-row>
                        <v-col class="pb-0" cols="12" sm="4">
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
                        <v-col class="pb-0" cols="12" sm="4">
                            <v-text-field
                                    v-model.number="selectNumber"
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
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            min: '',
            max: '',
            minRules: [
                v => (!!v || v === 0) || 'Значение не задано'
            ],
            selectNumber: ''
        }),

        computed: {
            maxRules () {
                console.log("а сюда зашли "  + this.max)
                const rules = [(v) => !!v || v === 0 || 'Значение не задано']
                if (this.max !== null) {
                    console.log(this.max)
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
        watch: {
            min: 'validateField',
            max: 'validateField',
            number: 'validateField',
        },

        methods: {
            validateField () {
                this.$refs.form.validate()
            },
            randomNumber : function() {
                this.selectNumber = Math.floor(this.min + Math.random() * (this.max + 1 - this.min));
            }
        }
    }
</script>

<style scoped>
    /*span {*/
    /*    color: green;*/
    /*}*/
</style>
<template>
    <div class="col-lg-12">
        <h6
            v-b-popover.hover.bottom.v-primary="'Бот случайным образом будет подсказывать меньше загаданное число или больше. Поэтому не бойтесь загадывать число побольше. Например число от 1 до 100 игроки угадают довольно-таки быстро.'"
            title="Подсказка"
            id="rules1"
            class="p-2 mb-2  bg-primary text-white"
        >1. Загадывание числа</h6>


        <div class="row">
            <div class="col-sm mb-3 mb-sm-0">
                <label for="leftBorder">Левая граница:</label>
                <b-form-input name="leftBorder" :state="null" type="number" required list="input-list" id="leftBorder" min="0" v-model="min"></b-form-input>
            </div>

            <div class="col-sm mb-3 mb-sm-0">
                <label for="selectNumber">Загаданное число:</label>
                <b-input-group>

                    <b-form-input name="selectNumber" :state="selectNumber" id="selectNumber" type="number" min="0" v-model="select" aria-describedby="input-live-feedback"></b-form-input>
                    <b-button @click="randomNumber" variant="outline-secondary">
                        <b-icon icon="arrow-repeat"></b-icon>
                    </b-button>
                    <b-form-invalid-feedback id="input-live-feedback">
                        Загаданное число вне диапазона
                    </b-form-invalid-feedback>
<!--                    <b-input-group-append>-->
<!--                        <b-button @click="randomNumber" variant="outline-secondary">-->
<!--                            <b-icon icon="arrow-repeat"></b-icon>-->
<!--                        </b-button>-->
<!--                    </b-input-group-append>-->
                </b-input-group>

            </div>

            <div class="col-sm">
                <label for="rightBorder">Правая граница:</label>
                <b-form-input name="rightBorder" :state="rightBorder" type="number" list="input-list" id="rightBorder" min="0" v-model="max"></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback">
                    Укажите число больше {{min}}
                </b-form-invalid-feedback>
            </div>



        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                min: 0,
                select: 50,
                max: 100
            }
        },
        computed: {
            rightBorder() {
                if (+this.min <= +this.max)
                    return null
                else
                    return false
            },

            selectNumber() {
                if (+this.min <= +this.max)
                    return (+this.select >= +this.min && +this.select <= +this.max)
                else
                    return true
            },
        },
        methods : {
            randomNumber : function() {
                this.select = Math.floor(+this.min + Math.random() * (+this.max + 1 - +this.min));
            }
        }
    }
</script>

<style scoped>

</style>
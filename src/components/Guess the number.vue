<template>
    <div class="px-5 col-lg-6">
        <h6 class="p-2 mb-2 bg-primary text-white">1. Загадывание числа</h6>


        <div class="row">
            <div class="col-sm mb-3 mb-sm-0">
                <label for="leftBorder">Левая граница:</label>
                <b-form-input name="leftBorder" type="number" required list="input-list" id="leftBorder" v-model="min"></b-form-input>
            </div>

            <div class="col-sm mb-3 mb-sm-0">
                <label for="selectNumber">Загаданное число:</label>
                <b-input-group>
                    <b-form-input name="selectNumber" id="selectNumber" type="number" min="" v-model="selectNumber"></b-form-input>
                    <b-input-group-append>
                        <b-button @click="randomNumber" variant="outline-secondary">
                            <b-icon icon="arrow-repeat"></b-icon>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </div>

            <div class="col-sm">
                <label for="rightBorder">Правая граница:</label>
                <b-form-input name="rightBorder" type="number" list="input-list" id="rightBorder" v-model="max"></b-form-input>
            </div>



        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                min: 0,
                selectNumber: 52148,
                max: 85687
            }
        },
        methods : {
            randomNumber : function(){
                this.selectNumber = Math.floor(+this.min + Math.random() * (+this.max + 1 - +this.min));
            }
        }
    }
</script>

<style scoped>

</style>
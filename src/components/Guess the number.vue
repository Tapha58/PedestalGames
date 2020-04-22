<template>
    <div class="mx-5">
        <h5 class="p-2 mb-2 bg-primary text-white">1. Загадывание числа</h5>


        <b-form class="row">
            <div class="col-sm">
                <label for="input-with-list">Левая граница:</label>
                <b-form-input type="number" required list="input-list" id="input-with-list" v-model="min"></b-form-input>
            </div>

            <div class="col-sm">
                <label for="">Загаданное число:</label>
                <b-input-group>
                    <b-form-input type="number" min="" v-model="selectNumber"></b-form-input>
                    <b-input-group-append>
                        <b-button @click="randomNumber" variant="primary">
                            <b-icon icon="arrow-repeat"></b-icon>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </div>

            <div class="col-sm">
                <label for="input-with-list">Правая граница:</label>
                <b-form-input type="number" list="input-list" id="input-with-list" v-model="max"></b-form-input>
            </div>



        </b-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                min: 111,
                selectNumber: 87654,
                max: 555
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
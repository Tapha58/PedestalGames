<template>
    <div class="mx-5">
        <h4 class="p-2 mb-2 bg-warning text-dark">1. Загадывание числа</h4>


        <b-form class="row">
            <div class="col-sm">
                <label for="input-with-list">Левая граница:</label>
                <b-form-input type="number" list="input-list" id="input-with-list" value="0"></b-form-input>
            </div>

            <div class="col-sm">
                <label for="">Левая граница:</label>
                <b-input-group>


                    <b-form-input type="number" min=""></b-form-input>

                    <b-input-group-append>
                        <b-button variant="outline-secondary">
                            <b-icon icon="arrow-repeat"></b-icon>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </div>

            <div class="col-sm">
                <label for="input-with-list">Правая граница:</label>
                <b-form-input type="number" list="input-list" id="input-with-list" value="0"></b-form-input>
            </div>



        </b-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style scoped>

</style>
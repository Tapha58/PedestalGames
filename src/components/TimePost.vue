<template>
    <div class="col-lg-12">
        <h6 v-b-popover.hover.bottom.v-primary="'Popover!'" id="rules1" class="p-2 mb-2 bg-primary text-white">4. Отложенный запуск</h6>
        <div  class="mb-3">
            <b-form-checkbox v-model="checked" name="check-button" switch>
                Запланировать запуск
            </b-form-checkbox>
        </div>
        <div class="row mx-0" v-show = "checked">
            <b-calendar v-model="value" label-no-date-selected="дата не выбрана" :min="min" :max="max" locale="ru"></b-calendar>
            <b-time label-no-time-selected="время не выбрано" class="mx-2" id="ex-disabled-readonly" :readonly="readonly"></b-time>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            // 15th two months prior
            const minDate = new Date(today)
            // 15th in two months
            const maxDate = new Date(today)
            maxDate.setMonth(maxDate.getMonth() + 2)
            maxDate.setDate(15)

            return {
                value: '',
                min: minDate,
                max: maxDate,
                checked: false
            }
        },
        computed: {
            disabled() {
                return this.state === 'disabled'
            },
            readonly() {
                return this.state === 'readonly'
            }
        }
    }
</script>

<style scoped>

</style>
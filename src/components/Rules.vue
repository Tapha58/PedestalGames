<template>
    <div class="mx-5">

        <h4 class="p-2 mb-2 bg-warning text-dark">2. Правила конкурса</h4>

        <b-form-group
            label-cols-sm="12"
            label-cols-md="5"
            label="Количество попыток"
            label-for="numberOfAttempts"
        >
            <b-form-input type="number" id="numberOfAttempts" value="3"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
            label-cols-sm="12"
            label-cols-md="5"
            label="Репост"
            label-for="repost"
        >
            <b-form-select required id="repost" v-model="selected" :options="options"></b-form-select>
        </b-form-group>

        <b-form-group
            v-show = "selected == 'c'"
            label-cols-sm="12"
            label-cols-md="5"
            label="Попыток за репост"
            label-for="attemptsBehindRepost"
        >
            <b-form-input type="number" required id="attemptsBehindRepost" value="1"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
            label-cols-sm="12"
            label-cols-md="5"
            label="Подписка на группу"
            label-for="subscribingGroup"
        >
            <b-form-select required id="subscribingGroup" v-model="selected1" :options="options"></b-form-select>
        </b-form-group>

        <b-form-group
            v-show = "selected1 == 'c'"
            label-cols-sm="12"
            label-cols-md="5"
            label="Попыток за подписку"
            label-for="attemptsBehindSubscribingGroup"
        >
            <b-form-input type="number" required id="attemptsBehindSubscribingGroup" value="1"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
                label-cols-sm="12"
                label-cols-md="5"
                label="Подписка на сообщения группы"
                label-for="subscribingGroupMessage"
        >
            <b-form-select required id="subscribingGroupMessage" v-model="selected2" :options="options"></b-form-select>
        </b-form-group>

        <b-form-group
                v-show = "selected2 == 'c'"
                label-cols-sm="12"
                label-cols-md="5"
                label="Попыток за подписку"
                label-for="attemptsBehindSubscribingGroupMessage"
        >
            <b-form-input type="number" required id="attemptsBehindSubscribingGroupMessage" value="1"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
                label-cols-sm="12"
                label-cols-md="5"
                label="Время между попытками (мин)"
                label-for="timeBetweenAttempts"
        >
            <b-form-input type="number" id="timeBetweenAttempts" value="1"></b-form-input>
        </b-form-group>

        <hr>

    </div>



</template>

<script>
    export default {
        data: () => ({
            selected: 'a',
            selected1: 'a',
            selected2: 'a',
            options: [
                { value: 'a', text: 'Не требуется' },
                { value: 'b', text: 'Требуется' },
                { value: 'c', text: 'Дает дополнительные попытки' },
            ]
        })
    }
</script>

<style scoped>


</style>
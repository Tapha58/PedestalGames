<template>

    <div class="px-5 col-lg-6">

        <h6 class="p-2 mb-2 bg-primary text-white">2. Правила конкурса</h6>

        <b-form-group
                label-cols-sm="12"
                label-cols-md="5"
                label="Для использования попытки"
                label-for="forUseAttempt"
        >
            <b-form-select name="forUseAttempt" required id="forUseAttempt" v-model="selected3" :options="options1"></b-form-select>
        </b-form-group>

        <hr>

        <b-form-group
            label-cols-sm="12"
            label-cols-md="5"
            label="Количество бесплатных попыток"
            label-for="numberOfFreeAttempts"
        >
            <b-form-input name="numberOfFreeAttempts" type="number" id="numberOfFreeAttempts" value="3"></b-form-input>
        </b-form-group>

        <hr>


        <b-form-group
            v-show = "!(selected3 == 'a')"
            label-cols-sm="12"
            label-cols-md="5"
            label="Количество платных попыток"
            label-for="numberOfPaidAttempts"
        >
            <b-form-input name="numberOfPaidAttempts" type="number" id="numberOfPaidAttempts" value="3"></b-form-input>
        </b-form-group>

        <b-form-group
                v-show = "!(selected3 == 'a')"
                label-cols-sm="12"
                label-cols-md="5"
                label="Цена попытки"
                label-for="attemptPrice"
        >
            <b-form-input name="attemptPrice" type="number" id="attemptPrice" value="3"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
            label-cols-sm="12"
            label-cols-md="5"
            label="Репост"
            label-for="repost"
        >
            <b-form-select name="repost" required id="repost" v-model="selected" :options="options2"></b-form-select>
        </b-form-group>

        <b-form-group
            v-show = "selected == 'c'"
            label-cols-sm="12"
            label-cols-md="5"
            label="Попыток за репост"
            label-for="attemptsBehindRepost"
        >
            <b-form-input name="attemptsBehindRepost" type="number" required id="attemptsBehindRepost" value="1"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
            label-cols-sm="12"
            label-cols-md="5"
            label="Подписка на группу"
            label-for="subscribingGroup"
        >
            <b-form-select name="subscribingGroup" required id="subscribingGroup" v-model="selected1" :options="options2"></b-form-select>
        </b-form-group>

        <b-form-group
            v-show = "selected1 == 'c'"
            label-cols-sm="12"
            label-cols-md="5"
            label="Попыток за подписку"
            label-for="attemptsBehindSubscribingGroup"
        >
            <b-form-input name="attemptsBehindSubscribingGroup" type="number" required id="attemptsBehindSubscribingGroup" value="1"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
                label-cols-sm="12"
                label-cols-md="5"
                label="Подписка на сообщения группы"
                label-for="subscribingGroupMessage"
        >
            <b-form-select name="subscribingGroupMessage" required id="subscribingGroupMessage" v-model="selected2" :options="options2"></b-form-select>
        </b-form-group>

        <b-form-group
                v-show = "selected2 == 'c'"
                label-cols-sm="12"
                label-cols-md="5"
                label="Попыток за подписку"
                label-for="attemptsBehindSubscribingGroupMessage"
        >
            <b-form-input name="attemptsBehindSubscribingGroupMessage" type="number" required id="attemptsBehindSubscribingGroupMessage" value="1"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
                label-cols-sm="12"
                label-cols-md="5"
                label="Время между попытками (мин)"
                label-for="timeBetweenAttempts"
        >
            <b-form-input name="timeBetweenAttempts" type="number" id="timeBetweenAttempts" value="1"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
                label-cols-sm="12"
                label-cols-md="5"
                label="Периодические попытки"
                label-for="periodicAttempts"
        >
            <b-form-select name="periodicAttempts" id="periodicAttempts" v-model="selected4" :options="options3"></b-form-select>
        </b-form-group>

        <div v-show="selected4 == 'b'">
            <b-form-group
                    label-cols-sm="12"
                    label-cols-md="5"
                    label="Количество попыток"
                    label-for="numberOfAttempts"
            >
                <b-form-input name="numberOfAttempts" type="number" id="numberOfAttempts" value="3"></b-form-input>
            </b-form-group>

            <b-form-group
                    label-cols-sm="12"
                    label-cols-md="5"
                    label="Частота"
                    label-for="frequency"
            >
                <b-form-input name="frequency" type="number" id="frequency" value="3"></b-form-input>
            </b-form-group>

            <b-form-group
                    label-cols-sm="12"
                    label-cols-md="5"
                    label="Сколько раз"
                    label-for="howManyTimes"
            >
                <b-form-input name="howManyTimes" type="number" id="howManyTimes" value="3"></b-form-input>
            </b-form-group>
        </div>

    </div>



</template>

<script>
    export default {
        data: () => ({
            selected: 'a',
            selected1: 'a',
            selected2: 'a',
            selected3: 'a',
            selected4: 'a',
            options1: [
                { value: 'a', text: 'ничего не нужно' },
                { value: 'b', text: 'спишется рейтинг активности' },
                { value: 'c', text: 'спишется баланс магазина' }
            ],
            options2: [
                { value: 'a', text: 'не требуется' },
                { value: 'b', text: 'требуется' },
                { value: 'c', text: 'дает дополнительные попытки' }
            ],
            options3: [
                { value: 'a', text: 'не выдаются' },
                { value: 'b', text: 'выдаются бесплатные' },
            ]
        })
    }
</script>

<style scoped>



</style>
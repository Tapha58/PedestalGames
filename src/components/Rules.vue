<template>

    <div class="col-sm-12">

        <h6 class="p-2 mb-2 bg-primary text-white">2. Правила конкурса</h6>

        <b-form-group
                id="forUseAttemptLabel"
                label-cols-sm="6"
                label-cols-md="5"
                label="Вариант игры"
                label-for="forUseAttempt"
        >

            <b-form-select id="forUseAttempt" v-model="forUseAttempt" :options="options1"></b-form-select>
        </b-form-group>
<!--        <b-tooltip target="forUseAttemptLabel"  placement="topright">Бесплатные попытки - вариант бесплатной игры для участников. Бесплатные попытки + баланс рейтинга активности - вариант игры при котором после окончания бесплатных попыток, будут расходоваться платные попытки, за счет расходования баланса рейтинга активности.</b-tooltip>-->

        <hr>

        <b-form-group
            label-cols-sm="6"
            label-cols-md="5"
            label="Количество бесплатных попыток"
            label-for="numberOfFreeAttempts"
        >
            <b-form-input :state="numberOfFreeAttempts.length > 0" type="number" id="numberOfFreeAttempts" min="0" v-model="numberOfFreeAttempts"></b-form-input>

        </b-form-group>

        <hr>

        <b-form-group
            v-show = "!(forUseAttempt == 'a')"
            label-cols-sm="6"
            label-cols-md="5"
            label="Количество платных попыток"
            label-for="numberOfPaidAttempts"
        >
            <b-form-input :state="numberOfPaidAttempts.length > 0" type="number" id="numberOfPaidAttempts" min="1" v-model="numberOfPaidAttempts"></b-form-input>
        </b-form-group>

        <b-form-group
                v-show = "!(forUseAttempt == 'a')"
                label-cols-sm="6"
                label-cols-md="5"
                label="Цена попытки"
                label-for="attemptPrice"
        >
            <b-form-input :state="attemptPrice.length > 0" type="number" id="attemptPrice" min="1" v-model="attemptPrice"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
            label-cols-sm="6"
            label-cols-md="5"
            label="Репост"
            label-for="repost"
        >
            <b-form-select id="repost" v-model="repost" :options="options2"></b-form-select>
        </b-form-group>

        <b-form-group
            v-show = "repost == 'c'"
            label-cols-sm="6"
            label-cols-md="5"
            label="Попыток за репост"
            label-for="attemptsBehindRepost"
        >
            <b-form-input :state="attemptsBehindRepost.length > 0" type="number" required id="attemptsBehindRepost" min="1" v-model="attemptsBehindRepost"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
            label-cols-sm="6"
            label-cols-md="5"
            label="Подписка на группу"
            label-for="subscribingGroup"
        >
            <b-form-select name="subscribingGroup" id="subscribingGroup" v-model="subscribingGroup" :options="options2"></b-form-select>
        </b-form-group>

        <b-form-group
            v-show = "subscribingGroup == 'c'"
            label-cols-sm="6"
            label-cols-md="5"
            label="Попыток за подписку"
            label-for="attemptsBehindSubscribingGroup"
        >
            <b-form-input :state="attemptsBehindSubscribingGroup.length > 0" v-model="attemptsBehindSubscribingGroup" type="number" id="attemptsBehindSubscribingGroup" min="1"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
                label-cols-sm="6"
                label-cols-md="5"
                label="Подписка на сообщения группы"
                label-for="subscribingGroupMessage"
        >
            <b-form-select id="subscribingGroupMessage" v-model="subscribingGroupMessage" :options="options2"></b-form-select>
        </b-form-group>

        <b-form-group
                v-show = "subscribingGroupMessage == 'c'"
                label-cols-sm="6"
                label-cols-md="5"
                label="Попыток за подписку"
                label-for="attemptsBehindSubscribingGroupMessage"
        >
            <b-form-input  type="number" :state="attemptsBehindSubscribingGroupMessage.length > 0" v-model="attemptsBehindSubscribingGroupMessage" id="attemptsBehindSubscribingGroupMessage" min="1"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
                label-cols-sm="6"
                label-cols-md="5"
                label="Время между попытками (мин)"
                label-for="timeBetweenAttempts"
        >
            <b-form-input :state="timeBetweenAttempts.length > 0" v-model="timeBetweenAttempts" type="number" id="timeBetweenAttempts" min="1"></b-form-input>
        </b-form-group>

        <hr>

        <b-form-group
                label-cols-sm="6"
                label-cols-md="5"
                label="Периодические попытки"
                label-for="periodicAttempts"
        >
            <b-form-select  id="periodicAttempts" v-model="periodicAttempts" :options="options3"></b-form-select>
        </b-form-group>

        <div v-show="periodicAttempts == 'b'">
            <b-form-group
                    label-cols-sm="6"
                    label-cols-md="5"
                    label="Количество попыток"
                    label-for="numberOfAttempts"
            >
                <b-form-input :state="numberOfAttempts.length > 0" type="number" v-model="numberOfAttempts" id="numberOfAttempts" min="1"></b-form-input>
            </b-form-group>

            <b-form-group
                    label-cols-sm="6"
                    label-cols-md="5"
                    label="Частота"
                    label-for="frequency"
            >
                <b-form-input :state="frequency.length > 0" v-model="frequency" type="number" id="frequency" min="1"></b-form-input>
            </b-form-group>

            <b-form-group
                    label-cols-sm="6"
                    label-cols-md="5"
                    label="Сколько раз"
                    label-for="howManyTimes"
            >
                <b-form-input :state="howManyTimes.length > 0" v-model="howManyTimes" type="number" id="howManyTimes" min="1"></b-form-input>
            </b-form-group>
        </div>

    </div>



</template>

<script>
    import bridge from '@vkontakte/vk-bridge';
    export default {
        data: () => ({
            repost: 'a',
            subscribingGroup: 'a',
            subscribingGroupMessage: 'a',
            numberOfPaidAttempts: '4',
            numberOfFreeAttempts: '5',
            numberOfAttempts: '5',
            attemptPrice: '10',
            attemptsBehindSubscribingGroup: '1',
            attemptsBehindSubscribingGroupMessage: '1',
            timeBetweenAttempts: '1',
            frequency: '1',
            howManyTimes: '1',
            forUseAttempt: 'a',
            periodicAttempts: 'a',
            attemptsBehindRepost: '3',
            options1: [
                { value: 'a', text: 'бесплатные попытки' },
                { value: 'b', text: 'бесплатные попытки + баланс рейтинга' },
                { value: 'c', text: 'бесплатные попытки + баланс магазина' }
            ],
            options2: [
                { value: 'a', text: 'не требуется' },
                { value: 'b', text: 'требуется' },
                { value: 'c', text: 'дает дополнительные бесплатные попытки' }
            ],
            options3: [
                { value: 'a', text: 'не выдаются' },
                { value: 'b', text: 'выдаются бесплатные' },
            ]
        }),
        watch: {
            forUseAttempt: function () {
                console.log('1: ' + document.body.offsetHeight)
                setTimeout(this.resize, 0);


                console.log('2: ' + document.body.offsetHeight)

            }
        },
        methods: {
            resize() {
                bridge.send("VKWebAppResizeWindow", {"width": 710, "height": +document.body.offsetHeight})
            }
        }
    }
</script>

<style scoped>



</style>
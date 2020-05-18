<template>
    <div>
        <ChoicePrize v-model="gameData"></ChoicePrize>
        <MakeNumber v-model="gameData"></MakeNumber>
        <Rules v-model="gameData"></Rules>
        <PostSettings v-model="gameData"></PostSettings>
        <ImagePost v-model="gameData"></ImagePost>
        <TimePost></TimePost>
        <AdvancedSettings v-model="gameData"></AdvancedSettings>
    </div>
</template>

<script>
    import ChoicePrize from '@/components/СhoicePrize.vue';
    import MakeNumber from '@/components/MakeNumber.vue';
    import Rules from '@/components/Rules.vue';
    import PostSettings from '@/components/PostSettings.vue';
    import ImagePost from '@/components/ImagePost.vue';
    import TimePost from '@/components/TimePost.vue';
    import AdvancedSettings from '@/components/AdvancedSettings.vue';

    export default {
        name: "GuessNumber",
        components: {
            ChoicePrize, MakeNumber, Rules, PostSettings, ImagePost, AdvancedSettings, TimePost,
        },
        data: () => ({
            gameData: {
                "game": {
                    "id_group_vk": 106581421,
                    "id_post_vk": 956,
                    "is_active": true,
                    "post_publication_date": "2020-05-12T22:59:44+03:00",
                    "is_random_giveaway": false,
                    "winner_max": 0,
                    "free_attempts_count": 0,
                    "paid_attempts_count": 0,
                    "paid_attempt_price": 0,
                    "balance_type": null,
                    "required_join_group": null,
                    "required_enable_notifications": null,
                    "required_repost": false,
                    "required_join_partner_group": null,
                    "join_group_count_attempts": 0,
                    "enable_notifications_count_attempts": 0,
                    "repost_count_attempts": 0,
                    "join_partner_group_count_attempts": 0,
                    "partner_group_id": null,
                    "attempts_interval": 0,
                    "attempts_extended_count": 0,
                    "attempts_extended_frequency_minutes": 0,
                    "attempts_extended_max_count": 0,
                    "start_date": "2020-05-12T18:59:44+03:00",
                    "end_date": null,
                    "partner_group_members_start": null,
                    "group_members_start": 0,
                    "disable_comments_after_end": true,
                    "win_per_participant_limit": 0,
                    "message_win": "{profile}, поздравляем, Вы выиграли! {текст приза} {начисление_на_баланс} {начисление рейтинга} {API}.",
                    "message_win_balance": "На баланс зачислено {count_win_balance) {balance_name}.",
                    "message_win_rating": "На рейтинг зачислено {count_win_rating} {rating_name}",
                    "message_win_API": "Win api",
                    "message_win_API_fail": "Api fail",
                    "message_already_win": "{profile}, вы уже выиграли в этой игре.",
                    "message_attempts_timeout": "{profile}, слишком часто. Попробуйте через {timeout}.",
                    "message_invalid_format": "{profile}, неверный формат сообщения.",
                    "message_game_end": "{profile}, игра уже завершена. Число угадано, а может и нет.",
                    "message_comment_edited": "{profile}, отредактированные комментарии не учитываются. Напишите новый.",
                    "message_requirement_violated": "{profile}, Вы не выполнили следующее условие для участия: {fail_conditions}.",
                    "message_has_attempts": "у Вас осталось попыток: {count_attempts}",
                    "message_attempts_out": "у Вас закончились попытки",
                    "message_attempts_can_be_bought": "у Вас закончились попытки, но Вы можете купить еще {count_can_pay_attempts) попыток",
                    "message_attempts_can_be_extended": "Дополнительные попытки будут начислены через {next_attempts_periodic} в количестве: {count_attempts_periodic}шт.",
                    "message_attempts_can_be_added": "Вы можете получить дополнительные попытки за {action_for_attempts}.",
                    "message_not_available_attempts": "у Вас закончились все попытки. Игра для Вас завершена.",
                    "message_private_profile": "{profile}, не удалось проверить наличие репоста Проверьте настройки приватности.",
                    "message_bought_max_attempts": "{profile}, Вы уже купили все доступные платные попытки. Больше купить нельзя.",
                    "message_wants_too_many_attempts": "{profile}, Вы пытаетесь купить слишком много попыток. Доступно для покупки: {count_can_pay_attempts).",
                    "message_not_enough_money": "{profile}, не хватает ресурсов для покупки.",
                    "message_successful_buy": "{profile}, успешная покупка! Доступно попыток {count_attempts}. Продолжайте битву!",
                    "repost_desc": "репост этого поста",
                    "join_group_desc": "вступление в нашу группу",
                    "join_partner_group_desc": "вступление в партнёрскую группу {external}",
                    "enable_notifications_desc": "разрешение получать сообщения от нашего сообщества"
                },
                "prizes": [],
                "prizes_front": [
                    {
                    id: 1,
                    prize_count: 1,
                    prizes: [{type: 'own_prize'}]
                }
                ],
                'auth_data': null,
                'image': null,
                'min_number': '',
                "max_number": '',
                "guessed_number": '',
                "message_number_greater": "Greather",
                "message_number_less": "Less",
                'post_text':
                    "У нас конкурс 🎁\n" +
                    "Мы загадали число от {min} до {max}. Угадавший получит приз.\n" +
                    "Правила конкурса: вам нужно угадать число, которое мы загадали. Для этого в комментариях под этим постом напишите ваш вариант. Например, !15.\n" +
                    "Наш бот в ответном сообщении сообщит вам угадали вы или нет.\n" +
                    "Каждый участник имеет 3 попытки с минимальным интервалом в 1 минуту.\n" +
                    "Чтобы участвовать вступите в нашу группу и сделайте репост этой записи.\n" +
                    "Проверить бота на честность: {ссылка}",

                required_join_group_abc: '',
                required_repost_abc: '',
                required_enable_notifications_abc: '',
                required_join_partner_group_abc: '',
                show_attempts_extended: null,
                switchPaidAttempts: false,
                delayedLaunch: false,
            },
            def_settings: null,
        }),
        created:
            function () {

            },
        mounted:
            async function () {
                await this.load_def_settings ()
                await this.load_def_settings_guess_number()
                this.apply_def_settings()
            },
        methods: {
            apply_def_settings: function () {
                console.log('apply_def_settings')
                if (this.gameData.game.required_join_group === false && this.gameData.game.join_group_count_attempts === 0)
                    this.gameData.required_join_group_abc = 'a'
                if (this.gameData.game.required_join_group === true)
                    this.gameData.required_join_group_abc = 'b'
                if (this.gameData.game.required_join_group === false && this.gameData.game.join_group_count_attempts > 0)
                    this.gameData.required_join_group_abc = 'c'

                if (this.gameData.game.required_enable_notifications === false && this.gameData.game.enable_notifications_count_attempts === 0)
                    this.gameData.required_enable_notifications_abc = 'a'
                if (this.gameData.game.required_enable_notifications === true)
                    this.gameData.required_enable_notifications_abc = 'b'
                if (this.gameData.game.required_enable_notifications === false && this.gameData.game.enable_notifications_count_attempts > 0)
                    this.gameData.required_enable_notifications_abc = 'c'

                if (this.gameData.game.required_repost === false && this.gameData.game.repost_count_attempts === 0)
                    this.gameData.required_repost_abc = 'a'
                if (this.gameData.game.required_repost === true)
                    this.gameData.required_repost_abc = 'b'
                if (this.gameData.game.required_repost === false && this.gameData.game.repost_count_attempts > 0)
                    this.gameData.required_repost_abc = 'c'

                if (this.gameData.game.required_join_partner_group === false && this.gameData.game.repost_count_attempts === 0)
                    this.gameData.required_join_partner_group_abc = 'a'
                if (this.gameData.game.required_join_partner_group === true)
                    this.gameData.required_join_partner_group_abc = 'b'
                if (this.gameData.game.required_join_partner_group === false && this.gameData.game.repost_count_attempts > 0)
                    this.gameData.required_join_partner_group_abc = 'c'

                if (this.gameData.game.join_partner_group_count_attempts !== 0)
                    this.gameData.show_attempts_extended = true
            },
            load_def_settings: async function () {
                console.log('load_def_settings')
                let response = await fetch("https://pedestal-test2.aiva-studio.ru/app/wallgames/default_settings/1")
                if (response.ok) {
                    this.gameData.game = await response.json()
                    console.log('all ok')
                }
                else {
                    console.log("Ошибка HTTP: " + response.status)
                }
            },
            load_def_settings_guess_number: async function () {
                let response = await fetch("https://pedestal-test2.aiva-studio.ru/app/wallgames/guess_number/default_settings")
                if (response.ok) {
                    this.def_settings1 = await response.json()
                    console.log('all ok')
                }
                else {
                    console.log("Ошибка HTTP: " + response.status)
                }
            }
        },
    }
</script>

<style scoped>

</style>
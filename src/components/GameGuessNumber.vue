<template>
    <div>
        <ChoicePrize></ChoicePrize>
        <MakeNumber></MakeNumber>
        <Rules v-model="gameData"></Rules>
        <PostSettings></PostSettings>
        <ImagePost></ImagePost>
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
            ChoicePrize, MakeNumber, Rules, PostSettings, ImagePost, AdvancedSettings, TimePost
        },
        data: () => ({
            gameData: {
                free_attempts_count: '',
                paid_attempts_count: '',
                paid_attempt_price: 0,
                required_join_group_abc: '',
                attempts_pay_price: '',
                required_repost_abc: '',
                repost_count_attempts: '',
                join_group_count_attempts: '',
                required_enable_notifications_abc: '',
                required_join_partner_group_abc: '',
                join_partner_group_count_attempts: '',
                enable_notifications_count_attempts: '',
                partner_group_id: '',
                attempts_extended_max_count: '',
                attempts_interval: '',
                attempts_extended: '',
                attempts_extended_count: '',
                attempts_extended_frequency_minutes: '',
                switchPaidAttempts: false,
                delayedLaunch: false,
                gameWallet: 'b',
            },
            def_settings: {
            "free_attempts_count": 31,
            "paid_attempts_count": 0,
            "required_join_group": true,
            "required_enable_notifications": false,
            "required_repost": false,
            "required_join_partner_group": false,
            "join_group_count_attempts": 0,
            "enable_notifications_count_attempts": 0,
            "repost_count_attempts": 2,
            "join_partner_group_count_attempts": 11,
            "attempts_interval": 60,
            "attempts_extended_count": 6,
            "attempts_extended_frequency_minutes": 7,
            "attempts_extended_max_count": 8,
            "disable_comments_after_end": true,
            "win_per_participant_limit": 1,
            "message_win": "{profile}, поздравляем, Вы выиграли! {текст приза} {начисление_на_баланс} {начисление рейтинга} {API}.",
            "message_win_balance": "На баланс зачислено {count_win_balance) {balance_name}.",
            "message_win_rating": "На рейтинг зачислено {count_win_rating} {rating_name}",
            "message_win_API": "",
            "message_win_API_fail": "",
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
            "message_bought_max_attempts": "{profile}, Вы уже купили все доступные платные попытки. Больше купить нельзя.",
            "message_wants_too_many_attempts": "{profile}, Вы пытаетесь купить слишком много попыток. Доступно для покупки: {count_can_pay_attempts).",
            "message_not_enough_money": "{profile}, не хватает ресурсов для покупки. ",
            "message_successful_buy": "{profile}, успешная покупка! Доступно попыток {count_attempts}. Продолжайте битву!",
            "repost_desc": "репост этого поста",
            "join_group_desc": "вступление в нашу группу",
            "join_partner_group_desc": "вступление в партнёрскую группу {external}",
            "enable_notifications_desc": "разрешение получать сообщения от нашего сообщества"
        },
        }),
        created:
            function () {
            console.log(' 1 зашли')
                this.apply_def_settings ()
            },
        methods: {

            apply_def_settings: function () {
                console.log(' 2 зашли')
                this.gameData = {...this.gameData, ...this.def_settings}

                if (this.gameData.required_join_group === false && this.gameData.join_group_count_attempts === 0)
                    this.gameData.required_join_group_abc = 'a'
                if (this.gameData.required_join_group === true)
                    this.gameData.required_join_group_abc = 'b'
                if (this.gameData.required_join_group === false && this.gameData.join_group_count_attempts > 0)
                    this.gameData.required_join_group_abc = 'c'

                if (this.gameData.required_enable_notifications === false && this.gameData.enable_notifications_count_attempts === 0)
                    this.gameData.required_enable_notifications_abc = 'a'
                if (this.gameData.required_enable_notifications === true)
                    this.gameData.required_enable_notifications_abc = 'b'
                if (this.gameData.required_enable_notifications === false && this.gameData.enable_notifications_count_attempts > 0)
                    this.gameData.required_enable_notifications_abc = 'c'

                if (this.gameData.required_enable_notifications === false && this.gameData.repost_count_attempts === 0)
                    this.gameData.required_repost_abc = 'a'
                if (this.gameData.required_enable_notifications === true)
                    this.gameData.required_repost_abc = 'b'
                if (this.gameData.required_enable_notifications === false && this.gameData.repost_count_attempts > 0)
                    this.gameData.required_repost_abc = 'c'

                if (this.gameData.required_join_partner_group === false && this.gameData.repost_count_attempts === 0)
                    this.gameData.required_join_partner_group_abc = 'a'
                if (this.gameData.required_join_partner_group === true)
                    this.gameData.required_join_partner_group_abc = 'b'
                if (this.gameData.required_join_partner_group === false && this.gameData.repost_count_attempts > 0)
                    this.gameData.required_join_partner_group_abc = 'c'

                if (this.gameData.attempts_extended_count !== 0)
                    this.gameData.attempts_extended = true
            }
        }
    }
</script>

<style scoped>

</style>
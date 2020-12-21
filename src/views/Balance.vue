<template>
    <!--    <form method="POST" :action='action' >-->
    <form method="POST" :action='action' target="_blank">
        <div v-if="show_alert_iphone_pay">
            <v-alert
                    class="mt-3"
                    text
                    prominent
                    type="primary"
                    icon="mdi-progress-alert"
            >
                <v-row align="center">
                    <v-col class="">
                        С iPhone пополнение баланса доступно только через VK Pay. Вы можете пополнить баланс картой / ЮMoney / QIWI с компьютерной версии сайта Вконтакте.
                    </v-col>
                    <!--                    <v-col class="shrink">-->
                    <!--                        <v-btn @click="VKWebAppAllowMessagesFromGroup" small color="primary">Разрешить уведомления</v-btn>-->
                    <!--                    </v-col>-->
                </v-row>
            </v-alert>
        </div>
        <div v-if="yandex_money || bank_card">
            <input type="hidden" name="receiver" value="41001709308745">
            <input type="hidden" name="formcomment" value="Пополнение баланса">
            <input type="hidden" name="short-dest" value="Пополнение баланса">
            <input type="hidden" name="quickpay-form" value="shop">
            <input type="hidden" name="need-fio" value="false">
            <input type="hidden" name="need-email" value="false">
            <input type="hidden" name="need-phone" value="false">
            <input type="hidden" name="need-address" value="false">
            <input type="hidden" name="successURL" :value="url_current_app_group">
            <input type="hidden" name="sum" :value="amount">
            <input type="hidden" name="label" :value="payer_identifier">
            <input type="hidden" name="targets" value="Пополнение баланса">
            <input type="hidden" name="paymentType" :value="type_pay">
        </div>
        <div v-if="qiwi">
            <input v-for="(value, name) in settings.auth_data" :key="name" type="hidden" :name="name" :value="value">
            <input type="hidden" name="sum" :value="amount">
        </div>
        <v-col align="left" v-if="$vuetify.breakpoint.name === 'xs'">
            <span><b>Баланс: </b>{{balance}}₽</span>
        </v-col>
        <v-col align="left">
            <span><b>Способ пополнения:</b></span>
        </v-col>
        <v-row justify="space-around" v-if="settings.auth_data.vk_platform !== 'mobile_iphone'">
            <div class="balance" :class="{selected : bank_card}" @click="select('bank_card')">
                <v-img
                        class="ma-1"
                        src="/static/longtime/icons/pay/visa_master_mir.png"></v-img>
            </div>
            <div class="balance" :class="{selected : yandex_money}" @click="select('yandex_money')">
                <v-img
                        class="ma-1"
                        src="/static/longtime/icons/pay/yandex_money.png"></v-img>
            </div>
            <div class="balance" :class="{selected : qiwi, mobile : mobile}" @click="select('qiwi')">
                <v-img
                        class="ma-1"
                        src="/static/longtime/icons/pay/qiwi_wallet.png"></v-img>
            </div>
            <div class="balance" :class="{selected : vk_pay, mobile : mobile}" @click="select('vk_pay')">
                <v-img
                        class="mt-1"
                        src="/static/longtime/icons/pay/vkpay.png"></v-img>
            </div>
        </v-row>
        <v-row justify="space-around" v-else>
            <div class="balance" :class="{selected : vk_pay, mobile : mobile}" @click="select('vk_pay')">
                <v-img
                        class="mt-1"
                        src="/static/longtime/icons/pay/vkpay.png"></v-img>
            </div>
        </v-row>
        <v-col align="left" class="pb-0">
            <span><b>Сумма пополнения:</b></span>
        </v-col>
        <v-row justify="center" class="">
            <v-col :cols="$vuetify.breakpoint.name === ('sm' || 'xs') ? 4 : 12">
                <v-text-field
                        label="Введите сумму"
                        dense
                        outlined
                        type="number"
                        required
                        min="1"
                        max="99999"
                        v-model.number="amount"
                        validate-on-blur
                        :rules="[rules.type_number, rules.zero, rules.zero_zero, rules.max_count_win]"
                        inputmode="tel"
                >
                    <template v-slot:append>
                        <v-btn v-show="vk_pay" small color="primary" class="mtn2px" @click="replenish">Пополнить</v-btn>

                        <v-btn v-show="yandex_money || bank_card" small color="primary" class="mtn2px" type="submit">
                            Пополнить
                        </v-btn>
                        <v-btn v-show="qiwi" small color="primary" class="mtn2px" type="submit">Пополнить</v-btn>
                    </template>
                </v-text-field>
            </v-col>
        </v-row>
        <hr id="line_vk">
        <v-col align="left" class="pb-0">
            <span><b>Жетонов на балансе группы: </b>{{games_available_launches}}</span><br>
            <span>Жетон дает возможность запустить бесплатно одну игру. Жетоны могут быть начислены в ходе акции.</span>
        </v-col>
    </form>
</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import auto_resize from "@/mixins/auto_resize";

    export default {
        props: ['games_available_launches', 'balance', 'settings', 'auth_data_url'],
        mixins: [auto_resize],
        data: () => ({
            bank_card: false,
            yandex_money: false,
            qiwi: false,
            vk_pay: true,
            amount: 100,
            vk_ts: Math.floor(new Date() / 1000),
            rules: {
                // required: v => !!v || 'Недопустимый формат',
                zero: v => (v !== '0') || 'Недопустимый формат',
                zero_zero: v => (v > 0) || 'Недопустимый формат',
                max_length_200: v => (v && v.length <= 200) || 'Максимально допустимо 200 символов',
                max_length_7: v => (v && v.length <= 7) || 'Максимально допустимо 7 символов',
                max_count_win: v => (v && v <= 99999) || 'Максимальная сумма 99999',
                type_number: v => (/^[0-9]{1,60}$/.test(v)) || 'Недопустимый формат',
                range: v => (/^[0-9]{1,6}$/.test(v) || /^[0-9]{1,6}[-]{1}[0-9]{1,6}$/.test(v)) || 'Недопустимый формат'
            },
        }),
        mounted() {
            // this.getAllUrlParams()
            setInterval(this.get_balance, 10000)

        },
        computed: {
            mobile: function () {
                return this.$vuetify.breakpoint.name !== ('xs') ? false : true
            },
            show_alert_iphone_pay: function () {
                if (this.settings.auth_data.vk_platform === 'mobile_iphone') {
                    return true
                } else {
                    return false
                }
            },

            action: function () {
                if (this.yandex_money || this.bank_card) {
                    return "https://money.yandex.ru/quickpay/confirm.xml"
                } else if (this.qiwi) {
                    return "https://pedestal.aiva-studio.ru/cross_api/paymentAppFromQiwi.php"
                } else return ''
            },
            type_pay: function () {
                if (this.yandex_money) {
                    return 'PC'
                } else if (this.bank_card) {
                    return 'AC'
                } else if (this.qiwi) {
                    return 'QIWI'
                } else {
                    return ''
                }
            },
            payer_identifier: function () {
                return window.btoa("1," + this.settings.auth_data.vk_group_id + ',' + this.settings.auth_data.vk_user_id)
            },
            url_current_app: function () {
                return 'https://vk.com/app' + this.settings.auth_data.vk_app_id + '_' + this.settings.auth_data.vk_group_id
            },
        },
        methods: {
            get_balance: function () {
                this.$emit('load_balance')
            },
            select: function (payment_type) {
                if (payment_type === 'bank_card') {
                    this.bank_card = true
                    this.yandex_money = false
                    this.qiwi = false
                    this.vk_pay = false
                } else if (payment_type === 'yandex_money') {
                    this.bank_card = false
                    this.yandex_money = true
                    this.qiwi = false
                    this.vk_pay = false
                } else if (payment_type === 'qiwi') {
                    this.bank_card = false
                    this.yandex_money = false
                    this.qiwi = true
                    this.vk_pay = false
                } else if (payment_type === 'vk_pay') {
                    this.bank_card = false
                    this.yandex_money = false
                    this.qiwi = false
                    this.vk_pay = true
                }
            },
            replenish: async function () {
                if (this.amount > 99999 || this.amount === 0) {
                    return
                }
                let response = await bridge.send("VKWebAppOpenPayForm", {
                    "app_id": +this.settings.auth_data.vk_app_id, "action": "pay-to-group", "params": {
                        "amount": +this.amount,
                        "group_id": 187978241, "description": "Пополнение баланса"
                    }
                })
                console.log(response)
            },
        }
    }
</script>

<style>
    .balance {
        width: 150px;
        height: 65px;
        border-color: #d3d9de;
        border-width: 1px;
        border-style: solid;
        border-radius: 3px;
        cursor: pointer;
    }

    .selected {
        border-color: #4a76a8;
    }

    .mtn2px {
        margin-top: -2px !important;
    }

    #line_vk {
        color: #e7e8ec;
        background-color: #e7e8ec;
        border: none;
        height: 1px;
    }

    .mobile {
        margin-top: 10px;
    }

</style>
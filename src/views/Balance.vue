<template>
    <v-form>
        <input type="hidden" name="receiver" value="41001709308745">
        <input type="hidden" name="formcomment" value="Пополнение баланса">
        <input type="hidden" name="short-dest" value="Пополнение баланса">
        <input type="hidden" name="quickpay-form" value="shop">
        <input type="hidden" name="need-fio" value="false">
        <input type="hidden" name="need-email" value="false">
        <input type="hidden" name="need-phone" value="false">
        <input type="hidden" name="need-address" value="false">
        <input type="hidden" name="successURL" value="">

        <input type="hidden" name="label" value="">
        <input type="hidden" name="targets" value="Пополнение баланса">


        <v-col align="center">
            <p>Пополнение баланса</p>
        </v-col>


        <v-row justify="space-around">

            <div class="balance" :class="{selected : bank_card}" @click="select('bank_card')">
                <v-img
                        class="ma-1"
                        src="https://pedestal.aiva-studio.ru/static/longtime/icons/visa_master_mir.png"></v-img>
            </div>
            <div class="balance" :class="{selected : yandex_money}" @click="select('yandex_money')">
                <v-img
                        class="ma-1"
                        src="https://pedestal.aiva-studio.ru/static/longtime/icons/yandex_money.png"></v-img>
            </div>
            <div class="balance" :class="{selected : qiwi}" @click="select('qiwi')">
                <v-img
                        class="ma-1"
                        src="https://pedestal.aiva-studio.ru/static/longtime/icons/qiwi_wallet.png"></v-img>
            </div>
            <div class="balance" :class="{selected : vk_pay}" @click="select('vk_pay')">
                <v-img class="mt-1" src="https://pedestal.aiva-studio.ru/static/longtime/icons/vkpay.png"></v-img>
            </div>
        </v-row>


        <v-row justify="center" class="mt-2">
            <v-col cols="4">
                <v-text-field
                        label="Сумма"
                        dense
                        outlined
                        type="number"
                        min="1"
                        v-model="amount"
                >
                    <template v-slot:append>
                        <v-btn small color="primary" class="mtn2px" @click="replenish">Пополнить</v-btn>
                    </template>
                </v-text-field>
            </v-col>
        </v-row>


    </v-form>
</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        data: () => ({
            ex7: 'bank_card',
            bank_card: true,
            yandex_money: false,
            qiwi: false,
            vk_pay: false,
            amount: 100,
            settings: {
                auth_data: ''
            },
        }),
        mounted() {
            this.getAllUrlParams()
        },
        methods: {
            select:  function (payment_type) {
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
                let response = await bridge.send("VKWebAppOpenPayForm", {
                    "app_id": +this.settings.auth_data.vk_app_id, "action": "pay-to-group", "params": {
                        "amount": this.amount,
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
        border-color: red;
    }

    .mtn2px {
        margin-top: -2px !important;
    }


</style>
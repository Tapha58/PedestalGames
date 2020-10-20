<template>
    <div class="px-3">
<!--        <v-btn @click="VKWebAppGetCommunityToken">VKWebAppGetCommunityToken</v-btn>-->
<!--        <v-btn @click="VKWebAppOpenApp">VKWebAppOpenApp</v-btn>-->
        <v-row dense>
            <v-col cols="2" >
                <v-btn @click="button_back" color="rgba(0, 0, 0, .6)" text dark small>
                    <v-icon class="pr-1" small>mdi-arrow-left-thick</v-icon>
                    Назад
                </v-btn>
            </v-col>
            <v-col cols="10" v-if="no_money">
                <span id="no_money">Внимание! У Вас недостаточно средств для запуска данной игры.</span>
            </v-col>
        </v-row>
        <v-row id="prizeCreator" dense>
            <v-col cols="12" class="pt-0">
                <v-alert
                        height="40"
                        :color='color_alert'
                        dense
                        >
                    <v-row>
                        <v-col class="py-0">
                            1. Сформируйте приз
                            <v-tooltip bottom max-width="280" color="rgba(48, 44, 44, 0.99)">
                                <template v-slot:activator="{ on }">
                                    <v-icon v-on="on" size="20">mdi-help-circle-outline</v-icon>
                                </template>
                                <span>Победитель может получить комбинацию призов. Свой приз - это текст, отправляемый победителю,
                            например "Ваш приз: скидка 10% на заказ". Числа в поле "кол-во баллов" могут быть диапазоном,
                            запись через дефис, например "10-20". По умолчанию победителю будет отправлен комментарий:
                            "Поздравляем, Вы выиграли!" + сообщение из поля "свой текст" + автоматически генерируемые
                            сообщения из полей начисления баланса / рейтинга. Все ответы бота можно редактировать.</span>
                            </v-tooltip>
                        </v-col>
                        <v-col align="right" class="py-0">
                            <a href="https://vk.com/@pedestal-wallgames?anchor=nastroyka-priza-2" target="_blank">Подробнее</a>
                        </v-col>
                    </v-row>
                </v-alert>
                <PrizeCreator
                        class="mt-n2"
                        ref="prizeCreatorComponent"
                        v-for="(prize, index) in prizes_front"
                        :key="prize.id"
                        :is_single_winner="is_single_winner"
                        :is_last_card="index+1 === prizes_front.length"
                        :is_one_card="1 === prizes_front.length"
                        :id="prize.id"
                        :show_edit="show_edit"
                        :number_gift="index+1"
                        v-model="prizes_front[index]"
                        @add_prize_creator="add_prize_card"
                        @delete_prize_creator="delete_prize"
                        @auto_resize="auto_resize"
                ></PrizeCreator>
            </v-col>

        </v-row>
        <slot name="settings"></slot>
        <div id="rules">
            <v-alert
                    :color='color_alert'
                    dense
            >
<!--                3. Задайте правила игры-->
<!--                <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">-->
<!--                    <template v-slot:activator="{ on }">-->
<!--                        <v-icon size="20" v-on="on">mdi-help-circle-outline</v-icon>-->
<!--                    </template>-->
<!--                    <span>-->
<!--                        Продумайте игровую механику, чтобы игра не завершилась слишком быстро и у пользователей был-->
<!--                        интерес следить за ней. Используйте ограниченные периодические бесплатные попытки и платные-->
<!--                        попытки за баллы магазина / рейтинга.-->
<!--                    </span>-->
<!--                </v-tooltip>-->

                <v-row>
                    <v-col class="py-0">
                        3. Задайте правила игры
                        <v-tooltip bottom max-width="280" color="rgba(48, 44, 44, 0.99)">
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on" size="20">mdi-help-circle-outline</v-icon>
                            </template>
                            <span>Продумайте игровую механику, чтобы игра не завершилась слишком быстро и у пользователей был
                        интерес следить за ней. Используйте ограниченные периодические бесплатные попытки и платные
                        попытки за баллы магазина / рейтинга.</span>
                        </v-tooltip>
                    </v-col>
                    <v-col align="right" class="py-0">
                        <a href="https://vk.com/@pedestal-wallgames?anchor=pravila-igry-uslovia-i-popytki-2" target="_blank">Подробнее</a>
                    </v-col>
                </v-row>

            </v-alert>
            <v-row class="pt-2 mb-n3">
                <v-col class="py-0" cols="12" sm="9">
                    <v-select
                            :items="options"
                            dense
                            label="Подписка на группу"
                            outlined
                            v-model="required_join_group_abc"
                            xs="12"
                    ></v-select>
                </v-col>

                <v-col class="py-0" cols="12" sm="3"
                       v-show="!(required_join_group_abc === 'a' || required_join_group_abc === 'b' || required_join_group_abc === '')">
                    <v-text-field
                            :rules="rules_join_group_count_attempts"
                            dense
                            label="Кол-во попыток"
                            md="6"
                            min="1"
                            outlined
                            required
                            validate-on-blur
                            type="number"
                            v-model.number="common_settings.join_group_count_attempts"
                            xs="6"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row class="mb-n3">
                <v-col cols="12" sm="9">
                    <v-select
                            :items="options_repost"
                            dense
                            label="Репост"
                            outlined
                            v-model="required_repost_abc"
                    ></v-select>
                </v-col>

                <!--                    <v-col cols="12" sm="3">-->
                <!--                        <v-text-field-->
                <!--                                :rules="[rules.required, rules.number_of_symbols_4]"-->
                <!--                                dense-->
                <!--                                label="Кол-во попыток"-->
                <!--                                min="1"-->
                <!--                                outlined-->
                <!--                                required-->
                <!--                                type="number"-->
                <!--                                v-model.number="gameData.game.repost_count_attempts"-->
                <!--                                v-show="required_repost_abc === 'c'"-->
                <!--                        ></v-text-field>-->
                <!--                    </v-col>-->
            </v-row>
            <v-row>
                <v-col class="py-0" cols="12" sm="9">
                    <v-select
                            :items="options"
                            dense
                            label="Подписка на сообщения группы"
                            outlined
                            v-model="required_enable_notifications_abc"
                            xs="12"
                    ></v-select>
                </v-col>
                <v-col class="py-0" cols="12" sm="3" v-show="(required_enable_notifications_abc === 'c')">
                    <v-text-field
                            :rules="rules_enable_notifications_count_attempts"
                            dense
                            label="Кол-во попыток"
                            md="6"
                            min="1"
                            validate-on-blur
                            outlined
                            required
                            type="number"
                            v-model.number="common_settings.enable_notifications_count_attempts"
                            xs="6"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="py-0" cols="12" sm="5">
                    <v-select
                            :items="options"
                            dense
                            label="Подписка на партнерскую группу"
                            outlined
                            v-model="required_join_partner_group_abc"
                            xs="12"
                    ></v-select>
                </v-col>
                <v-col class="py-0" cols="12" sm="4"
                       v-show="(required_join_partner_group_abc === 'b' || required_join_partner_group_abc === 'c')">
                    <v-text-field
                            :rules="url_rules"
                            dense
                            label="URL на партнерскую группу"
                            outlined
                            required
                            v-model="partner_group_url"
                    ></v-text-field>
                </v-col>
                <v-col class="py-0" cols="12" sm="3" v-show="required_join_partner_group_abc === 'c'">
                    <v-text-field
                            :rules="rules_join_partner_group_count_attempts"
                            dense
                            label="Кол-во попыток"
                            validate-on-blur
                            min="1"
                            outlined
                            required
                            type="number"
                            v-model.number="common_settings.join_partner_group_count_attempts"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="py-0" cols="12" sm="5">
                    <v-text-field
                            :rules="[rules.required, rules.only_number, rules.number_of_symbols_4]"
                            dense
                            label="Кол-во бесплатных попыток"
                            validate-on-blur
                            min="1"
                            outlined
                            required
                            type="number"
                            v-model.number="common_settings.free_attempts_count"
                    ></v-text-field>
                </v-col>
                <v-col class="py-0" cols="12" sm="4" v-bind:class="{ 'pt-0': this.mobile }">
                    <v-text-field
                            :rules="[rules.required, rules.only_number, rules.number_of_symbols_7]"
                            dense
                            label="Время между попытками"
                            min="1"
                            outlined
                            required
                            suffix="секунд"
                            type="number"
                            v-model.number="common_settings.attempts_interval"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row class="pl-3 mt-n4">
                <v-switch
                        :ripple="false"
                        color="primary"
                        hide-details
                        label="Дополнительные попытки"
                        v-model="show_attempts_extended"
                >
                    <template v-slot:append>
                        <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                            <template v-slot:activator="{ on }">
                                <v-icon class="ml-n1 mt3px" size="20" v-on="on">mdi-help-circle-outline</v-icon>
                            </template>
                            <span>Когда у пользователя закончатся попытки, Вы можете начислять ему дополнительные попытки через определенные промежутки времени, также можно ограничить максимальное кол-во дополнительных попыток.</span>
                        </v-tooltip>
                    </template>
                </v-switch>
            </v-row>
            <v-row class="mt-4 mb-1">
                <v-col class="py-0" cols="12" sm="4" v-show="show_attempts_extended">
                    <v-text-field
                            :rules="rules_attempts_extended_frequency_minutes"
                            dense
                            id="area1"
                            md="6"
                            min="1"
                            outlined
                            prefix="каждые"
                            validate-on-blur
                            required
                            suffix="минут"
                            type="number"
                            v-model.number="common_settings.attempts_extended_frequency_minutes"
                            xs="6"
                    ></v-text-field>
                </v-col>
                <v-col class="py-0" cols="12" sm="4" v-show="show_attempts_extended">
                    <v-text-field
                            :rules="rules_attempts_extended_count"
                            dense
                            id="area2"
                            md="6"
                            min="1"
                            outlined
                            prefix="начислять"
                            required
                            suffix="попыток"
                            type="number"
                            validate-on-blur
                            v-model.number="common_settings.attempts_extended_count"
                            xs="6"
                    ></v-text-field>
                </v-col>
                <v-col class="py-0" cols="12" sm="4" v-show="show_attempts_extended">
                    <v-text-field
                            :rules="rules_attempts_extended_max_count"
                            dense
                            id="area3"
                            md="6"
                            min="1"
                            outlined
                            prefix="но не более"
                            required
                            validate-on-blur
                            type="number"
                            v-model.number="common_settings.attempts_extended_max_count"
                            xs="6"
                    >
                        <template v-slot:append>
                            <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                                <template v-slot:activator="{ on }">
                                    <v-icon class="mt3px" size="20" v-on="on">mdi-help-circle-outline</v-icon>
                                </template>
                                <span>"Но не более 5" означает, что когда пользователь получит 5 дополнительных периодических попыток (например, 5 раз по 1 попытке), то больше не будет получать периодические попытки.</span>
                            </v-tooltip>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row class="pl-3">
                <v-switch
                        :label="($vuetify.breakpoint.name === 'xs') ? 'Платные попытки' : 'Платные попытки (за баллы)'"
                        :ripple="false"
                        class="mt-n3"
                        color="primary"
                        hide-details
                        v-model="switchPaidAttempts"
                >
                    <template v-slot:append>
                        <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                            <template v-slot:activator="{ on }">
                                <v-icon class="ml-n1 mt3px" size="20" v-on="on">mdi-help-circle-outline</v-icon>
                            </template>
                            <span>Для покупки попытки пользователю нужно будет написать в комментариях "/купить попытку X" (без кавычек), где X - число покупаемых попыток. Если X не задан, то покупается одна попытка. Пример: "/купить попытку", "/купить попытку 1", "/купить попытку 5"</span>
                        </v-tooltip>
                    </template>
                </v-switch>
            </v-row>
            <v-row class="mt-4" v-show="switchPaidAttempts">
                <v-col class="py-0" cols="12" sm="4">
                    <v-select
                            :items="items_balance_type"
                            :rules="rules_balance_type"
                            dense
                            label="Кошелек"
                            outlined
                            v-model="common_settings.balance_type"
                    ></v-select>
                </v-col>
                <v-col class="py-0" cols="12" sm="4">
                    <v-text-field
                            :rules="rules_paid_attempts_count"
                            dense
                            label="Кол-во платных попыток"
                            min="1"
                            outlined
                            required
                            validate-on-blur
                            type="number"
                            v-model.number="common_settings.paid_attempts_count"
                    >
                        <template v-slot:append>
                            <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                                <template v-slot:activator="{ on }">
                                    <v-icon class="mt3px" size="20" v-on="on">mdi-help-circle-outline</v-icon>
                                </template>
                                <span>Укажите, сколько максимум дополнительных попыток за баллы сможет купить каждый участник.</span>
                            </v-tooltip>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col class="py-0" cols="12" sm="4">
                    <v-text-field
                            :rules="rules_paid_attempt_price"
                            dense
                            label="Цена платной попытки"
                            min="1"
                            outlined
                            validate-on-blur
                            required
                            type="number"
                            v-model.number="common_settings.paid_attempt_price"
                    >
                        <template v-slot:append>
                            <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                                <template v-slot:activator="{ on }">
                                    <v-icon class="mt3px" size="20" v-on="on">mdi-help-circle-outline</v-icon>
                                </template>
                                <span>Цена одной попытки (сколько баллов будет списано при покупке попытки).</span>
                            </v-tooltip>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
        </div>
        <div id="post_settings" v-if='!/^[0-9]+$/.test($route.params.id)'>
            <v-col class="px-0">
                <v-alert
                        :color='color_alert'
                        dense
                >4. Содержание поста
                    <v-tooltip bottom max-width="280" color="rgba(48, 44, 44, 0.99)">
                        <template v-slot:activator="{ on }">
                            <v-icon v-on="on" size="20">mdi-help-circle-outline</v-icon>
                        </template>
                        <span>
                            Отредактируйте наш шаблон поста под Вашу игровую механику, а также можете загрузить свою картинку.
                            После нажатия на "Запустить игру" пост будет опубликован в группе (сразу или в виде отложенного
                            поста, если функция задана).
                        </span>
                    </v-tooltip>
                </v-alert>

                <v-textarea
                        id="we"
                        v-model="settings.post_text"
                        solo
                        background-color="blue lighten-5"
                        ref="post_text"
                        label="Напишите текст поста, который появится в Вашей группе при публикации игры."
                        auto-grow
                        class="relative dense-textarea mb-0"
                        :hint="hint_text"
                        persistent-hint="true"
                >
                    <template v-if="!mobile" v-slot:append>
                        <emoji-picker @emoji="append"   >
                            <div
                                    @click.stop="clickEvent"
                                    class="emoji-invoker"
                                    slot="emoji-invoker"
                                    slot-scope="{ events: { click: clickEvent } }"
                            >
                                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                                </svg>
                            </div>
                            <div slot="emoji-picker" slot-scope="{ emojis, insert,  }">
                                <!--                                <div :style="{ top: 1 + 'px', left: 400 + 'px' }" class="emoji-picker">-->
                                <div class="emoji-picker">
                                    <div class="emojis" :key="category" v-for="(emojiGroup, category) in emojis">
                                        <!--                                        <h5>{{ category }}</h5>-->

                                        <span
                                                :key="emojiName"
                                                :title="emojiName"
                                                @click="insert(emoji)"
                                                v-for="(emoji, emojiName) in emojiGroup"
                                        >{{ emoji }}</span>

                                    </div>
                                </div>
                            </div>
                        </emoji-picker>
                    </template>
                </v-textarea>
            </v-col>
        </div>
        <div id="image_post" v-if='!/^[0-9]+$/.test($route.params.id)' class="mt-n3">
            <!--            <v-row v-if='gameData.mobile' align="center" justify="center">-->
            <!--            <v-row v-if='!gameData.mobile' align="center" justify="$vuetify.breakpoint.name === 'xs' ? 'center' : 'start'" dense>-->
            <!--                <v-img max-width="250"  height="auto" :src="src"></v-img>-->
            <!--            </v-row>-->
            <v-row align="center"  dense>
                <!--                <v-col align="center" justify="start" cols="12" xs="12" sm="5" class="mr-3">-->
                <v-col  :align="$vuetify.breakpoint.name === 'xs' ? 'center' : ''" :justify="$vuetify.breakpoint.name === 'xs' ? 'center' : 'start'" cols="12" xs="12" sm="5" class="mr-3">
                    <v-img id="img" max-width="300"  height="auto" :src="src"></v-img>
                </v-col>
                <v-col sm="5" cols="12" xs="12">
                    <v-file-input
                            class="pt-5"
                            dense
                            outlined
                            :rules="rules_image"
                            v-model="image"
                            @change="create"
                            accept="image/png, image/jpeg, image/gif, image/jpg"
                            prepend-icon="mdi-camera"
                            label="Своя картинка для поста"
                            id="fileItem"
                    ></v-file-input>
                </v-col>
            </v-row>
        </div>
        <v-row v-show='!show_edit' id="time_post" class="mt-5" dense>
            <v-col cols="12" xs="12" sm="4">
                <v-switch
                        :ripple="false"
                        color=""
                        hide-details
                        label="Отложенный запуск"
                        v-model="delayedLaunch"
                        class="mt-0 pt-2"
                ></v-switch>
            </v-col>
            <v-col  cols="12" xs="12" sm="5" v-show="delayedLaunch">
                <VueCtkDateTimePicker
                        id="DateTimePicker"
                        format="YYYY-MM-DD HH:mm"
                        formated="||"
                        no-label
                        label="Введите время и дату публикации"
                        no-button-now
                        color=#4872a3
                        buttonColor=#4872a3
                        no-header
                        right
                        inputSize="sm"
                        minuteInterval="5"
                        :minDate="minDate"
                        :maxDate="maxDate"
                        v-model="timeDeferredPost"/>
            </v-col>
        </v-row>
        <div id='token' v-if="!group_token" class="mt-3">
            <v-col class="pb-0">
                <span v-bind:style="{ color: 'red' }">Для запуска игры необходимо предоставить ключ доступа. </span>
                <a href="https://vk.com/@pedestal-kluch-dostupa" target="_blank">Открыть инструкцию.</a>
            </v-col>
            <v-col cols="12">
                <v-row dense>
                    <v-text-field
                            label="Ключ доступа"
                            id="styled-input"
                            class="styled-input mb-n5"
                            outlined
                            dense
                            v-model="token_group"
                    ><template v-slot:append id="btn_token">
                        <v-btn @click="group_record_token" id="qw1" x-small color="primary">применить</v-btn>
                    </template>
                    </v-text-field>
                </v-row>
                <span v-bind:style="{ color: 'red', fontSize: 14 + 'px' }">{{ message_group_record_token }}</span>
            </v-col>
        </div>
        <div id="pay_method" v-if='!/^[0-9]+$/.test($route.params.id) && this.games_available_launches > 0 && this.payment_type !== 3'>
            <v-col class="px-0 pb-0">
                <v-alert
                        class="mb-2"
                        :color='color_alert'
                        dense
                >5. Вариант оплаты
                    <v-tooltip bottom max-width="280" color="rgba(48, 44, 44, 0.99)">
                        <template v-slot:activator="{ on }">
                            <v-icon v-on="on" size="20">mdi-help-circle-outline</v-icon>
                        </template>
                        <span>
                            Подсказка.
                        </span>
                    </v-tooltip>
                </v-alert>
            </v-col>
        </div>
        <v-col cols="12" sm="6" md="6" v-if='!/^[0-9]+$/.test($route.params.id) && this.games_available_launches > 0 && this.payment_type !== 3'>
            <v-radio-group v-model="payment_type" column class="mt-0">
                <v-radio
                        :label=label_payment_type_1
                        color="primary"
                        value="1"
                ></v-radio>
                <v-radio
                        :label=label_payment_type_2
                        color="primary"
                        value="2"
                ></v-radio>
            </v-radio-group>
        </v-col>
        <v-row>
            <v-col v-show="$vuetify.breakpoint.name !== 'xs'" align="center" sm="6" xs='12' cols="12" >
                <v-btn @click="textareas_showed = !textareas_showed" block color="primary" small>
                    {{ toggle_textareas_btn_text }}
                </v-btn>
            </v-col>
            <v-col align="center" sm="6" xs='12'>
                <v-btn
                        @click="start_game"
                        block
                        color="error"
                        small
                        :loading="loading"
                        :disabled="loading"
                >{{ name_button_2 }}
                </v-btn>
                <span v-bind:style="{ color: 'red', fontSize: 14 + 'px' }">{{ message_error }}
                    <a v-if='show_link_error_callback' v-bind:style="{ color: 'red', fontSize: 14 + 'px' }" href="https://vk.com/@pedestal-error?anchor=oshibka-2000-maximum-callback-serverov" target="_blank"> Подробнее.</a></span>
                <span v-bind:style="{ color: 'green', fontSize: 14 + 'px' }">{{ message_success }}</span>
            </v-col>

            <v-col v-show="$vuetify.breakpoint.name === 'xs'" align="center" sm="6" xs='12' cols="12" >
                <v-btn  @click="textareas_showed = !textareas_showed" block color="primary" small>
                    {{ toggle_textareas_btn_text }}
                </v-btn>
            </v-col>
            <!--                <v-col align="center" md="6" sm='12' cols="12">-->
            <div class="text-center">
                <v-dialog
                        v-model="dialog"
                        width="255"
                        persistent
                >
                    <v-card>
                        <v-card-title
                                class="headline"
                        >
                            Игра запущена
                            <v-icon color="green" class="pl-2">mdi-rocket</v-icon>
                        </v-card-title>

                        <v-card-text>
                            Будем надеяться, что сервера Вконтакте выдержат активность в вашей группе.

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="green darken-1"
                                    dark
                                    @click="go"
                            >
                                OK
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-row>
        <GameMessages
                v-if="textareas_showed"
                v-model="textarea_values"
                :textarea_blocks="advanced_settings_textareas"
                :mobile="mobile"
                :main_variables="main_variables"
                @autoresize="auto_resize_delay"
                @def_message_aply="def_message_aply"
        ></GameMessages>
    </div>
</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import GameMessages from "@/components/GameMessages";
    import PrizeCreator from "@/components/PrizeCreator";
    import EmojiPicker from "vue-emoji-picker";
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        name: "GuessNumber",
        components: {
            GameMessages, PrizeCreator, EmojiPicker
        },
        model: {
            prop: 'settings'
        },
        props: [
            'mechanics_textarea_block',
            'settings',
            'validation',
            'is_single_winner',
            'main_variables',
            'name_game',
            'game_type',
            'ending_game_textarea_block',
        ],
        data: () => ({
            current_post_text: '',
            group_status: 1,
            balance: '',
            games_available_launches: '',
            payment_type: '1',
            price: '',
            common_settings: {
                prizes: [],
                id_post_vk: '',
            },
            textareas_showed: false,
            textarea_values: {
                common: {},
                mechanics: {}
            },
            show_edit: false,
            prizes_front: [
                {
                    id: 1,
                    count: 1,
                    card_prizes: [{type: 'text'}]
                }
            ],
            id_prize_card: 1,
            color_alert: '#edeef0',
            def_settings: {
                game: {},
            },
            required_join_group_abc: '',
            required_repost_abc: '',
            required_enable_notifications_abc: '',
            required_join_partner_group_abc: '',
            loader: 'loading',
            loading: false,
            dialog: false,
            result: null,
            // mdi: 'mdi-alert-circle-outline',
            height: 90,
            name_button: 'Показать настройки ответов бота',
            text: '',
            visible: false,
            input: '',
            search: '',
            id_group: '',
            attachments_photo: '',
            token: '',
            message_error: '',
            message_success: '',
            token_group: '',
            group_token: true,
            message_group_record_token: '',
            show_link_error_callback: false,

            rules: {
                required: v => (!!v || v === 0) || 'Недопустимый формат',
                positive_number: v => v >= 0 || 'Отрицательное значение',
                only_number: v => !/[\D]/.test(v) || 'Недопустимый формат',
                number_of_symbols_7: v => /^(\d){1,7}$/g.test(v) || 'Не более 7 символов',
                number_of_symbols_4: v => /^(\d){1,4}$/g.test(v) || 'Не более 4 символов',
                number_of_symbols_3: v => /^(\d){1,3}$/g.test(v) || 'Не более 3 символов',
                number_of_symbols_5: v => /^(\d){1,5}$/g.test(v) || 'Не более 5 символов',
            },
            itemsGameOption: [
                {value: 'a', text: 'Бесплатные попытки'},
                {value: 'b', text: 'Бесплатные попытки + баланс рейтинга'},
                {value: 'c', text: 'Бесплатные попытки + баланс магазина'}
            ],
            options: [
                {value: 'a', text: 'Не требуется'},
                {value: 'b', text: 'Требуется'},
                {value: 'c', text: 'Дает доп. бесплатные попытки'}
            ],
            options_repost: [
                {value: 'a', text: 'Не требуется'},
                {value: 'b', text: 'Требуется'},
            ],
            options1: [
                {value: 'a', text: 'Не выдаются'},
                {value: 'b', text: 'Выдаются бесплатные'},
            ],
            items_balance_type: [
                {value: 1, text: 'Баллы рейтинга'},
                {value: 2, text: 'Баланс магазина'},
            ],
            payment_type_items: [
                {value: 1, text: 'Оплата балансом'},
                {value: 2, text: 'Оплата жетоном (бесплатный запуск)'},

            ],
            date: new Date().toISOString().substr(0, 10),
            time: null,
            delayedLaunch: false,
            condition: 'выключен',
            onOff: false,
            color: 'error',
            timeDeferredPost: null,
            src: '',
            file: '',
            switchPaidAttempts: false,
            show_attempts_extended: null,
            image: null,
            partner_group_url: null,
            mobile: false,
            advanced_settings_textareas: [
                {
                    name: 'Игровая механика',
                    textarea_content: ''
                },
                {
                    name: 'Игрок выиграл',
                    textarea_content: [
                        {id: 'message_win', value: '', label: 'Игрок выигрывает и получает приз', list_of_variables_for_rules: ['profile','prize','balance_win', 'balance_name_one', 'balance_name_two', 'balance_name_five', 'rating_name_one', 'rating_name_two', 'rating_name_five', 'count_attempts']},
                        {id: 'message_win_balance', value: '', label: 'Текст при начислении баланса', list_of_variables_for_rules: ['profile','balance_win', 'balance_name_one', 'balance_name_two', 'balance_name_five']},
                        {id: 'message_win_rating', value: '', label: 'Текст при начислении рейтинга', list_of_variables_for_rules: ['profile','rating_win', 'rating_name_one', 'rating_name_two', 'rating_name_five']},
                        // {id: 'message_win_API', value: '', label: 'Текст в случае успешного API запроса', list_of_variables_for_rules: ['profile']},
                        // {id: 'message_win_API_fail', value: '', label: 'Текст если API-запрос не успешный', list_of_variables_for_rules: ['profile']},
                    ]
                },
                {
                    name: 'Общие ответы',
                    textarea_content: [
                        {id: 'message_has_attempts', value: '', label: 'Еще есть попытки', list_of_variables_for_rules: ['profile','timeout','count_attempts','remain_attempts_to_buy']},
                        {id: 'message_already_win', value: '', label: 'Уже победил в игре', list_of_variables_for_rules: ['profile']},
                        {id: 'message_attempts_timeout', value: '', label: 'Время между попытками не истекло', list_of_variables_for_rules: ['profile','timeout']},
                        {id: 'message_invalid_format', value: '', label: 'Не верный формат сообщения', list_of_variables_for_rules: ['profile']},
                        {id: 'message_game_end', value: '', label: 'Игра завершена (для всех)', list_of_variables_for_rules: ['profile']},
                        {id: 'message_not_available_attempts', value: '', label: 'Игра завершена (для игрока)', list_of_variables_for_rules: ['profile']},
                        {id: 'message_comment_edited', value: '', label: 'Пользователь отредактировал комментарий', list_of_variables_for_rules: ['profile']},
                        {id: 'message_requirement_violated', value: '', label: 'Не выполнил условие для участия', list_of_variables_for_rules: ['profile','fail_conditions','count_attempts']},
                        {id: 'message_repost_desc', value: '', label: 'Описание действия для репоста', list_of_variables_for_rules: ['profile']},
                        {id: 'message_enable_notifications_desc', value: '', label: 'Описание действия для включения уведомлений', list_of_variables_for_rules: ['profile']},
                        {id: 'message_join_group_desc', value: '', label: 'Описание действия для вступления в группу', list_of_variables_for_rules: ['profile']},
                        {id: 'message_join_partner_group_desc', value: '', label: 'Описание действия для вступления в партнёрскую группу', list_of_variables_for_rules: ['profile','external']},
                        {id: 'message_private_profile', value: '', label: 'Невозможно проверить наличие репоста (стена закрыта)', list_of_variables_for_rules: ['profile']},
                    ]
                },
                {
                    name: 'Закончились попытки',
                    textarea_content: [
                        {id: 'message_attempts_out', value: '', label: 'Закончились попытки', list_of_variables_for_rules: ['profile','remain_attempts_to_buy','next_attempts_periodic','count_attempts_periodic','action_for_attempts','more_attempts']},
                        {id: 'message_attempts_can_be_extended', value: '', label: 'Выдача попыток по таймеру', list_of_variables_for_rules: ['profile','next_attempts_periodic','count_attempts_periodic']},
                        {id: 'message_attempts_can_be_added', value: '', label: 'Выдача по действию', list_of_variables_for_rules: ['profile','action_for_attempts']},
                        {id: 'message_attempts_can_be_bought', value: '', label: 'Может купить еще', list_of_variables_for_rules: ['profile','remain_attempts_to_buy']},
                    ]
                },
                {
                    name: 'Покупка попыток',
                    textarea_content: [
                        {id: 'message_bought_max_attempts', value: '', label: 'Купил максимум попыток', list_of_variables_for_rules: ['profile','balance_name_one', 'balance_name_two', 'balance_name_five', 'rating_name_one', 'rating_name_two', 'rating_name_five', 'timeout']},
                        {id: 'message_wants_too_many_attempts', value: '', label: 'Пробует купить больше, чем можно купить (по кол-ву)', list_of_variables_for_rules: ['profile', 'balance_name_one', 'balance_name_two', 'balance_name_five', 'rating_name_one', 'rating_name_two', 'rating_name_five', 'remain_attempts_to_buy']},
                        {id: 'message_not_enough_money', value: '', label: 'Не хватает баланса для покупки', list_of_variables_for_rules: ['profile', 'balance_name_one', 'balance_name_two', 'balance_name_five', 'rating_name_one', 'rating_name_two', 'rating_name_five', 'remain_attempts_to_buy']},
                        {id: 'message_successful_buy', value: '', label: 'Успешная покупка', list_of_variables_for_rules: ['profile', 'balance_name_one', 'balance_name_two', 'balance_name_five', 'rating_name_one', 'rating_name_two', 'rating_name_five', 'timeout', 'count_attempts', 'remain_attempts_to_buy']},
                        {id: 'message_successful_buy', value: '', label: 'Успешная покупка', list_of_variables_for_rules: ['profile', 'balance_name_one', 'balance_name_two', 'balance_name_five', 'rating_name_one', 'rating_name_two', 'rating_name_five', 'timeout', 'count_attempts', 'remain_attempts_to_buy']},
                    ]
                },

            ],
            game_id: '',
            def_message: '',
        }),
        directives: {
            focus: {
                inserted(el) {
                    el.focus()
                },
            },
        },
        mounted:
            async function() {
                // блок загрузки сообщений в зависимости от типа игры
                this.advanced_settings_textareas[0].textarea_content = this.mechanics_textarea_block
                if (this.game_type === 2 || this.game_type === 3 || this.game_type === 4 || this.game_type == 6) {
                    this.advanced_settings_textareas.push(this.ending_game_textarea_block)
                    // удаление первого поля, которого не должно быть в играх данного типа
                    this.advanced_settings_textareas[1].textarea_content.splice(0, 1)
                }
                if (this.game_type === 5) {
                    let index4 = this.advanced_settings_textareas.findIndex(item => item.name === 'Игровая механика')
                    let index5 = this.advanced_settings_textareas[index4].textarea_content.findIndex(item => item.id === 'message_valid')
                    if (index5 !== -1) {
                        this.advanced_settings_textareas[index4].textarea_content.splice(index5, 1)
                    }
                }


                await this.get_group_status ()
                if (this.group_status === 1) {
                    this.payment_type = 3
                }
                if (this.group_status === 2) {
                    await this.get_prices ()
                }
                if (this.$route.params.id) {
                    await this.load_user_settings()
                    this.loadDefaulImage ()
                    this.gameData = this.def_settings
                    await this.transform_prizes_back_front()

                    if (this.common_settings.partner_group_id) {
                        this.partner_group_url = 'https://vk.com/club' + this.common_settings.partner_group_id
                    }
                    if (/^[0-9]+$/.test(this.$route.params.id)) {
                        this.show_edit = true
                        // this.auto_resize (30)
                        this.auto_resize ()
                    }
                } else {
                    await this.load_individual_settings()
                    this.gameData = this.def_settings
                    this.loadDefaulImage ()
                    if (this.name_game === 'guess_number') {
                        this.$emit('randomNumber')
                    }
                    // this.auto_resize (250)
                    this.auto_resize ()
                }

                await this.load_balance ()
                await this.load_free_attempts ()


                await this.check_group_token ()

                this.apply_def_settings ()
                await this.getAllUrlParams ()
                this.common_settings.id_group_vk = +this.settings.auth_data.vk_group_id
                this.mobile = this.settings.auth_data.vk_platform !== 'desktop_web'

            },
        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]
                this.loader = null
            },
            name_button: function () {
                setTimeout(this.auto_resize, 300)
            },
            group_token: function () {
                setTimeout(this.auto_resize, 300)
            },
            'required_repost_abc': function () {
                if (this.required_repost_abc !== 'c')
                    this.common_settings.repost_count_attempts = 0
                if (this.required_repost_abc === 'b')
                    this.common_settings.required_repost = true
                if (this.required_repost_abc !== 'b')
                    this.common_settings.required_repost = false
            },
            'required_enable_notifications_abc': function () {
                if (this.required_enable_notifications_abc !== 'c')
                    this.common_settings.enable_notifications_count_attempts = 0
                if (this.required_enable_notifications_abc === 'b')
                    this.common_settings.required_enable_notifications = true
                if (this.required_enable_notifications_abc !== 'b')
                    this.common_settings.required_enable_notifications = false
            },
            'required_join_group_abc': function () {
                if (this.required_join_group_abc !== 'c')
                    this.common_settings.join_group_count_attempts = 0
                if (this.required_join_group_abc === 'b')
                    this.common_settings.required_join_group = true
                if (this.required_join_group_abc !== 'b')
                    this.common_settings.required_join_group = false
            },
            'required_join_partner_group_abc': function () {
                if (this.required_join_partner_group_abc === 'a') {
                    this.partner_group_url = null
                    this.common_settings.required_join_partner_group = false
                    this.common_settings.join_partner_group_count_attempts = 0
                }

                if (this.required_join_partner_group_abc === 'b') {
                    this.common_settings.required_join_partner_group = true
                    this.common_settings.join_partner_group_count_attempts = 0
                }

                if (this.required_join_partner_group_abc === 'c')
                    this.common_settings.required_join_partner_group = false
            },
            'show_attempts_extended': function () {
                if (this.show_attempts_extended === false) {
                    this.common_settings.attempts_extended_count = 0
                    this.common_settings.attempts_extended_frequency_minutes = 0
                    this.common_settings.attempts_extended_max_count = 0
                }
            },
            'switchPaidAttempts': function () {
                if (this.switchPaidAttempts === false) {
                    this.common_settings.paid_attempts_count = 0
                    this.common_settings.paid_attempt_price = 0
                    this.common_settings.balance_type = 0
                }
            },
            'prizes_front': function () {
                if (this.game_type == 5) {
                    if (this.prizes_front.length > 1) {
                        this.settings.show_is_random_giveaway = true
                    } else {
                        this.settings.show_is_random_giveaway = false
                    }
                }
            },
            game_type: function () {
                if (this.game_type == 6) {
                    this.advanced_settings_textareas.push(this.ending_game_textarea_block)
                    let index = this.advanced_settings_textareas.findIndex(item => item.name === 'Игрок выиграл')
                    let index2 = this.advanced_settings_textareas[index].textarea_content.findIndex(item => item.id === 'message_win')
                    if (index2 !== -1) {
                        this.advanced_settings_textareas[index].textarea_content.splice(index2, 1)
                    }
                    let index4 = this.advanced_settings_textareas.findIndex(item => item.name === 'Игровая механика')
                    let index5 = this.advanced_settings_textareas[index4].textarea_content.findIndex(item => item.id === 'message_valid')
                    if (index5 === -1) {
                        this.advanced_settings_textareas[index4].textarea_content.push({
                                    id: 'message_valid',
                                    value: '',
                                    label: 'Сообщение при попадании',
                                    list_of_variables_for_rules: []
                                })
                    }
                }
                if (this.game_type == 5) {
                    let index3 = this.advanced_settings_textareas.findIndex(item => item.name === 'Завершение игры')
                    if (index3 !== -1) {
                        this.advanced_settings_textareas.splice(index3, 1)
                    }
                    let index = this.advanced_settings_textareas.findIndex(item => item.name === 'Игрок выиграл')
                    let index2 = this.advanced_settings_textareas[index].textarea_content.findIndex(item => item.id === 'message_win')
                    if (index2 !== -1) {
                        this.advanced_settings_textareas[index].textarea_content.splice(index2, 1)
                    } else {
                        this.advanced_settings_textareas[index].textarea_content.unshift({
                            id: 'message_win', value: '', label: 'Игрок выигрывает и получает приз', list_of_variables_for_rules:
                                ['profile','prize','balance_win', 'balance_name_one', 'balance_name_two', 'balance_name_five', 'rating_name_one', 'rating_name_two', 'rating_name_five', 'count_attempts']})
                    }
                   // убираем сообщение 'message_valid' в game_type = 5
                    let index4 = this.advanced_settings_textareas.findIndex(item => item.name === 'Игровая механика')
                    let index5 = this.advanced_settings_textareas[index4].textarea_content.findIndex(item => item.id === 'message_valid')
                    if (index5 !== -1) {
                        this.advanced_settings_textareas[index4].textarea_content.splice(index5, 1)
                    }

                }
            },
        },
        computed: {
            gameData: {
                get: function () {
                    let res = {
                        game: {}
                    }
                    Object.assign(res.game, this.textarea_values.common, this.common_settings)
                    res.game.game_duration = this.settings.game_duration * 3600
                    res.game.win_per_participant_limit = this.settings.win_per_participant_limit
                    res.game.is_random_giveaway = this.settings.is_random_giveaway
                    res.payment_type = this.payment_type
                    Object.assign(res, this.settings, this.textarea_values.mechanics)
                    return res
                },
                set: function (data) {
                    for (let key in data.game) {
                        if (key.startsWith('message_')) {
                            this.$set(this.textarea_values.common, key, data.game[key])
                        }  else if (key === 'game_duration') {
                            this.$set(this.settings, key, data.game[key] / 3600)
                        }  else if (key === 'win_per_participant_limit') {
                            this.$set(this.settings, key, data.game[key])
                        }  else if (key === 'is_random_giveaway') {
                            this.$set(this.settings, key, data.game[key])
                        } else {
                            this.$set(this.common_settings, key, data.game[key])
                        }
                    }
                    for (let key in data) {
                        if (key === 'game')
                            continue
                        if (key.startsWith('message_')) {
                            this.$set(this.textarea_values.mechanics, key, data[key])
                        } else {
                            this.$set(this.settings, key, data[key])
                        }
                    }
                }
            },
            hint_text () {
              if (this.game_type === 5 || this.game_type === 6) {
                  return '{ссылка} - подставится ссылка на игровое поле'
              } else return ''
            },
            no_money () {
                if (/^[0-9]+$/.test(this.$route.params.id) || this.group_status === 1 || this.balance >= this.price || this.games_available_launches !== 0) {
                    return false
                } else {
                    return true
                }
            },
            label_payment_type_1 () {
                return 'Оплата балансом (на балансе: ' +  this.balance + '₽)'
            },
            label_payment_type_2 () {
                return 'Оплата жетоном (доступно жетонов: ' +  this.games_available_launches + ')'
            },
            name_button_2 () {
                if (/^[0-9]+$/.test(this.$route.params.id)) {
                    return 'Cохранить изменения'
                } else if (this.payment_type == 1) {
                        return 'Запустить игру за ' + this.price + 'р'
                } else if (this.payment_type == 2) {
                        return 'Запустить игру за 1 жетон'
                } else if (this.payment_type == 3) {
                        return 'Запустить игру бесплатно'
                }
                return 'ошибка'
            },
            url_rules () {
                let rules = [() => true]
                if (this.required_join_partner_group_abc === 'b' || this.required_join_partner_group_abc === 'c') {

                    rules = [
                        (v) => !!v || 'Недопустимый формат',
                        v => (v && v.length <= 48) || 'Не более 48 символов',
                    ]
                    if (this.partner_group_url !== null) {

                        let regex = /vk.com\/(\w+)/

                        // let result = this.partner_group_url.match(regex)
                        let result = regex.test(this.partner_group_url)
                        // console.log('result - ' + result)
                        const rule = () => result || 'Недопустимый формат'
                        rules.push(rule)
                    }
                    return rules
                }
                return rules
            },
            rules_attempts_extended_max_count () {
                if (this.show_attempts_extended) {
                    let rules = [
                        v => !!v || 'Недопустимый формат',
                        v => !/[\D]/.test(v) || 'Недопустимый формат',
                        v => /^(\d){1,5}$/g.test(v) || 'Не более 5 символов'
                    ]
                    let rule = (v) => v >= this.common_settings.attempts_extended_count || `Укажите число не менее ${this.common_settings.attempts_extended_count}`
                    rules.push(rule)
                    return rules
                }
                return [() => true]
            },
            rules_attempts_extended_count () {
                if (this.show_attempts_extended) {
                    return [
                        v => !!v || 'Недопустимый формат',
                        v => !/[\D]/.test(v) || 'Недопустимый формат',
                        v => /^(\d){1,3}$/g.test(v) || 'Не более 3 символов'
                    ]
                }
                return [() => true]
            },
            rules_attempts_extended_frequency_minutes () {
                if (this.show_attempts_extended) {
                    return [
                        v => !!v || 'Недопустимый формат',
                        v => !/[\D]/.test(v) || 'Недопустимый формат',
                        v => /^(\d){1,5}$/g.test(v) || 'Не более 5 символов'
                    ]
                }
                return [() => true]
            },
            rules_balance_type () {
                if (this.switchPaidAttempts) {
                    return [
                        v => !!v || 'Недопустимый формат',
                    ]
                }
                return [() => true]
            },
            rules_paid_attempts_count () {
                if (this.switchPaidAttempts) {
                    return [
                        v => !!v || 'Недопустимый формат',
                        v => !/[\D]/.test(v) || 'Недопустимый формат',
                        v => /^(\d){1,4}$/g.test(v) || 'Не более 4 символов'
                    ]
                }
                return [() => true]
            },
            rules_paid_attempt_price () {
                if (this.switchPaidAttempts) {
                    return [
                        v => !!v || 'Недопустимый формат',
                        v => !/[\D]/.test(v) || 'Недопустимый формат',
                        v => v <= 65000 || 'Не более 65000'
                    ]
                }
                return [() => true]
            },
            rules_join_group_count_attempts () {
                if (this.required_join_group_abc === 'c') {
                    return [
                        v => !!v || 'Недопустимый формат',
                        v => /^(\d){1,4}$/g.test(v) || 'Не более 4 символов'
                    ]
                }
                return [() => true]
            },
            rules_enable_notifications_count_attempts () {
                if (this.required_enable_notifications_abc === 'c') {
                    return [
                        v => !!v || 'Недопустимый формат',
                        v => /^(\d){1,4}$/g.test(v) || 'Не более 4 символов'
                    ]
                }
                return [() => true]
            },
            rules_join_partner_group_count_attempts () {
                if (this.required_join_partner_group_abc === 'c') {
                    return [
                        v => !!v || 'Недопустимый формат',
                        v => /^(\d){1,4}$/g.test(v) || 'Не более 4 символов'
                    ]
                }
                return [() => true]
            },
            minDate () {
                let date = new Date()
                date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() + 15)
                return date
            },
            maxDate () {
                let date = new Date()
                date.setDate(date.getDate() + 7)
                date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
                return date
            },
            rules_image () {
                const rules = [() => true]
                if (this.image) {
                    const regex = /^(?:.*\.(?=(jpg|jpeg|png|gif)$))?[^.]*$/i
                    let show = !!(this.image.name.match(regex))
                    return [
                        () => show || 'используйте расширения: .jpg, .jpeg, .png, .gif',
                        v => !v || v.size < 10000000 || 'Картинка не более 10 MB!',
                    ]
                }
                return rules
            },
            toggle_textareas_btn_text () {
                // this.auto_resize_delay ()
                if (this.textareas_showed)
                    return  'Скрыть настройки ответов бота'
                else
                    return 'Показать настройки ответов бота'
            }
        },
        methods: {
            VKWebAppGetCommunityToken: async function () {
                let response = await bridge.send("VKWebAppGetCommunityToken", {
                    "app_id": +this.settings.auth_data.vk_app_id,
                    "group_id": +this.settings.auth_data.vk_group_id,
                    "scope": "messages, manage, wall"})
                console.log(response)
            },
            VKWebAppOpenApp: async function () {
                let response = await bridge.send("VKWebAppOpenApp", {"app_id": 7147757, "location": "app-pay"})
                console.log(response)
            },
            create_map: async function () {
                let obj = {}
                obj.auth_data = this.settings.auth_data
                obj.game_type = this.game_type
                obj.group_id = +this.settings.auth_data.vk_group_id
                let response = await fetch('/app/wallgames/map/' + sessionStorage.getItem('auth_data_url'),
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(obj)
                    })
                if (response.ok) {
                    response = await response.json()
                    this.settings.map = response.id
                    // console.log(response)
                } else {
                    response = await response.json()
                    console.log(response)
                }
            },
            get_group_status: async function () {
                let response = await fetch("/app/wallgames/group_status/" + sessionStorage.getItem('auth_data_url'))
                if (response.ok) {
                    response = await response.json()
                    this.group_status = +response.status
                } else {
                    response = await response.json()
                    console.log(response)
                }
            },
            button_back: function () {
                if (this.$route.params.id)
                    this.$router.push({ path: '/my_games/'})
                else
                    this.$router.push({ path: '/choice_games/'})
            },
            fill_textarea_values: function () {
                this.advanced_settings_textareas.forEach(block => {
                    block.textarea_content.forEach(textarea => this.$set(this.textarea_values, textarea.id, textarea.value))
                })
            },
            def_message_aply: async function () {
                if (this.$route.params.id) {
                    await this.load_individual_settings ()
                }
                for (let key in this.def_settings.game) {
                    if (key.startsWith('message_')) {
                        this.textarea_values.common[key] = this.def_settings.game[key]
                    }
                }
                for (let key in this.def_settings) {
                    if (key.startsWith('message_')) {
                        this.textarea_values.mechanics[key] = this.def_settings[key]
                    }
                }
            },
            go: async function () {
                this.dialog = false
                this.$router.push({ path: '/my_games'})
                await bridge.send("VKWebAppScroll", {"top": 0, "speed": 600})

            },
            apply_def_settings: function () {
                if (this.common_settings.required_join_group === false && this.common_settings.join_group_count_attempts === 0)
                    this.required_join_group_abc = 'a'
                if (this.common_settings.required_join_group === true)
                    this.required_join_group_abc = 'b'
                if (this.common_settings.required_join_group === false && this.common_settings.join_group_count_attempts > 0)
                    this.required_join_group_abc = 'c'

                if (this.common_settings.required_enable_notifications === false && this.common_settings.enable_notifications_count_attempts === 0)
                    this.required_enable_notifications_abc = 'a'
                if (this.common_settings.required_enable_notifications === true)
                    this.required_enable_notifications_abc = 'b'
                if (this.common_settings.required_enable_notifications === false && this.common_settings.enable_notifications_count_attempts > 0)
                    this.required_enable_notifications_abc = 'c'

                if (this.common_settings.required_repost === false && this.common_settings.repost_count_attempts === 0)
                    this.required_repost_abc = 'a'
                if (this.common_settings.required_repost === true)
                    this.required_repost_abc = 'b'
                if (this.common_settings.required_repost === false && this.common_settings.repost_count_attempts > 0)
                    this.required_repost_abc = 'c'

                if (this.common_settings.required_join_partner_group === false && this.common_settings.join_partner_group_count_attempts === 0)
                    this.required_join_partner_group_abc = 'a'
                if (this.common_settings.required_join_partner_group === true)
                    this.required_join_partner_group_abc = 'b'
                if (this.common_settings.required_join_partner_group === false && +this.common_settings.join_partner_group_count_attempts > 0)
                    this.required_join_partner_group_abc = 'c'

                if (this.common_settings.attempts_extended_frequency_minutes !== 0 || this.common_settings.attempts_extended_count !== 0 || this.common_settings.attempts_extended_max_count !== 0)
                    this.show_attempts_extended = true

                if (this.common_settings.paid_attempts_count !== 0 || this.common_settings.paid_attempt_price !== 0)
                    this.switchPaidAttempts =  true
            },
            check_group_token: async function () {
                // console.log('check_group_token')
                try {
                    let response = await fetch("/app/wallgames/check_group_token/" + sessionStorage.getItem('auth_data_url'))
                    // let response = await fetch("https://pedestal-test2.aiva-studio.ru/app/wallgames/check_group_token?vk_access_token_settings=friends%2Cphotos%2Cwall%2Cgroups&vk_app_id=7355601&vk_are_notifications_enabled=0&vk_group_id=195496572&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_user_id=312527953&vk_viewer_group_role=admin&sign=pRX7wFcULWKWDii8VrK8dzAj4Yjlf7o2FffOYSPD8OE")
                    let result = await response.json()
                    this.group_token = result.data
                    // console.log('result - ' + result)
                    // console.log('group_token - ' + this.group_token)

                } catch (error) {
                    console.error('Ошибка HTTP: ', error)
                    // console.log("Ошибка HTTP: " + response.status)
                }
            },
            load_individual_settings: async function () {
                // let response = await fetch("/app/wallgames/guess_number/default_settings/1")
                let response = await fetch('/app/wallgames/' + this.name_game + '/default_settings/')
                if (response.ok) {
                    let result = await response.json()
                    this.def_settings = {...this.def_settings, ...result}
                    // this.gameData = {...this.gameData, ...result}
                } else {
                    console.log("Ошибка HTTP: " + response.status)
                }
            },
            load_balance: async function () {
                let response = await fetch('/app/wallgames/payments/balance/' + sessionStorage.getItem('auth_data_url'))
                if (response.ok) {
                    response = await response.json()
                    this.balance = +response.balance
                } else {
                    let result = await response.json()
                    console.log(result)
                    this.balance = 0
                }
            },
            load_free_attempts: async function () {
                let response = await fetch('/app/wallgames/payments/free_attempts/' + sessionStorage.getItem('auth_data_url'))
                // let response = await fetch('https://pedestal-test2.aiva-studio.ru/app/wallgames/payments/free_attempts/?vk_access_token_settings=friends%2Cphotos%2Cwall%2Cgroups&vk_app_id=7355601&vk_are_notifications_enabled=0&vk_group_id=195496572&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_user_id=312527953&vk_viewer_group_role=admin&sign=pRX7wFcULWKWDii8VrK8dzAj4Yjlf7o2FffOYSPD8OE')
                if (response.ok) {
                    response = await response.json()
                    this.games_available_launches = +response.games_available_launches
                } else {
                    let result = await response.json()
                    console.log(result)
                }
            },
            load_user_settings: async function () {
                this.game_id = this.$route.params.id.replace(/[^\d]/g, '')
                // console.log('load_user_settings')
                try {
                    // let response = await fetch('https://pedestal-test2.aiva-studio.ru/app/wallgames/guess_number/174?vk_access_token_settings=friends%2Cphotos%2Cwall%2Cgroups&vk_app_id=7355601&vk_are_notifications_enabled=0&vk_group_id=195496572&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_user_id=312527953&vk_viewer_group_role=admin&sign=pRX7wFcULWKWDii8VrK8dzAj4Yjlf7o2FffOYSPD8OE')
                    let response = await fetch('/app/wallgames/' + this.name_game + '/' + this.game_id + '/' + sessionStorage.getItem('auth_data_url'))
                    let result = await response.json()

                    delete result.game.start_date
                    delete result.game.end_date
                    delete result.game.partner_group_members_start
                    delete result.game.partner_group_members_end
                    delete result.game.group_members_start
                    delete result.game.group_members_end
                    delete result.game.like_count
                    delete result.game.comment_count
                    delete result.game.repost_count
                    delete result.game.is_active
                    delete result.game.is_postponed

                    this.def_settings = {...this.def_settings, ...result}

                    // console.log(result)
                    // console.log(this.def_settings)
                    // this.gameData = {...this.gameData, ...result}
                    // console.log('result - ' + result)
                } catch (error) {
                    console.log("Ошибка HTTP error: " + error)
                    // console.log("Ошибка HTTP response.status: " + response.status)
                    // console.log("Ошибка HTTP response: " + response)
                }
            },

            transform_prizes_back_front: function () {
                // this.prizes_front[0].card_prizes.splice(0, 1)
                this.prizes_front.splice(0, this.prizes_front.length)
                // let prizes = []
                for (let i = 0; i < this.common_settings.prizes.length; i++) {

                    if (this.common_settings.prizes[i].balance_shop_min === this.common_settings.prizes[i].balance_shop_max)
                        this.common_settings.prizes[i].balance_shop = this.common_settings.prizes[i].balance_shop_min
                    else
                        this.common_settings.prizes[i].balance_shop = this.common_settings.prizes[i].balance_shop_min + '-' + this.common_settings.prizes[i].balance_shop_max

                    if (this.common_settings.prizes[i].balance_rating_min === this.common_settings.prizes[i].balance_rating_max)
                        this.common_settings.prizes[i].balance_rating = this.common_settings.prizes[i].balance_rating_min
                    else
                        this.common_settings.prizes[i].balance_rating = this.common_settings.prizes[i].balance_rating_min + '-' + this.common_settings.prizes[i].balance_rating_max

                    // let del_keys = ['balance_shop_min', 'balance_shop_max', 'balance_rating_min', 'balance_rating_max']
                    // for (let key in del_keys) {
                    //     delete this.common_settings.prizes[i][key]
                    // }
                    delete this.common_settings.prizes[i].balance_shop_min
                    delete this.common_settings.prizes[i].balance_shop_max
                    delete this.common_settings.prizes[i].balance_rating_min
                    delete this.common_settings.prizes[i].balance_rating_max

                    this.prizes_front.push({count: '', id: '', card_prizes: []})
                    for (let key in this.common_settings.prizes[i]) {
                        if (this.common_settings.prizes[i][key] && key !== 'count' && key !== 'id') {
                            let obj = {
                                type: key,
                                val: this.common_settings.prizes[i][key]
                            }
                            this.prizes_front[i].count = this.common_settings.prizes[i].count
                            this.prizes_front[i].id = this.common_settings.prizes[i].id
                            this.prizes_front[i].card_prizes.push(obj)
                        }
                    }
                    // console.log(this.prizes_front[i].prizes)
                }
            },
            add_prize_card () {
                this.prizes_front.push({
                    id: ++this.id_prize_card,
                    card_prizes: [{type: 'text'}]
                })
            },
            delete_prize (id) {
                let x = this.prizes_front.findIndex(item => item.id === id)
                this.prizes_front.splice(x, 1)
            },
            show_main_page: function () {
                this.main_obj.show_my_games = false
                this.main_obj.show_main_page_tab = true
                this.main_obj.show_main_page = true
            },
            auto_resize_delay: function () {
                setTimeout (this.auto_resize, 1000)
            },


            start_game: async function () {
                if (!this.group_token) {
                    this.message_error = 'Отсутствует ключ доступа'
                    setTimeout(this.clear_message, 10000)
                    return
                }
                await this.$emit('validateField')
                if (!this.validation) {
                    this.message_error = 'Некорректно заполнены настройки'
                    setTimeout(this.clear_message, 5000)
                    return
                }
                if (this.required_join_partner_group_abc === 'b' || this.required_join_partner_group_abc === 'c') {
                    await this.vkWebAppGetAuthToken ()
                    await this.transform_partner_group_url ()
                }
                if (/^[0-9]+$/.test(this.$route.params.id)) {
                    // await this.transform_prizes_array ()
                    await this.save_change_put ()
                    return this.loading = false
                }
                if (this.payment_type == 1) {
                    if (this.balance < this.price) {
                        this.message_error = 'Недостаточно денег на балансе'
                        setTimeout(this.clear_message, 5000)
                        return
                    }
                }
                if (this.payment_type == 2) {
                    if (this.games_available_launches === 0) {
                        this.message_error = 'Отсутствуют жетоны'
                        setTimeout(this.clear_message, 5000)
                        return
                    }
                }
                this.loading = true

                await this.transform_message_front_back ()
                await this.transform_prizes_array ()

                if (this.game_type == 5) {
                    let count_prize = 0
                    this.common_settings.prizes.forEach((item) => { count_prize += item.count})
                    this.$emit('create_win_fields_type5', count_prize)
                    // console.log('count_prize ' + count_prize)
                }
                if (this.game_type == 6) {
                    this.$emit('create_win_fields')
                }
                if (this.game_type === 5 || this.game_type === 6) {
                    await this.create_map()
                }

                const media_id = await this.upload_photo()
                if (!media_id) {
                    this.message_error = 'Ошибка загрузки картинки'
                    setTimeout(this.clear_message, 5000)
                    return this.loading = false
                }
                // const number_callback_server = await this.activating_callback_server()
                if (!(await this.activating_callback_server())) return this.loading = false

                // функция замены {} на переменные
                this.setting_variables_in_the_post_text()

                if (this.timeDeferredPost) {
                    if (Date.parse(this.timeDeferredPost) < +new Date ()) {
                        this.message_error = 'Некорректное время отлож. поста'
                        setTimeout(this.clear_message, 5000)
                        return this.loading = false
                    }
                    this.common_settings.is_postponed = true
                    await this.send_deferred_post_vk(media_id)
                } else {
                    await this.send_post_vk(media_id)
                    this.common_settings.is_postponed = false
                }
                if (this.common_settings.id_post_vk) {
                    if (await this.create_game()) {
                        let top = document.body.offsetHeight/2 - 125
                        this.dialog = true
                        await bridge.send("VKWebAppScroll", {"top": top, "speed": 600})

                    } else {
                        this.message_error = 'Ошибка отправки даннных'
                        setTimeout(this.clear_message, 5000)
                        return this.loading = false
                    }
                } else {
                    this.message_error = 'Ошибка публикации поста'
                    setTimeout(this.clear_message, 5000)
                    return this.loading = false
                }
                this.loading = false
            },


            submitHandler: function () {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                }
            },
            setting_variables_in_the_post_text: function () {
                this.current_post_text = this.settings.post_text
                this.settings.post_text = this.settings.post_text.replace(/{ссылка}/ig, "[https://vk.com/app" + this.settings.auth_data.vk_app_id + '_-' + this.settings.auth_data.vk_group_id + "#map=" + this.settings.map + "|Открыть игровое поле]")
            },
            clear_message: function () {
                this.message_error = ''
                this.message_success = ''
                this.message_group_record_token = ''
                this.show_link_error_callback = false
            },


            changeCondition: function () {
                if (this.onOff) {
                    this.condition = 'выключен'
                    this.onOff = !this.onOff
                    this.color = 'error'
                } else {
                    this.condition = 'включен'
                    this.onOff = !this.onOff
                    this.color = 'success'
                }
            },
            create: function () {
                if (this.image) {
                    let reader = new FileReader()
                    const regex = /^(?:.*\.(?=(jpg|jpeg|png|gif)$))?[^.]*$/i
                    if (this.image.name.match(regex)) {
                        reader.onload = this.onload
                        reader.readAsDataURL(this.image)
                    }
                } else {
                    this.loadDefaulImage()
                }
            },
            onload: function (e) {
                this.src = e.target.result
            },
            loadDefaulImage: function () {
                this.src = '/static/wallgames/image_default/min/' + this.name_game + '_min.jpg'
                this.image = null
            },
            upload_photo: async function() {
                let response
                if (this.image === null) {
                    response = await fetch("/app/wallgames/upload_photo/" + sessionStorage.getItem('auth_data_url') + "&game_name=" + this.name_game)
                } else {
                    const formData = new FormData()
                    formData.append('photo', this.image)
                    response = await fetch('/app/wallgames/upload_photo/' + sessionStorage.getItem('auth_data_url'),
                        {
                            method: 'POST',
                            body: formData
                        })
                }
                if (response.ok) {
                    response = await response.json()
                    return response.id
                }
                else {
                    response = await response.json()
                    console.log(response)
                    if (response.error.code === 15 || response.error.code === 5) {
                        window.open('https://oauth.vk.com/authorize?client_id=7099099&scope=offline,photos&redirect_uri=https://pedestal.aiva-studio.ru/api/vkGetTokenByCode.php&lang=ru&response_type=code&display=popup', 'width=800', 'height=400', 'location=no')
                        this.message_error = 'Предоставьте права доступа в открывшемся окне и запустите игру еще раз'
                        setTimeout(this.clear_message, 10000)
                        return
                    }
                    console.log(response)
                 }
            },
            pay: async function() {
                let obj = {}
                obj.user_id = this.settings.auth_data.vk_user_id
                obj.group_id = this.settings.auth_data.vk_group_id
                obj.game_type = this.game_type
                obj.auth_data = this.settings.auth_data
                // console.log(obj)
                let response = await fetch('/app/wallgames/payments/pay/',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(obj)
                    })
                if (response.ok) {
                    response = await response.json()
                    console.log(response)
                    return true
                } else {
                    response = await response.json()
                    console.log(response)
                    return false
                }
            },
            get_prices: async function () {
                let response = await fetch("/app/wallgames/payments/prices/" + sessionStorage.getItem('auth_data_url'))
                if (response.ok) {
                    response = await response.json()
                    let obj = response.find(item => item.game_type === +this.game_type)
                    this.price = +obj.price
                } else {
                    response = await response.json()
                    console.log(response)
                    return 0
                }
            },
            transform_prizes_array () {
                this.common_settings.prizes.splice(0, this.common_settings.prizes.length)
                for (let i = 0; i < this.prizes_front.length; i++) {
                    let array_games = {}
                    Object.assign(array_games, {'count': this.prizes_front[i].count})
                    for (let j = 0; j < this.prizes_front[i].card_prizes.length; j++) {
                        if (this.prizes_front[i].card_prizes[j].type === 'text')
                            Object.assign(array_games, {'text': this.prizes_front[i].card_prizes[j].val})
                        if (this.prizes_front[i].card_prizes[j].type === 'balance_shop') {
                            let value = String(this.prizes_front[i].card_prizes[j].val)
                            let balance_shop_range = value.split(/(.*)-/)
                            if (balance_shop_range.length > 1) {
                                Object.assign(array_games, {'balance_shop_min': balance_shop_range[1]})
                                Object.assign(array_games, {'balance_shop_max': balance_shop_range[2]})
                            } else {
                                Object.assign(array_games, {'balance_shop_min': balance_shop_range[0]})
                                Object.assign(array_games, {'balance_shop_max': balance_shop_range[0]})
                            }
                        }
                        if (this.prizes_front[i].card_prizes[j].type === 'balance_rating') {
                            let value = String(this.prizes_front[i].card_prizes[j].val)
                            let balance_rating_range = value.split(/(.*)-/)
                            if (balance_rating_range.length > 1) {
                                Object.assign(array_games, {'balance_rating_min': balance_rating_range[1]})
                                Object.assign(array_games, {'balance_rating_max': balance_rating_range[2]})
                            } else {
                                Object.assign(array_games, {'balance_rating_min': balance_rating_range[0]})
                                Object.assign(array_games, {'balance_rating_max': balance_rating_range[0]})
                            }
                        }
                    }
                    this.common_settings.prizes.push(array_games)
                }
            },
            transform_message_front_back: function () {
                // for (let i = 1; i < this.advanced_settings_textareas.length; i++) {
                //     for (let j = 0; j < this.advanced_settings_textareas[i].textarea_content.length; j++) {
                //         let value = this.advanced_settings_textareas[i].textarea_content[j].value
                //         let id = this.advanced_settings_textareas[i].textarea_content[j].id
                //         this.gameData.game[id] = value
                //     }
                // }
                // this.gameData.message_number_greater = this.advanced_settings_textareas[0].textarea_content[0].value
                // this.gameData.message_number_less = this.advanced_settings_textareas[0].textarea_content[1].value
                // this.gameData.message_closely = this.advanced_settings_textareas[0].textarea_content[2].value
            },
            activating_callback_server: async function () {
                try {
                    let response = await fetch("/app/wallgames/activate_callback/"
                        + sessionStorage.getItem('auth_data_url'))
                    let answer = await response.json()
                    if (response.ok) {
                        return answer
                    } else if (answer.error.code === 15) {
                        this.group_token = false
                        this.message_error = 'Не хватает прав доступа для запуска игры'
                        setTimeout(this.clear_message, 5000)
                    } else if (answer.error.code === 2000) {
                        this.message_error = 'Максимум callback серверов.'
                        this.show_link_error_callback = true
                        setTimeout(this.clear_message, 5000)
                    } else {
                        this.message_error = 'Ошибка запуска callback сервера'
                        setTimeout(this.clear_message, 5000)
                        console.log('ошибка запуска callback сервера - ' + response)
                    }
                } catch (err) {
                    this.message_error = 'Ошибка запуска callback сервера'
                    setTimeout(this.clear_message, 5000)
                    // let response = await response
                    console.log(err)
                }
            },
            send_post_vk: async function (media_id) {
                try {
                    let response  = await bridge.send("VKWebAppShowWallPostBox", {
                        "owner_id": - this.settings.auth_data.vk_group_id,
                        "message": this.settings.post_text,
                        "from_group": "1",
                        "attachments": "photo" + this.settings.auth_data.vk_user_id + '_' + media_id,
                    });
                    this.common_settings.id_post_vk = response.post_id
                    // const result = await response.json();
                    // console.log('Успех:', response);
                } catch (error) {
                    this.settings.post_text = this.current_post_text
                    console.error('Ошибка:', error); // TypeError: failed to fetch
                }
            },
            send_deferred_post_vk: async function (media_id) {
                // console.log('id_group_vk - ' + this.settings.auth_data.vk_group_id)
                // console.log('this.media_id - ' + media_id)
                let publish_date = Date.parse(this.timeDeferredPost)/1000
                // console.log('publish_date - ' + publish_date)
                try {
                    let response  = await bridge.send("VKWebAppShowWallPostBox", {
                        "owner_id": - this.settings.auth_data.vk_group_id,
                        "message": this.settings.post_text,
                        "from_group": "1",
                        "attachments": "photo" + this.settings.auth_data.vk_user_id + '_' + media_id,
                        "publish_date": publish_date
                    });
                    this.common_settings.id_post_vk = response.post_id
                    // const result = await response.json();
                    console.log('Успех:', response);
                } catch (error) {
                    console.error('Ошибка:', error); // TypeError: failed to fetch
                }
            },
            create_game: async function () {
                // console.log(send_obj)
                if (this.game_type == 1 || this.game_type == 5) {
                    this.gameData.game.game_duration = null
                }
                console.log(this.gameData)
                try {
                    let response = await fetch('/app/wallgames/' + this.name_game + '/',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify(this.gameData)
                        });
                    if (response.ok) {
                        // let result = await response.json()
                        // console.log('Успех! отправка данных - ', result)
                        return true
                    } else {
                        let result = await response.json()
                        // await this.delete_post ()
                        console.log('Ошибка! отправка данных - ', result)
                        return false
                    }
                } catch (error) {
                    console.error('Ошибка! отправка данных - ', error)
                    return false
                }
            },
            save_change_put: async function () {
                // await this.transform_obj()
                // console.log(send_obj)
                if (this.game_type == 1 || this.game_type == 5) {
                    this.gameData.game.game_duration = null
                }
                try {
                    let response = await fetch('/app/wallgames/' + this.name_game + '/' + this.game_id + '/',
                        {
                            method: 'put',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify (this.gameData)
                        });
                    if (response.ok) {
                        // let result = await response.json()
                        // console.log('Успех! отправка данных - ', result)
                        this.message_success = 'Настройки сохранены'
                        setTimeout(this.clear_message, 5000)
                    } else {
                        let result = await response.json()
                        this.message_error = 'Ошибка сохранения настроек'
                        setTimeout(this.clear_message, 5000)
                        console.log('Ошибка отправки данных - ', result)
                    }
                } catch (error) {
                    this.message_error = 'Ошибка сохранения настроек'
                    setTimeout(this.clear_message, 5000)
                    console.error('Ошибка отправки данных - ', error)
                }
            },
            transform_partner_group_url:  async function () {
                let regex = [/public(\d{8,9})/, /club(\d{8,9})/, /vk.com\/(\w+)/]
                for (let i = 0; i < regex.length; i++) {
                    let result = this.partner_group_url.match(regex[i])
                    if (result) {
                        if (i < 2)
                            return this.common_settings.partner_group_id = result[1]
                        else {
                            try {
                                let response  = await bridge.send("VKWebAppCallAPIMethod", {
                                    "method": "utils.resolveScreenName",
                                    "request_id": "32test",
                                    "params": {
                                        "screen_name": result[1],
                                        "v": "5.107",
                                        "access_token": this.token
                                    }
                                })
                                console.log('Успех 2 - url ', response.response.object_id)
                                this.common_settings.partner_group_id = response.response.object_id
                            } catch (error) {
                                console.error('Ошибка - url ', error)
                            }
                        }
                    }
                }
            },
            vkWebAppGetAuthToken: async function () {
                // console.log(+this.settings.auth_data.vk_app_id)
                try {
                    let response = await bridge.send("VKWebAppGetAuthToken", {
                        "app_id": +this.settings.auth_data.vk_app_id,
                        "scope": ""
                    })
                    this.token = response.access_token
                    console.log('Успех token - ', response.access_token)
                } catch (error) {
                    console.error('Ошибка - url ', error)
                }
            },
            group_record_token: async function () {
                try {
                    let response = await bridge.send("VKWebAppCallAPIMethod", {"method": "groups.getTokenPermissions", "params": {"v":"5.107", "access_token": this.token_group}})
                    let mask = response.response.mask
                    response = response.response.permissions
                    // console.log(response)
                    if (response.find(item => item.setting === 262144) && response.find(item => item.setting === 8192) && response.find(item => item.setting === 4096)) {
                        try {
                            let formData = new FormData()
                            for (let key in this.settings.auth_data) {
                                formData.set(key, this.settings.auth_data[key])
                            }
                            formData.append('group_access_token', this.token_group)
                            formData.append('group_access_token_permission', mask)
                            response = await fetch('/api/groupTokenHandSave.php' + sessionStorage.getItem('auth_data_url'),
                                {
                                    method: 'POST',
                                    body: formData
                                })
                            if (response.ok) {
                                this.group_token = true
                            }
                            console.log(await response.json())
                        } catch (error) {
                            this.message_group_record_token = 'Ошибка записи токена'
                            setTimeout(this.clear_message, 5000)
                            console.error('ошибка - ' + error)
                            return
                        }
                    } else {
                        this.message_group_record_token = 'В введенном ключе доступа предоставленны не все права'
                        setTimeout(this.clear_message, 10000)
                        console.log('В введенном ключе доступа предоставленны не все права')
                    }

                } catch (error) {
                    this.message_group_record_token = 'Введен некорректный ключ доступа'
                    setTimeout(this.clear_message, 10000)
                    console.error(error)
                    console.log('Введен некорректный ключ доступа')
                }
            },
            delete_post: async function () {
                try {
                    let response = await fetch("/app/wallgames/delete_post/" + 'post_id=' + this.common_settings.id_post_vk + sessionStorage.getItem('auth_data_url'))
                    let result = await response.json()
                    if (response.ok) console.log('Пост удален' + result)
                    else console.log('Ошибка удаления поста' + result)
                } catch (error) {
                    console.error('Ошибка удаления поста', error)
                }
            },
            // validateField () {
            //     this.$refs.main_game_component.validate()
            // },
            append (emoji) {
                let area=this.$refs.post_text.$el.querySelector('textarea')
                if ((area.selectionStart)||(area.selectionStart === 0)) {
                    let p_start=area.selectionStart;
                    let p_end=area.selectionEnd;
                    this.settings.post_text = this.settings.post_text.substring(0,p_start) + emoji + this.settings.post_text.substring(p_end,area.value.length)
                }
                area.setRangeText(emoji, area.selectionStart, area.selectionEnd, "end");
                area.focus();
                if (document.selection) {
                    area.focus();
                    let sel = document.selection.createRange();
                    sel.text = emoji;
                }
                if (this.settings.post_text === '') {
                    this.settings.post_text += emoji
                }
            },
        }
    }
</script>

<style>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    #token {
        border: 1px lightgrey;
        border-radius: 5px;
        border-style: solid;

    }

    #qw1 {
        margin-top: 1px;
    }

    #area1, #area2, #area3 {
        text-align: center;
    }

    .mt3px {
        margin-top: 3px;
    }

    .regular-input {
        padding: 0.5rem 1rem;
        border-radius: 3px;
        width: 20rem;
        height: 10rem;
        outline: none;
    }

    .regular-input:focus {
        box-shadow: 0 0 0 3px rgba(66, 153, 225, .5);
    }

    .dense-textarea {
        margin-top: 10px !important;
    }

    #we {
        margin-bottom: 10px !important;
    }

    #DateTimePicker-input {
        min-height: 40px;
        height: 40px;
        font-size: 14px;
    }

    #no_money {
        color: red;
        font-size: 14px;
    }



</style>
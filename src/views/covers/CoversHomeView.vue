<template>
    <div>
        <v-row class="mx-0">
            <v-col cols="6">
                <v-tabs v-model="tab">
                    <v-tab>Обложки</v-tab>
                    <v-tab v-if='cover_list.length !== 0' @click="coverGroupSettingsGet">Настройка</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="3" align="right" class="mb-1 pr-0">
                <v-btn @click="go_description_page ('https://vk.com/@pedestal-covers')" class="mt10px" color="#e5ebf1"
                       small>Справка
                </v-btn>
            </v-col>
            <v-col cols="3" align="right">
                <v-btn @click="add_cover" class="mt10px" color="primary" small>Добавить обложку</v-btn>
            </v-col>
        </v-row>
        <hr  id="line_vk" class="mx-3 mt-n3">
        <v-img v-if='cover_list.length === 0' src="/static/cover/default/start.png" class="mt-n3"></v-img>
        <div v-show='cover_list.length !== 0 && !checking_cover_for_activity' class="mx-3 mt-3" id="info_mes_1">
            <div class="px-2 pt-1">
                <span>
                    Все обложки в статусе "не активна". Чтобы обложка в сообществе обновлялась, необходимо хотя бы одну
                    перевести в статус "активна". Частота обновления обложки сообщества задаётся в настройках.
                </span>
            </div>
        </div>
        <v-row v-show="tab === 0" class="mx-0" justify="space-between">
            <v-card
                    v-for="cover in cover_list"
                    :key="cover.id"
                    class="my-3 mx-3"
                    max-width="373"
                    min-width="373"
                    max-height="184"

            >
                <div v-if="cover.show_delete_div" id="delete_card">
                    <div id="white"></div>
                    <div id="delete_card_input">
                        <div align="center" class="mb-3 px-3 pt-2"><span>Обложка будет удалена навсегда :( Пожалуйста, подтвердите удаление</span>
                        </div>
                        <v-row justify="space-around" class="mt-n1">
                            <v-btn
                                    color="primary"
                                    @click="coverGroupRemove(cover.id)"
                                    small
                                    :loading="loading"
                                    :disabled="loading"
                            >
                                Удалить
                            </v-btn>
                            <v-btn min-width="89" color="primary" @click="show_delete_div_fu(cover.id)" small>Отмена
                            </v-btn>
                        </v-row>
                    </div>
                </div>
                <v-img
                        v-if="cover.cover_last_image_url"
                        class="white--text align-end relative"
                        height="94px"
                        :src=cover.cover_last_image_url
                >
                    <div id="delete_btn1"></div>
                    <v-btn @click="show_delete_div_fu(cover.id)" id="delete1" color="white" elevation="50" icon>
                        <v-icon size="20">mdi-delete</v-icon>
                    </v-btn>
                </v-img>
                <v-img
                        v-else
                        class="white--text align-end relative"
                        height="94px"
                        :src=cover.background_url
                >
                    <div id="delete_btn2"></div>
                    <v-btn @click="show_delete_div_fu(cover.id)" id="delete2" color="white" elevation="50" icon>
                        <v-icon size="20">mdi-delete</v-icon>
                    </v-btn>
                </v-img>
                <v-card-text class="text--primary pb-0 pt-1">
                    <div>{{cover.name}}</div>
                    <div>Статус: {{+cover.is_enabled === 0 ? 'неактивна' : 'активна'}}
                        <v-tooltip  bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                            <template v-slot:activator="{ on }">
                                <v-icon size="20" v-on="on">mdi-help-circle-outline
                                </v-icon>
                            </template>
                            <span>{{+cover.is_enabled === 0 ? 'Обложка не доступна для публикации в сообществе. Активируйте её, когда закончите настройку.' : 'Обложка доступна для публикации в сообществе и будет опубликована в соответствии с настройками.'}}</span>
                        </v-tooltip>
                    </div>
                    <v-tooltip  bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                        <template v-slot:activator="{ on }">
                            <v-icon v-show="cover.enable_time_start != 0 || cover.enable_time_stop != 0" id='clock' size="20" color="red" v-on="on">mdi-clock-outline
                            </v-icon>
                        </template>
                        <span>Обложка имеет настройки таймера, время публикации ограничено.</span>
                        <!--                        <span>Обложка имеет настройки таймера, время публикации ограничено c {{convert_sec_in_time(cover.enable_time_start)}} по {{convert_sec_in_time(cover.enable_time_stop)}}</span>-->
                    </v-tooltip>
                </v-card-text>

                <v-card-actions class="py-0 mt-n3">
                    <v-btn
                            color="primary"
                            text
                            @click="edit_cover(cover.id)"
                    >
                        Редактировать
                    </v-btn>

                    <v-btn
                            color="primary"
                            text
                            @click="copy_cover(cover.id)"
                    >
                        Дублировать
                    </v-btn>
                    <v-switch v-model="cover.is_enabled" @change="change_is_enabled(cover.id, cover.is_enabled)"
                              class="ml-5"></v-switch>
                </v-card-actions>
            </v-card>
        </v-row>
        <!--        <div v-show="tab === 1" @click="go_description_page('https://vk.com/@pedestal-covers?anchor=algoritm-obnovlenia-oblozhek')" align="center" id="div1" class="mb-4 mx-3">-->
        <!--            <span>Обязательно ознакомьтесь с логикой обновления обложек</span>-->
        <!--        </div>-->
        <div v-show="tab === 1" class="col3 mt-3 mx-3">
            <v-col class="py-0 pt-3" cols="12" sm="4">
                <v-text-field
                        id="order"
                        dense
                        label="Частота обновлений"
                        outlined
                        type="number"
                        v-model="cover_frequency_minutes"
                        prefix="каждые"
                        suffix="минут"
                >
                    <template v-slot:append>
                        <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                            <template v-slot:activator="{ on }">
                                <v-icon class="mt2px" size="20" v-on="on">mdi-help-circle-outline
                                </v-icon>
                            </template>
                            <span>С этой частотой будет обновляться обложка в группе в соответствии с выбранным методом.</span>
                        </v-tooltip>
                    </template>
                </v-text-field>
            </v-col>
            <v-col class="py-0 mb-n3" cols="12" sm="4">
                <v-select
                        :items="cover_order_type_items"
                        dense
                        label="Вариант обновлений"
                        outlined
                        v-model="cover_order_type"
                >
                    <template v-slot:append>
                        <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                            <template v-slot:activator="{ on }">
                                <v-icon class="mt2px" size="20" v-on="on">mdi-help-circle-outline
                                </v-icon>
                            </template>
                            <span>Случайный: будет опубликована случайная обложка из доступных, за исключением той,
                                которая опубликована сейчас, чтобы она не повторялась. Если обложка всего одна, то она
                                будет переопубликованна. <br>
                                По порядку: обложки будут обновляться в строгом порядке по очереди.</span>
                        </v-tooltip>
                    </template>
                </v-select>
            </v-col>
            <hr class="hr-dotted">
            <div class="mx-3 my-2">
                <span>С указанной частотой (например, каждые 5 минут) наступает событие обновления обложки. Чтобы обложка
                    в сообщества обновилась, должна быть хотя бы одна обложка в приложении, подходящая по двум условиям:
                    1) статус "Активна" (включена) 2) индивидуальные настройки таймера подходят под текущее время.<br>
                <a href="https://vk.com/@pedestal-covers?anchor=algoritm-obnovlenia-oblozhek" target="_blank">Подробнее в инструкции</a>
                </span>
            </div>
            <v-col align="center">
                <v-btn @click="coverGroupSettingsSet" color="primary" small>Сохранить</v-btn>
            </v-col>
        </div>
    </div>
</template>

<script>
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        data: () => ({
            loader: 'loading',
            loading: false,
            tab: '',
            settings: {
                auth_data: ''
            },
            cover_list: [],
            // cover_list: [{
            //     id: 66,
            //     name: "\u043e\u0431\u043b\u043e\u0436\u043a\u0430 \u043c\u043e\u044f",
            //     show_delete_div: false,
            //     is_enabled: 1,
            //     enable_time_start: 7300,
            //     enable_time_stop: 1000,
            //     order_position: 1,
            //     background_url: "https://sun9-25.userapi.com/VE6KFSEdClR9UV8NoJveNeN5ZrzO3cU1i6tyMg/ANeGMKX6zNU.jpg"
            // },
            //     {
            //         id: 67,
            //         name: "\u043e\u0431\u043b\u043e\u0436\u043a\u0430 \u043c\u043e\u044f",
            //         is_enabled: 1,
            //         enable_time_start: 0,
            //         enable_time_stop: 0,
            //         order_position: 1,
            //         background_url: "https://sun9-25.userapi.com/VE6KFSEdClR9UV8NoJveNeN5ZrzO3cU1i6tyMg/ANeGMKX6zNU.jpg"
            //     },
            //     {
            //         id: 68,
            //         name: "\u043e\u0431\u043b\u043e\u0436\u043a\u0430 \u043c\u043e\u044f",
            //         is_enabled: 1,
            //         enable_time_start: 0,
            //         enable_time_stop: 0,
            //         order_position: 1,
            //         background_url: "https://sun9-25.userapi.com/VE6KFSEdClR9UV8NoJveNeN5ZrzO3cU1i6tyMg/ANeGMKX6zNU.jpg"
            //     }],
            cover_order_type: 'rand',
            cover_frequency_minutes: 1,
            cover_order_type_items: [
                {value: 'order', text: 'По порядку'},
                {value: 'rand', text: 'Случайный'},
            ],
        }),
        mounted:
            async function () {
                // this.load_font()
                // console.log('this.cover_list.length')
                // console.log(this.cover_list.length)
                await this.getAllUrlParams()
                await this.coverGroupGetListAll()
                await this.coverGroupSettingsGet()
                setTimeout(this.auto_resize, 500)

            },
        computed: {
            checking_cover_for_activity: function () {
                let show = false
                for (let i = 0; i < this.cover_list.length; i++) {
                    if (this.cover_list[i].is_enabled === 1) {
                        show = true
                        break
                    }
                }
                return show
            },
        },
        methods: {
            add_cover: function() {
                if (this.cover_list.length === 0 && this.cover_frequency_minutes === 0) {
                    this.cover_frequency_minutes = 1
                    this.coverGroupSettingsSet()
                }
                this.$router.push({path: '/add_cover/'})
            },
            convert_sec_in_time: function (timestamp) {
                let hours = Math.floor(timestamp / 60 / 60)
                let minutes = Math.floor(timestamp / 60) - (hours * 60)
                let formatted = [
                    hours.toString().padStart(2, '0'),
                    minutes.toString().padStart(2, '0')
                ].join(':')
                return formatted
            },
            fontGet: async function (id) {
                let response = await fetch('/api/coverGroupGet.php' + sessionStorage.getItem('auth_data_url') + '&cover_id=' + id)
                if (response.ok) {
                    let answer = await response.json()
                    let font = []
                    let cover_data_front = JSON.parse(answer.cover_data_front)
                    for (let i = 0; i < cover_data_front.objects.length; i++) {
                        if (cover_data_front.objects[i].type_elem === 1) {
                            font.push(cover_data_front.objects[i].objects[1].fontFamily)
                        } else if (cover_data_front.objects[i].type_elem === 2) {
                            font.push(cover_data_front.objects[i].fontFamily)
                        }
                    }
                    const uniqueSet = new Set(font)
                    font = [...uniqueSet]
                    return font
                }
            },
            load_font: async function (font) {
                let FontFaceObserver = require('fontfaceobserver')
                for (let i = 0; i < font.length; i++) {
                    if (font[i] === 'Times New Roman') continue
                    let myfont = new FontFaceObserver(font[i])
                    myfont.load()
                        .then(
                        ).catch(function (e) {
                        console.log(e)
                        console.log('font loading failed ')
                    })
                }
            },
            // go_description_page: function (url) {
            //     window.open(url, '_blank')
            // },
            edit_cover: async function (id) {
                let font = await this.fontGet(id)
                await this.load_font(font)
                this.$router.push({path: /add_cover/ + id})
            },
            copy_cover: async function (id) {
                let font = await this.fontGet(id)
                await this.load_font(font)
                this.$router.push({path: /add_cover/ + 'copy' + id})
            },
            coverGroupGetListAll: async function () {
                let response = await fetch('/api/coverGroupGetListAll.php' + sessionStorage.getItem('auth_data_url') + '&covers_count=100')
                if (response.ok) {
                    let answer = await response.json()
                    if (answer.covers) {
                        answer.covers.map(function (item) {
                            item.show_delete_div = false
                            item.is_enabled = +item.is_enabled
                        })
                        this.cover_list = answer.covers
                    } else {
                        this.cover_list = []
                    }
                } else {
                    console.log('Ошибка. Метод - coverGroupGetListAll')
                }
            },
            coverGroupSettingsGet: async function () {
                let response = await fetch('/api/coverGroupSettingsGet.php' + sessionStorage.getItem('auth_data_url'))
                if (response.ok) {
                    let answer = await response.json()
                    this.cover_frequency_minutes = +answer.cover_settings.cover_frequency_minutes
                    this.cover_order_type = answer.cover_settings.cover_order_type
                } else {
                    console.log('Ошибка. Метод - coverGroupSettingsGet')
                }
            },
            coverGroupSettingsSet: async function () {
                let formData = new FormData()
                for (let key in this.settings.auth_data) {
                    formData.set(key, this.settings.auth_data[key])
                }
                formData.append('cover_order_type', this.cover_order_type)
                formData.append('cover_frequency_minutes', this.cover_frequency_minutes)
                try {
                    let response = await fetch('/api/coverGroupSettingsSet.php',
                        {
                            method: 'POST',
                            body: formData
                        })
                    if (response.ok) {
                        console.log(response)
                        console.log(response.json())
                    }
                } catch (error) {
                    console.error('ошибка - ' + error)
                }
            },
            show_delete_div_fu: function (id) {
                let index = this.cover_list.findIndex(item => item.id === id)
                this.cover_list[index].show_delete_div = !this.cover_list[index].show_delete_div
                // console.log(this.cover_list)
            },
            coverGroupRemove: async function (cover_id) {
                this.loading = true
                let formData = new FormData()
                for (let key in this.settings.auth_data) {
                    formData.set(key, this.settings.auth_data[key])
                }
                formData.append('cover_id', cover_id)
                try {
                    let response = await fetch('/api/coverGroupRemove.php',
                        {
                            method: 'POST',
                            body: formData
                        })
                    if (response.ok) {
                        console.log(response)
                        console.log(response.json())
                    }
                } catch (error) {
                    console.error('ошибка - ' + error)
                }
                this.coverGroupGetListAll()
                this.loading = false
            },
            change_is_enabled: async function (id, is_enabled) {
                if (is_enabled) {
                    is_enabled = 1
                } else {
                    is_enabled = 0
                }
                try {
                    let formData = new FormData()
                    for (let key in this.settings.auth_data) {
                        formData.set(key, this.settings.auth_data[key])
                    }

                    formData.append('cover_is_enabled', is_enabled)
                    formData.append('cover_id', id)
                    let response = await fetch('/api/coverGroupEdit.php',
                        {
                            method: 'POST',
                            body: formData
                        })
                    if (response.ok) {
                        this.coverGroupGetListAll()
                        console.log(response)
                        console.log(response.json())
                    }
                } catch (error) {
                    console.error('ошибка - ' + error)
                }
            }
        },
    }
</script>

<style>
    #order {
        text-align: center;
    }

    .relative {
        position: relative;
    }

    #delete1, #delete2 {
        position: absolute;
        top: 0px;
        right: 0px;
    }

    #delete_btn1, #delete_btn2 {
        position: absolute;
        top: 4px;
        right: 4px;
        border-radius: 50%;
        height: 28px;
        width: 28px;
        background-color: rgba(0, 0, 0, 0.3);
    }

    #delete_card {
        position: absolute;
        max-width: 373px;
        min-width: 373px;
        min-height: 184px;
        background-color: rgba(255, 3, 3, 0.4);
        top: 0px;
        left: 0px;
        z-index: 3;
        border-radius: 5px;
    }

    #delete_card_input {
        position: absolute;
        top: 48%;
        z-index: 4;

    }

    #white {
        position: absolute;
        top: 94px;
        background-color: white;
        min-height: 90px;
        min-width: 373px;
        z-index: 2;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    #div1 {
        background-color: #e5ebf1;
        cursor: pointer;
    }

    .hr-dotted {
        padding-bottom: 2px;
        padding: 0;
        height: 0;
        border: none;
        border-top: 2px dotted #ddd;
    }

    .col3 {
        border-color: #d3d9de;
        border-radius: 3px;
        border-style: solid;
        border-width: 1px;
        width: 771px;
        height: auto;
        min-height: 100px;
    }

    .mt2px {
        margin-top: 2px;
    }
    .mt10px {
        margin-top: 10px !important;
    }

    #info_mes_1 {
        border-color: red;
        border-style: solid;
        border-width: 1px;
    }

    #clock {
        position: absolute;
        top: 118px;
        right: 4px;
        height: 28px;
        width: 28px;
    }

    #line_vk {
        color: #e7e8ec;
        background-color: #e7e8ec;
        border: none;
        height: 1px;
    }

</style>
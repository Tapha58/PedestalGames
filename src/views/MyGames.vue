<template>
    <div>
        <v-skeleton-loader
                v-if="show_skeleton"
                class="mx-auto"
                min-width="296"
                type="table"
        ></v-skeleton-loader>
        <div v-else>
            <v-alert
                    v-if="games.length === 0"
                    class="mt-3"
                    text
                    prominent
                    type="primary"
                    icon="mdi-emoticon-sad-outline"
            >
                <v-row align="center">
                    <v-col class="">
                        Еще ни одной игры не было запущено. По нашим прогнозам, самое подходящее время для первого
                        запуска - сейчас.
                    </v-col>
                </v-row>
            </v-alert>
            <v-data-table
                    v-else
                    :headers="headers"
                    :items="games"
                    sort-by="start_date"
                    sortDesc
                    items-per-page="10"
                    hide-default-footer
                    :page.sync="page"
                    @page-count="pageCount = $event"
            >
                <template v-slot:item.actions="{ item }">
                    <v-btn
                            :href="'https://vk.com/wall-' + item.id_group_vk + '_' + item.id_post_vk"
                            target="_blank"
                            icon
                    >
                        <v-icon
                                color="#4872a3"
                                :size="size_icon"
                        >
                            mdi-vk
                        </v-icon>
                    </v-btn>
                    <v-btn
                            class="mx-1"
                            icon
                            @click="copy_game(item.id, item.route)"
                    >
                        <v-icon
                                class="mx-5"
                                :size="size_icon"
                        >
                            mdi-content-copy
                        </v-icon>
                    </v-btn>

                    <v-btn
                            @click="editItem(item.id, item.route)"
                            icon
                            v-show="item.is_active"
                    >

                        <v-icon
                                :size="size_icon"
                        >
                            mdi-pencil
                        </v-icon>
                    </v-btn>
<!--                    <v-btn-->
<!--                            @click="results_game(item.id, item.route)"-->
<!--                            icon-->
<!--                    >-->
<!--                        <v-icon :size="size_icon">mdi-sort-descending</v-icon>-->
<!--                    </v-btn>-->

                </template>

                <template v-slot:item.start_date="{ item }">
                    <span>{{ transform_start_date (item) }}</span>
                </template>
                <template v-slot:item.end_date="{ item }">
                    <span>{{ transform_end_date (item) }}</span>
                </template>
                :
                <template v-slot:item.is_active="{ item }">
                    <span>{{ !!item.is_active ? 'активна': 'завершена'}}</span>
                </template>
                <template v-slot:no-data>
                    Нет данных для отображения
                </template>
            </v-data-table>
            <v-pagination
                    v-if="games.length > 10"
                    class="mt-2"
                    v-model="page"
                    :length="pageCount"
                    :total-visible="7"
            ></v-pagination>
        </div>
    </div>

</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        props: ['settings', 'auth_data_url'],
        data: () => ({
            page: 1,
            pageCount: 10,
            show_skeleton: true,
            headers: [
                {text: 'Игра', value: 'name', sortable: false},
                {text: 'Статус', value: 'is_active'},
                {text: 'Дата создания', value: 'start_date', sortable: true},
                {text: 'Дата окончания', value: 'end_date', sortable: false},
                {text: '', value: 'actions', sortable: false},
            ],
            games: [],
        }),
        computed: {
            size_icon() {
                if (this.settings.auth_data.vk_platform !== 'mobile_web' && this.settings.auth_data.vk_platform !== 'desktop_web') {
                    return 24
                } else {
                    return 18
                }
            },
            name_route_obj() {
                return {
                    1: {name: 'Угадай число', route: '/guess_number_settings/'},
                    2: {name: 'Анаграмма', route: '/anagram_settings/'},
                    3: {name: 'Слова на букву', route: '/words_with_letter_settings/'},
                    4: {name: 'Битва комментаторов', route: '/max_comments_settings/'},
                    5: {name: 'Морской бой', route: '/sea_battle_settings/'},
                    6: {name: 'Морской бой', route: '/sea_battle_with_score_settings/'}
                }
            },
        },
        methods: {
            load_info_list: async function () {
                let response = await fetch('/app/wallgames/game/info_list/' + this.auth_data_url)
                if (response.ok) {
                    this.games = await response.json()
                    this.games = this.games.map(item => Object.assign(item, this.name_route_obj[item.type]))
                } else {
                    console.log("Ошибка HTTP: " + response.status)
                }
            },
            transform_start_date: function (item) {
                let options = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }
                let start_date = Date.parse(item.start_date)
                start_date = new Date(start_date)
                return start_date.toLocaleString("ru", options)
            },
            transform_end_date: function (item) {
                if (!item.end_date) return ' - '
                let options = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }
                let end_date = Date.parse(item.end_date)
                end_date = new Date(end_date)
                return end_date.toLocaleString("ru", options)
            },
            editItem(id, route) {
                this.$router.push({path: route + ':id_game=' + id + this.auth_data_url})
            },
            copy_game(id, route) {
                this.$router.push({path: route + ':copy=' + id + this.auth_data_url})
            },
            results_game(id) {
                this.$router.push({path: '/results/' + id})
            },
            auto_resize: function () {
                bridge.send("VKWebAppResizeWindow", {
                    "width": 795,
                    "height": Math.max(document.body.offsetHeight, 150) + 30
                });
            },
            count_hight: function () {
                console.log('document.documentElement.scrollHeight - ' + document.documentElement.scrollHeight)
                console.log('document.body.scrollHeight - ' + document.body.scrollHeight)
                console.log('document.body.offsetHeight - ' + document.body.offsetHeight)
                console.log('document.documentElement.offsetHeight - ' + document.documentElement.offsetHeight)
            }
        },
        mounted:
            async function () {
                await this.load_info_list()
                this.show_skeleton = false
                this.auto_resize()
            },
    }
</script>

<style>
    .v-data-table__mobile-row {
        min-height: 36px !important;
        height: 36px !important;
    }

    .v-data-footer {
        justify-content: space-between !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }

    .v-data-footer__select {
        margin-right: -12px !important;
    }

    /*.v-select {*/
    /*    margin-left: 8px !important;*/
    /*}*/

    .v-data-footer__pagination {
        margin-left: 8px !important;
        margin-right: 8px !important;
    }

    tr {
        padding-top: 8px !important;
        padding-bottom: 8px !important;
    }
</style>
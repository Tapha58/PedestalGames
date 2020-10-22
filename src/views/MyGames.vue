<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="games"
                sort-by="start_date"
                sortDesc
                :footerProps="{itemsPerPageText: 'Строк на странице', pageText: '{0} из {1}', itemsPerPageAllText: 'все'}"
        >
            <template v-slot:item.actions="{ item }">
                <v-icon
                        small
                        @click="go_post_page(item)"
                        color="#4872a3"
                >
                    mdi-vk
                </v-icon>
                <v-icon
                        class="mx-5"
                        small
                        @click="copy_game(item.id, item.route)"
                >
                    mdi-content-copy
                </v-icon>
                <v-icon
                        v-show="item.is_active"
                        small
                        @click="editItem(item.id, item.route)"
                >
                    mdi-pencil
                </v-icon>
            </template>

            <template v-slot:item.start_date="{ item }">
                <span>{{ transform_start_date (item) }}</span>
            </template>
            <template v-slot:item.end_date="{ item }">
                <span>{{ transform_end_date (item) }}</span>
            </template> :
            <template v-slot:item.is_active="{ item }">
                <span>{{ !!item.is_active ? 'активна': 'завершена'}}</span>
            </template>
            <template v-slot:no-data>
                    Нет данных для отображения
            </template>
        </v-data-table>
    </div>

</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    import auto_resize from "@/mixins/auto_resize";

    export default {
        mixins: [auto_resize],
        data: () => ({
            headers: [
                // { text: 'Id', value: 'id'},
                { text: 'Игра', value: 'name', sortable: false},
                { text: 'Статус', value: 'is_active' },
                { text: 'Дата создания', value: 'start_date', sortable: true },
                { text: 'Дата окончания', value: 'end_date', sortable: false },
                { text: '', value: 'actions', sortable: false },
            ],
            games: [],
            name_route_obj: {
                1: {name: 'Угадай число', route: '/guess_number_settings/'},
                2: {name: 'Анаграмма', route: '/anagram_settings/'},
                3: {name: 'Слова на букву', route: '/words_with_letter_settings/'},
                4: {name: 'Битва комментаторов', route: '/max_comments_settings/'},
                5: {name: 'Морской бой', route: '/sea_battle_settings/'},
                6: {name: 'Морской бой', route: '/sea_battle_with_score_settings/'}
            }
        }),

        methods: {
            go_post_page: function (item) {
                window.open('https://vk.com/wall-' + item.id_group_vk + '_' + item.id_post_vk, '_blank')
            },
            load_info_list: async function () {
                let response = await fetch('/app/wallgames/game/info_list/' + sessionStorage.getItem('auth_data_url'))
                if (response.ok) {
                    this.games =  await response.json()
                    this.games = this.games.map(item => Object.assign(item, this.name_route_obj[item.type]))
                }
                else {
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
                start_date = new Date (start_date)
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
                end_date = new Date (end_date)
                return end_date.toLocaleString("ru", options)
            },
            editItem (id, route) {
                this.$router.push({ path: route + id})
            },
            copy_game (id, route) {
                this.$router.push({ path: route + 'copy' + id})
            },
            auto_resize: function () {
                // console.log('mygames autoresize - ' + document.body.offsetHeight)
                bridge.send("VKWebAppResizeWindow", {"width": 795, "height": Math.max(document.body.offsetHeight, 150) + 30});
            },
            count_hight: function () {
                console.log ('document.documentElement.scrollHeight - ' + document.documentElement.scrollHeight)
                console.log ('document.body.scrollHeight - ' + document.body.scrollHeight)
                console.log ('document.body.offsetHeight - ' + document.body.offsetHeight)
                console.log ('document.documentElement.offsetHeight - ' + document.documentElement.offsetHeight)
            }
        },
        mounted:
            async function () {
                await this.load_info_list()
                // await this.transform_info_list()
                this.auto_resize()
        },
    }
</script>

<style scoped>

</style>
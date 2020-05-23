<template>
    <v-data-table
            :headers="headers"
            :items="games"
            sort-by="name"
            class="elevation-1"

    >
        <template v-slot:item.actions="{ item }">
            <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
<!--            <v-icon-->
<!--                    small-->
<!--                    @click="deleteItem(item)"-->
<!--            >-->
<!--                mdi-delete-->
<!--            </v-icon>-->
        </template>
<!--        <template v-slot:no-data>-->
<!--            <v-btn color="primary" @click="initialize">Reset</v-btn>-->
<!--        </template>-->
    </v-data-table>
</template>

<script>
    export default {
        name: "MyGames",
        data: () => ({
            headers: [
                { text: 'Игра', align: 'start', sortable: false, value: 'name',},
                { text: 'Статус', value: 'is_active' },
                { text: 'Дата создания', value: 'start_date' },
                { text: 'Дата окончания', value: 'end_date' },
                { text: '', value: 'actions', sortable: false },
            ],
            games: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                is_active: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                is_active: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        methods: {
            initialize () {
                this.desserts = [
                    {
                        name: 1,
                        is_active: 2,
                        start_date: 3,
                        end_date: 4,

                    },
                ]
            },
            load_info_list: async function () {
                console.log('load_def_settings')
                // let response = await fetch("https://pedestal-test2.aiva-studio.ru/app/wallgames/info_list" + sessionStorage.getItem('auth_data_url'))
                let response = await fetch("https://pedestal-test2.aiva-studio.ru/app/wallgames/info_list" + '?vk_access_token_settings=friends%2Cphotos%2Cwall%2Cgroups&vk_app_id=7355601&vk_are_notifications_enabled=0&vk_group_id=195496572&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_user_id=312527953&vk_viewer_group_role=admin&sign=pRX7wFcULWKWDii8VrK8dzAj4Yjlf7o2FffOYSPD8OE')
                if (response.ok) {
                    this.games = await response.json()
                    // this.gameData.game = {...this.gameData.game, ...result}
                    console.log( this.games)
                }
                else {
                    console.log("Ошибка HTTP: " + response.status)
                }
            },
            transform_date: function () {

            },
            editItem (item) {
                console.log(item)
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)

            },
            deleteItem (item) {
                const index = this.games.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.games.splice(index, 1)
            },
            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
        },
        mounted:
            function () {
                this.load_info_list()
        },
    }
</script>

<style scoped>

</style>
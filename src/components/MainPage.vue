<template>
    <div>
        <v-tabs>
            <v-tab @change="show_main_page">Создать игру</v-tab>
            <v-tab @change="show_my_games">Мои игры</v-tab>
        </v-tabs>


        <div  v-show="main_obj.show_main_page">
        <v-row >
            <v-col>
                <v-card
                        class="mx-auto"
                        max-width="380"


                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline mb-4 x">Бесплатно</div>
                            <v-list-item-title class="headline mb-1">Угадай число</v-list-item-title>
                            <div></div>
                            <v-list-item-subtitle>Загадайте число. Тот из игроков, кто первым отгадает получит приз.</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar
                                class="n"
                                tile
                                size="80"
                                color="grey"
                        ><img
                                src="https://i.pinimg.com/originals/8d/03/11/8d031196b3321a44ab9823894bfc003a.png"
                                alt="John"
                        ></v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                        <v-btn color="primary" @click="show_game_guess_number" text>Перейти к настройкам</v-btn>
                        <v-btn color="primary" text>Подробнее</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col>
                <v-card
                        class="mx-auto"
                        max-width="380"
                        disabled


                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline mb-4">В разработке</div>
                            <v-list-item-title class="headline mb-1">XXXX XXXX XXXX</v-list-item-title>
                            <v-list-item-subtitle>xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar
                                class="n"
                                tile
                                size="80"
                                color="grey"
                        ><img
                                src="https://klonvk.ucoz.ru/_bd/5/551.jpg"
                                alt="John"
                        ></v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                        <v-btn color="primary" text>Перейти к настройкам</v-btn>
                        <v-btn color="primary" text>Подробнее</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

        </v-row>

    <v-row>
        <v-col>
            <v-card
                    class="mx-auto"
                    max-width="380"
                    disabled


            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">В разработке</div>
                        <v-list-item-title class="headline mb-1">XXXX XXXX XXXX</v-list-item-title>
                        <v-list-item-subtitle>xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar
                            class="n"
                            tile
                            size="80"
                            color="grey"
                    ><img
                            src="https://klonvk.ucoz.ru/_bd/5/551.jpg"
                            alt="John"
                    ></v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                    <v-btn color="primary" text>Перейти к настройкам</v-btn>
                    <v-btn color="primary" text>Подробнее</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col>
            <v-card
                    disabled
                    class="mx-auto"
                    max-width="380"
                    min-height=""

            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">В разработке</div>
                        <v-list-item-title class="headline mb-1">XXXX XXXX XXXX</v-list-item-title>
                        <v-list-item-subtitle>xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar
                            class="n"
                            tile
                            size="80"
                            color="grey"
                    ><img
                            src="https://klonvk.ucoz.ru/_bd/5/551.jpg"
                            alt="John"
                    ></v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                    <v-btn color="primary" text>Перейти к настройкам</v-btn>
                    <v-btn color="primary" text>Подробнее</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>

    </v-row>
            </div>
    </div>
</template>

<script>
    export default {
        model: {
            prop: 'main_obj',
        },
        props: ['main_obj'],
        data: () => ({

        }),
        methods: {
            show_my_games: function () {
                this.main_obj.show_my_games = true
                this.main_obj.show_main_page = false
            },
            show_main_page: function () {
                this.main_obj.show_my_games = false
                this.main_obj.show_main_page_tab = true
                this.main_obj.show_main_page = true
            },
            show_game_guess_number: function () {
                this.main_obj.show_my_games = false
                this.main_obj.show_main_page = false
                this.main_obj.show_main_page_tab = false
                this.main_obj.show_game_guess_number = true


            }
        }
    }
</script>

<style scoped>
    .n {
        border-radius: 10%;
    }
    .x  {
        color: #4CAF50;
    }

</style>
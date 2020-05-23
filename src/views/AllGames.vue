<template>
    <div>
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
                        <v-btn color="primary" to="/guess_number_settings" text>Перейти к настройкам</v-btn>
                        <v-btn color="primary" @click="go_description_page" text>Подробнее</v-btn>
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
                                src="/static/wallgames/image/dog.jpg"
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
                                src="/static/wallgames/image/dog.jpg"
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
                                src="/static/wallgames/image/dog.jpg"
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
</template>

<script>
    export default {
        name: "all_games",
        methods:
            {
                go_description_page: function() {
                    // document.location.href = 'https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-ugaday-chislo'
                    window.open ('https://vk.com/@pedestal-wallgames-opisanie?anchor=igra-ugaday-chislo', '_blank')
                }
            },
        mounted:
            sessionStorage.setItem('auth_data_url', document.location.search),
        function() {
            console.log('валере - ' + sessionStorage.getItem('auth_data_url'))
        }
    }
</script>

<style scoped>

</style>
<template>
    <v-form ref="covers" v-model="validation">
        <div class="p-0">
            <v-row class="mx-3 pt-1 mb-n1" justify="space-between">
                <v-col cols="12" xs="12" sm="2" class="pb-0 pl-0 mt-1">
                    <v-btn to='/covers_home_view' color="primary" small>
                        <v-icon class="pr-1" small>mdi-arrow-left-thick</v-icon>
                        Назад
                    </v-btn>
                </v-col>
                <v-col cols="12" xs="12" sm="3" class="pb-0">
                    <v-text-field
                            class="mt-0 pt-0 mb-n1"
                            label="Название обложки"
                            v-model="cover_name"
                            outlined
                            dense
                    ></v-text-field>
                </v-col>
                <v-col sm="4" cols="12" xs="12" align="right" class="pb-0">
                    <v-file-input
                            dense
                            outlined
                            v-model="image"
                            @input="create_bac"
                            @change="create"
                            accept="image/png, image/jpeg, image/jpg"
                            prepend-icon="mdi-download"
                            label="Загрузите изображение"
                            id="fileItem"
                            truncate-length="17"
                            :error-messages="mes_file_err"
                    ></v-file-input>
                </v-col>
                <v-col cols="1" class="pb-0 pt-2">
                    <v-btn @click="add_grid" icon large v-bind:class="{ primary_grid: grid }">
                        <v-icon>mdi-grid</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="12" xs="12" sm="2" class="pb-0 px-0 mt-1" align="right">
                    <v-btn
                            v-if='!$route.params.id || !/^[0-9]+$/.test(this.$route.params.id)'
                            @click="coverGroupAdd"
                            small
                            color="primary"
                            :loading="loading"
                            :disabled="loading"
                    >
                        Сохранить
                    </v-btn>
                    <v-btn
                            v-if='/^[0-9]+$/.test(this.$route.params.id)'
                            @click="coverGroupEdit"
                            small
                            color="primary"
                            :loading="loading"
                            :disabled="loading"
                    >
                        Сохранить
                    </v-btn>
                </v-col>

            </v-row>
            <!--        <v-img v-show="src === ''" src="/static/cover/default/cover_default.png"></v-img>-->
            <canvas id="canvas" class="relative" width="795" height="200"></canvas>

            <v-row class="mx-0">
                <v-col cols="12" class="px-0">
                    <v-tabs class="px-3" v-model="tab">
                        <v-tab @change="show_selected_tab('add_elem')">Добавить элемент</v-tab>
                        <v-tab @change="show_selected_tab('tab_editor')">Редактор</v-tab>
                        <v-tab @change="show_selected_tab('set_up_timer')">Настроить таймер</v-tab>
                        <v-tab @change="show_selected_tab('group_catalog')">Каталог обложек</v-tab>
                    </v-tabs>
                </v-col>
            </v-row>

            <v-row justify="center" class="mx-0" v-show="show_add_elem || show_tab_editor">
                <div v-show="show_add_elem" class="col1">
                    <v-row justify="space-around" class="my-2 mx-1">
                        <div class="el_div" @click="create_avatar_and_text_group('Самый активный', 'user_top')">
                            <v-icon color="primary" large>mdi-run-fast</v-icon>
                            <br>
                            <span>Самый<br>активный</span>
                        </div>
                        <div class="el_div"
                             @click="create_avatar_and_text_group('Лучший комментатор', 'user_top_by_comments')">
                            <v-icon color="primary" large>mdi-comment-text</v-icon>
                            <br>
                            <span>Лучший<br>комментатор</span>
                        </div>
                        <div class="el_div"
                             @click="create_avatar_and_text_group('Лучший автор', 'user_top_by_wall_posts')">
                            <v-icon color="primary" large>mdi-pencil</v-icon>
                            <br>
                            <span>Лучший<br>автор</span>
                        </div>
                        <div class="el_div" @click="create_avatar_and_text_group('Лучший лайкер', 'user_top_by_likes')">
                            <v-icon color="primary" large>mdi-cards-heart</v-icon>
                            <br>
                            <span>Лучший<br>лайкер</span>
                        </div>
                        <div class="el_div"
                             @click="create_avatar_and_text_group('Последний вступивший', 'user_last_group_joined')">
                            <v-icon color="primary" large>mdi-account-clock</v-icon>
                            <br>
                            <span>Последний<br>вступивший</span>
                        </div>
                    </v-row>
                    <v-row class="mx-1 mb-2" justify="space-around">
                        <div class="el_div" @click="create_text('Текст', 'text_plain')">
                            <v-icon color="primary" large>mdi-format-text-variant</v-icon>
                            <br>
                            <span>Свой<br>текст</span>
                        </div>
                        <!--                        <div class="el_div" @click="create_custom_shape">-->
                        <!--                        <div class="el_div_development">-->
                        <!--                            <v-icon color="primary" disabled large>mdi-checkbox-blank-outline</v-icon>-->
                        <!--                            <br>-->
                        <!--                            <span>Своя<br>фигура</span>-->
                        <!--                        </div>-->
                        <div class="el_div_development">
                            <v-icon color="primary" disabled large>mdi-lock-clock</v-icon>
                            <br>
                            <span>В<br>разработке</span>
                        </div>
                        <div class="el_div_development">
                            <v-icon color="primary" disabled large>mdi-lock-clock</v-icon>
                            <br>
                            <span>В<br>разработке</span>
                        </div>
                        <div class="el_div_development">
                            <v-icon color="primary" disabled large>mdi-lock-clock</v-icon>
                            <br>
                            <span>В<br>разработке</span>
                        </div>
                        <div class="el_div_development">
                            <v-icon color="primary" disabled large>mdi-lock-clock</v-icon>
                            <br>
                            <span>В<br>разработке</span>
                        </div>
                    </v-row>
                </div>
                <div v-show="show_tab_editor" class="col1">
                    <h4 v-show="!show_type1_editor && !show_type2_editor" align="center">Выберите элемент для
                        редактирования</h4>
                    <div v-show="show_type1_editor">
                        <v-row class="px-2 pb-0">
                            <v-col cols="4" class="pb-0">
                                <v-text-field
                                        :label='place_label'
                                        validate-on-blur
                                        :rules="rules_place"
                                        min="1"
                                        outlined
                                        dense
                                        v-model.number="place"
                                        type="number"
                                >
                                    <template v-if="place_label === 'Порядковый номер'" v-slot:append>
                                        <v-tooltip bottom color="rgba(48, 44, 44, 0.99)" max-width="280">
                                            <template v-slot:activator="{ on }">
                                                <v-icon class="mt2px" size="20" v-on="on">mdi-help-circle-outline
                                                </v-icon>
                                            </template>
                                            <span>1 - последний вступивший, 2 - предпоследний вступивший и так далее...</span>
                                        </v-tooltip>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="5"></v-col>
                            <v-col cols="3" align="right">
                                <v-btn text
                                       @click="go_description_page ('https://vk.com/@pedestal-covers?anchor=opisanie-vidzhetov')"
                                       class="mt6" color="rgba(0,0,0,.54)"
                                       small>О виджете
                                </v-btn>
                            </v-col>
                        </v-row>
                        <hr class="hr-dotted">
                        <h5 align="center" class="pb-3">Настройки аватара</h5>
                        <v-row class="px-2">
                            <v-col cols="3" class="py-0">
                                <v-text-field
                                        label='Координата X'
                                        outlined
                                        dense
                                        v-model.number="coordinateX"
                                        type="number"
                                        validate-on-blur
                                        :rules="rules_coordinate"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="3" class="py-0">
                                <v-text-field
                                        label='Координата Y'
                                        outlined
                                        dense
                                        v-model.number="coordinateY"
                                        type="number"
                                        validate-on-blur
                                        :rules="rules_coordinate"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="auto" class="py-0">
                                <v-text-field
                                        label='Диаметр'
                                        outlined
                                        dense
                                        v-model.number="diameter"
                                        min="30"
                                        max="100"
                                        type="number"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="auto" class="py-0">
                                <v-text-field
                                        label='Обводка'
                                        v-model.number="avatar_outline_size"
                                        outlined
                                        dense
                                        min="0"
                                        max="50"
                                        type="number"
                                        validate-on-blur
                                        :rules="rules_avatar_outline_size"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col v-show="avatar_outline_size > 0" cols="4" class="py-0">
                                <v-text-field
                                        label='Цвет обводки'
                                        v-model="avatar_outline_color"
                                        outlined
                                        dense
                                        @change="avatar_outline_color.length === 7 ? avatar_outline_color_picker = avatar_outline_color : false"
                                >
                                    <template #append>
                                        <v-btn @click="show_color_picker_avatar_outline_color = !show_color_picker_avatar_outline_color"
                                               icon small>
                                            <v-icon size="20" :color="avatar_outline_color">mdi-palette-outline</v-icon>
                                        </v-btn>
                                    </template>
                                </v-text-field>
                                <v-color-picker
                                        @update:color="avatar_outline_color = avatar_outline_color_picker"
                                        hide-inputs
                                        canvas-height="100"
                                        width="152"
                                        class="mt-n6"
                                        v-show="show_color_picker_avatar_outline_color"
                                        dot-size="11"
                                        hide-mode-switch
                                        v-model="avatar_outline_color_picker"
                                ></v-color-picker>
                            </v-col>
                        </v-row>
                        <hr class="hr-dotted">
                        <h5 align="center" class="pb-3">Настройки имени</h5>
                        <v-row class="px-2">
                            <v-col cols="5" class="py-0">
                                <v-select
                                        :items="user_name_align_items"
                                        dense
                                        label="Расположение"
                                        outlined
                                        v-model="user_name_align"
                                        xs="12"
                                        @change="user_name_align_fu">
                                </v-select>
                            </v-col>
                            <v-col cols="3" class="py-0">
                                <v-text-field
                                        label='Координата X'
                                        outlined
                                        dense
                                        v-model.number="user_name_distance_of_avatar_X"
                                        type="number"
                                        :disabled="user_name_align === 'center_bottom' || user_name_align === 'center_top'"
                                        validate-on-blur
                                        :rules="rules_coordinate"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="3" class="py-0">
                                <v-text-field
                                        label='Координата Y'
                                        outlined
                                        dense
                                        v-model.number="user_name_distance_of_avatar_Y"
                                        type="number"
                                        validate-on-blur
                                        :rules="rules_coordinate"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="5" class="py-0">
                                <v-select
                                        :items="user_name_font_family_items"
                                        dense
                                        label="Шрифт"
                                        outlined
                                        v-model="user_name_font_family"
                                        xs="12">
                                </v-select>
                            </v-col>
                            <v-col cols="3" class="py-0">
                                <v-text-field
                                        label='Размер'
                                        min="6"
                                        outlined
                                        dense
                                        v-model.number="user_name_font_size"
                                        type="number"
                                        validate-on-blur
                                        :rules="rules_font_size"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="4" class="py-0">
                                <v-text-field
                                        label='Цвет'
                                        outlined
                                        dense
                                        v-model.number="user_name_font_color"
                                        @input="user_name_font_color.length === 7 ? user_name_font_color_picker = user_name_font_color : false"
                                >
                                    <template #append>
                                        <v-btn @click="show_color_picker_user_name_font_color = !show_color_picker_user_name_font_color"
                                               icon small>
                                            <v-icon size="20" :color="user_name_font_color">mdi-palette-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    >
                                </v-text-field>
                                <v-color-picker
                                        @update:color="user_name_font_color = user_name_font_color_picker"
                                        hide-inputs
                                        canvas-height="100"
                                        width="152"
                                        class="mt-n6"
                                        v-show="show_color_picker_user_name_font_color"
                                        dot-size="11"
                                        hide-mode-switch
                                        v-model="user_name_font_color_picker"
                                ></v-color-picker>
                            </v-col>
                            <v-col cols="5" class="py-0">
                                <v-select
                                        :items="user_name_format_items"
                                        dense
                                        label="Формат"
                                        outlined
                                        v-model="user_name_format"
                                        xs="12">
                                </v-select>
                            </v-col>

                            <v-col v-if="user_name_format === 'all2lines'" cols="5" class="py-0">
                                <v-select
                                        :items="user_name2line_align_items"
                                        dense
                                        label="Выравнивание текста"
                                        outlined
                                        v-model="user_name2line_align"
                                        xs="12"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </div>
                    <div v-show="show_type2_editor">
                        <h5 align="center" class="pb-3">Настройки текста</h5>
                        <v-row class="px-2">
                            <v-col cols="3" class="py-0">
                                <v-text-field
                                        label='Координата X'
                                        outlined
                                        dense
                                        v-model.number="coordinateX"
                                        type="number"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="3" class="py-0">
                                <v-text-field
                                        label='Координата Y'
                                        outlined
                                        dense
                                        v-model.number="coordinateY"
                                        type="number"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="3" class="py-0">
                                <v-text-field
                                        label='Размер'
                                        min="6"
                                        outlined
                                        dense
                                        v-model.number="text_font_size"
                                        type="number"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="4" class="py-0">
                                <v-text-field
                                        label='Цвет'
                                        outlined
                                        dense
                                        v-model.number="text_font_color"
                                >
                                    <template #append>
                                        <v-btn @click="show_color_picker_text_font_color = !show_color_picker_text_font_color"
                                               icon small>
                                            <v-icon size="20" :color="text_font_color">mdi-palette-outline</v-icon>
                                        </v-btn>
                                    </template>
                                </v-text-field>
                                <v-color-picker
                                        @update:color="text_font_color = text_font_color_picker"
                                        hide-inputs
                                        canvas-height="100"
                                        width="152"
                                        class="mt-n6"
                                        v-show="show_color_picker_text_font_color"
                                        dot-size="11"
                                        hide-mode-switch
                                        v-model="text_font_color_picker"
                                ></v-color-picker>
                            </v-col>
                            <v-col cols="5" class="py-0">
                                <v-select
                                        :items="text_plain_align_items"
                                        dense
                                        label="Выравнивание текста"
                                        outlined
                                        v-model="text_plain_align"
                                        xs="12"
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="5" class="py-0">
                                <v-select
                                        :items="user_name_font_family_items"
                                        dense
                                        label="Шрифт"
                                        outlined
                                        v-model="text_font_family"
                                        xs="12">
                                </v-select>
                            </v-col>
                        </v-row>
                    </div>
                </div>
                <div class="col2">
                    <draggable
                            :list="rev"
                            :disabled="!enabled"
                            class="list-group py-2"
                            ghost-class="ghost"
                            @start="dragging = true"
                            @end="dragging = false"
                    >
                        <v-chip
                                id="chip_cover"
                                class="ma-1 mt-0 mb-2"
                                close
                                :color="element.color"
                                label
                                v-for="element in rev"
                                :key="element.id"
                                @click:close="consolel(element.id)"
                                @click="select_active_with_chip(element.id)"
                        >
                            {{ element.name }}
                        </v-chip>
                    </draggable>
                </div>
            </v-row>
            <!--        настроить таймер-->
            <div class="col3 mx-3" v-show="show_set_up_timer">
                <div class="mx-3 my-2">
                <span>Укажите, в какое время обложка будет доступна для установки в сообществе.
                    По умолчанию - круглосуточно.
                    <a href="https://vk.com/@pedestal-covers?anchor=individualnye-nastroyki-oblozhki"
                       target="_blank">Подробнее в инструкции</a>.
                </span>
                </div>
                <hr class="hr-dotted">
                <v-row align="center" class="mx-0">
                    <v-col cols="3">
                        <span>По времени: с</span>
                    </v-col>
                    <v-col cols="2">
                        <VueCtkDateTimePicker
                                id="time_start"
                                label="--:--"
                                format="HH:mm"
                                formatted="HH:mm"
                                onlyTime
                                right
                                noLabel
                                noShortcuts
                                noHeader
                                color=#4872a3
                                buttonColor=#4872a3
                                noButton
                                v-model="time_start"
                        />
                    </v-col>
                    <span>по</span>
                    <v-col cols="2">
                        <VueCtkDateTimePicker
                                id="time_end"
                                label="--:--"
                                format="HH:mm"
                                formatted="HH:mm"
                                color=#4872a3
                                buttonColor=#4872a3
                                onlyTime
                                right
                                noLabel
                                noShortcuts
                                noHeader
                                noButton
                                v-model="time_end"
                        />
                    </v-col>
                </v-row>
                <v-row align="center" class="mx-0 mt-3">
                    <v-col cols="3" class="pt-0 pb-6">
                        <span>По дням недели:</span>
                    </v-col>
                    <v-col cols="9" class="pl-0 py-0">
                        <v-container fluid class="py-0">
                            <v-select
                                    v-model="selected_days_of_the_week"
                                    :items="days_of_the_week"
                                    label="Дни недели"
                                    multiple
                                    outlined
                                    dense
                            >
                                <template v-slot:prepend-item>
                                    <v-list-item
                                            ripple
                                            @click="toggle"
                                    >
                                        <v-list-item-action>
                                            <v-icon :color="selected_days_of_the_week.length > 0 ? 'indigo darken-4' : ''">
                                                {{ icon }}
                                            </v-icon>
                                        </v-list-item-action>
                                        <v-list-item-content>
                                            <v-list-item-title>Ежедневно</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider class="mt-2"></v-divider>
                                </template>
                            </v-select>
                        </v-container>
                    </v-col>
                </v-row>
                <v-row align="center" class="mx-0 mt-n4">
                    <v-col cols="3">
                        <span>По датам:</span>
                    </v-col>
                    <v-col cols="5">
                        <VueCtkDateTimePicker
                                id="cover_enable_date"
                                format="YYYY-MM-DD"
                                formatted="ll"
                                label="Диапазон дат"
                                onlyDate
                                right
                                color=#4872a3
                                buttonColor=#4872a3
                                autoClose
                                noHeader
                                noLabel
                                range
                                noShortcuts
                                noButton
                                :minDate="minDate"
                                v-model="cover_enable_date"
                        />
                    </v-col>
                </v-row>
                <hr class="hr-dotted">
                <div class="mx-3 my-2">
                <span>Обратите внимание, частота обновления обложки в сообществе указывается в основном разделе настроек,
                    а здесь задаётся непосредственно время, когда конкретно эта обложка достуна для публикации в сообществе.
                    Если ограничить эту обложку по времени с 8:00 до 12:00, то она не сможет быть опубликована в другое
                    время. Это позволяет сделать утреннюю / дневную / вечернюю обложку.</span>
                </div>
            </div>
            <!--            каталог обложек-->
            <div v-show="show_group_catalog" class="relative" id="catalog" >
                <!--                <v-img-->
                <!--                        v-for="cover in cover_group_catalog"-->
                <!--                        :key="cover.id"-->
                <!--                        :src="'/static/cover/catalog/images/' + cover.id + '-min.jpg'"-->
                <!--                        src="https://sun9-38.userapi.com/tE-AO1xL7pSM1UhlQDb-XSpv6ATdIOJSUr4qIQ/nvjrGbyDiAQ.jpg"-->
                <!--                >{{cover.id}}</v-img>-->
<!--                :src="cover.show ? '/static/cover/catalog/images/' + cover.id + '_example.jpg' : '/static/cover/catalog/images/' + cover.id + '-min.jpg'"-->
                <v-img
                        @mouseenter="cover.show = true" @mouseleave="cover.show = false"
                        class="mb-3"
                        v-for="cover in cover_group_catalog"
                        :key="cover.id"
                        :src="cover.show ? '/static/cover/catalog/images/' + cover.id + '_example.jpg' : '/static/cover/catalog/images/' + cover.id + '-min.jpg'"
                >
                    <div id="catalog_line">

                    </div>
                    <v-btn
                            v-show="cover.show"
                            @click="create_url_name_author(+cover.id_author)"
                            small
                            color="#00000066"
                            id="name_author"
                            dark
                    >Автор: {{cover.name_author}}
                    </v-btn>
                    <v-btn
                            v-show="cover.show"
                            @click="use_catalog_cover(cover.background_url)"
                            id="catalog_btn_apply"
                            small
                            color="#00000066"
                            dark
                    >
                        Применить
                    </v-btn>
                    <v-btn
                            v-show="cover.show"
                            @click="go_description_page('/static/cover/catalog/images/' + cover.id + '.rar')"
                            id="catalog_btn_save_psd"
                            small
                            color="#00000066"
                            dark
                    >Скачать PSD
                    </v-btn>
                </v-img>

            </div>
        </div>
    </v-form>
</template>

<script>
    import {fabric} from 'fabric'
    import draggable from 'vuedraggable'
    import auto_resize from '@/mixins/auto_resize'
    import bridge from "@vkontakte/vk-bridge";

    export default {
        display: "Simple",
        order: 0,
        components: {
            draggable,
        },
        mixins: [auto_resize],
        data: () => ({
            show_catalog_btn: false,
            cover_group_catalog: [{id: "1000", name: "", id_author: "527248538", name_author: "Айза Жакина", show: true}],
            loader: 'loading',
            loading: false,
            time_start: '00:00',
            time_end: '00:00',
            settings: {
                auth_data: ''
            },
            validation: true,
            id: 0,
            value: '14-01-2019',
            cover_enable_date: {
                start: "",
                end: "",
            },
            src: '',
            tab: '',
            image: null,
            canvas: null,
            clone: '',
            rev: [],
            arr: [],
            list_оf_items: [],
            enabled: true,
            dragging: false,
            show_color_picker_avatar_outline_color: false,
            show_color_picker_user_name_font_color: false,
            show_color_picker_text_font_color: false,
            group: [],
            colo: '',
            y: '',
            x: '',
            mes_file_err: '',
            name: '',
            clipTo: null,
            show_tab_editor: false,
            show_add_elem: true,
            show_set_up_timer: false,
            show_group_catalog: false,
            show_type1_editor: false,
            show_type2_editor: false,
            coordinateX: '',
            coordinateY: '',
            diameter: '',
            text_plain_align: 'left',
            cover_default_image: true,
            user_name_distance_of_avatar_Y: '',
            user_name_distance_of_avatar_X: '',
            user_name_font_size: '',
            text_font_size: '',
            user_name_font_color: '',
            text_font_color: '',
            avatar_outline_size: '',
            avatar_outline_color: '',
            avatar_outline_color_picker: '#FF0000',
            user_name_font_color_picker: '#000000',
            text_font_color_picker: '#000000',
            place: '',
            user_name_font_family: '',
            text_font_family: '',
            user_name_format: '',
            place_label: '',
            user_name_align: 'center_bottom',
            user_name2line_align: 'center',
            cover_name: 'Обложка',
            grid: false,
            user_name_font_family_items: [
                {value: 'Adine Kirnberg', text: 'Adine Kirnberg'},
                // {value: 'Bad Script Regular', text: 'Bad Script Regular'},
                {value: 'Bandy Cyr', text: 'Bandy Cyr'},
                {value: 'DS Arabic', text: 'DS Arabic'},
                {value: 'DS Note', text: 'DS Note'},
                // {value: 'Font_Heads', text: 'Font Heads'},
                {value: 'Geisha', text: 'Geisha'},
                // {value: 'Roboto-Medium', text: 'Roboto Medium'},
                {value: 'Times New Roman', text: 'Times New Roman'},
                {value: 'Ticker Tape', text: 'Ticker Tape'},
                {value: 'Victorian Gothic Two', text: 'Victorian Gothic Two'},
                // {value: 'Washington', text: 'Washington'},
            ],
            user_name_format_items: [
                {value: 'all1line', text: 'Имя Фамилия 1 строка'},
                {value: 'all2lines', text: 'Имя Фамилия 2 строки'},
                {value: 'name', text: 'Имя'},
                {value: 'surname', text: 'Фамилия'},
                {value: 'undef', text: 'Без подписи'},
            ],
            user_name_align_items: [
                {value: 'center_bottom', text: 'По центру снизу'},
                {value: 'center_top', text: 'По центру сверху'},
                {value: 'left', text: 'Слева'},
                {value: 'right', text: 'Справа'},
            ],
            user_name2line_align_items: [
                {value: 'center', text: 'По центру'},
                {value: 'left', text: 'По левомому краю'},
                {value: 'right', text: 'По правому краю'},
            ],
            text_plain_align_items: [
                {value: 'center', text: 'По центру'},
                {value: 'left', text: 'По левомому краю'},
                {value: 'right', text: 'По правому краю'},
            ],
            days_of_the_week: [
                {value: 1, text: 'Понедельник'},
                {value: 2, text: 'Вторник'},
                {value: 3, text: 'Среда'},
                {value: 4, text: 'Четверг'},
                {value: 5, text: 'Пятница'},
                {value: 6, text: 'Суббота'},
                {value: 7, text: 'Воскресенье'},
            ],
            selected_days_of_the_week: [1, 2, 3, 4, 5, 6, 7],
        }),
        mounted:
            async function () {
                this.getAllUrlParams()

                this.canvas = new fabric.Canvas('canvas')
                fabric.util.addListener(fabric.document, 'keyup', this.keyboard_move)
                // fabric.Group.prototype.lockScalingX = true;
                // fabric.Group.prototype.lockScalingY = true;
                this.canvas.on('selection:updated', this.select_active_with_canvas)
                this.canvas.on('selection:created', this.select_active_with_canvas)
                this.canvas.on('selection:cleared', this.select_active_with_canvas)
                this.canvas.on('object:moved', this.show_current_coordinates)
                this.canvas.on('KeyDown', this.test)
                fabric.minCacheSideLimit = 1600
                if (this.$route.params.id) {
                    await this.deserialization()
                } else {
                    this.canvas.setOverlayImage('/static/cover/default/cover_default.png', this.canvas.renderAll.bind(this.canvas), {excludeFromExport: true})
                }
                if (this.$route.params.id && !/^[0-9]+$/.test(this.$route.params.id)) {
                    this.cover_name += ' copy'
                }
                setTimeout(this.auto_resize, 500)
                setTimeout(this.auto_resize, 500)
            },
        computed: {
            likesAllFruit() {
                return this.selected_days_of_the_week.length === this.days_of_the_week.length
            },
            likesSomeFruit() {
                return this.selected_days_of_the_week.length > 0 && !this.likesAllFruit
            },
            icon() {
                if (this.likesAllFruit) return 'mdi-close-box'
                if (this.likesSomeFruit) return 'mdi-minus-box'
                return 'mdi-checkbox-blank-outline'
            },
            cover_enable_weekdays() {
                let weekdays = ''
                for (let i = 0; i < this.selected_days_of_the_week.length; i++) {
                    weekdays = weekdays + String(this.selected_days_of_the_week[i])
                }
                return weekdays
            },
            minDate() {
                let date = new Date()
                date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() + 15)
                return date
            },
            rules_coordinate() {
                return [
                    v => (!!v || v === 0) || 'Недопустимый формат',
                    v => /-?[0-9]+/.test(v) || 'Недопустимый формат',
                    v => /^-?[0-9]{1,3}$/g.test(v) || 'Не более 3 символов'
                ]
            },
            rules_font_size() {
                return [
                    v => !!v || 'Недопустимый формат',
                    v => v >= 6 || 'Не менее 6',
                    v => /^[0-9]{1,3}$/g.test(v) || 'Не более 3 символов'
                ]
            },
            rules_place() {
                return [
                    v => !!v || 'Недопустимый формат',
                    v => v >= 1 || 'Недопустимый формат',
                    v => v <= 300 || 'Не более 300',
                ]
            },
            rules_avatar_outline_size() {
                return [
                    v => (!!v || v === 0) || 'Недопустимый формат',
                    v => v >= 0 || 'Недопустимый формат',
                    v => v <= 50 || 'Не более 50',
                ]
            }
        },
        watch: {
            'canvas._objects': function () {
                this.canvas.renderAll();
            },
            rev: function () {
                this.arr = this.rev.slice().reverse()
                for (let i = 0; i < this.arr.length; i++) {
                    this.canvas.moveTo(this.arr[i], i);
                }
                this.canvas.renderAll();
            },
            coordinateX: function () {
                this.manual_coordinate_change()
            },

            coordinateY: function () {
                this.manual_coordinate_change()
            },
            user_name_distance_of_avatar_Y: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject._objects[1].set({
                    top: this.user_name_distance_of_avatar_Y,
                })
                this.canvas.renderAll()
            },
            user_name_distance_of_avatar_X: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject._objects[1].set({
                    left: this.user_name_distance_of_avatar_X,
                })
                this.canvas.renderAll()
            },
            place: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject.set({
                    place: this.place,
                    name: activeObject.name2 + "_" + this.place
                })
                this.canvas.renderAll()
            },
            user_name_font_size: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject._objects[1].set({
                    fontSize: this.user_name_font_size,
                })
                this.canvas.renderAll()
            },
            user_name2line_align: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject._objects[1].set({
                    textAlign: this.user_name2line_align,
                })
                this.canvas.renderAll()
            },
            // itext
            text_plain_align() {
                let activeObject = this.canvas.getActiveObject()
                activeObject.set({
                    textAlign: this.text_plain_align,
                })
                this.canvas.renderAll()
            },
            text_font_color: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject.set({
                    fill: this.text_font_color,
                })
                this.canvas.renderAll()
            },
            text_font_size: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject.set({
                    fontSize: this.text_font_size,
                })
                this.canvas.renderAll()
            },
            user_name_font_color: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject._objects[1].set({
                    fill: this.user_name_font_color,
                })
                this.canvas.renderAll()
            },
            user_name_font_family: function () {
                let activeObject = this.canvas.getActiveObject()
                // console.log(activeObject)
                if (this.user_name_font_family !== 'Times New Roman') {
                    this.loadAndUse(this.user_name_font_family)
                } else {
                    activeObject._objects[1].set({
                        fontFamily: this.user_name_font_family,
                    })
                    this.canvas.renderAll()
                }
            },
            text_font_family: function () {
                let activeObject = this.canvas.getActiveObject()
                if (this.text_font_family !== 'Times New Roman') {
                    this.loadAndUse(this.text_font_family)
                } else {
                    activeObject.set({
                        fontFamily: this.text_font_family,
                    })
                    this.canvas.renderAll()
                }
            },
            user_name_format: function () {
                let activeObject = this.canvas.getActiveObject()
                if (this.user_name_format === 'all1line') {
                    activeObject._objects[1].set({
                        user_name_format: this.user_name_format,
                        text: 'Имя Фамилия'
                    })
                } else if (this.user_name_format === 'name') {
                    activeObject._objects[1].set({
                        user_name_format: this.user_name_format,
                        text: 'Имя'
                    })
                } else if (this.user_name_format === 'surname') {
                    activeObject._objects[1].set({
                        user_name_format: this.user_name_format,
                        text: 'Фамилия'
                    })
                } else if (this.user_name_format === 'all2lines') {
                    activeObject._objects[1].set({
                        user_name_format: this.user_name_format,
                        text: 'Имя\nФамилия'
                    })
                } else if (this.user_name_format === 'undef') {
                    activeObject._objects[1].set({
                        user_name_format: this.user_name_format,
                        text: ''
                    })
                }
                this.canvas.renderAll()
            },
            diameter: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject._objects[0].set({
                    radius: this.diameter / 2,
                    top: 0,
                    left: 0
                })
                activeObject._objects[2].set({
                    y1: -this.diameter / 2,
                    y2: -this.diameter / 2
                })
                activeObject._objects[3].set({
                    x1: -this.diameter / 2,
                    x2: -this.diameter / 2
                })
                this.canvas.renderAll()
            },
            avatar_outline_size: function () {
                let activeObject = this.canvas.getActiveObject()
                if (this.avatar_outline_size === 0) {
                    activeObject._objects[0].set({
                        strokeWidth: 0
                    })
                }
                activeObject._objects[0].set({
                    strokeWidth: this.avatar_outline_size * 2
                })
                this.canvas.renderAll()
            },
            avatar_outline_color: function () {
                // this.avatar_outline_color_picker = this.avatar_outline_color
                let activeObject = this.canvas.getActiveObject()
                activeObject._objects[0].set({
                    stroke: this.avatar_outline_color
                })
                this.canvas.renderAll()
            },
        },
        methods: {
            create_url_name_author: function (id) {
                if (id >= 0) {
                    this.go_description_page("https://vk.com/id" + id)
                } else if (id < 0) {
                    this.go_description_page("https://vk.com/club" + id)
                }
            },
            use_catalog_cover: function (url) {
                // this.src = 'https://' + location.hostname + '/static/cover/catalog/images/' + id + '.jpg'
                this.src = url
                this.create_bac()
                this.show_selected_tab('add_elem')
                bridge.send("VKWebAppScroll", {"top": 0, "speed": 600})
            },
            validateField() {
                this.$refs.covers.validate()
            },
            keyboard_move(e) {
                let activeObject = this.canvas.getActiveObject()
                // console.log(activeObject)
                if (activeObject && e.path.length <= 4) {
                    if (e.code === "ArrowLeft" && e.ctrlKey === true) {
                        activeObject.set({
                            left: activeObject.left - 1
                        })
                        this.coordinateX = activeObject.left
                    } else if (e.code === "ArrowRight" && e.ctrlKey === true) {
                        activeObject.set({
                            left: activeObject.left + 1
                        })
                        this.coordinateX = activeObject.left
                    } else if (e.code === "ArrowDown" && e.ctrlKey === true) {
                        activeObject.set({
                            top: activeObject.top + 1
                        })
                        this.coordinateY = activeObject.top
                    } else if (e.code === "ArrowUp" && e.ctrlKey === true) {
                        activeObject.set({
                            top: activeObject.top - 1
                        })
                        this.coordinateY = activeObject.top
                    } else if (e.code === "Delete") {
                        this.consolel(activeObject.id)
                    }
                    this.canvas.renderAll()
                }
            },
            loadAndUse(font) {
                let FontFaceObserver = require('fontfaceobserver');
                let myfont = new FontFaceObserver(font)
                myfont.load()
                    .then(this.upload_on_fabric
                    ).catch(function (e) {
                    console.log(e)
                    console.log('font loading failed ')
                });
            },
            upload_on_fabric() {
                let activeObject = this.canvas.getActiveObject()
                if (activeObject.type_elem == 1) {
                    activeObject._objects[1].set({
                        fontFamily: this.user_name_font_family,
                    })
                } else if (activeObject.type_elem == 2) {
                    activeObject.set({
                        fontFamily: this.text_font_family,
                    })
                }
                this.canvas.renderAll()
            },
            user_name_align_fu() {
                let activeObject = this.canvas.getActiveObject()
                let radius = Math.round(activeObject._objects[0].get('radius'))
                let avatar_outline_size = activeObject._objects[0].get('strokeWidth')
                let height_text = activeObject._objects[1].get('height')

                if (this.user_name_align === 'center_bottom') {
                    let size = radius + avatar_outline_size + Math.round(height_text) + 10
                    activeObject._objects[1].set({
                        originX: 'center',
                        originY: 'bottom',
                        top: size,
                        left: 0,
                        user_name_align: 'center_bottom'
                    })
                    this.user_name_distance_of_avatar_X = 0
                    this.user_name_distance_of_avatar_Y = size
                }
                if (this.user_name_align === 'center_top') {
                    let size = -(radius + avatar_outline_size + 10)
                    activeObject._objects[1].set({
                        originX: 'center',
                        originY: 'bottom',
                        top: size,
                        left: 0,
                        user_name_align: 'center_top'
                    })
                    this.user_name_distance_of_avatar_X = 0
                    this.user_name_distance_of_avatar_Y = size
                }
                if (this.user_name_align === 'right') {
                    let size_left = radius + avatar_outline_size + 10
                    let size_top = Math.round(activeObject._objects[1].fontSize * 0.6)
                    activeObject._objects[1].set({
                        originX: 'left',
                        originY: 'bottom',
                        top: size_top,
                        left: size_left,
                        user_name_align: 'right'
                    })
                    this.user_name_distance_of_avatar_X = size_left
                    this.user_name_distance_of_avatar_Y = size_top
                }
                if (this.user_name_align === 'left') {
                    let size_left = -(radius + avatar_outline_size + 10)
                    let size_top = Math.round(activeObject._objects[1].fontSize * 0.6)
                    activeObject._objects[1].set({
                        originX: 'right',
                        originY: 'bottom',
                        top: size_top,
                        left: size_left,
                        user_name_align: 'left'
                    })
                    this.user_name_distance_of_avatar_X = size_left
                    this.user_name_distance_of_avatar_Y = size_top
                }
                this.canvas.renderAll();
                this.auto_resize()
            },
            cover_enable_time_start() {
                if (this.time_start) {
                    let sec = (Date.parse('2012-01-26T' + this.time_start) - Date.parse('2012-01-26T00:00')) / 1000
                    return sec
                } else return 0
            },
            cover_enable_time_stop() {
                if (this.time_end) {
                    let sec = (Date.parse('2012-01-26T' + this.time_end) - Date.parse('2012-01-26T00:00')) / 1000
                    return sec
                } else return 0
            },
            cover_enable_date_start() {
                if (this.cover_enable_date && this.cover_enable_date.start) {
                    return Date.parse(this.cover_enable_date.start) / 1000
                } else return 0
            },
            cover_enable_date_stop() {
                if (this.cover_enable_date && this.cover_enable_date.end) {
                    return Date.parse(this.cover_enable_date.end) / 1000
                } else return 0
            },
            toggle() {
                this.$nextTick(() => {
                    if (this.likesAllFruit) {
                        this.selected_days_of_the_week = []
                    } else {
                        this.selected_days_of_the_week = this.days_of_the_week.map(item => item.value)
                    }
                })
            },
            serialization: function () {
                let cover_data_front = JSON.stringify(this.canvas.toJSON(["name", "hasControls", "id", "name2", "type_elem", "place", "widgets_type", "user_name_format", "user_name_align", "color"]))
                return cover_data_front
            },
            deserialization: async function () {
                let cover_data_front = await this.coverGroupGet()
                this.canvas.loadFromJSON(cover_data_front)
                this.canvas.renderAll()
                this.data_canvas()
                this.create_bac()
            },
            coverGroupGetListAll: async function () {
                let response = await fetch('/api/coverGroupGetListAll.php' + sessionStorage.getItem('auth_data_url') + '&covers_count=100')
                if (response.ok) {
                    let answer = await response.json()
                    console.log(answer)
                }
            },
            coverGroupCatalogGet: async function () {
                let response = await fetch('/api/coverGroupCatalogGet.php' + sessionStorage.getItem('auth_data_url'))
                if (response.ok) {
                    let answer = await response.json()

                    for (let i = 0; i < answer.covers.length; i++) {
                        answer.covers[i].show = false
                    }
                    this.cover_group_catalog = answer.covers
                    console.log(answer.covers)
                }
                setTimeout(this.auto_resize, 500)
            },
            coverGroupGet: async function () {
                let id = this.$route.params.id.replace(/[^\d]/g, '')
                let response = await fetch('/api/coverGroupGet.php' + sessionStorage.getItem('auth_data_url') + '&cover_id=' + id)
                if (response.ok) {
                    let answer = await response.json()
                    // console.log(answer)
                    // let cover_data = JSON.parse(answer.cover_data)
                    this.define_end_id(JSON.parse(answer.cover_data_front))
                    this.src = answer.background_url
                    this.cover_name = answer.name

                    this.selected_days_of_the_week.splice(0, this.selected_days_of_the_week.length)
                    for (let i = 0; i < answer.enable_weekdays.length; i++) {
                        this.selected_days_of_the_week.push(+answer.enable_weekdays[i])
                    }

                    if (+answer.enable_date_start !== 0) {
                        this.cover_enable_date.start = new Date(+answer.enable_date_start * 1000)
                    }
                    if (+answer.enable_date_stop !== 0) {
                        this.cover_enable_date.end = new Date(+answer.enable_date_stop * 1000)
                    }

                    let start = new Date(+answer.enable_time_start * 1000)
                    let stop = new Date(+answer.enable_time_stop * 1000)
                    this.time_end = String(stop.getUTCHours() + ':' + stop.getUTCMinutes())
                    this.time_start = String(start.getUTCHours() + ':' + start.getUTCMinutes())

                    return answer.cover_data_front
                }
            },
            define_end_id: function (cover_data_front) {
                for (let i = 0; i < cover_data_front.objects.length; i++) {
                    if (cover_data_front.objects[i].id >= this.id) {
                        this.id = cover_data_front.objects[i].id + 1
                    }
                }
            },
            create_obj_for_send_server: function () {
                let widgets = []
                this.canvas._objects.forEach(function (item) {
                    let obj = {}
                    // type = 1 аватар + подпись
                    if (item.type_elem === 1) {
                        obj.x = item.left
                        obj.y = item.top
                        if (item.widgets_type === 'user_last_group_joined') {
                            obj.place_from_last = item.place
                        } else {
                            obj.place = item.place
                        }
                        obj.avatar_size = item._objects[0].radius * 2
                        obj.avatar_outline_size = item._objects[0].strokeWidth / 2
                        obj.avatar_outline_color = item._objects[0].stroke

                        obj.user_name_distance_x = item._objects[1].left
                        // if (item._objects[1].user_name_align === "right" || item._objects[1].user_name_align === "left") {
                        //     obj.user_name_distance_y = item._objects[1].top - Math.round(item._objects[1].fontSize * 0.26)
                        // } else {
                        //     obj.user_name_distance_y = item._objects[1].top
                        // }
                        obj.user_name_distance_y = item._objects[1].top - Math.round(item._objects[1].fontSize * 0.26)
                        obj.user_name_font_size = item._objects[1].fontSize
                        obj.user_name_font_family = item._objects[1].fontFamily
                        obj.user_name_font_color = item._objects[1].fill
                        if (item._objects[1].user_name_align === 'center_top' || item._objects[1].user_name_align === 'center_bottom') {
                            obj.user_name_align = 'center'
                        } else if (item._objects[1].user_name_align === 'left') {
                            obj.user_name_align = 'right'
                        } else if (item._objects[1].user_name_align === 'right') {
                            obj.user_name_align = 'left'
                        }
                        obj.user_name2line_align = item._objects[1].textAlign
                        obj.user_name_format = item._objects[1].user_name_format
                    } else if (item.type_elem === 2) {
                        // console.log(item)
                        obj.texts = []
                        obj.texts.push(item.text)
                        obj.font_size = item.fontSize
                        obj.font_family = item.fontFamily
                        obj.align = item.textAlign
                        obj.font_color = item.fill
                        // obj.width = item.width
                        if (item.fontFamily === 'Washington') {
                            obj.y = Math.round(item.top - item.fontSize * 0.27)
                        } else if (item.fontFamily === 'Adine Kirnberg') {
                            obj.y = Math.round(item.top + item.fontSize * 0.215)
                        } else if (item.fontFamily === 'DS Arabic') {
                            obj.y = Math.round(item.top + item.fontSize * 0.23)
                        } else if (item.fontFamily === 'Geisha') {
                            obj.y = Math.round(item.top - item.fontSize * 0.13)
                        } else {
                            obj.y = Math.round(item.top)
                        }
                        obj.x = Math.round(item.left)

                        // obj.y = item.top - item.fontSize - Math.round(item.fontSize * 0.13)
                    }
                    obj.type = item.widgets_type

                    // obj.x = item.left
                    // obj.y = item.top
                    widgets.push(obj)
                });
                // console.log(widgets)
                return widgets
            },
            manual_coordinate_change: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject.set({
                    left: this.coordinateX,
                    top: this.coordinateY,
                }).setCoords();
                this.canvas.renderAll()
            },
            show_selected_tab: async function (selected_tab) {
                if (selected_tab === 'tab_editor') {
                    this.show_tab_editor = true
                    this.show_add_elem = false
                    this.show_set_up_timer = false
                    this.show_group_catalog = false
                } else if (selected_tab === 'add_elem') {
                    this.show_tab_editor = false
                    this.show_add_elem = true
                    this.show_set_up_timer = false
                    this.show_group_catalog = false
                } else if (selected_tab === 'set_up_timer') {
                    this.show_tab_editor = false
                    this.show_add_elem = false
                    this.show_set_up_timer = true
                    this.show_group_catalog = false
                } else if (selected_tab === 'group_catalog') {
                    await this.coverGroupCatalogGet()
                    this.show_tab_editor = false
                    this.show_add_elem = false
                    this.show_set_up_timer = false
                    this.show_group_catalog = true
                    this.auto_resize()
                }
            },
            show_current_coordinates: function (e) {
                this.coordinateX = Math.round(e.target.left)
                this.coordinateY = Math.round(e.target.top)
            },
            render_active_list_cover: function () {
                this.rev.push('')
                this.rev.splice(this.rev.length - 1, 1)
            },
            select_active_with_canvas: function (e) {
                console.log(e)
                if (e.deselected && e.deselected.length && e.deselected[0].type_elem === 1) {
                    e.deselected[0]._objects[2].set({
                        strokeDashArray: [0, 5]
                    })
                    e.deselected[0]._objects[3].set({
                        strokeDashArray: [0, 5]
                    })
                    this.canvas.renderAll()
                }
                if (e.target && e.selected.length === 1) {
                    this.tab = 1
                    this.show_selected_tab('tab_editor')
                    this.coordinateY = Math.round(e.target.top)
                    this.coordinateX = Math.round(e.target.left)
                    // виджет текст
                    if (e.target.type_elem === 2) {
                        this.text_font_size = e.target.fontSize
                        this.text_font_color = e.target.fill
                        this.text_plain_align = e.target.textAlign
                        this.text_font_family = e.target.fontFamily
                    } else if (e.target.type_elem === 1) {
                        // виджет аватар + текст
                        e.target._objects[2].set({
                            strokeDashArray: [5, 5]
                        })
                        e.target._objects[3].set({
                            strokeDashArray: [5, 5]
                        })
                        this.canvas.renderAll()


                        if (e.target.name2 !== 'Последний вступивший') {
                            this.place_label = 'Место в рейтинге'
                        } else {
                            this.place_label = 'Порядковый номер'
                        }
                        this.place = +e.target.place
                        this.diameter = e.target._objects[0].radius * 2
                        this.avatar_outline_size = e.target._objects[0].strokeWidth / 2
                        this.avatar_outline_color = e.target._objects[0].stroke
                        this.avatar_outline_color_picker = e.target._objects[0].stroke
                        this.user_name_distance_of_avatar_Y = e.target._objects[1].top
                        this.user_name_distance_of_avatar_X = e.target._objects[1].left
                        this.user_name_font_color = e.target._objects[1].fill
                        this.user_name_font_size = e.target._objects[1].fontSize
                        this.user_name_font_family = e.target._objects[1].fontFamily
                        this.user_name_format = e.target._objects[1].user_name_format
                        this.user_name_align = e.target._objects[1].user_name_align
                        this.user_name2line_align = e.target._objects[1].textAlign
                    }
                } else if (e.target && e.selected.length > 1) {
                    e.target.set({
                        lockScalingX: true,
                        lockScalingY: true,
                        lockRotation: true,
                    })
                }
                for (let item of this.rev) {
                    item.color = '#f5f7fa'
                    this.render_active_list_cover()
                }
                let activeObjects = this.canvas.getActiveObjects()
                if (!activeObjects) return
                for (let item of activeObjects) {
                    item.color = 'primary'
                    this.render_active_list_cover()
                }
                this.show_settings_editor()
            },
            show_settings_editor: function () {
                let activeObjects = this.canvas.getActiveObjects()
                if (activeObjects.length === 1) {
                    // type = 1 аватар + текст
                    if (activeObjects[0].type_elem === 1) {
                        this.show_type1_editor = true
                        this.show_type2_editor = false
                    } else if (activeObjects[0].type_elem === 2) {
                        this.show_type1_editor = false
                        this.show_type2_editor = true
                    }
                } else {
                    this.show_type1_editor = false
                    this.show_type2_editor = false
                }
            },
            select_active_with_chip: function (id) {
                this.tab = 1
                this.show_selected_tab('tab_editor')
                if (typeof id === 'number') {
                    let object = this.canvas._objects.find(item => item.id === id)
                    this.canvas.setActiveObject(object)
                    this.canvas.requestRenderAll()
                }
            },
            create: async function () {
                if (this.image) {
                    let reader = new FileReader()
                    const regex = /^(?:.*\.(?=(jpg|jpeg|png|gif)$))?[^.]*$/i
                    if (this.image.name.match(regex)) {
                        reader.onload = this.onload
                        reader.readAsDataURL(this.image)
                        setTimeout(this.create_bac, 1000)
                    }
                } else {
                    this.image = null
                    this.src = ''
                    this.canvas.setBackgroundImage(null, this.canvas.renderAll.bind(this.canvas));
                }
            },
            onload: function (e) {
                let img = new Image()
                img.onload = this.onload_img
                this.src = e.target.result
                img.src = e.target.result
            },
            onload_img: function (e) {
                // Per the above, get the path if we can
                let path = e.path || (e.composedPath && e.composedPath());

                // Show it if we got it
                if (path) {
                    // console.log("Path (" + path.length + ")");
                    Array.prototype.forEach.call(
                        path,
                        function (entry) {
                            console.log(entry.nodeName);
                        }
                    );
                }
                let width = path[0].width
                let height = path[0].height
                if (width !== 1590 || height !== 400) {
                    this.mes_file_err = 'загружаемое изображение должно быть разрешением 1590х400'
                    this.src = ''
                }
            },
            consolel: function (id) {
                let position = this.canvas._objects.findIndex(item => item.id === id)
                this.canvas._objects.splice(position, 1)
                this.rev = this.canvas._objects.slice().reverse()
            },
            del_cover_default_image() {
                if (this.cover_default_image) {
                    this.canvas.setOverlayImage('/static/cover/default/transparent.png', this.canvas.renderAll.bind(this.canvas), {excludeFromExport: true})
                    this.cover_default_image = false
                }
            },
            create_custom_shape: function () {
                this.del_cover_default_image()
                let rect = new fabric.Rect({
                    left: 100,
                    top: 50,
                    fill: '#D81B60',
                    width: 25,
                    height: 25,
                    strokeWidth: 2,
                    stroke: "#880E4F",
                    rx: 10,
                    ry: 10,
                    angle: 0,
                    scaleX: 3,
                    scaleY: 3,
                    hasControls: false
                })
                rect.toObject = (function (toObject) {
                    return function () {
                        return fabric.util.object.extend(toObject.call(this), {
                            name: this.name,
                            id: this.id,
                        });
                    };
                })(rect.toObject)
                rect.name = 'Своя фигура'
                rect.id = this.id++

                this.canvas.add(rect)
                this.canvas.renderAll()
                this.data_canvas()
            },
            create_avatar_and_text_group: function (name, widgets_type) {
                this.del_cover_default_image()

                let Circle = new fabric.Circle({
                    left: 0,
                    top: 0,
                    fill: 'green',
                    radius: 25,
                    strokeUniform: true,
                    originX: 'center',
                    originY: 'center',
                    strokeWidth: 0,
                    paintFirst: 'stroke',
                    stroke: '#ff0000',
                    hasControls: false,
                })
                Circle.setGradient('fill', {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: Circle.height,
                    colorStops: {
                        0: 'yellow',
                        1: 'green'
                    }
                });
                // добавляем свои классы на окружность
                Circle.toObject = (function (toObject) {
                    return function () {
                        return fabric.util.object.extend(toObject.call(this), {
                            name: this.name,
                            id: this.id
                        });
                    };
                })(Circle.toObject)
                Circle.name = name + ' (аватар)'
                Circle.id = this.id

                let Line_x = new fabric.Line([-795, -Circle.get('radius'), 795, -Circle.get('radius')], {
                    strokeDashArray: [0, 5],
                    stroke: '#d3d9de'
                })
                let Line_y = new fabric.Line([-Circle.get('radius'), -200, -Circle.get('radius'), 200], {
                    strokeDashArray: [0, 5],
                    stroke: '#d3d9de'
                })

                let group = new fabric.Group([Circle], {
                    left: 100,
                    top: 100,
                    originX: 'center',
                    originY: 'center',
                    hasControls: false,
                    borderColor: '#ffffff00',
                    perPixelTargetFind: true
                })

                group.toObject = (function (toObject) {
                    return function () {
                        return fabric.util.object.extend(toObject.call(this), {
                            widgets_type: this.widgets_type,
                            name: this.name,
                            name2: this.name2,
                            id: this.id,
                            type_elem: this.type_elem,
                            place: this.place,
                            place_from_last: this.place_from_last,
                            hasControls: false,
                            color: this.color,
                        });
                    };
                })(group.toObject)

                group.name = name + '_1'
                group.color = '#f5f7fa'
                group.name2 = name
                group.id = this.id
                group.widgets_type = widgets_type
                group.type_elem = 1
                group.place = 1

                let Text = new fabric.Text("Имя Фамилия", {
                    textAlign: 'center',
                    left: 0,
                    fontFamily: 'Times New Roman',
                    fontSize: 14,
                    originX: 'center',
                    originY: 'bottom',
                    fill: '#000000',
                    top: 51,
                    lineHeight: 0.88,
                    fontWeight: 510,

                })
                Text.toObject = (function (toObject) {
                    return function () {
                        return fabric.util.object.extend(toObject.call(this), {
                            name: this.name,
                            user_name_format: this.user_name_format,
                            id: this.id,
                            user_name_align: this.user_name_align,
                        });
                    };
                })(Text.toObject)
                Text.user_name_align = 'center_bottom'
                Text.name = name + ' (имя)'
                Text.user_name_format = 'all1line'
                Text.id = this.id++
                group.set({cacheWidth: 500})
                group.add(Text)
                group.add(Line_x)
                group.add(Line_y)

                this.canvas.add(group)
                this.canvas.renderAll()
                this.data_canvas()
            },
            create_text: function (name, widgets_type) {
                this.del_cover_default_image()

                let IText = new fabric.IText("Свой текст", {
                    fontSize: 14,
                    fill: '#000000',
                    hasControls: false,
                    top: 35,
                    fontFamily: 'Times New Roman',
                    textAlign: 'left',
                    lineHeight: 0.88,
                    fontWeight: 510,
                    originX: 'left',
                    originY: 'top',
                })

                IText.toObject = (function (toObject) {
                    return function () {
                        return fabric.util.object.extend(toObject.call(this), {
                            name: this.name,
                            user_name_format: this.user_name_format,
                            id: this.id,
                            type_elem: this.type_elem,
                            widgets_type: this.widgets_type,
                            color: this.color,
                            hasControls: false,
                        });
                    };
                })(IText.toObject)

                IText.color = '#f5f7fa'
                IText.name = name
                IText.id = this.id++
                IText.type_elem = 2
                IText.widgets_type = widgets_type

                this.canvas.add(IText)
                this.canvas.renderAll()
                this.data_canvas()
            },
            create_bac: function () {
                if (this.src) {
                    this.del_cover_default_image()
                    this.mes_file_err = ''
                    this.canvas.setBackgroundImage(this.src, this.canvas.renderAll.bind(this.canvas), {
                        excludeFromExport: true,
                        scaleY: 0.5,
                        scaleX: 0.5,
                    })
                } else {
                    // this.image = null
                    this.canvas.setBackgroundImage(null, this.canvas.renderAll.bind(this.canvas));
                }
            },
            data_canvas: function () {
                this.arr = this.canvas.getObjects()
                this.canvas.renderAll();
                this.rev = this.canvas._objects.slice().reverse()
            },
            // checkMove: function (e) {
            //     window.console.log("Future index: " + e.draggedContext.futureIndex)
            // }

            coverGroupAdd: async function () {
                this.loading = true
                this.canvas.discardActiveObject().renderAll()
                // await this.validateField()
                // console.log(this.validation)
                // if (!this.validation) return
                let widgets = this.create_obj_for_send_server()
                let cover_data_front = this.serialization()
                let cover_data = {}
                // if (this.image === null) {
                //     this.image = ''
                // }
                if (this.src === '') {
                    this.mes_file_err = 'загрузите изображение разрешением 1590х400'
                    this.loading = false
                    return
                }
                cover_data.version = 1
                cover_data.background = {}
                cover_data.background.img_url = this.src

                cover_data.widgets = widgets
                let formData = new FormData()
                for (let key in this.settings.auth_data) {
                    formData.set(key, this.settings.auth_data[key])
                }

                formData.append('cover_is_enabled', 0)
                formData.append('cover_enable_date_start', this.cover_enable_date_start())
                formData.append('cover_enable_date_stop', this.cover_enable_date_stop())
                formData.append('cover_enable_time_start', this.cover_enable_time_start())
                formData.append('cover_enable_time_stop', this.cover_enable_time_stop())
                formData.append('cover_enable_weekdays', this.cover_enable_weekdays)
                formData.append('cover_order_position', 1)
                formData.append('cover_data', JSON.stringify(cover_data))
                formData.append('cover_name', this.cover_name)
                formData.append('background_image', this.image)
                formData.append('cover_data_front', cover_data_front)
                try {
                    let response = await fetch('/api/coverGroupAdd.php',
                        {
                            method: 'POST',
                            body: formData
                        })
                    if (response.ok) {
                        // console.log(response)
                        console.log(response.json())
                    }
                } catch (error) {
                    console.error('ошибка - ' + error)
                }
                await this.$router.push({path: '/covers_home_view/'})
                this.loading = false
            },
            coverGroupEdit: async function () {
                this.loading = true
                this.canvas.discardActiveObject().renderAll()
                // await this.validateField()
                // console.log(this.validation)
                // if (!this.validation) return
                let widgets = this.create_obj_for_send_server()
                let cover_data_front = this.serialization()
                let cover_data = {}
                cover_data.version = 1
                cover_data.background = {}
                cover_data.background.img_url = this.src
                cover_data.widgets = widgets
                // if (this.image === null) {
                //     this.image = ''
                // }
                if (this.src === '') {
                    this.mes_file_err = 'загрузите изображение разрешением 1590х400'
                    this.loading = false
                    return
                }
                let formData = new FormData()
                for (let key in this.settings.auth_data) {
                    formData.set(key, this.settings.auth_data[key])
                }

                formData.append('cover_is_enabled', 1)
                formData.append('cover_enable_date_start', this.cover_enable_date_start())
                formData.append('cover_enable_date_stop', this.cover_enable_date_stop())
                formData.append('cover_enable_time_start', this.cover_enable_time_start())
                formData.append('cover_enable_time_stop', this.cover_enable_time_stop())
                formData.append('cover_enable_weekdays', this.cover_enable_weekdays)
                formData.append('cover_order_position', 1)
                formData.append('cover_data', JSON.stringify(cover_data))
                formData.append('cover_name', this.cover_name)
                formData.append('cover_data_front', cover_data_front)
                formData.append('background_image', this.image)
                formData.append('cover_id', this.$route.params.id)
                try {

                    let response = await fetch('/api/coverGroupEdit.php',
                        {
                            method: 'POST',
                            body: formData
                        })
                    if (response.ok) {
                        console.log(response)
                        // console.log(response.json())
                    }
                } catch (error) {
                    console.error('ошибка - ' + error)
                }
                await this.$router.push({path: '/covers_home_view/'})
                this.loading = false
            },
            add_grid: function () {
                if (this.grid === false) {
                    this.canvas.setOverlayImage('/static/cover/default/grid.png', this.canvas.renderAll.bind(this.canvas), {excludeFromExport: true})
                } else {
                    this.canvas.setOverlayImage('/static/cover/default/transparent.png', this.canvas.renderAll.bind(this.canvas), {excludeFromExport: true})
                }
                this.grid = !this.grid
            }
        }
    }
</script>

<style>

    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }

    .relative {
        position: relative;
    }

    .col1 {
        border-color: #d3d9de;
        border-radius: 3px;
        border-style: solid;
        border-right: none;
        border-width: 1px;
        width: 529px;
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

    .col2 {
        border-color: #d3d9de;
        border-radius: 3px;
        border-style: solid;
        border-width: 1px;
        width: 242px;
    }


    .el_div {
        border-color: #d3d9de;
        border-radius: 3px;
        font-size: 13px !important;
        border-style: solid;
        border-width: 1px;
        width: 97px;
        height: 85px;
        font-size: 12px;
        text-align: center;
        cursor: pointer;
        background-color: #f5f7fa;
        padding-top: 5px;
    }

    .el_div_development {
        border-color: #d3d9de;
        border-radius: 3px;
        font-size: 13px !important;
        border-style: solid;
        border-width: 1px;
        width: 97px;
        height: 85px;
        font-size: 12px;
        text-align: center;
        background-color: #f5f7fa;
        padding-top: 5px;
    }

    .hr-dotted {
        padding-bottom: 2px;
        padding: 0;
        height: 0;
        border: none;
        border-top: 2px dotted #ddd;
    }

    #time_start-input, #time_end-input, #cover_enable_date-input {
        min-height: 40px;
        height: 40px;
        font-size: 16px !important;
        border-color: rgb(158, 158, 158);
    }

    .primary_grid {
        color: #4a76a8 !important;
    }

    #chip_cover {
        width: 232px;
        position: relative !important;
    }

    #catalog_btn_apply {
        position: absolute;
        right: 9px;
        top: 164px;
    }

    #catalog_btn_save_psd {
        position: absolute;
        right: 126px;
        top: 164px;
    }

    #name_author {
        position: absolute;
        right: 251px;
        top: 164px;
    }

    /*#catalog_line {*/
    /*    position: absolute;*/
    /*    top: 164px;*/
    /*    min-height: 28px;*/
    /*    width: 795px;*/
    /*    background-color: red;*/
    /*}*/

    .v-chip__close {
        position: absolute !important;
        right: 9px;
        top: 6px;
    }

    .mt6 {
        margin-top: 6px;
    }

    a {
        text-decoration: none; /* Отменяем подчеркивание у ссылки */
    }

    @font-face {
        font-family: 'Geisha';
        src: url("/static/longtime/fonts/Geisha.ttf");
    }

    @font-face {
        font-family: 'Crystal';
        src: url("/static/longtime/fonts/Crystal.ttf");
    }

    @font-face {
        font-family: 'Washington';
        src: url("/static/longtime/fonts/Washington.ttf");
    }

    @font-face {
        font-family: 'Victorian Gothic Two';
        src: url("/static/longtime/fonts/Victorian_Gothic_Two.ttf");
    }

    @font-face {
        font-family: 'Ticker Tape';
        src: url("/static/longtime/fonts/Ticker_Tape.ttf");
    }

    @font-face {
        font-family: 'DS Note';
        src: url("/static/longtime/fonts/DS_Note.ttf");
    }

    @font-face {
        font-family: 'Font_Heads';
        src: url("/static/longtime/fonts/Font_Heads.ttf");
    }

    @font-face {
        font-family: 'DS Arabic';
        src: url("/static/longtime/fonts/DS_Arabic.ttf");
    }

    @font-face {
        font-family: 'Bandy Cyr';
        src: url("/static/longtime/fonts/Bandy_Cyr.ttf");
    }

    @font-face {
        font-family: 'Bad Script Regular';
        src: url("/static/longtime/fonts/Bad_Script_Regular.ttf");
    }

    @font-face {
        font-family: 'Adine Kirnberg';
        src: url("/static/longtime/fonts/Adine_Kirnberg.ttf");
    }

    @font-face {
        font-family: 'Roboto-Medium';
        src: url("/static/longtime/fonts/Roboto-Medium.ttf");
    }
</style>
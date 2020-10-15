<template>
    <div class="p-0">
        <v-row class="mx-3 pt-1" justify="space-between">
            <v-col cols="12" xs="12" sm="2" class="pb-0 pl-0 mt-1 mr-3" align="left">
                <v-btn to='/covers_home_view' color="primary" small>
                    <v-icon class="pr-1" small>mdi-arrow-left-thick</v-icon>
                    Назад
                </v-btn>
            </v-col>
            <v-col cols="12" xs="12" sm="3" class="pb-0 " align="right">
                <v-text-field
                        class="mt-0 pt-0 mb-n1"
                        label="Название обложки"
                        placeholder="Обложка 1"
                        v-model="cover_name"
                        outlined
                        dense
                ></v-text-field>
            </v-col>
            <v-col sm="4" cols="12" xs="12" align="right">
                <v-file-input
                        dense
                        outlined
                        v-model="image"
                        @input="create_bac"
                        @change="create"
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        prepend-icon="mdi-download"
                        label="Загрузить фон"
                        id="fileItem"
                        hide-input
                ></v-file-input>
            </v-col>
            <v-col cols="12" xs="12" sm="3" class="pb-0 px-0 mt-1 ml-n3" align="right">
                <!--                <v-btn @click="data_canvas" color="colo" small>Показать сетку</v-btn>-->
                <v-btn v-if='!$route.params.id' @click="coverGroupAdd">Добавить</v-btn>
                <v-btn v-if='$route.params.id' @click="coverGroupEdit">Сохранить</v-btn>
                <v-btn @click="add_grid">add_grid</v-btn>
                <!--                <v-btn  @click="serialization">serialization</v-btn>-->
                <!--                <v-btn  @click="deserialization">deserialization</v-btn>-->
            </v-col>

        </v-row>
        <!--        <span>{{x}} {{y}}</span>-->
        <canvas id="canvas" class="relative" width="795" height="200"></canvas>
        <!--        <div class="grid-gradient"></div>-->


        <v-row class="mx-0">
            <v-col cols="9">
                <v-tabs class="px-3">
                    <v-tab @change="show_selected_tab('add_elem')">Добавить элемент</v-tab>
                    <v-tab @change="show_selected_tab('tab_editor')">Редактор</v-tab>
                    <v-tab>Настроить таймер</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        <v-row class="mx-0" justify="center">
            <div class="col1">
                <v-row v-show="show_add_elem" justify="space-around" class="my-2 mx-1">
                    <div class="el_div" @click="create_avatar_and_text_group('Самый активный', 'user_top')">
                        <v-icon color="primary" large>mdi-run-fast</v-icon><br>
                        <span>Самый<br>активный</span>
                    </div>
                    <div class="el_div" @click="create_avatar_and_text_group('Лучший комментатор', 'user_top_by_comments')">
                        <v-icon color="primary" large>mdi-judaism</v-icon><br>
                        <span>Лучший<br>комментатор</span>
                    </div>
                    <div class="el_div" @click="create_avatar_and_text_group('Лучший автор', 'user_top_by_wall_posts')">
                        <v-icon color="primary" large>mdi-pencil</v-icon><br>
                        <span>Лучший<br>автор</span>
                    </div>
                    <div class="el_div" @click="create_avatar_and_text_group('Лучший лайкер', 'user_top_by_likes')">
                        <v-icon color="primary" large>mdi-cards-heart</v-icon><br>
                        <span>Лучший<br>лайкер</span>
                    </div>
                    <div class="el_div" @click="create_text('Текст', 'text_plain')">
                        <v-icon color="primary" large>mdi-format-text-variant</v-icon><br>
                        <span>Свой<br>текст</span>
                    </div>
                </v-row>
                <v-row v-show="show_tab_editor && !show_type1_editor && !show_type2_editor"
                       justify="space-around" class="px-2 py-2">
                    <h4>Выберите элемент для редактирования</h4>
                </v-row>
                <div v-show="show_tab_editor && show_type1_editor">
                    <v-col cols="4" class="pb-0">
                        <v-text-field
                                label='Место в рейтинге'
                                outlined
                                dense
                                v-model.number="place"
                                type="number"
                        >
                        </v-text-field>
                    </v-col>
                    <hr class="hr-dotted">
                    <h5 align="center" class="pb-1">Настройки аватара</h5>
                    <v-row class="px-2 ">
                        <v-col cols="3" class="pb-0">
                            <v-text-field
                                    label='Координата X'
                                    outlined
                                    dense
                                    v-model.number="coordinateX"
                                    type="number"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="3" class="pb-0">
                            <v-text-field
                                    label='Координата Y'
                                    outlined
                                    dense
                                    v-model.number="coordinateY"
                                    type="number"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="3" class="pb-0">
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
                        <v-col cols="3" class="pb-0">
                            <v-text-field
                                    label='Обводка'
                                    v-model.number="avatar_outline_size"
                                    outlined
                                    dense
                                    min="0"
                                    max="10"
                                    type="number"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="4" class="pb-0">
                            <v-text-field
                                    label='Цвет обводки'
                                    v-model="avatar_outline_color"
                                    outlined
                                    dense
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <hr class="hr-dotted">
                    <h5 align="center" class="pb-1">Настройки имени</h5>
                    <v-row class="px-2 py-2">
                        <v-col cols="3" class="pb-0">
                            <v-text-field
                                    label='Координата X'
                                    outlined
                                    dense
                                    v-model.number="user_name_distance_of_avatar_X"
                                    type="number"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="3" class="pb-0">
                            <v-text-field
                                    label='Координата Y'
                                    outlined
                                    dense
                                    v-model.number="user_name_distance_of_avatar_Y"
                                    type="number"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="3" class="pb-0">
                            <v-text-field
                                    label='Размер'
                                    outlined
                                    dense
                                    v-model.number="user_name_font_size"
                                    type="number"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="5" class="pb-0">
                            <v-select
                                    :items="user_name_font_family_items"
                                    dense
                                    label="Шрифт"
                                    outlined
                                    v-model="user_name_font_family"
                                    xs="12">
                            </v-select>
                        </v-col>
                        <v-col cols="5" class="pb-0">
                            <v-select
                                    :items="user_name_format_items"
                                    dense
                                    label="Формат"
                                    outlined
                                    v-model="user_name_format"
                                    xs="12">
                            </v-select>
                        </v-col>
                        <v-col cols="4" class="pb-0">
                            <v-text-field
                                    label='Цвет'
                                    outlined
                                    dense
                                    v-model.number="user_name_font_color"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                </div>
                <div v-show="show_tab_editor && show_type2_editor">
                    <h5 align="center" class="pb-1">Настройки текста</h5>
                    <v-row class="px-2 ">
                        <v-col cols="3" class="pb-0">
                            <v-text-field
                                    label='Координата X'
                                    outlined
                                    dense
                                    v-model.number="coordinateX"
                                    type="number"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="3" class="pb-0">
                            <v-text-field
                                    label='Координата Y'
                                    outlined
                                    dense
                                    v-model.number="coordinateY"
                                    type="number"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="3" class="pb-0">
                            <v-text-field
                                    label='Размер'
                                    outlined
                                    dense
                                    v-model.number="text_font_size"
                                    type="number"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="4" class="pb-0">
                            <v-text-field
                                    label='Цвет'
                                    outlined
                                    dense
                                    v-model.number="text_font_color"
                            >
                            </v-text-field>
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
                            class="ma-1 mt-0 mb-2"
                            close
                            :color="element.color"
                            label
                            text-color="white"
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
    </div>
</template>

<script>
    import {fabric} from 'fabric';
    import draggable from 'vuedraggable'
    import auto_resize from "@/mixins/auto_resize";

    export default {
        display: "Simple",
        order: 0,
        components: {
            draggable,
        },

        filters: {
            reverse: function (array) {
                return array.slice().reverse()
            }
        },
        mixins: [auto_resize],
        data: () => ({
            auth_data: '',
            id: 0,
            src: '',
            image: null,
            canvas: null,
            clone: '',
            rev: [],
            arr: [],
            list_оf_items: [],
            enabled: true,
            dragging: false,
            group: [],
            colo: '',
            y: '',
            x: '',
            name: '',
            clipTo: null,
            show_tab_editor: false,
            show_add_elem: true,
            show_type1_editor: false,
            show_type2_editor: false,
            coordinateX: '',
            coordinateY: '',
            diameter: '',
            user_name_distance_of_avatar_Y: '',
            user_name_distance_of_avatar_X: '',
            user_name_font_size: '',
            text_font_size: '',
            user_name_font_color: '',
            text_font_color: '',
            avatar_outline_size: '',
            avatar_outline_color: '',
            place: '',
            user_name_font_family: '',
            user_name_format: '',
            cover_name: 'обложка моя',
            test_wid: {
                "version": 1,
                "background": {
                    "img_url": "https://haha.ru/dick.png",
                    "color": "#000"
                },
                "widgets": [
                    {
                        "type": "user_top",
                        "x": 26,
                        "y": 56,
                        "place": 1,
                        "avatar_size": 20,
                        "avatar_outline_size": 0,
                        "avatar_outline_color": "#f92525",
                        "user_name_distance_x": 0,
                        "user_name_distance_y": 6,
                        "user_name_align": "center",
                        "user_name_font_size": 14,
                        "user_name_font_family": "Tahoma",
                        "user_name_font_color": "#254",
                        "user_name_format": "name"
                    }],
            },
            user_name_font_family_items: [
                {value: 'Arial', text: 'Arial'},
                {value: 'Geneva', text: 'Geneva'},
                {value: 'sans-serif', text: 'Sans-serif'},
                {value: 'Tahoma', text: 'Tahoma'},
                {value: 'Times New Roman', text: 'Times New Roman'}
            ],
            user_name_format_items: [
                {value: 'all1line', text: 'Имя Фамилия 1 строка'},
                {value: 'all2lines', text: 'Имя Фамилия 2 строки'},
                {value: 'name', text: 'Имя'},
                {value: 'surname', text: 'Фамилия'},
                {value: 'undef', text: 'Без подписи'},
            ],
        }),
        mounted() {
            this.getAllUrlParams()
            this.canvas = new fabric.Canvas('canvas')
            // this.canvas.on('selection:updated', this.select_active_with_canvas)
            // this.canvas.on('selection:created', this.select_active_with_canvas)
            // this.canvas.on('selection:cleared', this.select_active_with_canvas)
            // this.canvas.on('object:moved', this.show_current_coordinates)
            if (this.$route.params.id) {
                this.deserialization()
            }
            // this.canvas.on('object:scaling', this.object_scaling)
            // this.canvas.on('selection:updated', this.object_scaling)

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
            text_font_color: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject.set({
                    fill: this.text_font_color,
                })
                this.canvas.renderAll()
            },
            text_font_size: function () {
                let activeObject = this.canvas.getActiveObject()
                console.log(activeObject)
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
                activeObject._objects[1].set({
                    fontFamily: this.user_name_font_family,
                })
                this.canvas.renderAll()
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
                        text: 'Имя \nФамилия'
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
                    strokeWidth: this.avatar_outline_size
                })
                this.canvas.renderAll()
            },
            avatar_outline_color: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject._objects[0].set({
                    stroke: this.avatar_outline_color
                })
                this.canvas.renderAll()
            },

        },
        methods: {
            serialization: function() {
                let cover_data_front = JSON.stringify(this.canvas.toJSON(["name", "hasControls", "id", "name2", "type_elem", "place", "widgets_type", "user_name_format"]))
                // let cover_data_front = JSON.stringify(this.canvas)
                console.log(cover_data_front)
                return cover_data_front
            },
            deserialization: async function() {
                let cover_data_front = await this.coverGroupGet()
                console.log('cover_data_front.objects')
                console.log(cover_data_front)
                this.canvas.loadFromJSON(cover_data_front)


                this.canvas.renderAll()
                this.data_canvas()
                this.create_bac()
            },
            coverGroupGetListAll: async function() {
                let response = await fetch('/api/coverGroupGetListAll.php' + sessionStorage.getItem('auth_data_url') + '&covers_count=100')
                if (response.ok) {
                    let answer = await response.json()
                    console.log(answer)
                }
            },
            coverGroupGet: async function() {
                let response = await fetch('/api/coverGroupGet.php' + sessionStorage.getItem('auth_data_url') + '&cover_id=' + this.$route.params.id)
                console.log(this.$route.params.id)
                if (response.ok) {
                    let answer = await response.json()
                    let cover_data = JSON.parse(answer.cover_data)
                    this.src = cover_data.background.img_url
                    return answer.cover_data_front
                }
            },
            create_obj_for_send_server: function() {
                let widgets = []

                this.canvas._objects.forEach(function(item) {
                    let obj = {}
                    // type = 1 аватар + подпись
                    if (item.type_elem === 1) {
                        obj.place = item.place

                        obj.avatar_size = item._objects[0].radius * 2
                        obj.avatar_outline_size = item._objects[0].strokeWidth
                        obj.avatar_outline_color = item._objects[0].stroke

                        obj.user_name_distance_x = item._objects[1].left
                        obj.user_name_distance_y = item._objects[1].top
                        obj.user_name_font_size = item._objects[1].fontSize
                        obj.user_name_font_family = item._objects[1].fontFamily
                        obj.user_name_font_color = item._objects[1].fill
                        obj.user_name_align = item._objects[1].textAlign
                        obj.user_name_format = item._objects[1].user_name_format
                    }
                    obj.type = item.widgets_type
                    obj.x = item.left
                    obj.y = item.top
                    widgets.push(obj)
                });
                console.log(widgets)
                return widgets
            },
            manual_coordinate_change: function () {
                let activeObject = this.canvas.getActiveObject()
                activeObject.set({
                    left: this.coordinateX,
                    top: this.coordinateY,
                }).setCoords();
                // this.canvas.requestRenderAll();
                this.canvas.renderAll()
            },
            show_selected_tab: function (selected_tab) {
                if (selected_tab === 'tab_editor') {
                    this.show_tab_editor = true
                    this.show_add_elem = false
                } else if (selected_tab === 'add_elem') {
                    this.show_tab_editor = false
                    this.show_add_elem = true
                }
            },
            show_current_coordinates: function (e) {
                console.log('show_current_coordinates')
                this.coordinateX = e.target.left
                this.coordinateY = e.target.top
            },
            render_active_list_cover: function () {
                this.rev.push('')
                this.rev.splice(this.rev.length - 1, 1)
            },
            select_active_with_canvas: function (e) {
                console.log(e)
                if (e.target && e.selected.length === 1) {
                    this.coordinateY = e.target.top
                    this.coordinateX = e.target.left

                    if (e.target.name === 'Текст') {
                        this.text_font_size = e.target.fontSize
                        this.text_font_color = e.target.fill
                    } else {
                        this.place = +e.target.place
                        this.diameter = e.target._objects[0].radius * 2
                        this.avatar_outline_size = e.target._objects[0].strokeWidth
                        this.avatar_outline_color = e.target._objects[0].stroke
                        this.user_name_distance_of_avatar_Y = e.target._objects[1].top
                        this.user_name_distance_of_avatar_X = e.target._objects[1].left
                        this.user_name_font_color = e.target._objects[1].fill
                        this.user_name_font_size = e.target._objects[1].fontSize
                        this.user_name_font_family = e.target._objects[1].fontFamily
                        this.user_name_format = e.target._objects[1].user_name_format
                    }
                }
                for (let item of this.rev) {
                    item.color = ''
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
            onload: async function (e) {
                this.src = e.target.result
            },
            consolel: function (id) {
                let position = this.canvas._objects.findIndex(item => item.id === id)
                this.canvas._objects.splice(position, 1)
                this.rev = this.canvas._objects.slice().reverse()
            },
            onMoving: function () {
                this.canvas.forEachObject(function (o) {
                    o.setCoords()
                });
            },
            create_avatar_and_text_group: function (name, widgets_type) {
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
                // добавляем свои классы на окружность
                Circle.toObject = (function (toObject) {
                    return function () {
                        return fabric.util.object.extend (toObject.call(this), {
                            name: this.name,
                            id: this.id
                        });
                    };
                }) (Circle.toObject)

                Circle.name = name + ' (аватар)'
                Circle.id = this.id

                let group = new fabric.Group([Circle], {
                    left: 100,
                    top: 100,
                    originX: 'center',
                    originY: 'center',
                    hasControls: false,
                })

                group.toObject = (function (toObject) {
                    return function () {
                        return fabric.util.object.extend (toObject.call(this), {
                            widgets_type: this.widgets_type,
                            name: this.name,
                            name2: this.name2,
                            id: this.id,
                            type_elem: this.type_elem,
                            place: this.place,
                            hasControls: false,
                        });
                    };
                }) (group.toObject)

                group.name = name + '_1'
                group.name2 = name
                group.id = this.id
                group.widgets_type = widgets_type
                group.type_elem = 1
                group.place = 1


                let Text = new fabric.Text("Имя Фамилия", {
                    textAlign: 'center',
                    fontFamily: 'Tahoma',
                    fontSize: 14,
                    originX: 'center',
                    originY: 'center',
                    fill: '#000',
                    top: 35,
                })
                Text.toObject = (function (toObject) {
                    return function () {
                        return fabric.util.object.extend (toObject.call(this), {
                            name: this.name,
                            user_name_format: this.user_name_format,
                            id: this.id,
                        });
                    };
                }) (Text.toObject)

                Text.name = name + ' (имя)'
                Text.user_name_format = 'all1line'
                Text.id = this.id++
                group.add(Text)
                this.canvas.add(group)
                this.canvas.renderAll()
                this.data_canvas()
            },
            create_text: function (name, widgets_type) {
                let IText = new fabric.IText("Свой текст", {
                    fontSize: 14,
                    fill: '#000000FF',
                    hasControls: false,
                    top: 35,
                })

                IText.toObject = (function (toObject) {
                    return function () {
                        return fabric.util.object.extend (toObject.call(this), {
                            name: this.name,
                            user_name_format: this.user_name_format,
                            id: this.id,
                            type_elem: this.type_elem,
                            widgets_type: this.widgets_type,
                        });
                    };
                }) (IText.toObject)

                IText.name = name
                IText.id = this.id++
                IText.type_elem = 2
                IText.widgets_type = widgets_type

                this.canvas.add(IText)
                this.canvas.renderAll()
                this.data_canvas()
            },
            create_bac: function () {
                this.canvas.setBackgroundImage(this.src, this.canvas.renderAll.bind(this.canvas), {
                    excludeFromExport: true,
                    scaleY: 0.5,
                    scaleX: 0.5,
                })
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
                let widgets = this.create_obj_for_send_server()
                let cover_data_front = this.serialization()
                let cover_data = {}
                if (this.image === null) {
                    this.image = ''
                }
                cover_data.version = 1

                cover_data.widgets = widgets
                let formData = new FormData()
                for (let key in this.auth_data) {
                    formData.set(key, this.auth_data[key])
                }

                formData.append('cover_is_enabled', 1)
                formData.append('cover_enable_date_start', 1)
                formData.append('cover_enable_date_stop', 1)
                formData.append('cover_enable_weekdays', 1)
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
                        console.log(response)
                        console.log(response.json())
                    }
                } catch(error) {
                    console.error('ошибка - ' + error)
                }
            },
            coverGroupEdit: async function () {
                let widgets = this.create_obj_for_send_server()
                let cover_data_front = this.serialization()
                let cover_data = {}
                cover_data.version = 1
                cover_data.background = {}
                cover_data.background.img_url = this.src
                cover_data.widgets = widgets
                if (this.image === null) {
                    this.image = ''
                }
                let formData = new FormData()
                for (let key in this.auth_data) {
                    formData.set(key, this.auth_data[key])
                }

                formData.append('cover_is_enabled', 1)
                formData.append('cover_enable_date_start', 1)
                formData.append('cover_enable_date_stop', 1)
                formData.append('cover_enable_weekdays', 1)
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
                        console.log(response.json())
                    }
                } catch(error) {
                    console.error('ошибка - ' + error)
                }
            },
            add_grid: function () {
                var gridWidth = 100 // <= you must define this with final grid width
                var gridHeight = 100 // <= you must define this with final grid height

// to manipulate grid after creation
                var oGridGroup = new fabric.Group([], {left: 0, top: 0});

                var gridSize = 20; // define grid size

// define presentation option of grid
                var lineOption = {stroke: 'red', strokeWidth: 1, selectable:true, strokeDashArray: [3, 3]};

// do in two steps to limit the calculations
// first loop for vertical line
                for(var i = Math.ceil(gridWidth/gridSize); i--;){
                    console.log('i - ' + i)
                    oGridGroup.add( new fabric.Line([gridSize*i, 0, gridSize*i, gridHeight], lineOption) );
                }
// second loop for horizontal line
                for(var j = Math.ceil(gridHeight/gridSize); j--;){
                    console.log('j - ' + j)
                    oGridGroup.add( new fabric.Line([0, gridSize*j, gridWidth, gridSize*j], lineOption) );
                }
// Group add to canvas
                this.canvas.add(oGridGroup);
                // this.canvas.add(group)
                // this.canvas.add(line)
                this.canvas.renderAll()
                // this.data_canvas()

            }
        }
    }
</script>

<style>
    .buttons {
        margin-top: 35px;
    }

    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }


    .bordercol {
        border-color: rgba(0, 0, 0, .42);
        border-style: solid;
        border-width: 1px;
    }

    .col1 {
        border-color: rgba(0, 0, 0, .42);
        border-style: solid;
        border-right: none;
        border-width: 1px;
        width: 525px;
    }

    .col2 {
        border-color: rgba(0, 0, 0, .42);
        border-style: solid;
        border-width: 1px;
        width: 250px;
    }

    .el_div {
        border-color: rgba(0, 0, 0, .42);
        border-style: solid;
        border-width: 1px;
        width: 80px;
        height: 80px;
        font-size: 12px;
        text-align: center;
        cursor: pointer;
        background-color: #f5f7fa;
    }

    .hr-dotted {
        padding-bottom: 2px;
        padding: 0;
        height: 0;
        border: none;
        border-top: 2px dotted #ddd;
    }





</style>
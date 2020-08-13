<template>
    <div class="p-0">
        <v-row class="mx-3 pt-1" justify="space-between">
<!--        <v-row class="px-3 pt-1">-->
            <v-col cols="12" xs="12" sm="2" class="pb-0 pl-0 mt-1 mr-3" align="left">
                <v-btn to='/covers_home_view' color="primary" small >
                    <v-icon class="pr-1" small>mdi-arrow-left-thick</v-icon>
                    Назад</v-btn>
            </v-col>
            <v-col cols="12" xs="12" sm="3" class="pb-0 " align="right">
                <v-text-field
                        class="mt-0 pt-0 mb-n1"
                        label="Название обложки"
                        placeholder="Обложка 1"
                        outlined
                        dense
                ></v-text-field>
            </v-col>
<!--            <v-col cols="12" xs="12" sm="3" class="pb-0 px-0 mt-1 mr-n3" align="right">-->
<!--                <v-btn type="input" color="primary" small>Загрузить фон</v-btn>-->
<!--            </v-col>-->
            <v-col sm="4" cols="12" xs="12" align="right" a>
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
                <v-btn color="primary" small>Показать сетку</v-btn>
            </v-col>
            <v-btn @click="create_canvas">111</v-btn>
        </v-row>

        <canvas id="canvas" width="795" height="200"></canvas>
        <v-row>
            <v-col cols="9">
                <v-tabs class="px-3">
                    <v-tab>Редактор</v-tab>
                    <v-tab>Добавить элемент</v-tab>
                    <v-tab>Настроить таймер</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        <router-view ></router-view>
<!--        <v-img id="img"   width="795" :src="src"></v-img>-->
    </div>
</template>

<script>
    import {fabric} from 'fabric';

    export default {
        data: () => ({
            src: '',
            image: null,
            canvas: '',
        }),
        mounted() {
             this.canvas = new fabric.Canvas('canvas')
            // this.canvas = canvas
            // let rect = new fabric.Circle({
            //     left: 100,
            //     top: 100,
            //     fill: 'green',
            //     radius: 20,
            // });
            // canvas.setBackgroundImage('https://sun9-40.userapi.com/c206724/v206724891/49727/xUpDyaoIJqw.jpg');
            // canvas.setBackgroundImage(this.src);
            // canvas.add(rect);
            // fabric.Image.fromURL('https://sun1-23.userapi.com/impg/c857020/v857020083/1362ef/GFVnF6578MM.jpg?size=50x0&quality=90&crop=142,125,456,456&sign=f509a3b5f6c83b22cc93af2e1d7991dc&ava=1', function (oImg) {
            //     canvas.add(oImg);
            // });

        },
        methods: {
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
                    console.log('asdsad')
                    this.canvas.setBackgroundImage(null, this.canvas.renderAll.bind(this.canvas));
                }
            },
            onload: async function (e) {
                 this.src = e.target.result
            },
            create_canvas: function () {

                let rect = new fabric.Circle({
                    left: 100,
                    top: 100,
                    fill: 'green',
                    radius: 20,
                });
                // canvas.setBackgroundImage('https://sun9-40.userapi.com/c206724/v206724891/49727/xUpDyaoIJqw.jpg');
                // this.canvas.setBackgroundImage(this.src);
                // console.log(this.src)
                this.canvas.add(rect);

                // fabric.Image.fromURL('https://sun1-23.userapi.com/impg/c857020/v857020083/1362ef/GFVnF6578MM.jpg?size=50x0&quality=90&crop=142,125,456,456&sign=f509a3b5f6c83b22cc93af2e1d7991dc&ava=1', function (oImg) {
                //     canvas.add(oImg);
                // });
            },
            create_bac: function () {
                console.log('sdsf')
                this.canvas.setBackgroundImage(this.src, this.canvas.renderAll.bind(this.canvas));
                // this.canvas.setBackgroundImage(this.src);

            }
        }
    }
</script>

<style scoped>

</style>
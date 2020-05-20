<template>
    <v-row  dense class="px-3">
        <v-col cols="12" sm="4">
            <v-img id="img" max-width="250"  height="auto" :src="src"></v-img>
        </v-col>
<!--        <v-btn @click="load_photo">отправить фото</v-btn>-->
        <v-col cols="12" sm="5">
            <v-file-input
                v-model="gameData.image"
                @change="create"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-camera"
                label="Своя картинка для поста"
                id="fileItem"

            ></v-file-input>
                </v-col>
         </v-row>
</template>

<script>
    export default {
        model: {
            prop: 'gameData',
        },
        props: ['gameData'],
        data: () => ({
            src: '',
            file: '',
         }),
        methods: {
            create: function () {

                if (this.gameData.image) {
                    let reader = new FileReader();
                    reader.onload = this.onload
                    reader.readAsDataURL(this.gameData.image);
                } else {
                    this.loadDefaulImage()
                }
            },
            onload: function(e) {
                this.src = e.target.result
            },
            loadDefaulImage: function () {
                this.src = '/static/wallgames/image_default/min/guess_number.jpg'
                this.gameData.image = null
            },

        },
        mounted() {
            this.loadDefaulImage()
        }
    }
</script>

<style scoped>


</style>
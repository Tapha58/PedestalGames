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
                this.src = 'https://sun9-51.userapi.com/WxbaSDvU-d_JiBX8ISqiAEPb0-S0kvC5cSyuWw/jtdWb2p9smo.jpg'
            },

        },
        mounted() {
            this.loadDefaulImage()
        }
    }
</script>

<style scoped>


</style>
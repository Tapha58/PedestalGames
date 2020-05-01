<template>
    <v-row align="center" dense class="px-3">
        <v-col cols="12" sm="7">

                <v-img id="img" max-width="350"  height="auto" :src="src"></v-img>
        </v-col>

        <v-col cols="12" sm="5">
                    <v-file-input
                        v-model="val"
                        @change="create"
                        accept="image/png, image/jpeg, image/bmp"
                        prepend-icon="mdi-camera"
                        label="Своя картинка для поста"
                        id="fileItem"
                        hint="Загрузите картинку размером не более 2Mb"
                    ></v-file-input>
                </v-col>

    </v-row>
</template>

<script>
    export default {
        data: () => ({
            src: '',
            file: '',
            val: null
         }),
        methods: {
            create: function () {

                if (this.val) {
                    let reader = new FileReader();
                    reader.onload = this.onload
                    reader.readAsDataURL(this.val);
                    console.log('привет2 ' + this.val)
                } else {
                    this.loadDefaulImage()
                }
            },
            onload: function(e) {
                this.src = e.target.result
            },
            loadDefaulImage: function () {
                this.src = 'https://sun9-51.userapi.com/WxbaSDvU-d_JiBX8ISqiAEPb0-S0kvC5cSyuWw/jtdWb2p9smo.jpg'
            }
        },
        mounted() {
            this.loadDefaulImage()
        }
    }
</script>

<style scoped>
    .btn-file {
        position: relative;
        overflow: hidden;
    }
    .btn-file input[type=file] {
        position: absolute;
        top: 0;
        right: 0;
        min-width: 100%;
        min-height: 100%;
        font-size: 100px;
        text-align: right;
        filter: alpha(opacity=0);
        opacity: 0;
        outline: none;
        cursor: inherit;
        display: block;
    }
</style>
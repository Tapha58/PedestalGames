<template>
    <v-row  dense class="px-3">
<v-btn @click="load_photo" > отправить фото </v-btn>
        <v-col cols="12" sm="4">
                <v-img id="img" max-width="250"  height="auto" :src="src"></v-img>
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
                        persistent-hint
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
            },
            load_photo: async function () {
                const formData = new FormData();
                // const fileField = this.val;

                formData.append('photo', this.val);

                try {
                    const response = await fetch('https://pu.vk.com/c212820/ss2137/upload.php?act=do_add&mid=312527953&aid=-14&gid=168555251&hash=1a64eb7422a72503d54c02326ddbb373&rhash=b2af8d5815f9fe74c4a7f29ab0cf4e86&swfupload=1&api=1&wallphoto=1' , {
                        method: 'POST',
                        body: formData
                    });
                    const result = await response.json();
                    console.log('Успех:', JSON.stringify(result));
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            }
        },
        mounted() {
            this.loadDefaulImage()
        }
    }
</script>

<style scoped>


</style>
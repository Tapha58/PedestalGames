<template>
    <div class="col-lg-12">
        <label class="col-12">Картинка для поста с игрой:</label>
        <p><img ref="img" width="400" height="400" :src="src"></p>

<!--        <label for="input1">Загрузить свое изображение</label>-->
        <span class="btn btn-primary btn-file">
    загрузить свою картинку <input type="file" ref="input" id="input1" @change="createPreviewImg" />
</span>
<!--        <input type="file" ref="input" id="input1" @change="createPreviewImg" />-->
    </div>
</template>

<script>
    export default {
        data: () => ({
            src: 'https://sun9-51.userapi.com/WxbaSDvU-d_JiBX8ISqiAEPb0-S0kvC5cSyuWw/jtdWb2p9smo.jpg'
         }),
        methods: {
            createPreviewImg: function () {
                let r = this.$refs.img
                let file = this.$refs.input.files[0]
                let reader = new FileReader();
                // reader.onload = function(e) {this.src = e.target.result}
                reader.onload = function(e) {r.src = e.target.result}
                reader.readAsDataURL(file);

                console.log('значение' + this.src)
            },


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
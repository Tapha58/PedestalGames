<template>
    <div class="px-5 col-lg-6">
        <label for="">Картинка для поста с игрой:</label>
        <b-img src="https://github.com/Tapha112/games/blob/master/default.jpg?raw=true" fluid alt="Responsive image"></b-img>
        <label for="fff">Загрузить свое изображение</label>
        <b-form-file id="fff"  accept=".jpg, .png, .gif"></b-form-file>



            <div id="btn">
                <label for="files">Загрузить свое изображение</label>
            </div>
            <input id="files" style="visibility:hidden;" name="userfile" accept="image/*" type="file">




    </div>
</template>

<script>
    export default {
        name: "Image"
    }
</script>

<style scoped>

</style>
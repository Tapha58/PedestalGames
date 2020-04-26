<template>
  <div id="app">

    <form name="test" action="https://pedestal-test2.aiva-studio.ru/check.php" method="post">

        <app-guessTheNumber class="mt-0"></app-guessTheNumber>
        <app-rules class="mt-3"></app-rules>
        <app-postSettings class="mb-5"></app-postSettings>
        <app-image class="mb-0"></app-image>

        <div class="mb-0">
          <div class="px-5 col-lg-6">
            <hr>
            <b-button type="submit" variant="primary">Запустить сейчас</b-button>
          </div>
        </div>

    </form>
    <b-button class="mt-2" type="" @click="publishPost"   variant="primary">Опубликовать пост</b-button>

      <form ref="formElem" @submit.prevent="func">
          Картинка: <input type="file" name="picture" accept="image/*">
          <input type="submit">
      </form>


  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import bridge from '@vkontakte/vk-bridge';

  export default {
     data: () => ({}),
     methods: {
        publishPost() {
            bridge.send("VKWebAppShowWallPostBox", {"owner_id": -168555251, "message": 'hello group', "from_group": "1"});
        },
        async func() {
            let response = await fetch("https://pu.vk.com/c857736/upload.php?act=do_add&mid=567610298&aid=-14&gid=-168555251&hash=a75eb4176885df8744ad6ac4e9ce270a&rhash=3e9f1e94ed22f35ec98456199492c146&swfupload=1&api=1&wallphoto=1", {
                method: 'POST',
                body: new FormData(this.$refs.formElem)
            })
            let result = await response.json();

            alert(result);
        }
     },

  }
</script>



<style>

</style>

<template>
  <v-app id="inspire" >

    <form name="test" action="https://pedestal-test2.aiva-studio.ru/check.php" method="post">

        <app-GuessTheNumber class="mb-n7"></app-GuessTheNumber>
        <app-rules class=""></app-rules>
<!--        <app-postSettings class="mb-5"></app-postSettings>-->
<!--        <app-image ></app-image>-->
<!--        <app-time class="mt-3"></app-time>-->

        <div class="mb-0">
          <div class="px-5 col-lg-6">
<!--            <hr>-->
<!--            <b-button type="submit" variant="danger">Запустить игру</b-button>-->
          </div>
        </div>

    </form>
<!--    <b-button class="mt-2" type="" @click="publishPost"   variant="primary">Опубликовать пост</b-button>-->




  </v-app>
</template>

<script>
  // import 'bootstrap/dist/css/bootstrap.css'
  // import 'bootstrap-vue/dist/bootstrap-vue.css'
  import bridge from '@vkontakte/vk-bridge';

  export default {
     data: () => ({}),
     methods: {
        publishPost() {
            bridge.send("VKWebAppShowWallPostBox", {"owner_id": -168555251, "message": 'hello group', "from_group": "1"});
        },
     },

  }
</script>



<style>
#inspire {
    width: 710px
}
</style>
